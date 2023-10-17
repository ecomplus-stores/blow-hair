import '#template/js/'
import './custom-js/pages'

window.__customGTMVariantRegex = /\s[^\s]+( zero a[ç|c][ú|u]car)?$/i

const loadVendaValida = () => {
    const script = document.createElement('script')
    script.src = '//collect.vendavalida.com.br/push.js'
    script.id = 'venda-valida'
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
}

function loadMailbiz() {
    (function(m, a, i, l, b, z, j, s) {
        m['MailbizIntegration'] = {
          id: b,
          ready: 0
        };
        z = a.createElement(i);
        j = a.getElementsByTagName(i)[0];
        z.async = 1;
        z.src = l;
        j.parentNode.insertBefore(z, j);
      })(window, document, 'script', 'https://d3eq1zq78ux3cv.cloudfront.net/static/scripts/integration.min.js', '63a0a5f3a8aebb115f90b412');
}

function loadBeeviral () {
    !function (f, b, e, v, n, t, s) {
        t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        t.onload = function () {
            beeviralTracking.Send({
                token: "aipOcmlMVDhGTVZxcExVMFVJKkZKdGQwVkdYanNzRDlFWlRpVTdrQmxGRzhSS0xGclFQbjlJSlRLekxrekpqQA=="
            }, false, true);
        };
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://account.beeviral.app/Scripts/app/tracking.js');
}

  $(window).one('scroll', () => {
    loadVendaValida()
    loadMailbiz()
    if (window.location.pathname === '/') {
        loadBeeviral()
    }
  })
