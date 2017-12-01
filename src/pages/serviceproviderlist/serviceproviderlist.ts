import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DataProvider } from '../../providers/data/data';
import { ViewdetailPage } from '../viewdetail/viewdetail';
/**
 * Generated class for the ServiceproviderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-serviceproviderlist',
  templateUrl: 'serviceproviderlist.html',
})
export class ServiceproviderlistPage {
public sdate;
public stime;
public title:any;
public stype;
public providers:any;
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
		var lists = JSON.parse(localStorage.getItem('serviceItems'));
		console.log(localStorage.getItem('serviceItems'));
		console.log(lists);
		this.sdate = navParams.get("serviceDate");
		this.stime = navParams.get("serviceTime");
		this.title = lists;
		this.stype = localStorage.getItem('providerType');
    this.getList();
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
    console.log('ionViewDidLoad ServiceproviderlistPage');
  }
viewprovider(pID){
   this.navCtrl.push(ViewdetailPage,{providerId:pID});
}
getList(){

        var token = localStorage.getItem('tokenId');
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'availableDates/availabledays';
				var postdata = JSON.stringify({
            sdate:this.sdate,
						stime:this.stime,
            title:this.title,
						stype:this.stype
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
									 //localStorage.setItem("userData", data.data);
									//this.showToast(data.msg);
									this.providers = data.data;
									// var total_price = 0;
									// var total_price1 = 0;
									// for (let entry of data.data) {
										// console.log(entry.User.Service); 
									// for (let item of entry.User.Service) {
										// console.log(item);
										// console.log(item.price);
										// total_price += parseInt(item.price);
										//total_price1 = total_price1 + parseInt(item.price);
										
									// }	

									// }
									// console.log(parseInt(total_price));
									//console.log(total_price1);
									// console.log('total');
									// return false;
									//this.app.getRootNav().setRoot(TabsPage);
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

  confirm(formData)

{
	console.log(formData.value);

	localStorage.setItem('selectedprovider',formData.value.selectprovider); 
	
	this.navCtrl.push(ConfirmPage);
}
}
