import React, { Component } from 'react'
export default class LeftNav extends Component {
    render() {
        return (
            <ul className="left-nav-list">
                {
                    this.props.secendNav.map((el, index) => {
                        return (
                            <li onClick={()=>{this.props.changePage(el)}} key={el.name+index}>{el.name}</li>
                        )
                    })
                }
            </ul>
        )
    }
};
