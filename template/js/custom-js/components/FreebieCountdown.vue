<template>
  <div class="freebie-countdown" v-if="isFreebie">
    <span class="countdown-label">Brinde por tempo limitado:</span>
    <div class="countdown-timer">
      <span class="countdown-item">{{ twoDigits(hours) }}</span>:
      <span class="countdown-item">{{ twoDigits(minutes) }}</span>:
      <span class="countdown-item">{{ twoDigits(seconds) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreebieCountdown',
  props: {
    product: Object
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      date: null,
      diff: 0,
      interval: null
    }
  },
  computed: {
    isFreebie() {
      return Array.isArray(this.product.flags) && this.product.flags.includes('freebie')
    },
    seconds() { return Math.trunc(this.diff) % 60 },
    minutes() { return Math.trunc(this.diff / 60) % 60 },
    hours() { return Math.trunc(this.diff / 60 / 60) % 24 },
    // Calculate the next half-hour mark from now
    nextHalfHour() {
      const now = new Date();
      let next = new Date(now);
      if (now.getMinutes() < 30) {
        next.setMinutes(30, 0, 0);
      } else {
        next.setHours(now.getHours() + 1, 0, 0, 0);
      }
      return next;
    }
  },
  methods: {
    twoDigits(value) {
      value = Number(value)
      return value < 10 ? '0' + value : value.toString()
    },
    updateDiff() {
      this.date = Math.trunc(this.nextHalfHour.getTime() / 1000);
      this.diff = this.date - this.now;
      if (this.diff < 0) this.diff = 0;
    }
  },
  created() {
    this.updateDiff();
    this.interval = setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
      this.updateDiff();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
.freebie-countdown {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  font-size: 0.9em;
}
.countdown-label {
  margin-right: 4px;
  color: #666;
}
.countdown-timer {
  display: inline-flex;
  align-items: center;
}
.countdown-item {
  background: #f8f9fa;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
  color: #dc3545;
}
</style> 