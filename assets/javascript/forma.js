let dugmesubmit = document.querySelector("#submit");
dugmesubmit.addEventListener("click", provera);

function provera(event){

    event.preventDefault();

    var greskabrojac = 0;
    let ime, prezime, email, nation, pol;
    ime = document.querySelector("#fname");
    prezime = document.querySelector("#lname");
    email = document.querySelector("#email");
    nation = document.querySelector("#nationality");
    pol = document.getElementsByName("gender")
    
    var dugmence = document.querySelector("#butoni")

    console.log(ime.value);
    console.log(prezime.value);
    
    const regimeprezime = /^[A-Z][a-z]{2,20}$/;
    const regemail = /^[a-z\d]+.(gmail.com|yahoo.com)$/

    if(!regimeprezime.test(ime.value)){
        ime.nextElementSibling.classList.remove("greska");
        ime.nextElementSibling.innerHTML = "The first name submitted is written incorrectly."
        greskabrojac++;
    } else{
        ime.nextElementSibling.innerHTML = "";
    }
    
    if(!regimeprezime.test(prezime.value)){
        prezime.nextElementSibling.classList.remove("greska");
        prezime.nextElementSibling.innerHTML = "The last name submitted is written incorrectly."
        greskabrojac++;
    } else{
        prezime.nextElementSibling.innerHTML = "";
    }

    if(!regemail.test(email.value)){
        email.nextElementSibling.classList.remove("greska");
        email.nextElementSibling.innerHTML = "The email submitted is written incorrectly."
        greskabrojac++;
    } else{
        email.nextElementSibling.innerHTML = "";
    }
    for(let i=0; i<pol.length; i++){
        if(pol[i].checked!=true){
            pol.nextElementSibling.classList.remove("greska");
            pol.nextElementSibling.innerHTML = "Please select a valid number of people."
            greskabrojac++
        }
        else{
            pol.nextElementSibling.innerHTML = ""
        }
    } 
}