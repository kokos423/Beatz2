"use strict";

var INSTRUMENTI;

window.onload = function () {
  AsyncGalerija();
  $(document).on("click", ".odkloni", function () {
    IzbaciizKorpe($(this).data("id"));
    var button = $(this).closest("tr");
    var fonbutton = $(this).closest(".card");
    button.css("display", "none");
    fonbutton.css("display", "none");
  });
};

var total = 0;

function displaykorpa(korpa, instrumenti) {
  var korpaprikaz = JSON.parse(localStorage.getItem(korpa));
  var fonispis = "<div class=\"w-100 d-flex flex-column px-5 py-2\">";
  var ispis = "<table class=\"table\" border>\n                        <thead>\n                            <tr>\n                                <th scope=\"col\">Product</th>\n                                <th scope=\"col\">Name</th>\n                                <th scope=\"col\">Total Price</th>\n                                <th scope=\"col\">Quantity</th>\n                                <th scope=\"col\">Golden Star?</th>\n                                <th scope=\"col\"></th>\n                            </tr>\n                        </thead>\n                    <tbody>";
  korpaprikaz.forEach(function (inst) {
    var instrument = instrumenti.find(function (p) {
      return p.id == inst.id;
    });
    total += instrument.cena * inst.kolicina;
    ispis += "<tr>\n        <td>\n        <img src=\"assets/slike/produkti/".concat(instrument.slika.src, "\" alt=\"").concat(instrument.slika.alt, "\" class=\"w-25\"/>\n    </td>\n                        <td>").concat(instrument.naziv, "</td>\n                        <td>").concat(instrument.cena * inst.kolicina, "</td>\n                        <td>").concat(inst.kolicina, "</td>\n                        <td>").concat(instrument.zvezdica == 0 ? 'Yes' : 'No', "</td>\n                        <td>\n                            <a href=\"#\" class=\"btn btn-danger odkloni\" data-id=\"").concat(instrument.id, "\">Remove</a>\n                        </td>\n                    </tr>");
    fonispis += "<div data-id=\"".concat(instrument.id, "\" class=\"card instrument col mb-4 border-0\">\n        <img src=\"assets/slike/produkti/").concat(instrument.slika.src, "\" class=\"card-img-top\" alt=\"").concat(instrument.slika.alt, "\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">").concat(instrument.naziv, "</h5>\n          <p class=\"card-text\">\n          ").concat(instrument.cena, "\n            <br/>\n            ").concat(inst.kolicina, "\n            </p>\n            <a href=\"#\" class=\"btn btn-danger odkloni\" data-id=\"").concat(instrument.id, "\">Remove</a>\n        </div>\n      </div>");
  });
  ispis += '</tbody></table>';
  $('#korpaprikaz').html(ispis);
  $('#total').html(total);
  $('#fonkorpa').html(fonispis);
}

function AsyncGalerija() {
  var instrumentfetch, instrumenti;
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
          INSTRUMENTI = instrumenti;
          displaykorpa('korpa', instrumenti);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function postaviULocalStorage(korpa, produkt) {
  localStorage.setItem(korpa, JSON.stringify(produkt));
}

function dohvatiizLS(korpa) {
  return JSON.parse(localStorage.getItem(korpa));
}

function IzbaciizKorpe(instrument) {
  var cart = dohvatiizLS('korpa');
  var removekorpa = cart.filter(function (el) {
    return el.id != instrument;
  });
  postaviULocalStorage('korpa', removekorpa);
}