import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  const mockOrderRepository = {
    // Mock pour la méthode find
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        status: 'processed',
        paymentMethod: 'card',
        user: 1,
        shipping: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

    // Mock pour la méthode findOne
    findOne: jest.fn().mockImplementation((id) => {
      const orders = [
        { id: 1, name: 'Sample Order' },
        { id: 2, name: 'Another Order' },
      ];
      return Promise.resolve(orders.find((order) => order.id === id));
    }),

    // Mock pour la méthode create
    create: jest
      .fn()
      .mockImplementation((order) => Promise.resolve({ id: 3, ...order })),

    // Mock pour la méthode update
    update: jest.fn().mockResolvedValue(null), // Simulant que la mise à jour a été réussie

    // Mock pour la méthode delete
    remove: jest.fn().mockResolvedValue(null), // Simulant que la suppression a été réussie
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        { provide: 'OrderRepository', useValue: mockOrderRepository },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });
  const mockOrders = [
    {
      id: 1,
      status: 'processed',
      paymentMethod: 'card',
      user: 1,
      shipping: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      status: 'shipped',
      paymentMethod: 'paypal',
      user: 2,
      shipping: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      status: 'delivered',
      paymentMethod: 'card',
      user: 3,
      shipping: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      status: 'processed',
      paymentMethod: 'card',
      user: 4,
      shipping: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      status: 'cancelled',
      paymentMethod: 'paypal',
      user: 5,
      shipping: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test pour la méthode create
  // it('should create an order', async () => {
  //   const orderDto = new CreateOrderDto();
  //   orderDto.status = 'pending';
  //   orderDto.paymentMethod = 'paypal';

  //   const result = await controller.create(orderDto);
  //   expect(result).toEqual({ id: 1, name: 'Sample Order' });
  //   expect(service.create).toHaveBeenCalledWith(orderDto);
  // });

  // // Test pour la méthode findAll
  // it('should return all orders', async () => {
  //   mockOrderRepository.find.mockResolvedValue(mockOrders);

  //   const result = await controller.findAll();
  //   expect(result).toEqual(mockOrders);
  //   expect(service.findAll).toHaveBeenCalled();
  // });

  // // Test pour la méthode findOne
  // it('should return one order', async () => {
  //   const orderId = '1';
  //   mockOrderRepository.findOne.mockResolvedValue(mockOrders[0]);

  //   const result = await controller.findOne(orderId);
  //   expect(result).toEqual(mockOrders[0]);
  //   expect(service.findOne).toHaveBeenCalledWith(orderId);
  // });

  // // Test pour la méthode update
  // it('should update an order', async () => {
  //   const orderId = '1';
  //   const updateOrderDto = new CreateOrderDto();
  //   updateOrderDto.status = 'paid';
  //   updateOrderDto.paymentMethod = 'stripe';
  //   mockOrderRepository.update.mockResolvedValue(null); // Simulant que la mise à jour a été réussie

  //   await controller.update(orderId, updateOrderDto);
  //   expect(service.update).toHaveBeenCalledWith(orderId, updateOrderDto);
  // });

  // // Test pour la méthode remove
  // it('should delete an order', async () => {
  //   const orderId = '1';
  //   mockOrderRepository.remove.mockResolvedValue(null); // Simulant que la suppression a été réussie

  //   await controller.remove(orderId);
  //   expect(service.remove).toHaveBeenCalledWith(orderId);
  // });
});
