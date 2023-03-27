import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredArray: any;
  latestArray:any;

  constructor(private post: PostService) {}
  ngOnInit(): void {
    this.post.loadFeatured().subscribe((val) => {
      this.featuredArray = val;
    });

    this.post.loadLatest().subscribe(val=>{
      this.latestArray = val;
    })
  }
}
