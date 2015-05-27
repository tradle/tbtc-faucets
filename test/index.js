var test = require('tape')
var faucets = require('../')

test('withdraw from each faucet', function(t) {
  var names = Object.keys(faucets)
  t.plan(names.length)

  names.forEach(function(name) {
    var faucet = faucets[name]
    if (name === 'BlockCypher') return t.pass('skipping BlockCypher, need auth token')

    faucet.withdraw('mpjuaPusdVC5cKvVYCFX94bJX1SNUY8EJo', 1000, function(err, data) {
      if (err) throw err

      t.ok(data.id)
    })
  })
})
