<template>
  <div id="templateBusca">
    <div class="row form-group">
      <label for="linguagem" class="col-3 col-form-label">Linguagem: </label>
      <input type="text" class="form-control col-5" id="linguagem" aria-describedby="linguagem" placeholder="Digite a linguagem de programação desejada" v-model="linguagem"/>
    </div>
    <div class="row form-group">
      <label for="linguagem" class="col-3 col-form-label">Número de resultados:* <br/><small>*máximo 30</small></label>
      <input type="number" class="form-control col-1" id="numero" aria-describedby="número" v-model="numero"/>
    </div>
    <div class="row form-group">
      <div class="col-3"/>
      <button type="button" class="btn btn-danger col-6" v-on:click="enviar"> {{ textoBotao }}{{textoLinguagem}} no GitHub.*</button>
    </div>
    <div>
      <small>*Para esta versão sem autenticação do GitHub, as solicitações são limitadas a 10 por minuto</small>
    </div>
    <br/>
    <br/>
    <br/>

    <div v-if="repositorios.length > 0">
      <div class="row form-group">
        <div class="col-4" style="text-align:left;">
          <h3> Busca para: {{ linguagem }} </h3>
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-primary" v-on:click="salvar"> Salvar Resultados</button>
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
    name: 'Busca',
    components: {
      resultado
    },
    data () {
      return {
        linguagem:'',
        numero:'',
        repositorios:[]
      }
    },
    computed:{
      textoBotao () {
        let num = parseInt(this.numero)
        if (!isNaN(num)){
          if(num === 1){
            return 'Buscar o repositório mais popular '
          }else if(num > 30 || num < 1){
            return 'Não é possível buscar os '+this.numero+' repositórios mais famosos '
          } else {
            return 'Buscar os '+this.numero+' repositórios mais famosos'
          }
        }
        return 'Buscar os repositórios mais famosos '
      },
      textoLinguagem(){
        if(this.linguagem !== ''){
          return ' utilizando ' + this.linguagem
        }else{
          return ' '
        }
      }
    },
    methods:{
      enviar () {
        let num = parseInt(this.numero)
        if(this.linguagem === ''){
          Swal.fire({
            title: 'Erro!',
            text: 'Escolha uma linguagem',
            icon: 'error',
            confirmButtonText: 'fechar'
          })
        }else if(num < 1 || num  > 30 || isNaN(num)){
          Swal.fire({
            title: 'Erro!',
            text: 'Número de resultados inválido',
            icon: 'error',
            confirmButtonText: 'fechar'
          })
        } else {
          this.axios.get('https://api.github.com/search/repositories?q=LANGUAGE:'+this.linguagem+'&sort=stars&order=desc&per_page='+this.numero)
          .then(response => {
            var lista = []
            var i = 1
            if(response.data.items.length === 0){
              Swal.fire({
                title: 'Erro!',
                text: 'Não há repositórios com a linguagem '+this.linguagem,
                icon: 'error',
                confirmButtonText: 'fechar'
              })
            }

            response.data.items.forEach( item =>{
                lista.push({
                  'posicao': i,
                  'id':item.id,
                  'nome':item.name,
                  'url': item.html_url,
                  'estrelas':item.stargazers_count
                })
                i=i+1
            })

            this.repositorios= lista
          })
          .catch(erro => {
            Swal.fire({
              title: 'Erro!',
              text: 'Verifique se você não passou do limite de tentativas por minuto! ' + erro,
              icon: 'error',
              confirmButtonText: 'fechar'
            })
          })
        }
      },
      salvar () {
        this.axios.post('http://localhost:9000/salvar', {
          linguagem: this.linguagem,
          numero: this.numero,
          repositorios:this.repositorios
        })
        .then( () =>{
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
