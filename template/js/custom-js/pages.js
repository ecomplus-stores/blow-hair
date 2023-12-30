// Add your custom JavaScript for storefront pages here.
import EcomSearch from '@ecomplus/search-engine'
if (storefront && storefront.context && storefront.context.resource === 'products') {
  
}

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
if (window.location.pathname === '/') {
  EcomSearch.dslMiddlewares.push((dsl) => {
    dsl.query.bool.filter = [
      {
        term: {
          visible: true
        }
      },
      {
          "terms": {
              "categories.name": [
                  "comprar-agora"
              ]
          }
      }
    ]
  })
}