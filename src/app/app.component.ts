import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngChat';
  nombreUser: string;
  message: string;
  output: any[] = [];
  feedback: string;

  constructor(private chatServiceService: ChatServiceService){}

  ngOnInit(): void {
    this.chatServiceService.listen('escribiendo').subscribe((data) => this.updateFeedback(data));
    this.chatServiceService.listen('chat').subscribe((data) => this.updateMessage(data));
  }
  messageTyping(): void {
    this.chatServiceService.emit('escribiendo', this.nombreUser);    
  }

  sendMessage(): void {
    this.chatServiceService.emit('chat', {
      message: this.message,
      handle: this.nombreUser
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} está escribiendo un mensaje`;
  }
}
