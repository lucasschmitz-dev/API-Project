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

  async getWeatherdata(_id: number): Promise<Weatherdata> {
    return await this.weatherdataRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async getWeatherdataRanked(): Promise<Weatherdata[]> {
    const result = await this.weatherdataRepository.find({
      select: ['id', 'likes'],
      order: {
        likes: 'DESC',
      },
    });
    return result;
  }

  async createWeatherdata(weatherdata: Weatherdata): Promise<Weatherdata> {
    return await this.weatherdataRepository.save(weatherdata);
  }

  async likeImage(_id: number, add: boolean): Promise<boolean> {
    const res = await this.weatherdataRepository.findOne({
      where: [{ id: _id }],
    });
    if (add) {
      res.likes++;
    } else {
      res.likes--;
    }
    await this.weatherdataRepository.save(res);
    return true;
  }

  async dislikeImage(_id: number, add: boolean): Promise<boolean> {
    const res = await this.weatherdataRepository.findOne({
      where: [{ id: _id }],
    });
    if (add) {
      res.dislikes++;
    } else {
      res.dislikes--;
    }
    await this.weatherdataRepository.save(res);
    return true;
  }

  async deleteWeatherdata(weatherdata: Weatherdata) {
    this.weatherdataRepository.delete(weatherdata);
  }
}
