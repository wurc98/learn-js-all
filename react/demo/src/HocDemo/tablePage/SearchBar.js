import React, { useState } from 'react'
import { Button, Input } from 'antd';
export default function SearchBar(props) {
    const paramsDefault = {}
    props.value.map(el => {
        paramsDefault[el.modal] = ''
    })
    const [params, setParams] = useState({ ...paramsDefault })
    const changeValue = (e, modal) => {
        let obj = { ...params }
        obj[modal] = e.target.value
        setParams({ ...obj })
    }
    return (
        <div>
            {props.value.map((el, index) => (
                <div key={index}>{el.label}:<Input onChange={(e) => changeValue(e, el.modal)} /></div>
            ))}
            <Button onClick={() => props.onChange(params)}>搜索</Button>
        </div>
    )
}