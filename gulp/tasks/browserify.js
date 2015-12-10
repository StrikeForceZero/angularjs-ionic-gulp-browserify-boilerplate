'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import debowerify   from 'debowerify';
import ngAnnotate   from 'browserify-ngannotate';
import fs           from 'fs';

function createSourcemap() {
  return !global.isProd || config.browserify.prodSourcemap;
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {
  
  let bundler = browserify({
    entries: [config.sourceDir + 'js/' + file],
    debug: createSourcemap(),
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });

  if ( !global.isProd ) {
    bundler = watchify(bundler);

    bundler.on('update', function() {
      rebundle();
      gutil.log('Rebundle...');
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
        .pipe(gulp.dest(config.buildDir));

    gutil.log('Browser platform and plugins injected!');
  }

  const transforms = [
    { 'name':babelify, 'options': {}},
    { 'name':debowerify, 'options': {}},
    { 'name':ngAnnotate, 'options': {}},
    { 'name':'brfs', 'options': {}},
    { 'name':'bulkify', 'options': {}}
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform.name, transform.options);
  });

  function rebundle() {
    const stream = bundler.bundle();
    const sourceMapLocation = global.isProd ? './' : '';

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap(), buffer()))
      .pipe(gulpif(createSourcemap(), sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(global.isProd, streamify(uglify({
        compress: { drop_console: true }
      }))))
      .pipe(gulpif(createSourcemap(), sourcemaps.write(sourceMapLocation)))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(browserSync.stream());
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('main.js');

});
