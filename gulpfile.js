var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  gutil = require('gulp-util'),
  debug = require('debug')('task');

gulp.task('default', function() {
  gutil.log("Sorry, but you need to pass an [action] to make this project works");
  gutil.log("Check for more information: gulp tasks");
});

gulp.task('tasks',function(){
  gutil.log("Avalible tasks are:");
  gutil.log("\tjson <-- Create a JSON file bassed on the CSV file")
});

gulp.task('json', function(){

});
