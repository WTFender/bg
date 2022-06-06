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
          <img :src="logoUrl" style="max-height: 300px" />
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

      <div>
        <p class="text-h5 text-weight-medium q-pt-lg">Comments</p>
        <q-select borderless
          v-for="c, i in profile.comments"
          :key="i"
          :class="isUserComment(c.user) ? 'edit q-pl-sm' : 'q-ml-sm'"
          :clearable="isUserComment(c.user)"
          :readonly="!isUserComment(c.user)"
          @clear="deleteUserComment"
          dropdown-icon="none"
          v-model="c.comment"
          :label="c.user.toLowerCase()"
        >
        <q-popup-edit buttons
          class="q-py-none"
          v-if="isUserComment(c.user)"
          v-model="c.comment"
          v-slot="scope"
          @save="updateUserComment"
        >
          <q-input
            v-model="scope.value"
            autofocus
            counter
            @keyup.enter.stop
          />
        </q-popup-edit>

        </q-select>
      </div>
    
    </div>

  </div>

</template>

<script>
import { ref } from "vue";
export default {
  name: 'ProfileView',
  props: {
    loaded: Boolean,
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
    //this.loadLogo('test.jpg')
  },
  methods: {
    loadLogo(profileId){
      console.log(`load logo ${profileId}`)
      //this.$api.getImage(this.$oidc.accessToken, profileId, this.setLogo)
    },
    setLogo(url){
      console.log(`set logo ${url}`)
      this.logoUrl = url
    },
    deleteUserComment(){
      // confirm delete comment
      this.$emit('deleteComment', this.profile.id)
      var comments = this.profile.comments
      for (var c in comments){
        if (this.isUserComment(comments[c].user)){
          this.profile.comments.splice(c, 1)
        }
      }
    },
    updateUserComment(comment){
      this.$emit('updateComment', this.profile.id, comment)
    },
    isUserComment(user) {
      if (this.user.email==user){ 
        this.hasCommented = true
        return true
      }
      return false
    }
  },
  data (){
    return {
      hasCommented: false,
      profile: {},
      logoUrl: ''
    }
  },
  emits: ['load', 'deleteComment', 'updateComment']
};
</script>

<style lang="sass">
.edit
  background: $accent
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