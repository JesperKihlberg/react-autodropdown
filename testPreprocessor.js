const tsc = require("typescript");
const path = require("path");
const babel = require("babel-core");
const jestPreset = require("babel-preset-jest");
function babelTransform(src, filename) {
    const resultCore = babel.transform(src, {
        // Possibly needed for code coverage tools: auxiliaryCommentBefore: " istanbul ignore next ",
        filename: filename,
        //presets: [jestPreset, "react", "es2015", "stage-0"],
        presets: ["@babel/preset-env"],

        sourceMaps: "inline"
    });
    return resultCore.code;
}
(module).exports = {
    process(src, filename) {
        if (filename.endsWith(".scss") || filename.endsWith(".css") || filename.endsWith(".png")) {
            return "module.exports = {}";
        }
        if (filename.endsWith(".ts") || filename.endsWith(".tsx")) {
            let result = tsc.transpileModule(src, { compilerOptions: {
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    moduleResolution: tsc.ModuleResolutionKind.NodeJs,
                    module: tsc.ModuleKind.ES2015,
                    target: tsc.ScriptTarget.ES2016,
                    sourceMap: false,
                    jsx: tsc.JsxEmit.Preserve,
                    allowJs: false,
                    declaration: false,
                    noImplicitAny: true,
                    allowSyntheticDefaultImports: true,
                    inlineSourceMap: true,
                    inlineSources: false
                } });
            result = babelTransform(result.outputText, filename);
            return result;
        }
        return src;
    }
};
