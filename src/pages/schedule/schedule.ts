import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';
import { ServiceproviderlistPage } from '../serviceproviderlist/serviceproviderlist';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
public data = '';
public useraddress = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App
  ) {
    this.getUserAddress();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
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
  confirm()
  {
  	this.navCtrl.push(ConfirmPage);
  }
  getUserAddress(){
    var user = JSON.parse(localStorage.getItem('userData2'));
    var userID = user.User.id;
    		let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'users/userinfo';

        var postdata = JSON.stringify({
          uid:userID
				});
				
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(data => {
              
							Loader.dismiss();
               console.log(data);
							if (data.isSucess == "true" ) {
               
									this.useraddress = data.data.User;

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
  serviceproviderlist(formData)
  {
    console.log(formData.value);
		localStorage.setItem('schedule',JSON.stringify(formData.value));
  	this.navCtrl.push(ServiceproviderlistPage,{serviceDate:formData.value.sdate,serviceTime:formData.value.stime});
  }

}
