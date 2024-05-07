"use strict";

var INSTRUMENTI;
var TIPOVI;
var KATEGORIJE;
var ITEMS_PER_PAGE = 6;

window.onload = function () {
  AsyncGalerija();
  $(document).on("click", ".tip", function () {
    KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
  });
  $(document).on("click", ".kategorije", function () {
    KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
  });
  $(document).on("click", "#buttonsearch", function () {
    KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
  });
  $(document).on("change", "#sort", function () {
    KonstrukcijaInstrumenata(INSTRUMENTI, KATEGORIJE, TIPOVI, "#galerija");
  });
  $(document).on("click", ".page-link", function () {
    var pageNumber = this.innerHTML;
    PagPrikaz(pageNumber);
  });
  $(document).on('click', '.fav', function (event) {
    var instrumentID = $(this).data('id');
    var instrument = INSTRUMENTI.find(function (el) {
      return el.id == instrumentID;
    });
    dodajuKorpu(instrumentID, instrument, event);
  });
};

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
  instrumenti = Filter(instrumenti, ".tip", 'tip');
  instrumenti = Filter(instrumenti, ".kategorije", 'kategorija');
  instrumenti = tekstFilter(instrumenti, "#instrumentsearch"); //instrumenti = cenaFilter(instrumenti, "#cena");

  instrumenti = Sort(instrumenti, "#sort");
  var pageNumber = 1;
  var pageQuota = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = instrumenti[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var inst = _step3.value;

      if (pageQuota === ITEMS_PER_PAGE) {
        pageNumber++;
        pageQuota = 0;
      }

      ispis += "<div data-id=\"".concat(inst.id, "\" class=\"card instrument col-lg-4 col-md-6 col-12 border-0 strana-").concat(pageNumber, "\">\n        <img src=\"assets/slike/produkti/").concat(inst.slika.src, "\" class=\"card-img-top\" alt=\"").concat(inst.slika.alt, "\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">").concat(inst.naziv, "</h5>\n          <p class=\"card-text\">\n          ").concat(inst.zvezdica == 0 ? inst.cena + "<i class='bx bxs-star'></i>" : inst.cena, "\n            <br/>\n            ").concat(ProveraTipaKategorije(inst.kategorija, kategorije), "\n            <br/>\n            ").concat(ProveraTipaKategorije(inst.tip, tipovi), "</p>\n          <input type=\"button\" data-id=\"").concat(inst.id, "\" class=\"fav btn btn-primary\" value=\"Add in Cart\">\n        </div>\n      </div>");
      pageQuota++;
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
  Paginacija(instrumenti.length);
  PagPrikaz(1);
}

function Filter(instrument, imehtml, podatak) {
  var izabranitipovi = [];
  var check = $(imehtml);
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

function PagPrikaz(duzina) {
  $('.instrument').hide();
  $(".strana-".concat(duzina)).show();
}

function tekstFilter(instrumenti, imediva) {
  var tekst = $(imediva).val().toLowerCase();
  var filtriraniniz = tekst != 0 ? instrumenti.filter(function (i) {
    return i.naziv.toLowerCase().includes(tekst);
  }) : instrumenti;
  return filtriraniniz;
}

function Sort(instrumenti, sort) {
  var tipsort = $(sort);
  var sotiranniz;

  if (tipsort.val() == 'ASC') {
    sotiranniz = instrumenti.sort(function (x, y) {
      return x.cena - y.cena;
    });
    console.log(instrumenti.cena['stara']);
  } else if (tipsort.val() == 'DESC') {
    sotiranniz = instrumenti.sort(function (x, y) {
      return y.cena - x.cena;
    });
  } else if (tipsort.val() == 'YASC') {
    sotiranniz = instrumenti.sort(function (x, y) {
      return x.godina - y.godina;
    });
  } else if (tipsort.val() == 'YESC') {
    sotiranniz = instrumenti.sort(function (x, y) {
      return y.godina - x.godina;
    });
  } else {
    sotiranniz = instrumenti;
  }

  return sotiranniz;
}

function cenaFilter(instrumenti, imediva) {
  var cena = $(imediva).val();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = instrumenti[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var inst = _step5.value;
      console.log(inst.cena);
    }
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

  var filtriraniniz = instrumenti.filter(function (i) {
    return i.cena;
  });
  return instrumenti;
}

function Paginacija(nizinstrumenata) {
  var strane = Math.ceil(nizinstrumenata / ITEMS_PER_PAGE);
  var ispis = "<nav aria-label=\"Page navigation example\">\n                            <ul class=\"pagination\">";

  for (var i = 1; i <= strane; i++) {
    ispis += "<li class=\"page-item\"><a class=\"page-link\" href=\"#\" active>".concat(i, "</a></li>");
  }

  ispis += "</ul></nav>";
  $('#pagination').html(ispis);
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


function postaviULocalStorage(korpa, produkt) {
  localStorage.setItem(korpa, JSON.stringify(produkt));
}

function dohvatiizLS(korpa) {
  return JSON.parse(localStorage.getItem(korpa));
}

function dodajuKorpu(id, instrument, event) {
  if (dohvatiizLS('korpa')) {
    var korpa = dohvatiizLS('korpa');

    if (korpa.find(function (c) {
      return c.id == id;
    })) {
      var _instrument = korpa.find(function (inst) {
        return inst.id == id;
      });

      _instrument.kolicina++;
    } else {
      var prviprodukt = {
        id: id,
        kolicina: 1
      };
      korpa.push(prviprodukt);
    }

    postaviULocalStorage('korpa', korpa);
  } else {
    var produkt = {
      id: id,
      kolicina: 1
    };
    postaviULocalStorage('korpa', [produkt]);
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