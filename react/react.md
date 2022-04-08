

# class使用装饰器传递参数报错的问题！
* 原代码
```js
@TableHoc(123)
class Page1 extends Component {
    columns = [
        { dataIndex: 'label', title: '标签' },
        {
            dataIndex: 'action', title: '操作', render: (_, record) => {
                const onOpen = () => window.open(`/xxx/${record.id}`);
                return <Button onClick={onOpen}>查看</Button>;
            }
        }]
    render() {
        return (
            <PageCommon {...this.props} columns={this.columns} />
        )
    }
}
export default Page1
```

```js
import React, { Component } from 'react'
export default function TableHoc(WrappedComponent,api){
        return class extends Component{
            state = {
                dataSouce:[]
            }
            onChange(params){
                console.log(params)
            }
            componentDidMount(){
                console.log('包装组件',api)
            }
            render(){
                return <WrappedComponent onChange={this.onChange} {...this.props} {...this.state}/>
            }
        }
}
```
* 报错！  Cannot call a class as a function！！

* 修改！
```js
import React, { Component } from 'react'
export default function TableHoc(api){
    return function (WrappedComponent){
        return class extends Component{
            state = {
                dataSouce:[]
            }
            onChange(params){
                console.log(params)
            }
            componentDidMount(){
                console.log('包装组件',api)
            }
            render(){
                return <WrappedComponent onChange={this.onChange} {...this.props} {...this.state}/>
            }
        }
    }
}
```
- 解析，class用@的方式使用装饰器，需要将额外报装一层function用来传递参数，不能直接返回class