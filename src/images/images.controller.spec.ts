import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { HttpModule } from '@nestjs/axios';

const result = [
  {
    id: 1,
    title: 'test title',
    url: '#',
  },
];

describe('ImagesController', () => {
  let module: TestingModule;
  let controller: ImagesController;
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
      imports: [HttpModule],
      controllers: [ImagesController],
      providers: [serviceProvider],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of images', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await controller.findAll()).toBe(result);
    });
  });
});
