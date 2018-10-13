/* performance benchmark */
/* This script expects node.js */

'use strict';

var FastBitSet = require('../FastBitSet.js');
var TypedFastBitSet = require('typedfastbitset');
var BitSet = require('bitset.js');
var Benchmark = require('benchmark');
var tBitSet = require('bitset');
var fBitSet = require('fast-bitset');
var roaring = require('roaring');
var os = require('os');

var genericSetIntersection = function(set1, set2) {
  var answer = new Set();
  if (set2.length > set1.length) {
    for (var j of set1) {
      if (set2.has(j)) {
        answer.add(j);
      }
    }
  } else {
    for (var j of set2) {
      if (set1.has(j)) {
        answer.add(j);
      }
    }
  }
  return answer;
};

var genericInplaceSetIntersection = function(set1, set2) {
  for (var j of set2) {
    if (!set1.has(j)) {
      set1.delete(j);
    }
  }
  return set1;
};

var genericSetIntersectionCard = function(set1, set2) {
  var answer = 0;
  if (set2.length > set1.length) {
    for (var j of set1) {
      if (set2.has(j)) {
        answer ++;
      }
    }
  } else {
    for (var j of set2.values()) {
      if (set1.has(j)) {
        answer ++;
      }
    }
  }
  return answer;
};

var genericSetUnion = function(set1, set2) {
  var answer = new Set(set1);
  for (var j of set2) {
    answer.add(j);
  }
  return answer;
};

var genericInplaceSetUnion = function(set1, set2) {
  for (var j of set2) {
    set1.add(j);
  }
  return set1;
};
var genericSetUnionCard = function(set1, set2) {
  return set1.size + set2.size - genericSetIntersectionCard(set1,set2);
};

var genericSetDifference = function(set1, set2) {
  var answer = new Set(set1);
  for (var j of set2) {
    answer.delete(j);
  }
  return answer;
};

var genericInplaceSetDifference = function(set1, set2) {
  for (var j of set2) {
    set1.delete(j);
  }
  return set1;
};

var genericSetDifferenceCard = function(set1, set2) {
  return set1.size - genericSetIntersectionCard(set1,set2);
};

const N = 1024 * 1024;

