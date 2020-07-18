<template>
  <div class="layout" :class="{ 'layout--is-scrolled' : scrollY > 40 }">

    <div class="navbar-wrapper">
      <TheNavbar />
    </div>

    <div class="main-content-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col offset-md-1 offset-0 col-12 col-md-10">
            <nuxt />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TheNavbar from '@/components/the-navbar'
export default {
  components: {
    TheNavbar,
  },
  data() {
    return {
      scrollY: 0,
    }
  },
  mounted() {
    this.syncScrollY()
    window.addEventListener('scroll', this.syncScrollY)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.syncScrollY)
  },
  methods: {
    syncScrollY() {
      this.scrollY = window.scrollY
    }
  },
}
</script>

<style lang="scss">

$navbar-height: 64px;
$navbar-height-scrolled: 32px;

.layout {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    margin: 0;
    height: $navbar-height;
    transition: all .1s ease-in-out;
  }

  .main-content-wrapper {
    background: #fafafa;
    margin-top: $navbar-height;
    width: 100%;
    min-height: calc(100% - #{$navbar-height});
    transition: all .1s ease-in-out;
  }

  &--is-scrolled {

    .navbar-wrapper {
      height: $navbar-height-scrolled;
    }

    .main-content-wrapper {
      margin-top: $navbar-height-scrolled;
      min-height: calc(100% - #{$navbar-height-scrolled});
    }

  }
}
</style>
