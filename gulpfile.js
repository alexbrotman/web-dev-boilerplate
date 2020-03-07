const gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat");

const paths = {
  styles: {
    src: "./src/scss/**/*.scss",
    dest: "./dist/css"
  },
  scripts: {
    src: "./src/js/**/*.js",
    dest: "./dist/js"
  }
};

const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return gulp
    .src(["node_modules/babel-polyfill/dist/polyfill.js", paths.scripts.src])
    .pipe(concat("scripts.js"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
};

const reload = () => {
  browserSync.reload();
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch("./*.html").on("change", reload);
  gulp.watch("./src/js/**/*.js").on("change", reload);
};

exports.watch = watch;
exports.style = styles;
exports.scripts = scripts;

const build = gulp.parallel(styles, scripts, watch);

gulp.task("default", build);
