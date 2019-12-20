const multer = require("multer");
const fs = require("fs");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/local');
    },
    filename:(req, file, cb) => {
        //const ext = file.mimetype.split('/')[1]; // extension
        cb(null, `image-${Date.now()}-${file.originalname}`);
    }
});

const multerFilter = (req, file, cb, next) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        var err = new Error('Not an image, Please upload only image');
        err.statusCode = 404;
        err.status = 'error';
        cb(err, false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
var uploadMemoryStorage = multer({ storage: multer.memoryStorage({}) });

exports.uploadImage = upload.single('image');
exports.uploadMultipleImage = upload.array('multiImage',2);
exports.uploadbase64 = uploadMemoryStorage.single('image');

exports.singleUpload = (req, res) => {
    const photo = req.file;
    if (!photo) {
        return res.status(404).send({
            status: 'error',
            data: 'No image is selected.'
        });
    }
    return res.status(200).json({
        status : "success",
        file : `${req.protocol}://${req.get('host')}/local/${req.file.filename}`,
        originalname : req.file.originalname
    });
};

exports.multiUpload = (req, res) => {
    const photos = req.files;
    if (!photos) {
        return res.status(404).send({
            status: 'error',
            data: 'No image is selected.'
        });
    }
    let data = [];
    photos.map(p => data.push({
        originalname: p.originalname,
        filename: `${req.protocol}://${req.get('host')}/local/${p.filename}`,
        size: p.size
    }));

    return res.status(200).json({
        status : "success",
        file : data
    });
};

exports.imageBase64 = (req, res) => {  
    const photo = req.file;    
    if (!photo || photo === undefined) {
        return res.status(404).send({
            status: 'error',
            data: 'No image is selected.'
        });
    }
    const base64 = photo.buffer.toString('base64');
    return res.status(200).json({
        status : "success",
        file : base64 // you can save this base64 into your DB
    });
}