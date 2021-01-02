const { readFileSync } = require("fs");
const { runCLI } = require("jest");

const run = async (outputWasm, fnstring) => {
  const buffer = readFileSync(outputWasm);
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  var fn = instance.exports[fnstring];
  if (typeof fn === "function") {  return fn() } else {return null};
};

exports.run = run;

run("./build/main.wasm", "helloWorld").then( result => {
  //console.log(result);
  exports.runResult = result;
});

//console.log(exports.runSync);
//run("./build/main.wasm", "helloWorld").then( result => {return result});