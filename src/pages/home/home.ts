import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import  Pusher  from 'pusher-js';
import * as c3 from 'c3';
declare var d3: any;
//declare var Pusher: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chart: any;
  posts: any;
  sites: Array<any>;
  pusher: any;
  x: [string, number];
  constructor(public navCtrl: NavController, public http: Http) {
    this.chart = null;
    this.posts = null;
    this.sites = [];
    
 this.pusher = new Pusher('c089a6025f9c3f9cffca', {
      cluster: 'eu',
      encrypted: true
    });
   
    var channel = this.pusher.subscribe('analytics-channel');
    channel.bind('realtime-visitors', (data) => {
      this.fillDonut(data);
    });
   
  }

  fillDonut(data){
    let total = 0;
    for (var item in data) {
        total = total + data[item].value;
        let x = [data[item].key, data[item].value];
        this.sites.push(x);
      }

      this.chart.load({
        columns: this.sites
      });
      d3.select('#chart .c3-chart-arcs-title').node().innerHTML = "Visitors " + total;
  }

  ionViewDidEnter() {
    this.http.get('http://localhost/MobileOfficeApi2/api/google/realtimelatest').map(res => res.json()).subscribe(data => {
      this.posts = data;
      this.fillDonut(data);
    });

    this.chart = c3.generate({
      data: {
        columns: [
          ['Sweden', 6543],
          ['Finland', 2332],
          ["Denmark", 1121],
          ["Norway", 3211]
        ],
        type: 'donut'
      },
      color: {
        pattern: ['rgba(33, 158, 217, 1.0)', 'rgba(33, 158, 217, 0.7)', 'rgba(33, 158, 217, 0.4)', 'rgba(33, 158, 217, 0.1)', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
      },
      transition: {
        duration: 500
      },
      donut: {
        title: "73733  visitors",
        width: 70,
        label: {
          show: true,
          format: function (value: any, ratio: any) { return value; }
        },
      }
    });
  }
}
