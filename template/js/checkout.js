import '#template/js/checkout'
import './custom-js/checkout'
/* BEE VIRAL*/
import ecomPassport from '@ecomplus/passport-client'
function initbvWidgetShared() {
    const router = window.storefrontApp && window.storefrontApp.router
    const addConfirmationBanner = ({name, params}) => { 
        if (name === "confirmation" && params.json) {
            let order
            const orderJson = decodeURIComponent(params.json)
            if (orderJson) {
                try {
                    order = JSON.parse(orderJson)
                } catch (e) {
                }
            }
            if (order) {
                const customer = ecomPassport.getCustomer()
                const customerName = `${customer.name.given_name} ${customer.name.family_name}`
                const $confirmDiv = document.querySelector('#confirmation')
                $confirmDiv.insertAdjacentHTML('afterbegin','<div width="10px" height="10px" id="app_cw_widget"></div>')
                var bvWidgetShared = new window.bvWidgetShared();
                bvWidgetShared.Init({
                    host: "https://account.beeviral.app",
                    element: "app_cw_widget",
                    campaign_token: "bW90eTc0ZEZyaE9vNVdaWjRAMGh2QT09",
                    name: customerName,
                    email: customer.main_email,
                    phone: "",
                    valorconversao: `${order.amount.total}`,
                    sendreferralrequest: "N",
                    content: "",
                    status: "Indicado",
                    contentsale: `{"ORDER_ID_ECOMPLUS":"${order._id}"}`
                });
            }
        }
    }
    if (router.currentRoute) {
      addConfirmationBanner(router.currentRoute)
    }
      router.afterEach(addConfirmationBanner)
}
function initializebvWidgetShared(i, t) {
  var e;
  i.getElementById(t) ? initbvWidgetShared() : ((
      e = i.createElement("script")).id = t
      , e.async = !0
      , e.src = "https://account.beeviral.app/Scripts/app/widget_sharing.js"
      , e.onload = initbvWidgetShared
      , i.head.appendChild(e))
}
function initiateCallbvWidgetShared() {
  initializebvWidgetShared(document, "bvWidgetShared-js-sdk")
}
window.addEventListener ? window.addEventListener("load", initiateCallbvWidgetShared, !1) : window.attachEvent("load", initiateCallbvWidgetShared, !1);

window.ecomPaymentApps = [1250, 111223, 1251, 108091]
