fs = require('fs')
util = require('./jake/util')
concatenateFiles = require('./jake/concat')
lessCompiler = require('./jake/less')
coffeeCompiler = require('./jake/coffee')
uglifyFile = require('./jake/uglify')

### Files ###
jsFiles = new jake.FileList('common/src/*.js', 'modules/**/src/*.js').toArray()
coffeeFiles = new jake.FileList('common/**/*.coffee', 'modules/**/*.coffee').toArray()
jsBuildFile = 'build/angular-ui.js'
jsBuildFileMin = 'build/angular-ui.min.js'
lessFiles = new jake.FileList('common/**/*.less', 'modules/**/*.less').toArray()
lessMainFile = 'common/stylesheets/angular-ui.less'
cssBuildFile = 'build/angular-ui.css'
cssBuildFileMin = 'build/angular-ui.min.css'

### TASKS ###
desc('Build the project')
task 'default', ['js', 'css', 'ieshiv']

directory 'build'

desc('Concat all the js files together and minimize')
task 'js', ['build','coffee', jsBuildFileMin, jsBuildFile]
file jsBuildFile, jsFiles, ()->
  concatenateFiles jsFiles, jsBuildFile
file jsBuildFileMin, [jsBuildFile], ()->
  uglifyFile jsBuildFile, jsBuildFileMin, noMangle: true, noSqueeze: true

desc('Generate the js files from the coffee-script files.')
task 'coffee', coffeeFiles, ()->
  coffeeCompiler coffeeFiles


desc('Generate the css files from the less files.')
task 'css', ['build', cssBuildFileMin], ()->
file cssBuildFile, lessFiles, ()->
  lessCompiler lessMainFile, cssBuildFile, complete
, async: true
file cssBuildFileMin, [cssBuildFile], ()->
  lessCompiler lessMainFile, cssBuildFileMin, complete, compress: true
, async: true

desc('Copy over and minify the ieshiv helper file.')
task 'ieshiv', ['build','build/angular-ui-ieshiv.min.js']
file 'build/angular-ui-ieshiv.js', ['common/ieshiv/src/ieshiv.js'], ()->
  jake.cpR 'common/ieshiv/src/ieshiv.js', 'build/angular-ui-ieshiv.js'
file 'build/angular-ui-ieshiv.min.js', ['build/angular-ui-ieshiv.js'], ()->
  uglifyFile 'build/angular-ui-ieshiv.js', 'build/angular-ui-ieshiv.min.js', noMangle: true,  noSqueeze: true


desc('Run the tests - needs testacular to be running.')
task 'test', ['default'], ()->
  jake.exec 'testacular-run', complete, printStdout: true, printStderr: true
, async: true

desc('Start the test server')
task 'test-server', ['default'], ()->
  jake.exec 'testacular test/test-config.js', printStdout: true, printStderr: true
, async: true
