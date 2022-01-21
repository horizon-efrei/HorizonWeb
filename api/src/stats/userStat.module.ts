import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { Stat } from './userStat.entity';
import { UserStatsService } from './userStat.service';
import './userStat.subscriber';

@Module({
  imports: [
    MikroOrmModule.forFeature([Stat]),
  ],
  controllers: [],
  providers: [CaslAbilityFactory, UserStatsService],
  exports: [UserStatsService],
})
export class UserStatModule {}
