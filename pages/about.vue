<template>
  <div class="container-fluid">
    <div class="row my-0">
      <div class="col p-0">
        <article class="elevator-pitch">
          <section class="elevator-pitch__content">
            We empower tenants in Minneaplois to find current rental license information for the homes 
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
            <faq-item q='In the search results list, what does "match confidence" mean?'>
              Our search bar works in two steps:
              <ul class="dashed">
                <li>
                  First, we look for any database entries with an address that matches the one entered into it. 
                </li>
                <li>
                  Each entry includes over 30 pieces of information including the property owner's:
                  name, mailing address, phone number, and email address. If we find an entry whose property address
                  matches the one you put into the search bar, we use those 4 peices of information ... WIP
                </li>
              </ul>
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
      faqs: [
        {
          q: 'Where does the data come from?',
          a: `The data comes from a spreadsheet made public by the city of Minneapolis. 
          You can find it <a class="link" href="https://opendata.minneapolismn.gov/datasets/active-rental-licenses/data" target="_blank">here</a>.`
        },
        {
          q: 'In the search results list, what does "match confidence" mean?',
          a: 'When we search'
        }
      ]
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

.dashed {
  list-style: inside;
  li {
    margin: 8px 0;
  }
}
</style>