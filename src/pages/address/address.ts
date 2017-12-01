import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
public location;
public data = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App
  ) {
    this.location = localStorage.getItem('location');
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

useraddress(addressData){

        var userInfo = JSON.parse(localStorage.getItem('userData2'));
				console.log(userInfo);
        var userID = userInfo.User.id;
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'users/saveaddress';
				var postdata = JSON.stringify({
          uid:userID,
          landmark:addressData.value.landmark,
          optionalname:addressData.value.optionalname,
          address:addressData.value.address,
				});
        
				console.log(" postdata" + postdata);
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(data => {
							Loader.dismiss();

							if (data.status === true ) {
									localStorage.setItem("userData", JSON.stringify(data.data));
									
									this.showToast(data.msg);
								  this.navCtrl.push(SchedulePage)
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

  schedule()
  {
  	this.navCtrl.push(SchedulePage)
  }

}
