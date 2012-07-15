fs = require('fs')
util = require('./util')
jsParser = require('uglify-js').parser
uglify = require('uglify-js').uglify

uglifyFile = (file, target, opts = {})->
  tokens = jsParser.parse(fs.readFileSync(file, util.FILE_ENCODING))
  tokens = uglify.ast_mangle(tokens) unless opts.noMangle
  tokens = uglify.ast_squeeze(tokens) unless opts.noSqueeze
  jake.logger.log 'Minimizing: ' + file + ' -> ' + target
  fs.writeFileSync(target, uglify.gen_code(tokens), util.FILE_ENCODING)

module.exports = uglifyFile