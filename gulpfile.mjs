import gulp from 'gulp';

// Tasks
import './config/gulp/optiFonts.mjs';
import './config/gulp/optiImage.mjs';

gulp.task(
    'default',
    gulp.series(
        'optiFonts',
        'optiImages'
    )
);