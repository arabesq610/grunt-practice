/*global module:false*/
var fs = require('fs');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        checkFileSize: {
            options: {
                folderToScan: './files'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['checkFileSize']);
    grunt.registerTask('checkFileSize', 'Task to check file size', function (debug) {

        var options = this.options({
            folderToScan: ''
        });

        // null chec for args array , and arg we're expecting
        if (this.args.length && debug) {
            grunt.log.writeflags(options, 'Options');
        }

        grunt.file.recurse(options.folderToScan, function (abspath, rootdir, subdir, filename) {
            grunt.log.writeln('abspath: ', abspath, ', rootdir: ', rootdir, ', subdir: ', subdir);
            if (grunt.file.isFile(abspath)) {
                var stats = fs.statSync(abspath);
                var asBytes = stats.size / 1024;
                grunt.log.writeln('%s, %s kb', filename, asBytes);
            }
        });
    });
};
