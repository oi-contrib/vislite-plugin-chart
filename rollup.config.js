const pkg = require("./package.json")
const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginCommonjs = require("@rollup/plugin-commonjs")


module.exports = {
    input: "./src/index.js",
    output: {
        name: 'Chart',
        file: "./dist/chart.js",
        format: "umd",
        banner: `/*!
 * @vislite/chart v${pkg.version}
 * git+https://github.com/oi-contrib/vsilite-plugin-chart.git
 */`
    },
    plugins: [pluginNodeResolve(), pluginCommonjs()]
}
