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