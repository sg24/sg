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

    watch('./assets/globalstyle/**/*.css', function() {
        gulp.start('globalcss')
    });

    watch('./assets/styles/**/*.css', function() {
        gulp.start('cssInject')
    });

    watch('./assets/viewstyle/**/*.css', function() {
        gulp.start('viewcss')
    });

    watch('./assets/comtystyle/**/*.css', function() {
        gulp.start('comtycss')
    });

    watch('./assets/poststyle/**/*.css', function() {
        gulp.start('postcss')
    });

    watch('./assets/groupstyle/**/*.css', function() {
        gulp.start('groupcss')
    });

    watch('./assets/questionstyle/**/*.css', function() {
        gulp.start('questioncss')
    });

    watch('./assets/quotestyle/**/*.css', function() {
        gulp.start('quotecss')
    });

    watch('./assets/quotestyle/**/*.css', function() {
        gulp.start('quotecss')
    });

    watch('./assets/onlinequestyle/**/*.css', function() {
        gulp.start('onlinequecss')
    });

    // watch('./apps.js', function() {
    //     gulp.start('scriptsRefresh');
    // });

});

gulp.task('globalcss',['globalstyles'], function() {
    return gulp.src("./assets/globalstyle/global.css")
    .pipe(browserSyc.stream());
});

gulp.task('cssInject',['styles'], function() {
    return gulp.src("./assets/styles/styles.css")
    .pipe(browserSyc.stream());
});

gulp.task('viewcss',['viewstyles'], function() {
    return gulp.src("./assets/viewstyle/view.css")
    .pipe(browserSyc.stream());
});

gulp.task('comtycss',['comtystyles'], function() {
    return gulp.src("./assets/comtystyle/comty.css")
    .pipe(browserSyc.stream());
});

gulp.task('postcss',['poststyles'], function() {
    return gulp.src("./assets/poststyle/post.css")
    .pipe(browserSyc.stream());
});

gulp.task('groupcss',['groupstyles'], function() {
    return gulp.src("./assets/groupstyle/group.css")
    .pipe(browserSyc.stream());
});

gulp.task('questioncss',['questionstyles'], function() {
    return gulp.src("./assets/questionstyle/question.css")
    .pipe(browserSyc.stream());
});


gulp.task('quotecss',['quotestyles'], function() {
    return gulp.src("./assets/quotestyle/quote.css")
    .pipe(browserSyc.stream());
});

gulp.task('onlinequecss',['onlinequestyles'], function() {
    return gulp.src("./assets/onlinequestyle/onlineque.css")
    .pipe(browserSyc.stream());
});


// gulp.task('scriptsRefresh',['scripts'], function() {
//     browserSyc.reload();
// });