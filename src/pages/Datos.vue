<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <!-- Sensor 1 - Temperatura y Humedad -->
        <div v-for="(medicion, index) in medicionesSensor1" :key="'sensor1-' + index" class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" :class="`icon-${getIconClass(medicion.valor)}`">
              <i class="bi bi-thermometer" :class="`text-${getIconClass(medicion.valor)}`"></i>
            </div>
            <div slot="content">
              <p class="card-category">Sensor 1 - Temperatura</p>
              <h4 class="card-title">{{ medicion.valor }} °C</h4>
            </div>
            <div slot="footer">
              <div class="progress-bar-container">
                <div
                  class="progress-bar"
                  :style="{
                    width: `${calculateProgressPercentage(medicion.valor)}%`,
                    backgroundColor: getBarColor(medicion.valor)
                  }"
                ></div>
              </div>
            </div>
          </stats-card>
        </div>

        <!-- Sensor 2 - Calidad del Aire -->
        <div v-for="(medicion, index) in medicionesSensor2" :key="'sensor2-' + index" class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" :class="`icon-${getIconClass(medicion.valor)}`">
              <i class="bi bi-cloud-haze" :class="`text-${getIconClass(medicion.valor)}`"></i>
            </div>
            <div slot="content">
              <p class="card-category">Sensor 2 - Calidad del Aire</p>
              <h4 class="card-title">{{ medicion.valor }} ppm</h4>
            </div>
            <div slot="footer">
              <div class="progress-bar-container">
                <div
                  class="progress-bar"
                  :style="{
                    width: `${calculateProgressPercentage(medicion.valor)}%`,
                    backgroundColor: getBarColor(medicion.valor)
                  }"
                ></div>
              </div>
            </div>
          </stats-card>
        </div>
      </div>

      <!-- Alerta -->
      <div class="row mt-4">
        <div v-for="(alerta, index) in alertas" :key="'alerta-' + index" class="col-12">
          <div class="alert-card">
            <p class="alert-title">{{ alerta.valor }}</p>
            <p class="alert-time">{{ formatFecha(alerta.fecha) }} ---- {{ alerta.hora }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import StatsCard from 'src/components/Cards/StatsCard.vue';
import axios from 'axios';

export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      medicionesSensor1: [],
      medicionesSensor2: [], 
      alertas: [], 
      dispositivoId: localStorage.getItem('deviceId'),
      sensorId1: 1,
      sensorId2: 2,
    };
  },
  created() {
    this.getMedicionesSensor1(); // Obtener mediciones del Sensor 1 al cargar el componente
    this.getMedicionesSensor2(); // Obtener mediciones del Sensor 2 al cargar el componente
    this.getAlertas(); // Obtener alertas al cargar el componente
  },
  methods: {
    // Método para obtener los datos de mediciones del Sensor 1
    async getMedicionesSensor1() {
      try {
        const response = await axios.get(
          `https://apisproyecto-913g.onrender.com/api/mediciones/${this.dispositivoId}/${this.sensorId1}`
        );
        this.medicionesSensor1 = response.data.length > 0 ? response.data : [];
      } catch (error) {
        console.error("Error al obtener las mediciones del Sensor 1:", error);
        this.medicionesSensor1 = [];
      }
    },

    // Método para obtener los datos de mediciones del Sensor 2
    async getMedicionesSensor2() {
      try {
        const response = await axios.get(
          `https://apisproyecto-913g.onrender.com/api/mediciones/${this.dispositivoId}/${this.sensorId2}`
        );
        this.medicionesSensor2 = response.data.length > 0 ? response.data : [];
      } catch (error) {
        console.error("Error al obtener las mediciones del Sensor 2:", error);
        this.medicionesSensor2 = [];
      }
    },

    // Método para obtener las alertas
    async getAlertas() {
      try {
        const response = await axios.get(
          'https://apisproyecto-913g.onrender.com/api/selectTablas/alertas'
        );
        this.alertas = response.data.length > 0 ? response.data : [];
      } catch (error) {
        console.error("Error al obtener las alertas:", error);
        this.alertas = [];
      }
    },

    // Método para obtener el color del ícono dependiendo del valor
    getIconClass(valor) {
      if (valor <= 50) return 'warning';
      if (valor <= 100) return 'success';
      return 'danger';
    },

    // Método para obtener el color de la barra de progreso dependiendo del valor
    getBarColor(valor) {
      if (valor <= 50) return 'green';
      if (valor <= 100) return 'yellow';
      return 'red';
    },

    // Método para calcular el porcentaje de la barra de progreso
    calculateProgressPercentage(valor) {
      if (valor <= 50) return Math.min((valor / 50) * 100, 100);
      if (valor <= 100) return Math.min(((valor - 50) / 50) * 100, 100);
      return 100;
    },

    // Método para formatear la fecha de YYYY-MM-DD a DD de Mes de YYYY
    formatFecha(fechaHora) {
  if (!fechaHora) return '';
  
  // Separar la fecha de la hora
  const [fecha, hora] = fechaHora.split('T');
  const partes = fecha.split('-'); // Divide "YYYY-MM-DD"
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  
  if (partes.length === 3) {
    const fechaFormateada = `${partes[2]} de ${meses[parseInt(partes[1]) - 1]} de ${partes[0]}`; // Retorna "DD de Mes de YYYY"
    return `${fechaFormateada} ---- ${hora.split('.')[0]}`; // Agrega la hora sin milisegundos
  }
  
  return fechaHora;
}
  }
};
</script>

<style>
/* Estilos para el contenido */
.content {
  padding: 20px;
}

.container-fluid {
  margin: 0 auto;
}

.card-category {
  font-size: 14px;
  color: #999;
}

.card-title {
  font-size: 24px;
  margin: 0;
}

/* Estilos para la barra de progreso */
.progress-bar-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  height: 20px;
  margin-top: 10px;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

/* Estilos para las alertas */
.alert-card {
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 2px solid #f5c6cb;
  text-align: center;
}

.alert-title {
  font-size: 20px;
  font-weight: bold;
}

.alert-time {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}
</style>
