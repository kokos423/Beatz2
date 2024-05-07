"use strict";

var INSTRUMENTI;

window.onload = function () {
  AsyncGalerija();
};

var total = 0;

function displayCart(korpa, instrumenti) {
  var korpaprikaz = JSON.parse(localStorage.getItem(korpa));
  var ispis = "<table class=\"table\" border>\n                        <thead>\n                            <tr>\n                                <th scope=\"col\">Product</th>\n                                <th scope=\"col\">Name</th>\n                                <th scope=\"col\">Total Price</th>\n                                <th scope=\"col\">Quantity</th>\n                                <th scope=\"col\">Golden Star?</th>\n                                <th scope=\"col\"></th>\n                            </tr>\n                        </thead>\n                    <tbody>";
  korpaprikaz.forEach(function (inst) {
    var instrument = instrumenti.find(function (p) {
      return p.id == inst.id;
    });
    total += instrument.cena * inst.kolicina;
    ispis += "<tr>\n        <td>\n        <img src=\"assets/slike/produkti/".concat(instrument.slika.src, "\" alt=\"").concat(instrument.slika.alt, "\" class=\"w-25\"/>\n    </td>\n                        <td>").concat(instrument.naziv, "</td>\n                        <td>").concat(instrument.cena * inst.kolicina, "</td>\n                        <td>").concat(inst.kolicina, "</td>\n                        <td>").concat(instrument.zvezdica == 0 ? 'Yes' : 'No', "</td>\n                        <td>\n                            <a href=\"#\" class=\"btn btn-danger remove\" data-id=\"").concat(instrument.id, "\">Remove</a>\n                        </td>\n                    </tr>");
  });
  ispis += '</tbody></table>';
  $('#korpaprikaz').html(ispis);
  $('#total').html(total);
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
          displayCart('korpa', instrumenti);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}