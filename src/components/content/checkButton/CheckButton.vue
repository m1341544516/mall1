<template>
  <div class="check-button">
    <div class="icon-selector" :class="{'selector-active': checked}">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      checked: this.isChecked
    };
  },
  methods: {
    
  },
  watch: {
    isChecked: function(newValue) {
      this.checked = newValue
    }
  }
}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    line-height: 18px;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>