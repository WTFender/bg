<template>
  <div class="row col-12 back-banner text-center items-center">
    <div class="col-12">
      <q-btn
        icon="arrow_back"
        color="primary"
        @click.prevent="$router.push('/')">
        Back to Directory
      </q-btn>
    </div>
  </div>

  <br />

  <div class="row col-12 vendor-profile-container">

    <div class="col-2 offset-1">
      <div class="row">
        <div class="col-12 row justify-center q-pa-lg vendor-profile-logo">
          <img :src="profile.logo" style="max-height: 300px" />
        </div>
        <div class="col-12 q-my-md" />
        <div class="col-12 q-pa-lg vendor-profile-badges">
          <p class="text-h6 text-weight-medium">Badges</p>
          <ul>
            <li
              v-for="(v, k) in profile.tags"
              v-show="v==true"
              :key="'tag-'+k"
              :id="'tag-'+k"
              class="text-capitalize"
              >
              {{k}}
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div class="col-1 vendor-profile-spacer" />

    <div class="col-4 vendor-profile">
      <p class="text-h4 text-weight-medium">
        {{profile.title}}
      </p>
      <p>
        {{profile.desc}}
      </p>
    </div>

  </div>

</template>

<script>
import { ref } from "vue";
export default {
  name: 'ProfileView',
  props: {
    profileId: String,
    profiles: Array,
    user: Object
  },
  setup() {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  created(){
    var profileFound = false
    // set profile
    for (var p in this.profiles){
      if (this.profileId == this.profiles[p].id){
        this.profile = this.profiles[p]
        profileFound = true
      }
    }
    // or 404
    if (!profileFound){this.$router.push({name:'404'})}
  },
  data (){
    return {
      profile: {}
    }
  }
};
</script>

<style lang="sass">
.vendor-profile-container
  min-height: 700px
  margin-left: 5%
  margin-right: 5%
.vendor-profile-logo
  background: $accent
.vendor-profile-badges
  background: $accent
.vendor-profile
  maring-left: 15px
#tag-promoted
  color: $primary
#tag-sponsored
  color: $secondary
#tag-featured
  color: $positive
.back-banner
  height: 70px
  background: linear-gradient(150deg, $primary 0%, $secondary 49%, $positive 100%)
</style>