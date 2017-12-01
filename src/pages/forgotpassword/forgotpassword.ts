import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { SigninPage } from '../signin/signin';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  public data = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
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

forgot(signup2){

  console.log(signup2);
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'users/forgotpwd';
				var postdata = JSON.stringify({
          username:signup2.value.email
				});
        
				console.log(" postdata" + postdata);
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(data => {
							Loader.dismiss();
							if (data.isSuccess == 'true' ) {
									this.showToast(data.msg);
								
									this.app.getRootNav().setRoot(SigninPage);
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

}
