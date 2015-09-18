'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');
var streamify    = require('gulp-streamify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var debowerify   = require('debowerify');
var ngAnnotate   = require('browserify-ngannotate');
var fs           = require('fs');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

  var bundler = browserify({
    entries: config.browserify.entries,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });

  if ( !global.isProd ) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });

    loadBrowserPlatform();
  }

  function loadBrowserPlatform(){
    var platformWWW = './platforms/browser/www/';

    if(!fs.existsSync(platformWWW)){
      gutil.log(gutil.colors.red('Error:'),'Browser platform not installed!!! Cordova will FAIL');
      gutil.log(gutil.colors.yellow('Info:'),'Please run', gutil.colors.cyan('cordova platform add browser'));
      return;
    }

    gulp.src([
      platformWWW+'plugins/**/*',
      platformWWW+'cordova.js',
      platformWWW+'cordova_plugins.js'
    ], { base: platformWWW})
        .pipe(gulp.dest('./www/'));

    gutil.log('Browser platform and plugins injected!');
  }

  var transforms = [
    babelify,
    debowerify,
    ngAnnotate,
    'brfs',
    'bulkify'
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform);
  });

  function rebundle() {
    var stream = bundler.bundle();
    var createSourcemap = global.isProd && config.browserify.prodSourcemap;

    gutil.log('Rebundle...');

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap, buffer()))
      .pipe(gulpif(createSourcemap, sourcemaps.init()))
      .pipe(gulpif(global.isProd, streamify(uglify({
        compress: { drop_console: true }
      }))))
      .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(browserSync.stream({ once: true }));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('main.js');

});
