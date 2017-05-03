# FastBitSet.js : a speed-optimized BitSet implementation
[![Build Status](https://travis-ci.org/lemire/FastBitSet.js.png)](https://travis-ci.org/lemire/FastBitSet.js)


A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than a generic set implementation. In particular, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed, leveraging commonly available features
like typed arrays. It can be several times faster than competitive alternatives. It is also entirely
dynamic, and has functions to minimize the memory usage. It should be supported by most of the modern 
browsers and JavaScript engines.  It is ideal for maintaining sets of integers when performance matters.

License: Apache License 2.0



Usage
===

```javascript
var b = new FastBitSet();// initially empty
b.add(1);// add the value "1"
b.has(1); // check that the value is present! (will return true)
b.add(2);
console.log(""+b);// should display {1,2}
b.add(10);
b.array(); // would return [1,2,10]
var c = new FastBitSet([1,2,3,10]); // create bitset initialized with values 1,2,3,10
c.difference(b); // from c, remove elements that are in b
var su = c.union_size(b);// compute the size of the union (bitsets are unchanged)
c.union(b); // c will contain all elements that are in c and b
var out1 = c.new_union(b); // creates a new bitmap that contains everything in c and b
var out2 = c.new_intersection(b); // creates a new bitmap that contains everything that is in both c and b
var s1 = c.intersection_size(b);// compute the size of the intersection (bitsets are unchanged)
var s3 = c.difference_size(b);// compute the size of the difference (bitsets are unchanged)
c.intersects(b); // return true if c intersects with b
c.intersection(b); // c will only contain elements that are in both c and b
c = b.clone(); // create a (deep) copy of b and assign it to c.
c.equals(b); // checks whether c and b are equal
c.forEach(fnc); // execute fnc on each value stored in c
c.trim(); // reduce the memory usage of the bitmap if possible, the content remains the same
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("fastbitset");
var b = new FastBitSet();// initially empty
b.set(1);// add the value "1"
```


Performance tip: in-place functions such as intersection, union and difference can be
much faster than functions generating a new bitmap (new_intersection, new_union
and new_difference) because they avoid creating a new object, a potentially
expensive process in JavaScript. For faster code, use as few FastBitSet objects as
you can.



npm install
===

      $ npm install fastbitset

Testing
===

Using node.js (npm), you can test the code as follows...

      $ npm install mocha
      $ npm test



Is it faster?
===

It can be quite fast compared to competitive alternatives :

```bash
$ node test
Benchmarking against:
infusion.BitSet.js from https://github.com/infusion/BitSet.js 4.0.0
tdegrunt.BitSet from https://github.com/tdegrunt/bitset 0.3.0
mattkrick.fast-bitset from https://github.com/mattkrick/fast-bitset 1.3.2
standard Set object from JavaScript

Not all libraries support all operations. We benchmark what is available.

Platform: linux 4.4.0-38-generic x64
Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz
Node version 4.5.0, v8 version 4.5.103.37

We proceed with the logical operations generating new bitmaps:

starting union query benchmark
FastBitSet (creates new bitset) x 2,581,722 ops/sec ±0.12% (102 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 1,101,507 ops/sec ±2.71% (79 runs sampled)
Set x 5,165 ops/sec ±0.04% (103 runs sampled)

starting intersection query benchmark
FastBitSet (creates new bitset) x 3,959,209 ops/sec ±0.16% (101 runs sampled)
mattkrick.fast-bitset  (creates new bitset) x 412,694 ops/sec ±4.47% (85 runs sampled)
Set x 8,630 ops/sec ±2.45% (104 runs sampled)

starting difference query benchmark
FastBitSet (creates new bitset) x 3,729,143 ops/sec ±0.04% (102 runs sampled)
Set x 5,318 ops/sec ±0.01% (103 runs sampled)

We benchmark the in-place logical operations:
(Notice how much faster they are.)

starting inplace union  benchmark
FastBitSet (inplace) x 8,156,508 ops/sec ±0.26% (102 runs sampled)
infusion.BitSet.js (inplace) x 3,506,363 ops/sec ±0.06% (102 runs sampled)
tdegrunt.BitSet (inplace) x 2,383,914 ops/sec ±0.15% (99 runs sampled)
Set (inplace) x 13,158 ops/sec ±0.08% (103 runs sampled)

starting inplace intersection  benchmark
FastBitSet (inplace) x 14,457,844 ops/sec ±0.01% (100 runs sampled)
infusion.BitSet.js (inplace) x 7,729,478 ops/sec ±0.02% (101 runs sampled)
tdegrunt.BitSet (inplace) x 929,802 ops/sec ±0.20% (100 runs sampled)
Set (inplace) x 10,221 ops/sec ±0.02% (104 runs sampled)

starting inplace difference  benchmark
FastBitSet (inplace) x 13,036,342 ops/sec ±0.11% (101 runs sampled)
infusion.BitSet.js (inplace) x 7,771,767 ops/sec ±0.08% (95 runs sampled)
tdegrunt.BitSet (inplace) x 3,560,648 ops/sec ±0.27% (99 runs sampled)
Set (inplace) x 9,949 ops/sec ±0.01% (104 runs sampled)

We benchmark the operations computing the set sizes:

starting cardinality benchmark
FastBitSet x 3,314,520 ops/sec ±0.01% (102 runs sampled)
infusion.BitSet.js x 3,112,865 ops/sec ±0.06% (102 runs sampled)
tdegrunt.BitSet x 58,429 ops/sec ±0.08% (101 runs sampled)
mattkrick.fast-bitset x 3,075,766 ops/sec ±0.01% (101 runs sampled)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 965,350 ops/sec ±0.04% (100 runs sampled)
FastBitSet (fast way) x 1,462,068 ops/sec ±0.01% (101 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 337,629 ops/sec ±3.68% (88 runs sampled)
Set x 11,750 ops/sec ±1.13% (104 runs sampled)

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 1,774,808 ops/sec ±0.03% (104 runs sampled)
FastBitSet (fast way) x 3,100,827 ops/sec ±0.01% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 352,910 ops/sec ±2.99% (92 runs sampled)
Set x 11,817 ops/sec ±0.62% (103 runs sampled)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 965,075 ops/sec ±0.04% (102 runs sampled)
FastBitSet (fast way) x 2,676,089 ops/sec ±0.01% (102 runs sampled)
Set x 11,869 ops/sec ±0.20% (103 runs sampled)

We conclude with other benchmarks:

starting dynamic bitmap creation benchmark
FastBitSet x 347,688 ops/sec ±0.01% (103 runs sampled)
infusion.BitSet.js x 339,792 ops/sec ±0.01% (102 runs sampled)
tdegrunt.BitSet x 143,816 ops/sec ±0.02% (102 runs sampled)
Set x 20,351 ops/sec ±0.25% (102 runs sampled)

starting query benchmark
FastBitSet x 76,668,447 ops/sec ±0.20% (100 runs sampled)
infusion.BitSet.js x 73,101,549 ops/sec ±0.29% (102 runs sampled)
tdegrunt.BitSet x 67,048,695 ops/sec ±0.46% (100 runs sampled)
mattkrick.fast-bitset x 55,030,538 ops/sec ±0.48% (96 runs sampled)
Set x 35,947,061 ops/sec ±0.39% (102 runs sampled)

starting array extraction benchmark
FastBitSet x 218,474 ops/sec ±0.03% (97 runs sampled)
infusion.BitSet.js x 10,115 ops/sec ±0.06% (102 runs sampled)
mattkrick.fast-bitset x 40,619 ops/sec ±0.02% (100 runs sampled)

starting forEach benchmark
FastBitSet x 89,700 ops/sec ±0.10% (102 runs sampled)
FastBitSet (via array) x 10,835 ops/sec ±0.04% (101 runs sampled)
mattkrick.fast-bitset x 44,483 ops/sec ±0.04% (102 runs sampled)
Set x 44,816 ops/sec ±0.08% (103 runs sampled)

starting clone benchmark
FastBitSet x 4,975,879 ops/sec ±0.24% (102 runs sampled)
infusion.BitSet.js x 4,826,205 ops/sec ±0.11% (101 runs sampled)
mattkrick.fast-bitset x 127,890 ops/sec ±0.74% (99 runs sampled)
Set x 10,349 ops/sec ±0.03% (103 runs sampled)
```


You might also like...
===

If you like this library, you might also like 
- https://github.com/lemire/FastPriorityQueue.js
- https://github.com/lemire/StablePriorityQueue.js
- https://github.com/lemire/FastIntegerCompression.js
