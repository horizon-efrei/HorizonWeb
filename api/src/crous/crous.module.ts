import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { CrousController } from './crous.controller';
import { CrousService } from './crous.service';
import { DailyInfos } from './entities/dailyInfos.entity';
import { DailyMenu } from './entities/dailyMenu.entity';
import { Food } from './entities/food.entity';


@Module({
  imports: [MikroOrmModule.forFeature([Food, DailyMenu, DailyInfos])],
  controllers: [CrousController],
  providers: [CaslAbilityFactory, CrousService],
  exports: [CrousService],
})
export class CrousModule {}
