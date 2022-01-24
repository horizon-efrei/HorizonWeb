import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { BadgeUnlock } from './badge-unlock.entity';
import { Badge } from './badge.entity';
import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';

@Module({
  imports: [MikroOrmModule.forFeature([Badge, BadgeUnlock, User]), UsersModule],
  controllers: [BadgesController],
  providers: [CaslAbilityFactory, BadgesService],
  exports: [BadgesService],
})
export class BadgesModule {}
