import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { LocationModel } from '../../models/location-model';
import { Geolocation } from '@ionic-native/geolocation'
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/File';
import { normalizeURL } from 'ionic-angular'; 
import { PlacesService } from '../../services/places.service';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  isLocationSet: boolean = false;
  imageUrl='';
  location: LocationModel = {
    lat: 9.0233586,
    lng: -79.5311765
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalController: ModalController,
              public geolocation: Geolocation,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public camera: Camera,
              public placesService: PlacesService,
              public file: File) {
          

  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.placesService.addPlace(form.value.title, form.value.description,
                                this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 9.0233586,
      lng: -79.5311765
    };
    this.imageUrl = '';
    this.isLocationSet = false
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
    console.log('hi from locate');
    const loading = this.loadingController.create({
      content: 'Loadging location...'
    });
    loading.present();
    this.geolocation.getCurrentPosition()
      .then(
        (location) => {
          loading.dismiss();
          console.log('location', location);
          this.isLocationSet = true;
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.onOpenMap();
        }
      )
      .catch(
        (error) => {
          loading.dismiss();
          console.log(error);
          this.handleNotification(error.message)
        }
      );
  }

  onTakePhoto(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
    .then(
      (imageData) =>{
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/,'');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              data =>{
                this.imageUrl = data.nativeURL;
                this.camera.cleanup();
              }
            )
            .catch(
              err => {
                this.imageUrl = '';
                const toast = this.toastController.create({
                  message: 'Try again',
                  duration: 30000,
                  position: 'down'
                });
                toast.present();
                this.camera.cleanup();
              }
            )
        console.log(imageData);
        if(imageData){
          this.imageUrl =  normalizeURL(imageData);
        }
      }
    )
    .catch(
      err => {
        const toast = this.toastController.create({
          message: 'Couldnt take the photo',
          duration: 30000,
          position: 'down'
        });
        toast.present();
        console.log(err)
      }
    );
  }

}
