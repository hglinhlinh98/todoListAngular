import { LocalStorageService } from './local-storage.service';
import { Filter } from 'src/models/filtering.model';
import { Todo } from './../../models/todo.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';
  private todos: Todo[] ;

  private filterdTodos:Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todos$ : Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) { }

  fetchFromLocalStorage(){
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filterdTodos = [...this.todos];
    this.updateTodosData();
  }
  updateToLocalStorage(){
    this.storageService.setObject(TodoService.TodoStorageKey , this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }
  filterTodos(flt: Filter, isFiltering: boolean = true){
    this.currentFilter = flt;
    switch(flt){
      case Filter.Active:
        this.filterdTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filterdTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      default:
        this.filterdTodos = [...this.todos];
    }
    if(isFiltering){
      this.updateTodosData();

    }

  }
  updateTodosData(){
    this.displayTodoSubject.next(this.filterdTodos);
    this.lengthSubject.next(this.todos.length);
  }

  addTodo(content: string){
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date,content,false);
    this.todos.push(newTodo);
    this.updateToLocalStorage();

  }
  changeTodoStatus(id: number, isCompleted: boolean){
    const index = this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.isCompleted = isCompleted;
    this.todos.splice(index,1,todo);
    this.updateToLocalStorage();
  }
  deleteTodo(id: number){
    const index = this.todos.findIndex(t => t.id === id);
    this.todos.splice(index,1);
    this.updateToLocalStorage();
  }
  editTodo(id: number, content: string){
    const index = this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.content = content;
    this.todos.splice(index,1,todo);
    this.updateToLocalStorage();
  }
}
