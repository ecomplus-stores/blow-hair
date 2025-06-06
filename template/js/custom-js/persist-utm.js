const { sessionStorage, localStorage } = window
const storageKey = 'ecomUtm'

let isCurrentUtm
const utm = JSON.parse(sessionStorage.getItem(storageKey)) || {}
const persistentUtm = JSON.parse(localStorage.getItem(storageKey))
if (persistentUtm) {
  Object.assign(utm, persistentUtm)
}

const urlParams = new URLSearchParams(window.location.search)
;['source', 'medium', 'campaign', 'term', 'content'].forEach(utmParam => {
  if (utm.source === 'embaixadoras' && utmParam !== 'campaign') {
    return
  }
  const value = urlParams.get(`utm_${utmParam}`)
  if (typeof value === 'string') {
    utm[utmParam] = value
    isCurrentUtm = true
  }
})
if (urlParams.get('bid') || window.localStorage.getItem('buzzlead')) {
  utm.term = urlParams.get('bid') || window.localStorage.getItem('buzzlead')
  utm.content = 'buzzlead'
} else if (urlParams.get('bvid')) {
  utm.term = urlParams.get('bvid')
  utm.content = 'beeviral'
}

if (isCurrentUtm) {
  sessionStorage.setItem(storageKey, JSON.stringify(utm))
  if (utm.source === 'embaixadoras') {
    const { source, medium, term, content } = utm
    localStorage.setItem(storageKey, JSON.stringify({ source, medium, term, content }))
  }
}
if (urlParams.get('referral') && !sessionStorage.getItem('ecomReferral')) {
  sessionStorage.setItem('ecomReferral', urlParams.get('referral'))
}
const sessionCoupon = urlParams.get('coupon') || sessionStorage.getItem('st_discount_coupon')
if (sessionCoupon && !sessionStorage.getItem('st_discount_coupon')) {
  sessionStorage.setItem('st_discount_coupon', sessionCoupon)
}

export default utm

export { utm, sessionCoupon }
