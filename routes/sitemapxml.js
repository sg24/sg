let express = require('express');
let router = express.Router();
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
 
const app = express()
let sitemap
 
router.get('/', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  if (sitemap) {
    res.send(sitemap)
    return
  }
  try {
    const smStream = new SitemapStream({ hostname: 'https://slodge24.com/' })
    const pipeline = smStream.pipe(createGzip())
 
    smStream.write({ url: '/post/',  changefreq: 'daily', priority: 0.9 })
    smStream.write({ url: '/question',  changefreq: 'daily',  priority: 0.9 })
    smStream.write({ url: '/poet',  changefreq: 'daily', priority: 0.9 })
    smStream.write({ url: '/users',  changefreq: 'daily',  priority: 0.9 })
    smStream.end()
    streamToPromise(pipeline).then(sm => sitemap = sm)
    pipeline.pipe(res).on('error', (e) => {throw e})
  } catch (e) {
    res.status(500).end()
  }
});

module.exports = router;