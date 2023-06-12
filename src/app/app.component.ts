import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  title: string;
  price: string;
  link: string;
  thumbnail: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchQuery: string = '';
  product: Product;
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) { }

  search() {
    this.loading = true;
    this.error = '';

    const url = 'https://serpapi.com/search.json?engine=google_product&product_id=5898709734021221634&api_key=YOUR_API_KEY';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.product_results && response.product_results.length > 0) {
          const productResult = response.product_results[0];
          this.product = {
            title: productResult.title,
            price: productResult.price,
            link: productResult.link,
            thumbnail: productResult.thumbnail
          };
        } else {
          this.product = null;
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'An error occurred while fetching the product information.';
        this.loading = false;
      }
    );
  }
}
