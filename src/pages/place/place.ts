import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaceModel } from '../../models/place-module';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: PlaceModel;
  showMap: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = this.navParams.get('place');
    console.log(this.place);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

}
