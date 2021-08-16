const slide = new Slider();
const carte = new Carte();
const formulaire = new Form();
const canvas = new Canvas();

const lastName = localStorage.getItem("lastName");
const firstName = localStorage.getItem("firstName");
const station = sessionStorage.getItem("station");
const timer = sessionStorage.getItem("timer");


if (lastName && firstName && station && timer) {
  formulaire.instanceResa(lastName, firstName, station, timer);
  formulaire.upBoardRecap();
}