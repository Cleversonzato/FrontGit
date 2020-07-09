<template>
  <div>
    <div class="row form-group">
      <div class="col-2"/>
      <div class="col-8">
        <h3>Selecione uma busca:</h3>
        <br/>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th class="col-4">Data</th>
              <th class="col-2">id</th>
              <th class="col-4">linguagem</th>
              <th class="col-2">número</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hist in historicos" :key="hist.id" v-on:click="selecionar(hist.id)">
              <td>{{hist.data}}º</td>
              <td>{{hist.id}}</td>
              <td>{{hist.linguagem}}</td>
              <td>{{hist.numero}}</td>
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
  export default {
    name: 'Busca',
    data (){
      return {
        repositorios:[],
        idSelecionado: '',
        historicos:[]
      }
    },
    methods: {
      selecionar(id){
        this.idSelecionado = id
        this.axios.get('http://localhost:9000/buscar?id='+id)
          .then(response => {
            console.log(response)
            this.historicos = response
            Swal.fire({
              title: 'Sucesso',
              text: 'Busca salva ',
              icon: 'success',
              confirmButtonText: 'fechar'
            })
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
