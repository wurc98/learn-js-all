import React, { Component } from 'react'
import { Input } from 'antd'

class Sub extends Component {
    input = createRef()
    focus = () => { // focus ⽅法执⾏时会让 input 元素聚焦。 8 this.input.current.focus();
    }
    render() {

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
        this.input.current.focus(); // 调⽤⼦组件实例上的⽅法
    }
    onChange = e => {
        this.setState({ value: e.target.value });
    }
    render() {
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