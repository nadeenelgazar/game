import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import { LocalService } from '../local.service';
@Component({
  selector: 'app-iframe-page',
  templateUrl: './iframe-page.component.html',
  styleUrls: ['./iframe-page.component.css']
})
export class IframePageComponent {
  parentWindow = window.parent;
  @ViewChild('player1', { static: false }) player1: NgxChessBoardView | undefined;

  constructor(private ngxChessBoardService: NgxChessBoardService, private cdref: ChangeDetectorRef, private localStore: LocalService) {
    window.addEventListener("message", (e) => {
      var data = e.data; 
      if (data.reset) {
        this.player1?.reset();
      }
      if (data.event != null) {
        this.player1?.setFEN(data.event.fen);
      }
    });
  }

  ngOnInit(): void {
    this.cdref.detectChanges();
    var storedData = this.localStore.getData("board");
    if (storedData != null) {
      var data = JSON.parse(storedData);
      this.player1?.setFEN(data.fen);
    }
  }

  playerOneMoveCompleted(event: any) {
    if (event.checkmate || event.check) {
      this.parentWindow.postMessage({ "player": "1", "event": event, "endMessage": "player 1 Won" }, "*");
      return;
    } else if (event.stalement) {
      this.parentWindow.postMessage({ "player": "1", "event": event, "endMessage": "stalemate" }, "*");
      return;
    } else {
      this.parentWindow.postMessage({ "player": "1", "event": event }, "*");
    }

  }

}
