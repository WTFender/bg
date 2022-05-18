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
      <router-view :profiles="profiles" :user="user" />
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
import { ref } from "vue";
import MockProfiles from "./mock/profiles.json";
import MockUser from "./mock/user.json";
export default {
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  created(){
    this.user = MockUser
    this.profiles = this.sanitizeProfiles(MockProfiles)
    if (this.$oidc.isAuthenticated){
      this.$api.getDirectory(
        this.$oidc.accessToken,
        // success
        function(response){
          this.user = response.user
          this.profiles = response.profiles
        },
        // fail
        this.notify
      )
    }
  },
  methods: {
    notify(msg) {
      this.$q.notify({
        message: msg,
        color: 'primary'
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