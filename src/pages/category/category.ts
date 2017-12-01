import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicerepairPage } from '../servicerepair/servicerepair';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController, Nav, Platform } from "ionic-angular";
import { App  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
public catid;
public subcategories:any;
public catinfo = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
		public toastCtrl: ToastController,
    public dataprovider: DataProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public app: App
  ) {
    this.catid = navParams.get('catId');
    this.getSubCats();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
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
  getSubCats(){
    		let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });
        var url = this.dataprovider.base_url + 'subCategories/subcatbyid';

        var postdata = JSON.stringify({
          cat_id:this.catid
				});
				
				var Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
					content: ' ',
				});

					Loader.present().then(() => {
					this.http.post(url, postdata, options).map(res => res.json())
						.subscribe(datas => {
              
							Loader.dismiss();
               console.log(datas);
							if (datas.isSuccess == true ) {
                this.catinfo = datas.cat.Category;
                this.subcategories = datas.data;
							
							} else {
								this.showToast(datas.msg);
							}

						}, err => {
							console.log("Error");
							Loader.dismiss();
							console.log("Error!:", err);
						});
					})
  }

  servicerepair(subcatid,catId)
  {
  	this.navCtrl.push(ServicerepairPage,{subcatid:subcatid, catId:catId});
  }

}
