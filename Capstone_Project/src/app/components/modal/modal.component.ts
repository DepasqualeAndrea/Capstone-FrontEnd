import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/interface/post.interface';
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
  postInfo: Post | any;
  userPostInfo: Post | any;
  postComment: any[] = [];
  usersInfo: any[] = [];
  formattedDate: string = '';


  constructor(public modal: ModalService, private http: CrudService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.selectedPostId = null;
    this.closeModalEvent.emit();
  }

  ngOnChanges(): void {
    this.http.getPostById(this.selectedPostId).subscribe(postInfo => {
      this.postInfo = postInfo;
      const userPost = this.postInfo;

      for (let i = 0; i < userPost.comment.length; i++) {
        const postComment = userPost.comment[i];
        const formattedDate = format(new Date(postComment.dataCreazione), 'dd MMM yyyy, HH:mm');
        postComment.dataCreazioneFormatted = formattedDate;

      }

      if (postInfo) {
        this.http.getUserById(userPost.userId).subscribe(userPostInfo => {
          this.userPostInfo = userPostInfo;

        });
      }

      for (let i = 0; i < userPost.comment.length; i++) {
        const postComment = userPost.comment[i];

        this.http.getUserById(postComment.userId).subscribe(userInfo => {
          const commentUser = userInfo;
          this.usersInfo.push(commentUser);
        });

        this.postComment.push(postComment);
      }
    });
  }

}
