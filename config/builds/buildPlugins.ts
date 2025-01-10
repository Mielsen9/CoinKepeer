import webpack, {Configuration} from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}:BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins:  Configuration['plugins'] = [

        // Base Plugins
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon:path.resolve(paths.public, 'favicon.png')
        }),
        new webpack.DefinePlugin({
            // if(__PLATFORM__ === 'desktop')
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        }),
        // make slowly
        new MiniCssExtractPlugin({
            filename: "css/style.[contenthash:8].css",
            chunkFilename: "css/style.[contenthash:8].css",
        }),
    ]

    // Development Plugins
    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
        // Виносить провірку типів в окремий процес
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    // Production Plugin
    if(isProd) {
        plugins.push(
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(paths.public, 'local'), to: path.resolve(paths.output, 'locales') },
                ],
            })
        )
    }

    // Analyzer Plugin
    if(analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}