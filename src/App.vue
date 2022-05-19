<template>
  <q-layout view="hHh lpR fff">
    
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title
          class="row items-center justify-center"
          style="height: 100px"
        >
          <q-avatar>
            <img src="./assets/logo.png" />
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
        <q-btn class="q-mx-md" @click="this.logout()">Logout</q-btn>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
// 1652982771027
export default {
  created(){
    // session expiration
    setTimeout(()=>{
      this.logout()
    },this.expires);
  },
  methods: {
    logout(){
      sessionStorage.removeItem("user")
      sessionStorage.removeItem("profiles")
      sessionStorage.removeItem("expires")
      this.$oidc.signOut()
    },
    load(){
      // check session storage
      if (sessionStorage.getItem("user") &&
          sessionStorage.getItem("profiles") &&
          (sessionStorage.getItem("expires") > Date.now())
          ){
        console.log('session storage found')
        this.user = JSON.parse(sessionStorage.getItem("user"))
        this.profiles = JSON.parse(sessionStorage.getItem("profiles"))
        this.loaded = true
      } else {
        // retrieve from api
        this.$api.getUser(this.$oidc.accessToken, this.setUser)
        this.$api.getDirectory(this.$oidc.accessToken, this.setProfiles)
      }
    },
    setLoaded(){
      if (Object.keys(this.user).length > 0 && this.profiles.length > 0){
        this.loaded = true
      }
    },
    setUser(resp){
      this.user = resp.user
      sessionStorage.setItem("user", JSON.stringify(this.user))
    },
    setProfiles(resp){
      this.profiles = this.sanitizeProfiles(resp.profiles)
      sessionStorage.setItem("profiles", JSON.stringify(this.profiles))
      sessionStorage.setItem("expires", (Date.now()+this.expires))
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
  watch: {
    profiles(){
      this.setLoaded()
    },
    user(){
      this.setLoaded()
    }
  },
  data() {
    return {
      loaded: false,
      expires: (60 * 60 * 1000), // default 1 hour, oidc overrides
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
  background: $background
  color: $text
.q-toolbar
  background: $background
.q-footer > .q-toolbar
  color: $text
</style>