
module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/** \n' +
            ' * ! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' *<%= pkg.homepage ? " " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
            ' */\n',
        // Task configuration
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['bower_components/jquery/dist/jquery.min.js', 'app/lib/aoe.js'],
                dest: 'public/js/aoe.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'public/js/aoe.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['app/lib/**/*.js']
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: '<%= concat.dist.src %>',
                tasks: ['concat', 'uglify']
            },
            html: {
                files: 'app/haml/main.haml',
                tasks: ['haml']
            },
            compass: {
                files: 'app/sass/**/*.sass',
                tasks: ['compass']
            }
        },
        haml: {                              // Task
            dist: {                            // Target
                files: {                         // Dictionary of files
                    'public/index.html': 'app/haml/main.haml'       // 'destination': 'source'
                }
            }
        },
        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: 'app/sass',
                    cssDir: 'public/css',
                    environment: 'production'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'public'
                }
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-haml');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'haml']);
};

