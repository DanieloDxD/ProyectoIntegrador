<template>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
          <tr>
            <th v-for="etiqueta in encabezado" :key="etiqueta">{{ etiqueta }}</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="inf in info" :key="inf.idusuarios">
            <td v-for="c in claves" :key="c">{{ inf[c] }}</td>
            <td>
              <button class="btn btn-danger" @click="eliminar(inf.idusuarios)">Eliminar</button>
              <button class="btn btn-warning" @click="editar(inf)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  
  
  const emit = defineEmits(['eliminar', 'editar']);
  const props = defineProps(['encabezado', 'info', 'claves']);
  
  const eliminar = (id) => {
    emit('eliminar', id);
  };
  
  const editar = (inf) => {
    emit('editar', inf);
  };
  </script>
  
  <style scoped>
  .table {
    margin-top: 20px;
  }
  </style>