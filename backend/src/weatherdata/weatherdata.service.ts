import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weatherdata } from './weatherdata.entity/weatherdata.entity';

@Injectable()
export class WeatherdataService {
  constructor(
    @InjectRepository(Weatherdata)
    private weatherdataRepository: Repository<Weatherdata>,
  ) {}

  async getAllWeatherdata(): Promise<Weatherdata[]> {
    return await this.weatherdataRepository.find();
  }

  async getWeatherdata(_id: number): Promise<Weatherdata[]> {
    return await this.weatherdataRepository.find({
      select: [
        'id',
        'country',
        'city',
        'lat',
        'lon',
        'imageData',
        'stationName',
        'windSpeed',
        'windGust',
        'temp',
        'feels_like',
        'temp_min',
        'temp_max',
        'weatherName',
        'weatherDescription',
        'weatherIcon',
        'timeStamp',
      ],
      where: [{ id: _id }],
    });
  }

  async createWeatherdata(weatherdata: Weatherdata): Promise<Weatherdata> {
    return await this.weatherdataRepository.save(weatherdata);
  }

  async deleteWeatherdata(weatherdata: Weatherdata) {
    this.weatherdataRepository.delete(weatherdata);
  }
}
