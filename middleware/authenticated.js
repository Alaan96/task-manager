export default ({store, redirect}) => {
  if (!store.state.user.logged) {
    console.log(store.state.user.logged)
    return redirect('/login')
  }
}