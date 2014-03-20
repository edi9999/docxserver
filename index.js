var mime  = require('mime'),
    Docx  = require('docxtemplater'),
    express= require('express');

var app=express()

var index = function(req, res) {
  var file = __dirname + '/tagExample.docx';

  res.setHeader('Content-disposition', 'attachment; filename=test.docx');
  
  new Docx().loadFromFile( file, { async: true } ).success(function(docx) {
    docx.setTags({
     "first_name"  : "Hipp",
     "last_name"   : "Edgar",
     "phone"       : "0652455478",
     "description" : "New Website"
    });

    docx.applyTags();
    out=docx.output({download:false,type:"string"})
    res.send(new Buffer(out,"binary"));
    res.end();
  });
};

app.get('/',index);

app.listen(3000);
