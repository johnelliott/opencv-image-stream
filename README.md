# opencv image stream

transform images to openCV matrix objects

# example

```js
var OCS = require('opencv-image-stream')

var transform = new OCS() // transform stream

require('fs').createReadStream('./test/image.jpg').pipe(transform).on('data', console.log) // [ Matrix 133x174 ]
```
# About
Use with [node-opencv](https://github.com/peterbraden/node-opencv).
