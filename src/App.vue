<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { supabase } from './supabaseClient';
import store from './store';

supabase.auth.onAuthStateChange((_, session) => {
  store.actions.setUser(session);
});
</script>

<template><router-view></router-view></template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
</style>
