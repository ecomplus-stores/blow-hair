// storefront.webpack.js

const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/html/APrices.html'),
      './html/AccountPoints.html': path.resolve(__dirname, 'template/js/custom-js/html/AccountPoints.html'),
      './html/DiscountApplier.html': path.resolve(__dirname, 'template/js/custom-js/html/DiscountApplier.html'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/js/DiscountApplier.js')
    }
  }
})
