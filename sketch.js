// L-SYSTEMS:
// https://en.wikipedia.org/wiki/L-system
//
// this p5 sketch takes the turtle we created in the last
// project and *automates* the drawing based on a Lindenmayer
// (or L-) system.  L-systems are often used in procedural
// graphics to make natural, geometric, or interesting 'fractal-style'
// patterns.
//
// your tasks:
// (1) take a look at the L-system implemented here, and see if you 
// can expand upon it to do some automatic, cool, geometric drawing.
// use the turtle that you retooled from the previous sketch as the
// drawing engine.
// hint: google L-systems.  there are lots of them out there.
// another hint: you can use non-drawing symbols as symbolic 
// placeholders to create really complex patterns.

// TURTLE STUFF:
var x = [], y = [], angle = []; // the current position of the turtle
var currentangle = 270; // which way the turtle is pointing
var step = 20; // how much the turtle moves with each 'F'
var angleamt = 120; // how much the turtle turns with a '-' or '+'

// LINDENMAYER STUFF (L-SYSTEMS)
var thestring = 'F'; // "axiom" or start of the string
var numloops = 3; // how many iterations of the L-system to pre-compute
var therules = [['F', '+ F+F−F−F+F - F+F−F−F+F']];
var whereinstring = 0; // where in the L-system are we drawing right now?

// THIS RUNS WHEN WE HIT GO
function setup()
{
  createCanvas(800, 600); // this is the size of the window
  background(255); // background to white
  stroke(0, 0, 0, 255); // draw in black
  x = [10];
  y = [10];
  angle = [270];
  //frameRate(1);

  // COMPUTE THE L-SYSTEM
  for(var i = 0;i<numloops;i++) {
    thestring = lindenmayer(thestring); // do the stuff to make the string
  }
  //console.log(thestring); // comment this out if it's slowing you down
  
}

// DO THIS EVERY FRAME
function draw()
{
  
  // draw the current character in the string:
  drawIt(thestring.charAt(whereinstring)); 
  
  // increment the point for where we're reading the string.
  // wrap around at the end.
  whereinstring++;
  if(whereinstring>thestring.length-1) whereinstring = 0;
}

// interpret an L-system
function lindenmayer(s)
{
  var outputstring = ''; // start a blank output string
  
  // go through the string, doing rewriting as we go
  
  // iterate through 'therules' looking for symbol matches:
  for(var i=0;i<s.length;i++) // every symbol in 's'
  {
    var ismatch = 0; // by default, no match
    for(var j = 0;j<therules.length;j++) // every rule in 'therules'
    {
      if(s.charAt(i)==therules[j][0]) // MATCH!
      {
        outputstring+=therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches in 'therules' array, just copy the symbol over.
    if(ismatch===0) outputstring+= s.charAt(i); 
  }
  
  return(outputstring); // send out the modified string
}

// this is a custom function that draws turtle commands
function drawIt(k)
{
  var curstack = x.length-1;
  if(k=='F') // draw forward
  {
    stroke(0);
    var x1 = x[curstack] + step*cos(radians(angle[curstack]));
    var y1 = y[curstack] + step*sin(radians(angle[curstack]));
    x[curstack] = x1;
    y[curstack] = y1;
  }
  else if(k=='+') angle[curstack]+=angleamt;
  else if(k=='-') angle[curstack]-=angleamt;
  else if(k=='[') // start a branch
  {
    x[curstack+1] = x[curstack];
    y[curstack+1] = y[curstack];
    angle[curstack+1] = angle[curstack];
  }
  else if(k==']') // end a branch
  {
    x.pop();
    y.pop();
    angle.pop();
  }

  // pick a gaussian (D&D) distribution for the radius:
  var radius = 10;
  // draw the stuff:
  stroke(random(255), random(255), random(255));
  ellipse(x[curstack], y[curstack], step/4, step/4);
}
