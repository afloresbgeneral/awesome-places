import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { SetLocationPage } from '../pages/set-location/set-location';
import { AddPlacePage } from '../pages/add-place/add-place';
import { AgmCoreModule } from '@agm/core' 
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera'
import { PlacesService } from '../services/places.service';
import { File } from '@ionic-native/File';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    SetLocationPage,
    AddPlacePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsnC3qCjSrceZ5mMGsk_aJeDXaZbXv7Uk'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    SetLocationPage,
    AddPlacePage
  ],
  providers: [
    StatusBar,
    PlacesService,
    Camera,
    File,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
