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

gulp.task('quotestyles', function() {
    return gulp.src('./assets/quotestyle/quote.css')
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

gulp.task('groupchatstyles', function() {
    return gulp.src('./assets/chatstyle/groupchat.css')
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
    return gulp.src('./assets/formquestyle/queform.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('postformstyles', function() {
    return gulp.src('./assets/formpoststyle/postform.css')
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