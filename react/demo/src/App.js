
import React, { useState } from 'react'
import './App.css';
import NavLayout from './HocDemo/layout/NavLayout'
// import CartSamples from './components/CartSample';
// import KForm from './components/kFrom'
import Page1 from './HocDemo/tablePage/Page1'
import Page2 from './HocDemo/tablePage/Page2'
import Home from './HocDemo/tablePage/Home'


function App() {
  const [state, setstate] = useState('home')
  const [secendNav] = useState([
    {
      name: 'page1'
    },

    {
      name: 'page2'
    }
  ])
  const changePage = (el) => {
    switch (el.name) {
      case 'home':
        setstate(<Home />)
        break
      case 'page1':
        setstate(<Page1 />)
        break
      case 'page2':
        setstate(<Page2 />)
        break
      default:
        setstate(<Home />)
    }
  }
  return (
    <div className="App">
      {/* <CartSamples title="购物车"/> */}
      {/* <KForm /> */}
      <NavLayout changePage={changePage} secendNav={secendNav}>
        <div>{state}</div>
      </NavLayout>
    </div>
  );
}

export default App;
