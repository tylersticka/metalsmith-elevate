var multimatch = require('multimatch'),
    async = require('async'),
    assign = require('lodash/object/assign'),
    path = require('path');

var defaults = {
  pattern: '*/**/*',
  depth: -1
};

function plugin (options) {
  options = options || {};
  if ('string' == typeof options) options = { pattern: options };
  options = assign({}, defaults, options);

  return function (files, metalsmith, done) {

    function check (file, done) {
      done(!!multimatch(file, options.pattern).length);
    }

    function elevate (file, done) {
      var base = path.basename(file),
          segs = path.dirname(file).split(path.sep),
          depth = options.depth;
      if (options.depth < 0) depth+= segs.length;

      if (segs.length > depth) {
        segs = segs.slice(0, depth);
        segs.push(base);

        var newPath = segs.join(path.sep),
            data = files[file];

        delete files[file];
        files[newPath] = data;
      }

      done();
    }

    async.filter(Object.keys(files), check, function (results) {
      async.each(results, elevate, done);
    });

  };
}

module.exports = plugin;
