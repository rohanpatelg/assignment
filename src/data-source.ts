import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/User.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "rohanpatel",
    password: "postrohan",
    database: "rohanpatel",
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: [],
    subscribers: [],
})
AppDataSource.initialize().then(async () => {

    console.log("Connection to the database...")
    // const user = new Users();
    // user.id="1"
    // user.name = "Timber"
    // user.email = "Saw"
    // user.password = "25"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(Users)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
