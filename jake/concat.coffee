fs = require('fs')
util = require('./util')

### File concatenation helper ###
concatenateFiles = (files, target)->
  files = util.ensureFileList(files)
  jake.logger.log 'Updating ' + target
  filesContent = files.toArray().map (file)->
    fs.readFileSync(file, util.FILE_ENCODING)
  fs.writeFileSync(target, filesContent.join(util.EOL), util.FILE_ENCODING)

module.exports = concatenateFiles