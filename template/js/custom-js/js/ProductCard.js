import {
    i19addToFavorites,
    i19buy,
    i19connectionErrorProductMsg,
    i19outOfStock,
    i19unavailable
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    name as getName,
    inStock as checkInStock,
    onPromotion as checkOnPromotion,
    price as getPrice,
    specTextValue as getSpecTextValue
  } from '@ecomplus/utils'
  
  import Vue from 'vue'
  import { store } from '@ecomplus/client'
  import ecomCart from '@ecomplus/shopping-cart'
  import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
  import ALink from '@ecomplus/storefront-components/src/ALink.vue'
  import APicture from '@ecomplus/storefront-components/src/APicture.vue'
  import APrices from '@ecomplus/storefront-components/src/APrices.vue'
  //import ProductVariations from '@ecomplus/storefront-components/src/ProductVariations.vue'
  import ecomPassport from '@ecomplus/passport-client'
  import { toggleFavorite, checkFavorite } from '@ecomplus/storefront-components/src/js/helpers/favorite-products'
  import Countdown from '../components/Countdown.vue'
  
  const getExternalHtml = (varName, product) => {
    if (typeof window === 'object') {
      varName = `productCard${varName}Html`
      const html = typeof window[varName] === 'function'
        ? window[varName](product)
        : window[varName]
      if (typeof html === 'string') {
        return html
      }
    }
    return undefined
  }

  let interval = null;
  
  export default {
    name: 'ProductCard',
  
    components: {
      AAlert,
      ALink,
      APicture,
      APrices,
      Countdown,
      //ProductVariations
    },
  
    props: {
      product: Object,
      productId: String,
      isSmall: Boolean,
      headingTag: {
        type: String,
        default: 'h3'
      },
      buyText: String,
      transitionClass: {
        type: String,
        default: 'animated fadeIn'
      },
      canAddToCart: {
        type: Boolean,
        default: true
      },
      ecomPassport: {
        type: Object,
        default () {
          return ecomPassport
        }
      },
      accountUrl: {
        type: String,
        default: '/app/#/account/'
      },
      isLoaded: Boolean,
      installmentsOption: Object,
      discountOption: Object
    },
  
    data () {
      return {
        body: {},
        isLoading: false,
        isWaitingBuy: false,
        isHovered: false,
        isFavorite: false,
        error: '',
        selectedVariationId: '',
        endDate: '2023-02-03T13:59:59.000Z',
        now: new Date().getTime(),
      }
    },
  
    computed: {
      i19addToFavorites: () => i18n(i19addToFavorites),
      i19outOfStock: () => i18n(i19outOfStock),
      i19unavailable: () => i18n(i19unavailable),
      i19uponRequest: () => 'Sob consulta',
  
      isWithoutPrice () {
        return !getPrice(this.body)
      },
      
  
      ratingHtml () {
        return getExternalHtml('Rating', this.body)
      },

      isPromo () {
        const endDate = new Date(this.endDate).getTime()
        return endDate > this.now
      },
  
      buyHtml () {
        return getExternalHtml('Buy', this.body)
      },
  
      footerHtml () {
        return getExternalHtml('Footer', this.body)
      },
  
      name () {
        return getName(this.body)
      },

      endDateT () {
        let promoDates = this.product.price_effective_date
        if (promoDates) {
            let now = new Date()
            if (promoDates.end) {
                if (new Date(promoDates.end) > now) {
                return new Date(promoDates.end)
                }
            } else if(promoDates.start) {
                if (new Date(promoDates.start) > now) {
                return new Date(promoDates.start)
                }
            }
        }
    },
  
      strBuy () {
        return this.buyText ||
          (typeof window === 'object' && window.productCardBuyText) ||
          i18n(i19buy)
      },
  
      isInStock () {
        return checkInStock(this.body)
      },
  
      isActive () {
        return this.body.available && this.body.visible && this.isInStock
      },
  
      isLogged () {
        return ecomPassport.checkAuthorization()
      },
  
      discount () {
        const { body } = this
        return checkOnPromotion(body)
          ? Math.round(((body.base_price - getPrice(body)) * 100) / body.base_price)
          : 0
      }
    },
  
    methods: {
      setBody (data) {
        this.body = Object.assign({}, data)
        delete this.body.body_html
        delete this.body.body_text
        delete this.body.inventory_records
        delete this.body.price_change_records
        this.isFavorite = checkFavorite(this.body._id, this.ecomPassport)
      },

      showVariationPicture (variation) {
        if (variation.picture_id) {
          const pictureIndex = this.body.pictures.findIndex(({ _id }) => {
            return _id === variation.picture_id
          })
          this.currentGalleyImg = pictureIndex + 1
        }
      },

      handleGridOption ({ gridId, gridIndex, optionText }) {
        if (gridIndex === 0) {
          const variation = this.body.variations.find(variation => {
            return getSpecTextValue(variation, gridId) === optionText
          })
          if (variation) {
            this.showVariationPicture(variation)
          }
        }
      },
  
      fetchItem () {
        if (this.productId) {
          this.isLoading = true
          store({ url: `/products/${this.productId}.json` })
            .then(({ data }) => {
              this.$emit('update:product', data)
              this.setBody(data)
              this.$emit('update:is-loaded', true)
            })
            .catch(err => {
              console.error(err)
              if (!this.body.name || !this.body.slug || !this.body.pictures) {
                this.error = i18n(i19connectionErrorProductMsg)
              }
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      },
  
      toggleFavorite () {
        if (this.isLogged) {
          this.isFavorite = toggleFavorite(this.body._id, this.ecomPassport)
        }
      },
  
      /* buy () {
        const product = this.body
        if (product.variations && product.variations.length && !this.selectedVariationId) {
            this.canAddToCart = false
        }
        const variationId = this.selectedVariationId
        this.$emit('buy', { product, variationId })
        if (this.canAddToCart) {
          this.isWaitingBuy = true
          store({ url: `/products/${product._id}.json` })
            .then(({ data }) => {
              const selectFields = ['variations', 'customizations', 'kit_composition']
              for (let i = 0; i < selectFields.length; i++) {
                const selectOptions = data[selectFields[i]]
                if (selectOptions && selectOptions.length) {
                  return import('@ecomplus/storefront-components/src/ProductQuickview.vue')
                    .then(quickview => {
                      new Vue({
                        render: h => h(quickview.default, {
                          props: {
                            product: data
                          }
                        })
                      }).$mount(this.$refs.quickview)
                    })
                }
              }
              const { quantity, price } = data
              ecomCart.addProduct({ ...product, quantity, price }, variationId)
            })
            .catch(err => {
              console.error(err)
              window.location = `/${product.slug}`
            })
            .finally(() => {
              this.isWaitingBuy = false
            })
        }
      } */

      buy () {
        const product = this.body
        this.$emit('buy', { product })
        if (this.canAddToCart) {
          this.isWaitingBuy = true
          store({ url: `/products/${product._id}.json` })
            .then(({ data }) => {
              const selectFields = ['variations', 'customizations', 'kit_composition']
              for (let i = 0; i < selectFields.length; i++) {
                const selectOptions = data[selectFields[i]]
                if (selectOptions && selectOptions.length) {
                  return import('@ecomplus/storefront-components/src/ProductQuickview.vue')
                    .then(quickview => {
                      new Vue({
                        render: h => h(quickview.default, {
                          props: {
                            product: data
                          }
                        })
                      }).$mount(this.$refs.quickview)
                    })
                }
              }
              const { quantity, price } = data
              ecomCart.addProduct({ ...product, quantity, price })
            })
            .catch(err => {
              console.error(err)
              window.location = `/${product.slug}`
            })
            .finally(() => {
              this.isWaitingBuy = false
            })
        }
      }
    },
  
    created () {
      if (this.product) {
        this.setBody(this.product)
        if (this.product.available === undefined) {
          this.body.available = true
        }
        if (this.product.visible === undefined) {
          this.body.visible = true
        }
      }
      if (!this.isLoaded) {
        this.fetchItem()
      }
      if (this.isPromo) {
        interval = setInterval(() => {
          this.now = new Date().getTime();
        }, 1000);
      }
    }
  }
  