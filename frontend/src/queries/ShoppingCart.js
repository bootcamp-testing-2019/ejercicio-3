import RemoteQuery from './RemoteQuery'

class ShoppingCart
{
    static getCurrentProducts() {
        const storageString = localStorage.getItem('shoppingCartProducts')

        return JSON.parse(storageString)
    }

    static setCurrentProducts(shoppingCartProducts) {
        const storageString = JSON.stringify(shoppingCartProducts)

        localStorage.setItem('shoppingCartProducts', storageString)
    }

    static clear() {
        this.setCurrentProducts([])
    }

    static createProductsOrder(orderRequest) {
        const url = '/apiv1/shopping-cart/create-order'

        return RemoteQuery.post(url, orderRequest)
    }
}

export default ShoppingCart