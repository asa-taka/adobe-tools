import path from 'path'
import pluginNodeResolve from "@rollup/plugin-node-resolve"
import pluginCommonjs from "@rollup/plugin-commonjs"
import pluginTypescript from "@rollup/plugin-typescript"
import { babel as pluginBabel } from "@rollup/plugin-babel"
// import { terser as pluginTerser } from "rollup-plugin-terser"

const plugins = [
  pluginTypescript(),
  // pluginCommonjs({
  //   extensions: [".js", ".ts"],
  // }),
  pluginBabel({
    babelHelpers: "bundled",
    configFile: path.resolve(__dirname, ".babelrc.json"),
  }),
  pluginNodeResolve({
    browser: true,
  }),
]

export default [
  {
    input: 'src/compositely/compositely-export-the-document.ts',
    output: {
      name: 'compositely-export-the-document',
      file: 'dist/compositely-export-the-document.jsx',
      format: 'umd',
      esModule: false,
    },
    plugins,
  },
  {
    input: 'src/compositely/compositely-export-all-in-the-directory.ts',
    output: {
      name: 'compositely-export-all-in-the-directory',
      file: 'dist/compositely-export-all-in-the-directory.jsx',
      format: 'umd',
      esModule: false,
    },
    plugins,
  },
]
