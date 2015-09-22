# FastBitSet.js : a speed-optimized BitSet implementation

A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than a generic set implementation. Moreover, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed, leveraging commonly available features
like typed arrays. It can be several times faster than competitive alternatives. It should be supported by most of the modern browsers and JavaScript
engines.  It is ideal for maintaining sets of integers when performance matters.


Is it faster?
===

It can be quite fast compared to competitive alternatives :

```bash
FastBitSet.js/benchmark$ nodejs test.js
Benchmarking against:
infusion.BitSet.js from https://github.com/infusion/BitSet.js
tdegrunt.BitSet from https://github.com/tdegrunt/bitset
Platform: linux x64

starting difference query benchmark
FastBitSet (creates new bitset) x 1,345,935 ops/sec ±0.72% (91 runs sampled)
BitSet (creates new bitset) x 267,798 ops/sec ±0.24% (102 runs sampled)
tdegrunt.BitSet (inplace) x 3,072,864 ops/sec ±0.12% (103 runs sampled)
FastBitSet (inplace) x 5,855,271 ops/sec ±0.44% (102 runs sampled)
Fastest is FastBitSet (inplace)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,158,913 ops/sec ±1.69% (85 runs sampled)
BitSet (creates new bitset) x 464,984 ops/sec ±0.05% (102 runs sampled)
tdegrunt.BitSet (inplace) x 774,494 ops/sec ±0.04% (101 runs sampled)
FastBitSet (inplace) x 5,772,496 ops/sec ±0.03% (103 runs sampled)
Fastest is FastBitSet (inplace)

starting union query benchmark
FastBitSet (creates new bitset) x 465,877 ops/sec ±2.93% (73 runs sampled)
BitSet (creates new bitset) x 108,882 ops/sec ±0.54% (102 runs sampled)
tdegrunt.BitSet (inplace) x 1,850,252 ops/sec ±0.21% (101 runs sampled)
FastBitSet (inplace) x 2,525,279 ops/sec ±0.16% (104 runs sampled)
Fastest is FastBitSet (inplace)

starting cardinality benchmark
FastBitSet x 2,556,262 ops/sec ±0.04% (102 runs sampled)
BitSet x 881,624 ops/sec ±0.26% (100 runs sampled)
tdegrunt.BitSet x 52,534 ops/sec ±0.58% (104 runs sampled)
Fastest is FastBitSet

starting bitmap creation benchmark
FastBitSet x 90,980 ops/sec ±0.81% (98 runs sampled)
BitSet x 136 ops/sec ±0.31% (89 runs sampled)
tdegrunt.BitSet x 81,738 ops/sec ±0.32% (101 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 82,342,683 ops/sec ±0.75% (102 runs sampled)
BitSet x 61,559,497 ops/sec ±0.07% (97 runs sampled)
tdegrunt.BitSet x 75,025,118 ops/sec ±0.01% (104 runs sampled)
Fastest is FastBitSet
```

Usage
===

```javascript
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
b.has(1); // check that the value is present! (will return true)
b.add(2);
console.log(""+b);// should display {1,2}
b.add(10);
b.array(); // would return [1,2,10]
var c = new FastBitSet([1,2,3,10]); // create bitset initialized with values 1,2,3,10
c.difference(b); // from c, remove elements that are in b
var su = c.union_size(b);// compute the size of the union (bitsets are unchanged)
c.union(b); // c will contain all elements that are in c and b
var s1 = c.intersection_size(b);// compute the size of the intersection (bitsets are unchanged)
c.intersection(b); // c will only contain elements that are in both c and b
c = b.clone(); // create a (deep) copy of b and assign it to c.
c.equals(b); // check whether c and b are equal
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("FastBitSet");
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
```
npm install
===

      $ npm install fastbitset

Testing
===

Using node.js, you can test the code as follows...

      $ nodejs unit/basictests.js



