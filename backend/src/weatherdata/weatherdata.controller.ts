import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { WeatherdataService } from './weatherdata.service';
import { Weatherdata } from './weatherdata.entity/weatherdata.entity';

@Controller('weatherdata')
export class WeatherdataController {
  constructor(private service: WeatherdataService) {}

  @Get('/all')
  getAll() {
    return this.service.getAllWeatherdata();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getWeatherdata(params.id);
  }

  @Post()
  create(@Body() weatherdata: Weatherdata) {
    return this.service.createWeatherdata(weatherdata);
  }

  @Delete(':id')
  deleteWeatherdata(@Param() params) {
    return this.service.deleteWeatherdata(params.id);
  }
}
