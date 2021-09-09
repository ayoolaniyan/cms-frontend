import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileData } from './models/profile.model';


const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  addProfile(id: string, firstname: string, lastname: string) {
    const profileData: ProfileData = { id: id, firstname: firstname, lastname: lastname };
    return this.http.put(BACKEND_URL + id, profileData).subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  getProfile(id: string) {
    return this.http.get<{ _id: string, firstname: string, lastname: string }>(BACKEND_URL + id);
  }

}
