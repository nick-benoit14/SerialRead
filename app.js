var fs = require('fs');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var util = require('util');
process.stdin.resume();
process.stdin.setEncoding('utf8');


serialport.list(function (err, ports) {

var index = 0;
  if(ports){
    ports.forEach(function(port) {
      console.log((index + 1) + "  -  " + port.comName);
    });
    selectPort(ports);
  }
  else{console.log("No Ports Available");}
});

function selectPort(ports){
      this.title;
      this.location;
      console.log("Enter Dataset Title: ");
      process.stdin.on('data', function (text) {this.title = text;});
      console.log("Enter Dataset Location: ");
      process.stdin.on('data', function (text) {this.location = location;});

      console.log("Select Port Number: ");
      process.stdin.on('data', function (text) {
      //console.log('received data:', util.inspect(text));
      if(text == '1\n') readData(ports[0].comName, this.title, this.location);
      else if(text == '2\n') readData(ports[1].comName, this.title, this.location);
      else if(text == '3\n') readData(ports[2].comName, this.title, this.location);
      else if(text == '4\n') readData(ports[3].comName, this.title, this.location);

   });
}

function readData(selectedPort, title, location){

var sp = new SerialPort(selectedPort, {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
});

var stream = new Data(title, location);

sp.open(function (error) {
  if ( error ) {console.log('failed to open: '+error);}
  else {
    console.log('open');
    sp.on('data', function(data) {
      stream.addData(data);
      stream.saveData();
    });
  }
});

function Data(inTitle, inLocation){
  this.title = inTitle;
  this.data = inTitle;
  this.location = inLocation;
  this.addData = function (inData){
    console.log(inData);
    this.data += inData;
    this.data += ',';
  }
  this.saveData = function(){
    fs.writeFile(this.location, this.data, function(err) {
      if(err){return console.log(err);}
    });
    }
  }
}
