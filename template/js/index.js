import '#template/js/'
import './custom-js/pages'
import lozad from 'lozad'

async function loadAsync () {
  if (typeof window.setupRd === 'function') {
    const observer = lozad(document.getElementById('am-formulario-de-newsletter-b61733cf81abef42e0c4'), {
      rootMargin: '350px 0px',
      threshold: 0,
      load () {
        const script = document.createElement('script')
        script.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js'
        script.id = 'hs-script-loader'
        script.async = true
        script.onload = window.setupRd
        document.getElementById('am-formulario-de-newsletter-b61733cf81abef42e0c4').appendChild(script)
      }
    })
    observer.observe()
  }

  lozad(document.getElementById('popup-rd'), {
    rootMargin: '350px 0px',
    threshold: 0,
    load () {
      const script = document.createElement('script')
      script.src = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/0541136d-12e0-496c-9058-0def4b5ad0d4-loader.js'
      script.id = 'rd-popup'
      script.async = true
      document.getElementById('popup-rd').appendChild(script)
    }
  }).observe()

  lozad('.lightwidget-widget', {
    rootMargin: '350px 0px',
    threshold: 0,
    load () {
      const src = 'https://cdn.lightwidget.com/widgets/lightwidget.js'
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        document.body.appendChild(script)
      }
    }
  }).observe()
}
loadAsync()

window.__customGTMVariantRegex = /\s[^\s]+( zero a[ç|c][ú|u]car)?$/i
