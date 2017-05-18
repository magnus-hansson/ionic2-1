
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { VisTimelineService, VisTimelineItems } from 'ng2-vis';
//import {Timeline, DataSet } from 'vis';
//import {Timeline, DataSet } from'vis/lib/timeline/Timeline'
import * as vis from 'vis';

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
  timeline:any;
  container: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  //   var items = new vis.DataSet([
  //   {id: 1, content: 'item 1', start: '2013-04-20'},
  //   {id: 2, content: 'item 2', start: '2013-04-14'},
  //   {id: 3, content: 'item 3', start: '2013-04-18'},
  //   {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
  //   {id: 5, content: 'item 5', start: '2013-04-25'},
  //   {id: 6, content: 'item 6', start: '2013-04-27'}
  // ]);
    this.container = document.getElementById('visualization');
   // this.timeline = new vis.Timeline(this.container,items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
  }

}
