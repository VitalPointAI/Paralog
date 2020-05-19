const compile = require('near-sdk-as/compiler').compile

compile('assembly/main.ts', //input file
    'out/main.wasm', // output file
    [
        // "-01" // optional arguments
        '--debug',
        '--measure', //shows compiler runtime
        '--validate' //validate the generated wasm module
    ], {
        verbose: true  //output the cli args passed to asc
    });