import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// import * as paginate from 'jw-paginate';
// import paginate = require('jw-paginate');
const paginate = require("jw-paginate");

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() posts: any[] = [];
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 5;
  @Input() maxPages = 10;

  pager: any = {};

  // constructor(private jwPaginate: JwPaginationModule) { }

  ngOnInit() {
    // set page if items array isn't empty
    if (this.posts && this.posts.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if posts array has changed
    if (changes['posts'].currentValue !== changes['posts'].previousValue) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.posts.length, page, this.pageSize, this.maxPages);
    console.log(this.pager);


    // get new page of posts from posts array
    var pageOfPosts = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(pageOfPosts);

    // call change page function in parent component
    this.changePage.emit(pageOfPosts);
  }
}
