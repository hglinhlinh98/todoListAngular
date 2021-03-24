import { TodoService } from './services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myTodoList';
  constructor(private todoService: TodoService){}
  ngOnInit(){
    this.todoService.fetchFromLocalStorage();
  }
}
