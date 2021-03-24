import { TodoService } from './../../services/todo.service';
import { FilterButton } from './../../../models/filtering.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Filter } from 'src/models/filtering.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit,OnDestroy {
  length = 0;
  filterButtons: FilterButton[] = [
    {type:  Filter.All, label: 'All', isActive: true },
    {type:  Filter.Active, label: 'Active', isActive: false },
    {type:  Filter.Completed, label: 'Completed', isActive: false }
  ]
  destroy$ : Subject<null> = new Subject<null>();
  constructor(private todoService : TodoService) { }

  ngOnInit(): void {
    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => this.length = length);
  }
  filter(type: Filter){
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }
  private setActiveFilterBtn(type: Filter){
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
