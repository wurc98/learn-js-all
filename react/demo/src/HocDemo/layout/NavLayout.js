import React, { Component } from 'react'
import HeaderNav from './HeaderNav'
import LeftNav from './LeftNav'
import './layout.scss'
class NavLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className='layout'>
                <div className='header-nav'>
                    <HeaderNav />
                </div>
                <div className='content'>
                    <div className='left-nav'>
                        <LeftNav changePage={this.props.changePage} secendNav={this.props.secendNav} />
                    </div>
                    <div className='container'>{this.props.children}</div>
                </div>
            </div>
        )
    }
};
export default NavLayout;