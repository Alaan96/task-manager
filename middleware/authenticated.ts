import { Middleware } from '@nuxt/types'

const authentication: Middleware = ({ store, redirect }) => {
  if (!store.state.user.logged) {
    return redirect('/login')
  }
}

export default authentication