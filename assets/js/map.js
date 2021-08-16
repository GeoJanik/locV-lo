class Carte {
    constructor() {
        this.map = "";
        this.apiKeys = "4dc3f8e09a4de492801a441ad990edfc97f58400";
        this.lattitudeMap = 43.6;
        this.longitudeMap = 1.43;
        this.city = "toulouse";
        this.availableBikes = document.getElementById("availableBikes");
        this.detailStation = document.getElementById("detailStation");
        this.stationAddress = document.getElementById("stationAddress");
        this.statut = document.getElementById("statut");
        this.infosReservation = document.getElementById("infosReservation");
        this.stationName = document.getElementById("stationName");
        this.conteneurMap = document.getElementById("map");
        this.initMap();
        this.initStations();
    }

    // Iniatilise la Map avec LEAFLETJS et l'affiche dans la DIV map
    initMap() {
        this.map = L.map('map').setView([this.lattitudeMap, this.longitudeMap], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    // Télécharge les données pour la ville selectionnée fournit pas openData de JCdecaux et affiche les données au clic du marker
    initStations() {
        fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.city}&apiKey=${this.apiKeys}`)
            .then(response => response.json())
            .then(data => {
                const groupMarkers = new L.MarkerClusterGroup({
                    iconCreateFunction: function (cluster) {
                        return L.divIcon({
                            html: cluster.getChildCount(),
                            className: 'mycluster',
                            iconSize: null
                        });
                    }
                });
                data.forEach(station => {
                    let marker;
                    let latitude = station.position.lat;
                    let longitude = station.position.lng;
                    let nomStation = station.name;
                    let status = station.status;
                    let address = station.address;
                    let availableBikeStands = station.available_bike_stands;
                    let availableBikes = station.available_bikes;
                    const LeafIcon = L.Icon.extend({
                        options: {
                            iconSize: [38, 61],
                            iconAnchor: [22, 94],
                            popupAnchor: [-3, -76]
                        }
                    });
                    const firstIcon = new LeafIcon({
                        iconUrl: 'assets/img/marker.png'
                    })
                    const secondIcon = new LeafIcon({
                        iconUrl: 'assets/img/marker2.png'
                    })
                    const thirdIcon = new LeafIcon({
                        iconUrl: 'assets/img/marker3.png'
                    })

                    if (status === "OPEN" && availableBikes > 1 && availableBikeStands > 1) {
                        marker = L.marker([latitude, longitude], {
                            icon: firstIcon
                        });

                    } else if (status === "OPEN" && availableBikeStands > 0 && availableBikes < 1) {
                        marker = L.marker([latitude, longitude], {
                            icon: secondIcon
                        });

                    } else if (status === "CLOSE") {
                        marker = L.marker([latitude, longitude], {
                            icon: thirdIcon
                        });

                    }
                    if (marker) {
                        marker.addEventListener("click", () => {
                            this.detailStation.style.display = "block";
                            this.detailStation.style.opacity = "1";
                            this.conteneurMap.style.width = "1200px";
                            this.stationAddress.innerHTML = address;
                            this.stationName.innerHTML = nomStation;
                            this.statut.innerHTML = status;
                            this.availableBikes.innerHTML = "Vélo dispo : " + station.available_bikes;
                            if (status === "OPEN" && availableBikes > 1 && availableBikeStands > 1) {
                                this.infosReservation.style.display = "block";
                                this.infosReservation.style.opacity = "1";
                            } else if (status === "OPEN" && availableBikeStands > 0 && availableBikes < 1) {
                                this.infosReservation.style.display = "none";
                                this.infosReservation.style.opacity = "0";
                            }
                        });
                        groupMarkers.addLayer(marker);

                    }
                })
                this.map.addLayer(groupMarkers);

            })
    }
}