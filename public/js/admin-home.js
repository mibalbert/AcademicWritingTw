window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  var script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqWH0IS8beHBRWjpwU1OP0h00gtgd7Wvc&libraries=places,geometry&callback=initMap";
  script.async = true;

  window.initMap = async function () {
    google.maps.visualRefresh = true;
    const map = new google.maps.Map(document.getElementById("map"), {
      // mapId: "b1beacae401d047c", //Really Grey Map
      // mapId: "5dc01d292296e5fa", //Dark Map
      mapId: "3d77b9a82b60bc5a", //DarkBlue Map
      disableDefaultUI: true,
      zoomControl: true,

      zoom: 3,
      center: { lat: -28.024, lng: 140.887 },
      // restriction: {
      //   latLngBounds: {
      //     east: 179.9999,
      //     north: 82,
      //     south: -85,
      //     west: -179.9999,
      //   },
      //   strictBounds: true,
      // },
    });

    window.addEventListener("resize", () => {
      const screenWidth = window.screen.width;
      if (screenWidth < 640) {
        map.setOptions({ zoomControl: false });
      } else {
        map.setOptions({ zoomControl: true });
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });
    map.setTilt(45);
    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        label,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
        map.setTilt(45);
      });
      return marker;
    });

    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
    markerCluster.addEventListener("click", (cluster) => {
      map.setTilt(45);
    });

    // new MarkerClusterer({ markers, map });
    // Add a marker clusterer to manage the markers.
  };

  const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];

  document.head.appendChild(script);
});
