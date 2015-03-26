
var FAUCET_URL = 'http://faucet.royalforkblog.com'
var request = require('request')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var data = querystring.stringify({
    address: address,
    amount: amount
  })

  var req = request.post({
    uri: FAUCET_URL,
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }, function(err, resp, body) {
    if (err) return callback(err)

    body = JSON.parse(body)
    if (resp.statusCode !== 200) return callback(body)
    else callback(null, body)
  })
}

module.exports = {
  withdraw: withdraw
}
