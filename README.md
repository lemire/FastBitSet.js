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
FastBitSet (creates new bitset) x 1,140,156 ops/sec ±0.88% (96 runs sampled)
infusion.BitSet.js (creates new bitset) x 26,791 ops/sec ±0.10% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 978,989 ops/sec ±2.30% (74 runs sampled)
Set x 4,652 ops/sec ±0.05% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,124,212 ops/sec ±3.96% (64 runs sampled)
infusion.BitSet.js (creates new bitset) x 87,059 ops/sec ±2.54% (94 runs sampled)
mattkrick.fast-bitset  (creates new bitset) x 400,877 ops/sec ±5.21% (84 runs sampled)
Set x 7,971 ops/sec ±2.94% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,069,268 ops/sec ±0.24% (78 runs sampled)
infusion.BitSet.js (creates new bitset) x 35,027 ops/sec ±0.26% (102 runs sampled)
Set x 4,815 ops/sec ±0.24% (102 runs sampled)
Fastest is FastBitSet (creates new bitset)

We benchmark the in-place logical operations:
(Notice how much faster they are.)

starting inplace union  benchmark
FastBitSet (inplace) x 8,200,855 ops/sec ±0.30% (100 runs sampled)
tdegrunt.BitSet (inplace) x 2,349,588 ops/sec ±1.90% (99 runs sampled)
Set (inplace) x 12,044 ops/sec ±0.08% (103 runs sampled)
Fastest is FastBitSet (inplace)

starting inplace intersection  benchmark
FastBitSet (inplace) x 13,961,946 ops/sec ±0.37% (100 runs sampled)
tdegrunt.BitSet (inplace) x 791,011 ops/sec ±0.31% (103 runs sampled)
Set (inplace) x 9,513 ops/sec ±0.04% (104 runs sampled)
Fastest is FastBitSet (inplace)

starting inplace difference  benchmark
FastBitSet (inplace) x 12,585,157 ops/sec ±0.24% (100 runs sampled)
tdegrunt.BitSet (inplace) x 3,223,880 ops/sec ±0.14% (103 runs sampled)
Set (inplace) x 9,413 ops/sec ±0.28% (101 runs sampled)
Fastest is FastBitSet (inplace)

We benchmark the operations computing the set sizes:

starting cardinality benchmark
FastBitSet x 3,089,270 ops/sec ±0.03% (100 runs sampled)
infusion.BitSet.js x 682,595 ops/sec ±0.46% (99 runs sampled)
tdegrunt.BitSet x 49,750 ops/sec ±3.10% (98 runs sampled)
mattkrick.fast-bitset x 2,964,160 ops/sec ±0.02% (102 runs sampled)
Fastest is FastBitSet

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 611,168 ops/sec ±4.43% (76 runs sampled)
infusion.BitSet.js (creates new bitset) x 27,883 ops/sec ±1.49% (98 runs sampled)
FastBitSet (fast way) x 1,287,888 ops/sec ±0.03% (94 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 348,471 ops/sec ±3.02% (94 runs sampled)
Set x 11,076 ops/sec ±0.37% (102 runs sampled)
Fastest is FastBitSet (fast way)

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 864,501 ops/sec ±2.83% (70 runs sampled)
infusion.BitSet.js (creates new bitset) x 84,994 ops/sec ±2.16% (103 runs sampled)
FastBitSet (fast way) x 2,573,319 ops/sec ±0.15% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 330,273 ops/sec ±3.95% (89 runs sampled)
Set x 10,908 ops/sec ±1.79% (104 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 606,325 ops/sec ±4.47% (75 runs sampled)
infusion.BitSet.js (creates new bitset) x 33,549 ops/sec ±1.46% (101 runs sampled)
FastBitSet (fast way) x 2,225,576 ops/sec ±0.03% (101 runs sampled)
Set x 11,038 ops/sec ±0.02% (104 runs sampled)
Fastest is FastBitSet (fast way)

We conclude with other benchmarks:

starting dynamic bitmap creation benchmark
FastBitSet x 142,133 ops/sec ±5.36% (69 runs sampled)
infusion.BitSet.js x 121 ops/sec ±0.31% (80 runs sampled)
tdegrunt.BitSet x 134,013 ops/sec ±0.24% (99 runs sampled)
Set x 19,112 ops/sec ±0.35% (103 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 61,037,193 ops/sec ±0.93% (98 runs sampled)
infusion.BitSet.js x 47,334,570 ops/sec ±0.27% (102 runs sampled)
tdegrunt.BitSet x 52,055,301 ops/sec ±0.39% (101 runs sampled)
mattkrick.fast-bitset x 46,637,029 ops/sec ±0.30% (103 runs sampled)
Set x 31,050,456 ops/sec ±0.52% (100 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 126,317 ops/sec ±0.11% (98 runs sampled)
mattkrick.fast-bitset x 39,476 ops/sec ±0.02% (104 runs sampled)
Fastest is FastBitSet

starting forEach benchmark
FastBitSet x 61,467 ops/sec ±0.18% (100 runs sampled)
FastBitSet (via array) x 10,740 ops/sec ±0.07% (101 runs sampled)
mattkrick.fast-bitset x 43,834 ops/sec ±0.09% (100 runs sampled)
Set x 43,870 ops/sec ±0.06% (104 runs sampled)
Fastest is FastBitSet

starting clone benchmark
FastBitSet x 1,088,288 ops/sec ±3.76% (57 runs sampled)
infusion.BitSet.js x 531,356 ops/sec ±0.12% (98 runs sampled)
mattkrick.fast-bitset x 122,642 ops/sec ±0.14% (102 runs sampled)
Set x 9,211 ops/sec ±0.05% (102 runs sampled)
Fastest is FastBitSet
```

You might also like...
===

If you like this library, you might also like https://github.com/lemire/FastPriorityQueue.js
