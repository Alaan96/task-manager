<template>
  <div class="nav-menu"
    @click="active = !active">
    <header>
      {{message}}
    </header>

    <nav>
      <ul v-for="section in sections"
        :key="section.title">
        <span>{{section.title}}</span>
        <li v-for="link in section.links"
          :key="link.text">
          <nuxt-link :to="link.route">{{link.text}}</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="copyright">
      {{`Copyright - ${new Date().getFullYear()}`}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,

      message: 'Buenas tardes',

      sections: [
        {
          title: 'Vistas',
          links: [
            {
              text: 'Diaria',
              route: '/'
            },
            {
              text: 'Calendario',
              route: '/calendar'
            }
          ]
        },
        {
          title: 'Personal',
          links: [
            {
              text: 'Cuenta',
              route: '/5e0a9c0b795ac20b9caa3342'
            },
            {
              text: 'Configuración',
              route: '/config'
            }
          ]
        },
        {
          title: 'Aplicación',
          links: [
            {
              text: 'Acerca de',
              route: '/application'
            }
          ]
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
$menu-width: 10rem;
.nav-menu {
  width: $menu-width;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: $primary;
  color: $black;
  box-shadow: .5rem 0 .5rem rgba(0, 0, 0, 0.2);

  transform: translateX(0);
}

header {
  width: 100%;
  padding: .75rem;
  @include center;
  color: $secondary;
  font-weight: 700;
}

nav {
  flex: 1;
  width: 100%;
  margin: .5rem 0;

  & ul {
    width: inherit;
    margin-bottom: 2rem;
    & span {
      margin-left: 1.25rem;
      font-size: .75rem;
    }

    & li {
      width: inherit;
      height: 2rem;
      margin-top: .25rem;
      background: $gray;

      & a {
        padding-left: 1rem;
        color: $black;
      }
    }
  }
}

.copyright {
  // width: 100%;
  padding: .75rem 1rem;
  @include center;
  font-size: .75rem;
  border-top: 1px solid $secondary;
  color: $secondary;
}

.active {
  transform: translateX(-$menu-width);
  }
</style>