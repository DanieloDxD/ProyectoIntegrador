<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="text-center mb-4">
        <i class="bi bi-cloud-sun-fill user-icon"></i>
        <h2 class="fw-bold">Iniciar Sesión</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <!-- Campo de Usuario -->
        <div class="mb-4">
          <label class="form-label">Usuario</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-person"></i></span>
            <input v-model="usuario" type="text" class="form-control" placeholder="Ingresa tu usuario" />
          </div>
          <div v-if="errors.usuario" class="text-danger small mt-1">{{ errors.usuario }}</div>
        </div>

        <!-- Campo de Contraseña -->
        <div class="mb-4">
          <label class="form-label">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input v-model="password" type="password" class="form-control" placeholder="Ingresa tu contraseña" />
          </div>
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
        </div>

        <button type="submit" class="btn btn-success w-100" :disabled="isLoading">Ingresar</button>
        <div v-if="isLoading" class="text-center mt-2">Cargando...</div>
        <div v-if="apiError" class="text-danger small mt-2 text-center">{{ apiError }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: '',
      password: '',
      errors: {},
      apiError: '',
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.errors = {};
      this.apiError = '';
      this.isLoading = true;

      if (!this.usuario) {
        this.errors.usuario = 'El usuario es obligatorio';
      }
      if (!this.password) {
        this.errors.password = 'La contraseña es obligatoria';
      }
      if (Object.keys(this.errors).length) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await fetch('https://apisproyecto-913g.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Usuario: this.usuario, Contrasenia: this.password })
        });

        const data = await response.json();

        if (!data.exito) {
          throw new Error(data.mensaje || 'Error al iniciar sesión');
        }

        console.log('Login exitoso:', data.usuario);

        localStorage.setItem('userRole', data.usuario.tipo);
        localStorage.setItem('deviceId', data.usuario.dispositivo_iddispositivo);

        this.$router.push({ name: 'Datos' });

      } catch (error) {
        this.apiError = error.message || 'Error al iniciar sesión';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #a8e063, #56ab2f); /* Colores verdes para transmitir frescura y ecología */
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-icon {
  font-size: 5rem;
  color: #56ab2f; /* Verde para el tema de ecología */
}

.form-control {
  border-radius: 12px;
  transition: 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #56ab2f;
  box-shadow: 0 0 8px rgba(86, 171, 47, 0.6); /* Efecto verde suave al hacer foco */
}

.input-group-text {
  background: #56ab2f;
  color: white;
  border-radius: 12px;
}

.btn-success {
  border-radius: 12px;
  background-color: #56ab2f;
  border: none;
  transition: 0.3s ease;
}

.btn-success:hover {
  background-color: #489d26; /* Un verde más oscuro para el hover */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.text-center {
  font-size: 0.875rem;
  color: #6c757d;
}

.text-danger {
  color: #e74c3c;
}

.small {
  font-size: 0.875rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
