import { Component, OnInit } from '@angular/core';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import {AddPostService} from '../add-post.service';
import { SearchService } from '../header/search.service';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageCur : number = 0;
  pageSize : number = 5;
  totalPages !: number ;
  pageOfPosts: any[] = [];
  isNotSearching: boolean = true;
  pageCurSearch : number = 0;
  title: string = '';

  // posts: Observable<Array<PostPayload>>;
  posts: any[] = [];
  value = 0;

  lstTagSelect = [
    {
      id: 1,
      name: "Opinion & Debate",
      isSelecting: false
    },
    {
      id: 2,
      name: "Science & Technology",
      isSelecting: false
    },
    {
      id: 3,
      name: "Music",
      isSelecting: false
    },
    {
      id: 4,
      name: "Sport",
      isSelecting: false
    },
    {
      id: 5,
      name: "Tourism & Culinary",
      isSelecting: false
    },
    {
      id: 6,
      name: "Skill",
      isSelecting: false
    }
  ]

  selectedTags: any[] = [];
  tagSelected: any;

  constructor(private postService: AddPostService, private searchService: SearchService, private tagService: TagService) { }

  ngOnInit() {
    this.getPosts();
  }

  handleChange(checked: boolean, tag: any): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }

  getPosts() {
    this.postService.getAllPosts(this.pageCur,this.pageSize).subscribe(data => {
      console.log(data);

      this.posts = data['content'];
      console.log("before",this.posts);

      this.posts = this.posts.map((e) =>
          e.content.length >  1000
            ? { ...e, content: e.content.slice(0,1500) + "... <strong>[continued]</strong>" }
            : e
        );

      console.log("after", this.posts);
      this.totalPages = data['totalPages'];
    });
  }

  onChangePage(pageOfPosts: Array<any>) {
      // update current page of items
      this.pageOfPosts = pageOfPosts;
  }

  onPageIndexChange(event: any) {
    this.pageCur = event - 1;
    this.getPosts();
    window.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth'
    });
  }

  searchAllPosts(){
    this.searchService.searchAllPosts(this.pageCurSearch,this.pageSize,this.title).subscribe(data => {
      console.log(data);
    });
  }

  onSearchPageIndexChange(event: any){
    this.pageCurSearch = event - 1;
    this.searchAllPosts();
    window.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth'
    });
  }

  checkLength(post: string) {
    console.log(post.length);
  }

  searchPostEvent(data:any) {
    this.isNotSearching = false;
    this.posts = data.content;
    this.posts = this.posts.map((e) =>
          e.content.length >  1000
            ? { ...e, content: e.content.slice(0,1500) + "... <strong>[continued]</strong>" }
            : e
        );
  }

  searchTitleEvent(data:any) {
    this.title = data;
  }

  getPostByTag(data: number) {
    // this.tagSelected = {}
    // this.lstTagSelect = this.lstTagSelect.map(obj => obj.id = data);
    // this.tagSelected.isSelecting = true;
    console.log(data);
    this.lstTagSelect = this.lstTagSelect.map((obj) => {
      if(obj.isSelecting = true) {
          obj.isSelecting = false;
      }
      return obj
    });
    this.lstTagSelect = this.lstTagSelect.map((obj) => {
      if(obj.id == data) {
          obj.isSelecting = true;
      }
      return obj
    });
    this.tagService.getPostByTag(data).subscribe((data:any) => {
      console.log(data);
      this.posts = data.map((e:any) =>
      e.content.length >  1000
      ? { ...e, content: e.content.slice(0,1500) + "... <strong>[continued]</strong>" }
      : e
      );
    });
  }
}
