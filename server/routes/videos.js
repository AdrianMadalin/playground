const express = require('express');
const router = express.Router();
const VideoModel = require('../models/videos');

router.get('', (req, res, next) => {
    VideoModel.find({})
        .sort({createdAt: -1})
        .then(videos => {
            res.status(200).json({
                status: 'success',
                message: 'Video url successfully retrieved from the database',
                videos
            })
        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                message: 'Fail to retrieve video url from the database',
                error
            });
            return next();
        })
});

router.post('', (req, res, next) => {
    console.log(req.body.url);
    if (!req.body.url) return next();

    const iframeUrl = new VideoModel({
        url: req.body.url
    });

    iframeUrl.save()
        .then(savedUrl => {
            res.status(200).json({
                status: 'success',
                message: 'Video url successfully saved to the database',
                video: savedUrl
            })
        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                message: 'Fail to save url to the database',
                error
            });
            return next();
        });
});

router.delete('/:id', (req, res, next) => {
    if (!req.params.id) return next();

    VideoModel.findOneAndDelete({_id: req.params.id})
        .then(removedVideo => {
            res.status(200).json({
                status: 'success',
                message: 'Video url successfully removed from the database',
                removedVideo
            })
        })
        .catch(error => {
            res.status(502).json({
                status: 'fail',
                message: 'Fail to remove video url from the database',
                error
            });
            return next();
        });
});

module.exports = router;