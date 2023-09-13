import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  modal = {
    showModal: true
  };

  openModal(postId: number) {
    setTimeout(() => {

      this.modal.showModal = true;

    }, 400)
  }
  closeModal() {
    this.modal.showModal = false;

  }
  constructor() { }

  ngOnInit(): void {
  }

}
