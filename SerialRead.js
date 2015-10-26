var fs = require('fs');
var serialport = require("serialport");
var prompt = require('prompt');


var SerialPort = serialport.SerialPort; // localize object constructor


serialport.list(function (err, ports) {

var index = 0;
  if(ports){
    ports.forEach(function(port) {
      console.log((index + 1) + "  -  " + port.comName);
    });
    var selection = selectPort(ports);
  }
  else{console.log("No Ports Available");}
});

function selectPort(ports){
prompt.start();
console.log(" Enter file Title, Port Selection, and File Location");
 prompt.get(['title', 'selection', 'location'], function (err, result) {

   console.log('Command-line input received:');
   readData(ports[result.selection - 1].comName, result.title, result.location);
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
  if(inLocation)this.location = inLocation;
  else this.location = "./data.txt";
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
