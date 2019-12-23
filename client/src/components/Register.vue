<template>
<el-card>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="ruleForm.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="ruleForm.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="male"/>
        <el-radio label="female"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data () {
      return {
        ruleForm: {
          firstName: '',
          lastName: '',
          email: '',
          gender: '',
          password: ''
        },
        rules: {
          firstName: [
            { required: true, message: 'Please input First Name', trigger: 'blur' },
            { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
          ],
          lastName: [
            { required: true, message: 'Please input Last Name', trigger: 'blur' },
            { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please input email', trigger: 'blur' },
            { type: 'email', message: 'Length should be 3 to 20', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input email', trigger: 'blur' },
            { min: 3, max: 20, message: 'Please input correct email', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: 'Please select Gender ', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      async register () {
        try {
          const response = await AuthenticationService.register({
            firstName: this.ruleForm.firstName,
            lastName: this.ruleForm.lastName,
            gender: this.ruleForm.gender,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            error: ''
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$notify.success({
            title: 'Success',
            message: 'You registered success!'
          })
          this.$router.push({
            name: 'index'
          })
        } catch (error) {
          this.$notify.error({
            title: 'Error',
            message: 'This email is used by another user'
          })
          this.error = error.response.data.error
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
