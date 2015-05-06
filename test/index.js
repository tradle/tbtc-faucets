var test = require('tape')
var faucets = require('../')

test('withdraw from each faucet', function(t) {
  var names = Object.keys(faucets)
  t.plan(names.length)

  names.forEach(function(name) {
    faucets[name].withdraw('mpjuaPusdVC5cKvVYCFX94bJX1SNUY8EJo', 1000, function(err, data) {
      if (err) throw err

      t.ok(data.id)
    })
  })
})
