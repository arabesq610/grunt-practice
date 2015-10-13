/*
 * grunt-checkFileSize
 * https://github.com/arabesq610/grunt-practice
 *
 * Copyright (c) 2015 Elise Linn
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function (grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    function dumpDebugInfo(options) {
        // null chec for options we're expecting
        if (!!options.debug) {
            grunt.log.writeflags(options, 'Options');
        }
    }
    function verifyFolderExists(folderPath) {
        if (!folderPath  || folderPath === '') {
            grunt.fail.fatal('The provided folderToScan was empty or not provided');
        }
        if (!grunt.file.exists(folderPath)) {
            grunt.fail.fatal('The provided folderToScan was not found');
        }
        if (!grunt.file.isDir(folderPath)) {
            grunt.fail.fatal('The provided folderToScan was not a folder');
        }
    }
    function checkFileSizes(options) {
        grunt.file.recurse(options.folderToScan, function (abspath, rootdir, subdir, filename) {
//          grunt.log.writeln('abspath: ', abspath, ', rootdir: ', rootdir, ', subdir: ', subdir);
            if (grunt.file.isFile(abspath)) {
                var stats = fs.statSync(abspath);
                var asBytes = stats.size / 1024;
                grunt.log.writeln('%s, %s kb', filename, asBytes);
            }
        });
    }

    grunt.registerTask('checkFileSize', 'The best Grunt plugin ever.', function () {
        var options = this.options({
            folderToScan: '',
            debug: false
        });

        // debug
        dumpDebugInfo(options);

        // validation
        verifyFolderExists(options.folderToScan);

        // action
        checkFileSizes(options);
    });

    // grunt.registerMultiTask('checkFileSize', 'The best Grunt plugin ever.', function() {
    //     // Merge task-specific and/or target-specific options with these defaults.
    //     var options = this.options({
    //         punctuation: '.',
    //         separator: ', '
    //     });

    //     // Iterate over all specified file groups.
    //     this.files.forEach(function(f) {
    //         // Concat specified files.
    //         var src = f.src.filter(function(filepath) {
    //             // Warn on and remove invalid source files (if nonull was set).
    //             if (!grunt.file.exists(filepath)) {
    //                 grunt.log.warn('Source file "' + filepath + '" not found.');
    //                 return false;
    //             } else {
    //                 return true;
    //             }
    //         }).map(function(filepath) {
    //             // Read file source.
    //             return grunt.file.read(filepath);
    //         }).join(grunt.util.normalizelf(options.separator));

    //         // Handle options.
    //         src += options.punctuation;

    //         // Write the destination file.
    //         grunt.file.write(f.dest, src);

    //         // Print a success message.
    //         grunt.log.writeln('File "' + f.dest + '" created.');
    //     });
    // });

};
