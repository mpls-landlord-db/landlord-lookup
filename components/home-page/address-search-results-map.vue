<template>
  <div class="col d-flex justify-content-center pr-sm-0 pl-sm-3 p-0">
    <div ref="map" class="my-map"></div>
  </div>
</template>

<script>

let map = null

export default {
  props: {
    addresses: Array,
    selectedAddressId: String,
  },
  mounted() {
    map = this.$createMap(this.$refs.map)
    this.setMarkers()
  },
  watch: {
    selectedAddressId() {
      this.clearMarkers()
      this.setMarkers()
    },
  },
  methods: {
    setMarkers() {
      const addresses = this.addresses.reduce((acc, addr) => {
        if (addr.data.id === this.selectedAddressId) {
          acc.selected = addr
        } else {
          acc.theRest.push(addr)
        }
        return acc
      }, { selected: {}, theRest: [] })

      addresses.theRest.forEach(({ data }) => {
        map.addMarker(data.latitude, data.longitude, {
          title: data.address,
          onClick: () => this.$emit('selectAddress', data.id),
        })
      })
      const { data } = addresses.selected
      map.addMarker(data.latitude, data.longitude, {
        title: data.address,
        isSelected: true,
        onClick: () => null,
      })
    },
    clearMarkers() {
      map.clearMarkers()
    }
  }
}
</script>

<style lang="scss">
.my-map {
  height: 450px;
  width: 100%;
}

.address-marker {
  background: radial-gradient(lightblue, skyblue);
  width: 20px !important;
  height: 30px !important;
  // border-top: solid gray !important;
  // border-left: 20px solid blue;
  // border-radius:  50% 50% 50% 0;
  border-top-left-radius: 80%;
  border-top-right-radius: 80%;
  border-bottom-right-radius: 50%;
  border: solid cyan 1px;
  border-left: 30px;
  border-right: 30px;

  &--active {

  }

}

.triangle {
  border-top: 30px solid blue;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}

</style>
