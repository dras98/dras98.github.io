import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryList } from 'src/app/model/dto/category/category-list.model';
import { endpoint } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<CategoryList> {
    return this.http.get<CategoryList>(endpoint.external.category);
  }
}
