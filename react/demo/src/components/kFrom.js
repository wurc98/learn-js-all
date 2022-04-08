import React, { Component } from 'react'
import { Input, Button } from 'antd'


function kFormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.sucFuc = null;
            this.errFuc = null;
            this.options = {};
            this.state = {};
        }

        handleChange = e => {
            const { name, value } = e.target;
            console.log(name, value);

            this.setState({ [name]: value }, () => {
                //   确保值发生变化再校验
                this.validateField(name);
            });
        }


        // 单项校验
        validateField = field => {
            // 1. 获取校验规则
            const rules = this.options[field].rules;
            // 任意一项失败则返回false
            const ret = !rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {
                        //校验失败
                        this.setState({
                            [field + "Message"]: rule.message
                        });
                        return true;
                    }
                }
                return false
            });

            if (ret) { // 校验成功
                this.setState({
                    [field + "Message"]: ""
                });
            }
            return ret;
        };

        // 创建input ，包装他
        getFieldDec = (field, option) => {
            this.options[field] = option;
            return InputComp => (
                <div>
                    {
                        React.cloneElement(InputComp, {
                            name: field,
                            value: this.state[field] || '',
                            onChange: this.handleChange
                        })
                    }
                    {this.state[field + 'Message'] && (
                        <p style={{ color: "red" }}>{this.state[field + 'Message']}</p>
                    )}
                </div>
            )
        }


        onSubmit = () => {
            console.log(this.options)
            let type = true
            Object.keys(this.options).map(value => {
                const v = this.validateField(value)
                if(!v){
                    type=false
                }
                return value
            })
            if (type) {
                this.sucFuc()
            }
        }
        // 创建Button ，包装他
        getSubmitDesc = (onSubmit) => {
            this.onSubmit = onSubmit
            return ButComp => (
                <div>
                    {
                        React.cloneElement(ButComp, {
                            onClick: this.onSubmit
                        })
                    }
                </div>
            )
        }

        validate = cb => {

        }

        render() {
            return (<Comp getFieldDec={this.getFieldDec} getSubmitDesc={this.getSubmitDesc} {...this.props} validate={this.validate} />)
        }
    }
}


@kFormCreate
class KForm extends Component {
    onSubmit = () => {
        console.log('success')
    }
    render() {
        console.log(this.props)
        const { getFieldDec, getSubmitDesc } = this.props
        return (
            <div>
                {
                    getFieldDec('uname', {
                        rules: [{ required: true, message: '用户必填' }]
                    })(<Input />)}
                {
                    getFieldDec('pwd', {
                        rules: [{ required: true, message: '密码必填' }]
                    })(<Input />)}

                {
                    getSubmitDesc(this.onSubmit)(<Button>登录</Button>)}
            </div>
        )
    }
}

export default KForm