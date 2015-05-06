
var FAUCET_URL = 'http://testnet.helloblock.io/v1/faucet/withdrawal'
var request = require('superagent')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var data = querystring.stringify({
    toAddress: address,
    value: amount
  })

  var req = request
    .post(FAUCET_URL)
    .send(data)
    .type('application/x-www-form-urlencoded')
    .end(function(err, resp) {
      debugger
      if (err) return callback(err)

      var body = JSON.parse(resp.text)
      if (resp.statusCode !== 200) return callback(body)

      var txId = reverse(new Buffer(body.data.txHash, 'hex')).toString('hex')
      callback(null, {
        id: txId
      })
    })
}

function reverse (buf) {
  var rev = new Buffer(buf)
  Array.prototype.reverse.call(rev)
  return rev
}

module.exports = {
  withdraw: withdraw
}
