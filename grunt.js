var testacular = require('testacular');

/*global module:false*/
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-recess');

  // Project configuration.
  grunt.initConfig({
    dist: 'build',
    pkg: '<json:package.json>',
    meta: {
      banner: ['/**',
      ' * <%= pkg.description %>',
      ' * @version v<%= pkg.version %> - ',
      '<%= grunt.template.today("yyyy-mm-dd") %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license MIT License, http://www.opensource.org/licenses/MIT',
      ' */'].join('\n')
    },
    concat: {
      build: {
        src: ['<banner:meta.banner>', 'common/*.js'],
        dest: '<%= dist %>/<%= pkg.name %>.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', 'common/ieshiv/*.js'],
        dest: '<%= dist %>/<%= pkg.name %>-ieshiv.js'
      }
    },
    min: {
      build: {
        src: ['<banner:meta.banner>', '<config:concat.build.dest>'],
        dest: '<%= dist %>/<%= pkg.name %>.min.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', '<config:concat.ieshiv.dest>'],
        dest: '<%= dist %>/<%= pkg.name %>-ieshiv.min.js'
      }
    },
    recess: {
      build: {
        src: ['common/**/*.less'],
        dest: '<%= dist %>/<%= pkg.name %>.css',
        options: {
          compile: true
        }
      },
      min: {
        src: '<config:recess.build.dest>',
        dest: '<%= dist %>/<%= pkg.name %>.min.css',
        options: {
          compress: true
        }
      }
    },
    lint: {
      files: ['grunt.js', 'common/**/*.js', 'modules/**/*.js']
    },
    watch: {
      files: ['modules/**/*.js', 'common/**/*.js', 'templates/**/*.js'],
      tasks: 'build test'
    }
  });

  // Default task.
  grunt.registerTask('default', 'build test');

  grunt.registerTask('build', 'build all or some of the angular-ui modules', function () {

    var jsBuildFiles = grunt.config('concat.build.src');
    var lessBuildFiles = [];

    if (this.args.length > 0) {

      this.args.forEach(function(moduleName) {
        var modulejs = grunt.file.expandFiles('modules/*/' + moduleName + '/*.js');
        var moduleless = grunt.file.expandFiles('modules/*/' + moduleName + '/stylesheets/*.less', 'modules/*/' + moduleName + '/*.less');

        jsBuildFiles = jsBuildFiles.concat(modulejs);
        lessBuildFiles = lessBuildFiles.concat(moduleless);
      });

      grunt.config('concat.build.src', jsBuildFiles);
      grunt.config('recess.build.src', lessBuildFiles);

    } else {
      grunt.config('concat.build.src', jsBuildFiles.concat(['modules/*/*/*.js']));
      grunt.config('recess.build.src', lessBuildFiles.concat(grunt.config('recess.build.src')));
    }

    grunt.task.run('concat min recess:build recess:min');
  });

  grunt.registerTask('dist', 'change dist location', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('dist', dir); }
  });

  grunt.registerTask('test', 'run tests on single-run server', function() {
    var options = ['--single-run', '--no-auto-watch', '--log-level=warn'];
    if (process.env.TRAVIS) {
      options =  options.concat(['--browsers=Firefox']);
    } else {
      //Can augment options with command line arguments
      options =  options.concat(this.args);
    }
    runTestacular('start', options);
  });

  grunt.registerTask('server', 'start testacular server', function() {
    var options = ['--no-single-run', '--no-auto-watch'].concat(this.args);
    runTestacular('start', options);
  });

  grunt.registerTask('test-run', 'run tests against continuous testacular server', function() {
    var options = ['--single-run', '--no-auto-watch'].concat(this.args);
    runTestacular('run', options);
  });

  grunt.registerTask('test-watch', 'start testacular server, watch & execute tests', function() {
    var options = ['--no-single-run', '--auto-watch'].concat(this.args);
    runTestacular('start', options);
  });
  
  function runTestacular(command, options) {
    var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
    var args = [command, 'test/test-config.js'].concat(options);
    var done = grunt.task.current.async();
    var child = grunt.utils.spawn({
      cmd: testacularCmd,
      args: args
    }, function(err, result, code) {
      if (code) {
        done(false);
      } else {
        done();
      }
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }
};
