
var FAUCET_URL = 'faucet.royalforkblog.com'
var http = require('http')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var data = querystring.stringify({
    address: address,
    amount: amount
  })

  var req = http.request({
    host: FAUCET_URL,
    port: '80',
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }, function(res) {
    res.pipe(concat(function(buf) {
      var json = JSON.parse(buf.toString())
      if (res.statusCode === 200) callback(null, json)
      else callback(json)
    }))
  })

  req.write(data)
  req.end()
}

module.exports = {
  withdraw: withdraw
}
