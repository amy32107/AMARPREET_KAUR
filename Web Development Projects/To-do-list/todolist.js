function additem()
{
    let item = document.getElementById("box");/*whatever written in box get it*/
    /*these items should go to uls */
    let list_item = document.getElementById("listitem"); /*get from id listitem*/
    if(item.value!="")/* if smth written then only add*/
    {
             /*make li tag here in ul*/
             let makeli= document.createElement("li");
             makeli.appendChild(document.createTextNode(item.value));/*what ever value in item 
             create a node for that*/
             list_item.appendChild(makeli)/*in list_item append that value*/
             item.value="";/*empty the box*/
             makeli.onclick= function()/*onclick delete that item from list means if i click on shopping then it will get deleted from the list*/
             {
                this.parentNode.removeChild(this);
             }
    }
    else{
        alert("please add a value to item")
    }
}