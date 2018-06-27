const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const checkAuthToken = require('../middleware/check-auth');
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

router.get('', (req, res, next) => {
    ImageModel.find({})
        .sort({createdAt: -1})
        .then(images => {
            res.status(200).json({
                status: 'success',
                message: 'Image successfully retrieved from the database',
                images: images
            })
        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                message: 'Fail to retrieve images from the database',
                error
            });
           return next();
        })
});

router.post('', checkAuthToken, multer({storage}).array('image', 5), (req, res, next) => {
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
                message: 'Images saved to the database',
                images: result
            })
        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                message: 'Fail to save images to the database',
                error
            })
        })
});

router.delete('/:id', checkAuthToken, (req, res, next) => {
    ImageModel.findOne({_id: req.params.id})
        .then(image => {
            const imagePath = path.join(__dirname, '../public/gallery/images/');
            fs.unlink(imagePath + image.name, (error) => {
                if (error) {
                    res.status(502).json({
                        status: 'fail',
                        message: 'CANNOT DELETE FILE',
                        error
                    })
                } else {
                    ImageModel.findOneAndDelete({_id: image._id})
                        .then(removedImage => {
                            res.status(200).json({
                                status: 'success',
                                image: removedImage
                            })
                        })
                        .catch(error => {
                            res.status(502).json({
                                status: 'fail',
                                error
                            })
                        })
                }
            });

        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                error
            });
        })
});

module.exports = router;