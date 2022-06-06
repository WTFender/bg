<template>
  <div class="row col-12 search-banner text-center items-center">
    <div class="col-12">
      <p class="search-title text-h3 text-weight-medium">
        Some Big Textinyourface
      </p>
      <p class="search-subtitle text-h5">A little bit more, textinyourface</p>

      <div class="row justify-center">
        <!--- Search --->
        <q-input
          dark
          dense
          standout
          v-model="search"
          :disable="!loaded"
          class="search-box q-ml-md"
          placeholder="Search some stuff"
          :clearable="true"
        >
          <template v-if="search == null || search == ''" v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
  </div>

  <br />

  <div class="row directory">
    <!--- Filters --->
    <div class="col-md-3 col-12 filters">
      <div class="directory-header"></div>
      <q-select
        class="q-mb-md"
        filled
        multiple
        :disable="!loaded"
        v-model="filters.badges"
        :options="filterOptions.badges"
        label="Badges"
        :clearable="true"
      />
      <q-select
        class="q-mb-md"
        filled
        multiple
        :disable="!loaded"
        v-model="filters.filter2"
        :options="['1', '2', '3']"
        label="FilterName2"
        :clearable="true"
      />
      <q-select
        class="q-mb-md"
        filled
        multiple
        :disable="!loaded"
        v-model="filters.filter3"
        :options="['A', 'B', 'C']"
        label="FilterName3"
        :clearable="true"
      />
      <q-select
        class="q-mb-md"
        filled
        multiple
        :disable="!loaded"
        v-model="filters.filter4"
        :options="['Option1', 'Option2', 'Option3']"
        label="FilterName4"
        :clearable="true"
      />
    </div>

    <div class="col-md-9 col-12">
      <div class="row col-12 directory-header">
        <!--- Results Count --->
        <div v-show="loaded" class="col-lg-7 col-md-6 col-sm-5 col-4 offset-1">
          <q-select
            borderless
            id="results"
            readonly
            :disable="!loaded"
            dropdown-icon="none"
            v-model="profileResults"
            label="Results"
          />
        </div>

        <!--- Sort By --->
        <div v-show="loaded" class="col-lg-3 col-md-4 col-sm-5 col-7">
          <q-select
            borderless
            id="sort"
            :disable="!loaded"
            v-model="sort"
            :options="sortOptions"
            label="Sort"
          />
        </div>
      </div>

      <div v-if="loaded">
        <!--- Results Page --->
        <div
          v-for="(page, i) in profilePages"
          v-show="i + 1 == currentPage"
          class="row col-12 justify-center items-center profiles"
          :key="'vendor-page-' + i"
          :profiles="page"
        >
          <!--- Vendor Cards --->
          <vendor-card
            v-for="p in page"
            :key="'vendor-card-' + p.id"
            :profile="p"
            :voted="hasVoted(p)"
            class="col-sm-6 col-4 q-ma-sm"
            @click="$router.push({
              name: 'Profile',
              params: {
                profileId: p.id
              }
            })"
          />
        </div>
      </div>

      <div
        v-else-if="!loaded"
        class="row col-12 justify-center items-center profiles"
      >
        <blank-card
          v-for="i in 9"
          :key="'blank-card-' + i"
          class="col-sm-6 col-4 q-ma-sm"
        />
      </div>

      <div
        v-if="loaded"
        class="row col-12 justify-center q-mt-md q-mb-xl pages"
      >
        <!--- Page Buttons --->
        <q-btn
          round
          dense
          v-for="p in profilePageCount"
          :key="'pageBtn' + p"
          class="q-mx-xs"
          color="primary"
          :outline="p === currentPage ? false : true"
          :label="p"
          size="10px"
          @click.stop="currentPage = p"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VendorCard from "../components/VendorCard.vue";
import BlankCard from "../components/BlankCard.vue";

