import 'reflect-metadata'
import { DataSource, EntityTarget, Repository } from 'typeorm'
import { Users } from './entity/user.entity'
import dotenv from 'dotenv'
dotenv.config();
export const  AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || ' ',
    password: process.env.DB_PASSWORD || ' ',
    database: process.env.DB_DATABASE || ' ',
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: [],
    subscribers: [],
})
export const initializeAppDataSource =async () =>{
   await  AppDataSource.initialize().then(async () => {

        console.log('Connection to the database...')
    }).catch(error => console.log(error))
}
export const deleteAppDataSource = async () =>{
    await AppDataSource.destroy().then(async () => {
        console.log('Connection to the database is destroyed successfully');
    }).catch(error=>console.log(error));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRepository = (entity:EntityTarget<any>):Repository<any> =>{
    try{

        return AppDataSource.getRepository(entity);
    }catch(error){
        console.log('No such repository exist',error);
    }
}
