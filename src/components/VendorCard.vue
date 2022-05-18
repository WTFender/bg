<template>
  <q-card class="vendor-card">
    <q-card-section
      class="row justify-start"
      horizontal
      style="min-height: 30px"
    >

     <div v-for="(v, k) in profile.tags" :key="profile.id+k" :class="tagClass(k, v)">
        <q-badge :color="tagColor(k)"/> {{k}}
      </div>

    <!--- 
    <div v-for="t in profile.tags" :key="t" class="col-4 tag q-pt-xs text-center">
      <q-badge :color="tagColor(t)"/> {{t}}
    </div>
    --->

    </q-card-section>
    <q-card-section class="row justify-center" horizontal>
      <img
        class="logo"
        style="max-height: 120px"
        :src="profile.logo"
      />
    </q-card-section>
    <q-card-section class="row items-center q-pt-none">
      <div class="col-8 vendor-title text-subtitle2">{{profile.title}}</div>
      <div class="row justify-end col-4">
        <q-btn dense flat rounded
          :icon-right="voted === true ? 'favorite' : 'favorite_border'"
          size="md"
          color="primary"
          :label="profile.votes"
          @click.stop="vote(profile.id)"
        >
        </q-btn>
      </div>
      <div class="col-12 vendor-desc text-caption">{{profile.short}}</div>
    </q-card-section>

  </q-card>
</template>

<style>
</style>

<script>
export default {
  name: "VendorCard",
  props: {
    profile: Object,
    voted: Boolean
  },
  methods: {
    vote(id){
      // TODO api call
      var upvote = false
      // update user 
      if (!(this.$parent.user.votes.includes(id))){
        this.$parent.user.votes.push(id)
        upvote = true
      } else {
        this.$parent.user.votes = this.$parent.user.votes.filter(v => v !== id)
      }
      // update vendor
      for (var p in this.$parent.profiles){
        if (this.$parent.profiles[p].id == id){
          if (upvote){this.$parent.profiles[p].votes += 1}
          else {this.$parent.profiles[p].votes -= 1}
        }
      }
    },
    tagClass(tag, val){
      var badgeTags = ["promoted", "featured", "sponsored"]
      if(badgeTags.includes(tag) && val === true){
        return {
          'col-4': true,
          'tag': true,
          'q-pt-xs': true,
          'text-capitalize': true,
          'text-center': true
        }
      } else {
        return {
          'hidden-tag': true
        }
      }
    },
    tagColor(tag){
      switch(tag){
        case 'promoted':
          return 'primary'
        case 'featured':
          return 'secondary'
        case 'sponsored':
          return 'positive'
      }
    }
  }
};
</script>

<style scoped lang="sass">
.vendor-card
  width: 300px !important
  height: 240px !important
.vendor-desc
  height: 55px !important
  line-height: 15px !important
  color: $grey
.tag
  background: $accent
  color: #58595b
.hidden-tag
  display: none
.logo
  object-fit: contain !important
</style>
