export default ({ store, redirect, route }) => {
  if (!store.state.authenticated && route.name !== 'login')
    redirect({ name: 'login' })
}
