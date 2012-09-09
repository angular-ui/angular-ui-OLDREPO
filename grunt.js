var testacular = require('testacular');

/*global module:false*/
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-coffee');

  // Project configuration.
  grunt.initConfig({
    builddir: 'build',
    pkg: '<json:package.json>',
    meta: {
      banner: '/**\n' + ' * <%= pkg.description %>\n' + 
      ' * @version v<%= pkg.version %> - ' + 
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
      ' * @link <%= pkg.homepage %>\n' + 
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */'
    },
    coffee: {
      build: {
        src: ['common/*.coffee', 'modules/**/*.coffee'],
        extension: ".coffee.js"
      }
    },
    concat: {
      build: {
        src: ['<banner:meta.banner>', 'common/*.js'],
        dest: '<%= builddir %>/<%= pkg.name %>.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', 'common/ieshiv/*.js'],
        dest: '<%= builddir %>/<%= pkg.name %>-ieshiv.js'
      }
    },
    min: {
      build: {
        src: ['<banner:meta.banner>', '<config:concat.build.dest>'],
        dest: '<%= builddir %>/<%= pkg.name %>.min.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', '<config:concat.ieshiv.dest>'],
        dest: '<%= builddir %>/<%= pkg.name %>-ieshiv.min.js'
      }
    },
    recess: {
      build: {
        src: ['common/**/*.less'],
        dest: '<%= builddir %>/<%= pkg.name %>.css',
        options: {
          compile: true
        }
      },
      min: {
        src: '<config:recess.build.dest>',
        dest: '<%= builddir %>/<%= pkg.name %>.min.css',
        options: {
          compress: true
        }
      }
    },
    lint: {
      files: ['grunt.js', 'common/**/*.js', 'modules/**/*.js']
    },
    watch: {
      files: ['modules/**/*.coffee', 'modules/**/*.js', 'common/**/*.js', 'templates/**/*.js'],
      tasks: 'coffee build test'
    }
  });

  //Get all the available modules into an array
  var modules = {};
  grunt.file.recurse('modules', function(abspath, rootdir, subdir, filename) {
    var moduleDir;
    //If number of / is 1, we know it's first in depth. eg filters/inflector, not filters/inflector/test
    if (subdir.split('/').length === 2) {
      moduleDir = rootdir + '/' + subdir;
      modules[subdir] = {
        js: grunt.file.expand(moduleDir + '/*.js'),
        less: grunt.file.expand(moduleDir + '/*.less')
      };
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee build test');

  grunt.registerTask('build', 'build all or some of the angular-ui modules', function() {

    var jsBuildFiles = grunt.config('concat.build.src');
    var lessBuildFiles = grunt.config('recess.build.src');

    function addModuleFiles(module) {
      module.js.forEach(function(file) {
        jsBuildFiles.push(file);
      });
      module.less.forEach(function(file) {
        lessBuildFiles.push(file);
      });
    }

    if (this.args.length === 0) {
      //if no modules given as args, go to default: build all
      for (var moduleName in modules) {
        if (modules.hasOwnProperty(moduleName)) {
          addModuleFiles(modules[moduleName]);
        }
      }
    } else {
      //if args are found, build given modules & build to custom folder
      grunt.config('builddir', 'build/custom');
      this.args.forEach(function(moduleName) {
        if (modules[moduleName]) {
          addModuleFiles(modules[moduleName]);
        }
      });
    }

    //Set config with our new file lists
    grunt.config('concat.build.src', jsBuildFiles);
    grunt.config('recess.build.src', lessBuildFiles);

    grunt.task.run('concat min recess:build recess:min');
  });

  grunt.registerTask('server', 'start testacular server', function () {
    //Mark the task as async but never call done, so the server stays up
    var done = this.async();
    testacular.server.start({configFile:'test/test-config.js'});
  });

  grunt.registerTask('test', 'run tests (make sure server task is run first)', function () {

    var testCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
    var testArgs = process.env.TRAVIS ? ['start', '--single-run', '--no-auto-watch', '--reporter=dots', '--browsers=Firefox'] : ['run'];

    var done = this.async();
    var child = grunt.utils.spawn({cmd:testCmd, args:testArgs}, function (err, result, code) {
      if (code) {
        grunt.fail.fatal("Test failed...", code);
      } else {
        done();
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
};