function CreateBench() {
  console.log('starting dynamic bitmap creation benchmark');
  var b = new FastBitSet();
  var tb = new TypedFastBitSet();

  var bs = new BitSet();
  var bt = new tBitSet();
  var fb = new fBitSet(3 * N + 5);
  for (var i = 0 ; i < N  ; i++) {
    b.add(3 * i + 5);
    bs = bs.set(3 * i + 5,true);
    bt.set(3 * i + 5);
    fb.set(3 * i + 5);
  }
  if (bs.cardinality() != b.size()) throw 'something is off';
  if (bs.cardinality() != bt.cardinality()) throw 'something is off';
  if (bs.cardinality() != fb.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet', function() {
    var b = new FastBitSet();
    for (var i = 0 ; i < N  ; i++) {
      b.add(3 * i + 5);
    }
    return b;
  })
  .add('TypedFastBitSet', function() {
    var b = new TypedFastBitSet();
    for (var i = 0 ; i < N  ; i++) {
      b.add(3 * i + 5);
    }
    return b;
  })
    .add('infusion.BitSet.js', function() {
      var bs = new BitSet();
      for (var i = 0 ; i < N  ; i++) {
        bs = bs.set(3 * i + 5,true);
      }
      return bs;
    })
    .add('tdegrunt.BitSet', function() {
      var bt = new tBitSet();
      for (var i = 0 ; i < N  ; i++) {
        bt.set(3 * i + 5);
      }
      return bt;
    })
    .add('Set', function() {
      var bt = new Set();
      for (var i = 0 ; i < N  ; i++) {
        bt.add(3 * i + 5);
      }
      return bt;
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function ArrayBench() {
  console.log('starting array extraction benchmark');
  var b = new FastBitSet();
  var tb = new TypedFastBitSet();
  var bs = new BitSet();
  var bt = new tBitSet();
  var fb = new fBitSet(3 * N + 5);
  for (var i = 0 ; i < N  ; i++) {
    b.add(3 * i + 5);
    tb.add(3 * i + 5);
    bs = bs.set(3 * i + 5,true);
    bt.set(3 * i + 5);
    fb.set(3 * i + 5);
  }
  if (bs.cardinality() != b.size()) throw 'something is off';
  if (bs.cardinality() != bt.cardinality()) throw 'something is off';
  if (bs.cardinality() != fb.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet', function() {
    return b.array();
  })
  .add('TypedFastBitSet', function() {
    return tb.array();
  })
    .add('infusion.BitSet.js', function() {
      return bs.toArray();
    })
     .add('mattkrick.fast-bitset', function() {
      return fb.getIndices();
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function ForEachBench() {
  console.log('starting forEach benchmark');
  var b = new FastBitSet();
  var tb = new TypedFastBitSet();

  var bs = new BitSet();
  var bt = new tBitSet();
  var fb = new fBitSet(3 * N + 5);
  var s = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b.add(3 * i + 5);
    tb.add(3 * i + 5);
    bs = bs.set(3 * i + 5,true);
    bt.set(3 * i + 5);
    fb.set(3 * i + 5);
    s.add(3 * i + 5);
  }
  var card = 0;
  for (var i in b.array()) {
    card++;
  }

  if (bs.cardinality() != b.size()) throw 'something is off';
  if (bs.cardinality() != bt.cardinality()) throw 'something is off';
  if (bs.cardinality() != fb.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet', function() {
    var card = 0;
    var inc = function() {
      card++;
    };
    b.forEach(inc);
    return card;
  }).add('TypedFastBitSet', function() {
    var card = 0;
    var inc = function() {
      card++;
    };
    tb.forEach(inc);
    return card;
  }).add('FastBitSet (via array)', function() {
    var card = 0;
    for (var i in b.array()) {
      card++;
    }
    return card;
  })
  .add('TypedFastBitSet (via array)', function() {
    var card = 0;
    for (var i in tb.array()) {
      card++;
    }
    return card;
  })
    .add('mattkrick.fast-bitset', function() {
      var card = 0;
      var inc = function() {
        card++;
      };
      fb.forEach(inc);
      return card;
    })
    .add('Set', function() {
      var card = 0;
      var inc = function() {
        card++;
      };
      fb.forEach(inc);
      return card;
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function CardBench() {
  console.log('starting cardinality benchmark');
  var b = new FastBitSet();
  var tb = new TypedFastBitSet();
  var bs = new BitSet();
  var bt = new tBitSet();
  var fb = new fBitSet(3 * N + 5);
  for (var i = 0 ; i < N  ; i++) {
    b.add(3 * i + 5);
    tb.add(3 * i + 5);
    bs = bs.set(3 * i + 5,true);
    bt.set(3 * i + 5);
    fb.set(3 * i + 5);
  }
  if (bs.cardinality() != b.size()) throw 'something is off';
  if (bs.cardinality() != bt.cardinality()) throw 'something is off';
  if (bs.cardinality() != fb.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet', function() {
    return b.size();
  }).add('TypedFastBitSet', function() {
    return b.size();
  })
    .add('infusion.BitSet.js', function() {
      return bs.cardinality();
    })
    .add('tdegrunt.BitSet', function() {
      return bt.cardinality();
    })
    .add('mattkrick.fast-bitset', function() {
      return fb.getCardinality();
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function QueryBench() {
  console.log('starting query benchmark');
  var b = new FastBitSet();
  var tb = new TypedFastBitSet();
  var bs = new BitSet();
  var bt = new tBitSet();
  var fb = new fBitSet(3 * N + 5);
  var s = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b.add(3 * i + 5);
    tb.add(3 * i + 5);
    bs = bs.set(3 * i + 5,true);
    bt.set(3 * i + 5);
    fb.set(3 * i + 5);
    s.add(3 * i + 5);
  }
  if (bs.cardinality() != b.size()) throw 'something is off';
  if (bs.cardinality() != bt.cardinality()) throw 'something is off';
  if (bs.cardinality() != fb.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet', function() {
    return b.has(122);
  })
  .add('TypedFastBitSet', function() {
    return tb.has(122);
  })
    .add('infusion.BitSet.js', function() {
      return bs.get(122);
    })
    .add('tdegrunt.BitSet', function() {
      return bt.get(122);
    })
    .add('mattkrick.fast-bitset', function() {
      return fb.get(122);
    })
    .add('Set', function() {
      return s.has(122);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function CloneBench() {
  console.log('starting clone benchmark');
  var b = new FastBitSet();
  var tb = new TypedFastBitSet();
  var bs = new BitSet();
  var bt = new tBitSet();
  var fb = new fBitSet(3 * N  + 5);
  var s = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b.add(3 * i + 5);
    tb.add(3 * i + 5);
    bs = bs.set(3 * i + 5,true);
    bt.set(3 * i + 5);
    fb.set(3 * i + 5);
    s.add(3 * i + 5);
  }
  if (bs.cardinality() != b.size()) throw 'something is off';
  if (bs.cardinality() != bt.cardinality()) throw 'something is off';
  if (bs.cardinality() != fb.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet', function() {
    return b.clone();
  }).add('TypedFastBitSet', function() {
    return tb.clone();
  })
    .add('infusion.BitSet.js', function() {
      return bs.clone();
    })
    .add('mattkrick.fast-bitset', function() {
      return fb.clone();
    })
    .add('Set', function() {
      return new Set(s);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function AndBench() {
  console.log('starting intersection query benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';

  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (creates new bitset)', function() {
    return b1.new_intersection(b2);
  })
  .add('TypedFastBitSet (creates new bitset)', function() {
    return tb1.new_intersection(tb2);
  })
    .add('mattkrick.fast-bitset  (creates new bitset)', function() {
      return fb1.and(fb2);
    })
    
    .add('roaring', function() {
      return roaring.RoaringBitmap32.and(r1,r2);
    })
    .add('Set', function() {
      return genericSetIntersection(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function AndCardBench() {
  console.log('starting intersection cardinality query benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (genericSetIntersectionCard(s1,s2) != b1.intersection_size(b2)) throw 'potential bug';
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';

  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (creates new bitset)', function() {
    return b1.new_intersection(b2).size();
  })
    .add('FastBitSet (fast way)', function() {
      return b1.intersection_size(b2);
    })
    .add('TypedFastBitSet (creates new bitset)', function() {
      return tb1.new_intersection(tb2).size();
    })
      .add('TypedFastBitSet (fast way)', function() {
        return tb1.intersection_size(tb2);
      })
        .add('roaring', function() {
          return r1.andCardinality(r2);
        })
    .add('mattkrick.fast-bitset (creates new bitset)', function() {
      return fb1.and(fb2).getCardinality();
    })
    .add('Set', function() {
      return genericSetIntersectionCard(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function OrCardBench() {
  console.log('starting union cardinality query benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';

  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (creates new bitset)', function() {
    return b1.new_union(b2).size();
  })
    .add('FastBitSet (fast way)', function() {
      return b1.union_size(b2);
    })
    .add('TypedFastBitSet (creates new bitset)', function() {
      return tb1.new_union(tb2).size();
    })
      .add('TypedFastBitSet (fast way)', function() {
        return tb1.union_size(tb2);
      })
        .add('roaring', function() {
          return r1.orCardinality(r2);
        })
    .add('mattkrick.fast-bitset (creates new bitset)', function() {
      return fb1.or(fb2).getCardinality();
    })
    .add('Set', function() {
      return genericSetUnionCard(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function DifferenceCardBench() {
  console.log('starting difference cardinality query benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';

  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (creates new bitset)', function() {
    return b1.new_union(b2).size();
  })
    .add('FastBitSet (fast way)', function() {
      return b1.difference_size(b2);
    })
    .add('TypedFastBitSet (creates new bitset)', function() {
      return tb1.new_union(tb2).size();
    })
      .add('TypedFastBitSet (fast way)', function() {
        return tb1.difference_size(tb2);
      })
        .add('roaring', function() {
          return r1.andNotCardinality(r2);
        })
    .add('Set', function() {
      return genericSetDifferenceCard(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function OrInplaceBench() {
  console.log('starting inplace union  benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';

  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (inplace)', function() {
    return b1.union(b2);
  })
  .add('TypedFastBitSet (inplace)', function() {
    return tb1.union(tb2);
  })
    .add('infusion.BitSet.js (inplace)', function() {
      return bs1.or(bs2);
    })
     .add('tdegrunt.BitSet (inplace)', function() {
      return bt1.or(bt2);
    })
    .add('roaring', function() {
          return r1.orInPlace(r2);
    })
    .add('Set (inplace)', function() {
      return genericInplaceSetUnion(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function AndInplaceBench() {
  console.log('starting inplace intersection  benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';
  b1.intersection(b2);
  bt1.and(bt2);
  genericInplaceSetIntersection(s1,s2);
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (inplace)', function() {
    return b1.intersection(b2);
  })
  .add('TypedFastBitSet (inplace)', function() {
    return tb1.intersection(tb2);
  })
    .add('infusion.BitSet.js (inplace)', function() {
      return bs1.and(bs2);
    })
     .add('tdegrunt.BitSet (inplace)', function() {
      return bt1.and(bt2);
    })
    .add('roaring', function() {
          return r1.andInPlace(r2);
    })
    .add('Set (inplace)', function() {
      return genericInplaceSetIntersection(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function AndNotInplaceBench() {
  console.log('starting inplace difference  benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';
  b1.difference(b2);
  bt1.andNot(bt2);
  genericInplaceSetDifference(s1,s2);
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (inplace)', function() {
    return b1.difference(b2);
  })
  .add('TypedFastBitSet (inplace)', function() {
    return tb1.difference(tb2);
  })
    .add('infusion.BitSet.js (inplace)', function() {
      return bs1.andNot(bs2);
    })
    .add('tdegrunt.BitSet (inplace)', function() {
      return bt1.andNot(bt2);
    })
        .add('roaring', function() {
          return r1.andNotInPlace(r2);
        })
    .add('Set (inplace)', function() {
      return genericInplaceSetDifference(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function OrBench() {
  console.log('starting union query benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';
  roaring.RoaringBitmap32.or(r1,r2);
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite
    .add('roaring', function() {
      return roaring.RoaringBitmap32.or(r1,r2);
    })
   .add('FastBitSet (creates new bitset)', function() {
     return b1.new_union(b2);
   })
   .add('TypedFastBitSet (creates new bitset)', function() {
    return tb1.new_union(tb2);
  })
   .add('mattkrick.fast-bitset (creates new bitset)', function() {
      return fb1.or(fb2);
   })
   .add('Set', function() {
      return genericSetUnion(s1,s2);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

function DifferenceBench() {
  console.log('starting difference query benchmark');
  var b1 = new FastBitSet();
  var tb1 = new TypedFastBitSet();
  var bs1 = new BitSet();
  var bt1 = new tBitSet();
  var r1 = new roaring.RoaringBitmap32();
  var r2 = new roaring.RoaringBitmap32();
  var fb1 = new fBitSet(6 * N + 5);
  var b2 = new FastBitSet();
  var tb2 = new TypedFastBitSet();
  var bs2 = new BitSet();
  var bt2 = new tBitSet();
  var fb2 = new fBitSet(6 * N + 5);
  var s1 = new Set();
  var s2 = new Set();
  for (var i = 0 ; i < N  ; i++) {
    b1.add(3 * i + 5);
    tb1.add(3 * i + 5);
    bs1 = bs1.set(3 * i + 5,true);
    bt1.set(3 * i + 5);
    fb1.set(3 * i + 5);
    s1.add(3 * i + 5);
    r1.add(3 * i + 5);
    r2.add(6 * i + 5);
    b2.add(6 * i + 5);
    tb2.add(6 * i + 5);
    bs2 = bs2.set(6 * i + 5,true);
    bt2.set(6 * i + 5);
    fb2.set(6 * i + 5);
    s2.add(6 * i + 5);
  }
  if (bs1.cardinality() != b1.size()) throw 'something is off';
  if (bs1.cardinality() != bt1.cardinality()) throw 'something is off';
  if (bs1.cardinality() != fb1.getCardinality()) throw 'something is off';
  if (bs2.cardinality() != b2.size()) throw 'something is off';
  if (bs2.cardinality() != bt2.cardinality()) throw 'something is off';
  if (bs2.cardinality() != fb2.getCardinality()) throw 'something is off';
  var suite = new Benchmark.Suite();
  // add tests
  var ms = suite.add('FastBitSet (creates new bitset)', function() {
    return b1.clone().difference(b2);
  })
  .add('TypedFastBitSet (creates new bitset)', function() {
    return tb1.clone().difference(tb2);
  })
    .add('Set', function() {
      return genericSetDifference(s1,s2);
    })
    //.add('roaring', function() {
   //       return roaring.RoaringBitmap32.andNot(r1,r2);
   // })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

var main = function() {
  console.log('Benchmarking against:');
  console.log('TypedFastBitSet.js: https://github.com/lemire/TypedFastBitSet.js');
  console.log('roaring: https://www.npmjs.com/package/roaring');
  console.log('infusion.BitSet.js from https://github.com/infusion/BitSet.js', require("bitset.js/package.json").version);
  console.log('tdegrunt.BitSet from https://github.com/tdegrunt/bitset', require("bitset/package.json").version);
  console.log('mattkrick.fast-bitset from https://github.com/mattkrick/fast-bitset', require("fast-bitset/package.json").version);
  console.log('standard Set object from JavaScript');
  console.log('');
  console.log('Not all libraries support all operations. We benchmark what is available.');
  console.log('');
  console.log('Platform: ' + process.platform + ' ' + os.release() + ' ' + process.arch);
  console.log(os.cpus()[0]['model']);
  console.log('Node version ' + process.versions.node + ', v8 version ' + process.versions.v8);
  console.log();
  console.log('We proceed with the logical operations generating new bitmaps: ');
  console.log('');
  OrBench();
  console.log('');
  AndBench();
  console.log('');
  DifferenceBench();
  console.log('');
  console.log('We benchmark the in-place logical operations: ');
  console.log('(Notice how much faster they are.)');
  console.log('');
  OrInplaceBench();
  console.log('');
  AndInplaceBench();
  console.log('');
  AndNotInplaceBench();
  console.log('');
  console.log('We benchmark the operations computing the set sizes: ');
  console.log('');
  CardBench();
  console.log('');
  OrCardBench();
  console.log('');
  AndCardBench();
  console.log('');
  DifferenceCardBench();
  console.log('');
  console.log('We conclude with other benchmarks: ');
  console.log('');
  CreateBench();
  console.log('');
  QueryBench();
  console.log('');
  ArrayBench();
  console.log('');
  ForEachBench();
  console.log('');
  CloneBench();
};

if (require.main === module) {
  main();
}
