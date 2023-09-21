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
  imageData: SafeUrl | undefined;
  imageDataUser: SafeUrl | undefined;
  userPostInfo: Post | any;
  imageUsers: SafeUrl | undefined;
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
      const imageBase64 = userPost.imagedata.imageData;
      const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
      const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
      this.imageData = safeUrl;

      for (let i = 0; i < userPost.comment.length; i++) {
        const postComment = userPost.comment[i];

        // Formatta la data del commento nel formato desiderato
        const formattedDate = format(new Date(postComment.dataCreazione), 'dd MMM yyyy, HH:mm');

        // Assegna la data formattata al commento
        postComment.dataCreazioneFormatted = formattedDate;

      }

      if (postInfo) {
        this.http.getUserById(userPost.userId).subscribe(userPostInfo => {
          this.userPostInfo = userPostInfo;

          const userPost = this.userPostInfo;
          const imageBase64 = userPost.imagedata.imageData;
          const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
          const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
          this.imageDataUser = safeUrl;
        });
      }

      for (let i = 0; i < userPost.comment.length; i++) {
        const postComment = userPost.comment[i];

        this.http.getUserById(postComment.userId).subscribe(userInfo => {
          const commentUser = userInfo;
          const userPost = commentUser;
          const imageBase64 = userPost.imagedata.imageData;
          const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
          const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
          this.imageUsers = safeUrl;
          this.usersInfo.push(commentUser);
        });

        this.postComment.push(postComment);
      }
    });
  }

}
