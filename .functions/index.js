const functions = require('firebase-functions')

const { ssr } = require('@ecomplus/storefront-renderer/functions/')

process.env.STOREFRONT_LONG_CACHE = 'true'
process.env.STOREFRONT_ASSETS = 'https://s1-blowhair.b-cdn.net'

exports.ssr = functions.https.onRequest((req, res) => ssr(req, res))
