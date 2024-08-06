function clr()
{
 document.getElementById("result").value = "";
}
function display(val)
{
 document.getElementById("result").value+=val; /*to be displayed in the textbox id*//*value = value+val means 9 then + => 9+ */
}
function equate()
{
let x = document.getElementById("result").value; //that equation store in x
let y = eval(x); //predefined function to evaluate
document.getElementById("result").value = y;
}