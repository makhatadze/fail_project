<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Sign in</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data () {
      return {
        ruleForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: 'Please input email', trigger: 'blur' },
            { type: 'email', message: 'Length should be 3 to 20', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
            { min: 3, max: 20, message: 'Please input correct password', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async login () {
        try {
          const response = await AuthenticationService.login({
            email: this.ruleForm.email,
            password: this.ruleForm.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'index'
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
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

<style scoped>
</style>

