import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser: any;
  imageUrl!: string;

  constructor(private router: Router, private authService: AuthService, private renderer: Renderer2) { }


  @ViewChild('image', { static: false }) imageElement!: ElementRef;


  ngOnInit(): void {

    this.authService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
      console.log(this.currentUser)

      const imageBase64 = userInfo.imagedata.imageData;
      const imageBytes = this.base64ToArrayBuffer(imageBase64);
      const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
      const safeImageUrl = URL.createObjectURL(imageBlob);

      this.imageUrl = safeImageUrl;
      console.log(this.imageUrl);

      this.renderer.setAttribute(this.imageElement.nativeElement, 'src', this.imageUrl);
    });

  }

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }



  logout() {
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }
}
