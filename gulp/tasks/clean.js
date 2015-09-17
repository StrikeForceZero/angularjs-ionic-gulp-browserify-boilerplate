'use strict';

var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');
var file   = require('gulp-file');

gulp.task('clean', function(cb) {

  del([config.dist.root], function(){
	//Cordova requires www, so lets keep the folder using .gitkeep even if its empty after a clean.
	file('.gitkeep', '', { src: true }).pipe(gulp.dest(config.dist.root));
	cb();
  });

});
