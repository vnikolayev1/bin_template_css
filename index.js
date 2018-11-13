/**
 * Created by Gig on 29-Oct-18.
 */
let i = 0;
let order_bool = 1;
let sov_cup_price = 110;
let order = document.getElementById("order");
let original = document.getElementById("duplicater0");
let loweritem = document.getElementById("loweritem");
let footer = document.getElementById("footer");
let addgoodsbutton = document.getElementById("add_goods");
let plusbutton = document.getElementById("plus");
let minusbutton = document.getElementById("minus");

plusFunction(plusbutton);
minusFunction(minusbutton);

addgoodsbutton.addEventListener("click",function duplicate(){
    {
        let clone = original.cloneNode(true);
        clone.id = "duplicater" + ++i;
        clone.querySelectorAll(".goodsamount").value = 1;
        order.appendChild(clone);
        if (i == 0) {
            document.body.appendChild(loweritem);
            document.body.removeChild(footer);
            document.body.appendChild(footer);      //fixes loweritem overlapping footer problem
        }
        let plusbutton = document.querySelectorAll(".plusbutton")[i];
        let minusbutton = document.querySelectorAll(".minusbutton")[i];
        plusFunction(plusbutton);
        minusFunction(minusbutton);
    }
});
function clear_bin()
{
    while(i >= 0)
    {
        let removeClone = document.getElementById("duplicater" + i--);
        order.removeChild(removeClone);
    }
    document.getElementById("loweritem").outerHTML = "";
}

function orderLeft()
{
    let goodsamounts = document.querySelectorAll(".goodsamount");
    goodsamounts.forEach(function(input){
        if (!(input.value > 0)||input.value == "")
        {
            order_bool = 0;
        }
    });
    if (order_bool == 0)
    {
        alert("Заказ не может вмещать отрицательное или нулевое значение.");
    }
    else {
        alert("Спасибо за оставленный заказ. Менеджер с Вами свяжется в ближайшее время.");
    }
}
function plusFunction(plusbutton)
{
    plusbutton.addEventListener("click", function(e) {
        let button = e.target;
        let count = button.previousElementSibling.value;
        count = Number(count)+ 1;
        if (count < 1)
        {
            count = 1;
        }
        let price = sov_cup_price * count +" Грн.";
        let parentprice = button.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.
            firstChild.nextSibling; /*note to myself: use templates*/
        parentprice.textContent = price;
        button.previousElementSibling.value = count;
    });
}
function minusFunction(minusbutton)
{
    minusbutton.addEventListener("click", function(e) {
        let button = e.target;
        let count = button.nextElementSibling.value;
        if (count > 1)
        {
            count = Number(count) - 1;
        }
        let price = sov_cup_price * count +" Грн.";
        let parentprice = button.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.
            firstChild.nextSibling; /*note to myself: use templates*/
        parentprice.textContent = price;
        button.nextElementSibling.value = count;
    });
}
