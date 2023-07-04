import { Users } from '../entity/user.entity';
import { getRepository } from '../data-source';
import { Repository } from 'typeorm';

export class UserRepository {
  private usersRepository: Repository<Users>;

  public constructor() {
    this.usersRepository = getRepository(Users);
  }
  public async findAll(): Promise<Users[] | undefined> {
    return this.usersRepository.find();
  }
  async findById(id:string): Promise<Users[] | undefined> {
    return this.usersRepository.findBy({id:id});
  }
  async findByEmail(email:string): Promise<Users[] | undefined>{
    return this.usersRepository.findBy({email:email});
  }
  async findByName(name:string): Promise<Users[] | undefined>{
    return this.usersRepository.findBy({name:name});
  }
  async createUser(userData: Partial<Users>): Promise<Users> {
    const newUser = this.usersRepository.create(userData);
    console.log(newUser);
    return this.usersRepository.save(newUser);
  }
  async updateUserById(id: string, userData: Partial<Users>): Promise<Users[] | undefined> {
    await this.usersRepository.update(id, userData);
    return this.usersRepository.findBy({id:id});
  }
  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
