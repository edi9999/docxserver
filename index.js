var mime  = require('mime'),
    Docx  = require('docxtemplater'),
    fs = require('fs'),
    express= require('express');

var app=express();

var index = function(req, res) {
  var file = __dirname + '/tagExample.docx';

  res.setHeader('Content-disposition', 'attachment; filename=test.docx');

  var content = fs.readFileSync(file);

  docx = new Docx(content);

  docx.setData({
   "first_name"  : "Hipp",
   "last_name"   : "Edgar",
   "phone"       : "0652455478",
   "description" : "New Website"
  });

  docx.render();
  buf=docx.getZip()
    .generate({type:"nodebuffer"});
  res.send(buf);
  res.end();
};

app.get('/',index);

app.listen(3000);
