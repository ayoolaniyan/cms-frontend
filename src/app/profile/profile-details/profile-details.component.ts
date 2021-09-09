import { Component, OnInit } from '@angular/core';
import { ProfileData } from '../models/profile.model';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: 'profile-details.component.html',
  styleUrls: ['profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  userProfile?: ProfileData;
  userId: string;
  isLoading = false;

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.profileService.getProfile(this.userId).subscribe(profileDetails => {
      this.userProfile = {
        id: profileDetails._id,
        firstname: profileDetails.firstname,
        lastname: profileDetails.lastname
      };
      console.log(this.userProfile);
    });

  }

}
