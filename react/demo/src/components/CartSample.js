import React, { Component } from 'react'


export default class CartSamples extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goods: [
                {
                    id: '1',
                    text: '商品1'
                },
                {
                    id: '2',
                    text: '商品2'
                }
            ],
            shoppingCar: [],
            text: '',
        }
        this.addGood = this.addGood.bind(this)
    }
    textChange = e => {
        this.setState({
            text: e.target.value
        })
    }
    addGood() {
        this.setState(preState => {
            return {
                goods: [
                    ...preState.goods,
                    {
                        id: preState.goods[preState.goods.length - 1].id + 1,
                        text: preState.text
                    }
                ]
            }
        })
    }
    addToCart = good => {
        let shoppingCar = [...this.state.shoppingCar]
        const item = shoppingCar.find(item => item.id === good.id)
        if (item) {
            item.count++
        } else {
            good.count = 1
            shoppingCar.push(good)
        }
        this.setState({
            shoppingCar
        })
    }
    add = good => {
        console.log(good);
        this.setState({

        });
    }
    reduce = good => {
        console.log(good);
    }
    render() {
        const { title } = this.props;
        return (
            <div>
                {title && <h1>{title}</h1>}
                <input onChange={this.textChange}></input><button onClick={this.addGood}>添加商品</button>
                <ul>
                    {
                        this.state.goods.map(good => (
                            <li key={good.id}>
                                {good.text}
                                <button onClick={() => this.addToCart(good)}>加购</button>
                            </li>
                        ))
                    }
                </ul>
                <Cart data={this.state.shoppingCar} add={this.add} reduce={this.reduce}></Cart>
            </div>
        )
    }
}


function Cart({ data, reduce, add }) {
    return (
        <table>
            <tbody>
                {
                    data.map(d => (
                        <tr key={d.id + 'car'}>
                            <td>{d.text}</td>
                            <td>
                                <button onClick={() => reduce(d)}>-</button>
                                {d.count}
                                <button onClick={() => add(d)}>+</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}