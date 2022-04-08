import React from 'react'
import { Table } from 'antd'
import SearchBar from './SearchBar'


export default function PageCommon({ query, dataSource, onChange, columns }) {
    console.log(dataSource)
    return (<>
        <SearchBar value={query} onChange={onChange} />
        <Table columns={columns} dataSource={dataSource} />
    </>
    );
}