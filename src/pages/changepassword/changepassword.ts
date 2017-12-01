import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
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
    console.log('ionViewDidLoad ChangepasswordPage');
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
	changepwd(signup2){
        if(signup2.value.newpassword != signup2.value.cpassword){
        this.showToast('Both passwords are not matching!');
        }else{
				var userInfo = localStorage.getItem('userData1');
	      console.log(userInfo);
				// var userEmail = userInfo.User.email;
				var userEmail = userInfo;
        var token = localStorage.getItem('tokenId');
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'users/changepassword';
				var postdata = JSON.stringify({
          email:userEmail,
          old_password:signup2.value.password,
          new_password:signup2.value.newpassword,
		     // push_token : token
				});
        
				console.log(" postdata" + postdata);
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(data => {
							Loader.dismiss();
							if (data.isSucess == "true") {
									//  localStorage.setItem("userData", JSON.stringify(data.data));
									this.showToast(data.msg);
									this.app.getRootNav().setRoot(ProfilePage);
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
back(){
	this.app.getRootNav().setRoot(TabsPage);
}
}
