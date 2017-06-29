export function MockedProvider(name, methods) {
  function Provider(context) {
    context[name] = methods

    return context
  }

  return Provider
}
