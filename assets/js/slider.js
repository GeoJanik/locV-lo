class Slider {
    constructor() {
        this.interval;
        this.index = 0;
        this.next = document.getElementById("next");
        this.previous = document.getElementById("previous");
        this.play = document.getElementById("play");
        this.break = document.getElementById("break");
        this.img = document.getElementById("imgSlider");
        this.tab = new Array("./assets/img/velo.png", "assets/img/velo1.png", "./assets/img/velo2.png");
        this.img.src = this.tab[0];
        this.init();
    }

    // FONCTION POUR REGROUPER LES FONCTION DE MON SLIDER
    init() {
        this.timerSlide();
        this.nextClick();
        this.previousClick();
        this.breakSlide();
        this.playSlide();
        this.keybord();
    }

    //  AFFICHAGE DE L'IMAGE SUIVANTE ET BOUCLE A LA DERNIERE IMAGE
    nextSlide() {
        this.index = this.index + 1;
        if (this.index === this.tab.length) {
            this.index = 0;
        }
        this.img.src = this.tab[this.index];
    }

    // AFFICHAGE DE L'IMAGE PRECEDENTE ET BOUCLE A LA DERNIERE IMAGE
    previousSlide() {
        this.index = this.index - 1;
        if (this.index < 0) {
            this.index = 2;
        }
        this.img.src = this.tab[this.index];
    }

    // FONCTION POUR SLIDE SUIVANT AVEC SETINTERVAL
    nextClick() {
        this.next.addEventListener("click", () => {
            this.stopTimerSlide();
            this.nextSlide();
            this.timerSlide();
        })
    }

    // FONCTION POUR SLIDE PRECEDENTE AVEC SETINTERVAL
    previousClick() {
        this.previous.addEventListener("click", () => {
            this.stopTimerSlide();
            this.previousSlide();
            this.timerSlide();
        })
    }

    // BOUTON PAUSE DU SLIDE
    breakSlide() {
        this.break.addEventListener("click", () => {
            this.stopTimerSlide(this.interval);
        })
    }

    // BOUTON MARCHE DU SLIDE
    playSlide() {
        this.play.addEventListener("click", () => {
            this.stopTimerSlide();
            this.timerSlide();
        })
    }

    // FONCTION TIMER DU SLIDE
    timerSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    // FONCTION POUR STOP LE TIMER DU SLIDE
    stopTimerSlide() {
        clearInterval(this.interval);
    }

    // GESTION TOUCHES POUR CHANGEMENT SLIDE
    keybord() {
        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft") {
                this.stopTimerSlide();
                this.nextSlide();
                this.timerSlide();
            }
            if (e.key === "ArrowRight") {
                this.stopTimerSlide();
                this.previousSlide();
                this.timerSlide();
            }
        })
    }
}