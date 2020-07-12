<template>
  <div id="app">
    <div class="container">
      <img src="https://assets.website-files.com/5e4bfdfca8278952b3442a99/5e4c0d93451b2ce7546406bb_mol_red.svg" width="50px;"/><br/>
      <br/>
      <br/>
      <div class="api">
        <div class="row">
          <div class="col-2"/>
          <div class="col-4">
            <button id="btnBusca" class="btn btn-danger col-11" v-on:click="busca=true;repositorios=[]"> Nova busca  </button>
          </div>
          <div class="col-4">
            <button id="btnHistorico" class="btn btn-danger col-11" v-on:click="busca=false;repositorios=[]"> Histórico de buscas  </button>
          </div>
          <div class="col-2"/>
        </div>
        <br/>
        <br/>
        <br/>

        <busca v-if="busca"/>

        <historico v-if="!busca"/>

      </div>

    </div>
  </div>
</template>

<script>

import busca from './components/busca.vue'
import historico from './components/historico.vue'
export default {
  name: 'App',
  components: {
    busca,
    historico
  },
  data () {
    return {
      busca:true,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
