<script setup>
import { reactive, toRefs, ref } from 'vue';

defineProps({
  msg: String,
});

const value1 = ref('');
</script>

<template>
  {{ value1 }}
  <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
  </el-date-picker>
  <el-button type="primary">click</el-button>
</template>

<style scoped></style>
