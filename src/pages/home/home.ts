import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { PlaceModel } from '../../models/place-module';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage
  places: PlaceModel[] = [];

  constructor(public navCtrl: NavController,
              public placesService: PlacesService) {
  }

  ionViewWillEnter(){
    console.log('Hi from home will enter', this.places);
    this.places = this.placesService.loadPlaces();
  }

}
