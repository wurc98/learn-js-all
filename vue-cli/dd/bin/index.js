#!/usr/bin/env node
const webpack = require('webpack')
const path = require('path')
const minimist = require('minimist')
const buildInWebpackConfig = require('../webpack.config');

const args = minimist(process.argv.slice(2))
class Api {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
    }
    registerCommands(name, impl) {
        const command = this.pluginManager.__commands[name]
        if (!command) {
            this.pluginManager.__commands[name] = impl
        }
    }
}
class PluginManager {
    constructor() {
        this.__commands = {};
        this.fname = 'dd.config.js';
    }
    runWebpackBuild = () => {
        webpack(buildInWebpackConfig, (err, status) => {
            if (err || status.hasErrors()) {
                return console.log('build failed')
            }
            console.log('build success')
        })
    }
}
const pluginManager = new PluginManager()


const api = new Api(pluginManager)

// 读取用户本地的配置文件  dd.config.js
const readLocalOption = () => new Promise((resolve) => {
    const config = require(path.join(process.cwd(), pluginManager.fname)) || {}
    const { plugins: { commands = [] } = {} } = config;
    if (commands.length) {
        commands.forEach(command => {
            command(api)
        });
    }

    resolve(pluginManager.__commands)

})

readLocalOption().then((commands) => {
    const command = args._[0]; // 取执行命令  dd clean
    if (commands[command]) {
        commands[command]();
    } else {
        pluginManager.runWebpackBuild()
    }

})
