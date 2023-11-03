import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
} from '@nestjs/websockets';
import { JwtPayload } from './../auth/jwt-payload.interface';
import { Socket, Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { UsersService } from './../users/users.service';
import { jwtConstants } from './../auth/constants';
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

  async handleConnection(client: Socket, ...args: any[]) {
    const rawToken = client.handshake.query.token;
    const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
    console.log('Extracted token:', token);

    try {
      const decoded = jwt.verify(token, jwtConstants.secret) as JwtPayload;
      console.log('Decoded JWT:', decoded);

      if (typeof decoded !== 'string' && decoded.email) {
        const email = decoded.email;

        // Now, use UsersService to get user details
        const user = await this.usersService.getUserByEmail(email);
        console.log('Fetched user:', user);
        if (user) {
          console.log('User attached:', user);
          client.data.user = user;
        } else {
          console.log('User not found for email:', email);
          client.disconnect();
        }
      }
    } catch (error) {
      client.disconnect(); // Disconnect the client if the token is invalid
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    console.log(`User with socket ID ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    console.log(`User with socket ID ${client.id} left room ${room}`);
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    client: Socket,
    { room, message }: { room: string; message: string },
  ): void {
    console.log('Client data:', client.data); // Ajoutez ce log
    const username = client.data.user.pseudo;
    this.server.to(room).emit('message', { username, content: message });
  }
}

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
// }
