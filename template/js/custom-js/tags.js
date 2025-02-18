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

let firstScrollTimer
const onFirstScroll = function () {
  requestIdleCallback(() => {
    /* eslint-disable */

    // Mailchimp
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/968db0f265c7f5d743fc60a6a/a5bc8e4c0d80694b176da8a6b.js");

    // Mailchimp
    addScript('https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js', () => {
      (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);
      $('.apx_form form').submit(function (e) {
        e.preventDefault()
        $('#mce-EMAIL').val($(this).find('[name="mail"]').val()).trigger('change')
        $('#mc-embedded-subscribe').click()
      });
    })

    /* eslint-enable */
  })
  window.removeEventListener('scroll', onFirstScroll, false)
  if (firstScrollTimer) clearTimeout(firstScrollTimer)
}

requestIdleCallback(() => {
  window.addEventListener('scroll', onFirstScroll, false)
  firstScrollTimer = setTimeout(onFirstScroll, 3000)

  lozad('.lightwidget-widget', {
    rootMargin: '350px 0px',
    threshold: 0,
    load () {
      addScript('https://cdn.lightwidget.com/widgets/lightwidget.js')
    }
  }).observe()
})
