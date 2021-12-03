<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="onMenuClick"
      >
        <el-sub-menu index="profile">
          <template #title>Profile</template>
          <el-menu-item index="setting">Setting</el-menu-item>
          <el-menu-item index="signOut">Sign out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="signIn">Sign in</el-menu-item>
        <el-menu-item index="signUp">Sign up</el-menu-item>
      </el-menu></el-header
    >
    <el-main><router-view> </router-view></el-main>
  </el-container>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const activeIndex = ref('2-2');

const onMenuClick = (key, keyPath) => {
  if (key === 'signOut') {
    localStorage.removeItem('auth');
    router.push({ name: 'welcome' });
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
