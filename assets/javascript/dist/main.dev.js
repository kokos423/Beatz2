"use strict";

var linkovi = ["Products", "Newsletter", "Author"];
var meni;
meni = '<ul class="nav navbar-nav"><li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>';

for (var i = 0; i < linkovi.length; i++) {
  meni += '<li class="nav-item"><a href="' + linkovi[i] + '.html" class="nav-link">' + linkovi[i] + '</a></li>';
}

meni += '<li class="nav-item"><a href="#" class="nav-link"> Documentation </a></li>';
meni += "</ul>";