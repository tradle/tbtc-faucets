# Withdraw from testnet faucets

## Usage

```js
var faucets = require('tbtc-faucets')
faucets.RoyalForkBlog.withdraw('mpjuaPusdVC5cKvVYCFX94bJX1SNUY8EJo', 10000, function(err) {
  if (!err) console.log('Withdrew funds successfully')
})
```
