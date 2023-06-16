
  
  

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Animal {
  name: string;
  taxonomy: {
    scientific_name: string;
  };
  locations: string[];
  characteristics: {
    most_distinctive_feature: string;
    lifespan: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'selecttask';
  searchQuery: string = '';
  API_KEY = 'y/M9h31ykN9Jp3gMthed4A==e3PGetK9CMQqoL8h';
  animals: Animal[] = [];
  totalAnimalDetails: number = 0;
  
  showTable: boolean = false;
  
  
  
  constructor(private http: HttpClient) {}
 
  search() {
    if (!this.searchQuery) {
    
      window.alert("Enter any Animal name");
      return;
    }
    
    const url = `https://api.api-ninjas.com/v1/animals?name=${this.searchQuery}`;
    const headers = { 'x-Api-Key': this.API_KEY };

    this.http.get<any[]>(url, { headers }).subscribe(
      (animals) => {
        this.animals = animals;
        this.totalAnimalDetails = this.animals.length;
        this.showTable = this.animals.length > 0;
        console.log('Performing search for:', this.searchQuery);
        if (!this.showTable) {
          window.alert("No animals found.");
        }
        
      },
      (error) => {
        console.error(error);
      }
      
    );
    
  }
}








