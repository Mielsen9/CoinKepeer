import webpack from "webpack";

import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {BuildOptions} from "./types/types";
import {buildResolvers} from "./buildResolvers";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options
    const isDev = mode === 'development';

return{
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
        path: paths.output,
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename:'[name] [ext]',
        clean: true
    },
    // Optimization JS
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    // Optimization IMG Після 512кб lazyload
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000

    },
    // Plugins
    plugins: buildPlugins(options),
    // Loaders
    module: {
        rules: buildLoaders(options),
    },
    // Resolvers
    resolve: buildResolvers(options),
    // Devtool
    devtool: isDev ? 'inline-source-map' : 'source-map',
    // DevServer
    devServer: isDev ? buildDevServer(options) : undefined,
}
}