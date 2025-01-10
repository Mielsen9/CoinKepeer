import type { Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types/types";
import path from "path";

export function buildDevServer(options:BuildOptions) : DevServerConfiguration {
    return {
        port: options.port ?? 8081,
        open: true,
        historyApiFallback: true,
        client: {
            overlay: {
                warnings: true,
                errors: true,
            },
        },
        hot: true,
        // За чим дивиться
        static: {
            directory: path.join(__dirname, 'docs')
        }
    }
}