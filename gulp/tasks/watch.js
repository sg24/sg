var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSyc = require('browser-sync').create();

gulp.task('watch', function() {

    browserSyc.init({
        notify: false,
        server: {
            baseDir: "views"
        }
    });

    watch('./views/index.html', function() {
        browserSyc.reload();
    });

    watch('./assets/styles/**/*.css', function() {
        gulp.start('cssInject')
    });

    watch('./assets/viewstyle/**/*.css', function() {
        gulp.start('viewcss')
    });

    // watch('./apps.js', function() {
    //     gulp.start('scriptsRefresh');
    // });

});

gulp.task('cssInject',['styles'], function() {
    return gulp.src("./assets/styles/styles.css")
    .pipe(browserSyc.stream());
});

gulp.task('viewcss',['viewstyles'], function() {
    return gulp.src("./assets/viewstyle/view.css")
    .pipe(browserSyc.stream());
});

// gulp.task('scriptsRefresh',['scripts'], function() {
//     browserSyc.reload();
// });