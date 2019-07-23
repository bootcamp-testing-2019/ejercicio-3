import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import ProductsRequestComponent from './components/ProductsRequestComponent'
import CheckoutComponent from './components/CheckoutComponent'

function App() {
    return (
        <Router>

            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">Pedidos</a>
                    </div>
                </nav>
                
                <div id="main-container" className="container">

                    <Route path="/" exact component={ProductsRequestComponent} />
                    
                    <Route path="/checkout/" component={CheckoutComponent}/>
            
                </div>
            </div>
        </Router>
    )
}

export default App