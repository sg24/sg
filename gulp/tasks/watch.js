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

    watch('./assets/miniglobalstyle/**/*.css', function() {
        gulp.start('miniglobalcss')
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

    watch('./assets/ptwritstyle/**/*.css', function() {
        gulp.start('ptwritcss')
    });

    watch('./assets/onlinequestyle/**/*.css', function() {
        gulp.start('onlinequecss')
    });

    watch('./assets/chatstyle/**/*.css', function() {
        gulp.start('chatcss')
    });

    watch('./assets/convstyle/**/*.css', function() {
        gulp.start('convcss')
    });

    watch('./assets/queformstyle/**/*.css', function() {
        gulp.start('queformcss')
    });

    watch('./assets/postformstyle/**/*.css', function() {
        gulp.start('postformcss')
    });

    watch('./assets/groupformstyle/**/*.css', function() {
        gulp.start('groupformcss')
    });

    watch('./assets/onlinequeformstyle/**/*.css', function() {
        gulp.start('onlinequeformcss')
    });

    watch('./assets/examtabstyle/**/*.css', function() {
        gulp.start('examtabcss')
    });

    watch('./assets/userstyle/**/*.css', function() {
        gulp.start('usercss')
    });

    watch('./assets/profilestyle/**/*.css', function() {
        gulp.start('profilecss')
    });

    watch('./assets/favoritestyle/**/*.css', function() {
        gulp.start('favoritecss')
    });

    // watch('./apps.js', function() {
    //     gulp.start('scriptsRefresh');
    // });

});

gulp.task('globalcss',['globalstyles'], function() {
    return gulp.src("./assets/globalstyle/global.css")
    .pipe(browserSyc.stream());
});

gulp.task('miniglobalcss',['miniglobalstyles'], function() {
    return gulp.src("./assets/miniglobalstyle/miniglobal.css")
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


gulp.task('ptwritcss',['ptwritstyles'], function() {
    return gulp.src("./assets/ptwritstyle/ptwrit.css")
    .pipe(browserSyc.stream());
});

gulp.task('onlinequecss',['onlinequestyles'], function() {
    return gulp.src("./assets/onlinequestyle/onlineque.css")
    .pipe(browserSyc.stream());
});

gulp.task('chatcss',['chatstyles'], function() {
    return gulp.src("./assets/chatstyle/chat.css")
    .pipe(browserSyc.stream());
});

gulp.task('convcss',['convstyles'], function() {
    return gulp.src("./assets/convstyle/conv.css")
    .pipe(browserSyc.stream());
});

gulp.task('queformcss',['queformstyles'], function() {
    return gulp.src("./assets/queformstyle/queform.css")
    .pipe(browserSyc.stream());
});

gulp.task('postformcss',['postformstyles'], function() {
    return gulp.src("./assets/postformstyle/postform.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('groupformcss',['groupformstyles'], function() {
    return gulp.src("./assets/groupformstyle/groupform.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('onlinequeformcss',['onlinequeformstyles'], function() {
    return gulp.src("./assets/onlinequeformstyle/onlinequeform.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('examtabcss',['examtabstyle'], function() {
    return gulp.src("./assets/examtabstyle/examtab.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('usercss',['userstyle'], function() {
    return gulp.src("./assets/userstyle/users.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('profilecss',['profilestyle'], function() {
    return gulp.src("./assets/profilestyle/profile.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('favoritecss',['favoritestyle'], function() {
    return gulp.src("./assets/favoritestyle/favorite.css")
    .pipe(browserSyc.stream());
}); 

// gulp.task('scriptsRefresh',['scripts'], function() {
//     browserSyc.reload();
// });