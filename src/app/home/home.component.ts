import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  iFrameUrl: SafeResourceUrl | undefined;
  iFrameUrl2: SafeResourceUrl | undefined;
  isGameFinished = false;
  endMessage = '';
  @ViewChild('2') childWindow2: ElementRef | undefined;
  @ViewChild('1') childWindow1: ElementRef | undefined;

  constructor(private sanitizer: DomSanitizer, private localStore: LocalService) {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/iframePage');
    this.iFrameUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('/iframePage2');

    window.addEventListener("message", (e) => {
      var data = e.data;
      if (data.player == "1" && this.childWindow2 != null && (data.endMessage == "player 1 Won" || data.endMessage == "stalemate")) {
        this.isGameFinished = true;
        this.endMessage = data.endMessage;
        localStore.clearData();
      } else if (data.player == "1" && this.childWindow2 != null) {
        this.childWindow2.nativeElement.contentWindow.postMessage(data, "*");
        localStore.saveData("board", JSON.stringify(data.event));
      } else if (data.player == "2" && this.childWindow1 != null && (data.endMessage == "player 2 Won" || data.endMessage == "stalemate")) {
        this.isGameFinished = true;
        this.endMessage = data.endMessage;
        localStore.clearData();
      } else if (data.player == "2" && this.childWindow1 != null) {
        this.childWindow1.nativeElement.contentWindow.postMessage(data, "*");
        localStore.saveData("board", JSON.stringify(data.event));
      }
    });
  }

  onReset() {
    this.isGameFinished = false;
    this.endMessage = '';
    var data = { "reset": true };
    if (this.childWindow1 != null && this.childWindow2 != null) {
      this.childWindow1.nativeElement.contentWindow.postMessage(data, "*");
      this.childWindow2.nativeElement.contentWindow.postMessage(data, "*");
    }
  }

}
