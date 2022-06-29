import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MarketStorage';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "50%"
    }).afterClosed().subscribe(value => {
      if(value === 'save'){
        this.getAllProducts()
      }
    });
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching products")
      }
    })
  }
  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      data: row
    }).afterClosed().subscribe(value => {
      if(value === 'update'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id : number){
    this.api.deleteProducr(id)
    .subscribe({
      next: (response) => {
        alert("Succesfully deleted!")
        this.getAllProducts();
      },
      error: () => {
        alert("Error while deleting product!")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
