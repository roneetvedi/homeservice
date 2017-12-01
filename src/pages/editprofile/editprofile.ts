import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfilePage } from '../profile/profile';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
	image: any;
	public prfimage='';
public data = ' ';
public name;
public contact;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,public actionSheetCtrl:ActionSheetController,
		public app: App,private camera: Camera) {
    this.getprofile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
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
	public showLoader = this.loadingCtrl.create({
		content: 'Saving...'
	});
getprofile(){
        var userInfo = JSON.parse(localStorage.getItem('userData'));
        var userID = userInfo;
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
               
									this.data = data.data.User;

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


   editinfo(editForm) {
    var userInfo = JSON.parse(localStorage.getItem('userData'));
    var userID = userInfo;
		var data_Profile = {
			id: userID,
			firstname: editForm.value.firstname,
			lastname: editForm.value.lastname,
			email: editForm.value.email,
			phonenumber: editForm.value.phonenumber,
		}
		 //alert(JSON.stringify(data_Profile));

		var serialized = this.serializeObj(data_Profile);
		//alert(serialized);
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		let options = new RequestOptions({ headers: headers });
		var url: string = this.dataprovider.base_url + 'users/editprofile';

		this.showLoader.present().catch();
		this.http.post(url, serialized, options).map(res => res.json())
			.subscribe(data => {
				
				console.log(data);
		this.showLoader.dismiss().catch();
				// alert(JSON.stringify(data));
				if (data.status == true) {
					this.showToast("Profile has been updated");
          //localStorage.setItem('userData', JSON.stringify(data.data));
					this.name =  data.data.User.firstname+' '+data.data.User.lastname;
          this.contact = data.data.User.phonenumber;
          this.app.getRootNav().setRoot(ProfilePage);
					//this.acountPage();
					//this.navCtrl.push(AccountPage);
				} else {
					this.showToast("Profile failed to update")
					//this.Loader.dismiss();
				}


			}, err => {
this.showLoader.dismiss().catch();
				alert(err);
				//this.hide();
				console.log("Error");
				console.log("Error!:", err);
			});

	}

	openActionSheet(){
			// alert('camera');
			var User = localStorage.getItem("userData");
		 console.log(User);
		 let actionsheet = this.actionSheetCtrl.create({
		 title:"Choose Album",
		 buttons:[{
		 text: 'Camera',
		 handler: () => {
		 console.log("Camera Clicked");
		
			 const options: CameraOptions = {
			 quality: 8,
			 sourceType : 1,
			 destinationType: this.camera.DestinationType.DATA_URL,
			 encodingType: this.camera.EncodingType.JPEG,
			 mediaType: this.camera.MediaType.PICTURE
		 }
		 this.camera.getPicture(options).then((imageData) => {
			 
			 
			 this.prfimage = "data:image/jpeg;base64," + imageData;
			 this.image=imageData;
			 localStorage.setItem("IMG",  this.prfimage);
			 // this.profile_image =  imageData; 
				 var data_img = ({
											id :User,
											img :this.image
					 })
			 
				 var serialized_img = this.serializeObj(data_img); 
				 console.log(serialized_img);
				 let headers = new Headers();
				 headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
				 let options = new RequestOptions({ headers: headers });
				 var url: string = this.dataprovider.base_url + 'users/saveimage';
		 
				 this.showLoader.present().catch();
				 this.http.post(url, serialized_img, options).map(res => res.json())
					 .subscribe(data => {
				
			 //  alert("img ->"+data);
			 //  alert("img ->"+JSON.stringify(data));
				if(data.error == 0){
			 let toast = this.toastCtrl.create({
			 message: data.message,
			 duration: 3000,
			 position: 'middle'
		 });
			 toast.present();
			 this.image='';
	
			 // this.data= data; 
}
});

		 }, (err) => {
		 alert("Server not Working,Please Check your Internet Connection and try again!");

		 });
		 }
		 },{
		 text: 'Gallery',
		 
		 handler: () => {
										 const options: CameraOptions = {
										 quality: 8,
										 sourceType : 0,
										 destinationType: this.camera.DestinationType.DATA_URL,
										 encodingType: this.camera.EncodingType.JPEG,
										 mediaType: this.camera.MediaType.PICTURE
									 }
									 this.camera.getPicture(options).then((imageData) => {
								 this.prfimage = "data:image/jpeg;base64," + imageData;
									this.image=imageData;
										 localStorage.setItem("IMG",  this.prfimage);
									
															 var data_img = ({
											id :User,
											img:this.image
					 })
									 
										 var serialized_img = this.serializeObj(data_img); 
				 console.log(serialized_img);
				 let headers = new Headers();
				 headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
				 let options = new RequestOptions({ headers: headers });
				 var url: string = this.dataprovider.base_url + 'users/saveimage';
		 
				 this.showLoader.present().catch();
				 this.http.post(url, serialized_img, options).map(res => res.json())
					 .subscribe(data => {
				

	
										if(data.error == 0){
			 let toast = this.toastCtrl.create({
			 message: data.message,
			 duration: 3000,
			 position: 'middle'
		 });
			 toast.present();
			 this.image='';
			 // this.data= data; 
}
});
									 }, (err) => {
									 alert("Server not Working,Please Check your Internet Connection and try again!");
							
									 });
		 }
		 },
		 {
						 text: 'Cancel',
						 role: 'cancel',
						 handler: () => {
							 console.log('Cancel clicked');
						
							 //  actionsheet.dismiss()         
						 }
					 }
				 ]
			 });

			 actionsheet.present();
		 }
		 back(){
			this.app.getRootNav().setRoot(ProfilePage);
		 }
}
