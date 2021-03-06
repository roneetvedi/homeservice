import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Firebase } from '@ionic-native/firebase';
import * as firebase from 'firebase';
// import { Firebase } from "@ionic-native/firebase";

//import { Facebook } from '@ionic-native/facebook';

// import firebase from 'firebase'
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  google_data: any={};
  name_google: any;
  public data = '';
	userProfile: any = null;
  User: any;
  public fduser='';
  public lat: any;
  public long: any;
  public userdata = '';
  
  public userfbdata:any = '';
  constructor(public navCtrl: NavController,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App,
		public facebook: Facebook,
    private fb: Facebook, 
     private googlePlus: GooglePlus,
   //  private firebase1: Firebase,		// public afAuth: AngularFireAuth
  ) {

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
  to_signup(){
     this.navCtrl.push(SignupPage);
  }

	public Loading=this.loadingCtrl.create({
					content: 'Please wait...'
					
	});


   facebookLogin()  {
     alert("into ron fb");
     let permissions = new Array<string>();
     let nav = this.navCtrl;
 
     //the permissions your facebook app needs from the user
     permissions = ['public_profile', 'user_friends', 'email'];
 
     this.fb.login(permissions)
     .then((response) => {
       // alert("response");
       // alert(response);
         alert(JSON.stringify(response));
       let userId = response.authResponse.userID;
       let params = new Array<string>();
 
       //Getting name and gender properties
       this.fb.api("/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name,picture", params)
       .then((fduser) => {
         // alert("user");
         // alert(user);
          alert("rony"+JSON.stringify(fduser));
          fduser.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
         //now we have the users info, let's save it in the NativeStorage
         var postdata = {
           email: fduser.email,
           name: fduser.name,
           fbId: fduser.id,
           image: fduser.picture,
           phone: '',
           role: 'user',
         }

           alert(JSON.stringify(postdata));
         //console.log(postdata);
          // alert("kkk");
         var serialized_all = this.serializeObj(postdata);
         var url = this.dataprovider.base_url + 'users/fblogin';
           alert("hisjjsfjjasf");
         let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
         let options = new RequestOptions({ headers: headers });
         this.http.post(url, serialized_all, options)
           .map(res => res.json())
           .subscribe((response) => {
             console.log(response);
             alert(JSON.stringify(response));
            var res1 = JSON.stringify(response);
            var sta = JSON.parse(res1);
              // alert(response);
              this.navCtrl.push(LocationPage);
              if (response.status == true) { 
                   localStorage.setItem("userData", response.data.User.id);
                  //  localStorage.setItem("fbuserData", response.data.User.id);
                   alert(response.data.User.id);
                   localStorage.setItem("fbData", response.data.User);
                  let toast = this.toastCtrl.create({
                        message: response.data.user.msg,
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                    
              } else {
                let toast = this.toastCtrl.create({
                  message: response.data.user.msg,
                  duration: 3000,
                  position: 'middle'
                });
                 toast.present();
              }
           }, err => {
                // alert("bb");
              // alert(err);
           })
       })  
     }
     )
     .catch(e => console.log('Error logging into Facebook', e));


 
   }
 
   google_plus(){
    alert("naveen");
  this.googlePlus.login({
    // 'webClientId': '795241965174-ie2q7q13q634k536t4iua2je7pct20cn.apps.googleusercontent.com',
    //   'offline': true
  })
  .then(res =>{
    console.log(res);
    alert("naveen1");
    alert(JSON.stringify(res));
    //  alert(res.displayName);
    //  alert(JSON.stringify(res.idToken));

    // this.name_google = res.displayName;
    //  alert('googlename');
    //  alert(JSON.stringify(this.name_google));
    // firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
    // .then( success => {
      
    //      alert("Firebase success: " + JSON.stringify(success));
    //      this.google_data = success;

    var data_google = {
             //username : res.displayName,
           // name : this.name_google,
            google_id : res.userId,
            // image : res.imageURL,
            email : res.email,
            firstname: res.givenName,
            lastname: res.familyName

          }
           alert('google data');
           alert(JSON.stringify(data_google));
             
         var serialized_all = this.serializeObj(data_google);
         var url = this.dataprovider.base_url + 'users/googlelogin';
         let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
         let options = new RequestOptions({ headers: headers });


          // var url: string =  this.dataprovider.base_url + this.dataprovider.GOOGLE_API;


          var serialized_google = this.serializeObj(data_google);
          console.log(serialized_google);
          this.http.post(url, serialized_google, options).map(res => res.json()).subscribe(datarestgoogle => {
          this.Loading.dismiss();
        
            alert('api');
           alert(JSON.stringify(datarestgoogle));
          // alert(datarestgoogle);
          if(datarestgoogle.status == true){
            alert(JSON.stringify(datarestgoogle));

            localStorage.setItem('userData',datarestgoogle.data.User.id);
            //  localStorage.setItem('googleuserData',datarestgoogle.data.User.id);
             localStorage.setItem('googleData',datarestgoogle.data.user);

                    let toast = this.toastCtrl.create({
                    message: datarestgoogle.msg,
                    duration: 3000
                  });
                  toast.present();

                      this.navCtrl.push(LocationPage);
          }else{
            let toast = this.toastCtrl.create({
                    message: datarestgoogle.msg,
                    duration: 3000
                  });
                  toast.present();
                       this.googlePlus.logout()
                    .then(function (response) {
                  localStorage.removeItem("GOOGLEUSERID");
                  localStorage.clear();
             
                    })
          }
        })
  },  
  error => {
            this.Loading.dismiss();
            alert('error');
            alert(JSON.stringify(error));
    
          });
        // }
        // , error => {
        //  this.Loading.dismiss();
        //  alert('error');
        //   alert(JSON.stringify(error));
        // });

}



signIn(signup2){
  console.log('hellooo');
  console.log(signup2);
        var token = localStorage.getItem('tokenId');
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'users/login';
				var postdata = JSON.stringify({
          role:'user',
          status:1,
          email:signup2.value.email,
          password:signup2.value.password,
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
							if (data.status === true ) {
                localStorage.setItem("userData2", JSON.stringify(data.data));
                   localStorage.setItem("userData", data.data.User.id);
                  //  localStorage.setItem("simpleuserData", data.data.User.id);
                   localStorage.setItem("userData1",data.data.User.email);
                 // console.log(data.data.User.email) ;
                  // console.log(data.data);
									this.showToast(data.msg);
									this.app.getRootNav().setRoot(LocationPage);
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
forgotpassword()

{
  this.navCtrl.push(ForgotpasswordPage);
}

}
