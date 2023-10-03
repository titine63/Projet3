import { Test, TestingModule } from '@nestjs/testing';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';

describe('ShippingController', () => {
  let controller: ShippingController;
  let service: ShippingService;
  const mockShippingRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingController],
      providers: [
        ShippingService,
        { provide: 'ShippingRepository', useValue: { mockShippingRepository } },
      ],
    }).compile();

    controller = module.get<ShippingController>(ShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
