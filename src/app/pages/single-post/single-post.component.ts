import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  singlePost: any;
  similarArray: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postService.countViews(val['id'])
      this.postService.loadSingleData(val['id']).subscribe((post) => {
        this.singlePost = post;
        this.loadSimilarPost(this.singlePost.category.categoryId);
      });
    });
  }
  loadSimilarPost(catId: any) {
    this.postService.loadSimilar(catId).subscribe((val) => {
      this.similarArray = val;
    });
  }
}
