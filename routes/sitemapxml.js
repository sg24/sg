let express = require('express');
let router = express.Router();
const {posts, questions, poets, user, authUser, comment, connectStatus} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
const sm = require('sitemap');

const sitemap = sm.createSitemap({
  hostname: 'https://slodge24.com',
  cacheTime: 600000, // 600 sec - cache purge period
})

function fetchCntID(model,modelType, allID) {
  return new Promise((resolve, reject) => {
    model.find({}).then(results => {
      for (let result of results) {
        allID.push(`/robotonly/view/${modelType}/${result.id}`)
      }
      resolve(allID)
    })
  })
}

sitemap.add({
  url: '/robotonly/post',
  changefreq: 'daily',
  priority: 1,
})

sitemap.add({
  url: '/robotonly/question',
  changefreq: 'daily',
  priority: 1,
})

sitemap.add({
  url: '/robotonly/helpme',
  changefreq: 'daily',
  priority: 1,
})

sitemap.add({
  url: '/robotonly/user',
  changefreq: 'daily',
  priority: 1,
})

router.get('/', (req, res) => {
  fetchCntID(posts, 'post', []).then(postID => {
    fetchCntID(questions, 'question', postID).then(queID => {
      fetchCntID(poets, 'poet', queID).then(allUrl => {
        for (let url of allUrl) {
          sitemap.add({
            url,
            changefreq: 'daily',
            priority: 0.9,
          })
        }
        sitemap.toXML((err, xml) => {
          if (err) {
            res.status(500).end()
            return
          }
          res.header('Content-Type', 'application/xml')
          res.send(xml)
        })
      })
    })
  })
})

 module.exports = router;