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

gulp.task('loginformstyles', function() {
    return gulp.src('./assets/loginformstyle/login-form.css')
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

gulp.task('reusesharestyle', function() {
    return gulp.src('./assets/reusesharestyle/reuse-share.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reuseptstyle', function() {
    return gulp.src('./assets/reuseptstyle/reuse-pt.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reusequestyle', function() {
    return gulp.src('./assets/reusequestyle/reuse-que.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reusequehelpstyle', function() {
    return gulp.src('./assets/reusequehelpstyle/reuse-que-help.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('onlinequestyle', function() {
    return gulp.src('./assets/reuseonlinequestyle/reuse-onlineque.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reusepwtstyle', function() {
    return gulp.src('./assets/reusepwtstyle/reuse-pwt.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('reusegrpstyle', function() {
    return gulp.src('./assets/reusegrpstyle/reuse-group.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('filterstyle', function() {
    return gulp.src('./assets/filterstyle/filter.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reusesortstyle', function() {
    return gulp.src('./assets/reusesortstyle/reuse-sort.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reusesrchstyle', function() {
    return gulp.src('./assets/reusesrchstyle/reuse-srch.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reuseuserstyle', function() {
    return gulp.src('./assets/reuseuserstyle/reuse-user.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('reuseaccstyle', function() {
    return gulp.src('./assets/reuseaccstyle/reuse-acc.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('accsharedstyle', function() {
    return gulp.src('./assets/accsharedstyle/acc-shared.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('accuserstyle', function() {
    return gulp.src('./assets/accuserstyle/acc-user.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('accpubstyle', function() {
    return gulp.src('./assets/accpublishstyle/acc-pub.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('accdftstyle', function() {
    return gulp.src('./assets/accdraftstyle/acc-dft.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('accprfstyle', function() {
    return gulp.src('./assets/accprfstyle/acc-prf.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('acchelpstyle', function() {
    return gulp.src('./assets/acchelpstyle/acc-help.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('accsetstyle', function() {
    return gulp.src('./assets/accsetstyle/acc-set.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, 
                    hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { 
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public/stylesheets'));
});