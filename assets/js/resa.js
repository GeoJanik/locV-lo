class Resa {
    constructor(lastName, firstName, station, timer) {
        this.initCompteur = timer;
        this.lastName = lastName;
        this.firstName = firstName;
        this.station = station;
        this.interval = null;
        this.canvasBox = document.getElementById("canvasBox");
        this.recapResa = document.getElementById("recapResa");
        this.clearResa = document.getElementById("clearResa");
        this.boardRecap = document.getElementById("boardRecap")
        this.buttonCanvas = document.getElementById("button-canvas");
        this.clear();
    }

    // SUPP LA RESA EN COURS ET RETIRE LE RECAP DE LA RESA
    clear() {
        this.clearResa.addEventListener("click", () => {
            this.suppRecap();
            this.boardRecap.style.display = "none";
            this.buttonCanvas.style.display = 'none';
        });
    }

    // ENREGISTRE EN SESSION STORAGE LES DONNEES
    save() {
        sessionStorage.setItem("station", this.station);
    }

    // AFFICHER RECAP, LANCE LE TIMER DES 20 MIN, RETIRE L'AFFICHAGE DU RECAP
    postedRacap() {
        this.boardRecap.style.display = "block";
        let compteur = this.initCompteur; // Compteur temps restant avant supprésion reservation 
        this.recap(compteur); // affichage tableau avec nouvelle valeur initial
        this.interval = setInterval(() => { // fonction pour timer
            compteur = compteur - 1;
            sessionStorage.setItem('timer', compteur);
            this.recap(compteur); // affichage tableau recap avec nouvelle valeur 
            // Si compteur à 0 suppresssion des information et arret compteur
            if (compteur === 0) {
                this.suppRecap();
            };
        }, 1000);
    }

    // OPERATION POUR CALCULER MINUTES ET SECONDES
    transformTempsRestant(tempsATransformer) {
        let minutesRestantes = Math.floor(tempsATransformer / 60);
        let secondesRestantes = tempsATransformer - (minutesRestantes * 60);
        return {
            'minutes': minutesRestantes,
            'secondes': secondesRestantes
        };
    }

    // AFFICHAGE DES RESERVATION DANS UN TABLEAU
    recap(tempsRestant) {
        let temps = this.transformTempsRestant(tempsRestant);
        this.recapResa.innerHTML = "Vélo réservé à la station " + this.station + " par " +
            this.lastName + " " + this.firstName + " Temps restant : " + temps.minutes + " min " + temps.secondes + " sec";
    }

    // SUPPRIME LES DONNEES SESSION STORAGE
    suppRecap() {
        //localStorage.clear();
        clearInterval(this.interval);
        sessionStorage.clear();
        this.recapResa.innerHTML = "";
    }
}