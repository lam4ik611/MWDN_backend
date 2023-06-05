import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { transformImage } from './helpers/images.helper';
import { IImage } from './interfaces/image.interface';

@Injectable()
export class ImagesService {
  apiImages: string;
  apiPhotos: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiImages = this.configService.get<string>('images.apiImages');
    this.apiPhotos = this.configService.get<string>('images.apiPhotos');
  }

  async findAll(): Promise<Array<IImage>> {
    const res = await Promise.all([
      this.getDataHandler(this.apiImages),
      this.getDataHandler(this.apiPhotos),
    ]);

    return transformImage(res.flat(1));
  }

  private async getDataHandler(url: string) {
    return (
      await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            throw `An error happened: ${error}`;
          }),
        ),
      )
    ).data[0];
  }
}
