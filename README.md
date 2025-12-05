# Angular Library Document Builder

#### Auto generate HTML files and docs based on TS files in project

Add new command ``npm run build-docs``` in package.json

Change ```my-form-components``` to the project name you have been working on.

```
const LIB_ROOT = path.join(ROOT, "projects", "my-form-components", "src", "lib");

```

```
npm run build-docs
```

Output files of Markdown files and HTML files stored in /docs

Add generate-docs.js and /templates to your existing Angular Project

/docs will be auto-generated after running ```npm run build-docs```

```
Angular CLI       : 21.0.2
Angular           : 21.0.3
Node.js           : 22.20.0
Package Manager   : npm 10.9.3
Operating System  : win32 x64
```
[Live Demo](https://enting0417.github.io/angular-library-document-builder/index.html)