import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/mongoose/models/User.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUser: any): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  findUserbyUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
