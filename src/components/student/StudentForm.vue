<template>
  <el-dialog
    :title="isEdit ? '编辑学员' : '新增学员'"
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
          <el-form-item label="学号" prop="studentNo">
            <el-input v-model="form.studentNo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input-number v-model="form.age" :min="16" :max="60" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="所选课程" prop="course">
        <el-select v-model="form.course" style="width: 100%">
          <el-option label="Vue前端开发" value="Vue前端开发" />
          <el-option label="Java后端开发" value="Java后端开发" />
          <el-option label="Python数据分析" value="Python数据分析" />
          <el-option label="UI设计" value="UI设计" />
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报名日期" prop="enrollDate">
            <el-date-picker v-model="form.enrollDate" type="date" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="学习状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="studying">在读</el-radio>
          <el-radio label="suspended">休学</el-radio>
          <el-radio label="graduated">毕业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学习进度" prop="progress">
        <el-slider v-model="form.progress" :max="100" show-input />
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
  studentNo: '',
  gender: '男',
  age: 20,
  course: '',
  phone: '',
  enrollDate: '',
  status: 'studying',
  progress: 0
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  studentNo: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  course: [{ required: true, message: '请选择课程', trigger: 'change' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
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