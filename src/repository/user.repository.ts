import { Users } from '../entity/user.entity';
import { getRepository } from '../data-source';
import { Repository } from 'typeorm';
export class UserRepository {
  private usersRepository: Repository<Users>;

  public constructor() {
    this.usersRepository = getRepository(Users);
  }
  public async findAll(): Promise<Users[] | undefined> {
    return  this.usersRepository.find();
  }

  async findByEmail(email:string): Promise<Users[] | undefined>{
    return this.usersRepository.findBy({email:email});
  }

  async findByEmailandPassword(email:string,password:string): Promise<Users[] | undefined>{
    return this.usersRepository.findBy({email:email,password:password});
  }
  async createUser(userData: Partial<Users>): Promise<Users> {
    const newUser = this.usersRepository.create(userData);
    console.log(newUser);
    return this.usersRepository.save(newUser);
  }
  async updateNameByEmailAndPassword(email: string, userData: Partial<Users>): Promise<Users[] | undefined> {
    await this.usersRepository.update({email:email}, userData);
    return  this.usersRepository.findBy({email:email});
  }
  async delete(email: string): Promise<void> {
    await this.usersRepository.delete({email:email});
  }
}