export default {
  name: "DirectoryView",
  components: { VendorCard, BlankCard },
  props: {loaded: Boolean, profiles: Array, user: Object},
  created() {
    if (this.$oidc.isAuthenticated){
      this.$emit('load')
    }
  },
  methods: {
    searchProfiles(profiles) {
      var searchedProfiles = [];
      profiles.forEach((p) => {
        var search = this.search.toLowerCase();
        var profile = JSON.stringify(Object.values(p).join(" ")).toLowerCase();
        if (profile.includes(search)) {
          searchedProfiles.push(p);
        }
      });
      return searchedProfiles;
    },
    filterBadges(profiles) {
      // badge (tag) must exist and be 'true'
      var badgeProfiles = [];
      var badges = this.filters.badges.map((b) => {
        return b.toLowerCase();
      });
      profiles.forEach((p) => {
        var hasBadge = false;
        badges.forEach((badge) => {
          if (!hasBadge && badge in p.tags) {
            if (p.tags[badge] === true) {
              badgeProfiles.push(p);
              hasBadge = true;
            }
          }
        });
      });
      return badgeProfiles;
    },
    hasVoted(profile) {
      if (this.user.votes.includes(profile.id)) {
        return true;
      }
      return false;
    },
    sortProfiles(profiles) {
      var sort = this.sort;
      switch (sort) {
        case "Promoted":
          profiles = this.sortByTag(profiles, sort);
          break;
        case "Featured":
          profiles = this.sortByTag(profiles, sort);
          break;
        case "Sponsored":
          profiles = this.sortByTag(profiles, sort);
          break;
        case "Vendor Name":
          profiles = this.sortByTitle(profiles);
          break;
        case "Vendor Name (desc)":
          profiles = this.sortByTitleReverse(profiles);
          break;
        case "Most Voted":
          profiles = this.sortByMostVoted(profiles);
          break;
        default:
          console.log("Unknown sort method: " + sort);
      }
      return profiles;
    },
    sortRandom(profiles) {
      return profiles.sort(() => Math.random() - 0.5);
    },
    sortByTitle(profiles) {
      return profiles.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    },
    sortByTitleReverse(profiles) {
      return profiles.sort(function (a, b) {
        return b.title.localeCompare(a.title);
      });
    },
    sortByMostVoted(profiles) {
      return profiles.sort(function (a, b) {
        return b.votes - a.votes;
      });
    },
    sortByTag(profiles, tag) {
      tag = tag.toLowerCase();
      return profiles.sort(function (a, b) {
        return Object.prototype.hasOwnProperty.call(a.tags, tag) &&
          a.tags[tag] === true
          ? -1
          : Object.prototype.hasOwnProperty.call(b.tags, tag) &&
            b.tags[tag] === true
          ? 1
          : 0;
      });
    },
    clearFilters() {
      this.search = null;
      this.filters = {
        badges: null,
        filter2: null,
        filter3: null,
        filter4: null,
      };
    },
  },
  computed: {
    displayedProfiles() {
      // hack to copy profiles w/o reactiveness
      var displayedProfiles = JSON.parse(JSON.stringify(this.profiles));

      // apply search
      if (this.search != null && this.search != "") {
        displayedProfiles = this.searchProfiles(displayedProfiles);
      }

      // apply filters
      if (this.filters.badges != null && this.filters.badges.length > 0) {
        displayedProfiles = this.filterBadges(displayedProfiles);
      }

      // sort profiles
      return this.sortProfiles(displayedProfiles);
    },
    profilePages() {
      var pages = [];
      for (
        let i = 0;
        i < this.displayedProfiles.length;
        i += this.maxPageProfiles
      ) {
        pages.push(this.displayedProfiles.slice(i, i + this.maxPageProfiles));
      }
      return pages;
    },
    profilePageCount() {
      return Math.ceil(this.displayedProfiles.length / this.maxPageProfiles);
    },
    profileResults() {
      var results = "";
      if (this.profilePages < 2) {
        results += `${this.displayedProfiles.length}`;
      } else {
        var upper = this.currentPage * this.maxPageProfiles;
        var lower = 1 + (upper - this.maxPageProfiles);
        if (upper > this.displayedProfiles.length) {
          upper = this.displayedProfiles.length;
        }
        if (lower > this.displayedProfiles.length) {
          lower = this.displayedProfiles.length;
        }
        results += `${lower}-${upper} of ${this.displayedProfiles.length}`;
      }
      if (this.displayedProfiles.length < this.profiles.length) {
        results += " (filtered)";
      }
      return results;
    },
  },
  watch: {
    displayedProfiles(){
      this.currentPage = 1
    }
  },
  data() {
    return {
      currentPage: 1,
      maxPageProfiles: 12,
      search: null,
      sort: "Promoted", // default sort
      sortOptions: [
        "Vendor Name",
        "Vendor Name (desc)",
        "Most Voted",
        "Promoted",
        "Featured",
        "Sponsored",
      ],
      filters: {
        badges: null,
        filter2: null,
        filter3: null,
        filter4: null,
      },
      filterOptions: {
        badges: ["Promoted", "Featured", "Sponsored"],
      }
    };
  },
  emits: ['load']
};
</script>

<style lang="sass">
.filters > .q-select
  background: $accent
.directory-header
  height: 50px
.directory
  min-height: 700px
  margin-left: 10%
  margin-right: 10%
.vendor-card
  border-bottom: 3px solid transparent
  transition: border-bottom .5s
  text-decoration: none
.vendor-card:hover
  cursor: pointer
  border-bottom: 3px solid $primary
.search-banner
  height: 280px
  background: linear-gradient(150deg, $primary 0%, $secondary 49%, $positive 100%)
.search-title
  color: white
.search-subtitle
  color: white
.search-box
  min-width: 30%
</style>