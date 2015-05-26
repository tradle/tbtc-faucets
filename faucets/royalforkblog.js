
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

      var body
      try {
        body = JSON.parse(resp.text)
      } catch (err) {}

      if (resp.statusCode !== 200) {
        return callback(new Error('Error withdrawing from testnet faucet: ' + resp.text))
      }
      else if (!body) {
        return callback(new Error('Failed to parse JSON response from testnet faucet: ' + resp.text))
      }

      callback(null, body)
    })
}

module.exports = {
  withdraw: withdraw
}
