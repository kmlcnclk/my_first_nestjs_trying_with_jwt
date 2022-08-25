import { forwardRef, Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { User } from '../../mongoose/models/User.model';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('Ser');
    console.log('====================================');
    console.log(user);
    console.log('====================================');

    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('DeSer');
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const userDB = await this.userService.findUserbyUsername(user.username);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
