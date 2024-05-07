let INSTRUMENTI;

window.onload = () => {
    AsyncGalerija();
}

var total = 0;

function displayCart(korpa, instrumenti){

    let korpaprikaz = JSON.parse(localStorage.getItem(korpa));

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
                            <a href="#" class="btn btn-danger remove" data-id="${instrument.id}">Remove</a>
                        </td>
                    </tr>`
            
    })

    ispis += '</tbody></table>'

    $('#korpaprikaz').html(ispis);
    $('#total').html(total);
}

async function AsyncGalerija(){
    let instrumentfetch = await fetch("assets/json/produkti.json");
    let instrumenti = await instrumentfetch.json();

    INSTRUMENTI = instrumenti;

    displayCart('korpa', instrumenti);
}