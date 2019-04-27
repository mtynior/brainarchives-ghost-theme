const { src, dest, task, watch } = require("gulp");

// CSS related plugins
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

// Utility plugins
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

// Project related variables
var styleSRC = "./src/sass/brainarchives.scss";
var styleURL = "./assets/css/";
var mapURL = "./";

var styleWatch = "./src/sass/**/*.scss";

// Tasks
function css(done) {
  src([styleSRC])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({ browsers: ["last 2 versions", "> 5%", "Firefox ESR"] })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write(mapURL))
    .pipe(dest(styleURL));
  done();
}


function watch_files() {
  watch(styleWatch, css);
}

task("default", css);
task("build", css);
task("watch", watch_files);