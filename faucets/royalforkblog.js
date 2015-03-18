
var FAUCET_URL = 'http://faucet.royalforkblog.com'
var request = require('request')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var data = querystring.stringify({
    address: address,
    amount: amount
  })

  var req = request.post(FAUCET_URL, {
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }, function(err, resp, body) {
    callback(err, body)
  })
}

module.exports = {
  withdraw: withdraw
}
