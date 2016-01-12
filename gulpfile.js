'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var testNotification = function(status) {
    return {
        title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
        message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
        icon:    __dirname + '/icons/' + status + '.png'
    };
};

gulp.task('run-phpspec', function() {
    gulp.src('phpspec.yml')
        .pipe($.phpspec('', { notify: true }))
        .on('error', $.notify.onError(testNotification('fail')))
        .pipe($.notify(testNotification('pass')));
});

gulp.task('phpspec', ['run-phpspec'], function() {
    gulp.watch(['spec/**/*.php', 'src/**/*.php'], ['run-phpspec']);
});

gulp.task('default', ['phpspec']);
