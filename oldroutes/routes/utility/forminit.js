module.exports = formInit = (req, formidable) => {
    return new Promise((resolve, reject) => {
        var form = new formidable.IncomingForm();
        form.uploadDir = "./tmp/";
        form.keepExtensions = true;
        form.maxFieldsSize = 16 * 1024 * 1024 * 1024;
        form.maxFileSize = 16 * 1024 * 1024 * 1024;
        form.maxFields = 1000;
        form.hash = 'md5';
        form.multiples = true;

        form.parse(req, function(err, fields, files) {
            if(!err) {
                return resolve({fields, files})
            }
            reject(err)
        })
    })
}