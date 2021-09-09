import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/posts/models/post.model';
import { DataService } from '../data.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: Post[];
  autoCompleteList: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    public dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe(posts => {
      this.allPosts = posts;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });


    // when user types something in input, the value changes will come through this
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    });
  }

  private autoCompleteExpenseList(input) {
    const categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList(val) {
    const categoryList = [];
    if (typeof val !== 'string') {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) !== -1)
      : this.allPosts;
  }

  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(post: Post) {
    const k = post ? post.title : post;
    return k;
  }

  filterPostList(event) {
    const posts = event.source.value;
    if (!posts) {
      this.dataService.searchOption = [];
    }
    else {
      this.dataService.searchOption.push(posts);
      this.onSelectedOption.emit(this.dataService.searchOption);
    }
    this.focusOnPlaceInput();
  }

  removeOption(option) {

    const index = this.dataService.searchOption.indexOf(option);
    if (index >= 0) {
      this.dataService.searchOption.splice(index, 1);
    }
    this.focusOnPlaceInput();
    this.onSelectedOption.emit(this.dataService.searchOption);

  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
