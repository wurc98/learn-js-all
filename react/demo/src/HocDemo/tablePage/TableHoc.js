import React, { Component } from 'react'

export default function TableHoc(api) {
    return function (WrappedComponent) {
        return class extends Component {
            state = {
                dataSource: [],
                params:{}
            }
            onChange = (params) => {
                this.setState({
                    params:params
                })
                this.refresh()
            }
            refresh=()=>{
                if(api == 'page1'){
                    console.log('参数 :>> ', this.state.params);
                    this.setState({
                        dataSource:[
                            {
                                key:0,
                                label:'1',
                                name:'1',
                                id:'1'
                            },
                            {
                                key:1,
                                label:'2',
                                name:'2',
                                id:'2'
                            },
                            {
                                key:2,
                                label:'3',
                                name:'3',
                                id:'3'
                            },
                        ]
                    })
                }
            }
            componentDidMount() {
                this.refresh()
                console.log('包装组件', api)
            }
            render() {
                return <WrappedComponent onChange={this.onChange} {...this.props} {...this.state} />
            }
        }
    }
}