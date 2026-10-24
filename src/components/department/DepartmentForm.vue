<template>
  <el-dialog
    :title="isEdit ? '编辑部门' : '新增部门'"
    v-model="visible"
    width="500px"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="负责人" prop="manager">
        <el-input v-model="form.manager" placeholder="请输入负责人姓名" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="active">启用</el-radio>
          <el-radio label="inactive">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          rows="3"
          placeholder="请输入部门描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(props.modelValue)
const formRef = ref(null)

const form = reactive({
  name: '',
  code: '',
  manager: '',
  status: 'active',
  description: ''
})

const rules = {
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
  manager: [{ required: true, message: '请输入负责人', trigger: 'blur' }]
}

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(() => visible.value, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.editData, (val) => {
  if (val && Object.keys(val).length > 0) {
    Object.assign(form, val)
  }
}, { immediate: true })

const handleClose = () => {
  formRef.value?.resetFields()
}

const handleSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    emit('submit', { ...form })
    visible.value = false
  }
}
</script>