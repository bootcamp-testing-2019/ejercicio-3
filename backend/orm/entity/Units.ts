import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Product} from './Product'

@Entity()
export class Units {

    constructor({name: name} = {name: undefined}) {
        this.name = name
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Product, product => product.units)
    products: Product[]
}