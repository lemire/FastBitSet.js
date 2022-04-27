Performance benchmarks
===

You should have node.js and npm installed to run
these benchmarks. It assumes a recent version of node.js (4.0.0 or better).
Under some operating systems, the command `nodejs` is called `node`.

```
npm install --no-save benchmark microtime bitset.js typedfastbitset fast-bitset roaring
nodejs test.js 
```



The `--no-save` flag is useful for node 5.0.0 and above: if you use older
node systems, you should omit the flag.
