import React from 'react'
import { Redirect } from 'react-router'
import ShoppingCartComponent from './ShoppingCartComponent'
import ShoppingCart from '../queries/ShoppingCart'

class CheckoutComponent extends React.Component {
    /// Initializing

    constructor(props) {
        super(props)

        this.selectedProducts = ShoppingCart.getCurrentProducts()

        this.handlePhoneNumberChanged = this.handlePhoneNumberChanged.bind(this)
        this.handleNameChanged = this.handleNameChanged.bind(this)
        this.handleLastNameChanged = this.handleLastNameChanged.bind(this)
        this.sendProductsOrder = this.sendProductsOrder.bind(this)
        this.handleOrderConfirmation = this.handleOrderConfirmation.bind(this)

        this.state = {
            name: '',
            lastName: '',
            phoneNumber: '',
            goToShoppingCart: false,
        }
    }

    /// Events

    handleNameChanged(event) {
        const name = event.target.value.trim()

        this.setState({
            name: name
        })
    }

    handleLastNameChanged(event) {
        const lastName = event.target.value.trim()

        this.setState({
            lastName: lastName
        })
    }

    handlePhoneNumberChanged(event) {
        const phoneNumber = event.target.value.trim()

        this.setState({
            phoneNumber: phoneNumber
        })
    }

    sendProductsOrder() {
        this.query = ShoppingCart.createProductsOrder({
            name: this.state.name,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            selectedProducts: this.selectedProducts,
        }).whenDataArrives(this.handleOrderConfirmation)
    }

    handleOrderConfirmation(data) {
        this.query = undefined
        
        ShoppingCart.clear()

        this.setState({
            goToShoppingCart: true,
        })
    }

    componentWillUnmount() {
        if(this.query !== undefined) {
            this.query.abort()
            this.query = undefined
        }
    }

    /// Rendering

    isValidForm() {
        return (
            this.state.name.length > 0
            &&
            this.state.lastName.length > 0
            &&
            this.state.phoneNumber.length > 0            
        )
    }

    render() {
        if(this.state.goToShoppingCart === true) {
            return <Redirect to="/"/>
        }

        const sendButtonDisabled = this.isValidForm() ? '' : ' disabled'

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <h5 className="center-align">Confirmá tu pedido.</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="offset-s2 col s8">
                        <ShoppingCartComponent
                            selectedProducts={this.selectedProducts}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="offset-s2 col s8">
                        <b className="left-align">Datos del pedido.</b>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field offset-s2 col s4">
                        <input 
                            value={this.state.name}
                            type="text"
                            className={'validate'}
                            onChange={this.handleNameChanged}
                        />
                      
                        <label className="active">Nombre</label>
                    </div>

                    <div className="input-field col s4">
                        <input 
                            value={this.state.lastName}
                            type="text"
                            className={'validate'}
                            onChange={this.handleLastNameChanged}
                        />
                      
                        <label className="active">Apellido</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field offset-s2 col s8">
                        <input 
                            value={this.state.phoneNumber}
                            type="text"
                            className={'validate'}
                            onChange={this.handlePhoneNumberChanged}
                        />
                      
                        <label className="active">Teléfono</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 right-align">
                        <button
                            className={"btn waves-effect waves-light" + sendButtonDisabled}
                            onClick={this.sendProductsOrder}
                        >
                            Confirmar el pedido
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CheckoutComponent