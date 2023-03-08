// Add your custom JavaScript for storefront pages here.

if (storefront && storefront.context && storefront.context.resource === 'products') {
  ecomCart.on('addItem', () => { 
    window.location = '/app/#/cart/' 
  })
}

// comente a linha abaixo para buscar regras de frete grátis
window.modulesToFetch = [{ endpoint: 'list_payments' }]

$(document).ready(function(){
  $('#apx_form').closest('.custom-html').toggleClass('my-4 my-0');
  $('#apx_form').closest('.custom-html').toggleClass('my-lg-5 my-lg-0');
});

$('#apx_form').submit(function(e){
  e.preventDefault();
  let name = $('#conversion-form-am-formulario-de-newsletter [name="name"]').val().length > 0 ? $('#conversion-form-am-formulario-de-newsletter [name="name"]').val() : 'Visitante';
  $('#conversion-form-am-formulario-de-newsletter [name="name"]').val(name);
  $('#conversion-form-am-formulario-de-newsletter [name="email"]').val($(this).find('[name="mail"]').val());
  $('#conversion-form-am-formulario-de-newsletter').submit();
});
