import { Loader } from "@googlemaps/js-api-loader"


const loader = new Loader({
    apiKey: "AIzaSyDbo6vFOQqWvX7B1KN0eEOcuqU0oWs9lb0",
    version: "weekly",
    ...additionalOptions,
  });
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });