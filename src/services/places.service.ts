import { PlaceModel } from '../models/place-module';
import { LocationModel } from '../models/location-model';
import {Storage} from '@ionic/storage'
import { Injectable } from '../../node_modules/@angular/core';
import { File } from '@ionic-native/File';

declare var cordova: any;


@Injectable()
export class PlacesService {
    private places: PlaceModel[] = [];

    constructor(private storage: Storage,
                private file: File) {

    }

    addPlace (title: string, desctiption: string,
              location: LocationModel, imageUrl: string,) {
        const place = new PlaceModel(location, title, desctiption, imageUrl );
        this.places.push(place);
        console.log('place added', this.places);
        this.storage.set('places', this.places)
            .then(
                data => {
                    console.log(data);
                }
            )
            .catch(
                err => {
                    this.places.splice(this.places.indexOf(place),1);
                }
            )

    }

    loadPlaces() {
        console.log('places loaded', this.places);
        return this.places.slice();
    }

    fetchPlaces() {
        return this.storage.get('places')
            .then(
                (places: PlaceModel[]) => {
                    this.places = places !=null ? places : [];
                    return this.places;
                }
            )
            .catch(
                (err) =>{
                    console.log(err);
                }
            )
    }

    deletePlace(index: number) {
        const place = this.places[index];
        this.places.splice(index,1);
        this.storage.set('places',this.places)
            .then(
                () => {
                    this.removeFile(place);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    }

    private removeFile(place: PlaceModel) {
        const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(
                () => {
                    console.log('Removed File');
                }
            )
            .catch(
                ()=>{
                    console.log('Error');
                    this.addPlace(place.title, place.description, place.location, place.imageUrl);
                }
            )
    } 


}