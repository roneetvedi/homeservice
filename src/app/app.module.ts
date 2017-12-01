import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';
import { TermsconditionPage } from '../pages/termscondition/termscondition';
import { ProjectsPage } from '../pages/projects/projects';
import { ServicesPage } from '../pages/services/services';
import { ContactPage } from '../pages/contact/contact';
import { LocationPage } from '../pages/location/location';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { ServicerepairPage } from '../pages/servicerepair/servicerepair';
import { AboutservicePage } from '../pages/aboutservice/aboutservice';
import { SchedulePage } from '../pages/schedule/schedule';
import { CategoryPage } from '../pages/category/category';
import { ConfirmPage } from '../pages/confirm/confirm';
// import firebase from 'firebase'; // for facebook
//import { Firebase } from '@ionic-native/firebase'; // push notification
//import { Facebook } from '@ionic-native/facebook';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { PaymentPage } from '../pages/payment/payment';
import { CongratulationsPage } from '../pages/congratulations/congratulations';
import { AddressPage } from '../pages/address/address';
import { ServiceproviderlistPage } from '../pages/serviceproviderlist/serviceproviderlist';
import { Stripe } from '@ionic-native/stripe';
import { ViewdetailPage } from '../pages/viewdetail/viewdetail';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from '@ionic-native/firebase';
import { Firebase } from "@ionic-native/firebase";
import { Camera, CameraOptions } from '@ionic-native/camera';
export const firebaseConfig = {
  apiKey: "AIzaSyABufatOKqb9vfAm1VsVbZTWB8D6m7dUU0",
  authDomain: "home-service-b5565.firebaseio.com",
  databaseURL: "https://home-service-b5565.firebaseio.com",
  projectId: "home-service-b5565",
  storageBucket: "",
  messagingSenderId: "212098956896"

};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
	SignupPage,
	SigninPage,
  LocationPage,
  ProfilePage,
  EditprofilePage,
  ForgotpasswordPage,
  ChangepasswordPage,
  PrivacypolicyPage,
  TermsconditionPage,
  ProjectsPage,
  ServicesPage,
  ServicerepairPage,
  AddressPage,
  AboutservicePage,
  SchedulePage,
  ServiceproviderlistPage,
  CategoryPage,
  ConfirmPage,
  PaymentPage,
  CongratulationsPage,
  ViewdetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
	SignupPage,
	SigninPage,
  LocationPage,
  ProfilePage,
  EditprofilePage,
  ForgotpasswordPage,
  ChangepasswordPage,
  PrivacypolicyPage,
  TermsconditionPage,
  ProjectsPage,
  ServicesPage,
  ServicerepairPage,
  AddressPage,
  AboutservicePage,
  SchedulePage,
  ServiceproviderlistPage,
  CategoryPage,
  ConfirmPage,
  PaymentPage,
  CongratulationsPage,
  ViewdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Geolocation,
    NativeGeocoder,
    Facebook,
    GooglePlus,
    Firebase,
    Stripe,
    Camera
    
  ]
})
export class AppModule {}
