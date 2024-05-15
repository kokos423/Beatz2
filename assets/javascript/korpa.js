let INSTRUMENTI;

window.onload = () => {
    AsyncGalerija();

    $(document).on("click", ".odkloni", function(){
        IzbaciizKorpe($(this).data("id"));

        let button = $(this).closest("tr");

        let fonbutton = $(this).closest(".card");

        button.css("display", "none");

        fonbutton.css("display", "none");
    })
}

var total = 0;

function displaykorpa(korpa, instrumenti){

    let korpaprikaz = JSON.parse(localStorage.getItem(korpa));

    let fonispis = `<div class="w-100 d-flex flex-column px-5 py-2">`

    let ispis = `<table class="table" border>
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Name</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Golden Star?</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                    <tbody>`;

    korpaprikaz.forEach(inst => {
        let instrument = instrumenti.find(p => p.id == inst.id)
        total += instrument.cena * inst.kolicina;
        ispis += `<tr>
        <td>
        <img src="assets/slike/produkti/${instrument.slika.src}" alt="${instrument.slika.alt}" class="w-25"/>
    </td>
                        <td>${instrument.naziv}</td>
                        <td>${instrument.cena * inst.kolicina}</td>
                        <td>${inst.kolicina}</td>
                        <td>${instrument.zvezdica == 0 ? 
                            'Yes'
                            : 
                            'No'}</td>
                        <td>
                            <a href="#" class="btn btn-danger odkloni" data-id="${instrument.id}">Remove</a>
                        </td>
                    </tr>`

        fonispis += `<div data-id="${instrument.id}" class="card instrument col mb-4 border-0">
        <img src="assets/slike/produkti/${instrument.slika.src}" class="card-img-top" alt="${instrument.slika.alt}">
        <div class="card-body">
          <h5 class="card-title">${instrument.naziv}</h5>
          <p class="card-text">
          ${instrument.cena}
            <br/>
            ${inst.kolicina}
            </p>
            <a href="#" class="btn btn-danger odkloni" data-id="${instrument.id}">Remove</a>
        </div>
      </div>`;
            
    })

    ispis += '</tbody></table>'

    $('#korpaprikaz').html(ispis);
    $('#total').html(total);

    $('#fonkorpa').html(fonispis);
}

async function AsyncGalerija(){
    let instrumentfetch = await fetch("assets/json/produkti.json");
    let instrumenti = await instrumentfetch.json();

    INSTRUMENTI = instrumenti;

    displaykorpa('korpa', instrumenti);
}

function postaviULocalStorage(korpa, produkt){
    localStorage.setItem(korpa, JSON.stringify(produkt));
}


function dohvatiizLS(korpa){
    return JSON.parse(localStorage.getItem(korpa));
}

function IzbaciizKorpe(instrument){
    let cart = dohvatiizLS('korpa');

    let removekorpa = cart.filter(el => el.id != instrument);
    postaviULocalStorage('korpa', removekorpa);
    
}