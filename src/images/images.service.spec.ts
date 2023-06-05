import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { HttpModule } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';

const result = [
  {
    id: 1,
    title: 'test title',
    url: '#',
  },
];

describe('ImagesService', () => {
  let module: TestingModule;
  let service: ImagesService;

  const mockPhotoService = {
    findAll: () => result,
  };

  const serviceProvider = {
    provide: ImagesService,
    useValue: mockPhotoService,
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [serviceProvider],
      imports: [HttpModule],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an error', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(null);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
