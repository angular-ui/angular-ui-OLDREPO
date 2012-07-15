fs = require('fs')
path = require('path')

### @HACK : Shim existsSync (since it was moved from path to fs between NodeJS 0.6 and 0.8) ###
fs.existsSync ?= path.existsSync

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

module.exports =
  FILE_ENCODING: 'utf8'
  EOL: '\n'
  ensureFileList: ensureFileList
  needsUpdating: needsUpdating