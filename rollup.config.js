import {terser} from "rollup-plugin-terser";
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ignore from 'rollup-plugin-ignore';
import alias from '@rollup/plugin-alias';

const devMode = (process.env.NODE_ENV === 'development');

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/index.js',
			format: 'es',
			sourcemap: true,
			plugins: [
				terser({
					ecma: 2020,
					mangle: { toplevel: true },
					compress: {
						module: true,
						toplevel: true,
						unsafe_arrows: true,
						drop_console: !devMode,
						drop_debugger: !devMode,
					},
					output: {
						quote_style: 1
					}
				})
			]
		},
		plugins: [
			resolve({
				extensions: ['.js', '.jsx']
			}),
			commonjs(),
			terser(),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
				presets: [
					'@babel/preset-react',
					'@babel/preset-env'
				]
			})
		],
		external: ["react", "react-dom","react-native"],
	}
]