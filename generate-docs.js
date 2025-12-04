#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

console.log("=== GENERATE DOCS START ===");

const ROOT = process.cwd();
const LIB_ROOT = path.join(ROOT, "projects", "my-ui-lib", "src", "lib");
const DOCS_DIR = path.join(ROOT, "docs");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

ensureDir(DOCS_DIR);

/* -------------------------------------------------------------
 * 1. Collect TS source files
 * ----------------------------------------------------------- */
function collectFiles(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(collectFiles(full));
    } else if (
      full.endsWith(".ts") &&
      !full.endsWith(".spec.ts") &&
      !full.includes("node_modules")
    ) {
      results.push(full);
    }
  }
  return results;
}

const files = collectFiles(LIB_ROOT);
console.log("✔ Files collected:", files.length);

/* -------------------------------------------------------------
 * 2. Create TypeScript Program (for method signatures)
 * ----------------------------------------------------------- */
const tsconfig = ts.readConfigFile(path.join(ROOT, "tsconfig.json"), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, ROOT);

const program = ts.createProgram({
  rootNames: files,
  options: parsed.options,
});

const checker = program.getTypeChecker();

/* -------------------------------------------------------------
 * 3. Extract @Component from raw text (Regex)
 * ----------------------------------------------------------- */
function extractComponentDecorator(src) {
  const regex = /@Component\s*\(\s*{([\s\S]*?)}\s*\)/m;
  const match = src.match(regex);
  if (!match) return null;

  const body = match[1];

  function getField(name) {
    const re = new RegExp(name + `\\s*:\\s*([^,]+)`, "m");
    const m = body.match(re);
    if (!m) return null;

    try {
      return eval("(" + m[1] + ")");
    } catch {
      return null;
    }
  }

  return {
    selector: getField("selector"),
    templateUrl: getField("templateUrl"),
    styleUrls: getField("styleUrls"),
    rawMeta: body,
  };
}

/* -------------------------------------------------------------
 * 4. Extract Inputs, Outputs + type + default
 * ----------------------------------------------------------- */
function extractInputsOutputs(src) {
  const inputs = [];
  const outputs = [];

  const inputRegex = /@Input\s*\(\s*['"`]?([\w-]*)['"`]?\s*\)\s*\n?\s*(\w+)\s*:\s*([^=;]+)(?:=\s*([^;]+))?/g;
  const outputRegex = /@Output\s*\(\s*['"`]?([\w-]*)['"`]?\s*\)\s*\n?\s*(\w+)\s*:\s*([^=;]+)/g;

  let m;
  while ((m = inputRegex.exec(src))) {
    const alias = m[1] || null;
    inputs.push({
      alias,
      name: m[2],
      type: m[3].trim(),
      defaultValue: m[4] ? m[4].trim() : null,
    });
  }

  while ((m = outputRegex.exec(src))) {
    outputs.push({
      alias: m[1] || null,
      name: m[2],
      type: m[3].trim(),
    });
  }
  return { inputs, outputs };
}

/* -------------------------------------------------------------
 * 5. Extract PUBLIC METHODS & PROPERTIES from TS AST
 * ----------------------------------------------------------- */
function getASTPublicAPI(sourceFile) {
  const result = {
    methods: [],
    properties: [],
  };

  function visit(node) {
    if (ts.isClassDeclaration(node) && node.name) {
      for (const member of node.members) {
        // Public method
        if (
          ts.isMethodDeclaration(member) &&
          !(member.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword))
        ) {
          const name = member.name.getText();
          const signature = checker.getSignatureFromDeclaration(member);
          const returnType = checker.typeToString(signature.getReturnType());

          const params = member.parameters.map(p => ({
            name: p.name.getText(),
            type: p.type ? p.type.getText() : "any",
          }));

          result.methods.push({ name, params, returnType });
        }

        // Public property
        if (
          ts.isPropertyDeclaration(member) &&
          !(member.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword))
        ) {
          const name = member.name.getText();
          const type = member.type ? member.type.getText() : "any";
          result.properties.push({ name, type });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}

/* -------------------------------------------------------------
 * 6. Process component files
 * ----------------------------------------------------------- */
const catalogue = [];

for (const file of files) {
  console.log("\n>>> Checking:", file);

  const src = fs.readFileSync(file, "utf8");
  const comp = extractComponentDecorator(src);
  if (!comp) {
    console.log(" ❌ Not a component.");
    continue;
  }

  console.log(" ✔ Component detected:", comp.selector);

  // Inputs & outputs
  const { inputs, outputs } = extractInputsOutputs(src);

  // AST Public API
  const sf = program.getSourceFile(file);
  const publicAPI = getASTPublicAPI(sf);

  // Template HTML
  let templateContent = "";
  if (comp.templateUrl) {
    const templatePath = path.join(path.dirname(file), comp.templateUrl);
    if (fs.existsSync(templatePath)) {
      templateContent = fs.readFileSync(templatePath, "utf8");
    } else {
      templateContent = "(template file not found)";
    }
  }

  // Markdown generation
  const mdFile = path.join(DOCS_DIR, path.basename(file).replace(".ts", ".md"));
  ensureDir(DOCS_DIR);

  const md = `
# ${comp.selector}

**Source:** \`${file}\`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | \`${comp.selector}\` |
| Template | \`${comp.templateUrl || "inline"}\` |
| Styles | \`${comp.styleUrls || "inline"}\` |

---

## 📥 Inputs
${inputs.length ? inputs.map(i => `- **${i.alias || i.name}**: \`${i.type}\`${i.defaultValue ? ` = ${i.defaultValue}` : ""}`).join("\n") : "_None_"}

---

## 📤 Outputs
${outputs.length ? outputs.map(o => `- **${o.alias || o.name}**: \`${o.type}\``).join("\n") : "_None_"}

---

## 🧪 Public Properties
${publicAPI.properties.length ? publicAPI.properties.map(p => `- **${p.name}**: \`${p.type}\``).join("\n") : "_None_"}

---

## 🔧 Public Methods
${publicAPI.methods.length ? publicAPI.methods.map(m => `### ${m.name}()\n**Return:** \`${m.returnType}\`\nParams:\n${m.params.length ? m.params.map(p => `- ${p.name}: \`${p.type}\``).join("\n") : "_None_"}\n`).join("\n") : "_None_"}

---

## 🖼 Template Preview
\`\`\`html
${templateContent}
\`\`\`
`;

  fs.writeFileSync(mdFile, md.trim(), "utf8");
  console.log(" ✔ Markdown written:", mdFile);

  catalogue.push({
    selector: comp.selector,
    file,
    mdFile: path.basename(mdFile),
  });
}

/* -------------------------------------------------------------
 * 7. Generate Component Catalogue
 * ----------------------------------------------------------- */
const catalogMd = `
# 📚 My UI Library – Component Catalogue

Total: **${catalogue.length}** components

---

${catalogue
  .map(c => `### [${c.selector}](${c.mdFile})  
Source: \`${c.file}\``)
  .join("\n\n")}
`;

fs.writeFileSync(path.join(DOCS_DIR, "_catalog.md"), catalogMd.trim(), "utf8");

console.log("\n=== DONE ===");
