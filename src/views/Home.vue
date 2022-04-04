<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <el-card class="box-card shadow-lg rounded-3">
        <template #header>
          <div class="card-header">
            <span>Iniciar Sesion</span>
          </div>
        </template>
        <div>
          <label for="nombre">Correo</label>
          <el-input
            v-model="correo"
            placeholder="Correo"
            type="text"
          />

          <label for="pass">Password</label>
          <el-input
              v-model="password"
              placeholder="Password"
              type="password"
            />
        </div>
        <div class="row my-2">
          <div class="col-6">
            <el-button type="success" @click="login">Entrar</el-button>
          </div>

          <div class="col-6 text-end">
            <el-button type="primary" @click="register">
              Registrarse
             <!-- <router-link :to="{name: 'Registro'}">Register</router-link>-->
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!-- <router-view /> -->
  </div>
</template>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  </style>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        correo: '',
        password: ''
      }
    },
    methods:{
      async login(){
        let credenciales = {
          email: this.correo,
          password: this.password,
        };
        await axios.post("http://proyecto.localhost/api/auth/login", credenciales).then(({data}) => {

          if(data.password || data.email){
            this.$swal(
              '',
              'Los Campos son obligatorios',
              'info'
            )
            return
          }
          
          localStorage.token = data.access_token;
          this.$router.push({name: 'lista_facturas'})
        }).catch(
          
        );
      },
      register(){
        console.log('Asi llego');
        this.$router.push({path: '/registro'});
       /*  this.$router.go(-1) */
      }
    }
  }
</script>


