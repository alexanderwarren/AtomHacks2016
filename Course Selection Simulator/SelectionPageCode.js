
var classesTaken = [];
var classValues = [];
var classNames = [];
var qualifiedCourses = [];

function checkSelectedClasses(subject, nextSubject){
	var classes = document.getElementsByClassName(subject.toLowerCase());
	for(i = 0; i<classes.length; i++){
		if(classes[i].value != ""){
			if(parseInt(classes[i].value)>=0 && parseInt(classes[i].value)<=100){
				classesTaken.push(classes[i].getAttribute("id") + ":" + classes[i].value);
				//console.log(classes[i].getAttribute("id") + ":" + classes[i].value);		
			} else{
				document.getElementById("error").innerHTML = "Make sure your grades are valid (numbers 0-100 only!)"; //Displays error message.
				classes[i].setAttribute("class","textbox broken"); //Shows error.
				classesTaken = [];
				return;
			}
		} else {
			classesTaken.push(classes[i].getAttribute("id") + ":" + 0);
		}
	} 
	document.getElementById("error").innerHTML = ""; //When all are valid.
	if(nextSubject != "null"){
		window.location.href= "./" + nextSubject + "Classes.html?classesTaken=" + classesTaken;
	}else{
		window.location.href= "./Results.html?classesTaken=" + classesTaken;
	}	
}

function getAnswers(subject, nextSubject){
	classesTaken = decodeURIComponent(window.location.href);	//Get the URL.
	if(classesTaken.indexOf("=") >= 0){
		classesTaken = classesTaken.slice(classesTaken.indexOf('=')+1); //Get the info attatched at the end of the URL.
		classesTaken = classesTaken.split(","); //Split it into an array.
	} else {
		classesTaken = [];
	}
	checkSelectedClasses(subject, nextSubject);
}

