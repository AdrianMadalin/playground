const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const ImageModel = require('../models/images');

const mimetype = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = mimetype[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        const imagePath = path.join(__dirname, '../public/gallery/images');
        cb(error, imagePath);
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split('.');
        const ext = mimetype[file.mimetype];
        cb(null, name[0] + '-' + Date.now() + '.' + ext);
    }
});

router.post('', multer({storage}).array('image', 5), (req, res, next) => {
    const saveImage = async () => {
        let images = [];
        for (let i in req.files) {
            if (req.files.hasOwnProperty(i)) {
                const file = req.files[i];
                await (new Promise((resolve, reject) => {
                    ImageModel.addImage(req, file, (error, savedImage) => {
                        if (error) reject();
                        images.push(savedImage);
                        resolve();
                    });
                }));
            }
        }
        return images;
    };

    saveImage()
        .then(result => {
            res.status(200).json({
                status: 'success',
                images: result
            })
        })
        .catch(error => {
            console.log(error);
            res.status(502).json({
                status: 'fail',
                error
            })
        })
});

router.get('', (req,res, next) => {
    ImageModel.find()
        .then(images => {
            res.status(200).json({
                status: 'success',
                images: images
            })
        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                error
            })
        })
});

module.exports = router;