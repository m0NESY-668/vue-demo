<template>
  <el-dialog
    :title="isEdit ? '编辑员工' : '新增员工'"
    v-model="visible"
    width="600px"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工号" prop="employeeNo">
            <el-input v-model="form.employeeNo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所属部门" prop="department">
            <el-select v-model="form.department" style="width: 100%">
              <el-option
                v-for="dept in departments"
                :key="dept.value"
                :label="dept.label"
                :value="dept.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位" prop="position">
            <el-select v-model="form.position" style="width: 100%">
              <el-option label="讲师" value="teacher" />
              <el-option label="助教" value="assistant" />
              <el-option label="班主任" value="manager" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="入职日期" prop="entryDate">
        <el-date-picker v-model="form.entryDate" type="date" style="width: 100%" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="active">在职</el-radio>
          <el-radio label="inactive">离职</el-radio>
        </el-radio-group>
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
  },
  departments: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(props.modelValue)
const formRef = ref(null)

const form = reactive({
  name: '',
  employeeNo: '',
  department: '',
  position: '',
  phone: '',
  email: '',
  entryDate: '',
  status: 'active'
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  employeeNo: [{ required: true, message: '请输入工号', trigger: 'blur' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  position: [{ required: true, message: '请选择职位', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
}

watch(() => props.modelValue, (val) => { visible.value = val })
watch(() => visible.value, (val) => { emit('update:modelValue', val) })
watch(() => props.editData, (val) => {
  if (val && Object.keys(val).length > 0) Object.assign(form, val)
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