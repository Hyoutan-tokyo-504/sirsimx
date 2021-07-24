var popsize = document.getElementById('popsize');
popsize.addEventListener("change", changeSimParams());

var recoverytimeinmillis = document.getElementById('recoverytimeinmillis');
recoverytimeinmillis.addEventListener("change", changeSimParams());

var infectionprobability = document.getElementById('infectionprobability');
infectionprobability.addEventListener("change", changeSimParams());

var speedRange = document.getElementById('speed');
speedRange.addEventListener("change", changeSimParams());

var vaccinationRange = document.getElementById('vaccination');
vaccinationRange.addEventListener("change", changeSimParams());

var effectivenessRange = document.getElementById('effectiveness');
effectivenessRange.addEventListener("change", changeSimParams());

var detectionRange = document.getElementById('detection');
detectionRange.addEventListener("change", changeSimParams());

var intervalRange = document.getElementById('interval');
intervalRange.addEventListener("change", changeSimParams());

var restartbtn = document.getElementById('restartbtn');
restartbtn.addEventListener("click", changeSimParams());

var resetbtn = document.getElementById('resetbtn');
resetbtn.addEventListener("click", changeSimParams(true));

/** Resets the simulation with new parameters. If arguments
 * are passed it resets to the default simulation values. */
function changeSimParams(resetToDefault) {
  if (resetToDefault) {
    function updateRangeValues() {
      $('#psactval').html(document.getElementById('popsize').value);
      $('#rtactval').html(document.getElementById('recoverytimeinmillis').value);
      $('#ipactval').html(document.getElementById('infectionprobability').value);
      $('#spactval').html(document.getElementById('speed').value);
      $('#vcactval').html(document.getElementById('vaccination').value);
      $('#effecactval').html(document.getElementById('effectiveness').value);
      $('#dsactval').html(document.getElementById('detection').value);
      $('#diactval').html(document.getElementById('interval').value);
    }
    return () => {
      const defaultValues = sirsim.getDefaultValues();
      popsize.value = defaultValues.popsize;
      recoverytimeinmillis.value = defaultValues.recoveryTimeInMillis;
      infectionprobability.value = defaultValues.infectionProbability;
      speedRange.value = defaultValues.speed;
      vaccinationRange.value = defaultValues.vaccination;
      effectivenessRange.value = defaultValues.effectiveness;
      detectionRange.value = defaultValues.detection;
      intervalRange.value = defaultValues.interval;
      sirsim.reset();
      updateRangeValues();
    }
  }

  let prev_psize, prev_rectime, prev_iprob, prev_speed, prev_detection, prev_interval;
  return function () {
    if (resetToDefault) {
      sirsim.reset();
    } else {
      let arg = new Object();
      let psize = parseInt(popsize.value);
      let rectime = parseInt(recoverytimeinmillis.value);
      let iprob = parseFloat(infectionprobability.value);
      let speed = parseFloat(speedRange.value);
      let vaccination = parseFloat(vaccinationRange.value) / 100.0;
      let effectiveness = parseFloat(effectivenessRange.value) / 100.0;
      let detection = parseFloat(detectionRange.value);
      let interval = parseInt(intervalRange.value);
      if (psize >= 10 && psize <= 500) {
        arg.popsize = psize;
      }
      if (rectime) {
        arg.recoveryTimeInMillis = rectime;
      }
      if (iprob) {
        arg.infectionProbability = iprob;
      }
      if (speed) {
        arg.speed = speed;
      }
      if (typeof vaccination !== "undefined") {
        arg.vaccination = vaccination;
      }
      if (typeof effectiveness !== "undefined") {
        arg.effectiveness = effectiveness;
      }
      if(detection >= 0){
        arg.detection = detection;
      }
      if (interval) {
        arg.interval = interval;
      }
      if (prev_psize !== psize || prev_iprob !== iprob ||
        prev_rectime !== rectime || prev_speed !== speed ||
        prev_detection !== detection || prev_interval !== interval) {
        sirsim.reset(arg);
      }
    }
  }
}

// configure the form ranges labels
$(function () {
  $("#psmin").html(document.getElementById('popsize').getAttribute('min'));
  $("#psmax").html(document.getElementById('popsize').getAttribute('max'));
  $("#ipmin").html(document.getElementById('infectionprobability').getAttribute('min'));
  $("#ipmax").html(document.getElementById('infectionprobability').getAttribute('max'));
  $("#rtmin").html(document.getElementById('recoverytimeinmillis').getAttribute('min'));
  $("#rtmax").html(document.getElementById('recoverytimeinmillis').getAttribute('max'));
  $("#spmin").html(document.getElementById('speed').getAttribute('min'));
  $("#spmax").html(document.getElementById('speed').getAttribute('max'));
  $("#vcmin").html(document.getElementById('vaccination').getAttribute('min'));
  $("#vcmax").html(document.getElementById('vaccination').getAttribute('max'));
  $("#effecmin").html(document.getElementById('effectiveness').getAttribute('min'));
  $("#effecmax").html(document.getElementById('effectiveness').getAttribute('max'));
  $("#dsmin").html(document.getElementById('detection').getAttribute('min'));
  $("#dsmax").html(document.getElementById('detection').getAttribute('max'));
  $("#dimin").html(document.getElementById('interval').getAttribute('min'));
  $("#dimax").html(document.getElementById('interval').getAttribute('max'));
  $('#psactval').html(document.getElementById('popsize').value);
  $('#rtactval').html(document.getElementById('recoverytimeinmillis').value);
  $('#ipactval').html(document.getElementById('infectionprobability').value);
  $('#spactval').html(document.getElementById('speed').value);
  $('#vcactval').html(document.getElementById('vaccination').value);
  $('#effecactval').html(document.getElementById('effectiveness').value);
  $('#dsactval').html(document.getElementById('detection').value);
  $('#diactval').html(document.getElementById('interval').value);

  popsize.addEventListener('change', (() => {
    $('#psactval').html(document.getElementById('popsize').value);
  }));
  recoverytimeinmillis.addEventListener('change', (() => {
    $('#rtactval').html(document.getElementById('recoverytimeinmillis').value);
  }));
  infectionprobability.addEventListener('change', (() => {
    $('#ipactval').html(document.getElementById('infectionprobability').value);
  }));
  speedRange.addEventListener('change', (() => {
    $('#spactval').html(document.getElementById('speed').value);
  }));
  vaccinationRange.addEventListener('change', (() => {
    $('#vcactval').html(document.getElementById('vaccination').value);
  }));
  effectivenessRange.addEventListener('change', (() => {
    $('#effecactval').html(document.getElementById('effectiveness').value);
  }));
  detectionRange.addEventListener('change', (() => {
    $('#dsactval').html(document.getElementById('detection').value);
  }));
  intervalRange.addEventListener('change', (() => {
    $('#diactval').html(document.getElementById('interval').value);
  }));
});

// disables form submission,to prevent unwanted page updates
$('form').submit(false);
