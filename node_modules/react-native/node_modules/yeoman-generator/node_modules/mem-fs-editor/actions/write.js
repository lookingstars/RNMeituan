'use strict';

var assert = require('assert');

module.exports = function (path, contents, stat) {
  assert(
    typeof contents === 'string' || contents instanceof Buffer,
    'Expected `contents` to be a String or a Buffer'
  );

  var file = this.store.get(path);
  file.isNew = file.contents === null;
  file.state = 'modified';
  file.contents = typeof contents === 'string' ? new Buffer(contents) : contents;
  file.stat = stat;
  this.store.add(file);

  return file.contents.toString();
};
