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

    watch('./assets/ptwritformstyle/**/*.css', function() {
        gulp.start('ptwritformcss')
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

    watch('./assets/reusesharestyle/**/*.css', function() {
        gulp.start('reusesharecss')
    });

    watch('./assets/reuseptstyle/**/*.css', function() {
        gulp.start('reuseptcss')
    });
    
    watch('./assets/reusequestyle/**/*.css', function() {
        gulp.start('reusequecss')
    });

    watch('./assets/reuseonlinequestyle/**/*.css', function() {
        gulp.start('onlinequecss')
    });

    watch('./assets/reusepwtstyle/**/*.css', function() {
        gulp.start('reusepwtcss')
    });

    watch('./assets/reusegrpstyle/**/*.css', function() {
        gulp.start('reusegrpcss')
    });

    watch('./assets/filterstyle/**/*.css', function() {
        gulp.start('filtercss')
    });

    watch('./assets/reusesortstyle/**/*.css', function() {
        gulp.start('reusesortcss')
    });

    watch('./assets/reusesrchstyle/**/*.css', function() {
        gulp.start('reusesrchcss')
    });

    watch('./assets/reuseaccstyle/**/*.css', function() {
        gulp.start('reuseacctcss')
    });

    watch('./assets/reuseuserstyle/**/*.css', function() {
        gulp.start('reuseusercss')
    });

    watch('./assets/accsharedstyle/**/*.css', function() {
        gulp.start('accsharedcss')
    });

    watch('./assets/accuserstyle/**/*.css', function() {
        gulp.start('accusercss')
    });

    watch('./assets/accpublishstyle/**/*.css', function() {
        gulp.start('accpubcss')
    });

    watch('./assets/accdraftstyle/**/*.css', function() {
        gulp.start('accdftcss')
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

gulp.task('ptwritformcss',['ptwritformstyles'], function() {
    return gulp.src("./assets/ptwritformstyle/pwtform.css")
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

gulp.task('reusesharecss',['reusesharestyle'], function() {
    return gulp.src("./assets/reusesharestyle/reuse-share.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('reuseptcss',['reuseptstyle'], function() {
    return gulp.src("./assets/reuseptstyle/reuse-pt.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('reusequecss',['reusequestyle'], function() {
    return gulp.src("./assets/reusequestyle/reuse-que.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('onlinequecss',['onlinequestyle'], function() {
    return gulp.src("./assets/reuseonlinequestyle/reuse-onlineque.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('reusepwtcss',['reusepwtstyle'], function() {
    return gulp.src("./assets/reusepwtstyle/reuse-pwt.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('reusegrpcss',['reusegrpstyle'], function() {
    return gulp.src("./assets/reusegrpstyle/reuse-group.css")
    .pipe(browserSyc.stream());
});

gulp.task('filtercss',['filterstyle'], function() {
    return gulp.src("./assets/filterstyle/filter.css")
    .pipe(browserSyc.stream());
});

gulp.task('reusesortcss',['reusesortstyle'], function() {
    return gulp.src("./assets/reusesortstyle/reuse-sort.css")
    .pipe(browserSyc.stream());
});

gulp.task('reusesrchcss',['reusesrchstyle'], function() {
    return gulp.src("./assets/reusesrchstyle/reuse-srch.css")
    .pipe(browserSyc.stream());
});

gulp.task('reuseacctcss',['reuseaccstyle'], function() {
    return gulp.src("./assets/reuseaccstyle/reuse-acc.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('reuseusercss',['reuseuserstyle'], function() {
    return gulp.src("./assets/reuseuserstyle/reuse-user.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('accsharedcss',['accsharedstyle'], function() {
    return gulp.src("./assets/accsharedstyle/acc-shared.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('accusercss',['accuserstyle'], function() {
    return gulp.src("./assets/accuserstyle/acc-user.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('accpubcss',['accpubstyle'], function() {
    return gulp.src("./assets/accpublishstyle/acc-pub.css")
    .pipe(browserSyc.stream());
}); 

gulp.task('accdftcss',['accdftstyle'], function() {
    return gulp.src("./assets/accdraftstyle/acc-dft.css")
    .pipe(browserSyc.stream());
}); 

// gulp.task('scriptsRefresh',['scripts'], function() {
//     browserSyc.reload();
// });