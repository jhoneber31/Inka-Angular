import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { ContentHistory, HistoryList } from 'src/app/interfaces/historyList';
import { ProductoService } from 'src/app/service/producto.service';
import { DatePipe } from '@angular/common';
import { Providers, listProviders } from 'src/app/core/lisProviders';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  providers: [DatePipe]
})
export class HistoryComponent implements OnInit, OnDestroy{

  private pageSubject = new BehaviorSubject<number>(0);
  private $page: Subscription = new Subscription();
  public totalPages: number = 0;

  public history: ContentHistory[] = [];
  public loading: boolean = true;
  public error: boolean = false;
  public selected: Date | null = null;
  public providers:Providers[] = listProviders;
  public showModal:boolean = false;
  public historySelected:ContentHistory | null = null;

  public dateFrom: string  = '';
  public dateTo: string  = '';
  public title: string = "";

  public range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private productService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.setSuscritpion();
    this.setSuscritpionRange();
  }

  setSuscritpion():void {
    this.checkQueryParams();
    this.$page = this.pageSubject.subscribe(page => {
      this.getHistory(page)
    })
  }

  setSuscritpionRange(): void {
    this.range.valueChanges.subscribe(val => {
      if (val.start) {
        this.dateFrom = this.datePipe.transform(val.start, 'yyyy-MM-dd') || '';
      } else {
        this.dateFrom = '';
      }
      if (val.end) {
        this.dateTo = this.datePipe.transform(val.end, 'yyyy-MM-dd') || '';
      } else {
        this.dateTo = '';
      }

      this.setPage(0);
    });
  }

  checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      console.log("el param page es:", params['page'])
      const page = +params['page'] || 0;
      this.setPage(page);
    });
  }

  getPage(): number {
    return this.pageSubject.getValue();
  }

  setPage(page:number): void {
    if( page < 0 || page >= this.totalPages) return;
    this.pageSubject.next(page);
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams: {page},
      queryParamsHandling: 'merge',
    })
  }

  getHistory(page:number):void {
    this.loading = true;
    this.productService.listHistory(page, this.dateFrom, this.dateTo).pipe(take(1))
    .subscribe({
      next: (data:HistoryList) => {
        const {content} = data.movimientos;
        this.history = content;
        this.totalPages = data.movimientos.totalPages;
        this.error = false;
      },
      error: (error) => {
        console.log("el error es:", error);
        this.loading = false;
        this.error = true;
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
        this.error = false;
      }
    })
  }

  showInfoHistory(history:ContentHistory):void {
    this.showModal=true;
    this.historySelected=history;
    if(history.producto) {
      this.title = 'Registro de ' + history.tipo.nombre;
    }
  }
  closeModal():void {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.$page.unsubscribe();
  }

  setTitle(newTitle:string):void {
    this.title = newTitle;
    console.log('New title:', this.title);
  }

}
