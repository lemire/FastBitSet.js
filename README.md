# FastBitSet.js : a Speed-optimized BitSet implementation

A BitSet is an ideal data structure to implement a Set when values being stored are
reasonably small integers. It can be orders of magnitude faster than an generic Set implementation.
The FastBitSet implementation optimizes for speed, leveraging commonly available features
like typed arrays.


FastBitSet.js is an optimized implementation of the BitSet (also called Bitmap or bit vector) data
structure in JavaScript. It is ideal for maintaining sets of integers.

Usage
===

```javascript
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
b.has(1); // check that the value is present! (will return true)
b.add(2);
b.add(10);
b.array(); // would return [1,2,10]
var c = new FastBitSet([1,2,3,10]); // create bitset initialized with values 1,2,3,10
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("FastBitSet.js");
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
```


Testing
===

Using node.js, you can test the code as follows...

      $ node unit/basictests.py

Alternatives
===


See https://github.com/infusion/BitSet.js
