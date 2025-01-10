import  webpack from 'webpack';
import {buildWebpack} from "./config/builds/buildWebpack";
import {BuildMode, BuildPaths, BuildPlatform} from "./config/builds/types/types";
import path from "path";
import {buildError} from "./config/builds/buildError";

interface EnvVariables {
    mode?: BuildMode;
    port: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
    public: BuildPaths;
    error?: boolean;
}

export default  (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'docs'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        public: path.resolve(__dirname, 'public'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 8081,
        mode: env.mode ?? 'development',
        paths,
        //npm run builds:prod -- --env analyzer=true
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    // Перевірка на помилки, використовуючи значення за замовчуванням `false`
    if (env.error ?? false) {
        buildError(config);
    }

    return config;
}