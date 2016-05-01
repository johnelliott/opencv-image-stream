var test = require('tape');
var fs = require('fs');
var path = require('path');
var concat = require('concat-stream');
var ImageTransformStream = require('../image-mat-transform.js');

test('stream anatomy', function (t) {
  t.plan(3);

  var dup = new ImageTransformStream();
  //TODO this should become a test that it returns readable/writable
  t.equal(typeof dup, 'object', 'returns object')
  t.equal(dup.writable, true, 'stream is writable')
  t.equal(dup.readable, true, 'stream is readable')
});

test('returns object that is probably an openCV mat', function (t) {
  t.plan(4);

  var readable = fs.createReadStream(path.join(__dirname, 'img.jpg'));
  var dup = new ImageTransformStream()
  readable.pipe(dup).pipe(concat(function (data) {
    t.ok(data, 'it\'s something')
    t.equal(typeof data, 'object', 'it is an object')
    t.equal(data.toString(), '[object Matrix]', 'it is an object')
    t.equal(typeof data.inspect(), 'string')
    // TODO do more test of matrix
  }));
});
