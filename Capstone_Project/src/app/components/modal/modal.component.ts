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
  postComments: any[] = [];
  formattedDate: string = '';


  constructor(public modal: ModalService, private http: CrudService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.selectedPostId = null;
    this.closeModalEvent.emit();
  }

  ngOnChanges(): void {
    if (this.selectedPostId) {
      // Ottieni il post in base all'ID
      this.http.getPostById(this.selectedPostId).subscribe((postInfo: any) => {
        this.postInfo = postInfo;
        console.log(postInfo)

        // Ottieni l'utente associato al post
        this.http.getUserById(this.postInfo.userId).subscribe((userPostInfo: any) => {
          this.userPostInfo = userPostInfo;

          // Ottieni i commenti associati al post
          this.http.getCommentsByPostId(this.selectedPostId).subscribe((comments: any[]) => {
            this.postComments = comments;

            // Per ogni commento, ottieni l'utente associato
            for (let i = 0; i < this.postComments.length; i++) {
              const comment = this.postComments[i];

              // Ottieni l'utente associato al commento
              this.http.getUserById(comment.userId).subscribe((userCommentInfo: any) => {
                comment.user = userCommentInfo;

                // Formatta la data del commento
                comment.formattedDate = format(new Date(comment.dataCreazione), 'dd MMM yyyy, HH:mm');

                // Se ci sono risposte al commento, ottieni anche le informazioni sugli utenti per le risposte
              /* if (comment.replies && comment.replies.length > 0) {
                  // Per ogni risposta, ottieni l'utente associato
                  for (let j = 0; j < comment.replies.length; j++) {
                    const reply = comment.replies[j];

                    // Ottieni l'utente associato alla risposta
                    this.http.getUserById(reply.userId).subscribe((userReplyInfo: any) => {
                      reply.user = userReplyInfo;
                      console.log(reply);
                    });
                  }
                }*/
              });
            }
          });
        });
      });
    }
  }
}
