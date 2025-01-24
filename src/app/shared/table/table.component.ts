import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../access-data/countries-service.service';
import { MatTableModule } from '@angular/material/table';

// interface IContinent {
//   continentName: String;
// }

// interface ITableData {
//   code: string;
//   name: string;
//   continent: IContinent;
//   currencies: string[];
// }

export interface CountriesData {
  code: string;
  name: number;
  cotinentName: string;
  currencies: string[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  countries: any[] = [];

  displayedColumns: string[] = ['code', 'name', 'continentName', 'currencie'];

  constructor(private countriesService: CountriesServiceService) {}
  ngOnInit(): void {
    const query = `
  query {
  countries{
    code
    name
    continent{
      name
    }
    currencies
  }
}
`;
    const variables = {};
    this.countriesService
      .executeQuery<{ countries: any[] }>(query, variables)
      .subscribe({
        next: (data) => {
          this.countries = data.countries;
          console.log(this.countries);
        },
        error: (err) => {
          console.error('Error fetching articles:', err);
        },
      });
  }
}
