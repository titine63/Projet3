import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  const mockOrderRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: 'OrderRepository', useValue: mockOrderRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of orders', async () => {
  //     mockOrderRepository.find.mockResolvedValue(mockOrders);

  //     const orders = await service.findAll();
  //     expect(orders).toEqual(mockOrders);
  //   });
  // });

  // // Test pour la méthode create
  // describe('create', () => {
  //   it('should create an order', async () => {
  //     const createOrderDto = {
  //       status: 'processed',
  //       paymentMethod: 'card',
  //       user: 1,
  //       shipping: 5,
  //     };
  //     const mockCreatedOrder = { id: 1, ...createOrderDto };
  //     mockOrderRepository.save.mockResolvedValue(mockCreatedOrder);

  //     const result = await service.create(createOrderDto);
  //     expect(result).toEqual(mockCreatedOrder);
  //   });
  // });

  // // Test pour la méthode findOne
  // describe('findOne', () => {
  //   it('should return one order by id', async () => {
  //     const id = 1;
  //     mockOrderRepository.findOneBy.mockResolvedValue(mockOrders[0]);

  //     const result = await service.findOne(id);
  //     expect(result).toEqual(mockOrders[0]);
  //   });
  // });

  // // Test pour la méthode update
  // describe('update', () => {
  //   it('should update an order', async () => {
  //     const id = 1;
  //     const updateOrderDto = {
  //       status: 'shipped',
  //       paymentMethod: 'paypal',
  //     };
  //     mockOrderRepository.update.mockResolvedValue(null); // Simulant que la mise à jour a été réussie

  //     await service.update(id, updateOrderDto);
  //     expect(mockOrderRepository.update).toHaveBeenCalledWith(
  //       id,
  //       updateOrderDto,
  //     );
  //   });
  // });

  // // Test pour la méthode remove
  // describe('remove', () => {
  //   it('should delete an order', async () => {
  //     const id = 1;
  //     mockOrderRepository.delete.mockResolvedValue(null); // Simulant que la suppression a été réussie

  //     await service.remove(id);
  //     expect(mockOrderRepository.delete).toHaveBeenCalledWith(id);
  //   });
  // });
});
