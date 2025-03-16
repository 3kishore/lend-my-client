import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class RouterHelperService {
    private previousUrl: string | null = null;
    private currentUrl: string | null = null;
  
    constructor(private router: Router) {
      this.currentUrl = this.router.url;
  
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
          console.log(this.previousUrl)
          console.log(this.currentUrl)
        }
      });
    }
  
    getPreviousUrl(): string | null {
      return this.previousUrl;
    }

    getCurrentUrl(): string | null {
        return this.currentUrl;
      }
  }