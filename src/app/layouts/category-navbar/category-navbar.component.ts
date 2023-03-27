import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.scss']
})
export class CategoryNavbarComponent implements OnInit{
  catArray:any;
  constructor(private catService:CategoriesService){}

  ngOnInit(): void {
    this.catService.loadData().subscribe(val=>{
      this.catArray = val;
    })
  }


}
