import { Module } from '@nestjs/common';
import { MyWebSocketGateway } from './websocket.gateway';

@Module({
  imports: [],
  providers: [MyWebSocketGateway],
})
export class WebSocketModule {}
