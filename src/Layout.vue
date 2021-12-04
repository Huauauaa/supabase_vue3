<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="onMenuClick"
      >
        <el-sub-menu v-if="user" index="profile">
          <template #title>{{ user.email }}</template>
          <el-menu-item index="setting">Setting</el-menu-item>
          <el-menu-item index="signOut">Sign out</el-menu-item>
        </el-sub-menu>
        <template v-else>
          <el-menu-item index="signIn">Sign in</el-menu-item>
          <el-menu-item index="signUp">Sign up</el-menu-item>
        </template>
      </el-menu></el-header
    >
    <el-main v-loading="loading"><router-view> </router-view></el-main>
  </el-container>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from './supabaseClient';
import store from './store';

const router = useRouter();
const route = useRoute();
const activeIndex = ref('');
const loading = ref(false);
const user = computed(() => store.state.user);

const onMenuClick = async (key, keyPath) => {
  if (key === 'signOut') {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) {
      ElMessage.error(error.message);
      loading.value = false;
      return;
    }
    router.push({ name: 'welcome' });
    loading.value = false;
    return;
  }
  router.push({ name: key });
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>
