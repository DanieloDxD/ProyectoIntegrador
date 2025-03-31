<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th v-for="etiqueta in encabezado" :key="etiqueta">{{ etiqueta }}</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inf in info" :key="inf.iddispositivo">
          <td v-for="c in claves" :key="c">{{ inf[c] }}</td>
          <td>
            <button class="btn btn-danger" @click="eliminar(inf.iddispositivo)">Eliminar</button>
            <button class="btn btn-warning" @click="editar(inf)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    encabezado: {
      type: Array,
      required: true
    },
    info: {
      type: Array,
      required: true
    },
    claves: {
      type: Array,
      required: true
    }
  },
  methods: {
    eliminar(id) {
      this.$emit('eliminar', id);
    },
    editar(inf) {
      this.$emit('editar', inf);
    }
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
