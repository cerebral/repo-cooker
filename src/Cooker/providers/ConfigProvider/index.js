export function ConfigProvider(config) {
  function ConfigProvider(context) {
    context.config = config

    return context
  }

  return ConfigProvider
}
