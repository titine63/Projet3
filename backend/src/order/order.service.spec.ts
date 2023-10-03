import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'OrderRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<Repository<Order>>('OrderRepository');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new order successfully', async () => {
    const mockCreateOrderDto: CreateOrderDto = {
      // Populate with appropriate mock data
      status: 'pending',
      paymentMethod: 'paypal',
      userId: 1,
      shippingId: 1,
    };

    const mockResponse = {
      ...mockCreateOrderDto,
      id: 1,
    };

    jest.spyOn(repository, 'save').mockResolvedValue(mockResponse as any);
    const result = await service.create(mockCreateOrderDto);

    expect(result).toBeDefined();
    expect(result.status).toEqual(mockCreateOrderDto.status);
    expect(result.paymentMethod).toEqual(mockCreateOrderDto.paymentMethod);
    expect(result.userId).toEqual(mockCreateOrderDto.userId);
    expect(result.shippingId).toEqual(mockCreateOrderDto.shippingId);
  });

  // Similarly, add tests for other methods like `findAll`, `findOne`, `update`, and `remove`.

  it('should update an order successfully', async () => {
    const mockUpdateOrderDto: UpdateOrderDto = {
      paymentMethod: 'stripe',
      status: 'paid',
    };

    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
    const result = await service.update(1, mockUpdateOrderDto);

    expect(result).toBeDefined();
    expect(result).toEqual({ affected: 1 });
  });

  // ... Add the rest of the tests here
});

// const mockOrders = [
//   {
//     id: 1,
//     status: 'processed',
//     paymentMethod: 'card',
//     user: 1,
//     shipping: 5,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     status: 'shipped',
//     paymentMethod: 'paypal',
//     user: 2,
//     shipping: 4,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 3,
//     status: 'delivered',
//     paymentMethod: 'card',
//     user: 3,
//     shipping: 3,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 4,
//     status: 'processed',
//     paymentMethod: 'card',
//     user: 4,
//     shipping: 2,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 5,
//     status: 'cancelled',
//     paymentMethod: 'paypal',
//     user: 5,
//     shipping: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
