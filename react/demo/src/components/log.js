import React, { Component } from 'react'



export default function Log(WrappedComponent) {
    return class extends Component {
        componentDidUpdate(...args) {
            console.log(...args);
        }
        componentDidMount(){
            console.log('进入组件')
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}