import RemoteQuery from './RemoteQuery'

class Units
{
    static getAll() {
        const url = '/apiv1/units'

        return RemoteQuery.get(url)
    }
}

export default Units