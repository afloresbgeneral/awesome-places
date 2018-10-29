import { PlaceModel } from '../models/place-module';
import { LocationModel } from '../models/location-model';
export class PlacesService {
    private places: PlaceModel[] = [];

    addPlace (title: string, desctiption: string,
              location: LocationModel, imageUrl: string) {
        const place = new PlaceModel(location, title, desctiption, imageUrl );
        this.places.push(place);
        console.log('place added', this.places);
    }

    loadPlaces() {
        console.log('places loaded', this.places);
        return this.places.slice();
    }

    deletePlace(index: number) {
        this.places.splice(index,1);
    }
}