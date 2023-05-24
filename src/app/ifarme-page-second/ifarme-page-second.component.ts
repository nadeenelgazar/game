import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import { LocalService } from '../local.service';
@Component({
  selector: 'app-ifarme-page-second',
  templateUrl: './ifarme-page-second.component.html',
  styleUrls: ['./ifarme-page-second.component.css']
})
export class IfarmePageSecondComponent {
  turn2 = false;
  parentWindow = window.parent;
  @ViewChild('player2', { static: false }) player2: NgxChessBoardView | undefined;

  constructor(private ngxChessBoardService: NgxChessBoardService, private cdref: ChangeDetectorRef, private localStore: LocalService) {
    this.player2?.reverse();
    window.addEventListener("message", (e) => {
      var data = e.data;
      if (data.reset) {
        this.player2?.reset();
        this.player2?.reverse();
      }
      if (data.event != null) {
        this.player2?.setFEN(data.event.fen);
        this.player2?.reverse();
      }
    });
  }

  ngOnInit(): void {
    this.cdref.detectChanges();
    var storedData = this.localStore.getData("board");
    if (storedData != null) {
      var data = JSON.parse(storedData);
      this.player2?.setFEN(data.fen);
    }
    this.player2?.reverse();
  }

  playerTwoMoveCompleted(event: any) {
    if (event.checkmate || event.check) {
      this.parentWindow.postMessage({ "player": "2", "event": event, "endMessage": "player 2 Won" }, "*");
      return;
    } else if (event.stalement) {
      this.parentWindow.postMessage({ "player": "2", "event": event, "endMessage": "stalemate" }, "*");
      return;
    } else {
      this.parentWindow.postMessage({ "player": "2", "event": event }, "*");
    }
  }

}
