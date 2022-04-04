<template>
  <div class="common-layout">
    <div>
      <div class="justify-content-center my-5 shadow-lg rounded-3">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="18">
                Listado De Facturas
              </el-col>
              <el-col :span="6">
                <el-button size="small" @click="cerrarSesion" type="danger">Logout</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <!-- Bloque de codigo para creacion de factura -->
            <el-button size="small" @click="abiriModalCreacion" type="success">Nueva Factura</el-button>

            <el-dialog v-model="dialogVisible" :title="titulo" width="50%">
              <span>
                <el-row>
                  
                  <el-col :span="12"> 
                    <span class="demonstration">Numero Factura</span>
                    <el-input v-model="guardar_factura.numero_factura" type="text" placeholder="Numero Factura" /> 
                  </el-col>
                  
                  <el-col :span="12">
                    <span class="demonstration">Fecha Hora</span>
                    <el-date-picker v-model="guardar_factura.fecha_hora" type="datetime"  format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DD h:m:s" placeholder="Seleccionar fecha y hora" />
                  </el-col>

                </el-row>

                <el-row>
                  
                  <el-col :span="12"> 
                    <span class="demonstration">Emisor</span>
                    <el-input v-model="guardar_factura.emisor" type="text" placeholder="Nombre Emisor"/> 
                  </el-col>
                  
                  <el-col :span="12">
                    <span class="demonstration">Comprador</span>
                    <el-input v-model="guardar_factura.comprador" type="text" placeholder="Nombre Comprador" />
                  </el-col>

                </el-row>

                <el-row>
                  
                  <el-col :span="12"> 
                    <span class="demonstration">Valor</span>
                    <el-input v-model="guardar_factura.valor" disabled type="text" placeholder="Valor Factura" /> 
                  </el-col>
                  
                  <el-col :span="7" class="my-3 m-5">
                    <span class="demonstration">IVA</span>
                    <el-input-number v-model="guardar_factura.iva" type="text" placeholder="IVA" />
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="24"> 
                    <span class="demonstration">Total Pagar</span>
                    <el-input v-model="guardar_factura.total_pagar" disabled type="text" /> 
                  </el-col>
                </el-row>
              </span>
              <el-container>
                <el-form :model="detalles_factura" ref="detalles_factura" label-width="120px" class="demo-dynamic">
                  <el-row 
                    v-for="(item, index) in detalles_factura.items"
                    :label="'item' + index"
                    :key="item.key"
                    :prop="'items.' + index + '.value'"
                  >
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <el-tag class="ml-2" type="info">{{ index+1 }}</el-tag>
                      </div>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item prop="email" label="Descripcion">
                        <el-input v-model="item.descripcion"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item prop="email" label="Cantidad">
                        <el-input v-model="item.cantidad"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item prop="email" label="Valor Unitario">
                        <el-input v-model="item.valor_unitario" @change="cancularValorItem(item.cantidad, item.valor_unitario, index)" ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item prop="email" label="Valor total">
                        <el-input v-model="item.valor_total" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    
                    <el-button @click.prevent="eliminarItems(item)" size="small" type="danger">Eliminar</el-button>
                    
                    <el-col :span="24">
                      <hr />
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="24">
                        <el-button @click="agregarItems" size="small" type="success">Nuevo Item</el-button>
                    </el-col>
                  </el-row>

                </el-form>
              </el-container>

              <template #footer>
                <span class="dialog-footer">
                  <el-button type="danger" @click="dialogVisible = false">Cancelar</el-button>
                  <el-button type="primary" @click="guardarFactura" v-show="btn_guardar"> Guardar </el-button>
                  <el-button type="primary" @click="actualizar_factura" v-show="btn_actualizar"> Actualizar </el-button>
                </span>
              </template>
            </el-dialog>
            <!-- Bloque de codigo para creacion de factura -->
            
            <!--Tabla listado de las facturas -->
            <el-table :data="filtroDara" style="width: 100%">
              <el-table-column label="Numero Factura" sortable prop="numero_factura" width="170" />
              <el-table-column label="Fecha Hora" prop="fecha_hora" width="120" />
              <el-table-column label="Emisor" prop="emisor" width="120" />
              <el-table-column label="Comprador" prop="comprador" width="120" />
              <el-table-column label="Valor Factura" prop="valor" width="120" />
              <el-table-column label="Iva" prop="iva" width="120" />
              <el-table-column label="Total Pagar" prop="total_pagar" width="120" />

              <el-table-column label="Detalles" type="expand" width="120">

                <template #default="prop">
                  <!-- <div v-for="(f, i) in prop.row.detalles_factura" :key="i"> -->
                    <el-table :data="prop.row.detalles_factura">
                      <el-table-column width="150" prop="descripcion" label="Descripcion" />
                      <el-table-column width="100" prop="cantidad" label="Cantidad" />
                      <el-table-column width="150" prop="valor_unitario" label="Valor Unitario" />
                      <el-table-column width="300" prop="valor_total" label="Valor Total" />
                    </el-table>
                  <!-- </div> -->
                </template>
              
              </el-table-column>
              
              <el-table-column label="Acciones">
                <template #header>
                  <el-input v-model="search" size="small" placeholder="Buscar" />
                </template>

                <template #default="scope">

                  <el-button size="small" type="info" @click="modal_vista_actualizar(scope.$index, scope.row)">
                    Actualizar
                  </el-button>
                  
                  <el-button size="small" type="danger" @click="eliminar(scope.$index, scope.row)">
                    Eliminar
                  </el-button>
                </template>

              </el-table-column>
            </el-table>
            <!-- Tabla listado de las facturas -->

          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      id_factura: null,
      titulo: '',
      btn_guardar: true,
      btn_actualizar: false,
      facturas: [],
      search: '',
      dialogVisible: false,
      guardar_factura: {
        numero_factura: '',
        fecha_hora: '',
        emisor: '',
        comprador: '',
        valor: '',
        iva: '',
        total_pagar: ''
      },
      detalles_factura: {
        items: [
          {
            descripcion: '',
            cantidad: '',
            valor_unitario: '',
            valor_total: ''
          }
        ],
      },
      valores_items: [],
      valor_total: 0
    }
  },
  mounted() {
    this.listaFacturas()
  },
  computed:{
    filtroDara(){
      return this.facturas.filter((data) =>
        !this.search || data.emisor.toLowerCase().includes(this.search.toLowerCase()) 
        || data.comprador.toLowerCase().includes(this.search.toLowerCase()) || data.numero_factura.includes(this.search)
      )
    }
  },
  methods: {
    listaFacturas(){
      const config = {
        headers: {'Authorization': 'Bearer '+localStorage.token}
      }
      axios.get('http://proyecto.localhost/api/facturacion/listaFacturas', config).then(({data}) => {
       this.facturas = data
      }).catch(console.log)
    },
    abiriModalCreacion(){
      this.limpiar_campos()
      this.dialogVisible = true
      this.titulo = 'Creacion De Factura'
    },
    guardarFactura(){
      this.dialogVisible = false

      const config = {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.token
        }
      }

      let datos = {
                    "data_factura" : this.guardar_factura,
                    "data_detalles_factura" : this.detalles_factura
                  }

      axios.post('http://proyecto.localhost/api/facturacion/registrar', datos,  config).then(() => {
        this.$swal(
          '',
          'Registrado Correctamente',
          'success'
        )
        this.listaFacturas()
      }).catch(console.log)
    },
    async eliminar(index, fila){
      this.$swal({
        title: '¿ Desea eliminar este registro ?',
        showDenyButton: true,
        icon: 'question',
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('http://proyecto.localhost/api/facturacion/eliminar', 
            { 
              data: { id: fila.id }, 
              headers: { "Authorization": 'Bearer '+localStorage.token } 
            }
          ).then(() => {
            this.$swal(
              '',
              'Eliminado Correctamente',
              'success'
            )
            this.listaFacturas()
          }).catch(console.log)
        } else if (result.isDenied) {
          this.$swal('No se aplico ningun cambio', '', 'info')
        }
      })
    },
    eliminarItems(item) {
      var index = this.detalles_factura.items.indexOf(item);
      if (index !== -1) {
        this.detalles_factura.items.splice(index, 1);
        
        this.valores_items.splice(index, 1)

        this.valor_total = this.valores_items.reduce((a, b) => b - a, 0);
        this.guardar_factura.valor = this.valor_total
      }
    },
    agregarItems() {
      this.detalles_factura.items.push({
        descripcion: '',
        cantidad: '',
        valor_unitario: '',
        valor_total: ''
      });
    },
    modal_vista_actualizar(index, fila){
      this.titulo = 'Actualizar Factura'
      this.btn_guardar = false
      this.btn_actualizar = true
      this.dialogVisible = true
      this.id_factura = fila.id
      this.guardar_factura.numero_factura = fila.numero_factura
      this.guardar_factura.fecha_hora     = fila.fecha_hora
      this.guardar_factura.emisor         = fila.emisor
      this.guardar_factura.comprador      = fila.comprador
      this.guardar_factura.valor          = fila.valor
      this.guardar_factura.iva            = fila.iva
      this.guardar_factura.total_pagar    = fila.total_pagar

      this.detalles_factura.items = fila.detalles_factura
    },
    async actualizar_factura(){
      const config = {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.token
        }
      }

      let datos = {
                    "id_factura": this.id_factura,
                    "data_factura" : this.guardar_factura,
                    "data_detalles_factura" : this.detalles_factura
                  }

      axios.post('http://proyecto.localhost/api/facturacion/actualizar', datos,  config).then(() => {
        this.listaFacturas()
      }).catch(console.log)
    },
    cerrarSesion(){ 
      axios.post('http://proyecto.localhost/api/auth/logout',{},{
        headers: {
          'Authorization': 'Bearer '+localStorage.token 
        }
      }).then(() => { 
        localStorage.removeItem('token') 
        this.$router.push({path: '/'})
      }).catch(console.log)
    },
    limpiar_campos(){

      this.detalles_factura = {
        items: [
          {
            descripcion: '',
            cantidad: '',
            valor_unitario: '',
            valor_total: ''
          }
        ]
      }

      this.guardar_factura = {
        numero_factura: '',
        fecha_hora: '',
        emisor: '',
        comprador: '',
        valor: '',
        iva: '',
        total_pagar: ''
      }
    },
    cancularValorItem(cantidad, valor_unitario, index){
      let valor_total_item = cantidad * valor_unitario
      
      this.detalles_factura.items[index].valor_total = valor_total_item
      this.valores_items.push(this.detalles_factura.items[index].valor_total)

      this.valor_total = this.valores_items.reduce((a, b) => a + b, 0);
      this.guardar_factura.valor = this.valor_total

      this.calcularValorIva(this.guardar_factura.valor, this.guardar_factura.iva)
    },
    calcularValorIva(valor, iva){
      let a = valor*iva 
      let b = a/100
      let valorMasIva = b+valor
      this.guardar_factura.total_pagar = valorMasIva
    }
  },
}
</script>
<style lang="">
  
</style>
