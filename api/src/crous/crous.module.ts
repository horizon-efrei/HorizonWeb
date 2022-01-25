import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { CrousController } from './crous.controller';
import { CrousService } from './crous.service';
import { DailyMenu } from './entities/dailyMenu.entity';
import { Food } from './entities/food.entity';


@Module({
  imports: [MikroOrmModule.forFeature([Food, DailyMenu])],
  controllers: [CrousController],
  providers: [CaslAbilityFactory, CrousService],
  exports: [CrousService],
})
export class CrousModule {}
