import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;
  userId: string;
  private authStatusSub: Subscription;

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }

  onAddAccount(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.profileService.addProfile(this.userId, form.value.firstname, form.value.lastname);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
