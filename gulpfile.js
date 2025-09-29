const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
// const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
// const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const del = require("del");

// Шляхи
const paths = {
  html: "src/*.html",
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
  img: "src/img/**/*",
  dist: "dist",
};

// HTML
function html() {
  return (
    src(paths.html)
      // .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
      .pipe(dest(paths.dist))
      .pipe(browserSync.stream())
  );
}

// SCSS → CSS
function styles() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return (
    src(paths.img, { buffer: true, encoding: null })
      // .pipe(imagemin())
      .pipe(dest(`${paths.dist}/img`))
  );
}

// Очищення
function clean() {
  return del([paths.dist]);
}

// Сервер
function serve() {
  browserSync.init({
    server: { baseDir: paths.dist },
    port: 3000,
    notify: false,
  });
  watch(paths.html, html);
  watch(paths.scss, styles);
  watch(paths.js, scripts);
  watch(paths.img, images);
}

exports.default = series(clean, parallel(html, styles, scripts, images), serve);
