<template>
  <div>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th class="col-1">Posição</th>
          <th class="col-1">id</th>
          <th class="col-2">nome</th>
          <th class="col-7">url</th>
          <th class="col-1">estrelas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="repositorio in repositorios" :key="repositorio.id">
          <td>{{repositorio.posicao}}º</td>
          <td>{{repositorio.id}}</td>
          <td>{{repositorio.nome}}</td>
          <td><a v-bind:href="repositorio.url" target="blank">{{repositorio.url}}</a></td>
          <td>{{repositorio.estrelas}}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: 'Resultado',
  props: {
    repositorios: Array
  }
}
</script>
