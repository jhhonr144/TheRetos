import { Subject } from 'rxjs';
import { Tickets } from './../model/Tickets';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-markert',
  templateUrl: './start-markert.component.html',
  styleUrls: ['./start-markert.component.scss'],
})
export class StartMarkertComponent implements OnInit {

  Tickets : number = 0
  constructor() { }

  ngOnInit() {

  }

  Subir(){
  this.Tickets = this.Tickets + 1
  }
  Bajar(){
    this.Tickets = this.Tickets - 1
  }

}
