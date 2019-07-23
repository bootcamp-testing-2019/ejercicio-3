import React from 'react'
import { Redirect } from 'react-router'
import ShoppingCart from '../queries/ShoppingCart'
import AddItemFormComponent from './AddItemFormComponent'
import ShoppingCartComponent from './ShoppingCartComponent'

class ProductsRequestComponent extends React.Component {
    
    /// Initializing

    constructor(props) {
        super(props)

        this.addProduct = this.addProduct.bind(this)
        this.goToCheckout = this.goToCheckout.bind(this)
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this)

        const selectedProducts = ShoppingCart.getCurrentProducts()

        this.state = {
            selectedProducts: selectedProducts === null ? [] : selectedProducts,
            checkout: false,
        }
    }

    /// Events

    updateShoppingCart(shoppingCart) {
       this.setState({
            selectedProducts: shoppingCart.products
        }) 
    }

    addProduct(productRequest) {
        const newProducts = this.state.selectedProducts.concat([productRequest])

        ShoppingCart.setCurrentProducts(newProducts)

        this.setState({
            selectedProducts: newProducts
        })
    }

    goToCheckout() {
        this.setState({
            checkout: true
        })
    }

    handleRemoveProduct({index: index}) {
        const newProducts = this.state.selectedProducts.filter( (item, i) => {
            return i !== index
        })

        ShoppingCart.setCurrentProducts(newProducts)

        this.setState({
            selectedProducts: newProducts
        })
    }

    /// Rendering

    render() {
        if(this.state.checkout === true) {
            return <Redirect to="/checkout"/>
        }

        const checkoutButtonDisabled = this.state.selectedProducts.length > 0 ? '' : ' disabled'

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <h5 className="center-align">Hacé tu pedido.</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="offset-s2 col s8">
                        <AddItemFormComponent
                            addProduct={this.addProduct}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="offset-s2 col s8">
                        <ShoppingCartComponent
                            selectedProducts={this.state.selectedProducts}
                            onRemoveClicked={this.handleRemoveProduct}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 right-align">
                        <button
                            className={"btn waves-effect waves-light" + checkoutButtonDisabled}
                            onClick={this.goToCheckout}
                        >
                            Hacer el pedido
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductsRequestComponent