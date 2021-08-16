class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 250;
        this.canvas.height = 150;
        this.drawing = false;
        this.buttonCanvas = document.getElementById("button-canvas")
        this.clearButton = document.getElementById("retry")
        this.canvasBox = document.getElementById("canvasBox");
        window.innerWidth > 800 ? this.initPc() : this.initMobile();
    }

    initPc() {
        //CLIQUE SOURIS POUR COMMENCER A DESSINER
        this.canvas.addEventListener('mousedown', e => {
            let positionMouse = this.getMousePosition(e);
            this.drawing = true;
            this.ctx.beginPath(); //créer un nouveau dessin
            this.ctx.moveTo(positionMouse.positionX, positionMouse.positionY);
        });

        //DESSIN AU MOUVEMENT DE LA SOURIS 
        this.canvas.addEventListener('mousemove', e => {
            if (!this.drawing) {
                return
            }
            let positionMouse = this.getMousePosition(e);
            this.ctx.lineTo(positionMouse.positionX, positionMouse.positionY); //créer ligne
            this.ctx.stroke(); //afficher ligne  
        });

        //QUAND ON STOP DESSIN, LE CANVAS APPARAIT
        this.canvas.addEventListener('mouseup', () => {
            this.drawing = false;
            this.buttonCanvas.style.display = "block";
        });

        //AU BOUTON RECOMMENCER, RENITIALISE LE CANVAS
        this.clearButton.addEventListener('click', () => {
            this.clear();
            this.buttonCanvas.style.display = "none";
        });

        // A LA VALIDATION DE LA SIGNATURE, LE CANVAS EST RENITIALISE  
        this.buttonCanvas.addEventListener('click', () => {
            this.clear();
        })
    };

    //LORSQUE L'ON TOUCHE L'ECRAN POUR COMMENCER DESSIN
    initMobile() {
        this.canvas.addEventListener('touchstart', e => {
            let position = this.getFingerPosition(e);
            this.ctx.beginPath(); //créer un nouveau dessin
            this.ctx.moveTo(position.posX, position.posY);
        });

        //LORSQUE L'ON BOUGE LE DOIGT
        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault(); //arrêt du scroll
            let position = this.getFingerPosition(e);
            this.ctx.lineTo(position.posX, position.posY); //créer ligne
            this.ctx.stroke(); //afficher ligne
        });
        //QUAND ON STOP DESSIN, LE CANVAS APPARAIT
        this.canvas.addEventListener('touchend', () => {
            this.drawing = false;
            this.buttonCanvas.style.display = "block";
        });

        //LORDUQE L'ON CLIQUE SUR RECOMMENCER, LE CANVAS EST RENITIALISE
        this.clearButton.addEventListener('click', () => {
            this.clear();
        });

        //A LA VALIDATION DE LA SIGNATURE, LE CANVAS EST RENITIALISE
        this.buttonCanvas.addEventListener('click', () => {
            this.clear();
        })
    };

    //SUPPRIMER LE DECALAGE DU CANVAS   
    getFingerPosition = (e) => {
        let rect = this.canvas.getBoundingClientRect();
        const position = {
            posX: e.touches[0].clientX - rect.left,
            posY: e.touches[0].clientY - rect.top
        };
        return position
    };

    getMousePosition = (e) => {
        let rect = this.canvas.getBoundingClientRect();
        const positionMouse = {
            positionX: e.clientX - rect.left,
            positionY: e.clientY - rect.top
        };
        return positionMouse
    }

    //RENITIALISE LE CANVAS ET SES COMPOSANTS
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvasBox.style.display = "none";
        this.buttonCanvas.style.display = "none";
    }
}