// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .




$(document).ready(function () {
    $('section').show();
    $('h2').click(function () {
        $(this).toggleClass("open");
        $(this).next().toggle();
    }); //end toggle

    $('#expandall').click(function () {
        $('section').show();
        $('h2').addClass("open");
    });

    $('#collapseall').click(function () {
        $('section').hide();
        $('h2').removeClass("open");
    });



//Graphs

Math.seed = function(s) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};

var cvs = document.getElementById('dist');
var ctx = cvs.getContext('2d');
ctx.clearRect(0, 0, 600, 400);
var nResults = 100;
$('#npts').keyup(
    function(){
        nResults = $(this).val() * 24;
    });
//var nResults = $("npts").val();
var costResults = [];
for (var i = 0; i < nResults; i++) {
    costResults.push(Math.floor(Math.random()*50000+Math.random()*50000+Math.random()*50000+Math.random()*50000));
}
var costMin = Math.min.apply(Math, costResults);
var costMax = Math.max.apply(Math, costResults);
var costLength = costResults.length;
var costSum = costResults.reduce(function(a, b) { return a + b });
var costMean = costSum / costLength;
var costVariance = 0;
for (var i = 0; i < costLength; i++) {
    costVariance = costVariance + (costResults[i] - costMean)*(costResults[i] - costMean);
}
var lowerPercentile = costResults.sort(function(a,b){
        return a - b}
)[Math.floor(0.5*costLength)];
    var upperPercentile;
    upperPercentile = costResults.sort(function (a, b) {
            return a - b
        }
    )[Math.ceil(0.5 * costLength)];
var bpAmount = ((lowerPercentile+upperPercentile)/2);
    $("#bp").val(bpAmount);
var lineStart = (bpAmount*(350/(costMax)));
var histX = [];
var histY = [];
var nBins = Math.ceil(costMax/10000)+1;
for (var i = 0; i < nBins; i++) {
    var count = 0;
    for (var j = 0; j < costLength; j++) {
        if (costResults[j] >= (i*10000) && costResults[j] < (10000 + i*10000)) {
            count++;
        }
    }
    histX.push(25 + i*350/nBins + 175/nBins);
    histY.push(count);
}


    ctx.beginPath();
    ctx.moveTo(25,325);
    for (var i = 0; i < nBins; i++) {
        var barX = 25 + i*(350/nBins) + (1/2)*(350/nBins);
        var barY = 325 - (275/Math.max.apply(Math, histY))*histY[i];
        ctx.lineTo(barX, barY);
    }
    ctx.lineTo(25,325);
    ctx.closePath();
    ctx.lineWidth=2;
    ctx.fillStyle="#66b2ff";
    ctx.fill();
    ctx.strokeStyle = "#003366";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(25, 325);
    ctx.lineTo(375, 325);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth=1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(25, 325);
    ctx.lineTo(25, 25);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(lineStart, 325);
    ctx.lineTo(lineStart, 25);
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.fillStyle = "#000000";
    ctx.font = "14px Arial";
    ctx.fillText("0",25,425);
    ctx.fillText(nBins*10000,350,300);


var canvas = document.getElementById('sim');
var context = canvas.getContext('2d');
var nMonthlyPts = nResults/24;
var riskMonth = [];
for (var i = 0; i < 24; i++) {
    var risk = 0;
    for (var j = 0; j < nMonthlyPts; j++) {
        var n = Math.floor(Math.random()*(costLength));
        var c = costResults[n];
        risk = risk + (bpAmount - c);
    }
    riskMonth.push(risk);
}


var mcResults = riskMonth;
mcResults.push(0);
var mcMin = Math.min.apply(Math, mcResults);
var mcMax = Math.max.apply(Math, mcResults);


$( "#bestMonth" ).text( "Best Month: $" + mcMax );
$( "#worstMonth" ).text( "Worst Month: $" + mcMin );

      mcResults.pop();

    $( "#mean" ).text( "Average Reimbursement: $" + costMean );
    $( "#variance" ).text( "Variance: $" + costVariance );
    $( "#delta").text( "Average PMPM reimbursement difference vs. Medicare FFS: $" + (bpAmount - costMean)/6);

var zeroRatio = ((mcMin + mcMax)/2)*(300/(mcMax - mcMin));
var hAxis = 162.5 + zeroRatio;

context.clearRect(0, 0, canvas.width, canvas.height)
context.beginPath();
context.moveTo(50, hAxis);
context.lineTo(400, hAxis);
context.stroke();
context.beginPath();
context.moveTo(50, 325);
context.lineTo(50, 25);
context.stroke();
context.font = "14px Arial";
context.fillText("0",2,hAxis);
context.fillText(mcMax,2,20);
context.fillText(mcMin,2,320);
var mcLength = mcResults.length;
for (var i = 0; i < mcLength; i++) {
    var barWidth = (2/3)*(350/mcLength);
    var barHeight = (275/(mcMax - mcMin))*mcResults[i];
    var barX = 50 + i*(350/mcLength) + (1/6)*(350/mcLength);
    var barY = hAxis - (275/(mcMax - mcMin))*mcResults[i];
    context.beginPath();
    if (mcResults[i] < 0) {
        context.fillStyle = "rgb(200,0,0)"
    }
    else {
        context.fillStyle = "rgb(0,0,200)"
    }
    context.fillRect(barX, barY, barWidth, barHeight);
}


    $('input').change(
        function(){

            Math.seed = function(s) {
                return function() {
                    s = Math.sin(s) * 10000; return s - Math.floor(s);
                };
            };

            var cvs = document.getElementById('dist');
            var ctx = cvs.getContext('2d');
            ctx.clearRect(0, 0, 600, 400);
            var nResults = 100;
            $('#npts').keyup(
                function(){
                    nResults = $(this).val() * 24;
                });

            var costResults = [];
            for (var i = 0; i < nResults; i++) {
                costResults.push(Math.floor(Math.random()*50000+Math.random()*50000+Math.random()*50000+Math.random()*50000));
            }
            var costMin = Math.min.apply(Math, costResults);
            var costMax = Math.max.apply(Math, costResults);
            var costLength = costResults.length;
            var costSum = costResults.reduce(function(a, b) { return a + b });
            var costMean = costSum / costLength;
            var costVariance = 0;
            for (var i = 0; i < costLength; i++) {
                costVariance = costVariance + (costResults[i] - costMean)*(costResults[i] - costMean);
            }
            var lowerPercentile = costResults.sort(function(a,b){
                    return a - b}
            )[Math.floor(0.5*costLength)];
            var upperPercentile;
            upperPercentile = costResults.sort(function (a, b) {
                    return a - b
                }
            )[Math.ceil(0.5 * costLength)];
            var bpAmount = ((lowerPercentile+upperPercentile)/2);
            $("#bp").val(bpAmount);
            var lineStart = (bpAmount*(350/(costMax)));
            var histX = [];
            var histY = [];
            var nBins = Math.ceil(costMax/10000)+1;
            for (var i = 0; i < nBins; i++) {
                var count = 0;
                for (var j = 0; j < costLength; j++) {
                    if (costResults[j] >= (i*10000) && costResults[j] < (10000 + i*10000)) {
                        count++;
                    }
                }
                histX.push(25 + i*350/nBins + 175/nBins);
                histY.push(count);
            }


            ctx.beginPath();
            ctx.moveTo(25,325);
            for (var i = 0; i < nBins; i++) {
                var barX = 25 + i*(350/nBins) + (1/2)*(350/nBins);
                var barY = 325 - (275/Math.max.apply(Math, histY))*histY[i];
                ctx.lineTo(barX, barY);
            }
            ctx.lineTo(25,325);
            ctx.closePath();
            ctx.lineWidth=2;
            ctx.fillStyle="#66b2ff";
            ctx.fill();
            ctx.strokeStyle = "#003366";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(25, 325);
            ctx.lineTo(375, 325);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth=1;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(25, 325);
            ctx.lineTo(25, 25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(lineStart, 325);
            ctx.lineTo(lineStart, 25);
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth=2;
            ctx.stroke();
            ctx.fillStyle = "#000000";
            ctx.font = "14px Arial";
            ctx.fillText("0",25,425);
            ctx.fillText(nBins*10000,350,300);


            var canvas = document.getElementById('sim');
            var context = canvas.getContext('2d');
            var nMonthlyPts = nResults/24;
            var riskMonth = [];
            for (var i = 0; i < 24; i++) {
                var risk = 0;
                for (var j = 0; j < nMonthlyPts; j++) {
                    var n = Math.floor(Math.random()*(costLength));
                    var c = costResults[n];
                    risk = risk + (bpAmount - c);
                }
                riskMonth.push(risk);
            }


            var mcResults = riskMonth;
            mcResults.push(0);
            var mcMin = Math.min.apply(Math, mcResults);
            var mcMax = Math.max.apply(Math, mcResults);


            $( "#bestMonth" ).text( "Best Month: $" + mcMax );
            $( "#worstMonth" ).text( "Worst Month: $" + mcMin );


            $( "#mean" ).text( "Average Reimbursement: $" + costMean );
            $( "#variance" ).text( "Variance: $" + costVariance );
            $( "#delta").text( "Average monthly reimbursement difference vs. Medicare FFS: $" + (bpAmount - costMean)/6);

            mcResults.pop();

            var zeroRatio = ((mcMin + mcMax)/2)*(300/(mcMax - mcMin));
            var hAxis = 162.5 + zeroRatio;

            context.clearRect(0, 0, canvas.width, canvas.height)
            context.beginPath();
            context.moveTo(50, hAxis);
            context.lineTo(400, hAxis);
            context.stroke();
            context.beginPath();
            context.moveTo(50, 325);
            context.lineTo(50, 25);
            context.stroke();
            context.font = "14px Arial";
            context.fillText("0",2,hAxis);
            context.fillText(mcMax,2,20);
            context.fillText(mcMin,2,320);
            var mcLength = mcResults.length;
            for (var i = 0; i < mcLength; i++) {
                var barWidth = (2/3)*(350/mcLength);
                var barHeight = (275/(mcMax - mcMin))*mcResults[i];
                var barX = 50 + i*(350/mcLength) + (1/6)*(350/mcLength);
                var barY = hAxis - (275/(mcMax - mcMin))*mcResults[i];
                context.beginPath();
                if (mcResults[i] < 0) {
                    context.fillStyle = "rgb(200,0,0)"
                }
                else {
                    context.fillStyle = "rgb(0,0,200)"
                }
                context.fillRect(barX, barY, barWidth, barHeight);
            }
        });
}); //end ready
