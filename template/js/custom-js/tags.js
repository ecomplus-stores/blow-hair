import lozad from 'lozad'

const requestIdleCallback = (fn, fallbackMs = 300) => {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn)
  } else {
    setTimeout(fn, fallbackMs)
  }
}

const addScript = (src, onLoad) => {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    if (onLoad) {
      script.onload = onLoad
    }
    document.body.appendChild(script)
  }
}

const onFirstScroll = function () {
  requestIdleCallback(() => {
    /* eslint-disable */

    // Mailchimp
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/968db0f265c7f5d743fc60a6a/a5bc8e4c0d80694b176da8a6b.js");

    // RDStation
    addScript('https://d335luupugsy2.cloudfront.net/js/loader-scripts/0541136d-12e0-496c-9058-0def4b5ad0d4-loader.js')

    /* eslint-enable */
  })
  window.removeEventListener('scroll', onFirstScroll, false)
}

requestIdleCallback(() => {
  window.addEventListener('scroll', onFirstScroll, false)

  lozad('.lightwidget-widget', {
    rootMargin: '350px 0px',
    threshold: 0,
    load () {
      addScript('https://cdn.lightwidget.com/widgets/lightwidget.js')
    }
  }).observe()

  lozad('#am-formulario-de-newsletter-b61733cf81abef42e0c4', {
    rootMargin: '150px 0px',
    threshold: 0,
    load () {
      const src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js'
      addScript(src, () => {
        /* eslint-disable */
        new RDStationForms('am-formulario-de-newsletter-b61733cf81abef42e0c4', 'UA-114913832-1').createForm()
        /* eslint-enable */
      })
    }
  }).observe()
})
