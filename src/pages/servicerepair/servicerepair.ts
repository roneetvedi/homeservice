import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutservicePage } from '../aboutservice/aboutservice';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TabsPage } from '../tabs/tabs';
import { AddressPage } from '../address/address';
import { FormBuilder, FormGroup, FormArray,FormControl  } from '@angular/forms';
/**
 * Generated class for the ServicerepairPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicerepair',
  templateUrl: 'servicerepair.html',
})
export class ServicerepairPage {
  public cat;
  public subCat;
  public services:any;
  public subcat = '';
  public data = '';
  myForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App,
    private builder: FormBuilder
  ) {
    this.myForm = builder.group({
      worksites: builder.array([])
    })
    this.cat = navParams.get("catId");
    this.subCat = navParams.get("subcatid");
    this.aboutservice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicerepairPage');
  }
  showToast(text) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'middle'
		});
		toast.present();
	}
  	serializeObj(obj) {

		var result = [];
		for (var property in obj)
			result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
		return result.join("&");
	}
  

updateCheckedOptions(location:any, isChecked: boolean) {
  const worksites = <FormArray>this.myForm.controls.worksites;

  if(isChecked) {
    worksites.push(new FormControl(location.name));
    
    localStorage.setItem('serviceItems',JSON.stringify(worksites.value));
  } else {
      let index = worksites.controls.findIndex(x => x.value.name == location);
      console.log(index);
      worksites.removeAt(index);
      localStorage.setItem('serviceItems',JSON.stringify(worksites.value));
  }
}



  aboutservice()

  {
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'services/allservice';

        var postdata = JSON.stringify({
          catid:this.cat,
          subcatid:this.subCat
				});
				
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(data => {
              
							Loader.dismiss();
               console.log(data);
							if (data.isSuccess == 'true' ) {
                this.services = data.data.Service;
								this.subcat = data.data.SubCat.SubCategory;	
							} else {
								this.showToast(data.msg);
							}

						}, err => {
							console.log("Error");
							Loader.dismiss();
							console.log("Error!:", err);
						});
					})
  
  }
addToCart(){
  this.navCtrl.push(AboutservicePage);
}
}
