let INSTRUMENTI;
let TIPOVI;
let KATEGORIJE;
const ITEMS_PER_PAGE = 6;

window.onload = () =>  {
    AsyncGalerija();

    $(document).on("click", ".tip", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
    })

    $(document).on("click", ".kategorije", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
    })

    $(document).on("click", "#buttonsearch", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
    })

    /*$(document).on("click", ".sort", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija")
    })*/

    $(document).on("click", ".page-link", function(){
        let pageNumber = this.innerHTML;
        PagPrikaz(pageNumber)
    })

    $(document).on("click", ".fav", function(){
        dodajuKorpu($(this).data("id"));
    })


    $(document).on("click", "#korpatoggle", function(){
        kreirajkorpu("korpa");
    })

    /*$(document).on("click", "#korpatoggle", function(){
        $("#prikazkorpe").css("display");
    })*/



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
    instrumenti = tekstFilter(instrumenti, "#instrumentsearch");
    //instrumenti = cenaFilter(instrumenti, "#cena");

    //instrumenti = Sort(instrumenti, ".sort");
    
    let pageNumber = 1;
    let pageQuota = 0;

    for(let inst of instrumenti){
        /*if(brojacred%3 == 0){
            ispis += `<div class="row red flex-row w-100 justify-content-evenly">`
        }*/
        if(pageQuota === ITEMS_PER_PAGE){
            pageNumber++;
            pageQuota=0;
        }
        ispis += `<div data-id="${inst.id}" class="card instrument col-lg-3 col-md-6 col-12 border-0 strana-${pageNumber}">
        <img src="assets/slike/produkti/${inst.slika.src}" class="card-img-top" alt="${inst.slika.alt}">
        <div class="card-body">
          <h5 class="card-title">${inst.naziv}</h5>
          <p class="card-text">
          ${inst.zvezdica == 0 ? 
            inst.cena.stara + `<i class='bx bxs-star'></i>`
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
      //brojacred++;
      pageQuota++;
      /*if(brojacred%3 == 0){
        ispis += '</div>'
    }*/
    }

    $(imediva).html(ispis);

    Paginacija(instrumenti.length);
}

function Filter(instrument, imehtml, podatak){
    let izabranitipovi = [];
    let check = $(imehtml);


    for(let ch of check){
        if(ch.checked){
            izabranitipovi.push($(ch).val());
        }
    }

    let filtriraniniz = izabranitipovi.length != 0 ? instrument.filter(inst => izabranitipovi.includes(String(inst[podatak]))) : instrument;

    return filtriraniniz;
}

function PagPrikaz(duzina){
    $('.instrument').hide()
    $(`.strana-${duzina}`).show();
}

function tekstFilter(instrumenti, imediva){

    let tekst = $(imediva).val().toLowerCase();

    let filtriraniniz = tekst != 0 ? instrumenti.filter(i => i.naziv.toLowerCase().includes(tekst)) : instrumenti;

    return filtriraniniz;

}


function cenaFilter(instrumenti, imediva){

    let cena = $(imediva).val();

    for(let inst of instrumenti){
        console.log(inst.cena.stara);
    }

    let filtriraniniz = instrumenti.filter(i => i.cena);

    return instrumenti;

}

function Paginacija(nizinstrumenata){
    let strane = Math.ceil(nizinstrumenata/ITEMS_PER_PAGE);
    let ispis = `<nav aria-label="Page navigation example">
                            <ul class="pagination">`;

    for(let i = 1; i <= strane; i++){
        ispis += `<li class="page-item"><a class="page-link" href="#" active>${i}</a></li>`;
    }

    ispis += `</ul></nav>`

    $('#pagination').html(ispis);
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

/*const perpage = 6;

function webpaging(instrumenti, currentpage){
    let niz = Array.from(instrumenti).slice((currentpage-1)*perpage, perpage*currentpage);
    getNavPages(niz);
}

function getNavPages(niz){
    let total = totalpages(niz);

    let ispis = "";

    for(let i=0; i<total; i++){
        ispis += `<li class="page-item"><a data-page="${i+1}" class="page-link" href="#">${i+1}</a></li>`
    }

    document.querySelector("#pagination").innerHTML = ispis;
    $(document).on("click", ".page-link", function(){
        let strana = $(this).data("page");
        webpaging(niz, strana);
        $(this).css({
            "color": "black"
        })
    });
}

function total(niz){
    return Math.ceil(niz.length/perpage);
}*/