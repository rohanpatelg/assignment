import { AppDataSource } from "./data-source"
import { Users } from "./entity/User.entity";
import express from 'express';
const app = express();
app.listen(3000);
app.get('/',async (req,res)=>{
    const user = new Users();
    user.id="2"
    user.name = "Timber"
    user.email = "Saw"
    user.password = "25"
    await AppDataSource.manager.save(user);

    res.send("HI")
})

