import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { SignupUserDTO } from './dto/signup-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninUserDTO } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupUserDto: SignupUserDTO): Promise<any> {
    const { username, email, password } = signupUserDto;

    //console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new this.userModel({
      ...signupUserDto,
      password: hashedPassword,
    }).save();
    //return await newUser.save();

    try {
      // return await newUser.save();

      const payload = { username: newUser.username, userId: newUser._id }; // correct here
      return {
        accessToken: this.jwtService.sign(payload),
        user: payload,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async signIn(user: any) {
    const payload = { username: user.username, userId: user._id }; // correct here
    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
