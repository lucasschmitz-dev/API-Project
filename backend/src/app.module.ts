import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weatherdata } from './weatherdata/weatherdata.entity/weatherdata.entity';
import { WeatherdataModule } from './weatherdata/weatherdata.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'apiproject',
      entities: [Weatherdata],
      synchronize: true,
    }),
    WeatherdataModule,
  ],
})
export class AppModule {}
