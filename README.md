# Angular Tic-Tac-Toe for quppa RTLS

In the scope of a seminar at INSA de Lyon including Orange Business Services (OBS), we developped a Tictactoe game that used physical quppa RTLS sensors and tags to place the tags in the grid. We first calibrated the sensors to get geographical information about the connected tags, then we performed GET requests to the quppa API to obtain JSON objects representing the tags and their location. Finally, we modified an existing Tictactoe game implemented in Angular to replace the clicking on the virtual grid by the positionning of a tag in the physical grid.

## Disclaimer

To focus on the IoT part of the seminar, a working Angular Tic Tac Toe source code was cloned from : https://github.com/fireship-io/angular-tic-tac-toe

We modified :

* board.component.ts

and added :

* api.service.ts

## Installation

1. Clone the project in your repository and go to your repository
2. `cd angular-tic-tac-toe`
3. `npm install`
4. `npm start`

You can access the game at `http://localhost:4200`

## Details

##### api.service.ts

```javascript
constructor(private httpClient: HttpClient) { }
public getDataFromSensor(){
    return this.httpClient.get("http://192.168.0.51:8080/qpe/getTagPosition?version=2&tag=a4da22e16F3d");
}
```
In the provided network, we used httpClient to perform a GET method in order to obtain Position information about the tag "a4da22e16F3d".

##### board.component.ts

```javascript
setInterval(() => {
    this.apiService.getDataFromSensor().subscribe((data)=>{
    this.apiData = data;
    if(this.apiData.tags[0].zones){
    this.zone = this.apiData.tags[0].zones[0].name;
    this.cell = parseInt(this.zone.substr(this.zone.length-1, 1));
    this.makeMove(this.cell-1);
    }
});}, 2000);
```

This code allows to request the API every 2 seconds in order to get the zone of the targeted tag (specified in api.service.ts). When a zone is detected (physical entry of a tag in a geographical zone in the room), the cell will be filled with the corresponding player.
