import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DataProvider } from '../../providers/data/data';
import { ViewdetailPage } from '../viewdetail/viewdetail';

/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
	
public orderlist:any;
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
	  
	   this.getOrderList(); 
  }
 	showToast(text) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'middle'
		});
		toast.present();
	} 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }

  
  
  
	getOrderList(){
				var user = JSON.parse(localStorage.getItem('userData2'));  
				var userID = user.User.id;
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
               var url = this.dataprovider.base_url + 'Orders/orderlist';
				var postdata = JSON.stringify({
						uid:userID
				});
        
				console.log(" postdata" + postdata);
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(data => {
							Loader.dismiss();
							console.log(data);
							if (data.isSuccess === true ) {
									this.orderlist = data.data;
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
