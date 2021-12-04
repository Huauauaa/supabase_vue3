<template>
  <div class="wrapper" v-loading="loading">
    <el-form ref="form" :model="model" label-width="120px">
      <el-form-item label="email">
        <el-input v-model="model.email"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSignIn">Sign in</el-button>
        <div class="tip">
          Don't have an account?
          <el-link @click="goSignUp" :underline="false">Sign up</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabaseClient';

const router = useRouter();
const model = ref({});
const loading = ref(false);

const goSignUp = () => {
  router.push({ name: 'home' });
};

const onSignIn = async () => {
  loading.value = true;
  const { user, session, error } = await supabase.auth.signIn(model.value);
  if (error) {
    ElMessage({
      message: error.message,
      type: 'error',
    });
    loading.value = false;
    return;
  }
  ElMessage.success('success');
  router.push({ name: 'home' });
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 500px;
    .el-button {
      width: 100%;
    }
    .tip {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
      gap: 1rem;
    }
  }
}
</style>
