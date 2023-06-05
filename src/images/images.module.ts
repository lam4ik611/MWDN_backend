import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { imagesConfig } from 'src/images/config/images.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [imagesConfig],
    }),
    HttpModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
