import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() selectedPostId!: number | any;
  @Input() selectedUserId!: number | any;
  @Output() closeModalEvent = new EventEmitter()

  sub!: Subscription;
  postInfo: any;
  userPostInfo: any;


  //gestione utenti commenti
  postComments: any[] = [];
  userInfos: any[] = [];
  reply: any[] = [];
  formattedDate: string = '';



  constructor(public modal: ModalService, private http: CrudService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }



  closeModal() {
    this.selectedPostId = null;
    this.closeModalEvent.emit();
  }
  ngOnChanges(): void {
    // Ottieni informazioni sul post
    this.http.getPostById(this.selectedPostId).subscribe((postInfo: any) => {
      this.postInfo = postInfo;
      if (this.postInfo) {
        this.http.getUserById(this.postInfo.userId).subscribe((userPostInfo: any) => {
          this.userPostInfo = userPostInfo;
        });
      }
    });

    // Ottieni i commenti principali
    this.http.getCommentsByPostId(this.selectedPostId).subscribe(comments => {
      this.postComments = comments;
      const userIds = this.postComments.map(comment => comment.usercommentId);
      const userObservables = userIds.map(usercommentId => this.http.getUserById(usercommentId));

      forkJoin(userObservables).subscribe(users => {
        this.userInfos = users;

        // Formatta la data per ciascun commento
        this.postComments.forEach((comment) => {
          comment.formattedDate = format(new Date(comment.dataCreazione), 'dd MMM yyyy, HH:mm');
        });

        // Ottieni le risposte per ciascun commento principale
        this.postComments.forEach((comment) => {
          this.http.getCommentsById(comment.commentId).subscribe((replies: any) => {
            comment.replies = replies;
            console.log(replies);

            // Ottieni gli utenti associati alle risposte
            const replyUserIds = replies.map((reply: { usercommentId: any; }) => reply.usercommentId);
            const replyUserObservables = replyUserIds.map((replyUserId: number) => this.http.getUserById(replyUserId));

            forkJoin(replyUserObservables).subscribe(replyUsers => {
              comment.replyUsers = replyUsers;
              console.log(replyUsers);
            });
          });
        });
      });
    });
  }










}






