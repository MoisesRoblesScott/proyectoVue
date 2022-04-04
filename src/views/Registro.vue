<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="card shadow-lg rounded-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Registrarse</h5>
              <div class="row mb-2">
                <div class="col-12">
                  <label for="nombre">Nombre</label>
                  <input type="text" name="name" id="name" class="form-control" v-model="name" placeholder="Nombre">
                </div>
                <div class="col-12">
                  <label for="nombre">Correo</label>
                  <input type="text" name="correo" id="correo" class="form-control" v-model="email" placeholder="Correo">
                </div>
                <div class="col-12">
                  <label for="pass">Password</label>
                  <input type="password" name="pass" id="pass" class="form-control" v-model="password" placeholder="Password">
                </div>
            </div>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success" @click="registrarse ">Registrarse</button>
              </div>

               <div class="col-6 text-end">
                  <button class="btn btn-danger" @click="pagina_login ">Login</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    methods:{
      registrarse(){
        let registro = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        axios.post("http://proyecto.localhost/api/auth/register", registro).then(({data}) => {
          
          if(data.name){
            this.$swal(
              '',
              'Campo nombre es obligatorio.',
              'info'
            )
            return
          }

          if(data.password){
            this.$swal(
              '',
              'Campo Password es obligatorio y minimo 6 caracteres.',
              'info'
            )
            return
          }

          if(data.email){
             this.$swal(
              '',
              'Campo email es obligatorio y tiene que ser un correo valido.',
              'info'
            )
            return
          }
          this.$router.push({path: '/'})
        }).catch(function (error) {
          console.log(error.toJSON());
        });
      },
      pagina_login(){
        this.$router.push({path: '/'})
      }
    }
  }
</script>


