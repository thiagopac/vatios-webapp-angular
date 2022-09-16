import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EventType } from 'src/app/models/event';
import { IWebsocketPayload } from 'src/app/models/websocket_payload';
import { AdminAuthService } from 'src/app/services/admin-auth';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(
    private socket: Socket,
    private adminAuthService: AdminAuthService
  ) {}

  getWebsocketPayload(data: any): IWebsocketPayload {
    return {
      headers: this.adminAuthService.getAuthFromLocalStorage(),
      admin: this.adminAuthService.getAdminFromLocalStorage(),
      data: data,
    };
  }

  //tests - sending
  poke(text: string) {
    console.log('headers:', this.adminAuthService.getAuthFromLocalStorage());
    this.socket.emit('poke', text);
  }

  //test - receiving
  onPoke() {
    return this.socket.fromEvent('poke');
  }

  runEvent(event: EventType) {
    this.socket.emit(
      'CHANNEL_event_run',
      this.getWebsocketPayload({ event: event })
    );
  }

  onEventFinished() {
    return this.socket.fromEvent('CHANNEL_event_finished');
  }
}
