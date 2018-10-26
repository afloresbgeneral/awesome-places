import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { LocationModel } from '../../models/location-model';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  isLocationSet: boolean = false;
  location: LocationModel = {
    lat: 9.0233586,
    lng: -79.5311765
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalController: ModalController) {
          

  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onOpenMap(){
    const modal = this.modalController.create(SetLocationPage, {location : this.location});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log(data.marker);
      if( data ){
        this.isLocationSet = true;
        this.location = data.marker;
      }
    });
  }

}
