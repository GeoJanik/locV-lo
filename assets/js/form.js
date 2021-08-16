class Form {
    constructor() {
        this.resa; // stock l'instance de résa en cours
        this.boardRecap = document.getElementById("boardRecap");
        this.buttonResa = document.getElementById("reserver");
        this.buttonCanvas = document.getElementById("button-canvas")
        this.canvasBox = document.getElementById("canvasBox");
        this.detailStation = document.getElementById("detailStation");
        this.buttonNav = document.getElementById("reservezVite");
        this.initInputForm();
        this.resaButton();
    }
    // Gére le bouton reservation et verif des caractéres 
    resaButton() {
        this.buttonResa.addEventListener("click", () => {
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            let myRegex = /^[a-zA-Z-\s]+$/;
            if (((myRegex.test(firstName) && myRegex.test(lastName)))) {
                if (this.resa) {
                    this.resa.suppRecap();
                    this.boardRecap.style.display = "none";
                }
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                const stationName = document.getElementById("stationName").textContent;
                this.instanceResa(lastName, firstName, stationName, 1200);
                this.resa.save();
                this.canvasBox.style.display = "block";
            } else {
                alert("Carractère non autorisés, veuillez recommencer votre reservation svp");
                this.canvasBox.style.display = "none";
            }
        });
        // Gére la validation de la signature, suppresion du formulaire et recap de la résa
        this.buttonCanvas.addEventListener("click", () => {
            this.resa.postedRacap();
            this.detailStation.style.display = "none";
        })
    }
        // instance de resa avec paramétres
    instanceResa(lastName, firstName, station, timer) {
        this.resa = new Resa(lastName, firstName, station, timer);
    }

    upBoardRecap() {
        this.boardRecap.style.display = "block";
        this.resa.postedRacap();
    }

    // gérer le remplissage des champs nom / prénom si on a déjà ces valeurs dans le localstorage
    initInputForm() {
        const firstNameStorage = localStorage.getItem("firstName");
        const lastNameStorage = localStorage.getItem("lastName");
        document.getElementById("firstName").value = firstNameStorage;
        document.getElementById("lastName").value = lastNameStorage;
    }

}