import { LocationModel } from './location-model';

export class PlaceModel {
    constructor(public location: LocationModel,
                public title: string,
                public description: string,
                public imagePath: string
                ) {

    }
}