function calculateResults(){
	classesTaken = decodeURIComponent(window.location.href);
	classesTaken = classesTaken.slice(classesTaken.indexOf('=')+1); //Get the info attatched at the end of the URL.
	classesTaken = classesTaken.split(","); //Split it into an array.
	for(i = 0; i<classesTaken.length; i++){
		classValues[i] = classesTaken[i].slice(classesTaken[i].indexOf(':')+1);
		classNames[i] = classesTaken[i].slice(0,classesTaken[i].indexOf(':'));
		//console.log(classValues[i]);
	}
	var list = document.getElementById("classList");
	//console.log(classValues[classNames.indexOf("geo")]);
	//MATH
	if((classValues[classNames.indexOf("geo")] >= 65 || classValues[classNames.indexOf("hongeo")] >= 65) && (classValues[classNames.indexOf("alg2")] == 0 && classValues[classNames.indexOf("honalg2")] == 0)){ //geo -> alg2
		qualifiedCourses.push("Algebra 2/ Trigonometry");
	}
	if((classValues[classNames.indexOf("alg2")] >= 65 || classValues[classNames.indexOf("honalg2")] >= 65) && (classValues[classNames.indexOf("precalc")] == 0 && classValues[classNames.indexOf("honprecalc")] == 0)){ //alg2 -> precalc
		qualifiedCourses.push("Precalculus");
	}
	if((classValues[classNames.indexOf("precalc")] >= 65 || classValues[classNames.indexOf("honprecalc")] >= 65) && (classValues[classNames.indexOf("calc")] == 0 && classValues[classNames.indexOf("apcalcab")] == 0 || classValuesclassValues[classNames.indexOf("apcalcbc")] != 0)){ //precalc -> calculus
		qualifiedCourses.push("Calculus");
	}
	if((classValues[classNames.indexOf("precalc")] >= 65 || classValues[classNames.indexOf("honprecalc")] >= 65) && (classValues[classNames.indexOf("stat")] == 0 && classValues[classNames.indexOf("apstat")] == 0)){//precalc -> statistics
		qualifiedCourses.push("Statistics");
	}
	if((classValues[classNames.indexOf("hongeo")] >= 90 || classValues[classNames.indexOf("geo")] >= 95) && (classValues[classNames.indexOf("alg2")] == 0 && classValues[classNames.indexOf("honalg2")] == 0)){ //honors geo -> honors trig 
		qualifiedCourses.push("Honors Algebra 2/Trig (Contingent on exam score for normal geometry students)");
	}
	if((classValues[classNames.indexOf("honalg2")] >= 85) && (classValues[classNames.indexOf("honprecalc")] == 0 && classValues[classNames.indexOf("precalc")] == 0)){ //honors trig -> honors precalc
		qualifiedCourses.push("Honors Precalculus");
	}
	if((classValues[classNames.indexOf("honalg2")] >= 95) && (classValues[classNames.indexOf("honprecalc")] == 0 && (classValues[classNames.indexOf("precalc")] == 0 && classValues[classNames.indexOf("apcalcab")] == 0 && classValues[classNames.indexOf("apcalcbc")] == 0))){ //honors trig -> calc bc
		qualifiedCourses.push("AP Calculus BC (Contingent on exam scores)");
	}
	if((classValues[classNames.indexOf("honprecalc")] >= 90 || classValues[classNames.indexOf("precalc")] >= 90) && (classValues[classNames.indexOf("apcalcab")] == 0 && classValues[classNames.indexOf("apcalcbc")] == 0)){ //honors precalc -> calc AB
		qualifiedCourses.push("AP Calculus AB");
	}
	if((classValues[classNames.indexOf("honprecalc")] >= 65 ||classValues[classNames.indexOf("precalc")] >= 65) && (classValues[classNames.indexOf("calc")] == 0 && classValues[classNames.indexOf("apcalcab")] == 0 && classValues[classNames.indexOf("apcalcbc")] == 0)){ //honors trig -> honors precalc
		qualifiedCourses.push("AP Calculus BC (Contingent of exam scores)");
	}
	if((classValues[classNames.indexOf("honprecalc")] >= 90 ||classValues[classNames.indexOf("precalc")] >= 90 ||classValues[classNames.indexOf("alg2")] >= 90 ||classValues[classNames.indexOf("honalg2")] >= 90) && (classValues[classNames.indexOf("stat")] == 0 && classValues[classNames.indexOf("apcalcab")] == 0 && classValues[classNames.indexOf("apstat")] == 0)){ //honors trig -> honors precalc
		qualifiedCourses.push("AP Statistics");
	}
	if((classValues[classNames.indexOf("sophmathintel")] == 0 && classValues[classNames.indexOf("junmathintel")] == 0 && classValues[classNames.indexOf("senmathintel")] == 0)){ //mathintel
		qualifiedCourses.push("Sophomore Math Intel (Sophmore only. Cumulative avg > 90)");
	}
	if((classValues[classNames.indexOf("compsci")] >= 65 || classValues[classNames.indexOf("sophmathintel")] >= 65) && (classValues[classNames.indexOf("sophmathintel")] == 0 && classValues[classNames.indexOf("junmathintel")] == 0 && classValues[classNames.indexOf("senmathintel")] == 0)){
		qualifiedCoureses.push("Junior Math intel (Junior only. Cumulative avg > 90");
	}
	if(classValues[classNames.indexOf("junmathintel")] >= 65 && classValues[classNames.indexOf("senmathintel")] == 0){
		qualifiedCoureses.push("Senior Math intel (Senior only.)");
	}
	if((classValues[classNames.indexOf("apcalcab")] >= 65 || classValues[classNames.indexOf("apcalcbc")] >= 0) && (classValues[classNames.indexOf("precalc")] >= 90 || classValues[classNames.indexOf("honprecalc")] >= 90) && (classValues[classNames.indexOf("linear")] == 0)){
		qualifiedCourses.push("Linear Algebra (Contingent on exam scores. Cumulative avg > 90");
	}
	if((classValues[classNames.indexOf("apcalcab")] >= 65 || classValues[classNames.indexOf("apcalcbc")] >= 65 ) && (classValues[classNames.indexOf("precalc")] >= 90 || classValues[classNames.indexOf("honprecalc")] >= 90) && (classValues[classNames.indexOf("multi")] == 0)){
		qualifiedCourses.push("Multivariable Calculus (Contingent on exam scores. Cumulative avg > 90");
	}
	
	//SS
	if((classValues[classNames.indexOf("global9")] >= 92) && (classValues[classNames.indexOf("euro")] == 0 && classValues[classNames.indexOf("hug")] == 0 && classValues[classNames.indexOf("apw1")] == 0)){ //mathintel
        qualifiedCourses.push("AP Human Geography");
    } 
    if((classValues[classNames.indexOf("global9")] >= 92 && classValues[classNames.indexOf("eng9")] >= 90) && (classValues[classNames.indexOf("euro")] == 0 && classValues[classNames.indexOf("hug")] == 0 && classValues[classNames.indexOf("apw1")] == 0)){ //mathintel
        qualifiedCourses.push("AP European History");
    }
    if((classValues[classNames.indexOf("apw2")] >= 90 || classValues[classNames.indexOf("hug")] >= 90 || classValues[classNames.indexOf("euro")] >= 90 || classValues[classNames.indexOf("global10")] >= 92) && (classValues[classNames.indexOf("ush")] == 0 && classValues[classNames.indexOf("apush")] == 0)){ //mathintel
        qualifiedCourses.push("AP US History");
    }
    if((classValues[classNames.indexOf("apw1")] >= 65) && (classValues[classNames.indexOf("global9")] == 0 && classValues[classNames.indexOf("hug")] == 0 && classValues[classNames.indexOf("apw1")] == 0)){ //mathintel
        qualifiedCourses.push("APW2");
        }
    if((classValues[classNames.indexOf("global9")] >= 65) && (classValues[classNames.indexOf("euro")] == 0 && classValues[classNames.indexOf("hug")] == 0 && classValues[classNames.indexOf("apw1")] == 0)){ //mathintel
        qualifiedCourses.push("Global History 10");
        }
	
	//BIO
	if(classValues[classNames.indexOf("bio")] == 0 && classValues[classNames.indexOf("honorbio")] == 0){
		qualifiedCourses.push("Biology");
		qualifiedCourses.push("Honors Biology (Freshmen. Contingent on test scores)");
	}
	if((classValues[classNames.indexOf("chem")] >= 88 || classValues[classNames.indexOf("honorschem")] >= 88) && classValues[classNames.indexOf("eng9")] >= 85 && (classValues[classNames.indexOf("bio")] == 0 && classValues[classNames.indexOf("honorbio")] == 0)){
		qualifiedCourses.push("Honors Biology (Sophmore.)");
	}
	if(classValues[classNames.indexOf("relit")] == 0){
		qualifiedCourses.push("Research Literacy");
	}
	if((classValues[classNames.indexOf("bio")] >= 88 || classValues[classNames.indexOf("honorbio")] >= 88) && classValues[classNames.indexOf("relit")] >= 88 && classValues[classNames.indexOf("eng9")] >= 92 && classValues[classNames.indexOf("sophbiointel")] == 0){
		qualifiedCourses.push("Sophmore Biology Research");
	}
	if((classValues[classNames.indexOf("chem")] >= 90 || classValues[classNames.indexOf("honorschem")] >= 90) && classValues[classNames.indexOf("eng9") >= 85] && classValues[classNames.indexOf("apbio")] == 0){
		qualifiedCourses.push("AP Biology (Sophmore. Requires chem grade above 92 if proper tests not taken");
	}
	if((classValues[classNames.indexOf("bio")] >= 88 || classValues[classNames.indexOf("honorbio")] >= 85) && classValues[classNames.indexOf("chem")] >= 88 && classValues[classNames.indexOf("apbio")] == 0){
		qualifiedCourses.push("AP Biology (Jun/Sen. Requires chem > 90 without proper tests and cumulative english avg > 85)");
	}
	if((classValues[classNames.indexOf("bio")] >= 85 || classValues[classNames.indexOf("honorbio")] >= 85) && classValues[classNames.indexOf("apes")] == 0){
		qualifiedCourses.push("AP Environmental.(Jun/Sen. Cumulative english avg > 85");
	}
	if((classValues[classNames.indexOf("chem")] >= 85 || classValues[classNames.indexOf("honorschem")] >= 85) && classValues[classNames.indexOf("eng9")] >= 85 && classValues[classNames.indexOf("apes")] == 0){
		qualifiedCourses.push("AP Environmental.(Sophmore. Contingent on exam scores.)")
	}
	//FL
	var language = "";
	if(classValues[classNames.indexOf("fr1")] >= 65 || classValues[classNames.indexOf("fr2")] >= 65 || classValues[classNames.indexOf("fr3")] >= 65){
		language = "fr";
	}
	if(classValues[classNames.indexOf("sp1")] >= 65 || classValues[classNames.indexOf("sp2")] >= 65 || classValues[classNames.indexOf("sp3")] >= 65){
		language = "sp";
	}
	if(classValues[classNames.indexOf("it1")] >= 65 || classValues[classNames.indexOf("it2")] >= 65 || classValues[classNames.indexOf("it3")] >= 65){
		language = "it";
	}
	if(classValues[classNames.indexOf("chin1")] >= 65 || classValues[classNames.indexOf("cin2")] >= 65 || classValues[classNames.indexOf("chin3")] >= 65){
		language = "chin";
	}
	if(classValues[classNames.indexOf("lat1")] >= 65 || classValues[classNames.indexOf("lit2")] >= 65 || classValues[classNames.indexOf("lat3")] >= 65){
		language = "lat";
	}
	if(classValues[classNames.indexOf("jap1")] >= 65 || classValues[classNames.indexOf("jap2")] >= 65 || classValues[classNames.indexOf("jap3")] >= 65){
		language = "jap";
	}
	if(classValues[classNames.indexOf(language+"1")] >= 65 && classValues[classNames.indexOf(language+"2")] == 0){
		if(language="french"){
			qualifiedCourses.push("French 2");
		}else if(language="spanish"){
			qualifiedCourses.push("Spanish 2");
		}else if(language="italian"){
			qualifiedCourses.push("Italian 2");
		}else if(language="chinese"){
			qualifiedCourses.push("Chinese 2");
		}else if(language="latin"){
			qualifiedCourses.push("Latin 2");
		}else if(language="japanese"){
			qualifiedCourses.push("Japanese 2");
		}
	}
	if(classValues[classNames.indexOf(language+"2")] >= 65 && classValues[classNames.indexOf(language+"3")] == 0){
				if(language="french"){
			qualifiedCourses.push("French Regents");
		}else if(language="spanish"){
			qualifiedCourses.push("Spanish Regents");
		}else if(language="italian"){
			qualifiedCourses.push("Italian Regents");
		}else if(language="chinese"){
			qualifiedCourses.push("Chinese Regents");
		}else if(language="latin"){
			qualifiedCourses.push("Latin Regents");
		}else if(language="japanese"){
			qualifiedCourses.push("Japanese Regents");
		}
	}
	if(classValues[classNames.indexOf("chin3")] >= 94 && classValues[classNames.indexOf("apchin")] == 0){
		qualifiedCourses.push("AP Chinese")
	}
	if(classValues[classNames.indexOf("chin3")] >= 85 && classValues[classNames.indexOf("convochin")] == 0){
		qualifiedCourses.push("Chinese Conversation");
	}
	if(classValues[classNames.indexOf("fr3")] >= 90 && classValues[classNames.indexOf("apfr") == 0]){
		qualifiedCourses.push("AP French")
	}
	if(classValues[classNames.indexOf("fr3")] >= 85 && classValues[classNames.indexOf("convofr")] == 0){
		qualifiedCourses.push("French Conversation");
	}
	if(classValues[classNames.indexOf("it3")] >= 90 && classValues[classNames.indexOf("apit")] == 0){
		qualifiedCourses.push("AP Italian")
	}
	if(classValues[classNames.indexOf("it3")] >= 85 && classValues[classNames.indexOf("convoit")] == 0){
		qualifiedCourses.push("Italian Conversation");
	}
	if(classValues[classNames.indexOf("jap3")] >= 90 && classValues[classNames.indexOf("apjap")] == 0){
		qualifiedCourses.push("AP Japanese")
	}
	if(classValues[classNames.indexOf("jap3")] >= 85 && classValues[classNames.indexOf("convojap")] == 0){
		qualifiedCourses.push("Japanese Conversation");
	}
	if(classValues[classNames.indexOf("lat3")] >= 90 && classValues[classNames.indexOf("aplat")] == 0){
		qualifiedCourses.push("AP Latin")
	}
	if(classValues[classNames.indexOf("lat3")] >= 85 && classValues[classNames.indexOf("latreadings")] == 0){
		qualifiedCourses.push("Latin Readings");
	}
	if(classValues[classNames.indexOf("sp3")] >= 94){
		if(classValues[classNames.indexOf("apsplang")] == 0){
			qualifiedCourses.push("AP Spanish Language");
		}
		if(classValues[classNames.indexOf("apsplit")] == 0){
			qualifiedCourses.push("AP Spanish Literature");
		}
	}
	if(classValues[classNames.indexOf("sp3")] >= 85){
		if(classValues[classNames.indexOf("convosp")] == 0){
			qualifiedCourses.push("Spanish Conversation");
		}
		if(classValues[classNames.indexOf("spprof")] == 0){
			qualifiedCourses.push("Spanish Professions");
		}
	}
	if(classValues[classNames.indexOf("sp3")] >= 90 && classValues[classNames.indexOf("spfilm") == 0]){
		qualifiedCourses.push("Spanish Film/Narrative");
	}
	if(classValues[classNames.indexOf("sp2")] >= 95 && (classValues[classNames.indexOf("hsp3") == 0] && classValues[classNames.indexOf("sp3")] == 0)){
		qualifiedCourses.push("Honors Spanish");
	}
	
	//ENGLISH
	if((classValues[classNames.indexOf("eng9")] >= 93) && (classValues[classNames.indexOf("eng10")] == 0) && classValues[classNames.indexOf("speech")] == 0){ //mathintel
        qualifiedCourses.push("Honors Speech");
    }
    if((classValues[classNames.indexOf("eng10")] >= 90 || classValues[classNames.indexOf("speech")] >= 90) && (classValues[classNames.indexOf("eng11")] == 0 && classValues[classNames.indexOf("aplang")] == 0)){ //mathintel
        qualifiedCourses.push("AP English Language");
    }
    if((classValues[classNames.indexOf("eng10")] >= 65 || classValues[classNames.indexOf("speech")] >= 65) && (classValues[classNames.indexOf("eng11")] == 0 && classValues[classNames.indexOf("aplang")] == 0)){ //mathintel
        qualifiedCourses.push("American Literature");
    }
    if((classValues[classNames.indexOf("eng11")] >= 65 || classValues[classNames.indexOf("aplang")] >= 65) && (classValues[classNames.indexOf("eng12")] == 0 && classValues[classNames.indexOf("aplit")] == 0)){ //mathintel
        qualifiedCourses.push("World Literature");
    }
    if((classValues[classNames.indexOf("eng11")] >= 90 || classValues[classNames.indexOf("aplang")] >= 90) && (classValues[classNames.indexOf("eng12")] == 0 && classValues[classNames.indexOf("aplit")] == 0)){ //mathintel
        qualifiedCourses.push("AP English Literature");
    }
	qualifiedCourses.push("English (Respecitive grade)");
	
	//OTHER
	if((classValues[classNames.indexOf("eng11")] >= 85 || classValues[classNames.indexOf("aplang")] >= 85) && (classValues[classNames.indexOf("eng12")] == 0 && classValues[classNames.indexOf("aplit")] == 0)){ //mathintel
        qualifiedCourses.push("Honors Creative Writing");
        }
    if(classValues[classNames.indexOf("jazzband")] == 0){
        qualifiedCourses.push("Jazz Band (with audition)");
        }
    if(classValues[classNames.indexOf("orch")] == 0){
        qualifiedCourses.push("Orchestra (with audition)");
        }
    if(classValues[classNames.indexOf("conband")] == 0){        
        qualifiedCourses.push("Concert Band (with audition)");
        }
    if(classValues[classNames.indexOf("intband")] == 0){
        qualifiedCourses.push("Intermediate Band (with audition)");
        }
    if(classValues[classNames.indexOf("chorus")] == 0){
        qualifiedCourses.push("Chorus (with audition)");
        }
    if(classValues[classNames.indexOf("apmusic")] == 0){
        qualifiedCourses.push("AP Music Theory (with test)");
        }
    if(classValues[classNames.indexOf("art")] == 0){
        qualifiedCourses.push("Studio Art");
        }
    if(classValues[classNames.indexOf("paint")] == 0){
        qualifiedCourses.push("Painting");
        }
    if(classValues[classNames.indexOf("3d")] == 0){
        qualifiedCourses.push("3D Design");
        }
    if(classValues[classNames.indexOf("photo")] == 0){
        qualifiedCourses.push("Photography");
        }
    if(classValues[classNames.indexOf("music")] == 0){
        qualifiedCourses.push("Introduction to Music");
        }
    if(classValues[classNames.indexOf("digmusiclab")] == 0){
        qualifiedCourses.push("Digital Music Lab");
        }
    if(classValues[classNames.indexOf("alteng")] == 0){
        qualifiedCourses.push("Alternative Energy");
        }
    if(classValues[classNames.indexOf("basact")] == 0){
        qualifiedCourses.push("Basic Acting");
        } 
     if(classValues[classNames.indexOf("adact")] == 0){
        qualifiedCourses.push("Advanced Acting");
        }
     if(classValues[classNames.indexOf("digeng")] == 0){
        qualifiedCourses.push("Digital Engineering");
        }
    if(classValues[classNames.indexOf("graphics")] == 0){
        qualifiedCourses.push("Computer Graphics");
        }
	if((classValues[classNames.indexOf("relit")] >= 88 && classValues[classNames.indexOf("eng9")] >= 92) && (classValues[classNames.indexOf("sophbiointel")] == 0 && classValues[classNames.indexOf("junbiointel")] == 0 && classValues[classNames.indexOf("senbiointel")] == 0)){ //mathintel
        qualifiedCourses.push("Sophomore Physical Science Research");
        }
        if(classValues[classNames.indexOf("sophbiointel")] >= 65 && classValues[classNames.indexOf("junbiointel")] == 0){
        qualifiedCourses.push("Junior Physical Science Research ");
        }
        if((classValues[classNames.indexOf("junbiointel")] >= 65 && classValues[classNames.indexOf("senbiointel")] == 0)){ //mathintel
        qualifiedCourses.push("Senior Physical Science Research");
        }
        if((classValues[classNames.indexOf("honorbio")] >= 92 || classValues[classNames.indexOf("bio")] >= 94) && (classValues[classNames.indexOf("geo")] >= 95|| classValues[classNames.indexOf("honorsgeo")] >= 95) && (classValues[classNames.indexOf("chem")] == 0 && classValues[classNames.indexOf("apchem")] == 0 && classValues[classNames.indexOf("honorschem")] && classValues[classNames.indexOf("chem")] == 0)){ //mathintel
        qualifiedCourses.push("AP Chem");
        }
         if((classValues[classNames.indexOf("bio")] >= 90 || classValues[classNames.indexOf("honorbio")] >= 88) && (classValues[classNames.indexOf("geo")] >= 92 || classValues[classNames.indexOf("honorsgeo")] >= 92) && (classValues[classNames.indexOf("chem")] == 0 && classValues[classNames.indexOf("apchem")] == 0 && classValues[classNames.indexOf("honorschem")] == 0 && classValues[classNames.indexOf("chem")] == 0)){  
            qualifiedCourses.push("Honors Regents Chemistry")
    for(i=0; i <qualifiedCourses.length; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(qualifiedCourses[i]));
        list.appendChild(li);
    }
}
        if (classValues[classNames.indexOf("chem")] == 0) { 
        qualifiedCourses.push("Regents Chemistry");
        }
        if (classValues[classNames.indexOf("physics")] == 0) { 
        qualifiedCourses.push("Regents Physics");
        }
        if((classValues[classNames.indexOf("alg2")] >= 90||classValues[classNames.indexOf("honalg2")] >= 90) && classValues[classNames.indexOf("physics")]== 0 && classValues[classNames.indexOf("app1")] == 0 && classValues[classNames.indexOf("app2")] == 0){
           qualifiedCourses.push("AP Physics 1");
}







	qualifiedCourses.push("(Computer Sciences, Greek and several Junior + Senior courses to be implements)")
	for(i=0; i <qualifiedCourses.length; i++){
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(qualifiedCourses[i]));
		list.appendChild(li);
	}
}
