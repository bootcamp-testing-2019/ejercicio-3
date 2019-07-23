import React from 'react'
import Products from '../queries/Products'
import Units from '../queries/Units'

class AddItemFormComponent extends React.Component {
    /// Initializing

    constructor(props) {
        super(props)
    
        // Handlers

        this.handleAddProduct = this.handleAddProduct.bind(this)
        this.handleSelectedProductChanged = this.handleSelectedProductChanged.bind(this)
        this.handleselectedUnitChanged = this.handleselectedUnitChanged.bind(this)
        this.handleSelectedAmountChanged = this.handleSelectedAmountChanged.bind(this)

        // Constants
        
        this.unselectedUnit = {id: 0, name: ''}
        this.unselectedProduct = {id: 0, name: '', units: []}
        
        this.state = {
            selectedProduct: this.unselectedProduct,
            selectedAmount: 0,
            selectedUnit: this.unselectedUnit,
            allProducts: [],
            allUnits: [],
        }
    }

    initializeDropDowns() {
        const M = window.M

        const elems = document.querySelectorAll('select')
        M.FormSelect.init(elems)
    }

    updateProducts(products) {
        this.setState({
            allProducts: products
        })
    }

    updateUnits(units) {
        this.setState({
            allUnits: units
        })
    }

    /// Events

    componentDidMount() {
        this.initializeDropDowns()

        this.productsQuery = Products.getAll()
            .whenDataArrives( (data) => {
                this.updateProducts(data.products)
            })

        this.unitsQuery = Units.getAll()
            .whenDataArrives( (data) => {
                this.updateUnits(data.units)
            })
    }

    componentDidUpdate() {
        this.initializeDropDowns()
    }

    componentWillUnmount() {
        this.productsQuery.abort()
    }

    handleAddProduct(event) {
        event.preventDefault()

        const productRequest = {
            product: this.state.selectedProduct,
            amount: this.state.selectedAmount,
            unit: this.state.selectedUnit,
        }
        
        this.props.addProduct(productRequest)
    }
    
    handleSelectedProductChanged(event) {
        const selectedProductId = parseInt(event.target.value)
        
        let selectedProduct = this.state.allProducts.find( (product) => {
            return product.id === selectedProductId
        })

        if(selectedProduct === undefined) {
            selectedProduct = this.unselectedProduct
        }

        this.setState({
            selectedProduct: selectedProduct,
            selectedUnit: this.unselectedUnit,
        })
    }

    handleSelectedAmountChanged(event) {
        const selectedAmount = parseInt(event.target.value)

        this.setState({
            selectedAmount: selectedAmount
        })
    }

    handleselectedUnitChanged(event) {
        const selectedUnitId = parseInt(event.target.value)

        let selectedUnit = this.state.allUnits.find( (unit) => {
            return unit.id === selectedUnitId
        })

        if(selectedUnit === undefined) {
            selectedUnit = this.unselectedUnit
        }

        this.setState({
            selectedUnit: selectedUnit
        })
    }

    /// Rendering

    isValidProductRequest() {
        return  this.state.selectedProduct.id !== 0 &&
                this.state.selectedUnit.id !== 0 &&
                this.state.selectedAmount > 0
    }

    render() {
        const selectedProduct = this.state.selectedProduct
        const selectedUnit = this.state.selectedUnit
        const addDisabled = this.isValidProductRequest() ? '' : ' disabled'

        return (
            <form onSubmit={this.handleAddProduct}>
                <div className="row">
                    <div className="input-field col s6">
                        <select value={selectedProduct.id} onChange={this.handleSelectedProductChanged} >
                            {this.renderAvailableProducts()}
                        </select>

                        <label>Producto</label>
                    </div>

                    <div className="input-field col s2">
                        <input 
                            value={this.state.selectedAmount}
                            type="number"
                            className="validate"
                            onChange={this.handleSelectedAmountChanged}
                        />
                      
                        <label className="active">Cantidad</label>
                    </div>

                    <div className="input-field col s3">
                        <select value={selectedUnit.id} onChange={this.handleselectedUnitChanged} >
                            {this.renderAvailableUnits()}
                        </select>

                        <label>Unidad</label>
                    </div>
                </div>


                <div className="row">
                    <div className="col s12 right-align">
                        <button
                            className={"btn waves-effect waves-light" + addDisabled} 
                            type="submit"
                        >
                            Agregar al pedido
                        </button>
                    </div>
                </div>
              </form>
        )
    }

    renderAvailableProducts() {
        const availableProducts = [this.unselectedProduct].concat(this.state.allProducts)

        return availableProducts.map( (product) => {    
            const disabled = product.id === 0

            return <option key={product.id} value={product.id} disabled={disabled} >{product.name}</option>
        })
    }

    renderAvailableUnits() {
        const availableUnits = [this.unselectedUnit].concat(this.state.selectedProduct.units)

        return availableUnits.map( (unit) => {
            const disabled = unit.id === 0

            return (
                <option 
                    key={unit.id}
                    value={unit.id}
                    disabled={disabled}
                >
                    {unit.name}
                </option>
            )
        })
    }
}

export default AddItemFormComponent