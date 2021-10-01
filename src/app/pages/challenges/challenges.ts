import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../challenges-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { NewChallengsService } from '../../Services/new-challengs.service';
import { Challengs } from '../../model/challengs.model';

@Component({
  selector: 'page-schedule',
  templateUrl: 'challenges.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  Challengs : Challengs[]=[];

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  loading :any;
 data: any;
  constructor(
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public database: NewChallengsService
  ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
    this.getChallengs();
  }

  getChallengs() {
    this.presentLoading();
    this.database.getChallengs<Challengs>().subscribe(res =>{
      this.Challengs = res
      this.loading.dismiss();
    }      

    );

}
async presentLoading() {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Estamos preparando todo para ti !...',

  });
  await this.loading.present();

}



}
