const req = require.context('./', false, /[^.]+\.vue/)
const componentsName = req.keys()
const components = componentsName.reduce((component, module) => {
    const mod = req(module)
    component[mod.default.name] = mod.default
    return component
}, {})

export { components, }