function showtime(){
var date = new Date();/*date is the object of our Date method this method is giving you your current date time and hour */
var hr = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var session = "AM"
if(hr==0)
{
    hr=12;//12 hr format
    
}
if (hr > 12) {
    hr = hr-12;
    session = "PM";
}
// if (hr<10) //0-9
// {
//   hr = "0" + hr;
// }
// if(min<10)
// {
//     min = "0" + min;
// }
// if (sec<10)
// {
//     sec = "0" +sec;
// }
hr = (hr<10) ? "0"+hr : hr;// if true ? do this : else false then do this
min = (min < 10) ? "0" + min : min;
sec = (sec < 10) ? "0" + sec : sec;
document.getElementById("digitalclock").innerHTML = hr + ":" + min + ":" + sec + " " + session;
setTimeout(showtime,1000);/* predefined function that shows till what time you want to run the function i.e run this function every 1000ms*/
}
/*this entire above snippet should repeat every second*/

showtime();