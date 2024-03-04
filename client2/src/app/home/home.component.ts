import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  registerMode: boolean = false;
  users: any;
  transactions: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTransactions();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    });
  }

  getTransactions() {
    this.http.get('https://localhost:5001/api/transactions').subscribe({
      next: response => this.transactions = response,
      error: error => console.log(error),
      complete: () => console.log('Transactions request has completed')
    });
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}