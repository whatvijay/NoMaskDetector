import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CalendarOptions } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  title = 'calendar';
  calendarPlugins = [dayGridPlugin]; 
  dateMap = new Map();
  flag:boolean=false;
  lineChart = [];
  noMaskData = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
  };
  text = 'Click on date to get detailed Analysis report over graph!!';
  showText: boolean = true;

  constructor() { }

  ngOnInit() {  
    this.getNoMaskDataForMonth();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getFlag() {
    return this.flag;
  }

  handleDateClick(arg) {
    this.flag = true;
    this.text = null;
    let data = this.noMaskData.find(object => object.date == arg.dateStr);
    if(data){
      this.getGraphData(data.date, data.noMaskData);
    }
    else {
      alert('No data found for the selected Date');
    }
  }
  getNoMaskDataForMonth(){
    for(let i=1;i<=30;i++){
      let date = '2020-09-';
      let arr = this.getNoMaskDataForDay();
      if(i<10) {
        date = date + '0';
      }
      date = date + i;
      let data = {
        date: date,
        noMaskData: arr
      }
      this.noMaskData.push(data);
    }
  }
  getNoMaskDataForDay(){
    let arr = [];
    for(let i=1;i<25;i++){
      let val = this.getRandomNumber();
      arr.push(val);
    }
    return arr;
  }
  getRandomNumber(){
    let max = 80;
    let min = 0;
    let val = Math.floor(Math.random() * max);
    return val; 
  }
  getGraphData(date, data){
    this.lineChart.push(new Chart('lineChart',{
      type:'line',
        data:{
          labels:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          datasets: [{
            label:'Number of persons without mask',
            data: data,
            fill:false,
            lineTension:0.3,
            borderColor:"red",
            borderWidth:1
          }]
        },
        options:{
          title:{
            text:"Analysis Report " + date,
          display:true
        },
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    }))
  }

}
