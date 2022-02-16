import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { UserInterface } from '../interfaces/user.interface';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  // @InjectModel('User') is to get the User model established in db from the users.module.ts 
  // set userModel to be the "representitve" of the injected User model for CRUD operations here
  // (userModel takes Model interface from mongoose which takes the form of UserInterface)
  constructor(@InjectModel('User') private readonly userModel:Model<UserInterface>){};

  // TODO: Set description over here
  // TODO: Find out difference between interface and dto
  async findUser(username: string):Promise<UserDto>{
    const user = await this.userModel.findOne({username}).exec();
    if(!user){
      throw new HttpException('User Not Found', 404)
    };
    return user
  };


  genPassword(password: string){
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
  };

  // TODO: For registration of user
  async postUser(username, password) {

    const saltHash = this.genPassword(password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const newUser = new this.userModel({
      username: username,
      hash: hash,
      salt: salt
    })

    const user = await this.userModel.create(newUser);
    return user.save();
  };

}
