<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/Principal">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Home</p>
      </sidebar-link>

      <sidebar-link to="/admin/Datos">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Información</p>
      </sidebar-link>
      
      
      <sidebar-link v-if="isAdmin" to="/admin/Usuarios">
        <i class="nc-icon nc-circle-09"></i>
        <p>Usuarios</p>
      </sidebar-link>
      
      
      <sidebar-link v-if="isAdmin" to="/admin/Dispositivos">
        <i class="nc-icon nc-paper-2"></i>
        <p>Dispositivos</p>
      </sidebar-link>
      
      <sidebar-link to="/admin/Mapa">
        <i class="nc-icon nc-pin-3"></i>
        <p>Mapas</p>
      </sidebar-link>
    

      <template slot="bottom-links">
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    computed: {
      // Verificar si el rol del usuario es 'admin'
      isAdmin() {
        return localStorage.getItem('userRole') === 'Administrador';
      }
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }
</script>

<style lang="scss">
  /* Aquí va tu estilo personalizado */
</style>
