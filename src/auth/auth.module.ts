import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './utils/jwt.strategy';
import { LocalStrategy } from './utils/local.strategy';
import { UserService } from '../user/user.service';
import { UserSchema, User } from '../mongoose/models/User.model';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSerializer } from './utils/Session.serializer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    // .register({
    // session: true,
    // }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
