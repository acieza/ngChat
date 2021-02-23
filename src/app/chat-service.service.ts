import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {io, Socket} from 'socket.io-client';
//import * as SocketIO from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  socket: Socket;

  constructor() {
   this.socket = io("http://localhost:3000");
   }

   

   listen(eventname: string) : Observable<any> {
    return new Observable((subscriber) => {
        this.socket.on(eventname, (data:any) => {
            subscriber.next(data);
        })
    })
}

emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
}
}
