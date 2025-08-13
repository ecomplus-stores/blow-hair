// Add your custom JavaScript for checkout here.
var localFreebies = {}
if(sessionStorage.getItem('freebieData')){
    localFreebies = JSON.parse(sessionStorage.getItem('freebieData'))
}
$('body').on('click','.cart__btn-checkout', function(e){
    e.preventDefault();
    let block = false;
    
    $('.freebie-rule').each(function(){
      let freebieLength = $(this).find('.freebie-item').length
      let selectable = parseInt($(this).attr('selectable'));    
      let actives = $(this).find('.btn.active').length;
      console.log(actives)
      if(selectable > actives && freebieLength){
        block = true;
        $(this).prev('.freebie-rule-name').addClass('err_brinde');
        if(selectable > 1){
            $(this).prev('.freebie-rule-name').addClass('plural');
        }
      }else{
        $(this).prev('.freebie-rule-name').removeClass('err_brinde');
        $(this).prev('.freebie-rule-name').removeClass('plural');
      }
    });

    if(!block){
        window.location.href = $(this).attr('href');
    }
});

$('body').on('click', '.freebie-item button', function(oObj){
    $(this).closest('.freebie-rule').prev('.freebie-rule-name').removeClass('err_brinde');
    $(this).closest('.freebie-rule').prev('.freebie-rule-name').removeClass('plural');
    let item = $(oObj.target).closest('.freebie-item')
    let _id = item.attr('product_id')
    let offer = item.closest('.freebie-rule').attr('label')
    let campaign = item.closest('.freebie-rule').attr('rule')
    campaign = offer
    let selectable = item.closest('.freebie-rule').attr('selectable')
    let variant = item.find('select > option:selected').val()
    let id_save = _id
    
    if(variant !== undefined){
        id_save = _id + '|' + variant
    }
    

    let save = {
        _id : [id_save],
        offer : offer,
        selectable : selectable        
    }
    
    //console.log(localFreebies.filter(el => el.offer == offer))

    if($(this).hasClass('active')){
        if(typeof localFreebies[campaign] !== "undefined"){
            localFreebies[campaign]._id = localFreebies[campaign]._id.filter(el => el != id_save);
        }
        $(oObj.target).removeClass('active');
        $(oObj.target).text('Selecionar');  
        // window.removeFreebie(_id.slice(0,20) + '000f')
        window.removeFreebie(_id)
    }else{
        if(typeof localFreebies[campaign] !== "undefined"){
            if(!localFreebies[campaign]._id.find(el => el === id_save)){
                if(parseInt(localFreebies[campaign].selectable) <= localFreebies[campaign]._id.length){
                    alert('A quantidade máxima de brindes para a campanha escolhida já foi atingida');
                    return false;
                }else{
                    localFreebies[campaign]._id.push(id_save);
                    $(oObj.target).addClass('active');
                    $(oObj.target).text('Selecionado');
                }
            }        
        }else{
            localFreebies[campaign] = save;
            $(oObj.target).addClass('active');
            $(oObj.target).text('Selecionado');
        }
        
    }
    sessionStorage.setItem('freebieData', JSON.stringify(localFreebies))    

    setTimeout(() => {window.frontFetchFreebies();}, 1000);
    
})

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
// Grid de avaliações no checkout
const reviewsDiv = document.createElement('div');
reviewsDiv.className = 'sk-ww-google-reviews';
reviewsDiv.setAttribute('data-embed-id', '25587705');
document.body.appendChild(reviewsDiv); // ou escolha um container específico

// Adiciona dinamicamente o script SociableKIT
const script = document.createElement('script');
script.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
script.defer = true;
document.body.appendChild(script);
