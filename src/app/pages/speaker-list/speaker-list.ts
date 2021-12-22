
import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ProductsService } from './../../Services/products.service';
@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage  implements OnInit{
  speakers: any[] = [];
  Products: any;


  constructor(public confData: ConferenceData,private ProductsService: ProductsService) {}
  ngOnInit() {
    this.ProductsService.getProducts().subscribe(datos=>{
      console.log(datos)
      this.Products = datos
    })
  }

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }
}
