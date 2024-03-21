/* function signup(){
    var xhttp= new XMLHttpRequest();
    var frst_nme=document.getElementById("signup_first_name").value;
    var lst_nme=document.getElementById("signup_last_name").value;
    var email=document.getElementById("signup_email").value;
    var address=document.getElementById("signup_address").value;
    var phone=document.getElementById("signup_phone").value;
    xhttp.onreadystatechange=function(){
     if(this.readyState===4 && this.status ===200){
        frst_nme.value="";
        lst_nme.value="";
        email.value="";
        address.value="";
        phone.value="";

     }
    };
    xhttp.open("POST","/signup",true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

 } */

function click(){
const button = document.getElementById("button");

button.addEventListener("click", function() {
 // button.classList.toggle("clicked");
  button.style.backgroundColor="lightgreen";
});
}

function Click() {
   const button = document.getElementById("button");

   button.addEventListener("click", function() {
     button.classList.toggle("clicked");
   });
 }

