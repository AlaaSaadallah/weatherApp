import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayService {
url = 'https://api.openweathermap.org/data/2.5/weather';
apiKey = 'f18fea513b43b0420fcff241715f54ea';
  constructor(private http: HttpClient) { }

  getWeatherDataByCoords(lat, lon){
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'imperial')
    .set('appid', this.apiKey)

    return this.http.get(this.url, {params});
  }

  getWeatherDataByCityName(city: string){
    let params = new HttpParams()
    .set('q', city)
    .set('units', 'imperial')
    .set('appid', this.apiKey)

    return this.http.get(this.url, {params});
  }
}
