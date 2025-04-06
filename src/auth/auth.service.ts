import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const normalizedEmail = email.toLowerCase();
    const found = await this.userModel.findOne({ email: normalizedEmail });

    if (found) {
      this.logger.warn(
        `Attempted sign up with existing email: ${normalizedEmail} email already registered `,
      );
      throw new ConflictException('Email already registered');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashed,
    });

    const token = this.jwtService.sign({ id: user._id });
    this.logger.log(`User signed up: ${email}`);
    return { token };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: { name: string; email: string } }> {
    const { email, password } = loginDto;
    const normalizedEmail = email.toLowerCase();
    const user = await this.userModel.findOne({ email: normalizedEmail });

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${normalizedEmail}`);
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      this.logger.warn(
        `Failed login attempt for email: ${email} with wrong password`,
      );
      throw new UnauthorizedException('Invalid Email or Password');
    }
    const token = this.jwtService.sign({ id: user._id });
    this.logger.log(`User logged in: ${email}`);
    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
