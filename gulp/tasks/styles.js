var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');

gulp.task('styles', function() {
    return gulp.src('./assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('viewstyles', function() {
    return gulp.src('./assets/viewstyle/view.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('globalstyles', function() {
    return gulp.src('./assets/globalstyle/global.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('miniglobalstyles', function() {
    return gulp.src('./assets/miniglobalstyle/miniglobal.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('comtystyles', function() {
    return gulp.src('./assets/comtystyle/comty.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('poststyles', function() {
    return gulp.src('./assets/poststyle/post.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('groupstyles', function() {
    return gulp.src('./assets/groupstyle/group.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('questionstyles', function() {
    return gulp.src('./assets/questionstyle/question.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('ptwritstyles', function() {
    return gulp.src('./assets/ptwritstyle/ptwrit.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('onlinequestyles', function() {
    return gulp.src('./assets/onlinequestyle/onlineque.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('chatstyles', function() {
    return gulp.src('./assets/chatstyle/chat.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('convstyles', function() {
    return gulp.src('./assets/convstyle/conv.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('queformstyles', function() {
    return gulp.src('./assets/queformstyle/queform.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('postformstyles', function() {
    return gulp.src('./assets/postformstyle/postform.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('groupformstyles', function() {
    return gulp.src('./assets/groupformstyle/groupform.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('onlinequeformstyles', function() {
    return gulp.src('./assets/onlinequeformstyle/onlinequeform.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('ptwritformstyles', function() {
    return gulp.src('./assets/ptwritformstyle/pwtform.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('examtabstyle', function() {
    return gulp.src('./assets/examtabstyle/examtab.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('userstyle', function() {
    return gulp.src('./assets/userstyle/users.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('profilestyle', function() {
    return gulp.src('./assets/profilestyle/profile.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('favoritestyle', function() {
    return gulp.src('./assets/favoritestyle/favorite.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});