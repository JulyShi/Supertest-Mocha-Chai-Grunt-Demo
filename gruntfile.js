/**
 * Created by xyShi on 11/07/17.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // config a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'test-report.html'
                },
                src: ['test/*.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task.
    grunt.registerTask('default', 'mochaTest');
};
