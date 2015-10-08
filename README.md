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
$ node test.js
Benchmarking against:
infusion.BitSet.js from https://github.com/infusion/BitSet.js
tdegrunt.BitSet from https://github.com/tdegrunt/bitset
mattkrick.fast-bitset from https://github.com/mattkrick/fast-bitset
standard Set object from JavaScript

Not all libraries support all operations. We benchmark what is available.

Platform: linux 3.13.0-37-generic x64
Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz
Node version 4.1.1, v8 version 4.5.103.33

We proceed with the logical operations generating new bitmaps:

starting union query benchmark
FastBitSet (creates new bitset) x 1,543,825 ops/sec ±0.87% (88 runs sampled)
infusion.BitSet.js (creates new bitset) x 26,923 ops/sec ±0.31% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 962,227 ops/sec ±2.14% (71 runs sampled)
Set x 4,460 ops/sec ±2.45% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,120,735 ops/sec ±4.00% (64 runs sampled)
infusion.BitSet.js (creates new bitset) x 85,877 ops/sec ±2.56% (97 runs sampled)
mattkrick.fast-bitset  (creates new bitset) x 403,918 ops/sec ±5.06% (84 runs sampled)
Set x 7,867 ops/sec ±3.24% (102 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,100,308 ops/sec ±1.93% (75 runs sampled)
infusion.BitSet.js (creates new bitset) x 34,559 ops/sec ±0.15% (103 runs sampled)
Set x 4,757 ops/sec ±0.24% (102 runs sampled)
Fastest is FastBitSet (creates new bitset)

We benchmark the in-place logical operations:
(Notice how much faster they are.)

starting inplace union  benchmark
FastBitSet (inplace) x 8,216,229 ops/sec ±0.33% (94 runs sampled)
tdegrunt.BitSet (inplace) x 2,397,402 ops/sec ±0.06% (102 runs sampled)
Set (inplace) x 11,552 ops/sec ±0.08% (103 runs sampled)
Fastest is FastBitSet (inplace)

starting inplace intersection  benchmark
FastBitSet (inplace) x 14,095,609 ops/sec ±0.15% (100 runs sampled)
tdegrunt.BitSet (inplace) x 800,575 ops/sec ±0.29% (97 runs sampled)
Set (inplace) x 9,188 ops/sec ±0.04% (103 runs sampled)
Fastest is FastBitSet (inplace)

starting inplace difference  benchmark
FastBitSet (inplace) x 12,846,037 ops/sec ±0.23% (102 runs sampled)
tdegrunt.BitSet (inplace) x 3,197,791 ops/sec ±0.13% (103 runs sampled)
Set (inplace) x 8,973 ops/sec ±0.26% (103 runs sampled)
Fastest is FastBitSet (inplace)

We benchmark the operations computing the set sizes:

starting cardinality benchmark
FastBitSet x 3,084,549 ops/sec ±0.04% (99 runs sampled)
infusion.BitSet.js x 693,261 ops/sec ±0.07% (100 runs sampled)
tdegrunt.BitSet x 52,804 ops/sec ±0.09% (103 runs sampled)
mattkrick.fast-bitset x 2,966,719 ops/sec ±0.02% (99 runs sampled)
Fastest is FastBitSet

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 665,684 ops/sec ±4.85% (72 runs sampled)
infusion.BitSet.js (creates new bitset) x 27,783 ops/sec ±1.49% (101 runs sampled)
FastBitSet (fast way) x 1,263,789 ops/sec ±0.04% (98 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 323,543 ops/sec ±4.23% (85 runs sampled)
Set x 10,816 ops/sec ±2.72% (103 runs sampled)
Fastest is FastBitSet (fast way)

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 943,743 ops/sec ±1.79% (74 runs sampled)
infusion.BitSet.js (creates new bitset) x 86,037 ops/sec ±0.20% (101 runs sampled)
FastBitSet (fast way) x 2,580,053 ops/sec ±0.13% (101 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 335,642 ops/sec ±3.91% (91 runs sampled)
Set x 10,749 ops/sec ±1.78% (103 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 740,848 ops/sec ±4.18% (75 runs sampled)
infusion.BitSet.js (creates new bitset) x 33,256 ops/sec ±2.10% (101 runs sampled)
FastBitSet (fast way) x 2,230,944 ops/sec ±0.02% (102 runs sampled)
Set x 10,908 ops/sec ±0.02% (103 runs sampled)
Fastest is FastBitSet (fast way)

We conclude with other benchmarks:

starting dynamic bitmap creation benchmark
FastBitSet x 132,114 ops/sec ±5.20% (73 runs sampled)
infusion.BitSet.js x 121 ops/sec ±0.45% (80 runs sampled)
tdegrunt.BitSet x 131,799 ops/sec ±0.24% (102 runs sampled)
Set x 19,328 ops/sec ±0.27% (103 runs sampled)
Fastest is tdegrunt.BitSet,FastBitSet

starting query benchmark
FastBitSet x 62,489,644 ops/sec ±0.65% (100 runs sampled)
infusion.BitSet.js x 48,088,054 ops/sec ±0.13% (102 runs sampled)
tdegrunt.BitSet x 53,838,777 ops/sec ±0.22% (103 runs sampled)
mattkrick.fast-bitset x 47,362,598 ops/sec ±0.29% (101 runs sampled)
Set x 31,998,650 ops/sec ±0.20% (100 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 126,494 ops/sec ±0.06% (102 runs sampled)
mattkrick.fast-bitset x 39,819 ops/sec ±0.02% (103 runs sampled)
Fastest is FastBitSet

starting forEach benchmark
FastBitSet x 61,365 ops/sec ±0.10% (102 runs sampled)
FastBitSet (via array) x 10,920 ops/sec ±0.09% (103 runs sampled)
mattkrick.fast-bitset x 43,803 ops/sec ±0.09% (103 runs sampled)
Set x 43,841 ops/sec ±0.08% (102 runs sampled)
Fastest is FastBitSet

starting clone benchmark
FastBitSet x 1,052,684 ops/sec ±3.88% (56 runs sampled)
infusion.BitSet.js x 546,195 ops/sec ±1.11% (100 runs sampled)
mattkrick.fast-bitset x 120,656 ops/sec ±0.10% (101 runs sampled)
Set x 9,354 ops/sec ±0.03% (103 runs sampled)
Fastest is FastBitSet
```

You might also like...
===

If you like this library, you might also like https://github.com/lemire/FastPriorityQueue.js
