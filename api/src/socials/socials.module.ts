import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClubsModule } from '../clubs/clubs.module';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { UsersModule } from '../users/users.module';
import { ClubSocialAccount } from './entities/club-social-account.entity';
import { SocialAccount } from './entities/social-account.entity';
import { Social } from './entities/social.entity';
import { UserSocialAccount } from './entities/user-social-account.entity';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Social, SocialAccount, UserSocialAccount, ClubSocialAccount]),
    UsersModule,
    ClubsModule,
  ],
  controllers: [SocialsController],
  providers: [CaslAbilityFactory, SocialsService],
  exports: [SocialsService],
})
export class SocialsModule {}
