const { readFileSync } = require("fs");
const build = require("./scripts/build/index");

const instantiate = async () => {
  const buffer = readFileSync("./main.wasm");
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  return instance.exports;
};

beforeAll(() => {
  build("main.wat", "main.wasm");
});

beforeEach(async done => {
  wasm = await instantiate();
  done();
});

test("hello world returns 42", async done => {
  expect(wasm.helloWorld()).toBe(42);
});
