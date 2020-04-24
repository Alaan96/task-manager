import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ store, redirect }) => {
  const logged: boolean = store.state.user.logged
  const _id: string | null = localStorage.getItem('id')
  const token: string | null = localStorage.getItem('token')

  if (!logged || !_id || !token) {
    return redirect('/login')
  }
}

export default authenticated