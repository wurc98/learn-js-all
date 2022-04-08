import React, { Component } from 'react'
import TableHoc from './TableHoc'
import PageCommon from './PageCommon'
import { Button } from 'antd'


@TableHoc('page1')
class Page1 extends Component {
    columns = [
        { dataIndex: 'id', title: 'id' },
        { dataIndex: 'label', title: '标签' },
        { dataIndex: 'name', title: '名称' },
        {
            dataIndex: 'action', title: '操作', render: (_, record) => {
                const onOpen = () => window.open(`/xxx/${record.id}`);
                return <Button onClick={onOpen}>查看</Button>;
            }
        }
    ];
    query = [
        { label: 'id', modal: 'id' },
        { label: '标签', modal: 'label' },
        { label: '名称', modal: 'name' },
    ]
    render() {
        console.log(this.props.dataSource)
        return (
            <PageCommon {...this.props} columns={this.columns} query={this.query} />
        )
    }
}
export default Page1