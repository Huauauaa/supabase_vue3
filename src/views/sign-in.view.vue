<template>
  <el-button type="primary" @click="onSignIn"> Sign in</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const onSignIn = () => {
  localStorage.setItem('auth', 1);
  router.push({ name: 'home' });
};
</script>

<style></style>
