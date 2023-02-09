export class WeatherData {
  name: string;
  wind: {
    speed: number;
    gust: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];

  constructor(
    name: string,
    wind: { speed: number; gust: number },
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
    },
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ]
  ) {
    this.name = name;
    this.wind = wind;
    this.main = main;
    this.weather = weather;
  }
}
