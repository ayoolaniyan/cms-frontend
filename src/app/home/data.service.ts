import { Injectable } from '@angular/core';
import { Post } from '../posts/models/post.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/posts/info/';

@Injectable({ providedIn: 'root' })
export class DataService {
  searchOption = [];
  public postsData: Post[];

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(BACKEND_URL);
  }

  filteredListOptions() {
    const posts = this.postsData;
    const filteredPostsList = [];
    for (const post of posts) {
      for (const options of this.searchOption) {
        if (options.title === post.title) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }

}
