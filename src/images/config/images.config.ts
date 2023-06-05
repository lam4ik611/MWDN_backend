import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const imagesConfig = registerAs('images', () => ({
  apiImages: process.env.API_IMAGES,
  apiPhotos: process.env.API_PHOTOS,
}));
