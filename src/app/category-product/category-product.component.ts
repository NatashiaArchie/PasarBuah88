import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss']
})
export class CategoryProductComponent implements OnInit {
  categoryId: string;
  product: Product[];

  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.categoryService.refreshList();
    this.categoryService.productRefreshList();

    this.route.paramMap
    .subscribe((param: ParamMap) => {
      let id = param.get('id');
      this.categoryId = id;
      console.log(this.categoryId);
    })
  }

  back() {
    this.router.navigate(['home']);
  }

}
