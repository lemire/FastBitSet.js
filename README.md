# FastBitSet.js : a speed-optimized BitSet implementation


A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than a generic set implementation. In particular, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed. It can be several times faster than competitive alternatives. It is also entirely
dynamic, and has functions to minimize the memory usage. It should be supported by most of the modern
browsers and JavaScript engines.  It is ideal for maintaining sets of integers when performance matters.

For high-performance and low-memory usage, consider the even better [roaring](https://www.npmjs.com/package/roaring) library: it should surpass both FastBitSet for a wide range of tasks in Node.js.

License: Apache License 2.0



Usage
===

```javascript
const b = new FastBitSet();// initially empty
b.add(1);// add the value "1"
b.has(1); // check that the value is present! (will return true)
b.add(2);
console.log(""+b);// should display {1,2}
b.add(10);
b.array(); // would return [1,2,10]
let c = new FastBitSet([1,2,3,10]); // create bitset initialized with values 1,2,3,10
c.difference(b); // from c, remove elements that are in b (modifies c)
c.difference2(b) // from c, remove elements that are in b (modifies b)
c.change(b); // c will contain all elements that are in b or in c, but not both (elements that changed)
const su = c.union_size(b);// compute the size of the union (bitsets are unchanged)
c.union(b); // c will contain all elements that are in c and b
const out1 = c.new_union(b); // creates a new bitmap that contains everything in c and b
const out2 = c.new_intersection(b); // creates a new bitmap that contains everything that is in both c and b
const out3 = c.new_change(b); // creates a new bitmap that contains everything in b or in c, but not both
const s1 = c.intersection_size(b);// compute the size of the intersection (bitsets are unchanged)
const s2 = c.difference_size(b);// compute the size of the difference (bitsets are unchanged)
const s3 = c.change_size(b); // compute the number of elements that are in b but not c, or vice versa
c.intersects(b); // return true if c intersects with b
c.intersection(b); // c will only contain elements that are in both c and b
c = b.clone(); // create a (deep) copy of b and assign it to c.
c.equals(b); // checks whether c and b are equal
c.forEach(fnc); // execute fnc on each value stored in c
for (const x of c) fnc(x); // execute fnc on each value stored in c (allows early exit with break)
c.trim(); // reduce the memory usage of the bitmap if possible, the content remains the same
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("fastbitset");
var b = new FastBitSet();// initially empty
b.add(1);// add the value "1"
```


Performance tip: in-place functions such as intersection, union and difference can be
much faster than functions generating a new bitmap (new_intersection, new_union
and new_difference) because they avoid creating a new object, a potentially
expensive process in JavaScript. For faster code, use as few FastBitSet objects as
you can.

API
===

## Constructor

- `new FastBitSet([iterable])` - Creates a new FastBitSet. If an iterable is provided, initializes the set with its values.

## Static Methods

- `FastBitSet.fromWords(words)` - Creates a FastBitSet from an array (or typed array) of 32-bit words. Signed and unsigned words are both accepted. An ordinary array of signed 32-bit integers may be used directly without a copy, so do not modify it afterwards.

## Instance Methods

### Size and Memory

- `size()` - Returns the number of values stored in the set.
- `trim()` - Reduces memory usage to a minimum.
- `resize(index)` - Ensures the bitset can store values up to the given index.

### Basic Operations

- `add(index)` - Adds the value (sets the bit at index to true).
- `remove(index)` - Removes the value (sets the bit at index to false).
- `has(index)` - Returns true if the value is in the set.
- `flip(index)` - Flips the bit at index (adds if not present, removes if present).
- `checkedAdd(index)` - Tries to add the value, returns 1 if added, 0 if already present.
- `clear()` - Removes all values and resets memory usage.
- `isEmpty()` - Returns true if no bits are set.

If you call `add`, `checkedAdd`, `flip` repeatedly, in a way that extends the
bitset, you may want to call `resize(maxvalue)`


### Iteration and Conversion

- `array()` - Returns an array with all set bit locations.
- `forEach(fnc)` - Executes a function on each value stored in the set.
- `toString()` - Returns a string representation of the set.
- `[Symbol.iterator]()` - Returns an iterator over the set values.

### Set Operations (In-place)

- `intersection(otherbitmap)` - Modifies this set to contain only elements present in both sets.
- `union(otherbitmap)` - Modifies this set to contain all elements from both sets.
- `difference(otherbitmap)` - Modifies this set to remove elements present in the other set (A = A - B).
- `difference2(otherbitmap)` - Modifies the other set to contain the difference (B = A - B).
- `change(otherbitmap)` - Modifies this set to contain elements that are in one set but not both (XOR).

### Set Operations (New Set)

- `new_intersection(otherbitmap)` - Returns a new set containing the intersection.
- `new_union(otherbitmap)` - Returns a new set containing the union.
- `new_difference(otherbitmap)` - Returns a new set containing the difference.
- `new_change(otherbitmap)` - Returns a new set containing the symmetric difference (XOR).

### Size Queries

- `intersection_size(otherbitmap)` - Returns the size of the intersection without modifying sets.
- `union_size(otherbitmap)` - Returns the size of the union without modifying sets.
- `difference_size(otherbitmap)` - Returns the size of the difference without modifying sets.
- `change_size(otherbitmap)` - Returns the number of elements that differ between the sets.

### Comparison and Utility

- `intersects(otherbitmap)` - Returns true if the sets have any common elements.
- `equals(otherbitmap)` - Checks if this set is equal to another.
- `clone()` - Creates a deep copy of the set.

npm install
===

      $ npm install fastbitset

Testing
===

Using node.js (npm), you can test the code as follows...

      $ npm install mocha
      $ npm test



Benchmarking
===

The library includes comprehensive benchmarks comparing FastBitSet against other popular bit set implementations.

### Running All Benchmarks

To run all benchmarks:

      $ npm run benchmark

This will execute all available benchmark tests and display performance comparisons.

### Running Specific Benchmarks

You can run individual benchmarks for faster, focused testing:

      $ npm run benchmark -- --list

This shows all available benchmark categories:

- `create` - Dynamic bitmap creation
- `array` - Array extraction performance  
- `foreach` - Iteration performance
- `cardinality` - Size calculation
- `query` - Membership testing
- `clone` - Cloning performance
- `intersection` - Set intersection operations
- `union` - Set union operations
- `difference` - Set difference operations
- `xor` - Symmetric difference (XOR) operations
- And their variants: `-card` (size-only), `-inplace` (modifying)

To run a specific benchmark:

      $ npm run benchmark -- --select create
      $ npm run benchmark -- --select foreach
      $ npm run benchmark -- --select xor


Is it faster?
===

It can be quite fast compared to competitive alternatives :

```bash
$ node test.js
Benchmarking against:
TypedFastBitSet.js: https://github.com/lemire/TypedFastBitSet.js
roaring: https://www.npmjs.com/package/roaring
infusion.BitSet.js from https://github.com/infusion/BitSet.js 5.0.0
tdegrunt.BitSet from https://github.com/tdegrunt/bitset 5.0.3
mattkrick.fast-bitset from https://github.com/mattkrick/fast-bitset 1.3.2
standard Set object from JavaScript

Not all libraries support all operations. We benchmark what is available.

Platform: linux 4.4.0-135-generic x64
Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz
Node version 10.9.0, v8 version 6.8.275.24-node.14

We proceed with the logical operations generating new bitmaps:

starting union query benchmark
roaring x 4,006 ops/sec ±0.07% (103 runs sampled)
FastBitSet (creates new bitset) x 1,140 ops/sec ±16.91% (90 runs sampled)
TypedFastBitSet (creates new bitset) x 3,153 ops/sec ±0.99% (80 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 2,869 ops/sec ±2.08% (87 runs sampled)
Set x 3.38 ops/sec ±0.23% (13 runs sampled)

starting intersection query benchmark
FastBitSet (creates new bitset) x 2,413 ops/sec ±1.69% (90 runs sampled)
TypedFastBitSet (creates new bitset) x 5,340 ops/sec ±0.84% (81 runs sampled)
mattkrick.fast-bitset  (creates new bitset) x 495 ops/sec ±1.09% (96 runs sampled)
roaring x 16,553 ops/sec ±9.27% (79 runs sampled)
Set x 5.03 ops/sec ±17.84% (18 runs sampled)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,972 ops/sec ±2.52% (89 runs sampled)
TypedFastBitSet (creates new bitset) x 3,732 ops/sec ±1.36% (60 runs sampled)
Set x 3.71 ops/sec ±0.12% (13 runs sampled)

We benchmark the in-place logical operations:
(Notice how much faster they are.)

starting inplace union  benchmark
FastBitSet (inplace) x 4,850 ops/sec ±0.05% (104 runs sampled)
TypedFastBitSet (inplace) x 4,489 ops/sec ±0.03% (104 runs sampled)
infusion.BitSet.js (inplace) x 68.75 ops/sec ±1.21% (73 runs sampled)
tdegrunt.BitSet (inplace) x 69.55 ops/sec ±1.29% (74 runs sampled)
roaring x 24,969 ops/sec ±0.09% (100 runs sampled)
Set (inplace) x 12.05 ops/sec ±0.12% (35 runs sampled)

starting inplace intersection  benchmark
FastBitSet (inplace) x 12,260 ops/sec ±2.71% (103 runs sampled)
TypedFastBitSet (inplace) x 10,744 ops/sec ±0.96% (101 runs sampled)
infusion.BitSet.js (inplace) x 1,340 ops/sec ±2.06% (91 runs sampled)
tdegrunt.BitSet (inplace) x 1,358 ops/sec ±2.19% (92 runs sampled)
roaring x 41,172 ops/sec ±0.07% (104 runs sampled)
Set (inplace) x 6.88 ops/sec ±0.08% (22 runs sampled)

starting inplace difference  benchmark
FastBitSet (inplace) x 12,434 ops/sec ±0.39% (101 runs sampled)
TypedFastBitSet (inplace) x 10,631 ops/sec ±0.24% (100 runs sampled)
infusion.BitSet.js (inplace) x 597 ops/sec ±2.15% (87 runs sampled)
tdegrunt.BitSet (inplace) x 601 ops/sec ±2.37% (88 runs sampled)
roaring x 49,582 ops/sec ±0.06% (104 runs sampled)
Set (inplace) x 6.70 ops/sec ±0.10% (21 runs sampled)

We benchmark the operations computing the set sizes:

starting cardinality benchmark
FastBitSet x 5,160 ops/sec ±0.71% (102 runs sampled)
TypedFastBitSet x 5,165 ops/sec ±0.70% (102 runs sampled)
infusion.BitSet.js x 5,293 ops/sec ±0.01% (104 runs sampled)
tdegrunt.BitSet x 5,295 ops/sec ±0.02% (104 runs sampled)
mattkrick.fast-bitset x 4,753 ops/sec ±0.02% (104 runs sampled)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 563 ops/sec ±1.29% (92 runs sampled)
FastBitSet (fast way) x 2,369 ops/sec ±0.01% (103 runs sampled)
TypedFastBitSet (creates new bitset) x 1,248 ops/sec ±1.68% (84 runs sampled)
TypedFastBitSet (fast way) x 2,454 ops/sec ±0.11% (102 runs sampled)
roaring x 59,798 ops/sec ±0.08% (101 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 1,232 ops/sec ±1.43% (84 runs sampled)
Set x 9.09 ops/sec ±0.16% (27 runs sampled)

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 1,098 ops/sec ±1.61% (96 runs sampled)
FastBitSet (fast way) x 4,568 ops/sec ±0.02% (104 runs sampled)
TypedFastBitSet (creates new bitset) x 2,440 ops/sec ±1.57% (84 runs sampled)
TypedFastBitSet (fast way) x 4,812 ops/sec ±0.61% (101 runs sampled)
roaring x 60,769 ops/sec ±0.08% (102 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 400 ops/sec ±1.66% (91 runs sampled)
Set x 9.12 ops/sec ±0.09% (27 runs sampled)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 567 ops/sec ±1.50% (93 runs sampled)
FastBitSet (fast way) x 4,287 ops/sec ±0.03% (103 runs sampled)
TypedFastBitSet (creates new bitset) x 1,246 ops/sec ±1.59% (84 runs sampled)
TypedFastBitSet (fast way) x 4,581 ops/sec ±0.05% (103 runs sampled)
roaring x 60,438 ops/sec ±0.07% (101 runs sampled)
Set x 9.12 ops/sec ±0.07% (27 runs sampled)

We conclude with other benchmarks:

starting dynamic bitmap creation benchmark
FastBitSet x 268 ops/sec ±1.27% (88 runs sampled)
TypedFastBitSet x 328 ops/sec ±1.84% (90 runs sampled)
infusion.BitSet.js x 235 ops/sec ±1.46% (87 runs sampled)
tdegrunt.BitSet x 232 ops/sec ±1.46% (87 runs sampled)
Set x 10.05 ops/sec ±1.39% (30 runs sampled)

starting query benchmark
FastBitSet x 177,278,318 ops/sec ±0.11% (104 runs sampled)
TypedFastBitSet x 174,176,611 ops/sec ±0.16% (99 runs sampled)
infusion.BitSet.js x 167,893,143 ops/sec ±0.62% (100 runs sampled)
tdegrunt.BitSet x 181,343,910 ops/sec ±0.07% (99 runs sampled)
mattkrick.fast-bitset x 145,328,815 ops/sec ±0.16% (100 runs sampled)
Set x 76,784,958 ops/sec ±0.01% (104 runs sampled)
```


You might also like...
===

If you like this library, you might also like
- https://github.com/lemire/TypedFastBitSet.js
- https://github.com/lemire/FastPriorityQueue.js
- https://github.com/lemire/StablePriorityQueue.js
- https://github.com/lemire/FastIntegerCompression.js
