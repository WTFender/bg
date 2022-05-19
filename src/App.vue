<template>
  <q-layout view="hHh lpR fff">
    
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title
          class="row items-center justify-center"
          style="height: 100px"
        >
          <q-avatar>
            <img src="logo.png" />
          </q-avatar>
          HeaderTitle
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :loaded="loaded" :profiles="profiles" :user="user" />
    </q-page-container>

    <q-footer bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div>FooterTitle</div>
        </q-toolbar-title>
        <q-btn @click="this.$oidc.signOut()">Logout</q-btn>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  setup() {

  },
  created(){
    this.$oidc.events.addUserLoaded(function() {
      this.load
    })
    
    if (this.$oidc.isAuthenticated){
      this.load()
    }
  },
  methods: {
    load(){
      this.$api.getUser(
        this.$oidc.accessToken,
        this.setUser,
        this.notifyErr
      )
      this.$api.getDirectory(
        this.$oidc.accessToken,
        this.setProfiles,
        this.notifyErr
      )
      this.loaded = true
    },
    setUser(resp){
      this.user = resp.user
    },
    setProfiles(resp){
      this.profiles = this.sanitizeProfiles(resp.profiles)
    },
    notify(msg) {
      this.$q.notify({
        message: msg,
        color: 'primary'
      })
    },
    notifyErr(msg) {
      this.$q.notify({
        message: msg,
        color: 'negative'
      })
    },
    sanitizeProfiles(profiles) {
      for (var p in profiles) {
        if (!("tags" in profiles[p])) {
          profiles[p].tags = {};
        }
        if (!("votes" in profiles[p])) {
          profiles[p].votes = 0;
        }
      }
      return profiles;
    }
  },
  data() {
    return {
      loaded: false,
      profiles: [],
      user: {}
    }
  }
};
</script>

<style lang="sass">
html
  overflow-y: overlay
.q-layout
  background: #fbfbfb
  color: #58595b
.q-toolbar
  background: #fbfbfb
.q-footer > .q-toolbar
  color: #58595b
</style>