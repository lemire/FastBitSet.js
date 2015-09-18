# FastBitSet.js : Speed-optimized BitSet implementation for modern browsers and JavaScript engines

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


Alternatives
===


See https://github.com/infusion/BitSet.js
