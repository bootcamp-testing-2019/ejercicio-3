import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from 'typeorm'
import {Units} from './Units'
import {Product} from './Product'

@Entity()
export class ProductType {

    constructor({name: name, units: units} = {name: undefined, units: undefined}) {
        this.name = name

        if(units !== undefined) {
            this.units = units
        }
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(type => Units)
    @JoinTable()
    units: Units[]

    @OneToMany(type => Product, product => product.productType)
    products: Product[]
}