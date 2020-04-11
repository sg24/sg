let express = require('express');
let router = express.Router();
const {posts, questions, poets, user, authUser, comment, connectStatus} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
let sitemap;

function fetchCntID(model,modelType, allID) {
  return new Promise((resolve, reject) => {
    model.find({}).then(results => {
        let create = Date.now();
        let desc = '';
        let title = ''
        for (let result of results) {
            if (modelType === 'post') {
                create = result.postCreated
            }
            if (modelType === 'question') {
                create = result.queCreated
            }
            if (modelType === 'poet') {
                create = result.pwtCreated
            }
            if (result && (result.image.length > 0  || result.snapshot.length > 0)) {
                let images = [];
                let snaps = [];
                for (let image of result.image) {
                    images.push({url: `https://slodge24.com/media/image/${image.id}`})            
            }
            for (let snap of result.snapshot) {
                let video = result.video.filter(videoDet => videoDet.snapshotID === snap.videoID);
                snaps.push({thumbnail_loc: `https://slodge24.com/media/image/${snap.id}`,'player_loc': `https://slodge24.com/media/video/${video.videoCnt}`})            
            }
            result.image = images;
            result.snapshot = snaps;
            result.video = [];
        }
        if (modelType === 'post') {
            desc = JSON.parse(result.desc).blocks[0].text
            title = result.title
        }
         if (modelType !== 'post') {
            desc = result.title;
        }
        allID.push({genre: modelType, url: `/view/${modelType}/${result._id}`, 
        title, desc, category: result.category.join(''), create, video: result.snapshot, image: result.image})
      }
      resolve(allID)
    })
  })
}

router.get('/', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    if (sitemap) {
        res.send(sitemap)
        return
    }
    try {
    const smStream = new SitemapStream({ 
        hostname: 'https://slodge24.com',
        cacheTime: 600000, // 600 sec - cache purge period
    })
    const pipeline = smStream.pipe(createGzip())
    smStream.write({
        url: '/index/post',
        changefreq: 'daily',
        priority: 1,
    })

    smStream.write({
        url: '/index/question',
        changefreq: 'daily',
        priority: 1,
    })

    smStream.write({
        url: '/index/helpme',
        changefreq: 'daily',
        priority: 1,
    })

    smStream.write({
        url: '/index/user',
        changefreq: 'daily',
        priority: 1,
    })

    smStream.write({
        url: '/index/group',
        changefreq: 'daily',
        priority: 1,
    })

    smStream.write({
        url: '/conversation',
        changefreq: 'daily',
        priority: 1,
    })
 
 fetchCntID(posts, 'post', []).then(postID => {
    fetchCntID(questions, 'question', postID).then(queID => {
      fetchCntID(poets, 'poet', queID).then(allUrl => {
        for (let cnt of allUrl) {
           smStream.write({
            url: cnt.url,
            changefreq: 'daily',
            priority: 0.9,
            img: cnt.image
          })
        }
        smStream.end()
           // cache the response
        streamToPromise(pipeline).then(sm => sitemap = sm)
        // stream the response
        pipeline.pipe(res).on('error', (e) => {throw e})
      })
    })
  })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

 module.exports = router;