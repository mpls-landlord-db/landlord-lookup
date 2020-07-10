<template>
  <form
    class="address-searchbar"
    @submit.prevent="$listeners.submit"
    @keydown.down.prevent="incrementOptionIndex(1)"
    @keydown.up.prevent="incrementOptionIndex(-1)"
  >
    <div class="d-flex align-items-end">
      <div class="flex-grow-1">
        <GInput
          ref="input"
          autocomplete="off"
          :label="label"
          :value="value"
          @input="fetchAddressMatches"
          @focus="optionIndex = -1"
        />
        <template v-if="addressMatches.length">
          <ul class="address-matches" ref="results">
            <template v-for="(x, i) in addressMatches">
              <li :key="i" class="address-matches__item">
                <button
                  class="g-btn text block focusable"
                  style="text-align:left;"
                  @click.prevent="selectAddress($event, x)"
                >
                  {{x}}
                </button>
              </li>
            </template>
          </ul>
        </template>
      </div>
      <div class="ml-1">
        <button class="g-btn bg-primary text-light" type="submit">Search</button>
      </div>
    </div>
  </form>
</template>

<script>
import { makeDebouncer } from '@/util'
import * as api from '@/services/apiRequests'
const debouncer = makeDebouncer()
export default {
  props: {
    label: String,
    value: String,
  },
  data() {
    return {
      optionIndex: -1,
      addressMatches: [],
      errorMessage: ''
    }
  },
  computed: {
    optionIndexes() {
      return this.addressMatches.map((x, i) => i)
    }
  },
  watch: {
    optionIndex(index) {
      if (index > -1) {
        this.$refs.results.childNodes[index].querySelector('.focusable').focus()
      } else if (index === -1) {
        this.$refs.input.focus()
      }
    }
  },
  methods: {
    fetchAddressMatches(search) {
      this.errorMessage = ''
      this.$emit('input', search)
      debouncer.debounce(400, async () => {
        try {
          if (search.trim()) {
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
    selectAddress(e, addr) {
      this.$emit('input', addr)
      this.$emit('submit')
      this.addressMatches = []
    },
    incrementOptionIndex(val) {
      if (this.optionIndex + val >= -1 && this.optionIndex + val < this.optionIndexes.length) {
        this.optionIndex += val
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.address-searchbar {
  position: relative;
  width: 300px;
}
.address-matches {
  position: absolute;
  z-index: 1000;
  background-color: white;
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
  background-color: #a2e0e2;
}
</style>