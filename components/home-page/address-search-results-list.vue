<template>
  <div class="col">
    <h3 class="mt-0 mb-2">Results: {{totalEntities}}</h3> 
    <div class="row">
      <div class="col font-weight-bold">Address:</div>
      <div class="col font-weight-bold">Match Confidence:</div>
    </div>
    <ul class="address-list">
      <li class="primary" :class="{ 'selected' : primary.id === selectedAddressId }">
        <button class="g-btn text text-left block" @click="$emit('update:selectedAddressId', primary.id)">
          <div class="row">
            <div class="col">
              {{primary.address}}
            </div>
            <div class="col font-weight-normal">
              Primary
            </div>
          </div>
        </button>
      </li>
      <li v-for="({ data, matchedBy }, i) in secondary" :key="i" class="secondary" :class="{ 'selected' : data.id === selectedAddressId }">
        <button class="g-btn text text-left block" @click="$emit('update:selectedAddressId', data.id)">
          <div class="row">
            <div class="col">{{data.address}}</div>
            <div class="col">
              <span v-for="x in matchedBy.length" :key="x" class="green-box mr-1"></span>
            </div>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    primary: Object,
    secondary: Array,
    totalEntities: Number,
    selectedAddressId: String,
  }
}
</script>

<style scoped>
.green-box {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: rgb(80, 202, 80);
  border: 1px solid #55aa33;
}
.address-list {
  max-height: 400px;
  border: 1px solid #888;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 4px 0;
}

.selected {
  position: sticky;
  top: 32px;
  bottom: 0; 
  z-index: 1;
  background: #b1e3eb;
  color: rgb(0, 0, 0);
}
.selected .g-btn:hover {
  background: #b1e3eb93;
}
.primary {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}
.primary.selected {
  top: 0;
  background: #b1e3eb;
}
</style>