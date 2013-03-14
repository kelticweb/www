                                        


var tme1 = 120,
	tme2 = 120, 
	sttme1 = 120,
	sttme2 = 120,
	//mode = "hourglass",
	//mode = "fisc",
	//mode = "fisc-a",
	mode = "bron",
	defdel = 10,
	movdel = defdel,
	aft = true,
	tcount1=0,
	tcount2=0,
	clk = 0;
	

	
	window.onload = decclock();

	
function setClock(){
	//  sets time for both clocks
	
	tme1 = eval(document.getElementById("hrset").value) + eval(document.getElementById("minset").value);
	tme2 = eval(document.getElementById("hrset").value) + eval(document.getElementById("minset").value);
	sttme2 = tme2;
	sttme1 = tme1;	
	
};




function go_clock() {

	var but = document.getElementById("startbut");
	but.Style = "display:none";
	//if (aft==false) movdel = 0;
	movdel = 0;

	clk=1;

};

function start1() 
	{
		clk = 1;
		movdel = defdel;
			
			
		
	};

function start2() 
	{
		clk = 2;		
		movdel = defdel;		
	};

function decclock(){

		if (clk == 1) 	{
		tme1--;
		tcount1++;
		newtme = seconds2time(tme1);

		if (sttme1 > 0 && tme1 > 0){
		remain = tme1 / sttme1;
		//drawarc1(remain);
		}
		
		document.getElementById("wtme").innerHTML = newtme;
		document.getElementById("btme").innerHTML = seconds2time(tme2);
		document.getElementById("showmode1").innerHTML = mode + " ( " + seconds2time(sttme1) + " )";
		document.getElementById("showmode2").innerHTML = mode + " ( " + seconds2time(sttme2) + " )";
		
				};
				
				
				
				
		if (clk == 2) 	{
		tme2--;
		tcount2++;
		newtme = seconds2time(tme2);
		
		if (sttme2 > 0 && tme2 > 0){
		remain = tme2 / sttme2;
	
		}
		document.getElementById("btme").innerHTML = newtme;
		document.getElementById("wtme").innerHTML = seconds2time(tme1);
		document.getElementById("showmode1").innerHTML = mode + " ( " + seconds2time(sttme1) + " )";
		document.getElementById("showmode2").innerHTML = mode + " ( " + seconds2time(sttme2) + " )";
		
				};
		if (tme1==0 && clk!=0) {
				clk = 0;
				document.getElementById("msg").innerHTML = "time elapsed 1";
				}

		if (tme2==0 && clk!=0) {
				clk = 0;
				document.getElementById("msg").innerHTML = "time elapsed 2";
				}
				
		setMode();
		setTimeout(decclock,1000);
	}

function seconds2time (seconds) {
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours != 0) {
      time = hours+":";
    }
    if (minutes != 0 || time !== "") {
      minutes = (minutes < 10 && time !== "") ? "0"+minutes : String(minutes);
      time += minutes+":";
    }
    if (time === "") {
      time = seconds+"s";
    }
    else {
      time += (seconds < 10) ? "0"+seconds : String(seconds);
    }
    return time;
}

$('.dial')
    .trigger(
        'configure',
        {
        "min":10,
        "max":40,
        "fgColor":"#FF0000",
        "skin":"tron",
        "cursor":true
        }
    );


function drawarc1(per){
//console.log(3.6*(1-per));
 var canvas = document.getElementById('canv');
      var context = canvas.getContext('2d');
      var x = canvas.width / 4;
      var y = canvas.height / 2;
      var radius = 30;
      var startAngle = 0 * Math.PI;
      var endAngle = (2*(1-per))* Math.PI;
      var counterClockwise = false;
	
	
      context.beginPath();
      context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      context.lineWidth = 10;

      // line color
      context.strokeStyle = '#c1c1c1';
      context.stroke();
	  
};



function setMode() {
			if (mode=="hourglass") 
			{
				// only add if not exceeding max
				if (clk==1 && (tme2)<sttme2) tme2++;
				if (clk==2 && (tme1)<sttme1) tme1++;
			};
			
			if (mode=="fisc") //add amount required
			{
				if (clk==1) 	{
						tme1 = tme1 + movdel;
						movdel = 0;
						}
				if (clk==2) 	{
						tme2 = tme2 + movdel;
						movdel = 0;
						}
			};

			if (mode=="fisc-a") 
			{
				if (clk==1) 	{
						tme2 = tme2 + movdel;
						movdel = 0;
						}
				if (clk==2) 	{
						tme1 = tme1 + movdel;
						movdel = 0;
						}
			};
			if (mode=="bron") //lesser of del or turn
			{
				if (clk==1) 	{
						tme2 = tme2 + (movdel < tcount2 ? movdel : tcount2);
						// console.log(tcount2);
						movdel = 0;
						tcount2 = 0;
						}
				if (clk==2) 	{
						tme1 = tme1 + (movdel < tcount1 ? movdel : tcount1);
						// console.log(tcount1);
						movdel = 0;
						tcount1 = 0;
						}
			};													
												
		}





