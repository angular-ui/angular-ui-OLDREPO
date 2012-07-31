var testacular = require('testacular');

/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-coffee');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/**\n' + ' * <%= pkg.description %>\n' + ' * @version v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * @link <%= pkg.homepage %>\n' + ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */'
    },
    coffee: {
      build: {
        src: ['common/*.coffee', 'modules/**/*.coffee'],
        extension: ".coffee.js"
      }
    },
    concat: {
      basic: {
        src: ['<banner:meta.banner>', 'common/*.js', 'modules/*/*/*.js'],
        dest: 'build/<%= pkg.name %>.js',
      },
      ieshiv: {
        src: ['<banner:meta.banner>', 'common/ieshiv/*.js'],
        dest: 'build/<%= pkg.name %>-ieshiv.js',
      }
    },
    min: {
      basic: {
        src: ['<banner:meta.banner>', '<config:concat.basic.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', '<config:concat.ieshiv.dest>'],
        dest: 'build/<%= pkg.name %>-ieshiv.min.js'
      }
    },
    recess: {
      basic: {
        src: 'common/**/*.less',
        dest: 'build/<%= pkg.name %>.css',
        options: {
          compile: true
        }
      },
      min: {
        src: '<config:recess.basic.dest>',
        dest: 'build/<%= pkg.name %>.min.css',
        options: {
          compress: true
        }
      }
    },
    test: {
      files: ['modules/**/test/*.js']
    },
    watch: {
      files: ['modules/**/*.coffee', 'modules/**/*.js', 'common/**/*.js'],
      tasks: 'coffee concat:basic test'
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min recess:basic recess:min test');

  grunt.registerTask('test', 'run tests (make sure localhost:8080 is opened', function() {
    var done = this.async();
    grunt.log.write('Loading tests ... (Make sure you have at least one browser open to http://localhost:8080)\n')
    grunt.utils.spawn({
      cmd: 'testacular',
      args: ['test/test-config.js', '--single-run']
    }, function(error, result, code) {
      if (code == 1) {
        grunt.warn(error.stdout);
      } else {
        grunt.log.write(result.stdout);
      }
      done();
    });
  });
};