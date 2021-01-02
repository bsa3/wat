const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const build = async (inputWat, outputWasm) => {
    require("wabt")().then(wabt => {
        const wasmModule = wabt.parseWat(inputWat, readFileSync(inputWat, "utf8"));
        const { buffer } = wasmModule.toBinary({});
        writeFileSync(outputWasm, new Buffer(buffer));
        var wast = wasmModule.toText({ foldExprs: false, inlineExport: false });
        console.log(wast);
    });
};

exports.build = build
build("./wat/main.wat", "./build/main.wasm");
