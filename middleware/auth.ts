export default function (context: any) {
  const isAuthenticated = context.store.getters.isAuthenticated
  if (!isAuthenticated) {
    context.redirect('/admin/auth')
  }
}
