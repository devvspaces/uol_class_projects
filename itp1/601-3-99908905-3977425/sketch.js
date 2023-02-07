/*
Officer: 3977425
CaseNum: 601-3-99908905-3977425

Case 601 - Narrowing in - stage 4

Casey Fry is on a killing spree and we still haven’t caught her.
We need a more sophisticated approach.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, SaddleBrown fill triangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, DarkCyan stroke ellipses at each location.

This time we will catch Fry by comparing both distance from the crimes and dates of sightings. If she was within less than 72 pixels of any of the crimes within no more than 2 days of their occurrence then the details should be pushed to the list of possible matches with the following format.

{ crime:{x: 0, y:0, victimName: "John Doe"}, suspect:{x: 0, y:0} }

Note that the possible matches are already being drawn.
Your job is to fill the array with the correct data.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

For this mission you will need ONLY the following:

- for loop
- if()
- <
- &&
- .push()
- dist()
- abs()
- triangle() NB. Draw each triangle with the point roughly at its center.

- ellipse()

- stroke(), fill() - rgb values only
- noStroke(), noFill()

*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var Murderer_Sightings = [
  { point_x: 518, point_y: 471, day: 12 },
  { point_x: 486, point_y: 508, day: 12 },
  { point_x: 475, point_y: 566, day: 13 },
  { point_x: 376, point_y: 554, day: 13 },
  { point_x: 316, point_y: 559, day: 13 },
  { point_x: 265, point_y: 614, day: 14 },
  { point_x: 253, point_y: 609, day: 14 },
  { point_x: 240, point_y: 604, day: 14 },
  { point_x: 220, point_y: 597, day: 15 },
  { point_x: 178, point_y: 600, day: 15 },
  { point_x: 199, point_y: 604, day: 17 },
  { point_x: 146, point_y: 582, day: 18 },
  { point_x: 115, point_y: 551, day: 20 },
  { point_x: 67, point_y: 495, day: 21 },
  { point_x: 39, point_y: 493, day: 22 },
  { point_x: 68, point_y: 461, day: 24 }
];


//Recent crime records.

var Murderscene_Data = [
  { coordinateX: 438, coordinateY: 420, recordDate: 11, victimName: 'JAUNITA JOYER' },
  { coordinateX: 408, coordinateY: 451, recordDate: 11, victimName: 'JACQUELINE DURANTS' },
  { coordinateX: 408, coordinateY: 377, recordDate: 13, victimName: 'BRIDGET BROADVIEW' },
  { coordinateX: 642, coordinateY: 289, recordDate: 16, victimName: 'BRAD SILVEIRA' },
  { coordinateX: 623, coordinateY: 279, recordDate: 16, victimName: 'NICOLE ASHELY' },
  { coordinateX: 95, coordinateY: 488, recordDate: 17, victimName: 'TU DAVISWOOD' },
  { coordinateX: 75, coordinateY: 522, recordDate: 18, victimName: 'JESUS FORSLIN' },
  { coordinateX: 269, coordinateY: 597, recordDate: 26, victimName: 'TAMICA MAUBERT' },
  { coordinateX: 389, coordinateY: 554, recordDate: 28, victimName: 'LESLEY MONKSFORD' },
  { coordinateX: 484, coordinateY: 549, recordDate: 2, victimName: 'DRUSILLA WARMAN' },
  { coordinateX: 496, coordinateY: 484, recordDate: 9, victimName: 'JESSIA PORTOS' },
  { coordinateX: 546, coordinateY: 463, recordDate: 14, victimName: 'JENIFFER DEAUVILLE' },
  { coordinateX: 538, coordinateY: 359, recordDate: 12, victimName: 'PIERRE DORCEY' },
  { coordinateX: 702, coordinateY: 412, recordDate: 17, victimName: 'LIANNE COURTWOOD' },
  { coordinateX: 817, coordinateY: 474, recordDate: 18, victimName: 'HANG NIEMELA' }
];

var size = 7


function preload() {
  countyMap = loadImage("map.png")
}

function setup() {
  createCanvas(countyMap.width, countyMap.height);
  noFill();
  noStroke();
  image(countyMap, 0, 0);

  //add your code below here

  push()
  for (let idx = 0; idx < Murderer_Sightings.length; idx++) {
    fill(139,69,19)
    let sightObj = Murderer_Sightings[idx]
    let pointX = sightObj.point_x
    let pointY = sightObj.point_y
    triangle(pointX, pointY - size, pointX - size, pointY + size, pointX + size, pointY + size)

    for (let mx = 0; mx < Murderscene_Data.length; mx++) {
      let murderObj = Murderscene_Data[mx]
      let withinDistance = dist(pointX, pointY, murderObj.coordinateX, murderObj.coordinateY) < 72
      let withinTimeFrame = abs(murderObj.recordDate - sightObj.day) <= 2
      if (withinDistance && withinTimeFrame) {
        possibleMatches.push({
          crime: {
            x: murderObj.coordinateX,
            y: murderObj.coordinateY,
            victimName: murderObj.victimName
          },
          suspect: {
            x: sightObj.point_x,
            y: sightObj.point_y
          }
        })
      }
    }
  }
  pop()

  push()
  for (let idx = 0; idx < Murderscene_Data.length; idx++) {
    stroke(0,139,139)
    let pointX = Murderscene_Data[idx].coordinateX
    let pointY = Murderscene_Data[idx].coordinateY
    ellipse(pointX, pointY, size * 1.8)
  }
  pop()



  // code to draw the matches ( if any)
  for (let i = 0; i < possibleMatches.length; i++) {
    stroke(127);
    strokeWeight(3);
    line(possibleMatches[i].crime.x, possibleMatches[i].crime.y, possibleMatches[i].suspect.x, possibleMatches[i].suspect.y);

    noStroke();
    fill(127);
    text(possibleMatches[i].crime.victimName, possibleMatches[i].crime.x + 15, possibleMatches[i].crime.y + 15);
  }
}

//We are not using the draw function this time
