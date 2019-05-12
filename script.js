var url;
var csv;
url = window.location.href;
onload = userLogIn();
function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
  }

  function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
  }

  function loadHandler(event) {
    csv = event.target.result;
    processData(csv);
  }

  function processData(csv) {
      var allTextLines = csv.split("\n");
      var lines = [];
      for (var i=0; i<allTextLines.length; i++) {
          localStorage.setItem(Number(i),allTextLines[i]);
      }
  }
  function printTable(range){
      if(!(localStorage.getItem(Number(1))===null)){
        var output = "<table id = 'info' style = 'width:100%'><tr><th>Id</th><th>FirstName</th><th>LastName</th><th>PhoneNbr</th><th>StreetAddress</th><th>City</th><th>State</th><th>Zip</th></tr>";
      var string = "";
      var rangeArr = range.split("-");
      var start = parseInt(rangeArr[0])-1;
      var end = parseInt(rangeArr[1]);
      var arr = [];
      for(var i = start;i<end;i++){
          output+="<tr>";
          string = localStorage.getItem(Number(i)-Number(1));
          arr = string.split(",");
          for(var k = 0; k<arr.length;k++){
              output+="<td>"+arr[k]+"</td>";
          }
          output+="</tr>"
      }
      output+="</table>";
      document.getElementById("table").innerHTML=output;
      }
      
  }
  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
  }
function home(){    
    window.location.href = "home.html"+"?para1="+userLogIn();
}

function userLogIn(){
    var url = window.location.href;
    var urlArr = url.split("=");
    return urlArr[1];
}
function deleteCust(){
    window.location.href = "delete.html"+"?para1="+userLogIn();
}
function findCust(){   
    window.location.href = "find.html" +"?para1="+userLogIn();
}   
function addCust(){
    window.location.href = "add.html"+"?para1="+userLogIn();
}
function logout(){
    var val = confirm("Are you sure you want to log out?");
    if(val == true){
            window.open("logon.html","_self");
    }
}
function add(){
    var custInfo = id.value+","+firstName.value+","+lastName.value+","+phoneNbr.value+","+streetAddr.value+","+city.value+","+state.value+","+zip.value;
    localStorage.setItem(Number(id.value),custInfo);
    alert("Customer Added");
}
function submission(){
    var users = ["RoshanKhan","RandomName"];
    var passwords = ["password","password1"];
    var found = false;
    for(var i = 0; i<users.length;i++){
        if (users[i].valueOf()==username.value.valueOf()){
            if(password.value.valueOf() == passwords[i]){
                var user = username.value;
                var queryString = "?para1="+user;
                window.location.href = "home.html" + queryString;
                found = true;
                break;
            }
        }
    }
    if(!found){
        document.getElementById("errorMSG").innerHTML = "Username and/or Password Incorrect";
    }
}