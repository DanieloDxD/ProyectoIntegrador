<template>
  <card>
    <div class="d-flex flex-column">
      <div class="flex-grow-1 table-container">
        <tabla
          :encabezado='["Id","Id_dispositivo","Nombre","Apellido","Correo","Usuario","Contraseña","Tipo","Botones"]'
          :claves="['idusuarios','dispositivo_iddispositivo','nombre','apellido','correo','usuario','contrasenia','tipo']"
          :info="contenidoUsuarios" 
          @eliminar="EliminarUsuarios"
          @editar="mostrarUsuario"
        />
      </div>
      
      <div class="mt-4" style="width: 300px;">
        <formulario
          :labels='["Id_dispositivo","Nombre","Apellido","Correo","Usuario","Contraseña","Tipo"]'
          :json="formUsuario"
          @insertar="insertarUsuario"
          @actualizar="ActualizarUsuarios"
        />
      </div>
    </div>
  </card>
</template>

<script>
import axios from 'axios';
import Card from 'src/components/Cards/Card.vue';
import tabla from 'src/components/SidebarPlugin/tabla.vue';
import formulario from 'src/components/formulario.vue';

export default {
  components: {
    Card,
    tabla,
    formulario
  },
  data() {
    return {
      formUsuario: {
        Id: '',
        Id_dispositivo: '',
        Nombre: '',
        Apellido: '',
        Correo: '',
        Usuario: '',
        Contraseña: '',
        Tipo: ''
      },
      contenidoUsuarios: [],
      mensaje: ''
    };
  },
  methods: {
    async cambiar() {
      const options = {
        method: 'GET',
        url: "https://apisproyecto-913g.onrender.com/api/selectTablas/usuarios",
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.request(options);
        this.contenidoUsuarios = response.data;
      } catch (error) {
        console.error("error", error);
        this.contenidoUsuarios = [{}];
      }
    },
    async EliminarUsuarios(id) {
      const options = {
        method: 'DELETE',
        url: "https://apisproyecto-913g.onrender.com/api/eliminarUsuarios/" + id,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        await axios.request(options);
        this.cambiar();
      } catch (error) {
        console.error("Error", error);
      }
    },
    async insertarUsuario(json) {
      const options = {
        method: 'POST',
        url: "https://apisproyecto-913g.onrender.com/api/insertarUsuario",
        headers: {
          'Content-Type': 'application/json',
        },
        data: json
      };

      try {
        await axios.request(options);
        this.mensaje = 'Usuario insertado con éxito';
        this.cambiar();
      } catch (error) {
        console.error("Error", error);
        this.mensaje = 'Error al insertar usuario';
      }
    },
    mostrarUsuario(inf) {
      this.formUsuario.Id = inf.idusuarios;
      this.formUsuario.Id_dispositivo = inf.dispositivo_iddispositivo;
      this.formUsuario.Nombre = inf.nombre;
      this.formUsuario.Apellido = inf.apellido;
      this.formUsuario.Correo = inf.correo;
      this.formUsuario.Usuario = inf.usuario;
      this.formUsuario.Contraseña = inf.contrasenia;
      this.formUsuario.Tipo = inf.tipo;
    },
    async ActualizarUsuarios(json, Id) {
      const options = {
        method: 'PUT', 
        url: 'https://apisproyecto-913g.onrender.com/api/actualizarUsuarios/' + Id,
        headers: {
          'Content-Type': 'application/json',
        },
        data: json,
      };

      try {
        await axios.request(options);
        this.mensaje = 'Usuario actualizado con éxito';
        this.cambiar();
      } catch (error) {
        console.error("Error al actualizar:", error);
        this.mensaje = 'Error al actualizar usuario';
      }
    }
  },
  mounted() {
    this.cambiar();
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
.table-container {
  overflow-x: auto; /* Agrega scrollbar horizontal si la tabla es más ancha que el contenedor */
  max-width: 100%; /* Asegura que la tabla no se salga del contenedor */
}
</style>
