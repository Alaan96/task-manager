<template>
  <header>
    <div class="icon-section">
      <cross v-if="active" :size="24"
        @click.native="active = false">
      </cross>
      <menu-icon v-if="!active"
        @click.native="active = true">
      </menu-icon>
      <span v-if="!active" class="nav-text">{{headerText}}</span>
      <span v-if="active" class="menu-text">Menú</span>
    </div>

    <div class="nav-menu"
    :class="{active}">

      <section>
      </section>

      <nav>
        <ul v-for="section in sections"
          :key="section.title">
          <span>{{section.title}}</span>
          <li v-for="link in section.links"
            :key="link.text">
            <nuxt-link :to="link.route"
              exact-active-class="selected">
              {{link.text}}
            </nuxt-link>
          </li>
        </ul>
      </nav>

      <div class="copyright">
        {{`Copyright - ${new Date().getFullYear()}`}}
      </div>

    </div>
  </header>
</template>

<script>
// Icons
import menu from '@/components/icons/menu'
import cross from '@/components/icons/cross'

export default {
  components: {
    'menu-icon': menu, // Icon
    cross // Icon
  },
  data() {
    return {
      active: false,

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
              text: 'Perfil',
              route: `/profile/${localStorage.getItem('id')}`
            },
            {
              text: 'Configuración',
              route: '/settings'
            }
          ]
        },
        {
          title: 'Aplicación',
          links: [
            {
              text: 'Acerca de',
              route: '/about'
            }
          ]
        }
      ],
    }
  },
  methods: {
    // changeHeaderText() {
    //   console.log('Cambiando texto de cabecera.')
    // }
  },
  computed: {
    headerText() {
      let text = 'Menú'
      console.log(this)

      return text
    }
    // message() {
    //   const hour = new Date().getHours()
    //   console.log(hour)
    //   if (hour > 5) {
    //     return 'Buenos días'
    //   } else if (hour > 16) {
    //     return 'Buenas tardes'
    //   } else {
    //     return 'Buenas noches'
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
$fade-in: fade-in .4s ease-in;

header {
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  // position: fixed;
  // top: 0;
  // left: 0;
  color: $primary;
  // z-index: 50;
  // background: $cancel;
  & svg {
    width: 1.5rem;
    animation: $fade-in;
  }
}


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
  box-shadow: .5rem 0 .5rem rgba(0, 0, 0, 0);

  transform: translateX(-$menu-width);
  transition: .4s ease;
}

.icon-section {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 100;
  // & svg {
  //   width: 2rem;
  // }
  & span {
    margin-left: .5rem;
    font-weight: 700;
    &.menu-text {
      animation: slide-to-right .4s ease;
    }
    &.nav-text {
      animation: slide-to-left .4s ease;
    }
  }
}

section {
  width: 100%;
  height: 3rem;
  background: $secondary;
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
        display: block;
        padding-left: 1rem;
        color: $black;
      }
    }
  }
}

.copyright {
  padding: .75rem 1rem;
  @include center;
  font-size: .75rem;
  border-top: 1px solid $secondary;
  color: $secondary;
}

.active {
  box-shadow: .5rem 0 .5rem rgba(0, 0, 0, 0.2);
  transform: translateX(0);
}

.selected {
  background: $secondary;
  color: $primary;
}

@keyframes fade-in {
  0% {
    transform: scale(.4);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slide-to-left {
  0% {
    transform: translateX(2rem);
    opacity: 0;
  }
  // 50% {
  //   transform: scale(1.2);
  // }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-to-right {
  0% {
    transform: translateX(-2rem);
    opacity: 0;
  }
  // 50% {
  //   transform: scale(1.2);
  // }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>