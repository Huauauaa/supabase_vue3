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
        <el-button type="primary" @click="onRegister">Sign up</el-button>
        <div class="tip">
          Already has an account?
          <el-link @click="goSignIn" :underline="false">Sign in</el-link>
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

const goSignIn = () => {
  router.push({ name: 'signIn' });
};

const onRegister = async () => {
  loading.value = true;
  const { user, session, error } = await supabase.auth.signUp(model.value);

  if (error) {
    ElMessage.error(error.message);
    loading.value = false;
    return;
  }
  ElMessage.success('sign up success');
  router.push({ name: 'signIn' });
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
