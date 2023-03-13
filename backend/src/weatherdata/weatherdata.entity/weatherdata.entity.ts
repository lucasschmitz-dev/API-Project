import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Entity()
export class Weatherdata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  country: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  city: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  imageData: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  stationName: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  windSpeed: number;

  @Column({ nullable: true })
  @IsOptional()
  windGust: number;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  temp: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  feels_like: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  temp_min: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  temp_max: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  weatherName: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  weatherDescription: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  weatherIcon: string;

  @Column({ nullable: false })
  @IsDateString()
  @IsNotEmpty()
  timeStamp: Date;
}
