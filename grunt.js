var testacular = require('testacular');

/*global module:false*/
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-curl');

  // Project configuration.
  grunt.initConfig({
    builddir: 'build',
    pkg: '<json:package.json>',
    meta: {
      banner: '/**\n' + ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
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
    curl: { //grunt-curl external dependencies
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
        src: [],
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
      files: ['grunt.js', 'common/**/*.js', 'modules/**/*.js', 'modules/**/*.json']
    },
    watch: {
      files: ['modules/**/*.coffee', 'modules/**/*.js', 'common/**/*.js', 'templates/**/*.js'],
      tasks: 'coffee build test'
    }

  });

  // Default task.
  grunt.registerTask('default', 'coffee build test');

  grunt.registerTask('build', 'build all or some of the angular-ui modules', function () {

    var jsFiles = grunt.config('concat.build.src');
    var lessFiles = grunt.config('recess.build.src');
    var curlFiles = grunt.config('curl');

    function findModuleFiles(moduleName, getExternalFiles) {
      jsFiles = jsFiles.concat(grunt.file.expand('modules/*/' + moduleName + '/*.js'));
      lessFiles = lessFiles.concat(grunt.file.expand('modules/*/' + moduleName + '/**/*.less'));
      
      grunt.file.expand('modules/*/' + moduleName + '/dependencies.json')
      .map(grunt.file.read).forEach(function(content) {
        var json = JSON.parse(content);
        if (getExternalFiles) {
          //Add external deps to curl list
          json.external.forEach(function(url) {
            var fileName = url.substr(url.lastIndexOf('/') + 1);
            curlFiles[grunt.config('builddir') + '/lib/' + fileName] = url;
          });
        }
        json.internal.forEach(findModuleFiles);
      });
    }

    if (this.args.length > 0) {
      this.args.forEach(function(module) { findModuleFiles(module, true); });
    } else {
      //Find modules for every directory
      grunt.file.expand('modules/*/*').forEach(function(path) { 
        findModuleFiles(path.split('/')[2]);
      });
    }
    grunt.config('concat.build.src', jsFiles);
    grunt.config('recess.build.src', lessFiles);
    grunt.config('curl', curlFiles);
    
    //Only run curl task if length of curlFiles > 0
    if (Object.keys(grunt.config('curl')).length > 0) {
      grunt.task.run('curl');
    }
    grunt.task.run('concat min recess');
  });

  grunt.registerTask('dist', 'change dist location', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('builddir', dir); }
  });

  grunt.registerTask('server', 'start testacular server', function () {
    //Mark the task as async but never call done, so the server stays up
    var done = this.async();
    testacular.server.start({ configFile: 'test/test-config.js'});
  });

  grunt.registerTask('test', 'run tests (make sure server task is run first)', function () {
    var done = this.async();
    grunt.utils.spawn({
      cmd: process.platform === 'win32' ? 'testacular.cmd' : 'testacular',
      args: process.env.TRAVIS ? ['start', 'test/test-config.js', '--single-run', '--no-auto-watch', '--reporter=dots', '--browsers=Firefox'] : ['run']
    }, function (error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n" +
          "Also make sure you have a browser open to http://localhost:8080/.\n" +
          error.stdout + error.stderr);
        //the testacular runner somehow modifies the files if it errors(??).
        //this causes grunt's watch task to re-fire itself constantly,
        //unless we wait for a sec
        setTimeout(done, 1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    });
  });
};
