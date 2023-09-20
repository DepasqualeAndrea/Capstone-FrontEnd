import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
//import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser: any;
  imageUrl!: any;

  modal = {
    showModal: false
  };

  openModal() {
    setTimeout(() => {

      this.modal.showModal = true;

    }, 400)
  }
  closeModal() {
    this.modal.showModal = false;
  }


  constructor(private router: Router, private authService: AuthService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {

    this.authService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
      console.log(this.currentUser)

      const imageBase64 = userInfo.imagedata.imageData;
      const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
      const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
      const SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob))
      this.imageUrl = SafeUrl;
      //console.log(this.imageUrl)
    });

  }

  logout() {
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }
}
