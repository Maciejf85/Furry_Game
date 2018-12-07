var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps'); 
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');


gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('serve', function(){
    browserSync({
        server: './'
    });

    gulp.watch('./*.html', ['reload']);
});

gulp.task('sass', function() {
return gulp.src('scss/main.scss')
.pipe(sourcemaps.init())               
.pipe(sass({
    errLogToConsole: true,
    outputStyle: 'nested' //nested, expanded, compact, compressed.
}))
.pipe(sourcemaps.write())           
.pipe(autoprefixer({
    browsers: ['last 3 versions']
}))   
.pipe(gulp.dest('css'))
.pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src('js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})
// minifikacja javascript ===> gulp js


gulp.task('watch', ['sass', 'serve'], function(){
    gulp.watch('scss/**/*.scss', ['sass']);
});


// 1. npm init -y
// 2. npm i -D gulp gulp-sass gulp browser-sync gulp-sourcemaps gulp-autoprefixer gulp-uglify

// 3. gulp watch
// 4. gulp js

// (npm install --save-dev) ===> npm i -D

// gulp.task('NAZWA ZADANIA', [opcjonalnie, LISTA ZADAŃ DO WYKONANIA] , function(){
    // ciało funkcji })

    // https://github.com/marcinkrzeminski/gulp-starter-kit