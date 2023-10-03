import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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
      ];
      return Promise.resolve(orders.find((order) => order.id === id));
    }),

    // Mock pour la méthode create
    save: jest
      .fn()
      .mockImplementation((order) => Promise.resolve({ id: 3, ...order })),
    // Mock pour la méthode update
    update: jest
      .fn()
      .mockImplementation((id, order) => Promise.resolve(undefined)), // Simulant que la mise à jour a été réussie

    // Mock pour la méthode delete
    delete: jest.fn().mockImplementation((id) => Promise.resolve(undefined)),
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
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.resetAllMocks();
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

  describe('findAll', () => {
    it('should return all orders', async () => {
      const expectedOrders = mockOrders;
      mockOrderRepository.find.mockResolvedValue(expectedOrders);

      const result = await controller.findAll();
      expect(result).toEqual(expectedOrders);
      expect(mockOrderRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an order by id', async () => {
      const id = '1';
      const expectedOrder = {
        id: 1,
        status: 'processed',
        paymentMethod: 'card',
        user: 1,
        shipping: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockOrderRepository.findOne.mockResolvedValue(expectedOrder);

      const result = await controller.findOne(id);
      expect(result).toEqual(expectedOrder);
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: parseInt(id, 10) },
      });
    });

    it('should return null if order is not found', async () => {
      const id = '3';
      mockOrderRepository.findOne.mockResolvedValue(null);

      const result = await controller.findOne(id);
      expect(result).toBeNull();
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: parseInt(id, 10) },
      });
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      const orderDto = new CreateOrderDto();
      orderDto.status = 'pending';
      orderDto.paymentMethod = 'paypal';
      const expectedOrder = { id: 3, ...orderDto };
      mockOrderRepository.save.mockResolvedValue(expectedOrder);

      const result = await controller.create(orderDto);
      expect(result).toEqual(expectedOrder);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(orderDto);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const id = '1';
      const updateOrderDto = new UpdateOrderDto();
      updateOrderDto.status = 'paid';
      updateOrderDto.paymentMethod = 'stripe';
      mockOrderRepository.update.mockResolvedValue(undefined);

      const result = await controller.update(id, updateOrderDto);
      expect(result).toEqual(undefined);
      expect(mockOrderRepository.update).toHaveBeenCalledWith(
        parseInt(id, 10),
        updateOrderDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      const id = '1';
      mockOrderRepository.update.mockResolvedValue(undefined);
      const result = await controller.remove(id);
      expect(result).toEqual(undefined);
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(parseInt(id, 10));
    });
  });
});
