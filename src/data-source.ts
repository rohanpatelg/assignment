import 'reflect-metadata'
import { DataSource, EntityTarget, Repository } from 'typeorm'
import { Users } from '../src/entity/user.entity'
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
/**
 * @param {EntityTarget<any>} entity - The entity target.
 * @returns {Repository<any>} - The repository for the given entity.
 */
export const getRepository = (entity:EntityTarget<any>):Repository<any> =>{
    try{

        return AppDataSource.getRepository(entity);
    }catch(error){
        console.log('No such repository exist',error);
    }
}
