<template>
  <div class="custom-cart-item">
    <cart-item
      v-bind="$props"
      v-on="$listeners"
    />
    <freebie-countdown
      v-if="item"
      :product="item"
      :deadline="endDate"
    />
  </div>
</template>

<script>
import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'
import FreebieCountdown from './FreebieCountdown.vue'

export default {
  name: 'CustomCartItem',
  components: {
    CartItem,
    FreebieCountdown
  },
  extends: CartItem,
  data() {
    return {
      endDate: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
    }
  }
}
</script>

<style scoped>
.custom-cart-item {
  position: relative;
}
</style> 