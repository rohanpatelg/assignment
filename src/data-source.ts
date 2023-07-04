import 'reflect-metadata'
import { BaseEntity, DataSource, EntitySchema, EntityTarget, Entity, Repository } from 'typeorm'
import { Users } from './entity/user.entity'

const  AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rohanpatel',
    password: 'postrohan',
    database: 'rohanpatel',
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: [],
    subscribers: [],
})
export const initializeAppDataSource = () =>{
    AppDataSource.initialize().then(async () => {

        console.log('Connection to the database...')
    }).catch(error => console.log(error))
}
export const deleteAppDataSource = () =>{
    AppDataSource.destroy().then(async () => {
        console.log('Connection to the database is destroyed successfully');
    }).catch(error=>console.log(error));
}
export const getRepository = (entity:EntityTarget<any>):Repository<any> =>{
    return AppDataSource.getRepository(entity);
}
