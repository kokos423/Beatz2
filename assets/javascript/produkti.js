let INSTRUMENTI;
let TIPOVI;
let KATEGORIJE;

window.onload = () =>  {
    AsyncGalerija();
    /*$(document).on("click", "#red", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, "#galerija")
    })*/ 

    $(document).on("click", ".tip", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija")
    })

    $(document).on("click", ".kategorije", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija")
    })

    /*$(document).on("click", ".sort", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija")
    })*/

    $(document).on("click", ".fav", function(){
        dodajUListu($(this).data("id"));
    })

    $(document).on("click", "#test", function(){
        IzbaciIzListe();
    })

    localStorage.setItem("korpa", 5);


    $(document).on("click", "#korpatoggle", function(){
        kreirajkorpu("korpa");
    })

    /*$(document).on("click", "#korpatoggle", function(){
        $("#prikazkorpe").css("display");
    })*/

    $(document).on("input", "#cena", function(){
        promenacene(this.value);
    })
}

function postaviULocalStorage(korpa, produkt){
    localStorage.setItem(korpa, JSON.stringify(produkt));
}

function dohvatiizLS(korpa){
    return JSON.parse(localStorage.getItem(korpa));
}

function KonstrukcijaKategorijeTipova(kategorije, imediva, imeklase){
    let ispis = "";

    for(let kat of kategorije){
        ispis += `
        <div class="form-check">
        <label for="tip${kat.id}">${kat.naziv}</label>
        <input type="checkbox" class="${imeklase}" name="tip${kat.id}" value=${kat.id}>
        </div>
        `
    }
   

    $(imediva).html(ispis);
}

function ProveraTipaKategorije(katid, pretraga){
    for(let pret of pretraga){
        if(katid === pret.id){
            return pret.naziv;
        }
    }
}

function KonstrukcijaInstrumenata(instrumenti, kategorije, tipovi, imediva){
    let ispis = "";
    let brojacred = 0;

    instrumenti = Filter(instrumenti, ".tip", 'tip');
    instrumenti = Filter(instrumenti, ".kategorije", 'kategorija');
    //instrumenti = Sort(instrumenti, ".sort");
    
    for(let inst of instrumenti){
        if(brojacred%3 == 0){
            ispis += `<div class="row red flex-row w-100 justify-content-evenly">`
        }
        ispis += `<div data-id="${inst.id}" class="card col-3 border-0">
        <img src="assets/slike/produkti/${inst.slika.src}" class="card-img-top" alt="${inst.slika.alt}">
        <div class="card-body">
          <h5 class="card-title">${inst.naziv}</h5>
          <p class="card-text">
          ${inst.zvezdica == 0 ? 
            inst.cena.stara + `icon`
            : 
            inst.cena.nova}
            <br/>
            ${ProveraTipaKategorije(inst.kategorija, kategorije)}
            <br/>
            ${ProveraTipaKategorije(inst.tip, tipovi)
            }</p>
          <input type="button" data-id="${inst.id}" class="fav btn btn-primary" value="Add in Cart">
        </div>
      </div>`
      brojacred++;
      if(brojacred%3 == 0){
        ispis += '</div>'
    }
    }

    $(imediva).html(ispis);
}

function Filter(instrument, imeklase, podatak){
    let izabranitipovi = [];
    let check = $(imeklase);


    for(let ch of check){
        if(ch.checked){
            izabranitipovi.push($(ch).val());
        }
    }

    let filtriraniniz = izabranitipovi.length != 0 ? instrument.filter(inst => izabranitipovi.includes(String(inst[podatak]))) : instrument;

    return filtriraniniz;
}



async function AsyncGalerija(){
    let instrumentfetch = await fetch("assets/json/produkti.json");
    let instrumenti = await instrumentfetch.json();

    let kategorijefetch = await fetch("assets/json/kategorije.json");
    let kategorije = await kategorijefetch.json();

    let tipovifetch = await fetch("assets/json/tipovi.json");
    let tipovi = await tipovifetch.json();

    INSTRUMENTI = instrumenti;
    TIPOVI = tipovi;
    KATEGORIJE = kategorije;

    KonstrukcijaKategorijeTipova(tipovi, "#tipovich", "tip");
    KonstrukcijaKategorijeTipova(kategorije, "#kategorijech", "kategorije");
    KonstrukcijaInstrumenata(instrumenti, kategorije, tipovi, "#galerija");
}

//korpa

function dodajUListu(podatak){
    let proizvod = podatak;
    let korpa = dohvatiizLS("korpa");

    if(!korpa.length){
        dodajprviproduktulistu(proizvod)
        console.log(1)
    }else{
        dodajsvakidrugiproduktulistu(proizvod, korpa);
        console.log(2)
    }

}

function dodajprviproduktulistu(proizvod){
    let proizvodi = [];
    proizvodi[0] = {
        id: proizvod,
        qty: 1
    }

    postaviULocalStorage("korpa", proizvodi);
}

function dodajsvakidrugiproduktulistu(proizvod){
    let korpa = dohvatiizLS("korpa");

    let proizvodi = [];

    proizvodi[0] = {
        id: proizvod,
        qty: 1
    }

    korpa.push(Object(proizvodi));

    postaviULocalStorage("sviproizvodi", korpa);
}

function IzbaciIzListe(){
    
    localStorage.removeItem("korpa");

    localStorage.removeItem("sviproizvodi");

    localStorage.setItem("korpa", 5);

    localStorage.setItem("sviproizvodi", 3);
}

function kreirajkorpu(korpa){
    let produktiizkorpe = dohvatiizLS(korpa);
    //console.log(produktiizkorpe);

    for(let p of produktiizkorpe){
        console.log(p)
    }

        /*let ispis = `<table>
        <thead>
        <tr>
        <th>Br.</th>
        <th>Naziv</th>
        <th>Kolicina</th>
        <th>Cena</th>
        </tr>
        </thead>
        <tbody>
        `;
    
        for(let p of produktiizkorpe){
            ispis += `<tr>
            <td>${p.id}</td>
            <td>${p.naziv}</td>
            <td>${p.cena}</td>
            <td>${p.qty}</td>`
        }
        ispis += `</tbody></table>`
    
        $("#korpaprikaz").html(ispis);*/
}

function rangepodaci(){
    let min = document.querySelector("#minp");
    let max = document.querySelector("#maxp");
    let cena = document.querySelector("#cena");

    min.textContent = cena.value;
    max.textContent = cena.max;
}

rangepodaci();

function promenacene(vrednost){

    let min = document.querySelector("#minp");

    min.textContent = vrednost;

}