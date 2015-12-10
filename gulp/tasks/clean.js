'use strict';

import config from '../config';
import gulp   from 'gulp';
import del    from 'del';
import file   from 'gulp-file';

gulp.task('clean', function() {

  return del([config.buildDir],function(){
	//Cordova requires www, so lets keep the folder using .gitkeep even if its empty after a clean.
	file('.gitkeep', '', { src: true }).pipe(gulp.dest(config.buildDir));
  });

});
