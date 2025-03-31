<template>
  <form @submit.prevent="Insertar" class="mt-4">
    <div v-for="titulo in labels" :key="titulo" class="form-group">
      <label>{{ titulo }}</label>
      <input type="text" v-model="json[titulo]" class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Insertar</button>
    <button type="button" class="btn btn-primary" @click="actualizar">Actualizar</button>
  </form>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true
    },
    json: {
      type: Object,
      required: true
    }
  },
  methods: {
    Insertar() {
      this.$emit('insertar', this.json);
    },
    actualizar() {
      this.$emit('actualizar', this.json, this.json.Id);
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
</style>
