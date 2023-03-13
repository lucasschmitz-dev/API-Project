export class ImageData {
  data: [
    {
      b64_json: string;
    }
  ];

  constructor(data: [{ b64_json: string }]) {
    this.data = data;
  }
}
