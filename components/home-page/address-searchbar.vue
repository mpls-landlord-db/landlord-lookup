<template>
  <form class="address-searchbar" @submit.prevent="$listeners.submit" @keydown.down.prevent="shiftFocus('next')" @keydown.up.prevent="shiftFocus('prev')">
    <div class="g-input" >
      <label for="asb-input" class="g-input__label">{{label}}</label>
      <input
        ref="input"
        type="text"
        id="asb-input"
        class="g-input__input"
        autocomplete="off"
        :value="value"
        @input="fetchAddressMatches"
      >
    </div>
    <template v-if="addressMatches.length">
      <ul class="address-matches" ref="results">
        <template v-for="(x, i) in addressMatches">
          <li :key="i" class="address-matches__item">
            <button class="g-btn text block focusable" style="text-align:left;" @click="selectAddress(x.address)">{{x.address}}</button>
          </li>
        </template>
      </ul>
    </template>
  </form>
</template>

<script>
import { makeDebouncer } from '@/util'
import * as api from '@/services/api'
const debouncer = makeDebouncer()
export default {
  props: {
    label: String,
    value: String,
  },
  data() {
    return {
      addressMatches: [],
      errorMessage: ''
    }
  },
  methods: {
    fetchAddressMatches(e) {
      this.errorMessage = ''
      const search = e.target.value.trim()
      this.$emit('input', search)
      debouncer.debounce(400, async () => {
        try {
          if (search) {
            const res = await api.fetchAddressList({ q: search })
            this.addressMatches = res.data
          } else {
            this.addressMatches = []
          }
        } catch (error) {
          this.errorMessage = error.message
        }
      })
    },
    selectAddress(addr) {
      this.$emit('input', addr)
      this.$emit('searchWith', addr)
      this.addressMatches = []
    },
    shiftFocus(direction) {
      const input = this.$refs.input
      const focusedResult = this.$refs.results.querySelector('.focusable:focus')
      if (focusedResult) {
        if (direction === 'next') {
          try {
            focusedResult.parentElement.nextSibling.firstChild.focus()
          } catch (error) { }
        } else if (direction === 'prev') {
          try {
            focusedResult.parentElement.previousSibling.firstChild.focus()
          } catch (error) {
            input.focus()
          }
        }
      } else {
        this.$refs.results.querySelector('.focusable').focus()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.address-searchbar {
  width: 300px;
}
.address-matches {
  width: 100%;
  margin-top: 2px;
  border: none;
  border-top: none;
  border-radius: 4px;
  box-shadow: 1px 1px 4px #aaa;
  max-height: 300px;
  overflow: scroll;

}
.focusable:focus {
  background-color: #467c7e;
  color: aliceblue;
}
</style>