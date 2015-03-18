
var FAUCET_URL = 'testnet.helloblock.io'
var http = require('http')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var data = querystring.stringify({
    toAddress: address,
    value: amount
  })

  var req = http.request({
    host: FAUCET_URL,
    port: '80',
    path: '/v1/faucet/withdrawal',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }, function(res) {
    res.pipe(concat(function(buf) {
      var json = JSON.parse(buf.toString())
      if (res.statusCode === 200) {
        var txId = reverse(new Buffer(json.data.txHash, 'hex')).toString('hex')
        callback(null, {
          id: txId
        })
      }
      else callback(json)
    }))
  })

  req.write(data)
  req.end()
}

function reverse (buf) {
  var rev = new Buffer(buf)
  Array.prototype.reverse.call(rev)
  return rev
}

module.exports = {
  withdraw: withdraw
}
