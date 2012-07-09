fs = require('fs')
### @HACK : Shim existsSync (since it was moved from path to fs between NodeJS 0.6 and 0.8) ###
fs.existsSync ?= require('path').existsSync

FILE_ENCODING = 'utf8'
EOL = '\n'

### Ensure that the files are wrapped in a FileList object ###
ensureFileList = (files)->
  if files instanceof jake.FileList
    files
  else
    new jake.FileList(files) 
  
### Check whether a target needs updating - i.e. does it not exist or is at least one of its dependencies newer? ###
needsUpdating = (target, dependencies)->
  if not fs.existsSync(target)
    return true
  else
    targetTime = fs.statSync(target).mtime
    dependencies = ensureFileList(dependencies).toArray()
    for dependency in dependencies
      return true if fs.statSync(dependency).mtime > targetTime
  return false

### Generic compiler helper
@param {FileList|String} files Either a glob string (e.g. "*.coffee") or a FileList object of files to compile
@param {function} filenameConverter Function to convert the name of the source file to the name of the target file
@param {function} compiler Function to actually do the compilation, receives, as params, the file to compile and the filenameConverter function.
###
compile = (files, filenameConverter, compiler)->
  files = ensureFileList(files)
  files.exclude (srcFile)->
    not needsUpdating(filenameConverter(srcFile), srcFile)
  for f in files.toArray()
    jake.logger.log 'Compiling: ' + f + ' -> ' + filenameConverter(f)
    src = fs.readFileSync(f, FILE_ENCODING)
    out = compiler(src)
    fs.writeFileSync(filenameConverter(file), out, FILE_ENCODING)


### File concatenation helper ###
concatenateFiles = (files, target)->
  files = ensureFileList(files)
  if needsUpdating(target, files)
    jake.logger.log 'Updating ' + target
    filesContent = files.toArray().map (file)->
      fs.readFileSync(file, FILE_ENCODING)
    fs.writeFileSync(target, filesContent.join(EOL), FILE_ENCODING)

jsParser = require('uglify-js').parser
uglify = require('uglify-js').uglify
uglifyFile = (file, target, opts = {})->
  if needsUpdating(target, file)
    tokens = jsParser.parse(fs.readFileSync(file, FILE_ENCODING))
    tokens = uglify.ast_mangle(tokens) unless opts.noMangle
    tokens = uglify.ast_squeeze(tokens) unless opts.noSqueeze
    jake.logger.log 'Minimizing: ' + file + ' -> ' + target
    fs.writeFileSync(target, uglify.gen_code(tokens), FILE_ENCODING)

### Coffee script compiler helper ###
coffeeScript = require('coffee-script')
coffeeFilenameConverter = (file)-> file.replace('.coffee', '.js')

### Less css compiler helper ###
less = require('less')
lessCompiler = (file, filenameConverter)

### TASKS ###
task 'default', ['build']
task 'build', ['js', 'css', 'ieshiv']

task 'js', ['coffee'], ()->
  jsFiles = new jake.FileList ['common/src/*.js', 'modules/**/src/*.js']
  concatenateFiles jsFiles, 'build/angular-ui.js'
  uglifyFile 'build/angular-ui.js', 'build/angular-ui.min.js', noMangle: true, noSqueeze: true

task 'coffee', ()->
  compile '*/**/*.coffee', coffeeFilenameConverter, coffeeScript.compile

task 'css', ()->

task 'ieshiv', ()->
  if needsUpdating('build/angular-ui-ieshiv.js', 'common/ieshiv/src/ieshiv.js')
    jake.cpR 'common/ieshiv/src/ieshiv.js', 'build/angular-ui-ieshiv.js'
    uglifyFile 'build/angular-ui-ieshiv.js', 'build/angular-ui-ieshiv.min.js', noMangle: true,  noSqueeze: true

task 'test', ['build'], ()->
  noop = ()->
  jake.exec 'testacular-run', noop, printStdout: true, printStderr: true