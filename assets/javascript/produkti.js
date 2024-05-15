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

    $(document).on("change", "#cena", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
    })

    $(document).on("change", "#sort", function() {
        KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
    })

    $(document).on("click", ".page-link", function(){
        let pageNumber = this.innerHTML;
        PagPrikaz(pageNumber)
    })

    $(document).on('click', '.fav', function(event){
        let instrumentID = $(this).data('id');
        let instrument = INSTRUMENTI.find(el => el.id == instrumentID) 
        dodajuKorpu(instrumentID, instrument, event)
    })

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

    instrumenti = Filter(instrumenti, ".tip", 'tip');
    instrumenti = Filter(instrumenti, ".kategorije", 'kategorija');
    instrumenti = tekstFilter(instrumenti, "#instrumentsearch");
    instrumenti = cenaFilter(instrumenti, "#cena");

    instrumenti = Sort(instrumenti, "#sort");
    
    let pageNumber = 1;
    let pageQuota = 0;

    for(let inst of instrumenti){
        if(pageQuota === ITEMS_PER_PAGE){
            pageNumber++;
            pageQuota=0;
        }
        ispis += `<div data-id="${inst.id}" class="card instrument col-lg-4 col-md-6 col-12 border-0 strana-${pageNumber}">
        <img src="assets/slike/produkti/${inst.slika.src}" class="card-img-top" alt="${inst.slika.alt}">
        <div class="card-body">
          <h5 class="card-title">${inst.naziv}</h5>
          <p class="card-text">
          ${inst.zvezdica == 0 ? 
            inst.cena + `<i class='bx bxs-star'></i>`
            : 
            inst.cena}
            <br/>
            ${ProveraTipaKategorije(inst.kategorija, kategorije)}
            <br/>
            ${ProveraTipaKategorije(inst.tip, tipovi)
            }</p>
          <input type="button" data-id="${inst.id}" class="fav btn btn-primary" value="Add in Cart">
        </div>
      </div>`
      pageQuota++;
    }

    $(imediva).html(ispis);
    Paginacija(instrumenti.length);
    PagPrikaz(1);
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

function Sort(instrumenti, sort){
    let tipsort = $(sort);
    let sotiranniz;

    if(tipsort.val() == 'ASC'){
        sotiranniz = instrumenti.sort((x,y) => x.cena - y.cena)
    } else if(tipsort.val() == 'DESC'){
        sotiranniz = instrumenti.sort((x,y) => y.cena - x.cena)
    } else if(tipsort.val() == 'YASC'){
        sotiranniz = instrumenti.sort((x,y) => x.godina - y.godina)
    } else if (tipsort.val()=='YESC'){
        sotiranniz = instrumenti.sort((x,y) => y.godina - x.godina)
    } else{
        sotiranniz = instrumenti;
    }


    return sotiranniz;
}
function cenaFilter(instrumenti, imediva){

    let cena = $(imediva).val();

    let filtriraniniz = instrumenti.filter(i => i.cena > cena);

    return filtriraniniz;

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
function postaviULocalStorage(korpa, produkt){
    localStorage.setItem(korpa, JSON.stringify(produkt));
}

function dohvatiizLS(korpa){
    return JSON.parse(localStorage.getItem(korpa));
}

function dodajuKorpu(id, instrument, event){
    if(dohvatiizLS('korpa')){
        let korpa = dohvatiizLS('korpa');

        if(korpa.find(c => c.id == id)){
            let instrument = korpa.find(inst => inst.id == id)
            instrument.kolicina++;
        }else{
            let prviprodukt = {
                id: id,
                kolicina: 1
            }
            korpa.push(prviprodukt)
        }
        postaviULocalStorage('korpa', korpa);
    }else{
        let produkt = {
            id: id,
            kolicina: 1
        }

        postaviULocalStorage('korpa', [produkt])
    }
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

