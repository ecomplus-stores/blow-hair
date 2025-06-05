<template>
  <article class="summary">
    <h5 class="summary__title">
      {{ i19summary }}
    </h5>
  
    <slot name="list">
      <div
        v-if="items"
        class="summary__list"
      >
        <div
          class="summary__item"
          v-for="item in filteredItems"
          :key="item._id"
        >
          <a-picture
            v-if="getImg(item)"
            :src="(item.picture && item.picture.normal && item.picture.normal.url) || getImg(item).url"
            :alt="getImg(item).alt || item.name"
          />
  
          <div>
            <span class="badge badge-secondary">
              {{ item.quantity }}
            </span>
            <template v-if="Array.isArray(item.flags) && item.flags.includes('freebie')">
              <s>{{ formatMoney(getPrice(item)) }}</s>
              <small class="text-muted">
                <i class="i-gift ml-2 mr-1"></i>
                {{ i19freebie }}
              </small>
              <freebie-countdown
                :product="item"
                :deadline="endDate"
              />
            </template>
            <template v-else>
              {{ formatMoney(getPrice(item)) }}
            </template>
            <br>
  
            <a-link
              v-if="item.slug"
              :href="`/${item.slug}`"
              target="_blank"
            >
              <small>{{ getName(item) }}</small>
            </a-link>
            <small v-else>
              {{ getName(item) }}
            </small>
            <item-customizations :item="item"/>
          </div>
        </div>
      </div>
    </slot>
  
    <slot name="more-offers"/>

    <strong id="blow-coins-product" style="font-size: 15px; display: flex; width: 100%; justify-content: center;">
      COMPRE E GANHE ATÉ {{ formatMoney((fixedPrice - amount.freight) / 33.33) }} DE CASHBACK
    </strong>
  
    <slot name="amount">
      <div class="summary__amount">
        <div
          class="summary__amount__row"
          :data-subtotal="amount.subtotal.toFixed(2)"
        >
          <span>{{ i19subtotal }}</span>
          <div>{{ formatMoney(amount.subtotal) }}</div>
        </div>
  
        <div
          class="summary__amount__row"
          :data-freight="amount.freight.toFixed(2)"
        >
          <span>
            {{ i19freight }}
            <small v-if="shippingAddress">
              {{ shippingAddress.street }}
              <template v-if="shippingAddress.number">
                {{ shippingAddress.number }}
              </template>
              {{ shippingAddress.city }}
              {{ shippingAddress.province_code }}
            </small>
          </span>
          <div>{{ formatMoney(amount.freight) }}</div>
        </div>
  
        <div
          v-if="amount.discount > 1"
          class="summary__amount__row discount"
          :data-discount="amount.discount.toFixed(2)"
        >
          <span>{{ i19discount }} <b>({{ Math.round((amount.discount / amount.subtotal) * 100) }}%)</b></span>
          <div>{{ formatMoney(amount.discount) }}</div>
        </div>
        <div
          v-if="amount.balance"
          class="summary__amount__row"
          :data-balance="amount.balance.toFixed(2)"
        >
          <span>{{ i19balanceOrPoints }}</span>
          <div>{{ formatMoney(amount.balance) }}</div>
        </div>
  
        <div
          v-if="paidInAdvance > 0"
          class="summary__amount__row"
        >
          <span>{{ i19total }}</span>
          <div>{{ formatMoney(amount.total) }}</div>
        </div>
  
        <slot name="amount-custom"/>
  
        <div
          class="summary__amount__row summary__amount__row--total"
          :data-total="amountToPay.toFixed(2)"
        >
          <span>{{ paidInAdvance ? i19toPay : i19total }}</span>
          <a-prices
            :product="{ price: amountToPay }"
            :discount-option="{ value: amount.discount }"
            :is-literal="true"
            :is-amount-total="true"
            @fix-price="price => fixedPrice = price"
            :can-show-price-options="canShowPriceOptions"
          />
        </div>
      </div>
    </slot>
  
    <slot/>
  
    <slot name="buyer">
      <div
        v-if="buyer"
        class="summary__buyer"
      >
        <h5>{{ i19buyer }}</h5>
        <p>
          {{ buyerName }}
          <br>
          <small>{{ i19docNumber }}:</small>
          <span>{{ buyer.doc_number }}</span>
          <br>
          <small>{{ i19contactPhone }}:</small>
          <span>{{ buyerPhone }}</span>
          <br>
          <small>{{ buyer.main_email }}</small>
        </p>
  
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="$emit('click:account')"
        >
          <i class="i-pencil mr-1"></i>
          {{ i19myAccount }}
        </button>
      </div>
    </slot>
  </article>
</template>

<script>
import {
  i19balanceOrPoints,
  i19buyer,
  i19contactPhone,
  i19discount,
  i19docNumber,
  i19freebie,
  i19freight,
  i19myAccount,
  i19subtotal,
  i19summary,
  i19toPay,
  i19total
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  price as getPrice,
  img as getImg,
  phone as getPhone,
  formatMoney
} from '@ecomplus/utils'

import ALink from '@ecomplus/storefront-components/src/ALink.vue'
import APicture from '@ecomplus/storefront-components/src/APicture.vue'
import APrices from '@ecomplus/storefront-components/src/APrices.vue'
import ItemCustomizations from '@ecomplus/storefront-components/src/ItemCustomizations.vue'
import FreebieCountdown from './FreebieCountdown.vue'

export default {
  name: 'CustomEcSummary',

  components: {
    ALink,
    APicture,
    APrices,
    ItemCustomizations,
    FreebieCountdown
  },

  props: {
    amount: {
      type: Object,
      required: true
    },
    items: Array,
    buyer: Object,
    shippingAddress: Object,
    canShowPriceOptions: Boolean,
    paidInAdvance: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      fixedPrice: null,
      endDate: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
    }
  },

  computed: {
    i19balanceOrPoints: () => i18n(i19balanceOrPoints),
    i19buyer: () => i18n(i19buyer),
    i19contactPhone: () => i18n(i19contactPhone),
    i19discount: () => i18n(i19discount),
    i19docNumber: () => i18n(i19docNumber),
    i19freebie: () => i18n(i19freebie),
    i19freight: () => i18n(i19freight),
    i19myAccount: () => i18n(i19myAccount),
    i19subtotal: () => i18n(i19subtotal),
    i19summary: () => i18n(i19summary),
    i19toPay: () => i18n(i19toPay),
    i19total: () => i18n(i19total),

    amountToPay () {
      return this.amount.total - this.paidInAdvance
    },

    buyerName () {
      if (!this.buyer || !this.buyer.name) {
        return ''
      }
      const { name } = this.buyer
      return `${name.given_name} ${(name.middle_name || '')} ${name.family_name}`
    },

    buyerPhone () {
      return getPhone(this.buyer)
    },

    filteredItems() {
      return this.items ? this.items.filter(item => item.quantity > 0) : []
    }
  },

  methods: {
    getName,
    getPrice,
    formatMoney,
    getImg: item => getImg(item, null, 'tiny')
  }
}
</script>

<style scoped>
.summary__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.summary__item picture {
  width: 60px;
  height: 60px;
  min-width: 60px;
  margin-right: 12px;
  display: block;
}

.summary__item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
</style> 