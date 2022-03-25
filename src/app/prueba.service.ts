import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient) { }

  start() {
    return this.http.get('http://localhost:3000/api/chatbot/startChatbot');
  }

  qr() {
    return this.http.get('http://localhost:3000/api/chatbot/token');
  }
}
