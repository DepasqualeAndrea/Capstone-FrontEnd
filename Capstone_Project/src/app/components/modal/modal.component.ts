import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() selectedPostId!: number | any;
  @Input() selectedUserId!: number | any;
  @Input() selectedCommentId!: number | any;
  @Output() closeModalEvent = new EventEmitter()

  modal = {
    showReplyModal: false
  };

  openModal(commentId: number): void {
    setTimeout(() => {
      this.selectedCommentId = commentId;
      console.log(this.selectedCommentId);
      this.modal.showReplyModal = true;
    }, 200)
  }
  onSecondModalClose() {
    this.modal.showReplyModal = false;
  }

  closeModal() {
    this.selectedCommentId = null;
    this.closeModalEvent.emit();
  }


  sub!: Subscription;
  postInfo: any;
  userPostInfo: any;
  postComments: any[] = [];
  userInfos: any[] = [];
  reply: any[] = [];
  formattedDate: string = '';



  constructor(private http: CrudService) { }

  ngOnChanges(): void {


  }

  ngOnInit(): void {
    this.sub! = this.http.getPostById(this.selectedPostId).subscribe((postInfo: any) => {
      this.postInfo = postInfo;
      if (this.postInfo) {
        this.http.getUserById(this.postInfo.userId).subscribe((userPostInfo: any) => {
          this.userPostInfo = userPostInfo;
        });
      }
    });


    this.sub! = this.http.getCommentsByPostId(this.selectedPostId).subscribe(comments => {
      this.postComments = comments;
      const userIds = this.postComments.map(comment => comment.usercommentId);
      const userObservables = userIds.map(usercommentId => this.http.getUserById(usercommentId));

      forkJoin(userObservables).subscribe(users => {
        this.userInfos = users;
        this.postComments.forEach((comment) => {
          comment.formattedDate = format(new Date(comment.dataCreazione), 'dd MMM yyyy, HH:mm');
        });

        this.postComments.forEach(comment => {
          this.sub! = this.http.getRepliesByCommentId(comment.commentId).subscribe(replies => {

            replies.forEach((reply: any) => {
              reply.showReplyInput = false;
              reply.replyContent = '';
            });

            replies.forEach((reply: any) => {
              const user = this.userInfos.find(userInfo => userInfo.userId === reply.userReplyId);
              if (user) {
                this.sub! = this.http.getUserById(reply.userReplyId).subscribe(userRepliesInfo => {
                  console.log(userRepliesInfo);
                  reply.profileImageUrl = userRepliesInfo.profileImageUrl;
                });
              } else {

                reply.profileImageUrl = 'Nessuna Immagine per l\nutente selezionato';
              }
            });

            comment.replies = replies;

            replies.forEach((reply: { formattedDate: string; dataCreazione: string | number | Date; }) => {
              reply.formattedDate = format(new Date(reply.dataCreazione), 'dd MMM yyyy, HH:mm');


            });
          });
        });
      });
    });
  }

  inviaRisposta(reply: any): void {

  }









}






