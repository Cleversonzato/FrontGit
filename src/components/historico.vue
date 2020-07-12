<template>
  <div id="templateHistorico">
    <div class="row form-group">
      <div class="col-2"/>
      <div class="col-8">
        <h3>Selecione uma busca:</h3>
        <br/>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th class="col-4">id</th>
              <th class="col-2">linguagem</th>
              <th class="col-4">número</th>
              <th class="col-2">data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="busca in buscas" :key="busca.id" v-on:click="selecionar(busca.id)">
              <td>{{busca.id}}º</td>
              <td>{{busca.linguagem}}</td>
              <td>{{busca.numero}}</td>
              <td>{{busca.data}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="repositorios.length > 0">
      <div class="row form-group">
        <div class="col-4" style="text-align:left;">
          <h3> Busca id: {{ idSelecionado }} </h3>
        </div>
      </div>

      <resultado v-bind:repositorios="repositorios"/>

    </div>
  </div>
</template>

<script>
  import Swal from 'sweetalert2'
  import resultado from './resultado.vue'
  import '../plugins/axios'

  export default {
    name: 'Historico',
    components: {
      resultado
    },
    data (){
      return {
        repositorios:[],
        idSelecionado: '',
        buscas:[]
      }
    },
    mounted (){
      this.buscarHistorico()
    },
    methods: {
      buscarHistorico(){
        this.axios.get('http://localhost:9000/buscas')
        .then(response => {
            this.buscas = response.data
         })
         .catch(erro => {
          Swal.fire({
            title: 'Erro!',
            text: 'Verifique se sua conexão! ' + erro,
            icon: 'error',
            confirmButtonText: 'fechar'
          })
        })
      },
      selecionar(id){
        this.idSelecionado = id
        this.axios.get('http://localhost:9000/buscar/'+id)
          .then(response => {
            console.log(response)
            this.repositorios = response.data
         })
         .catch(erro => {
          Swal.fire({
            title: 'Erro!',
            text: 'Verifique se sua conexão! ' + erro,
            icon: 'error',
            confirmButtonText: 'fechar'
          })
        })
      }
    }
  }
</script>
