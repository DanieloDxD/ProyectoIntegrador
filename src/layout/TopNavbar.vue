<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">EcoRoom</a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">Cerrar Sesión</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    routeName () {
      const {name} = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data () {
    return {
      activeNotifications: false
    };
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown () {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown () {
      this.activeNotifications = false;
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false);
    },
    logout () {
   
      // Si tienes otros elementos como userRole o deviceId, puedes eliminarlos también:
      localStorage.removeItem('userRole');
      localStorage.removeItem('deviceId');

      // Redirige al usuario a la vista de login
      this.$router.push('/login');
    }
  }
};
</script>
