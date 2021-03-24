import { Todo } from './../../../models/todo.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

 @Input() mytodo: Todo;
 @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
 @Output() deleteTodo : EventEmitter<Todo> = new EventEmitter<Todo>();
 @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();


  isHoverred = false;
  isEditing = false;
  constructor() { }

  ngOnInit(): void {
  }
  changeTodoStatus(){
    this.changeStatus.emit({...this.mytodo, isCompleted: !this.mytodo.isCompleted});
  }
  // changeEdit(){
  //   this.isEditing = true;
  //   console.log("pencil is clicked!");
  // }
  removeTodo(){
    console.log('deleted!');
    this.deleteTodo.emit(this.mytodo);
  }
  submitEdit(){
    this.editTodo.emit(this.mytodo);
    this.isEditing = false;
  }
}
