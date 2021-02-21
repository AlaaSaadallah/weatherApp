import { Component, OnInit } from '@angular/core';
import { TodayService } from '../today.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  lat;
  lon;
  weather;
  locatonDenied:Boolean = true;
  locatonDeniedEnableCity=false;
  
  constructor(private todayService: TodayService) { }

  ngOnInit() {
  
  }

  toggle() {
    // this.show = !this.show;
    // this.show = 'visability : visable'
  //  $('.show').css('visability','visable');
 let styles = <HTMLElement>document.getElementById('show');
 return  styles.setAttribute('style', 'display:visable');
  }
  getLocation(){
    if('geolocation' in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.todayService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data=>{
          this.weather = data;
        });
      }, (error)=>{
        if(error.code == error.PERMISSION_DENIED){
          this.locatonDenied = false;
          this.locatonDeniedEnableCity = true;
        }
      })
    }
  }

  getCity(city){
    this.todayService.getWeatherDataByCityName(city).subscribe((data:any)=>{
      this.weather = data;
      this.lon = data.coord.lon;
      this.lat = data.coord.lat;
      
    })
  }
}