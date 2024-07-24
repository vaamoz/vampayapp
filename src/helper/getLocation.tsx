export function askForLocationAccess() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          console.log(
            "Latitude: " +
              position.coords.latitude +
              ", Longitude: " +
              position.coords.longitude
          );
          resolve({
            latitude: latitude,
            longitude: longitude,
            error: null,
          });
        },
        function (error) {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              // errorMessage = "User denied the request for Geolocation.";
              // alert("Please allow access to your location.");
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            default:
              errorMessage =
                "An unknown error occurred while accessing location.";
              break;
          }
          console.log(errorMessage);
          reject(errorMessage);
        }
      );
    } else {
      const errorMessage = "Geolocation is not supported by this browser.";
      console.log(errorMessage);
      reject(errorMessage);
    }
  });
}
