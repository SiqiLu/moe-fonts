module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    clean: ['css/', 'dist/'],

    lesslint: {
      options: {
        csslint: {
          'font-faces': false
        }
      },
      core: {
        src: ['less/*.less']
      }
    },

    less: {
      options: {
        isCompat: true,
        strictMath: true
      },
      core: {
        files: {
          'css/fonts.css': 'less/fonts.less',
          'css/fonts-ie.css': 'less/fonts-ie.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%', '> 1% in CN', 'last 2 versions', 'ie 8', 'ie 9']
      },
      core: {
        src: ['css/**/*.css', '!css/**/*.min.css']
      }
    },

    cssmin: {
      options: {
        advance: true,
        compatibility: 'ie8',
        keepSpecialComments: 0
      },
      core: {
        files: [{
          expand: true,
          cwd: './',
          src: ['css/**/*.css', '!css/**/*.min.css'],
          dest: './',
          ext: '.min.css'
        }]
      }
    },

    copy: {
      options: {
        timestamp: true
      },
      core: {
        files: [{
          expand: true,
          src: ['css/**'],
          dest: 'dist/',
          filter: 'isFile'
        }, {
          expand: true,
          src: ['fonts/**'],
          dest: 'dist/'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/**/*.js']
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      }
    },

    exec: {
      options: {
        stdout: true,
        stderr: true
      },
      npmUpdate: {
        command: 'npm update'
      },
      npmInstall: {
        command: 'npm install'
      },
      npmPublish: {
        command: 'npm publish'
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    }
  });

  grunt.registerTask('default', ['js', 'clean', 'jshint', 'lesslint', 'less', 'autoprefixer', 'cssmin', 'copy']);
  grunt.registerTask('js', ['jshint', 'jscs']);
  grunt.registerTask('release', ['exec:npmUpdate', 'default', 'bump']);
  grunt.registerTask('release-minor', ['exec:npmUpdate', 'default', 'bump:minor']);
  grunt.registerTask('release-major', ['exec:npmUpdate', 'default', 'bump:major']);

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);
};
