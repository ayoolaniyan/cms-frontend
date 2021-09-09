import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../posts/models/post.model';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  post: Post[];
  searchFieldSelected = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe(posts => {
      this.post = posts;
      this.dataService.postsData = posts;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onSelectedOption(e) {
    this.searchFieldSelected = true;
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0) {
      this.post = this.dataService.filteredListOptions();
    } else {
      // this.post = this.dataService.postsData;
      this.post = [];
    }

    console.log(this.post);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
