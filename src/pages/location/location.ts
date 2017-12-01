import { Component, ViewChild, ElementRef,OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, Nav, Platform } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import {googlemaps} from 'googlemaps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage implements OnInit{
  longitude1:any='';
  lattitude1:any='';
  public autocompleteItems;
public autocomplete;
public acService:any;
public placesService: any;
map: any;
public lat:any;
public long:any;
public resp:any;

@ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public geolocation: Geolocation,
  private nativeGeocoder: NativeGeocoder
  ) {
   // console.log(JSON.parse(localStorage.getItem('userData')));
  }
ngOnInit() {
this.acService = new google.maps.places.AutocompleteService();        
this.autocompleteItems = [];
this.autocomplete = {
query: ''
};        
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }
updateSearch() {
console.log('modal > updateSearch');
if (this.autocomplete.query == '') {
this.autocompleteItems = [];
return;
}
let self = this; 
let config = { 
//types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
input: this.autocomplete.query, 
componentRestrictions: {  } 
}
this.acService.getPlacePredictions(config, function (predictions, status) {
console.log('modal > getPlacePredictions > status > ', status);
self.autocompleteItems = []; 
console.log(status); 

if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
predictions.forEach(function (prediction) { 

self.autocompleteItems.push(prediction);
console.log(self.autocompleteItems);

});
          
}
});
}

  chooseItem(item){
      this.autocompleteItems = [];
      this.autocomplete.query = item.description;
    
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.autocomplete.query+'&key=AIzaSyDrBgW0O1B6utrBVTYtjUa5puVQgn_lkRg';
      this.http.get(url)
              .map(res => res.json())
              .subscribe(data => {
                console.log(data.results[0].geometry.location);
                this.lat = data.results[0].geometry.location.lat;
                this.long = data.results[0].geometry.location.lng;
                this.autocomplete.location = data.results[0].geometry.location;
      })
  }


   home()
  {
  	this.navCtrl.push(HomePage);
  }

  search()
  {
    console.log(this.lat+'-'+this.long);
     localStorage.setItem('lat',this.lat);
     localStorage.setItem('long',this.long);
     localStorage.setItem('location',this.autocomplete.query);
  	 this.navCtrl.push(TabsPage);
     //this.navCtrl.push(TabsPage);
     
  }
getCurrentLocation(){
  console.log('My current location');
this.geolocation.getCurrentPosition().then((resp) => {
  console.log(resp);
 console.log(resp.coords.latitude);
 console.log(resp.coords.longitude);  
 this.lattitude1=resp.coords.latitude;
 this.longitude1=resp.coords.longitude;
 localStorage.setItem('lat',this.lattitude1);
 localStorage.setItem('long',this.longitude1);
//  var lati= localStorage.getItem('lat');
//  console.log(lati);
//  alert(lati);
//      var longi= localStorage.getItem('long');
//      alert (longi);
     localStorage.setItem('location',this.autocomplete.query);
  	 this.navCtrl.push(TabsPage);
 
}).catch((error) => {
  console.log('Error getting location', error);
});
}
}
