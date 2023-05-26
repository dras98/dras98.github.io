import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionData } from 'src/app/model/dto/sessionData/session-data.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  public navigate(url: string[], jsonData?: SessionData): void {

    if(jsonData) {
      sessionStorage.setItem(jsonData.key, jsonData.data);
    }

    this.router.navigate(url);
  }

  public getSessionData(dataKey: string): string | null {
    return sessionStorage.getItem(dataKey);
  }

  public removeFromSessionData(dataKey: string): void {
    sessionStorage.removeItem(dataKey);
  }

}
