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
         // will throw exception if typed arrays are not supported
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
FastBitSet (creates new bitset) x 2,196,041 ops/sec ±0.29% (103 runs sampled)
infusion.BitSet.js (creates new bitset) x 27,266 ops/sec ±0.13% (101 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 971,938 ops/sec ±2.92% (81 runs sampled)
Set x 4,515 ops/sec ±0.04% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 3,248,658 ops/sec ±0.17% (104 runs sampled)
infusion.BitSet.js (creates new bitset) x 87,714 ops/sec ±1.78% (101 runs sampled)
mattkrick.fast-bitset  (creates new bitset) x 405,868 ops/sec ±4.67% (85 runs sampled)
Set x 7,920 ops/sec ±2.91% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,743,005 ops/sec ±0.04% (104 runs sampled)
infusion.BitSet.js (creates new bitset) x 35,066 ops/sec ±0.06% (103 runs sampled)
Set x 4,696 ops/sec ±0.24% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

We benchmark the in-place logical operations:
(Notice how much faster they are.)

starting inplace union  benchmark
FastBitSet (inplace) x 6,876,050 ops/sec ±0.07% (103 runs sampled)
tdegrunt.BitSet (inplace) x 2,379,692 ops/sec ±0.01% (102 runs sampled)
Set (inplace) x 11,752 ops/sec ±0.12% (103 runs sampled)
Fastest is FastBitSet (inplace)

starting inplace intersection  benchmark
FastBitSet (inplace) x 11,313,366 ops/sec ±0.60% (98 runs sampled)
tdegrunt.BitSet (inplace) x 800,739 ops/sec ±0.03% (102 runs sampled)
Set (inplace) x 9,194 ops/sec ±0.04% (104 runs sampled)
Fastest is FastBitSet (inplace)

starting inplace difference  benchmark
FastBitSet (inplace) x 8,002,218 ops/sec ±0.42% (100 runs sampled)
tdegrunt.BitSet (inplace) x 3,156,854 ops/sec ±0.29% (99 runs sampled)
Set (inplace) x 9,053 ops/sec ±0.03% (104 runs sampled)
Fastest is FastBitSet (inplace)

We benchmark the operations computing the set sizes:

starting cardinality benchmark
FastBitSet x 2,930,665 ops/sec ±0.06% (96 runs sampled)
infusion.BitSet.js x 692,136 ops/sec ±0.19% (100 runs sampled)
tdegrunt.BitSet x 52,660 ops/sec ±0.02% (103 runs sampled)
mattkrick.fast-bitset x 2,956,736 ops/sec ±0.12% (102 runs sampled)
Fastest is mattkrick.fast-bitset

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 894,647 ops/sec ±0.06% (102 runs sampled)
infusion.BitSet.js (creates new bitset) x 27,903 ops/sec ±0.86% (100 runs sampled)
FastBitSet (fast way) x 1,208,316 ops/sec ±0.03% (100 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 321,644 ops/sec ±4.05% (85 runs sampled)
Set x 10,613 ops/sec ±2.65% (103 runs sampled)
Fastest is FastBitSet (fast way)

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 1,598,604 ops/sec ±0.04% (103 runs sampled)
infusion.BitSet.js (creates new bitset) x 86,344 ops/sec ±0.26% (99 runs sampled)
FastBitSet (fast way) x 2,324,267 ops/sec ±0.04% (98 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 325,812 ops/sec ±4.05% (89 runs sampled)
Set x 11,024 ops/sec ±2.13% (103 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 895,431 ops/sec ±0.05% (104 runs sampled)
infusion.BitSet.js (creates new bitset) x 33,586 ops/sec ±0.08% (103 runs sampled)
FastBitSet (fast way) x 2,094,454 ops/sec ±0.01% (98 runs sampled)
Set x 11,103 ops/sec ±0.39% (104 runs sampled)
Fastest is FastBitSet (fast way)

We conclude with other benchmarks:

starting dynamic bitmap creation benchmark
FastBitSet x 193,953 ops/sec ±0.15% (101 runs sampled)
infusion.BitSet.js x 121 ops/sec ±0.19% (80 runs sampled)
tdegrunt.BitSet x 130,862 ops/sec ±0.13% (102 runs sampled)
Set x 19,107 ops/sec ±0.56% (100 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 64,715,329 ops/sec ±0.41% (101 runs sampled)
infusion.BitSet.js x 47,955,882 ops/sec ±0.28% (103 runs sampled)
tdegrunt.BitSet x 53,772,416 ops/sec ±0.25% (103 runs sampled)
mattkrick.fast-bitset x 48,148,095 ops/sec ±0.23% (101 runs sampled)
Set x 32,188,164 ops/sec ±0.13% (99 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 203,837 ops/sec ±0.07% (104 runs sampled)
mattkrick.fast-bitset x 39,750 ops/sec ±0.03% (104 runs sampled)
Fastest is FastBitSet

starting forEach benchmark
FastBitSet x 81,312 ops/sec ±0.12% (99 runs sampled)
FastBitSet (via array) x 11,153 ops/sec ±0.28% (103 runs sampled)
mattkrick.fast-bitset x 43,884 ops/sec ±0.06% (98 runs sampled)
Set x 43,745 ops/sec ±0.11% (100 runs sampled)
Fastest is FastBitSet

starting clone benchmark
FastBitSet x 2,040,245 ops/sec ±0.08% (100 runs sampled)
infusion.BitSet.js x 525,031 ops/sec ±0.26% (100 runs sampled)
mattkrick.fast-bitset x 120,666 ops/sec ±0.13% (101 runs sampled)
Set x 9,413 ops/sec ±0.03% (103 runs sampled)
Fastest is FastBitSet
```

You might also like...
===

If you like this library, you might also like https://github.com/lemire/FastPriorityQueue.js
