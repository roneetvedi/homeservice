import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SigninPage } from '../signin/signin';
import { EditprofilePage } from '../editprofile/editprofile';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy';
import { TermsconditionPage } from '../termscondition/termscondition';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	googledata: string;
	simpledata: string;
	fbdata: string;
public img='';
public name='';
public contact='';
public user;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App,
		private fb: Facebook, 
		private googlePlus: GooglePlus,
  ) {
console.log(JSON.parse(localStorage.getItem('userData')));
		this.fbdata=localStorage.getItem('fbData');
		this.googledata=localStorage.getItem('googleData');
		this.simpledata=localStorage.getItem('userData2')
		this.getprofile();
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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

getprofile(){
				var userInfo =JSON.parse(localStorage.getItem('userData'));
				console.log(userInfo);
        var userID = userInfo;
        console.log(userID);
				alert(userID);
				let headers = new Headers();
				headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'users/userinfo';
				
        var postdata = {
          uid:userID
				};

				// alert('profile'+JSON.stringify(postdata));
				var serialized_all = this.serializeObj(postdata);
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, serialized_all, options).map(res => res.json())
						.subscribe(data => {
              
							Loader.dismiss();
              // alert(JSON.stringify(data));
							if (data.isSucess == "true" ) {
               
									this.img = data.data.User.image;
								  this.name = data.data.User.firstname+' '+data.data.User.lastname;
                  this.contact = data.data.User.phonenumber;
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

aboutus(){
	this.app.getRootNav().setRoot(AboutPage);
}

policy(){
	this.app.getRootNav().setRoot(PrivacypolicyPage);
}

terms(){
	this.app.getRootNav().setRoot(TermsconditionPage);
}

editprofile()
{

	this.app.getRootNav().setRoot(EditprofilePage);
}

changepwd(){
  this.app.getRootNav().setRoot(ChangepasswordPage);
}

logouted(){
	if(this.simpledata!=undefined){
		localStorage.clear();
    //localStorage.removeItem("userData");
  
		this.app.getRootNav().setRoot(SigninPage);
	}else if(this.fbdata!=undefined){
		this.fb.logout().then((sucess) => {
			// alert("gydsaty");
			 localStorage.clear();
			// alert(sucess)
			this.app.getRootNav().setRoot(SigninPage);
		 }).catch((error) => {
			// alert(error);
				console.log(error)
		 })
	}else(this.googledata!=undefined)
	{
		this.googlePlus.logout().then(
			(success) => {
					console.log('GOOGLE+: logout DONE', success);
					this.app.getRootNav().setRoot(SigninPage);
			},
			(failure) => {
					console.log('GOOGLE+: logout FAILED', failure);
			}
	);
	}
    
	}


	}
  

	


