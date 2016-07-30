
var fs = require('fs');

exports.readFileNames = function(dir, fullPath) {
  var filelist = [];
  var dirs = [];
  fs.readdirSync(dir).forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory())
      dirs.push(dir + '/' + file);
    else if(fullPath)
      filelist.push(dir + '/' + file);
    else
      filelist.push(file);
  });
  for(var i = 0; i < dirs.length; i++)
    filelist = filelist.concat(exports.readFileNames(dirs[i], fullPath));

  return filelist;
};
