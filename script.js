var url;
var csv;
var searchType;
url = window.location.href;
onload = userLogIn();
function databaseStart(){
    if(document.title.localeCompare('Database') == 0){
        printTable('1-20'); 
        console.log('true');
    }
    else{console.log('false');}
}
function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
  }
function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        console.log("Enter key pressed.");
        console.log(search.value);
        search();
    }
    else{
        console.log("Enter key not pressed.");
        return true;
    }
}
function searchBar(){
    document.getElementById('body').innerHTML = '<i style = "font-size:40px;left:20px;position:absolute;top:20px;"class="material-icons">search</i><input id = "searchVal" value = "" type = "text" onkeypress="return runScript(event)" placeholder = "Search Database" style = "position:absolute;top:20px;width:80%;height:40px;background-color:white;left:70px;font-size:24px;"><div id = "custInfo" style = "text-align:left;position:absolute;height:80%;width:90%;top:10%;font-size:20px;padding:5%;"></div><button style = "position:absolute;bottom:5%;left:5%;margin-left:0px;" class = "login" onclick = "findCust()">Back</button>';
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
      var start = parseInt(rangeArr[0]);
      var end = parseInt(rangeArr[1])+1;
      var arr = [];
      for(var i = start;i<end;i++){
          console.log(output);
          output+="<tr>";
          string = localStorage.getItem(Number(i)-Number(1));
          arr = string.split(",");
          for(var k = 0; k<arr.length;k++){
              output+="<td>"+arr[k]+"</td>";
          }
          output+="</tr>"
      }
      output+="</table>";
      document.getElementById("body").innerHTML=output;
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
    localStorage.setItem(Number(id.value)-1,custInfo);
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
function search(){
    var index = 0;
    var stringArr;
    console.log("reached function");
    if(searchType.localeCompare('id')==0){
        index = 0;
    }
    else if(searchType.localeCompare('fname')==0){
        index = 1;
    }
    else if(searchType.localeCompare('lname')==0){
        index = 2;
    }
    else if(searchType.localeCompare('phone')==0){
        index = 3;
    }
    else if(searchType.localeCompare('street')==0){
        index = 4;
    }
    else if(searchType.localeCompare('city')==0){
        index = 5;
    }
    else if(searchType.localeCompare('state')==0){
        index = 6;
    }
    else{
        index = 7;
    }
    for(var i = 0;localStorage.getItem(i)!=null;i++){
        stringArr = localStorage.getItem(i).split(",");
        if(stringArr[index].localeCompare(searchVal.value)==0){
            var output = "";
            output = "<h1 style = 'font-size:40px;'>Customer Info</h1><br>";
            output += "Id: " + stringArr[0]+"<br>";
            output += "First Name: " + stringArr[1]+"<br>";
            output += "Last Name: " + stringArr[2]+"<br>";
            output += "Phone Number: " + stringArr[3]+"<br>";
            output += "Street Address: " + stringArr[4]+"<br>";
            output += "City: " + stringArr[5]+"<br>";
            output += "State: " + stringArr[6]+"<br>";
            output += "Zipcode: " + stringArr[7]+"<br>";

            document.getElementById('custInfo').innerHTML=output;
            break;
        }
    }
    
}