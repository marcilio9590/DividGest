import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartoesProvider } from '../providers/cartoes/cartoes';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { ComumProvider } from '../providers/comum/comum';
import { AES256 } from '@ionic-native/aes-256';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDUO1MmJyFy-OHUZ3D72C1VwNyiQo75Ngk",
      authDomain: "dividgest.firebaseapp.com",
      databaseURL: "https://dividgest.firebaseio.com",
      projectId: "dividgest",
      storageBucket: "dividgest.appspot.com",
      messagingSenderId: "260272836789"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CartoesProvider,
    UsuariosProvider,
    ComumProvider,
    AES256
  ]
})
export class AppModule { }
