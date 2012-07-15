fs = require('fs')
util = require('./util')
coffeeScript = require('coffee-script')

### Coffee-script compiler helper
@param {FileList|String} files Either a glob string (e.g. "*.coffee") or a FileList object of files to compile
@param {function} filenameConverter Function to convert the name of the source file to the name of the target file
@param {function} compiler Function to actually do the compilation, receives, as params, the file to compile and the filenameConverter function.
###
coffeeFilenameConverter = (file)-> file.replace('.coffee', '.js')
coffeeCompiler = (files, opts)->
  files = util.ensureFileList(files)
  files.exclude (srcFile)->
    not util.needsUpdating(coffeeFilenameConverter(srcFile), srcFile)
  for f in files.toArray()
    targetFilename = coffeeFilenameConverter(f)
    jake.logger.log 'Compiling: ' + f + ' -> ' + targetFilename
    src = fs.readFileSync(f, util.FILE_ENCODING)
    out = coffeeScript.compile(src, filename: f, bare: true)
    fs.writeFileSync(targetFilename, out, util.FILE_ENCODING)

module.exports = coffeeCompiler