
var FAUCET_URL = 'http://faucet.royalforkblog.com'
var request = require('superagent')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var req = request.post(FAUCET_URL)
    .send({
      address: address,
      amount: amount
    })
    .type('application/x-www-form-urlencoded')
    .end(function(err, resp) {
      if (err) return callback(err)

      var body = JSON.parse(resp.text)
      if (resp.statusCode !== 200) return callback(body)
      else callback(null, body)
    })
}

module.exports = {
  withdraw: withdraw
}
