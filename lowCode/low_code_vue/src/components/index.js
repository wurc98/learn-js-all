const req = require.context('./', false, /[^.]+\.vue/)
const reqPaser = require.context('./', false, /parser-[^.]+\.js/)
const componentsName = req.keys()
const components = componentsName.reduce((component, module) => {
    console.log(component, module)
    const mod = req(module)
    console.log(mod)
    component[mod.default.name] = mod.default
    return component
}, {})

const parserName = reqPaser.keys()
console.log(parserName)
const parsers = parserName.reduce((parser, module) => {
    console.log(parser, module)
    const mod = reqPaser(module)
    parser[mod.default.name] = mod.default
    return parser
}, {})
export { components, parsers } 