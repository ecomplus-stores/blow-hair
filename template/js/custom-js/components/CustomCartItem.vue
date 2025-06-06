<template>
  <div>
    <cart-item
      v-bind="$props"
      v-on="$listeners"
    />
    <freebie-countdown :item="item" />
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
  extends: CartItem
}
</script>