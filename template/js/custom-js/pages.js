// Add your custom JavaScript for storefront pages here.
import EcomSearch from '@ecomplus/search-engine'
import { isMobile } from '@ecomplus/storefront-twbs'

  /* if (storefront && storefront.context && storefront.context.resource === 'products') {
    const pageProduct = storefront.context.body
    dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        items: [{
          item_name: pageProduct.name, // Name or ID is required.
          item_id: pageProduct.sku,
          price: pageProduct.price,
          item_brand: "Blow Gummies",
          item_category: "Comprar Agora",
          quantity: pageProduct.quantity
        }]
      }
    });

  } */

// comente a linha abaixo para buscar regras de frete grátis
window.modulesToFetch = [{ endpoint: 'list_payments' }]

$(document).ready(function(){
  $('#apx_form').closest('.custom-html').toggleClass('my-4 my-0');
  $('#apx_form').closest('.custom-html').toggleClass('my-lg-5 my-lg-0');
});

$('#apx_form').submit(function(e){
  e.preventDefault();
  $('#conversion-form-am-formulario-de-newsletter [name="email"]').val($(this).find('[name="mail"]').val());
  $('#conversion-form-am-formulario-de-newsletter').submit();
});


const paramsURL = new URLSearchParams(window.location.search)
const bvId = paramsURL.get('bvid')
let bid = paramsURL.get('bid')
console.log('id beeviral', bvId, bid)
if (!bid && window.localStorage.getItem('buzzlead')) {
  bid = window.localStorage.getItem('buzzlead')
}
if (bvId) {
  const sessionUtm = JSON.parse(window.sessionStorage.getItem('ecomUtm') || '{}') 
  sessionUtm.term = bvId
  sessionUtm.content = 'beeviral'
  window.sessionStorage.setItem('ecomUtm', JSON.stringify(sessionUtm))
}

if (bid) {
    const sessionUtm = JSON.parse(window.sessionStorage.getItem('ecomUtm') || '{}') 
    sessionUtm.term = bid
    sessionUtm.content = 'buzzlead'
    window.sessionStorage.setItem('ecomUtm', JSON.stringify(sessionUtm))
    window.localStorage.setItem('buzzlead', bid)
}

const toggleButton = document.getElementById('mgnr_search-trigger');
toggleButton.addEventListener('click', () => {
  const instantSearchComponent = document.querySelector('[name="InstantSearch"]');
  if (instantSearchComponent) {
    instantSearchComponent.__vue__.toggleVisibility(); // Chama o método do componente Vue
  }
});

if (!isMobile) {
  setInterval(() => {
    if ($('#mgnr_search-trigger.collapsed') && $('#mgnr_search-trigger.collapsed').length && !document.getElementById('search-bar').classList.contains('show')) {
      document.getElementById('search-bar').classList.add('show')
    }
    $('#mgnr_search-trigger.collapsed')
  }, 1000)
}


$('.faq_list button').click(function(){
  $(this).closest('.faq_list-item').toggleClass('visible')
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});