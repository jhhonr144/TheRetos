import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { AuthService } from './Services/auth.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ScreensizeService } from './Services/screensize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Retos',
      url: '/app/tabs/challenges',
      icon: 'medal'
    },
    {
      title: 'Premios',
      url: '/app/tabs/listProducts',
      icon: 'flame'
    },
    {
      title: 'Validar Ganadores',
      url: '/app/tabs/winners',
      icon: 'trophy'
    },
    {
      title: 'Tickets',
      url: '/app/tabs/tickets-management',
      icon: 'card'
    },
    {
      title: 'Conocenos',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
    ,
    {
      title: 'soporte',
      url: '/app/tabs/support',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;
  isUserAuthenticated: boolean = false;
  navStart: Observable<NavigationStart>;
  role:any;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private authService:AuthService,

    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screensizeService: ScreensizeService
  ) {
    this.initializeApp();
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = this.router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  async ngOnInit() {
    this.isUserAuthenticated = await this.authService.isLoggedIn();
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
    
    this.navStart.subscribe(evt => {
      this.authService.isLoggedIn().then(resp => {
        this.isUserAuthenticated = resp;
      });
    });
  }

/*   initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  } */

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/challenges');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
    });
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
 


  
}
