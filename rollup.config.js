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
    input: 'src/bin/export-composites.ts',
    output: {
      file: 'output/export-composites.jsx',
      format: 'umd',
      name: 'export-composites',
      esModule: false,
    },
    plugins,
  },
  {
    input: 'src/bin/export-composites-bulk.ts',
    output: {
      name: 'export-composites-bulk',
      file: 'output/export-composites-bulk.jsx',
      format: 'umd',
      esModule: false,
    },
    plugins,
  },
]
