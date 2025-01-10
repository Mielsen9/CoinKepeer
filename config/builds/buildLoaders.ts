import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
// import path from "path";
// import {buildBabelLoader} from "./babel/babel";

export function buildLoaders(options:BuildOptions) : ModuleOptions['rules'] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

        // Images Loader
    const assetLoader = {
        test: /\.(png|jpe?g|gif|webp)$/i, // Обробка зображень
        type: 'asset/resource', // Копіює у dist
        generator: {
            filename: 'images/[name][ext]', // Налаштування структури файлів [hash]
        },
    }
    const svgrLoader = {
        // asset/source
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: { icon: true }
                }
            ],
    }
        // Fonts Loader
    const fontsLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Обробка шрифтів
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext]', // [hash]
        },
    }
        // Style Loader
    const postcssLoader = {
        loader: "postcss-loader",
        options: {
            sourceMap: true,
            postcssOptions: {
                plugins: [
                    "postcss-preset-env",
                    "css-mqpacker",
                    ...(isProd ? [
                        ["cssnano", {
                            preset: [
                                "default",
                                {
                                    discardComments: {
                                        removeAll: true,
                                    },
                                },
                            ],
                        }]
                    ] : [])
                ]
            }
        }
    };
    const cssLoadersWithModules = {
        loader: "css-loader",
        options: {
            modules: {
            localIdentName: isDev ? '[name]__[local]' : '[hash:base64:8]',
            },

            sourceMap: true,
        },
    }
    const scssLoaders = {
        loader: "sass-loader",
        options: {
            sassOptions: {
                style: isDev ? 'expanded' : 'compressed',
                // Path to import
                // loadPaths: [
                //     "absolute/path/a",
                //     "absolute/path/b"
                // ],
                sourceMap: true
            },
        },
    }
    const scssLoader = {
            test: /\.(sa|sc|c)ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                cssLoadersWithModules,
                // Post Css
                postcssLoader,
                // Compiles Sass to CSS
                scssLoaders,
            ],
        }
        // TS Loader
    const tsLoader =  {
        // ts loader вміє працювати з jsx
        // якщо не використовувати ts : потрібний babel-loader
        test: /\.tsx?$/,
        use:[{
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                getCustomTransformers: ()=> ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                })
            }
        }],
        exclude: /node_modules/,
        }
        // Babel Loader
    // const babelLoader = buildBabelLoader(options)

    return [
        fontsLoader,
        scssLoader,
        assetLoader,
        svgrLoader,
        tsLoader,
        // babelLoader,
    ]
}