import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface SearchResult {
  id: number;
  content: string;
  score: number;
}

@Component({
  selector: 'app-specification-search',
  templateUrl: './specification-search.component.html',
  styleUrls: ['./specification-search.component.scss']
})
export class SpecificationSearchComponent {
  private baseURL = environment.apiUrl;
  searchQuery: string = '';
  results: SearchResult[] = [];
  sortAsc: boolean = false;

  constructor(private http: HttpClient) {}

  search() {
    if (!this.searchQuery.trim()) return;

    this.http.get<SearchResult[]>(`${this.baseURL}/product/search-specifications?query=${encodeURIComponent(this.searchQuery)}`)
      .subscribe(res => {
        this.results = [...res].sort((a, b) => b.score - a.score);
      });
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
    this.results = [...this.results].sort((a, b) =>
      this.sortAsc ? a.score - b.score : b.score - a.score
    );
  }

  highlight(text: string): string {
    if (!this.searchQuery) return text;

    const escapedQuery = this.escapeRegExp(this.searchQuery);
    const regex = new RegExp(escapedQuery, 'gi');
    return text.replace(regex, match => `<mark>${match}</mark>`);
  }

  escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
