import RemoteQuery from './RemoteQuery'

class Products
{
    static getAll() {
        const url = '/apiv1/products'

        return RemoteQuery.get(url)
    }
}

export default Products