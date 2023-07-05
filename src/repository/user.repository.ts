import { Users } from "../entity/User.entity";
import { getRepository } from "../data-source";
import { Repository } from "typeorm";
export class UserRepository {
  private usersRepository: Repository<Users>;

  public constructor() {
    this.usersRepository = getRepository(Users);
  }
  findAll = async (): Promise<Users[] | undefined> => {
    return this.usersRepository.find();
  };

  findByEmail = async (email: string): Promise<Users[] | undefined> => {
    return this.usersRepository.findBy({ email: email });
  };

  findByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<Users[] | undefined> => {
    return this.usersRepository.findBy({ email: email, password: password });
  };
  createUser = async (userData: Partial<Users>): Promise<Users> => {
    const newUser = this.usersRepository.create(userData);
    console.log(newUser);
    return this.usersRepository.save(newUser);
  };
  updateNameByEmailAndPassword = async (
    email: string,
    userData: Partial<Users>
  ): Promise<Users[] | undefined> => {
    await this.usersRepository.update({ email: email }, userData);
    return this.usersRepository.findBy({ email: email });
  };
  delete = async (email: string): Promise<void> => {
    await this.usersRepository.delete({ email: email });
  };
}
