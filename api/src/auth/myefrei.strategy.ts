import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { firstValueFrom } from 'rxjs';
import { computedConfig, config } from '../shared/configs/config';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { MyEfreiDto } from './dto/myefrei.dto';

@Injectable()
export class MyEfreiStrategy extends PassportStrategy(Strategy, 'myefrei') {
  constructor(
    @InjectRepository(User) private readonly userRepository: BaseRepository<User>,
    private readonly httpService: HttpService,
    private readonly userService: UsersService,
  ) {
    super({
      authorizationURL: config.get('myefreiOauthAuthorizeUrl'),
      tokenURL: config.get('myefreiOauthTokenUrl'),
      clientID: config.get('myefreiOauthClientId'),
      clientSecret: config.get('myefreiOauthClientSecret'),
      callbackURL: `${computedConfig.apiUrl}/auth/myefrei/callback`,
      state: true,
    });
  }

  public async validate(accessToken: string): Promise<User> {
    const result = this.httpService.get<MyEfreiDto>(config.get('myefreiOauthUserUrl'), {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { data } = await firstValueFrom(result);

    // TODO: Check + Add roles
    const user = await this.userRepository.findOne({ userId: data.username });
    const creationOptions = MyEfreiDto.normalize(data);
    if (!user)
      return await this.userService.create(creationOptions);

    if (!user.hasChanged(creationOptions))
      return user;

    wrap(user).assign(creationOptions);
    await this.userRepository.flush();
    return user;
  }
}
