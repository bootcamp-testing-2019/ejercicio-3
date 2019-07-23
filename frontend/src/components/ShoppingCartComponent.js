import React from 'react'

class ShoppingCartComponent extends React.Component {
    /// Rendering
    
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.renderProducts()}
                </tbody>
            </table>
        )
    }

    renderProducts() {
        return this.props.selectedProducts.map( (productRequest, i) => {
            const removeButton = this.props.onRemoveClicked === undefined ? '' :
                <a className="btn-small waves-effect waves-light red" onClick={() => this.props.onRemoveClicked({index: i})}><i className="material-icons center">remove_circle</i></a>
    
            return (
                <tr key={i}>
                    <td>{productRequest.product.name}</td>
                    <td>{productRequest.amount} {productRequest.unit.name}</td>
                    <td>
                        {removeButton}
                    </td>
                </tr>
            )
        })
    }
}

export default ShoppingCartComponent