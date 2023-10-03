import { Test, TestingModule } from '@nestjs/testing';
import { ShippingService } from './shipping.service';
import { Shipping } from './entities/shipping.entity';
import { Repository } from 'typeorm';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

describe('ShippingService', () => {
  let service: ShippingService;
  let repository: Repository<Shipping>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShippingService,
        {
          provide: 'ShippingRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShippingService>(ShippingService);
    repository = module.get<Repository<Shipping>>('ShippingRepository');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new shipping successfully', async () => {
    const mockCreateShippingDto: CreateShippingDto = {
      firstname: 'John',
      lastname: 'Doe',
      address: '123 Main St',
      city: 'TestCity',
      postalCode: '12345',
      country: 'TestCountry',
      shippingMethod: 'Express',
      userId: 1,
    };

    const mockResponse = {
      ...mockCreateShippingDto,
      id: 1,
    };

    jest.spyOn(repository, 'save').mockResolvedValue(mockResponse as any);
    const result = await service.create(mockCreateShippingDto);
    console.log('result :>> ', result);
    expect(result).toBeDefined();
    expect(result.firstname).toEqual(mockCreateShippingDto.firstname);
    expect(result.lastname).toEqual(mockCreateShippingDto.lastname);
    expect(result.address).toEqual(mockCreateShippingDto.address);
    expect(result.city).toEqual(mockCreateShippingDto.city);
    expect(result.postalCode).toEqual(mockCreateShippingDto.postalCode);
    expect(result.country).toEqual(mockCreateShippingDto.country);
    expect(result.shippingMethod).toEqual(mockCreateShippingDto.shippingMethod);
    expect(result.userId).toEqual(mockCreateShippingDto.userId);
  });

  // Test for findAll method
  it('should retrieve all shippings', async () => {
    const mockShippingArray = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        city: 'TestCity',
        postalCode: '12345',
        country: 'TestCountry',
        shippingMethod: 'Express',
        userId: 1,
      },
    ];

    jest
      .spyOn(repository, 'find')
      .mockResolvedValueOnce(mockShippingArray as any);

    const result = await service.findAll();
    expect(result).toEqual(mockShippingArray);
  });

  // Test for findOne method
  it('should retrieve a shipping by ID', async () => {
    const mockShipping = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      address: '123 Main St',
      city: 'TestCity',
      postalCode: '12345',
      country: 'TestCountry',
      shippingMethod: 'Express',
      userId: 1,
    };

    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(mockShipping as any);

    const result = await service.findOne(1);
    expect(result).toEqual(mockShipping);
  });

  // Test for update method
  it('should update a shipping successfully', async () => {
    const mockUpdateShippingDto: UpdateShippingDto = {
      firstname: 'Jane',
      lastname: 'Smith',
      address: '456 Another St',
      city: 'AnotherCity',
      postalCode: '67890',
      country: 'AnotherCountry',
      shippingMethod: 'Standard',
    };

    jest
      .spyOn(repository, 'update')
      .mockResolvedValueOnce({ affected: 1 } as any);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(mockUpdateShippingDto as any);

    const result = await service.update(1, mockUpdateShippingDto);
    expect(result).toEqual({ affected: 1 });
  });

  // Test for remove method
  it('should remove a shipping successfully', async () => {
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValueOnce({ affected: 1 } as any);

    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
  });
});
