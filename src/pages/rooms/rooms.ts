
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import moment from 'moment';
//import * as vis from '../assets/vis-custom';

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
  
  timeline: any;
  timelineOptions: any;
  items: any;
  groups: any;
  container: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }

  loadRoomsFromApi() {
    return new Promise(resolve => {
      this.http.get('http://localhost/MobileOfficeApi2/api/rooms/sweden//booked?hoursAhead=2')
        .subscribe(res => resolve(res.json()));
    });
  }

  setOptions() {
    this.timeline.setOptions(this.timelineOptions);
    this.timeline.setItems(this.items);
    this.timeline.setGroups(this.groups);
  }

  setDataSet(response) {
    let rooms = [];
    let groups = [];
    for (var i = 0; i < response.length; i++) {
      let room = response[i];
      groups.push({
        content: room.name,
        id: i + 1
      });
      for (var j = 0; j < room.availableOptions.length; j++) {
        let available = room.availableOptions[j];
        rooms.push({
          id: (i * 100) + j,
          group: i + 1,
          email: room.email,
          isAvailable: available.isAvailable,
          className: available.isAvailable === true ? 'free' : 'booked',
          content: available.organizer + '(' + moment(available.start).format('HH:mm') + ' - ' + moment(available.end).format('HH:mm') + ')',
          start: available.start,
          title: available.organizer + '(' + moment(available.start).format('HH:mm') + ' - ' + moment(available.end).format('HH:mm') + ')',
          end: available.end
        });
      }
    }
    this.items = new window["vis"].DataSet(rooms);
    this.groups = groups;
  }

  ionViewDidLoad() {

    this.loadRoomsFromApi().then(response => {
      this.setDataSet(response);
      this.setOptions();
    });

    var container = document.getElementById('visualization');

    // Create a DataSet (allows two way data-binding)
    var items =  new window["vis"].DataSet([
      { id: 1, content: 'item 1', start: '2013-04-20' },
      { id: 2, content: 'item 2', start: '2013-04-14' },
      { id: 3, content: 'item 3', start: '2013-04-18' },
      { id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19' },
      { id: 5, content: 'item 5', start: '2013-04-25' },
      { id: 6, content: 'item 6', start: '2013-04-27' }
    ]);

    // Configuration for the Timeline
     this.timelineOptions = {
      hiddenDates: [ // This option allows you to hide specific timespans from the time axis. The dates can be supplied as an object
        // To hide a weekend, pick any Saturday as start and the following Monday as end and set repeat to weekly.
        { start: moment(new Date()).format('YYYY-MM-DD 00:00:00'), end: moment(new Date()).format('YYYY-MM-DD 07:30:00') },
        { start: moment(new Date()).format('YYYY-MM-DD 18:00:00'), end: moment(new Date()).format('YYYY-MM-DD 00:00:00') }
      ],
      
      zoomMin: 1000 * 60 * 60 * 2, //Set a minimum zoom interval for the visible range in milliseconds. 
      zoomMax: 1000 * 60 * 60 * 2, // Set a maximum zoom interval for the visible range in milliseconds. 
      rollingMode: true, // If true, the timeline will initial in a rolling mode - the current time will always be centered.
      // If the user drags the timeline, the timeline will go out of rolling mode and a toggle button will appear.
      stack: false, // If true (default), items will be stacked on top of each other such that they do not overlap.
      moveable: true, // Specifies whether the Timeline can be moved and zoomed by dragging the window. 
      showCurrentTime: true, // Show a vertical bar at the current time.
      autoResize: true, // If true, the Timeline will automatically detect when its container is resized, and redraw itself accordingly.
      // If false, the Timeline can be forced to repaint after its container has been resized using the function redraw().
      tooltip: {
        followMouse: true
      }
    };

    // Create a Timeline
    this.timeline = new window["vis"].Timeline(container, items, this.timelineOptions);
    console.log('ionViewDidLoad RoomsPage');
  }

}
