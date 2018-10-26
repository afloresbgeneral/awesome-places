import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { LocationModel } from '../../models/location-model';
import { Geolocation } from '@ionic-native/geolocation'

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
              public modalController: ModalController,
              public geolocation: Geolocation,
              public loadingController: LoadingController,
              public toastController: ToastController) {
          

  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onOpenMap(){
    const modal = this.modalController.create(SetLocationPage, {location : this.location, isLocationSet:this.isLocationSet});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log(data.marker);
      if( data ){
        this.isLocationSet = true;
        this.location = data.marker;
      }
    });
  }

  handleNotification(message: string){
    const toast = this.toastController.create({
      duration: 3000,
      message:message,
      position: 'top'
    });
    toast.present();
  }

  onLocate() {
    const loading = this.loadingController.create({
      content: 'Loadging location...'
    });
    loading.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loading.dismiss();
          console.log(location);
          this.isLocationSet = true;
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.onOpenMap();
        }
      )
      .catch(
        error => {
          console.log(error);
          this.handleNotification(error.message)
        }
      );
      loading.dismiss();
  }

}
