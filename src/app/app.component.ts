import { Component, OnInit } from '@angular/core';
import { PruebaService } from './prueba.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'qr-angular';

  begin: boolean;
  idInt: number;

  qr: string;
  authenticated: boolean;
  ready: boolean;
  unable: boolean;
  
  constructor(private prueba: PruebaService) {
    this.begin = true;
    this.idInt = 0;
    this.qr = '';
    this.authenticated = false;
    this.ready = false;
    this.unable = false;
  }

  ngOnInit(): void {
    
  }

  start() {
    this.begin = false;
    this.idInt = 0;
    this.qr = '';
    this.authenticated = false;
    this.ready = false;
    this.unable = false;

    this.prueba.start().subscribe(
      (data) => {
        this.idInt = window.setInterval(() => {
          console.log('QR....');
          
          this.prueba.qr()
          .subscribe(
            (data: any) => {
              console.log(data);
              
              this.qr = data.token === undefined ? '' : data.token;

              if (data.authenticated && !this.authenticated) {
                this.authenticated = true;
              }

              if (data.botReady) {
                window.clearInterval(this.idInt);
                this.ready = true;
              }
            }
          );
        }, 1000)
      },
      (error) => {
        this.unable = true;
      }
    );
  }
}
