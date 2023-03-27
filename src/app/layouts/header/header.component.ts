import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isOpen = false;
  catArray: any;

  isShow() {
    this.isOpen = !this.isOpen;
  }

  constructor(private catService: CategoriesService) {}

  ngOnInit(): void {
    this.catService.loadData().subscribe((val) => {
      this.catArray = val;
    });
  }
}
