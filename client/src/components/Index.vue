<template>
  <div>
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">Logo</el-menu-item>
          <el-menu-item index="2" style="float: right">
            <el-input size="medium" placeholder="Type to search" />
          </el-menu-item>
        </el-menu>
      </el-header>
    </el-container>
    <el-container>
      <el-main>
        <el-table ref="multipleTable" :data="users" stripe style="width: 100%">
          <el-table-column prop="id" width="40">
          </el-table-column>
          <el-table-column label="Full Name">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" :readonly="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Username">
            <template slot-scope="scope">
              <el-input v-model="scope.row.username" :readonly="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Email">
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.email" :readonly="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-button-group>
                <el-button type="primary" icon="el-icon-edit" @click="isEditable = true, disabled = !disabled" v-show="!isEditable">Edit User</el-button>
                <el-button type="primary" plain @click="isEditable = false, disabled = !disabled" v-show="isEditable">Save changes</el-button>
                <el-button type="success" square="elicon-edit" @click="addUserDialogVisible = true">Add user</el-button>
              </el-button-group>
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="danger" prop="id" icon="el-icon-delete" @click.native.prevent="handleDeleteUser(scope.$index, users)">Delete</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-dialog class="New user dialog" title="New User" width="40%" :visible.sync="addUserDialogVisible" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Full Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="form.streetAddress"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="City" v-model="form.city" class="input-with-select">
              <el-select v-model="form.state" slot="append" placeholder="State"></el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="Zipcode" v-model="form.zipcode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float: left" type="primary" @click="handleAddUser">Create</el-button>
            <el-button style="float: left">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  var axios = require('axios')
  export default {
    name: 'user',
    data () {
      return {
        users: [],
        addUserDialogVisible: false,
        editUserDialogVisible: false,
        isEditable: false,
        disabled: true,
        form: {
          name: '',
          username: '',
          email: '',
          phone: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: ''
        }
      }
    },
    mounted () {
      const url = 'https://jsonplaceholder.typicode.com/users'
    // const localurl = 'http://localhost:3000/users'
    // json-server --watch typiecode.json -- cd to assets folder and run this command to use local api.
      var self = this
      axios
        .get(url)
        .then(function (response) {
          self.users = response.data
          console.log('Data: ', response.data)
        })
        .catch(function (error) {
          console.log('Error, ', error)
        })
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      handleAddUser () {
        let newUser = {
          name: this.form.name,
          username: this.form.username,
          email: this.form.email,
          phone: this.form.phone,
          streetAddress: this.form.streetAddress,
          city: this.form.city,
          state: this.form.state,
          zipcode: this.form.zipcode
        }
        console.log(newUser)
        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
          // axios.post('http://localhost:3000/users', newUser) // post request to local rest api through axios - Adds user!
          .then(function (response) {
            console.log(response, 'Success')
            window.location.reload()
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handleDeleteUser (index, rows) {
        this.$confirm('This will permanently delete the user. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
        // axios.delete('https://jsonplaceholder.typicode.com/users/' + userID)
        // let userID = index + 1
        // axios.delete('http://localhost:3000/users/' + userID)
          this.$message({
            type: 'success',
            message: 'Delete completed'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
      },
      handleEditRow (index) {
        this.isEditable = true
      }
    }
  }
</script>

<style>
  h3 {
    margin: 40px 0 0;
    text-align: left;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  p {
    text-align: left;
  }

  .el-menu {
    border-right: 0 !important;
  }

  .el-select .el-input {
    width: 110px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
