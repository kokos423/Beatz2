"use strict";

var INSTRUMENTI;
var TIPOVI;
var KATEGORIJE;

window.onload = function () {
  AsyncGalerija();
  /*$(document).on("click", "#red", function() {
      KonstrukcijaInstrumenata(INSTRUMENTI, "#galerija")
  })*/

  $(document).on("click", ".tip", function () {
    KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
  });
  $(document).on("click", ".kategorije", function () {
    KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
  });
  /*$(document).on("click", ".sort", function() {
      KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija")
  })*/

  $(document).on("click", ".fav", function () {
    dodajUListu($(this).data("id"));
  });
  $(document).on("click", "#test", function () {
    IzbaciIzListe();
  });
  localStorage.setItem("korpa", 5);
  $(document).on("click", "#korpatoggle", function () {
    kreirajkorpu("korpa");
  });
  /*$(document).on("click", "#korpatoggle", function(){
      $("#prikazkorpe").css("display");
  })*/

  $(document).on("input", "#cena", function () {
    promenacene(this.value);
  });
};

function postaviULocalStorage(korpa, produkt) {
  localStorage.setItem(korpa, JSON.stringify(produkt));
}

function dohvatiizLS(korpa) {
  return JSON.parse(localStorage.getItem(korpa));
}

function KonstrukcijaKategorijeTipova(kategorije, imediva, imeklase) {
  var ispis = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = kategorije[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var kat = _step.value;
      ispis += "\n        <div class=\"form-check\">\n        <label for=\"tip".concat(kat.id, "\">").concat(kat.naziv, "</label>\n        <input type=\"checkbox\" class=\"").concat(imeklase, "\" name=\"tip").concat(kat.id, "\" value=").concat(kat.id, ">\n        </div>\n        ");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  $(imediva).html(ispis);
}

function ProveraTipaKategorije(katid, pretraga) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = pretraga[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var pret = _step2.value;

      if (katid === pret.id) {
        return pret.naziv;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function KonstrukcijaInstrumenata(instrumenti, kategorije, tipovi, imediva) {
  var ispis = "";
  var brojacred = 0;
  instrumenti = Filter(instrumenti, ".tip", 'tip');
  instrumenti = Filter(instrumenti, ".kategorije", 'kategorija'); //instrumenti = Sort(instrumenti, ".sort");

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = instrumenti[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var inst = _step3.value;

      if (brojacred % 3 == 0) {
        ispis += "<div class=\"row red flex-row w-100 justify-content-evenly\">";
      }

      ispis += "<div data-id=\"".concat(inst.id, "\" class=\"card col-3 border-0\">\n        <img src=\"assets/slike/produkti/").concat(inst.slika.src, "\" class=\"card-img-top\" alt=\"").concat(inst.slika.alt, "\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">").concat(inst.naziv, "</h5>\n          <p class=\"card-text\">\n          ").concat(inst.zvezdica == 0 ? inst.cena.stara + "icon" : inst.cena.nova, "\n            <br/>\n            ").concat(ProveraTipaKategorije(inst.kategorija, kategorije), "\n            <br/>\n            ").concat(ProveraTipaKategorije(inst.tip, tipovi), "</p>\n          <input type=\"button\" data-id=\"").concat(inst.id, "\" class=\"fav btn btn-primary\" value=\"Add in Cart\">\n        </div>\n      </div>");
      brojacred++;

      if (brojacred % 3 == 0) {
        ispis += '</div>';
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  $(imediva).html(ispis);
}

function Filter(instrument, imeklase, podatak) {
  var izabranitipovi = [];
  var check = $(imeklase);
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = check[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var ch = _step4.value;

      if (ch.checked) {
        izabranitipovi.push($(ch).val());
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var filtriraniniz = izabranitipovi.length != 0 ? instrument.filter(function (inst) {
    return izabranitipovi.includes(String(inst[podatak]));
  }) : instrument;
  return filtriraniniz;
}

function AsyncGalerija() {
  var instrumentfetch, instrumenti, kategorijefetch, kategorije, tipovifetch, tipovi;
  return regeneratorRuntime.async(function AsyncGalerija$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("assets/json/produkti.json"));

        case 2:
          instrumentfetch = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(instrumentfetch.json());

        case 5:
          instrumenti = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch("assets/json/kategorije.json"));

        case 8:
          kategorijefetch = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(kategorijefetch.json());

        case 11:
          kategorije = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(fetch("assets/json/tipovi.json"));

        case 14:
          tipovifetch = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(tipovifetch.json());

        case 17:
          tipovi = _context.sent;
          INSTRUMENTI = instrumenti;
          TIPOVI = tipovi;
          KATEGORIJE = kategorije;
          KonstrukcijaKategorijeTipova(tipovi, "#tipovich", "tip");
          KonstrukcijaKategorijeTipova(kategorije, "#kategorijech", "kategorije");
          KonstrukcijaInstrumenata(instrumenti, kategorije, tipovi, "#galerija");

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
} //korpa


function dodajUListu(podatak) {
  var proizvod = podatak;
  var korpa = dohvatiizLS("korpa");

  if (!korpa.length) {
    dodajprviproduktulistu(proizvod);
    console.log(1);
  } else {
    dodajsvakidrugiproduktulistu(proizvod, korpa);
    console.log(2);
  }
}

function dodajprviproduktulistu(proizvod) {
  var proizvodi = [];
  proizvodi[0] = {
    id: proizvod,
    qty: 1
  };
  postaviULocalStorage("korpa", proizvodi);
}

function dodajsvakidrugiproduktulistu(proizvod) {
  var korpa = dohvatiizLS("korpa");
  var proizvodi = [];
  proizvodi[0] = {
    id: proizvod,
    qty: 1
  };
  korpa.push(Object(proizvodi));
  postaviULocalStorage("sviproizvodi", korpa);
}

function IzbaciIzListe() {
  localStorage.removeItem("korpa");
  localStorage.removeItem("sviproizvodi");
  localStorage.setItem("korpa", 5);
  localStorage.setItem("sviproizvodi", 3);
}

function kreirajkorpu(korpa) {
  var produktiizkorpe = dohvatiizLS(korpa); //console.log(produktiizkorpe);

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = produktiizkorpe[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var p = _step5.value;
      console.log(p);
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

  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function rangepodaci() {
  var min = document.querySelector("#minp");
  var max = document.querySelector("#maxp");
  var cena = document.querySelector("#cena");
  min.textContent = cena.value;
  max.textContent = cena.max;
}

rangepodaci();

function promenacene(vrednost) {
  var min = document.querySelector("#minp");
  min.textContent = vrednost;
}