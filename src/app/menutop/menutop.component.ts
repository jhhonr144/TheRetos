import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from '../Services/screensize.service';

@Component({
  selector: 'app-menutop',
  templateUrl: './menutop.component.html',
  styleUrls: ['./menutop.component.scss'],
  
  
})
export class MenutopComponent implements OnInit {

  isDesktop: boolean;
 
  constructor(private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }
 
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}

}
