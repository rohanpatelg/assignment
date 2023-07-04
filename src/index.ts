import { initializeAppDataSource,deleteAppDataSource } from './data-source'
import { Users } from './entity/user.entity';
import { UsersRepository } from './repository/user.repository';
import express from 'express';
import router from './routes/user.routes';
const app = express();
app.use(express.json());
initializeAppDataSource();
app.use('/',router)
app.listen(3000);


