import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Product} from './Product'

@Entity()
export class ProductsOrder {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'datetime' })
    time: Date

    @OneToMany(type => Product, product => product.order)
    products: Product[]

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    phoneNumber: string

    constructor() {
        this.time = new Date()
    }
}