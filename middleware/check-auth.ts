export default function (context: any) {
  context.store.dispatch('initAuth', context.req)
}
