<template>
  <div class="freebie-countdown" v-if="isFreebie && diff > 0 && show">
    <span class="pl-3 countdown-label"><strong>SEU BRINDE EXPIRA EM:</strong></span>
    <div class="countdown-timer">
      <span class="countdown-item"><strong>{{ twoDigits(hours) }}</strong></span>:
      <span class="countdown-item"><strong>{{ twoDigits(minutes) }}</strong></span>:
      <span class="countdown-item"><strong>{{ twoDigits(seconds) }}</strong></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreebieCountdown',
  props: {
    item: Object
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
      return Array.isArray(this.item.flags) && this.item.flags.includes('freebie')
    },
    seconds() { return Math.trunc(this.diff) % 60 },
    minutes() { return Math.trunc(this.diff / 60) % 60 },
    hours() { return Math.trunc(this.diff / 60 / 60) % 24 },
    nextInterval() {
      const intervalMinutes = window.COUNTDOWN_INTERVAL_MINUTES || 60;
      if (!intervalMinutes) return null;
      const now = new Date();
      let next = new Date(now);
      const currentMinutes = now.getMinutes();
      const nextMark = Math.ceil(currentMinutes / intervalMinutes) * intervalMinutes;
      if (nextMark === 60) {
        next.setHours(now.getHours() + 1, 0, 0, 0);
      } else {
        next.setMinutes(nextMark, 0, 0);
      }
      return next;
    },
    show() {
      const routerName = window.storefrontApp 
        && window.storefrontApp.router 
        && window.storefrontApp.router.currentRoute 
        && window.storefrontApp.router.currentRoute.name;
      return routerName !== 'order' && routerName !== 'confirmation';
    }
  },
  methods: {
    twoDigits(value) {
      value = Number(value)
      return value < 10 ? '0' + value : value.toString()
    },
    updateDiff() {
      if (!this.nextInterval) return;
      this.date = Math.trunc(this.nextInterval.getTime() / 1000);
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

<style>
.freebie-countdown {
  display: flex;
  align-items: center;
  font-size: 0.9em;
  background-color: #f21877;
  border-radius: 10px;
  padding: 10px;
}
.countdown-label {
  margin-right: 4px;
  color: #fef200;
}
.countdown-timer {
  display: inline-flex;
  align-items: center;
}
.countdown-item {
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
  color: #FFF;
}
</style>
