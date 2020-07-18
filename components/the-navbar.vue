<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="row">
        <div class="col offset-md-1 offset-0 col-12 col-md-10">
          <nav class="navbar__content">
            <section class="title">
              <nuxt-link to="/">Landlord Lookup</nuxt-link>
            </section>
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  background: aliceblue;
  box-shadow: 1px 1px 2px #aaa;

  &__content {
    height: 100%;
    display: flex;
    align-items: center;

    .title {
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
}
</style>