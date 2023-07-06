import { UserController } from '../controller/user.controller';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import {container} from 'tsyringe'


container.register<UserService>(UserService,{useClass: UserService});
container.register<UserController>(UserController,{useClass: UserController});
container.register<UserRepository>(UserRepository,{useClass: UserRepository});
