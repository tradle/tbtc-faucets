var test = require('tape')
var faucets = require('../')

test('withdraw from each faucet', function(t) {
  t.plan(Object.keys(faucets).length)

  for (var faucet in faucets) {
    (function() {
      faucets[faucet].withdraw('mpjuaPusdVC5cKvVYCFX94bJX1SNUY8EJo', 1000, function(err, data) {
        if (err) throw err

        t.ok(data.id)
      })
    })()
  }
})
