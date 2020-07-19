<template>
  <div class="container-fluid">
    <div class="row my-0">
      <div class="col p-0">
        <article class="elevator-pitch">
          <section class="elevator-pitch__content">
            We empower tenants in Minneapolis to find current rental license information for the homes 
            in which they live as well as find out which other properties in Minneapolis share the
            same owner/landlord/management company.
          </section>
        </article>
      </div>
    </div>
    <div class="row p-0">
      <div class="col p-0">
        <article class="faq">
          <section class="faq__title">FAQs</section>
          <ol class="faq__list">
            <faq-item q="Where does the data come from?">
              The data comes from a spreadsheet of active rental license data made public by the city of Minneapolis. You can find it
              <a class="link" href="https://opendata.minneapolismn.gov/datasets/active-rental-licenses/data" target="_blank">here</a>.
            </faq-item>
            <faq-item q='In the search results list, what does "Match Confidence" mean?'>
              <p>
                The short answer: the more green boxes in the "match confidence" column, the more sure we are that this address is 
                owned and/or managed by the same person and/or company as the address you put into the search bar.
              </p>
              <div>
                The long answer: <button class="expandy-wandy" @click="showMore = !showMore">[show {{showMore ? 'less -' : 'more +'}}]</button>
              </div>

              <div v-if="showMore" class="the-long-answer">
                We're working on it... It's not too complicated, but successfully composing an engaging, and understandable piece of  
                technical writing is hard.
              </div>
            </faq-item>
          </ol>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import FaqItem from '@/components/about-page/faq-item'
export default {
  components: {
    FaqItem,
  },
  data() {
    return {
      showMore: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.elevator-pitch {

  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.75rem;
    margin-bottom: 1rem;
  }

  &__content {
    margin-top: 2.5rem;
    // margin-bottom: 2rem;
    font-size: 1.5rem;
    line-height: 1.2;
  }
}
.faq {
  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.75rem;
    margin-bottom: 1rem;
  }
  &__list {
    padding-left: 1.5rem;
  }
}

.listy-wisty {
  list-style: inside;
  li {
    margin: 8px 0;
  }
}
.expandy-wandy {
  cursor: pointer;
  background: transparent;
  padding: 4px;
  outline: none;
  border: 1px solid transparent;
  &:hover {
    background: #eee;
  }
}
.the-long-answer {
  background: #eee;
  margin-top: .25rem;
  padding: 1rem;
}
</style>