import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaceModel } from '../../models/place-module';
import { PlacesService } from '../../services/places.service';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: PlaceModel;
  showMap: boolean = false;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public placesService: PlacesService) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
    console.log(this.place);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  toggleMap() {
    console.log('toggle');
    this.showMap = !this.showMap;
  }

  onDelete(){
    this.placesService.deletePlace(this.index);
    this.navCtrl.pop();

  }

}
