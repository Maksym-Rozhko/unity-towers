"use strict";

const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const minify = require("gulp-minify");
const imageminJpegtran = require("imagemin-jpegtran");
const server = require("browser-sync").create();


gulp.task("del", function() {
    return del('build')
});

gulp.task("css", function() {
    return gulp.src('source/sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(csso())
        .pipe(autoprefixer('last 10 versions'))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("server", function () {
    server.init({
        server: "build/",
        // browser: 'google chrome',
        notify: false,
        open: true,
        cars: true,
        ui: false
    });
    gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
    gulp.watch("source/js/*.js", gulp.series("js"));
    gulp.watch("source/*.html").on("change", gulp.series("html", "refresh"));
});

gulp.task("html", function() {
    return gulp 
    .src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("js", async () => {
    return gulp
        .src("source/js/*.js")
        .pipe(uglify({
           toplevel: true
        }))
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("build/js"))
        .pipe(server.stream());
});

gulp.task("fonts", function() {
    return gulp 
    .src("source/fonts/*").pipe(gulp.dest("build/fonts"))
}); 

gulp.task("copy", function() {
    return gulp 
    .src("source/images/**/*").pipe(gulp.dest("build/images"))
});   

gulp.task("images", function() {
    return gulp 
    .src("source/images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
        imagemin.optipng({ optimizationlevel: 3 }),
        imageminJpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest("build/images"));
});

gulp.task("refresh", () => {
    server.reload();
});

gulp.task("build", gulp.series('del', 'html', 'css', 'js', 'fonts', 'copy', 'images')); 
gulp.task("start", gulp.series('css', 'html', 'js', 'server'));