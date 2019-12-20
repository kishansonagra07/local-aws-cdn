const express = require("express");
const router = express.Router();
const localCtrl = require("../controllers/localCtrl");

router
    .post('/single', localCtrl.uploadImage, localCtrl.singleUpload)
    .post('/multi', localCtrl.uploadMultipleImage, localCtrl.multiUpload)
    .post('/image-base64',localCtrl.uploadbase64, localCtrl.imageBase64);

module.exports = router;

