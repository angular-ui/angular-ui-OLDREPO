fs = require('fs')
path = require('path')
async = require('async')
less = require('less')
util = require('./util')

lessCompiler = (source, target, callback)->
  jake.logger.log 'Compiling: ' + source + ' -> ' + target
  async.waterfall([
    (callback)-> fs.readFile(source, util.FILE_ENCODING, callback)
  ,
    (src, callback)->
      sourceFolder = path.dirname(source)
      parser = new less.Parser(paths: [sourceFolder])
      parser.parse src, callback
  ,
    (tree, callback)-> 
      fs.writeFile(target, tree.toCSS(), util.FILE_ENCODING, callback)
  ], callback)
    
module.exports = lessCompiler