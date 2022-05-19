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
      <router-view
        :loaded="loaded"
        :profiles="profiles"
        :user="user"
        @load="load"
      />
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
  methods: {
    load(){
      // check session storage
      if (sessionStorage.getItem("user") && sessionStorage.getItem("profiles")){
        console.log('session storage found')
        this.user = JSON.parse(sessionStorage.getItem("user"))
        this.profiles = JSON.parse(sessionStorage.getItem("profiles"))
        this.loaded = true
      } else {
        // retrieve from api
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
      }
    },
    setUser(resp){
      this.user = resp.user
      sessionStorage.setItem("user", JSON.stringify(this.user))
    },
    setProfiles(resp){
      this.profiles = this.sanitizeProfiles(resp.profiles)
      sessionStorage.setItem("profiles", JSON.stringify(this.profiles))
      this.loaded = true
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