
var FAUCET_URL = 'http://api.blockcypher.com/v1/btc/test3/faucet'
var request = require('superagent')
var querystring = require('querystring')

module.exports = function getFaucet(token) {
  return {
    withdraw: withdraw.bind(null, token)
  }
}

function withdraw(token, address, amount, callback) {
  var req = request
    .post(FAUCET_URL + '?' + querystring.stringify({ token: token }))
    .type('application/json')
    .send({
      address: address,
      amount: amount
    })
    .end(function(err, res) {
      if (err) return callback(err)

      if (res.status !== 200) {
        return callback(new Error('Error withdrawing from testnet faucet: ' + res.text))
      }

      callback(null, {
        id: res.body.tx_ref
      })
    })
}

