import { Module } from '@nestjs/common';
import { WeatherdataService } from './weatherdata.service';
import { WeatherdataController } from './weatherdata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weatherdata } from './weatherdata.entity/weatherdata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weatherdata])],
  providers: [WeatherdataService],
  controllers: [WeatherdataController],
})
export class WeatherdataModule {}
