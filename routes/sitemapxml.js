let express = require('express');
let router = express.Router();
const sm = require('sitemap')
// const posts = require('./posts')

const sitemap = sm.createSitemap({
  hostname: 'https://slodge24.com',
  cacheTime: 600000, // 600 sec - cache purge period
})

// const Posts = posts()
//   for (let i = 0; i < Posts.length; i += 1) {
//     const post = Posts[i]
//     sitemap.add({
//       url: `/posts/${post.slug}`,
//       changefreq: 'daily',
//       priority: 0.9,
//     })
// }

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
  sitemap.toXML((err, xml) => {
    if (err) {
      res.status(500).end()
      return
    }
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  })
})

 module.exports = router;