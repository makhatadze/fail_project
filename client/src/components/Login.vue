<template>
<el-card class="el-card">
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
</el-card>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data () {
      return {
        ruleForm: {
          email: '',
          password: '',
          error: false
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
          this.$notify.success({
            title: 'Success',
            message: 'You are success loged in'
          })
          this.$router.push({
            name: 'index'
          })
        } catch (error) {
          this.$notify.error({
            title: 'Error',
            message: 'Email or password was wrong'
          })
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
  .el-card {
    margin-top: 120px;
    width: 50%;

    margin-left: 250px;

  }
  .el-button {
    text-align: center;
    margin-left: 120px;
  }

</style>

