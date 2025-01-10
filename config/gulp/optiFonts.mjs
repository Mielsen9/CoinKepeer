import gulp from 'gulp';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import fonter from 'gulp-fonter-fix';
import fs from 'fs';

import ttf2woff2 from 'gulp-ttf2woff2';


const srcFolder = "./src/asset/gulp";
const destFolder = './src/asset';

gulp.task('otfToTtf', () => {
    // Ищем файлы шрифтів .otf
    return (
        gulp
            .src(`${srcFolder}/fonts/*.otf`, {})
            // Конвертируем в .ttf
            .pipe(
                fonter({
                    formats: ['ttf'],
                })
            )
            // Выгружаем в исходную папку
            .pipe(gulp.dest(`${srcFolder}/fonts/`))
            .pipe(
                plumber(
                    notify.onError({
                        title: 'FONTS',
                        message:
                            'Error: <%= error.message %>. File: <%= file.relative %>!',
                    })
                )
            )
    );
});

gulp.task('ttfToWoff', async () => {
    // Ищем файлы шрифтів .ttf
    return (
        gulp
            .src(`${srcFolder}/fonts/*.ttf`, {})
            // Конвертируем в .woff
            .pipe(
                fonter({
                    formats: ['woff'],
                })
            )
            // Выгружаем в папку с результатом
            .pipe(gulp.dest(`${destFolder}/fonts/`))
            // Ищем файлы шрифтів .ttf
            .pipe(gulp.src(`${srcFolder}/fonts/*.ttf`))
            // Конвертируем в .woff2
            .pipe(ttf2woff2())
            // Выгружаем в папку с результатом
            .pipe(gulp.dest(`${destFolder}/fonts/`))
            .pipe(
                plumber(
                    notify.onError({
                        title: 'FONTS',
                        message: 'Error: <%= error.message %>',
                    })
                )
            )
    );
});

gulp.task('fontsStyle', () => {
    // Файл стилей підключення шрифтів
    let fontsFile = `./src/scss/base/_fontsAutoGen.scss`;
    // Проверяем существуют ли файлы шрифтів
    fs.readdir(`${destFolder}/fonts/`, function (err, fontsFiles) {
        if (fontsFiles) {
            // Проверяем существует ли файл стилей для підключення шрифтів

            // Если файла нет, создаем его
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly;
            for (let i = 0; i < fontsFiles.length; i++) {
                // Записываем підключення шрифтів в файл стилей
                let fontFileName = fontsFiles[i].split('.')[0];
                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0]
                        ? fontFileName.split('-')[0]
                        : fontFileName;
                    let fontWeight = fontFileName.split('-')[1]
                        ? fontFileName.split('-')[1]
                        : fontFileName;
                    if (fontWeight.toLowerCase() === 'thin') {
                        fontWeight = 100;
                    } else if (fontWeight.toLowerCase() === 'extralight') {
                        fontWeight = 200;
                    } else if (fontWeight.toLowerCase() === 'light') {
                        fontWeight = 300;
                    } else if (fontWeight.toLowerCase() === 'medium') {
                        fontWeight = 500;
                    } else if (fontWeight.toLowerCase() === 'semibold') {
                        fontWeight = 600;
                    } else if (fontWeight.toLowerCase() === 'bold') {
                        fontWeight = 700;
                    } else if (
                        fontWeight.toLowerCase() === 'extrabold' ||
                        fontWeight.toLowerCase() === 'heavy'
                    ) {
                        fontWeight = 800;
                    } else if (fontWeight.toLowerCase() === 'black') {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }
                    fs.appendFile(
                        fontsFile,
                        `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("~@/asset/fonts/${fontFileName}.woff2") format("woff2"), url("~@/asset/fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
                        cb
                    );
                    newFileOnly = fontFileName;
                }
            }

        }
    });

    return gulp.src(`${srcFolder}`);
    function cb() {}
});

gulp.task('optiFonts', gulp.series('otfToTtf', 'ttfToWoff', 'fontsStyle'));