const express = require('express')
const https = require('https')
const http = require('http')
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }

const app = express() // the main app
const admin = express() // the sub app
const dashboard  = express()

admin.get('/', (req, res) => {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})
dashboard.get('/',(req,res)=>{
    console.log(dashboard.mountpath) // /admin
  res.send('dashboard Homepage')
})
admin.use('/dashboard',dashboard)
app.use('/admin', admin) // mount the sub app
http.createServer(app).listen(80)
https.createServer(options, app).listen(443)