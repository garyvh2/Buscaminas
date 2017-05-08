/**===========================================================================**
    Require
**===========================================================================**/
//Gulp
var gulp            = require('gulp');
//browser-sync utility
var browserSync     = require('browser-sync').create();
//Scss compiler
var sass            = require('gulp-sass');
//css prefixer
var autoprefixer    = require('autoprefixer');
//css post processer
var postcss         = require('gulp-postcss');


//Styles path
var sassFiles   = 'src/app/style/**/*.scss';
var cssDest     = 'src/app/style/css/';


/**===========================================================================**
    Task
**===========================================================================**/
//Init the browserSync static server
gulp.task('browserSync', ['styles:compile'],() => {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

});
//Styles pipe processer
gulp.task('styles:compile', () => {
    //List of Style plugins to be processed
    var plugins = [
        autoprefixer({
            browsers: ['last 2 versions']
        }),
    ];
    //Style
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss (plugins))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
});
/**===========================================================================**
    Watch
**===========================================================================**/
gulp.task('watch', () => {
    //Watch for any changes in .scss files then build and strem them
    gulp.watch("src/app/style/**/*.scss"    , ['styles:compile']);
    //Watch for any changes in .js files
    gulp.watch("src/**/*.js").on('change'   , browserSync.reload);
    //Watch for any changes in .html files
    gulp.watch("src/**/*.html").on('change' , browserSync.reload);
});
/**===========================================================================**
    Launcher
**===========================================================================**/
gulp.task('default', ['browserSync','watch']);
