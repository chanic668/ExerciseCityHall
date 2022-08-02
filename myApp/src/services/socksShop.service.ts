import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocksShopService {
  constructor(private httpClient: HttpClient) {}

  getSocksShop() {
    return this.httpClient.get('https://raw.githubusercontent.com/RachelVinograd/JSON/main/data');
  }
}
