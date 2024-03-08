import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: any;

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.http.get('https://localhost:5001/api/transactions').subscribe({
      next: response => this.transactions = response,
      error: error => console.log(error),
      complete: () => console.log('Transactions request has completed')
    });
  }

}
