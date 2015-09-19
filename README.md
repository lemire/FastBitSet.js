# FastBitSet.js : a Speed-optimized BitSet implementation

FastBitSet.js is an optimized implementation of the BitSet (also called Bitmap or bit vector) data
structure in JavaScript. It is ideal for maintaining sets of integers.

Usage
===

```javascript
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
b.get(1); // check that the value is present! (will return true)
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("FastBitSet.js");
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
b.get(1); // check that the value is present! (will return true)
```


Testing
===

Using node.js, you can test the code as follows...

      $ node unit/basictests.py

Alternatives
===


See https://github.com/infusion/BitSet.js
