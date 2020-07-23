var polygonArray = [];
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 10.8505,
      lng: 76.2711,
    },
    zoom: 12,
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      editable: true,
    },
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "polygoncomplete", function (
    polygon
  ) {
    document.getElementById("info").innerHTML += "polygon points:" + "<br>";

    let locp = [];
    for (var i = 0; i < polygon.getPath().getLength(); i++) {
      document.getElementById("info").innerHTML +=
        polygon.getPath().getAt(i).toUrlValue(6) + "<br>";

      locp.push(polygon.getPath().getAt(i).toUrlValue(6));
      // debugger
    }

    polygonArray.push({
      type: "Polygon",
      area: [locp],
    });
  });
}

// $.ajax({
//     url: "/coordinates",
//     data: polygonArray,
//     type: "post",
//     success: function (result) {
//       console.log(1111);
//     },
//   });

document.getElementById("saveBtn").addEventListener("click", function () {
  postData("/coordinates", { transaction: { coordinates: polygonArray } }).then(
    (data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    }
  );
});

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
