var util = require('util')
var stream = require('stream')
var cv = require('opencv')

function ImageMatTransform() {
  stream.Transform.call(this, {objectMode: true})
  this.tailPromise = Promise.resolve()
}

util.inherits(ImageMatTransform, stream.Transform)

ImageMatTransform.prototype._transform = function(buf, encoding, callback) {
  var self = this //sry...
  var prom = new Promise(function(resolve, reject) {
    cv.readImage(buf, function(err, matrix){
      if (err) {
        reject(err)
        return self.emit('error', err)
      }
      self.push(matrix)
      callback()
      resolve()
    })
  })
  this.tailPromise = this.tailPromise.then(function() {
    return prom
  })
}

ImageMatTransform.prototype._flush = function(callback) {
  this.tailPromise.then(function() {
    callback()
  })
}

module.exports = ImageMatTransform
