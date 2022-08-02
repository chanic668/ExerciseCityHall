import { Component, OnInit, ViewChild } from '@angular/core';
import { SocksShopService } from 'src/services/socksShop.service';
import { BehaviorSubject, merge } from 'rxjs';
import { fromApi } from 'src/models/fromApi';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'myApp';
  public dataSourceB = new BehaviorSubject<any[]>([]);
  // exampleDatabase: ExampleHttpDatabase | null;

  displayedColumns: string[] = [
    'date',
    'sales',
    'orders',
    'items',
    'customers',
    'avg',
  ];
  dataSource: any = new MatTableDataSource([]);
  // dataSource = [{}];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  range = 0;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private socksShopService: SocksShopService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {
    this.getdataSourceB().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // ngAfterViewInit() {
  //   this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active,
  //           this.sort.direction,
  //           this.paginator.pageIndex
  //         ).pipe(catchError(() => observableOf(null)));
  //       }),
  //       map((data) => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = data === null;

  //         if (data === null) {
  //           return [];
  //         }

  //         // Only refresh the result length if there is new data. In case of rate
  //         // limit errors, we do not want to reset the paginator to zero, as that
  //         // would prevent users from re-triggering requests.
  //         this.resultsLength = data.total_count;
  //         return data.items;
  //       })
  //     )
  //     .subscribe((data) => (this.data = data));
  // }

  ngOnInit(): void {
    // this.testService.getHello().subscribe(res => {
    //   this.test = res as string;
    // });

    this.socksShopService.getSocksShop().subscribe((res) => {
      let r = res as fromApi;
      let array: any[] = [];
      Object.keys(r.sales).forEach((element) => {
        let o = r.sales[element];
        o['date'] = element;
        o['avg'] = o['sales'] / o['items'];
        array.push(o);
      });
      this.resultsLength = array.length;
      let sales = 0;
      let big = true;
      let thisRange = 0;
      array.forEach((element) => {
        let thisBig = element['sales'] > sales;
        if ((big && thisBig) || (!big && !thisBig)) thisRange++;
        else {
          if (thisRange > this.range) this.range = thisRange;
          thisRange = 0;
        }
        big = thisBig;
      });
      this.dataSourceB.next(array);
      console.log(res);
    });
  }

  getdataSourceB() {
    return this.dataSourceB.asObservable();
  }

  aaaaa(row: any) {
    alert(JSON.stringify(row));
  }
}
