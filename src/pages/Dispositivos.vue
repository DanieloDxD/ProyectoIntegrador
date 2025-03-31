<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <tablaDispositivos
        :encabezado='["Id","Ubicación",]'
        :claves="['iddispositivo','ubicacion']"
        :info="contenidoDispositivo" 
        @eliminar="EliminarDispositivo"
        @editar="mostrarDispositivo"
      />
    </div>
    
    <div class="ml-4" style="width: 300px;">
      <formulario
        :labels='["Ubicacion"]'
        :json="formDispositivo"
        @insertar="insertarDispositivo"
        @actualizar="ActualizarDispositivos"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import tablaDispositivos from '../components/Tabladispositivos.vue';
import formulario from '../components/formulario.vue';

const formDispositivo = ref({
  Id:'',
  Ubicacion: ''
});

const contenidoDispositivo = ref([]);

async function cambiar() {
  console.log("cambiar() llamado");
  const options = {
    method: 'GET',
    url: "https://apisproyecto-913g.onrender.com/api/selectTablas/dispositivo",
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.request(options);
    contenidoDispositivo.value = response.data;
  } catch (error) {
    console.error("error", error);
    return [{}];
  }
}

cambiar();

const EliminarDispositivo = async (id) => {
  const options = {
    method: 'DELETE',
    url: "https://apisproyecto-913g.onrender.com/api/eliminarDispositivos/" + id,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    await axios.request(options);
    cambiar();
  } catch (error) {
    console.error("Error", error);
  }
}

const insertarDispositivo = async (json) => {
  if (!json.Ubicacion) {
    console.error("La ubicación está vacía");
    return;
  }
  const options = {
    method: 'POST',
    url: "https://apisproyecto-913g.onrender.com/api/insertarDispositivo",
    headers: {
      'Content-Type': 'application/json',
    },
    data: json // Enviar los datos del formulario
  };

  try {
    const response = await axios.request(options);
    console.log(response.data); // Verificar si la respuesta es correcta
    cambiar(); // Actualiza la lista después de la inserción
  } catch (error) {
    console.error("Error al insertar dispositivo", error);
  }
};

const mostrarDispositivo = (inf) => {
  formDispositivo.value.Id = inf.iddispositivo;
  formDispositivo.value.Ubicacion = inf.ubicacion;
 
};

const ActualizarDispositivos = async (json, Id) => {
  console.log("Actualizando dispositivo con ID:", Id); 

  const options = {
    method: 'PUT', 
    url: 'https://apisproyecto-913g.onrender.com/api/actualizarDispositivo/' +Id,
    headers: {
      'Content-Type': 'application/json',
    },
    data: json,
  };

  try {
    await axios.request(options);
    cambiar();
  } catch (error) {
    console.error("Error al actualizar:", error);
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
}
.ml-4 {
  margin-left: 1.5rem; /* Ajusta según sea necesario */
}
</style>
