var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    html: {
        entry: './src/html/*.*',
        all: 'src/html/**/*.*'
    },
    less: {
        entry: './src/css/*.less',
        all: 'src/css/**/*.less'
    },
    sass: {
        entry: './src/css/*.scss',
        all: 'src/css/**/*.scss'
    },
    js: {
        entry: './src/js/*.js',
        all: 'src/js/**/*.js'
    }
}

// var webpackcfg = require('./webpack.config.js')(paths);

//copy file to src folder
gulp.task('copy', function () {
    //copy fonts
    // gulp.src(['./bower_components/bootstrap/fonts/*', './bower_components/font-awesome/fonts/*'])
    //     .pipe(gulp.dest('./dist/fonts/'));
    //copy libs to dist folder
    // gulp.src(['./bower_components/jquery/dist/*.min.js','./bower_components/bootstrap/dist/js/*.min.js'])
    //     .pipe(gulp.dest('./dist/js/libs/'));
    //copy bootstrap less file
    // gulp.src(['./bower_components/bootstrap/less/**/*'])
    //     .pipe(gulp.dest('./src/css/bootstrap/'));
    //copy font-awesome less file
    // gulp.src(['./bower_components/font-awesome/less/**/*'])
    //     .pipe(gulp.dest('./src/css/font-awesome'));

    //copy iconfont
    // gulp.src('./src/fonts/**/*')
    //     .pipe(gulp.dest('./dist/fonts/'));

});
//compile swig file
gulp.task('html', function () {
    gulp.src(paths.html.entry)
        .pipe($.nunjucks.compile())
        .pipe(gulp.dest('./dist/html'))
});
//compile sass file
gulp.task('sass', function () {
    gulp.src(paths.sass.entry)
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.sourcemaps.write('./'))
        //添加前缀
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({ stream: true }))
        // .pipe($.notify({ message: 'sass compile success!', sound: "Glass" }));
});
//compile js file
gulp.task('js', function () {
    gulp.src(paths.js.entry)
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'))
});
//listen file modify
gulp.task('watch', function () {

    browserSync.init({
        //任何文件改变就刷新
        // files: "**", 

        //指定文件改变刷新
        files: ["./dist/**/*.html", "./dist/**/*.js"],

        // 动态站点
        // proxy: "localhost:8080/xxx/index.action"

        // 静态站点
        server: {
            baseDir: "./dist/",
            index: "html/index.html"
        }
    })

    gulp.watch(paths.html.all, ['html']);
    gulp.watch(paths.sass.all, ['sass']);
    gulp.watch(paths.js.all, ['js']);
})

var commTask = ['html', 'sass', 'js'];

gulp.task('dev', commTask.concat('watch'));
gulp.task('build', commTask);
gulp.task('default', ['dev']);