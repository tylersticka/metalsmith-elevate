# metalsmith-elevate
A metalsmith plugin for bumping files up one or more directories.

Similar to [metalsmith-flatten](https://github.com/chadly/metalsmith-flatten), but omits chunks of the filepath entirely. Useful for organizing elements in the source but not in the build.

_Currently a 0.0.0 release. Use at your own risk!_

## Installation

**TODO:** Publish on [npm](https://www.npmjs.com/)

```
$ npm install tylersticka/metalsmith-elevate
```

## Usage

### Basic Example

```javascript
var Metalsmith = require('metalsmith');
var elevate = require('metalsmith-elevate');

var metalsmith = new Metalsmith(__dirname)
  .use(flatten('blog/*/*.html));
```

This will move all files matched by `blog/*/*.html` up one directory.

Before:

```
blog/
├── 2014/
|   ├── one.html
|   └── two.html
└── 2015/
    ├── three.html
    └── four.html
```

After:

```
blog/
├── one.html
├── two.html
├── three.html
└── four.html
```

### Options

You can pass a pattern to the plugin directly or an object specifying one or more of these options.

Option | Default | Description
--- | --- | ---
`pattern` | `'*/**/*'` | One or more globs for [multimatch](https://github.com/sindresorhus/multimatch).
`depth` | `-1` | Negative numbers slice the file path relative to the number of segments it has. Positive numbers slice to that length.
