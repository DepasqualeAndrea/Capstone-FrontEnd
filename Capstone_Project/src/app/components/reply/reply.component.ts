import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() selectedCommentId!: number | any;
  @Output() closeSecondModalEvent = new EventEmitter();


  commentContent: string = '';

  closeOnlySecondModal() {

    this.closeSecondModalEvent.emit(); // Emetti l'evento solo per il secondo modale
  }


  postComment() {

  }
  constructor() { }

  ngOnInit(): void {
  }

}
