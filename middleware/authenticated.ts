import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ store, redirect }) => {
  const logged: boolean = store.state.user.logged
  if (!logged) {
    return redirect('/login')
  }
}

export default authenticated