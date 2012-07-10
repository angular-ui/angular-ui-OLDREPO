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

### TASKS ###
task 'default', ['build']

desc('Build the project')
task 'build', ['js', 'css', 'ieshiv']


desc('Concat all the js files together and minimize')
task 'js', ['coffee', jsBuildFileMin, jsBuildFile]
file jsBuildFile, jsFiles, ()->
  concatenateFiles jsFiles, jsBuildFile
file jsBuildFileMin, jsBuildFile, ()->
  uglifyFile jsBuildFile, jsBuildFileMin, noMangle: true, noSqueeze: true


desc('Generate the js files from the coffee-script files.')
task 'coffee', coffeeFiles, ()->
  coffeeCompiler coffeeFiles


desc('Generate the css files from the less files.')
task 'css', [cssBuildFile], ()->
file cssBuildFile, lessFiles, ()->
  lessCompiler lessMainFile, cssBuildFile, complete
, { async: true }


desc('Copy over and minify the ieshiv helper file.')
task 'ieshiv', ['build/angular-ui-ieshiv.js', 'common/ieshiv/src/ieshiv.js']
file 'build/angular-ui-ieshiv.js', ['common/ieshiv/src/ieshiv.js'], ()->
  jake.cpR 'common/ieshiv/src/ieshiv.js', 'build/angular-ui-ieshiv.js'
file 'build/angular-ui-ieshiv.min.js', ['build/angular-ui-ieshiv.js'], ()->
  uglifyFile 'build/angular-ui-ieshiv.js', 'build/angular-ui-ieshiv.min.js', noMangle: true,  noSqueeze: true


desc('Run the tests - needs testacular to be running.')
task 'test', ['build'], ()->
  jake.exec 'testacular-run', complete, printStdout: true, printStderr: true
