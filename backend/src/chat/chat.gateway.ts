import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from './../users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected : socket.id = ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected : socket.id = ' + client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', payload);
  }

  // @SubscribeMessage('message')
  // handleEvent(
  //   @MessageBody() message: any,
  //   @ConnectedSocket() client: Socket,
  // ): void {
  //   this.server.emit('message', client.id, message);
  //   console.log(client.id + ' a envoyé :', message);
  // }

  // @SubscribeMessage('joinRoom')
  // handleJoinRoom(client: Socket, room: string): void {
  //   client.join(room);
  //   console.log(`User with socket ID ${client.id} joined room ${room}`);
  // }

  // @SubscribeMessage('leaveRoom')
  // handleLeaveRoom(client: Socket, room: string): void {
  //   client.leave(room);
  //   console.log(`User with socket ID ${client.id} left room ${room}`);
  // }

  // @SubscribeMessage('createChat')
  // create(@MessageBody() createChatDto: CreateChatDto) {
  //   return this.chatService.create(createChatDto);
  // }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
}
