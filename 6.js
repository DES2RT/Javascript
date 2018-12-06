 var httpRequest;

function makeRequest() {
    var url = '''; 
    // make an HTTP request object

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
       httpRequest = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) { // IE
       try {
          httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
          try {
              httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
          } 
            catch (e) {}
          }
        }
    
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
        
    // register a request listener
    httpRequest.onreadystatechange = showContents;
    // make the HTTP request 
    httpRequest.open('GET', url, true);
    httpRequest.send();
}
    
// the function that handles the server response

function showContents() {
       
       //  check for response state
       //  0      The request is not initialized
       //  1      The request has been set up
       //  2      The request has been sent
       //  3      The request is in process
       //  4      The request is complete

    if (httpRequest.readyState === 4) {   // check the respone code
        if (httpRequest.status === 200) { // The request has succeeded
            // Javascript function JSON.parse to parse JSON data
            var jsArray = JSON.parse(httpRequest.responseText);
]
            var str = "<table class=table-1>";
            str += "<caption>School of ICT | Faculty of Applied Science and Engineering Technology</caption>";
            str += "<tr><th>Program Area</th><th>Semester</th><th colspan=5>Courses</th></tr>";
            var coursesLength = jsArray[0].courses.length;
            for (var i=0; i<jsArray.length; i++) { 
                str += "<tr><td>" + jsArray[i].name + "</td>";
                str += "<td>" + jsArray[i].semester + "</td>";
                for(var j=0; j<coursesLength; j++) {
                    str += "<td>" + jsArray[i].courses[j] + "</td>";
                }
            }
            str += "</table>";
            document.getElementById("data").innerHTML = str;
        }
        else    {
            alert('There was a problem with the request.');
        }
    }
}
