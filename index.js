/*
* @name Fuzzy
*/

export function dsp(t) {
  px = repeater(t, 5, 0.2);
  var sound = (psy(t) * px) * 0.5 * 0.00000001;
  
  var r = cos(t, 5, 1) * 0.5 + 0.5;
  var tn = tune(t);
  var octave = 50 + tn * 20;
  sound = r * bass(t, octave) + (1-r) * sound;
  
  return sound;
}

function tune(t) {
  var speed = 25;
  var s = 1;
  if (repeater(t, speed, 0.5)) {
    s = 0;
  }
  if (repeater(t, speed / 4, 0.25) && s > 0) {
    s -= 0.5;
  }
  return s;
}


function psy(t) {
  return Math.pow(tan(t, 5, 10), 10);
}

function sin(t, freq, amp) {
  return Math.sin(Math.PI * t * freq) * amp;
}

function cos(t, freq, amp) {
  return Math.cos(Math.PI * t * freq) * amp;
}

function tan(t, freq, amp) {
  return Math.tan(Math.PI * t * freq) * amp;
}


function bass(t, octave) {
  return Math.pow(sin(t, octave, 2), 10);
}

function repeater(t, bpm, beatLength) {
  return (t * (bpm/60) % 1) > beatLength;
}

function sweepRepeater(t, bpm, beatLength) {
  var phase = (t * (bpm/60)) % 1;
  if (phase < beatLength) {
    return phase * (1 / beatLength);
  }
  return 0;
}