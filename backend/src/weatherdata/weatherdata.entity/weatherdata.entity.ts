import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weatherdata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  imageData: string;

  @Column()
  stationName: string;

  @Column()
  windSpeed: number;

  @Column()
  windGust: number;

  @Column()
  temp: number;

  @Column()
  feels_like: number;

  @Column()
  temp_min: number;

  @Column()
  temp_max: number;

  @Column()
  weatherName: string;

  @Column()
  weatherDescription: string;

  @Column()
  weatherIcon: string;

  @Column()
  timeStamp: Date;
}
