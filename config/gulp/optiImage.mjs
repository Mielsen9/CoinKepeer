import gulp from 'gulp';
import imagemin , {gifsicle, mozjpeg, optipng} from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import extReplace from 'gulp-ext-replace';
import changed from 'gulp-changed';

gulp.task('optiImages', function () {
    return gulp
        .src(['./src/asset/gulp/images/**/*', '!./src/asset/gulp/images/svgicons/**/*'])
        .pipe(changed('./src/asset/images/'))
        .pipe(
            imagemin([
                imageminWebp({
                    quality: 85,
                }),
            ])
        )
        .pipe(extReplace('.webp'))
        .pipe(gulp.dest('./src/asset/images/'))
        .pipe(gulp.src('./src/asset/gulp/images/**/*'))
        .pipe(changed('./src/asset/images/'))
        .pipe(
            imagemin(
                [
                    gifsicle({ interlaced: true }),
                    mozjpeg({ quality: 85, progressive: true }),
                    optipng({ optimizationLevel: 5 }),
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest('./src/asset/images/'));
});