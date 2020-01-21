import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [ApiService]
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  zone: string;
  cell: number;
  apiData: any;
  isPlaced = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.getApiData();
    setInterval(() => {
      this.apiService.getDataFromSensor().subscribe((data)=>{
      console.log(data);
      this.apiData = data;
      if(this.apiData.tags[0].zones){
        this.zone = this.apiData.tags[0].zones[0].name;
        this.cell = parseInt(this.zone.substr(this.zone.length-1, 1));
        this.makeMove(this.cell-1);
      }
    });}, 2000);
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
  }

  getApiData() { 
    this.apiService.getDataFromSensor().subscribe((data)=>{
      console.log(data);
      this.apiData = data;
      if(this.apiData.tags[0].zones){
        this.zone = this.apiData.tags[0].zones[0].name;
        this.cell = parseInt(this.zone.substr(this.zone.length-1, 1));
        this.makeMove(this.cell-1);
      }
    });
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
