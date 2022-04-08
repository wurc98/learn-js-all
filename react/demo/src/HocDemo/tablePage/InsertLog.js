import React, { Component, forwardRef } from 'react'


export default function InsertLog(WrappedComponent) {
    class Logs extends Component {
        componentDidMount() {
            console.log('插入日志')
        }
        componentDidUpdate(...args) {
            console.log(...args)
        }
        render() {
            const { forwardRef, ...props } = this.props
            return (
                <WrappedComponent {...props} ref={forwardRef}></WrappedComponent>
            )
        }
    }
    return forwardRef((props, ref) => <Logs {...props} forwardRef={ref} />)
}