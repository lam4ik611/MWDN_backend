import { Controller, Get } from '@nestjs/common';
import { ImagesService } from './images.service';
import { IImage } from './interfaces/image.interface';
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async findAll(): Promise<Array<IImage>> {
    return await this.imagesService.findAll();
  }
}
