import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {ProductType} from './ProductType'
import {Units} from './Units'
import {ProductsOrder} from './ProductsOrder'

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => ProductType, productType => productType.products)
    productType: ProductType

    @Column()
    amount: number

    @ManyToOne(type => Units, units => units.products)
    units: Units

    @ManyToOne(type => ProductsOrder, order => order.products)
    order: ProductsOrder
}