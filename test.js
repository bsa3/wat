const { readFileSync } = require("fs");
const build = require("./scripts/build.js");
const run = require("./scripts/run.js");

// const instantiate = async () => {
//   const buffer = readFileSync("./main.wasm");
//   const module = await WebAssembly.compile(buffer);
//   const instance = await WebAssembly.instantiate(module);
//   return instance.exports;
// };


beforeAll(async done => {
  build.build("./wat/main.wat", "./build/mainTest.wasm");
  done();
});


// beforeEach(async done => {
//   wasm = await instantiate();
//   done();
// });


test("mainTest", () => {
  return run.run("./build/mainTest.wasm", "helloWorld").then(result => {
  //console.log(result);
  expect(result).toBe(42)});
});
