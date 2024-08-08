const { localStorage } = window
const storageKey = 'ecomUtm'

let isCurrentUtm
const utm = JSON.parse(localStorage.getItem(storageKey)) || {}

if (utm_source != embaixadoras) {
  const urlParams = new URLSearchParams(window.location.search)
  ;['source', 'medium', 'campaign', 'term', 'content'].forEach(utmParam => {
    const value = urlParams.get(`utm_${utmParam}`)
    if (typeof value === 'string') {
      utm[utmParam] = value
      isCurrentUtm = true
    }
  })
}

if (isCurrentUtm) {
  localStorage.setItem(storageKey, JSON.stringify(utm))
}
if (urlParams.get('referral') && !localStorage.getItem('ecomReferral')) {
  localStorage.setItem('ecomReferral', urlParams.get('referral'))
}
if (urlParams.get('coupon') && !localStorage.getItem('st_discount_coupon')) {
  localStorage.setItem('st_discount_coupon', urlParams.get('coupon'))
}

export default utm
