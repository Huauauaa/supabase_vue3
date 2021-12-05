<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :lg="12">
      <p>TODO</p>
      <el-input v-model="model.content">
        <template #append>
          <el-button type="primary" @click="onConfirm">Add/Update</el-button>
        </template>
      </el-input>
      <el-table :data="todoList" v-loading="loading">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="content" label="content" />
        <el-table-column header-align="center" align="center" label="action">
          <template #default="scope">
            <el-link
              type="danger"
              @click="onDelete(scope.row.id)"
              :underline="false"
              :icon="Delete"
              style="font-size: 1rem"
            >
            </el-link>
            <el-link
              @click="onEditTodo(scope.row)"
              :underline="false"
              :icon="Edit"
            >
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script setup>
import { Delete, Edit } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../supabaseClient';
import store from '../store';
const user = computed(() => store.state.user);

const model = ref({});
const loading = ref(false);

const todoList = ref([]);
onMounted(() => {
  fetchTodo();
});

const fetchTodo = async () => {
  loading.value = true;
  const { data } = await supabase
    .from('todo')
    .select()
    .order('id', { ascending: false });
  todoList.value = data;
  loading.value = false;
};

const onConfirm = async () => {
  loading.value = true;
  let response;
  if (model.value.id) {
    response = await supabase
      .from('todo')
      .update([{ content: model.value.content }])
      .match({ id: model.value.id });
  } else {
    response = await supabase
      .from('todo')
      .insert([
        { ...model.value, email: user.value.email, user_id: user.value.id },
      ]);
  }

  loading.value = false;
  if (response.error) {
    ElMessage.error(error.message);
    return;
  }
  model.value = {};
  ElMessage.success('add success');
  fetchTodo();
};

const onDelete = async (id) => {
  const confirm = await ElMessageBox.confirm('Continue?', 'Warning').catch(
    () => {},
  );
  if (!confirm) {
    return;
  }
  loading.value = true;
  const { error } = await supabase.from('todo').delete().match({ id });
  loading.value = false;
  if (error) {
    ElMessage.error(error.message);
    return;
  }
  ElMessage.success('delete success');
  fetchTodo();
};

const onEditTodo = (row) => {
  model.value = { ...row };
};
</script>
<style lang="scss" scoped>
::v-deep .el-icon {
  font-size: 1.5rem;
}
</style>
