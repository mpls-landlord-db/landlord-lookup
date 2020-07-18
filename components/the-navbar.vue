<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="row">
        <div class="col offset-md-1 offset-0 col-12 col-md-10">
          <nav class="navbar__content">
            <section class="title">
              <nuxt-link exact class="navlink" to="/">Landlord Lookup</nuxt-link>
            </section>
            <section class="links">
              <g-link exact class="navlink" to="/">Home</g-link>
              <g-link exact class="navlink" to="/about">About</g-link>
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
    justify-content: space-between;
    .title {
      .navlink {
        font-size: 1.5rem;
        font-weight: 700;
        text-decoration: none;
        color: black;
      }
    }
    .links {
      .navlink {
        font-size: 1.125rem;
      }
    }
  }
}
</style>