import React, { Component, createRef } from 'react'
import InsertLog from './InsertLog'

@InsertLog
class Sub extends Component {
    input = createRef()
    focus = () => { // focus ⽅法执⾏时会让 input 元素聚焦。
        this.input.current.focus(); 
    }
    render() {
        console.log(this.input)  // input
        return <>
            <input {...this.props} ref={this.input} />;
        </>
    }
}
export default class Parent extends Component {
    state = {
        value: ''
    }
    input = createRef() // 引⽤⼦组件实例，便于调⽤实例上的⽅法
    onFocus = () => {
        console.log(this.input) 
        this.input.current.focus(); // 调⽤⼦组件实例上的⽅法
    }
    onChange = e => {
        this.setState({ value: e.target.value });
    }
    render() {
        console.log(this.input)  // 子组件
        return <>
            <Sub
                onChange={this.onChange}
                value={this.state.value}
                ref={this.input}
            />
            <button onClick={this.onFocus}>点击聚焦</button>
        </>;
    }
}