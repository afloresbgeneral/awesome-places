import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LocationModel } from '../../models/location-model';

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  isLocationSet: boolean;
  location: LocationModel;
  marker: LocationModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController) {
                    this.location = this.navParams.get('location');
                    if(this.navParams.get('isLocationSet')){
                      this.marker = this.location;
                    }
                    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetLocationPage');
  }

  onSetMarker(event: any) {
    console.log(event);
    this.marker = new LocationModel(event.coords.lat, event.coords.lng);
  }

  onAbort(){
    this.viewController.dismiss();
  }

  onConfirm(){
    this.viewController.dismiss({marker: this.marker});
  }

}
