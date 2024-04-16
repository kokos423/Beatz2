var linkovi = ["features", "about", "restaurant-menu", "team", "contact"];
var meni;


meni = '<ul class="nav navbar-nav"><li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>';
    for(var i=0; i<linkovi.length; i++){
        meni += '<li class="nav-item"><a href="#'+linkovi[i]+'" class="nav-link">' + linkovi[i] + '</a></li>';
    }
    meni += '<li class="nav-item"><a href="author.html"> Author </a></li>';
meni += "</ul>";


document.querySelector("#navbarNav").innerHTML = meni;

/*$(document).ready(function(){
    $.ajax({
    url: "assets/json/produkti.json",
    type: "get",
    dataType: "json",
    success: function(result) {
    //console.log(result);
    prikaziPodatke(result); },
    error: function(xhr,status, error) { console.log(error); }
    });
        function prikaziPodatke(sviPodaciJSON){
        console.log(sviPodaciJSON);
        var sadrzaj=`<div class="col-5">`;
        for(var instrument of sviPodaciJSON){
        sadrzaj += `<p class="test">${instrument.naziv}</p><br/>`
        sadrzaj += `<p class="test">${instrument.cena.stara}</p><br/>`
        sadrzaj += `<img src="assets/slike/produkti/${instrument.slika.src}" alt="${instrument.slika.alt}">`
        }
    sadrzaj += `</div>`;
    document.querySelector("#prikaz").innerHTML = sadrzaj;
} });*/
    

/*$(document).ready(function(){
    $.ajax({
    url: "assets/json/produkti.json",
    type: "get",
    dataType: "json",
    success: function(result) {
    //console.log(result);
    prikaziPodatke(result); },
    error: function(xhr,status, error) { console.log(error); }
    });
        function prikaziPodatke(sviPodaciJSON){
        console.log(sviPodaciJSON);
        var sadrzaj=`<div class="card col-3">`;
        for(var instrument of sviPodaciJSON){
        sadrzaj += `<img class="card-img-top" src="assets/slike/produkti/${instrument.slika.src}" alt="${instrument.slika.alt}">`
        sadrzaj += `<div class="card-body">`
        sadrzaj += `<h5 class="card-title">${instrument.naziv}</h5>`
        if(instrument.zvedica == 1){
            sadrzaj += `<p>Test</p>`
        }
        sadrzaj += `<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>`
        }
    sadrzaj += `</div>`;
    document.querySelector("#prikaz2").innerHTML = sadrzaj;
} });*/

/*let INSTRUMENTI;

window.onload = () => {

    AsyncPriprema();

    $(document).on('click', ".filterbrend", function(){
        GalerijaInstrumenata(INSTRUMENTI, "#galerija");
    })

}

function GalerijaInstrumenata(instrumenti, imediva){
    let ispis = "";

    for(let inst of instrumenti){
        ispis += `<div class="card">
        <img class="card-img-top" src="assets/slike/produkti/${inst.slika.src}" alt="${inst.slika.alt}">
        <div class="card-body">
          <h5 class="card-title">${inst.naziv}</h5>
          <p class="card-text">${inst.zvezdica == 0? inst.cena.stara : inst.cena.nova}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
    }

    $(imediva).html(ispis)
}
//pravljenje svega i svasta
/*$(document).ready(function(){
    $.ajax({
        url: "assets/json/produkti.json",
        type: "get",
        dataType: "json",
        success: function(result) {
            //console.log(result);
            prikaziPodatke(result);
        },
        error: function(xhr,status, error) { 
            console.log(error); 
        }
    });

    function prikaziPodatke(sviPodaciJSON){
        console.log(sviPodaciJSON);
        var sadrzaj = "";
        var red = 0; 

        for(var instrument of sviPodaciJSON){
            
            if (red % 3 === 0) {
                sadrzaj += `<div class="row">`;
            }

            if(instrument.zvezdica == 1){
                zvezdica = "Test";
            } else{
                zvezdica = "";
            }

            sadrzaj += `
                    <div class="card col-4">
                        <img class="card-img-top" src="assets/slike/produkti/${instrument.slika.src}" alt="${instrument.slika.alt}">
                        <div class="card-body">
                            <div class="d-flex flex-row"
                            <h5 class="card-title">${instrument.naziv}</h5> <p>${zvezdica}</p>
                            </div>
                            <p class="card-text">${instrument.cena.stara}</p>
                        </div>
                    </div>
            `;

            red++;

            if (red % 3 === 0) {
                sadrzaj += `</div>`;
            }
        }

        if (red % 3 !== 0) {
            sadrzaj += `</div>`;
        }

        document.querySelector("#prikaz2").innerHTML = sadrzaj;
    }
});*/

