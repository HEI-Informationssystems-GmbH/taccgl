// Built 2011301358
/*  
taccgl(TM)    version 0.62 
see http://www.taccgl.org for Examples, Tutorial, Documentation

H.E.I. Informationssysteme GmbH
Wimpfener Strasse 23
68259 Mannheim
Germany
http://www.taccgl.org
email: contact@taccgl.org
Sales Tax ID: DE185233091
HRB Mannheim 7273
Geschaeftssfuehrer: Dr. Helmut Emmelmann
Phone: +49 - 621 - 79 51 41
Fax:   +49 - 621 - 79 51 61

Copyright (c) 2020 H.E.I.Informationssysteme GmbH (https://www.taccgl.org) and suppliers

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

This is BETA Software and known to contain bugs. It is probably
not implemented completely and will probably not run on all
browsers and client computers. It will switch off itself on
certain client computers and browsers. In addition some client
computers might run animations slowly, animations may appear
choppy or jumpy, or even client computers might get overloaded or
even crash. */

"use strict"
var taccgl_epwarning=
/*    M E D I C A L     W A R N I N G   
      Note that taccgl allows you to add fast flashing and video game like animations to web pages. A small percentage of 
      the population may experience epileptic symptoms when exposed to such animations. You might want to, or you may even 
      be required to, add / show an epileptic warning message on your web site before showing such animations and you might 
      want to or you may even be required to avoid certain types of animations on your web site. Please protect yourself 
      when programming animations and protect the users of your web site and take the following warning message seriously:  
*/
"     EPILEPSY WARNING, READ BEFORE VIEWING THE FOLLOWING ANIMATIONS,                                                       "+
"     BEFORE USING A VIDEO GAME SYSTEM, BEFORE PROGRAMMING, WATCHING AND PUTTING ANIMATIONS ONLINE                          "+
"                                                                                                                           "+ 
"     MEDICAL RESEARCH INDICATES A SMALL PERCENTAGE OF THE POPULATION MAY EXPERIENCE EPILEPTIC SEIZURES OR SEIZURE-LIKE     "+
"     SYMPTOMS  EXPOSED TO CERTAIN STIMULI, INCLUDING, WITHOUT LIMITATION, LIGHT PATTERNS, FLASHING LIGHTS OR CERTAIN       "+
"     PATTERNS OF BACKGROUND ON A TELEVISION SCREEN, OR VIDEO MONITOR. EXPOSURE TO THESE STIMULI WHILE PLAYING VIDEO GAMES  "+
"     OR WATCHING ANIMATIONS MAY INDUCE AN EPILEPTIC SEIZURE OR SEIZURE LIKE SYMPTOMS IN THESE INDIVIDUALS. CERTAIN         "+
"     CONDITIONS MAY INDUCE EPILEPTIC SYMPTOMS EVEN IN PERSONS WHO HAVE NO PRIOR HISTORY OF SEIZURES OF EPILEPSY. IF YOU    "+
"     EXPERIENCE ANY OF THE FOLLOWING SYMPTOMS WHILE PLAYING A VIDEO GAME OR WATCH ANIMATIONS --- DIZZINESS, ALTERED VISION,"+
"     EYE OR MUSCLE TWITCHES, LOSS OF AWARENESS, DISORIENTATION, AND INVOLUNTARY MOVEMENT OR CONVULSIONS ---                "+
"     IMMEDIATELY DISCONTINUE USE AND CONSULT YOUR PHYSICAN BEFORE PLAY OR WATCHING ANIMATIONS.                             ";
 
// var taccgl_texCanWidth=1200; 
// var taccgl_texCanHeight=2048;
// var taccgl_texCanWidth=512;
// var taccgl_texCanHeight=512; 
var taccgl_3d, taccgl_2d,  taccgl_maxQ, taccgl_frontfacing, taccgl_advCompileTimeChrome, taccgl_advCompileTime,
   taccgl_failIfMajorPerformanceCaveat, taccgl_perVertex, taccgl_noSpecular, taccgl_qmix,  taccgl_singleTex, taccgl_mipmap,
   taccgl_immediateStop, taccgl_texCanWidth, taccgl_texCanHeight, taccgl_shadowFactor;
if (window.taccgl_3d!=false) taccgl_3d=true;            // normally true, false for testing 2D mode
if (window.taccgl_2d!=false) taccgl_2d=true;            // normally true, false for testing deactivation on non canvas browsers
if (!window.taccgl_maxQ)     taccgl_maxQ=5;             // normally 4, 3, 2 or 1 for testing these quality levels
if (window.taccgl_frontfacing!=false)  taccgl_frontfacing=true;   // if false does not even try to make a shader with frontfacing 
if (!window.taccgl_advCompileTimeChrome)  taccgl_advCompileTimeChrome=300;  // if compiling the fast shader takes longer, we do not even try compiling the advanced shader
if (!window.taccgl_advCompileTime)   taccgl_advCompileTime=600;  
if (!window.taccgl_failIfMajorPerformanceCaveat) taccgl_failIfMajorPerformanceCaveat=false;
if (!window.taccgl_perVertex) taccgl_perVertex=false;   // so shading per vertex (fast but lower quality) or by fragment
if (!window.taccgl_noSpecular) taccgl_noSpecular=false; // disables specular lighting 
if (window.taccgl_qmix!=false) taccgl_qmix=true;        // quick mix of textures, incorrect but fast and often looks ok
if (!window.taccgl_singleTex) taccgl_singleTex=false;   // just use one texture (fast for simple examples)
// var taccgl_immediateStop=-1;
// var taccgl_debug=true;     // taccgl_debug can be enabled here or after including the lib
if (!window.taccgl_debugButtons) var taccgl_debugButtons=false;
if (!window.taccgl_showShader)   var taccgl_showShader=false;
if (!window.taccgl_use_disjoint_timer_query!=false) var taccgl_use_disjoint_timer_query=true;
if (!window.taccgl_errAlert)   var taccgl_errAlert=false;
if (window.taccgl_drawerrcheck!=false)   var taccgl_drawerrcheck=true;   // perform gl error checking before rendering each frame
if (window.taccgl_setuperrcheck!=false)  var taccgl_setuperrcheck=true;  // perform gl error checking after setting up animation
if (!window.taccgl_tfr30) var taccgl_tfr30 = [0,30,30,30,30,30];
if (!window.taccgl_tfr60) var taccgl_tfr60 = [0,60,60,60,60,60];
if (!window.taccgl_tfr) var taccgl_tfr = taccgl_tfr30;

//  start compression here
if (!window.taccgl_errcheck)       var taccgl_errcheck=false;        // detailed webgl error checking during setup etc.
if (!window.taccgl_looperrcheck)   var taccgl_looperrcheck=false;    // detailed webgl error checking in rendering loop
if (!window.taccgl_adjusterrcheck) var taccgl_adjusterrcheck=taccgl_looperrcheck;    // detailed webgl error checking in adjustcanvas
if (!window.taccgl_debug)        var taccgl_debug= false; 
// taccgl_errcheck=true;  taccgl_looperrcheck=true;
var taccgl_debug_vertex=false; // taccgl_debug;

/* To compress this file you can basically use any javascript compressor, but should leave all the lines
   before the //  start compression here  comment untouched.
   
   As an additional code compression (which does not gain much) you can throw out the taccgl_errcheck, taccgl_looperrcheck,
   taccgl_adjusterrcheck, and taccgl_debug code : 
      delete all code parts starting from (taccgl_debug) until // taccgl_debug_end
      and you can delete all lines containing  taccgl_errcheck

   Here is a possible Linux gnu Makefile for compression:

obj/taccgl.js:	obj/taccgl.js-HEAD obj/taccgl.js-compressed-FOOT
	cat $^ > $@
	wc taccgl.js
	wc obj/taccgl.js

obj/taccgl.js-HEAD:	taccgl.js
	echo 1,/start compression here/-1p | ed taccgl.js > $@ 
obj/taccgl.js-FOOT:	taccgl.js
	echo /start compression here/,$$ p | ed taccgl.js > $@ 

obj/taccgl.js-FOOT1: obj/taccgl.js-FOOT
	echo "1,\$$g/taccgl_errcheck/d" > obj/x
	echo "1,\$$g/taccgl_looperrcheck/d" > obj/x
	echo "1,\$$g/taccgl_adjusterrcheck/d" > obj/x
	echo "1,\$$g/taccgl_debug_vertex/d" > obj/x
	echo "1,\$$g/^'\\/\\//d" >> obj/x
	echo "1,\$$s/^''+//" >> obj/x	
	echo "1,\$$s/ *\\/\\/.*.n'+/\\\\\\\\n'+/" >> obj/x	
	echo "1,\$$g/^'.n'+/d" >> obj/x
	echo "1,\$$p" >> obj/x
	cat obj/x | ed $^ > $@

obj/taccgl.js-FOOT2: obj/taccgl.js-FOOT1
	echo "1,\$$g/(taccgl_debug.*)/d\\" > obj/x
	echo ".,/taccgl_debug_end/d" >> obj/x
	echo "1,\$$p" >> obj/x
	cat obj/x | ed $^ > $@

obj/taccgl.js-compressed-FOOT:	obj/taccgl.js-FOOT2
	cat $^ | yui-compressor -v --type js  -o $@  
	wc taccgl.js
	wc $^
*/
if (taccgl_debug) {
    if (window.console) console.log("Executing Begin of taccgl");

    var taccgl_timestep = Array(100000), taccgl_timestepi= 0;
    var taccgl_debug_paint = false;      // test output when painting HTML elements on 2D canvas
    var taccgl_debug_drawloop = 30;   // test output during draw loop
    var taccgl_debug_old = false;        // old test output
    var taccgl_Qframe = false;            // put stylesheed frame around 3D canvas for debugging quality levels
} // taccgl_debug_end
function taccgl_onscroll(){
    if (taccgl_debug) {
	taccgl.clog (taccgl.perfnow().toFixed(1)+":::onscroll event "+document.body.scrollTop);
    } // taccgl_debug_end

    taccgl.detectScroll();
    taccgl.detectPr();
    if (taccgl.tpr < 2 && taccgl.pr>taccgl.tpr) {
	taccgl_onresize(); 
	if (taccgl.resizeTimer) return;  // if the onresize was a real resize, the real action is pending and a scroll not required
    }

    taccgl.parallaxAdjust();
    
//    test output useful when deactivating adjustcanvas 
//    taccgl_debug_drawloop = taccgl.draw_meaFrames + 30;
//    taccgl.dumpTiming();
//    return;
    taccgl.doHook(taccgl.onScroll,taccgl.o_sl,taccgl.o_st);

    if (taccgl.ddmode && taccgl.draw_running) taccgl.resizeBody(); 
    taccgl.draw_meaIgnore=3;
    if (taccgl.dddmode && taccgl.draw_running) {
        var lr = window.performance.now() - taccgl.meaA[ (taccgl.draw_meaFrames) % taccgl.meaAS ]; 
	var taccgl_forced_scroll_draw=false;
	if (taccgl_forced_scroll_draw) {
            taccgl.cancelDraw();
//        if (taccgl.resumeAfterScrollTimer) clearTimeout(taccgl.resumeAfterScrollTimer);
            if (taccgl_debug) {
    		taccgl.clog ("onscroll delay "+lr+" timer="+taccgl.resumeAfterScrollTimer+ " reqAnimFrameId="+this.reqAnimFrameId );
            } // taccgl_debug_end
            if (lr>60) { // do slow scroll variant, since we have dropped frames already
		if (taccgl.resumeAfterScrollTimer==null) 
		    taccgl.resumeAfterScrollTimer = setTimeout ( function(){ taccgl.resumeAfterScrollTimer=null; taccgl.pendingResizeBody=true; taccgl_draw3d();}, 90 );
            } else { // do fast scroll variant
  		taccgl.pendingResizeBody=true; taccgl_draw3d(); 
	    }
        } else { // !taccgl_forced_scroll_draw
            if (taccgl_debug) {
    		taccgl.clog ("onscroll delay "+lr+" timer="+taccgl.resumeAfterScrollTimer+ " reqAnimFrameId="+this.reqAnimFrameId );
            } // taccgl_debug_end
            if (lr>60) { // do slow scroll variant, since we have dropped frames already
		if (taccgl.resumeAfterScrollTimer==null) {
		    taccgl.cancelDraw();
		    taccgl.resumeAfterScrollTimer = setTimeout ( 
			function(){ /* taccgl.clog("continue loop"); */ taccgl.resumeAfterScrollTimer=null; taccgl.resizeBody(); taccgl_draw3d();}
			,150 );
		}
            } else { // do fast scroll variant
  		 taccgl.pendingResizeBody=true; 
	    }
	}
    }
    if (taccgl_debug) {
	taccgl.clog (taccgl.perfnow().toFixed(1)+":::end of onscroll event handler lr="+lr);
    } // taccgl_debug_end
}
function taccgl_onresize(){
    if (taccgl_debug) {
	taccgl.clog (taccgl.perfnow().toFixed(1)+":::onresize event " + window.devicePixelRatio + "," + window.outerWidth + "," + window.outerHeight +
		     "," + taccgl.winOuterWidth + "," +  taccgl.winOuterHeight  +
		     ", Inner " +  window.innerWidth +  "," + taccgl.winInnerWidth 
		    );
    } // taccgl_debug_end
//    return;
    if (// taccgl.winOuterWidth==window.outerWidth && taccgl.winOuterHeight==window.outerHeight &&
        taccgl.winInnerWidth==window.innerWidth && taccgl.winDpr==window.devicePixelRatio) {
	if (taccgl_debug) {
	    taccgl.tlog ("non-size-changing onresize ignored"); 
	} // taccgl_debug_end
	return;
    }
    taccgl.winOuterWidth=window.outerWidth; taccgl.winOuterHeight=window.outerHeight;
    taccgl.winInnerWidth=window.innerWidth; taccgl.winDpr=window.devicePixelRatio;
    

//    taccgl.resizeBody(); 
    if (taccgl.resizeTimer) clearTimeout(taccgl.resizeTimer);
    taccgl.resizeTimer=setTimeout(function(){taccgl.resizeTimer=null;taccgl.tonresize()},taccgl.resizeTime);
}
function taccgl_onmousemove(e){
   taccgl.mouseX = e.clientX; taccgl.mouseY = e.clientY;
   if (taccgl.controller&&taccgl.controller.bodyOnMouseMove) taccgl.controller.bodyOnMouseMove(e);
}
function taccgl_onmousewheel(e){
    if (!e) e=window.event;
    if (taccgl_debug) {
	taccgl.tlog ("mouse wheel event "+e.detail+", "+e.wheelDelta)
    } // taccgl_debug_end
    var cnt=20;
    var dir=1;
    if (taccgl.scrollTimer) taccgl.scrollSpeed+=2; else taccgl.scrollSpeed=25;
    clearTimeout(taccgl.scrollTimer);
    if (e.wheelDelta>0) dir=-1;
    function taccgl_doScroll()
    {
	var d=dir*taccgl.scrollSpeed;
	window.scrollBy(0,d);
	if (taccgl_debug) {
	    taccgl.tlog ("doscroll "+cnt+", "+d)
	} // taccgl_debug_end
	if (cnt<taccgl.scrollSpeed) taccgl.scrollSpeed=cnt-1;
	cnt--;
	if (cnt>0)
	    taccgl.scrollTimer=setTimeout (taccgl_doScroll,18);
	else
	    taccgl.scrollTimer=null;
    } 
    taccgl_doScroll();
    e.preventDefault();
    return false;
//    return true;
}
// if (taccgl_debug) {  // this line must stay commented out (so that js works) and must stay in so that the compressor removes it in the compressed version
    function taccgl_onDebugKeyPress(event)
    {
	if (!event) event=window.event;

	var r = taccgl.doFirstHook (taccgl.onDebugKeyPress,event);
	if (r!=taccgl.hookDeclined) return r;
	
	var c=event.charCode;
	var s=String.fromCharCode(c);
	taccgl.tlog("Taccgl on debug onkeypress "+c+" "+s);
	if (s=="m") {
	    taccgl.printGPUTimers();
	    taccgl.resetGPUTimers();
	    setTimeout (function(){	taccgl.printGPUTimers(); taccgl.resetGPUTimers();},5000);
	} else if (s=="1") {taccgl.quality=1; taccgl.adjustQuality();
			   } else if (s=="2") {taccgl.quality=2;taccgl.adjustQuality();
					      } else if (s=="3") {taccgl.quality=3;taccgl.adjustQuality();
								 } else if (s=="4") {taccgl.quality=4;taccgl.adjustQuality();
								                    } else if (s=="5") {taccgl.quality=5;taccgl.adjustQuality();
										    }
      	if (s=="s") { taccgl_onscroll();}
      	if (s=="r") { taccgl.winOuterWidth=0; taccgl_onresize();}
	if (s=="f") { taccgl.softFailQ=taccgl.hardFailQ=5; taccgl.softFailCnt=0;}
	if (s=="u") { taccgl.updateDraw()}
        if (s=="L") { taccgl.qualitylock=true}
	if (s=="?") {
	    console.log("taccgl debug key handler -- help\n"+
			"1234    switch to given quality level\n"+
			"L       lock quality (stay in lower quality level)\n"+
			"C       show texture atlas canvas (toggle 1st, 2nd, none)\n"+
			"D       show 3D canvas (toggle 50%opacity, 0% opacity, 100% opacity)\n"
		       );
	}
	if (s=="C") {
	    var tex=document.getElementById ("taccgl_textureCanvas");
	    var tex2=document.getElementById ("taccgl_textureCanvas2");
	    if (tex.style.display=="block") {
		tex.style.display="none"; tex2.style.display="block";
	    } else if (tex2.style.display=="block") {
		tex2.style.display="none";
	    } else {
		tex.style.display="block";
	    }
	}
	if (s=="D") {
	    var tex3d=document.getElementById ("taccgl_canvas3d");
	    if (tex3d.style.opacity=="1") {
		tex3d.style.opacity="0.5";
	    } else if (tex3d.style.opacity=="0.5") {
		tex3d.style.opacity="0";
	    } else {
		tex3d.style.opacity="1";
	    }
	}
	if (s=="b") {
	    if (taccgl.onDebugDraw) {
		taccgl.onDebugDraw = null;
	    } else {
		taccgl.debugStopTime = taccgl.perfnow() - taccgl.draw_startTime;
		taccgl.onDebugDraw = [
		    function (now) {
			// var now=taccgl.perfnow();
			taccgl.draw_startTime = now - taccgl.debugStopTime;
			// var d = now-(taccgl.currenttime*taccgl.draw_duration+taccgl.draw_startTime); 
			// taccgl.draw_startTime += d;
			// taccgl.draw_meaIgnore=3;
			return true;
		    }
		];
	    }
	}
	if (s=="n") {
	    taccgl.debugStopTime += 1/60*1000;
	    taccgl.tlog ("Next Frame, Time = "+ (taccgl.debugStopTime));
	}
	if (s=="v") {
	    taccgl.debugStopTime -= 1/60*1000;
	    taccgl.tlog ("Previous Frame, Time = "+ (taccgl.debugStopTime));
	}
	if (s=="V") {
	    taccgl.debugStopTime = 0;
	    taccgl.tlog ("Goto Start Of Animation, Time = "+ (taccgl.debugStopTime));
	}
	if (s=="N") {
	    taccgl.debugStopTime = 0;
	    taccgl.tlog ("Stop at begin of next Animation");
	    taccgl.onDebugDraw = [
		function (now) {
		    if (taccgl.draw_frames < 5) {
			taccgl.tlog ("Frame  = "+ (taccgl.draw_frames));
			if (taccgl.draw_meaFrames>=5) { /* Problem at 5-11, 12 works again */
			    var stophere=1;
			    // return false;
			}
		    }
		    return true;
		}
	    ];
	}

    }
// }  // taccgl_debug_end


function taccgl_create ()
{
    var i;
    taccgl=this;
    this.foreground_zIndex= 1000;
    this.background_zIndex= '-1';
    this.draw_running=false; this.busy=false; this.showWarning=false;
    this.timeScale = 1.0;

    this.endMode="hide"; this.endStyle = {transition : "opacity 0.25s, visibility 0.25s", opacity : "0", visibility:"hidden"};
    this.textureCanvasshanged = false;
    this.textureCanvasChanged2 = false;

    this.texcanvas = null;
    this.texc = null;
    this.vBgControl = false;
    this.ddmode=this.dddmode=false; this.compatmode=true;
    this.initialized=false; this.webglerror=false;

    this.shddmode = this.shdddmode=null;
    this.onTerm = null; this.onBeforeDraw3D=null; taccgl.onImmediateTerm=null; taccgl.onAdjustQuality=null;
    this.onDebugKeyPress=[];	    

    this.drawConsoleTime = false; // use console.time to measure timing of drawing loop
    this.drawConsoleTimeStamp = false; // use console.time to measure timing of drawing loop

    this.delno=1;
    this.qualityCnt = Array(6); for (i=0; i<6; i++) this.qualityCnt[i]=0;

    this.heightExtension=0;
    this.resizeTime=200;

    this.meaAS=256;
    this.meaA = Array (this.meaAS);
    this.meaAA = Array (this.meaAS);
    this.errcode=0;
    this.winOuterWidth=window.outerWidth; this.winOuterHeight=window.outerHeight;
    this.winInnerWidth=window.innerWidth; this.winDpr=window.devicePixelRatio;
    this.shadowEna=null;
    this.glerr=0; this.mouseX=this.mouseY=0;
    var ua=navigator.userAgent;
//    this.isOldiOS = ua.match(/iPhone.*OS [0-9]_/)!=null || ua.match(/iP.d.*OS [0-9]_/)!=null;
//    if (this.isOldiOS) this.clog('Old IOS detected');
    this.isOldiOS = false; // currently disabled, does not work for zoom out but avoiding zoom while not running animation seems sufficient

    this.curPaintJob = this.prevPaintJob = null;
    this.resumeAfterScrollTimer=null;
    this.pendingResizeBody=false;
    if (window.requestAnimationFrame) window.taccgl_requestAnimationFrame = requestAnimationFrame; else
	if (window.webkitRequestAnimationFrame)  window.taccgl_requestAnimationFrame = webkitRequestAnimationFrame; else
	    if (window.mozRequestAnimationFrame) window.taccgl_requestAnimationFrame =  mozRequestAnimationFrame; else
		if (window.msRequestAnimationFrame) window.taccgl_requestAnimationFrame =  msRequestAnimationFrame; else
		    if (window.oRequestAnimationFrame)  window.taccgl_requestAnimationFrame = oRequestAnimationFrame;
    if (window.cancelAnimationFrame) window.taccgl_cancelAnimationFrame = cancelAnimationFrame; else
	if (window.webkitCancelAnimationFrame)  window.taccgl_cancelAnimationFrame = webkitCancelAnimationFrame; else
	    if (window.mozCancelAnimationFrame) window.taccgl_cancelAnimationFrame =  mozCancelAnimationFrame; else
		if (window.msCancelAnimationFrame) window.taccgl_cancelAnimationFrame =  msCancelAnimationFrame; else
		    if (window.oCancelAnimationFrame)  window.taccgl_cancelAnimationFrame = oCancelAnimationFrame;


    this.clog = function (s){if (window.console) console.log(s); }
    this.tlog = function (s,c){if (window.console)
         if (c+""!="undefined") console.log(taccgl.perfnow().toFixed(1)+":  "+s,c);  else console.log(taccgl.perfnow().toFixed(1)+":  "+s) }

    this.glAlert = function (msg) {
        this.tlog("%c"+msg, "font-size:20px; color:red");
        if (taccgl_errAlert) alert(msg);
    } 
    this.glError = function (msg) {
        this.glAlert(msg); this.webglerror=true;
    } 

    this.defaultLighting = function () {
	this.lightAmbient=0.7;
	this.lightDiffuse=0.3;
	this.lightSpecular=0.3;
	this.lightShininess=256;
    }
    this.defaultLighting();

    this.defaultEye = function () {
	var se=this.stdEye;
        se.setDefault();
    }
//    this.defaultEye();

    this.setStdEye = function (e){
	this.stdEye = e;
	if (this.stdsc) {this.createShaders(); this.adjustQuality();}
    }
    taccglEye.prototype= new taccglEyePrototype();
    this.createEye = function (e) {return new taccglEye(e);}
    this.eyePositions=Array(0);
    this.setStdEye ( this.createEye() ); 

    this.defaultShadowZRange = function () {
	this.zBack = -4000;
	this.zFront = 2000;
    }
    this.defaultShadowZRange();

//    this.setLightPos = function (x,y,z) {
//	this.lightX=x; this.lightY=y; this.lightZ=z;
//	this.adjustShcvp();
//    }

    this.setShadowZRange = function (front, back){
	this.zBack=back; this.zFront=front;
	this.adjustShcvp();
    }

    this.detectFRLast = 0;
    this.detectFRCnt = 0;
    this.detectFRmin=10000;
    this.maxFR = 60;


    this.detectFR = function () {
	if (window.taccgl_requestAnimationFrame) {
	    taccgl.reqAnimFrameId= taccgl_requestAnimationFrame (taccgl.detectFRLoop); 
	}
    }
    this.detectFRLoop = function (t) {
        var d = (t - taccgl.detectFRLast);
        if (d<taccgl.detectFRmin) taccgl.detectFRmin=d;
	if (taccgl_debug) {
  	    taccgl.clog ("Maximal Framerate Detection = "+taccgl.detectFRCnt+"("+taccgl.detectFRmin+")");
	} // taccgl_debug_end 

	taccgl.detectFRLast = t;
	if (taccgl.detectFRCnt++<5) {
	    taccgl.reqAnimFrameId= taccgl_requestAnimationFrame (taccgl.detectFRLoop); 
	} else {
	    taccgl.detectFRFinish();
	}
    }
    this.detectFRFinish = function () {
	var fr = 1000/this.detectFRmin;
	if (fr>60) fr=60;
	if (fr<35) fr=30;
	this.detectFRCnt=10000;
	this.maxFR=fr;
        if (fr>=60) taccgl_tfr = taccgl_tfr60;
	if (taccgl_debug) {
	    taccgl.clog ("Maximal Framerate Detected = "+fr+"("+this.detectFRmin+")");
	} // taccgl_debug_end 
    }

    this.detectFR();

    this.detectScroll = this.autoDetectScroll = function () {
	var detect= document.getElementById ("taccgl_detect");
	var cr=detect.getClientRects();
	this.scrollTop = 100 - cr[0].top;
	this.scrollLeft = 100 - cr[0].left;
	if (taccgl_debug && false) {
	    taccgl.clog("taccgl.scrollLeft="+taccgl.scrollLeft+"  taccgl.scrollTop="+taccgl.scrollTop)
            var  ot=document.body.scrollTop || document.documentElement.scrollTop;
	    var  ol=document.body.scrollLeft || document.documentElement.scrollLeft;
	    taccgl.clog("document.body.scrollLeft="+document.body.scrollLeft+"  document.body.scrollTop="+document.body.scrollTop);
	    taccgl.clog("document.documentElement.scrollLeft="+document.documentElement.scrollLeft+"  document.documentElement.scrollTop="+document.documentElement.scrollTop);
	    taccgl.clog("detect.offsetLeft="+detect.offsetLeft+ " detect.offsetTop="+detect.offsetTop+
			" cr[0].left="+cr[0].left+ " cr[0].top="+cr[0].top + " cr[0].width="+cr[0].width + " cr[0].height="+cr[0].height +
			
			" (document.body.scrollLeft || document.documentElement.scrollLeft)="+
			(ol)+
		     " (document.body.scrollTop || document.documentElement.scrollTop)="+
			(ot) +
			
			" cr[0].left+(document.body.scrollLeft || document.documentElement.scrollLeft)="+ 
			(cr[0].left+ol)+
			" cr[0].top+(document.body.scrollTop || document.documentElement.scrollTop)="+
			(cr[0].top+ot) 
		       );
	} // taccgl_debug_end 
    }

    this.initDetectScroll = function () {
	if (this.scrollLeft) return;
        var detect= document.getElementById ("taccgl_detect"); if (detect) return;
	document.body.insertAdjacentHTML (
	    "afterbegin",
	    '<div id="taccgl_detect"  style="position:absolute; top:100px; left:100px; min-width:10px; min-height:10px; z-index:10000;"></div> ');

	if (taccgl_debug) {
	    var detect = document.getElementById ("taccgl_detect");
	    var  cr=detect.getClientRects();
	    var  ot=document.body.scrollTop || document.documentElement.scrollTop;
	    var  ol=document.body.scrollLeft || document.documentElement.scrollLeft;
	    taccgl.clog("detect.offsetLeft="+detect.offsetLeft+ " detect.offsetTop="+detect.offsetTop+
			" cr[0].left="+cr[0].left+ " cr[0].top="+cr[0].top + " cr[0].width="+cr[0].width + " cr[0].height="+cr[0].height +
			" cr[0].left+(document.body.scrollLeft || document.documentElement.scrollLeft)="+
			cr[0].left+ol+
			" cr[0].top+(document.body.scrollTop || document.documentElement.scrollTop)="+
			cr[0].top+ot
		       );


	    taccgl.clog("window.outerWidth="+window.outerWidth+ " window.devicePixelRatio="+window.devicePixelRatio+
			" window.innerWidth="+window.innerWidth+ " inner/outer="+(window.outerWidth/window.innerWidth)
			+ "  document.body.clientWidth="+ document.documentElement.clientWidth || document.body.clientWidth + "  document.body.offsetWidth="+ document.body.offsetWidth
			+ "  document.body.scrollWidth="+ document.body.scrollWidth + " window.screen.width="+window.screen.width
                        + " window.screen.height="+window.screen.height );
	} // taccgl_debug_end 
	taccgl.detectScroll();
    }


    this.detectPr = function () {
	if (window.devicePixelRatio) this.pr= window.devicePixelRatio; else this.pr=1;
	this.prevDpr=this.pr;
	
	var vp=window.visualViewport, f, wiw=window.innerWidth;
	if (taccgl_debug) {
 	    if (vp) {
		taccgl.clog("viewport.offsetTop="+vp.offsetTop+ " viewport.offsetLeft="+vp.offsetLeft+
                            " viewport.pageTop="+vp.pageTop+ " viewport.pageLeft="+vp.pageLeft+
			    " viewport.width="+vp.width+ " viewport.height="+vp.height+
			    " viewport.scale="+vp.scale);

                var col="red";
                if (Math.abs(vp.width-window.innerWidth) < 2 && Math.abs(vp.height-window.innerHeight) < 2)
                  col="green"
		taccgl.tlog("%cchecking viewport.width="+vp.width+
                            " window.width="+window.innerWidth+
			    "      checking viewport.height="+vp.height+
                            " window.innerHeight="+window.innerHeight , "color:"+col
                           );

		taccgl.clog("viewport.width*scale="+vp.width*vp.scale+
			    "      checking viewport.height*scale="+vp.height*vp.scale);
	    }
	} // taccgl_debug_end 
        if (vp)  wiw=vp.width;

        var ow= window.outerWidth;
        if (!ow) ow=window.screen.width;  // needed for mobile safari
	if ( wiw >  ow ) {
		// zoom out
		f= 10/Math.round ( 10*wiw / ow );
	} else {
		// zoom in
		f= Math.round ( 10*ow / wiw )/10;
	}

	if (vp && vp.scale) {
            var rpr;
	    this.pr *= vp.scale;
	    if (taccgl_debug) { 
		taccgl.clog( "Adapted dpr according to viewport.scale new-pr="+this.pr);
		taccgl.clog( "Compare to  vp.clientWidth / window.outerWidth = "+  ow / wiw + " rounded f="+f );
	    } // taccgl_debug_end 

            rpr = this.pr / f; 
//            if (rpr>2) {
//                this.pr*=2/rpr;
//		taccgl.clog( "Limited real device pixel ratio to 2 rpr="+rpr+"  adjusted new-pr="+this.pr);
//            }
	} else if ( typeof window.ontouchstart!="undefined") {
	    // this is a touch device, so we assume it does pinch zoom
	    // then we get an approximation of the zoom factor using  window.innerWidth / window.outerWidth
	    // and need to multipy by the physical dpr

            if (f>0 && f<1000) this.pr*=f;
            if (this.pr > 2*f) {
                // this.pr*=0.5;
                var prevpr=this.pr;
                this.pr=2*f;
		if (taccgl_debug) { 
		   taccgl.clog( "Reduced high rpr from pr="+prevpr+" to pr="+this.pr+" f="+f);
   	        } // taccgl_debug_end 
            }

	    if (taccgl_debug) { 
		taccgl.clog( "Adjust pr for mobile devices, wiw/wow="+window.innerWidth / ow  + " f="+f+" new-pr="+this.pr);
	    } // taccgl_debug_end 
//	    while (window.innerWidth * this.pr > 1536) {  // sanity check, make sure that the 3d canvas is smaller than 2k
//		this.pr *= 0.5; // alert ("sanity check");
//	    } 
	}
    }

    this.detectTpr = function () {
	this.detectPr();
	this.tpr=this.pr;
	if (this.tpr>2) this.tpr=2;
	if (this.tpr<1) this.tpr=1;

	if (this.dddmode) {
	    var m = this.g.getParameter (this.g.MAX_TEXTURE_SIZE);
            // m = 4096; // simulate a phone for testing
	    
	    var x = m / taccgl_texCanWidth;
	    if (this.tpr>x) this.tpr=x;
	    x = m / taccgl_texCanHeight;
	    if (this.tpr>x) this.tpr=x;
	}
    }

    if (taccgl_debug) {
	this.mqRead = function (v, unit, f, t, p, prefix){
	    if (!prefix) prefix=""; else prefix+="-";
	    var q=window.matchMedia, i;
	    for (i=0; i<p; i++){
		var m=(t+f) / 2;
	    if ( window.matchMedia("("+prefix+"max-"+v+": "+m+unit+")").matches) t=m; else f=m;
	    }
	    return t
	}
	
	this.mqReadAll = function (){
	    // retrieve data via media queries.
	    // currently the info is not needed (except to print out) so this is enclosed in taccgl_debug
	    this.mqResolution = this.mqRead ("resolution","dpi", 0, 1024, 20);
	    this.mqWidth      = this.mqRead ("width","px",0,32768, 20);
	    this.mqDeviceWidth= this.mqRead ("device-width","px",0,32768, 20);
	    this.mqDevicePixelRatio = this.mqRead ("device-pixel-ratio","",0,32768, 20, "-webkit");
	    taccgl.clog ( "this.mqResolution="+this.mqResolution+" this.mqWidth="+this.mqWidth+" this.mqDeviceWidth="+this.mqDeviceWidth+
			  " this.mqDevicePixelRatio="+this.mqDevicePixelRatio
			);
	} 
    } // taccgl_debug_end
	
    this.init1 = function () {
	// alert ('init1');
	this.softFailQ=this.hardFailQ=taccgl_maxQ+1; this.softFailCnt=0;
	if (taccgl_debug) {
	    this.mqReadAll();
	} // taccgl_debug_end
	
        var cv= document.getElementById ("taccgl_canvas3d");
	var initcreate=!cv;
        if (!cv){
	    this.initDetectScroll();
	    if (!window.taccgl_texCanWidth)  taccgl_texCanWidth = 1200;
	    if (!window.taccgl_texCanHeight) taccgl_texCanHeight= 1424;
	    if (!window.taccgl_mipmap) taccgl_mipmap=false;
	    if (!window.taccgl_immediateStop) taccgl_immediateStop=4;

//	    if ( taccgl_texCanWidth > document.body.clientWidth )
//		  taccgl_texCanWidth = document.body.clientWidth;

	    
	    if (document.body.insertAdjacentHTML) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<canvas id="taccgl_canvas3d" width="10" height="10" style="position:absolute; top:0px; left:0px; z-index:-1;display:none;visibility:visible " onmousemove="taccgl.canvasOnMouseMove(event)"></canvas>');
		cv= document.getElementById ("taccgl_canvas3d");

		if (taccgl_debug) {
		    if (taccgl_Qframe && cv) cv.style.border = " 1px solid blue";
		} // taccgl_debug_end

	        if (taccgl_debugButtons) {
		    document.body.insertAdjacentHTML (
			"afterbegin",
			'<div style="position:absolute; z-index:20000; top:0px">' +
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'black\')" title="Show Texture Canvas 1 Black">1B</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'cyan\')" title="Show Texture Canvas 1 Black">1C</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'white\')" title="Show Texture Canvas 1 Black">1W</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'\')" title="Show Texture Canvas 1 Black">1T</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(2,\'black\')" title="Show Texture Canvas 2 Black">2B</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(2,\'cyan\')" title="Show Texture Canvas 2 Black">2C</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(2,\'white\')" title="Show Texture Canvas 2 Black">2W</a>  '+
			'<a href="javascript:taccgl.HideTexCanvas(\'\')">Hide</a> ' +
			'<a href="javascript:taccgl.Bg3DCanvas(\'black\')" title="3D Canvas Background Black">B</a>  '+
			'<a href="javascript:taccgl.Bg3DCanvas(\'cyan\')" title="3D Canvas Background Cyan">C</a>  '+
			'<a href="javascript:taccgl.Bg3DCanvas(\'white\')" title="3D Canvas Background White">W</a>  '+
			'<a href="javascript:taccgl.Bg3DCanvas(\'\')" title="3D Canvas Background Transparent">T</a>  '+
			'<a href="javascript:taccgl.Display3DCanvas(\'\')" title="3D Canvas Show">S</a>  '+
			'<a href="javascript:taccgl.Display3DCanvas(\'none\')" title="3D Canvas Hide">H</a>  '+
			'<a href="javascript:taccgl.ZIndex3DCanvas(-10000)" title="3D Canvas Background">Bg</a>  '+
			'<a href="javascript:taccgl.ZIndex3DCanvas(0)" title="3D Canvas Middle">M</a>  '+
			'<a href="javascript:taccgl.ZIndex3DCanvas(1000)" title="3D Canvas Foreground">Fg</a>  '+
			'</div>'
		    );
		} // taccgl_debug_end
	    }
	}


        if (cv && cv.getContext){
 	    var g=null;
	    if (taccgl_3d)
		try {
		    var opt={ antialias:true, stencil:false, premultipliedAlpha:true, preserveDrawingBuffer:false, failIfMajorPerformanceCaveat:taccgl_failIfMajorPerformanceCaveat};
		    g = cv.getContext("webgl",opt);   
		    if (!g)  {this.errcode=1; g = cv.getContext("experimental-webgl",opt); }
                    if (!g)  {this.errcode=2; g = cv.getContext("webkit-3d",opt); }
		    if (!g)  {
			this.errcode=3; opt={ antialias:true, stencil:false, premultipliedAlpha:true, preserveDrawingBuffer:false, failIfMajorPerformanceCaveat:taccgl_failIfMajorPerformanceCaveat };
			g = cv.getContext("webgl",opt);   
		    }
		    if (!g)  {this.errcode=10; g = cv.getContext("experimental-webgl",opt); }
                    if (!g)  {this.errcode=11; g = cv.getContext("webkit-3d",opt); }
		    if (!g)  {
			this.errcode=12; opt={ stencil:false, premultipliedAlpha:true, preserveDrawingBuffer:false, failIfMajorPerformanceCaveat:taccgl_failIfMajorPerformanceCaveat };
			g = cv.getContext("webgl",opt);   
		    }
		    if (!g)  {this.errcode=13; g = cv.getContext("experimental-webgl",opt); }
                    if (!g)  {this.errcode=14; g = cv.getContext("webkit-3d",opt); }
		    if (!g)  {
			this.errcode=15; opt={ premultipliedAlpha:true, preserveDrawingBuffer:false, failIfMajorPerformanceCaveat:taccgl_failIfMajorPerformanceCaveat };
			g = cv.getContext("webgl",opt);   
		    }
		    if (!g)  {this.errcode=16; g = cv.getContext("experimental-webgl",opt); }
                    if (!g)  {this.errcode=17; g = cv.getContext("webkit-3d",opt); }
		    if (!g)  {
			this.errcode=18; opt={ preserveDrawingBuffer:false, failIfMajorPerformanceCaveat:taccgl_failIfMajorPerformanceCaveat };
			g = cv.getContext("webgl",opt);   
		    }
		    if (!g)  {this.errcode=50; g = cv.getContext("experimental-webgl",opt); }
                    if (!g)  {this.errcode=51; g = cv.getContext("webkit-3d",opt); }
		    if (!g)  {
			this.errcode=3; opt={ failIfMajorPerformanceCaveat:taccgl_failIfMajorPerformanceCaveat }; g = cv.getContext("webgl",opt);   
		    }
		    if (!g)  {this.errcode=5; g = cv.getContext("experimental-webgl",opt); }
                    if (!g)  {this.errcode=6; g = cv.getContext("webkit-3d",opt); }
		    if (!g)  this.errcode=7;
		} catch (e) {
		    g=null; this.errcode=8;
		} finally {}
            if (g&&taccgl_3d) {
		this.g = g; this.cv=cv;
		this.dddmode=true; this.ddmode=false; this.compatmode=false;
            } else { 
 		g = cv.getContext('2d');
		if (g&&taccgl_2d) {
		    this.g = g; this.cv=cv;
		    this.dddmode=false; this.ddmode=true; this.compatmode=false;
		} else 
		    this.dddmode=this.ddmode=false; this.compatmode=true;
            }
        } else this.errcode=9;
	if (initcreate) {
	    if (document.body.insertAdjacentHTML) {
		this.detectTpr();
		var wpr=Math.round(taccgl_texCanWidth*this.tpr), hpr=Math.round(taccgl_texCanHeight*this.tpr);
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<canvas id="taccgl_textureCanvas" width="'+wpr+'" height="'+hpr+
			'" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:silver;width:'+
			taccgl_texCanWidth+'px;height:'+taccgl_texCanHeight+
			'px" crossorigin onclick="taccgl.HideTexCanvas(1)"></canvas>'+
			'<canvas id="taccgl_textureCanvas2" width="'+wpr+'" height="'+hpr+
			'" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:silver;width:'+
			taccgl_texCanWidth+'px;height:'+taccgl_texCanHeight+
			'px" crossorigin onclick="taccgl.HideTexCanvas(2)"></canvas>'+
			// 		    '<canvas id="taccgl_textureCanvas2" width="'+taccgl_texCanWidth+'" height="'+taccgl_texCanHeight+'" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:black" crossorigin onclick="taccgl.HideTexCanvas(2)"></canvas>'+
			'<canvas id="taccgl_scratchCanvas" width=1 height=1 style="display:none;position:absolute;top:0px;left:0px;z-index:1000;background-color:cyan; width:3; height:3" ></canvas>'
		);
	        this.scratchcanvas = document.getElementById ("taccgl_scratchCanvas");
	        if (this.scratchcanvas) this.scratchc = this.scratchcanvas.getContext("2d");
		if (taccgl_debug) { 
		    taccgl.clog ("texCanCreate "+taccgl_texCanWidth+","+taccgl_texCanHeight);
		} // taccgl_debug_end 
		this.texTo(2); if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
		this.texTo(1); if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
		var ta = this.texAtlas = this.textureAtlas();
		ta.addBin (1,taccgl_texCanWidth, taccgl_texCanHeight); ta.addBin (2,taccgl_texCanWidth,taccgl_texCanHeight);  
		this.allocPaintErrorTexture();
	    }
        }
        this.dddCanvas = new this.createDDDCanvas(); 
        this.controller = new this.createForwardingController(); this.controller.attach();
	this.stdLight = this.lightSource();
	this.initialized=true;
//	this.showHideComments();
	this.quality=3;
        this.TM=this.m44I(); this.TM_1=this.m33I(); // this.TM[0]=2.0;
//	this.showShaders();
//	this.dddmode=false;
    };



    this.texCanInit = function() { taccgl_texCanWidth = 10; taccgl_texCanHeight= 10; this.initDetectScroll(); }
    this.bb = function(el) {
        this.autoDetectScroll();
	if (typeof (el)=="string") el=document.getElementById(el);
        if (!el) return null;
	var bcr = el.getBoundingClientRect(el);
	bcr = { y:bcr.top, x:bcr.left, b:bcr.bottom, r:bcr.right, h:bcr.height, w:bcr.width};
	bcr.y+= this.scrollTop; bcr.b+=this.scrollTop;
	bcr.x+=this.scrollLeft; bcr.r+=this.scrollLeft;
        return bcr;
    }
    this.texCanEl  = function (el,opt,ox,oy) {
//        this.autoDetectScroll();
	if (typeof (el)=="string") el=document.getElementById(el); 
	var cr=el.getClientRects();
	var i;
	for (i=0; i<cr.length; i++) {
	    var x = cr[i].left, y = cr[i].top, w = cr[i].width, h = cr[i].height;
	    if (ox) x+=ox;
	    if (oy) y+=oy;
	    x+=this.scrollLeft; y+=this.scrollTop;
	    if (opt) {
		if (opt.match(/r/)) {
		    if (x+w+1>taccgl_texCanWidth) taccgl_texCanWidth=x+w+1;
		}
		if (opt.match(/b/)) {
		    if (y+h+1>taccgl_texCanHeight) taccgl_texCanHeight=y+h+1;
		}
		if (opt.match(/l/)) {
		    if (x+1>taccgl_texCanWidth) taccgl_texCanWidth=x+1;
		};
		if (opt.match(/t/)) {
		    if (y+1>taccgl_texCanHeight) taccgl_texCanHeight=y+1;
		}
	    } else {
		if (x+w+1>taccgl_texCanWidth) taccgl_texCanWidth=x+w+1;
		if (y+h+1>taccgl_texCanHeight) taccgl_texCanHeight=y+h+1;
	    }
	    if (taccgl_debug) { 
		console.log ("texCanEl "+el.id+" "+x+","+y+","+w+","+h+"\t"+taccgl_texCanWidth+","+taccgl_texCanHeight);
	    } // taccgl_debug_end 
	}
	taccgl_texCanWidth = Math.round( taccgl_texCanWidth+0.49999);
	taccgl_texCanHeight = Math.round(taccgl_texCanHeight+0.49999);
	
    }

    this.perfnow = function () {
	if (window.performance && window.performance.now) {
//	    var o=window.performance;
//	    var t=window.performance.now();
	    return window.performance.now();
	}
	else {
	    return new Date().getTime();
	}
    }

    this.epWarningText = function () {
        return 	"<form action=\"javascript:void()\"><h2>"+taccgl_epwarning.replace(/ONLINE/, "ONLINE</h2>")+
          "<p><ul> <li> <button name=\"Disable\" type=\"button\" onclick=\"taccgl.epDisable()\">Disable</button>Animations on this page "+
        "<li> <button name=\"Acknowlege Warning\" type=\"button\" onclick=\"taccgl.epEnable()\"/>Acknowledge Warning</button> and enable animation on your own risk </ul>"+
            "</form>" ;
    }
    this.epWarningStyle = function  () {
	if (window.screen && window.screen.width && window.screen.width<800)
            return "position:fixed; top:0px; left:0px; z-index:10000;display:none;background-color:white; font-size:12px;"+
               "padding:20px; border: ridge 3px silver; width:"+ (window.screen.width-60)+"px";
	else
            return "position:fixed; width:700px; top:20px; left:20px; z-index:10000;display:none;background-color:white; font-size:16px;"+
            "padding:20px; border: ridge 3px silver";
    }

    this.epWarning = function () {
	if (document.body.insertAdjacentHTML) {
	    var w=document.getElementById("taccgl_epwarning");
	    if (!w) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<div id="taccgl_epwarning" style="'+this.epWarningStyle()+'">'+this.epWarningText()+'</div>'
		);
	    }
	}
    }
    this.disabledWarningStyle=function  () {
        return "position:fixed; width:120px; font-size:12px; top:0px; left:0px; z-index:10000;display:none;background-color:white;"+
               "padding:2px; border-right: ridge 1px silver; border-bottom: ridge 1px silver; vertical-align:middle;";
    }
    this.disabledWarningText = function () {
	var x = "Animations&nbsp;<a href=\"javascript:taccgl.epUnset();\" title=\"click to enable\">disabled</a>"; 
            // <button name=\"taccgl_AnimationsDisabled\" type=\"button\" onclick=\"taccgl.epUnset()\">Enable</button> ";
	return x;
    }

    this.disabledWarning = function () {
	if (document.body.insertAdjacentHTML) {
	    var w=document.getElementById("taccgl_disabledWarning");
	    if (!w) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<div id="taccgl_disabledWarning" style="'+this.disabledWarningStyle()+'">'+this.disabledWarningText()+'</div>'
		);
	    }
	}
    }

    this.showEpWarning = function () {
	var w=document.getElementById("taccgl_epwarning");
	w.style.display=''; this.busy=true; this.showWarning=true;
    }
    this.showDisabledWarning = function () {
	this.disabledWarning();
	var w=document.getElementById("taccgl_disabledWarning");
	w.style.display=''; this.busy=false;
    }
	
    this.epcheck = function () {
	if (this.epack) return true;
	if (this.epack==false)  {  this.showDisabledWarning(); return false;}
        this.epWarning ();
	this.cancelDraw();
        this.showEpWarning();
	return "wait";
    }
    this.hideEpWarning = function () {
	var w=document.getElementById("taccgl_epwarning");
	w.style.display='none'; this.showWarning=false;
    }
    this.hidedisabledWarning = function () {
	var w=document.getElementById("taccgl_disabledWarning");
	w.style.display='none';
    }

    this.epEnable = function() {
	this.epack=true; this.hideEpWarning(); 
	if (this.draw_running) { this.continueDraw(); this.beginIgnoreDrop();  this.endIgnoreDrop(true); }
	this.start();
    }
    this.epDisable = function() {
	this.showDisabledWarning();
	this.epack=false; this.hideEpWarning(); this.start();
    }
    this.epUnset = function (){
	this.epack=null;
	this.hidedisabledWarning();
    }
    this.canvasOnMouseMove = function (e) {
	if (!e) e=window.event;
	this.mouseX = e.clientX; this.mouseY = e.clientY;
    }
    
    this.ddFallBack = function () {
	if (this.dddmode || this.ddmode) return;
//	if (this.ddmode) return;
        var cv= document.getElementById ("taccgl_canvas3d");
        if (!cv) return;
	if (!cv.getContext) return;
	if (this.webglerror) {
	    document.body.removeChild(cv);
	    if (document.body.insertAdjacentHTML)
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<canvas id="taccgl_canvas3d" width="10" height="10" style="position:absolute; top:0px; left:0px; z-index:-1"></canvas>');
	    cv= document.getElementById ("taccgl_canvas3d");
            this.controller.attach();
	}
	var g = cv.getContext('2d');
	if (g && taccgl_2d) {
	    this.g = g; this.cv=cv;
	    this.dddmode=false; this.ddmode=true; this.compatmode=false;
	    this.resizeBody();
	} else {
	    this.dddmode=this.ddmode=false; this.compatmode=true;
	}
	
    }

    this.escapeRegExp= /[[\\\]+?*(){}|.^$]/g;

    this.addClass = function (el,cl) {
	var cn=el.className;
	var cle=cl.replace(this.escapeRegExp,'\$&');
        if (cn.match(new RegExp('\\b'+cle+'\\b'))) return;
	el.className=cn+' '+cl;
    }
    this.removeClass = function (el,cl) {
	var cle=cl.replace(this.escapeRegExp,'\$&');
	el.className = el.className. replace (new RegExp('\\b'+cle+'\\b'),'');
    }
    this.removeClassRe = function (el,cl) {
	el.className = el.className. replace (new RegExp('\\b<'+cl+'\\b'),'');
    }
    this.addClass (document.documentElement,'taccgl');


    this.showHideComments = function () {
	var e;

	if (this.ddmode==this.shddmode && this.dddmode==this.shdddmode) return;

	this.removeClassRe (document.documentElement,'(no-)?taccgl-.d');
	this.addClass (document.documentElement,(this.dddmode ? '' : 'no-') + 'taccgl-3d');
	this.addClass (document.documentElement,(this.ddmode ? '' : 'no-') + 'taccgl-2d');

	this.shddmode=this.ddmode; this.shdddmode=this.dddmode;

	if (e=document.getElementById("taccgl_CommentImage")) {
	    var errurl="", src, srcset;
	    if (this.errcode) {
		errurl+="&errcode="+this.errcode;
		if (this.g && this.g.getError) errurl+="&webglerr="+this.g.getError();
	    }
            if (this.glerr) errurl+="&glerr="+this.glerr;
            if (this.glmsg) errurl+="&msg="+this.glmsg.replace(/ /g,"+");

	    if (this.ddmode)   { src=taccgl_Com_ddmode; if (window.taccgl_Com_ddmode_set) srcset=taccgl_Com_ddmode_set}
	    if (this.dddmode)  { src=taccgl_Com_dddmode; if (window.taccgl_Com_dddmode_set) srcset=taccgl_Com_dddmode_set}
	    if (!(this.dddmode||this.ddmode))  { src=taccgl_Com_off; if (window.taccgl_Com_off_set) srcset=taccgl_Com_off_set}
	    if (errurl) {
		if (!src.match(/\?/)) src+="?";
		src+=errurl;
                if (srcset)
                  srcset = srcset.replace(/([^ ?]+)([?])?([^ ]+)? +([^ ]+)/g,"$1?$3"+errurl+" $4");
	    }
	    e.src=src; if (srcset) e.srcset=srcset;
	}
        if  (document.getElementsByClassName) {
	    var s = document.getElementsByClassName("taccgl_cl_ddmode");
	    for (i=0; i<s.length; i++) {s[i].style.display= this.ddmode ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_dddmode");
	    for (i=0; i<s.length; i++) {s[i].style.display= this.dddmode ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_active");
	    for (i=0; i<s.length; i++) {s[i].style.display= (this.ddmode||this.dddmode) ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_inactive");
	    for (i=0; i<s.length; i++) {s[i].style.display= (!(this.ddmode||this.dddmode)) ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_can3derror");
	    for (i=0; i<s.length; i++) {s[i].style.display= (this.can3derror) ? 'inherit' : 'none';}
	} else { 
//	    var el=document.getElementById ('taccglCommentStyle');
//	    if (!el) {
//		document.body.insertAdjacentHTML (
//		    "afterbegin",
//  	            "<style id='taccglCommentStyle'>.taccgl_cl_inactive {display:block; color:red}</style>"
//		);
//	    }
	    var i, all, el;
	    if (document.all) all=document.all; else all=document.getElementsByTagName("*");
	    for (i=0; i<all.length; i++) {
		el=all[i];
		if (el.className) {
		    if (el.className.match(/taccgl_cl_inactive/)) {
			el.style.display= 'block';
		    }
		}
	    }
	}
    }

    this.tonresize = function () {
	this.doHook(this.onResize);
    }

    this.resizeBody = function () {
	this.adjustQuality(); 
	return;
    }
    this.adjustEye = function (x,y,z) {
	this.stdEye.setPos(x,y,z);
    }

    this.parallaxEye = function (fx,fy,x,y,z) {
	this.stdEye.parallax (fx,fy,x,y,z);
    }

    this.parallaxAdjust = function () {
	var b=document.body, de=document.documentElement;
	var st = b.scrollTop;
	if (de.scrollTop) st=de.scrollTop;
	if (window.pageYOffset) st=window.pageYOffset;
	var sl = b.scrollLeft;
	if (de.scrollLeft) st=de.scrollLeft;
	if (window.pageXOffset) sl=window.pageXOffset;
/*      commented out smooth scroll experiment
	if (typeof this.o_sl == "undefined" ) 	this.o_sl=sl;
	if (typeof this.o_st == "undefined" ) 	this.o_st=st;
*/
	this.o_sl=sl; this.o_st=st;

	
	//    taccgl.stdLight.setPos (-200, -200+st*1.0, 5000); 
	//    taccgl.adjustEye (taccgl.eyeX, st, taccgl.eyeZ);
	
	// if (taccgl.plxfx || taccgl.plxfy) {
//	    taccgl.adjustEye (taccgl.plxx+taccgl.plxfx*sl, taccgl.plxy+st*taccgl.plxfy, taccgl.plxz); 	
//	}
	var i;
	for (i=0; i<this.eyePositions.length; i++){
	    var e=this.eyePositions[i];
	    if (e) e.parallaxAdjust();
	    
	}

	var l = taccgl.stdLight;
	if (l.plxfx && l.plxfy) {
	    l.setPosI (l.plxx+l.plxfx*sl, l.plxy+st*l.plxfy, l.plxz); 	
	}

	var i;
	for (i=0; i<taccgl.doParallax.length; i++) {
	    var t=taccgl.doParallax[i];
	    if (t.cssAdjustFun) t.cssAdjustFun();
	}
    }

    this.adjustCanvasRaw = function (x,y,w,h,pr) {
	if (!this.cv) return;
//	if (window.devicePixelRatio) this.pr= window.devicePixelRatio; else this.pr=1;
	if (this.dddmode) {
	    if (taccgl_adjusterrcheck) { if ((taccgl.glerr=this.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on begin of adjustCanvasRaw"); }
        }
	if (window.taccgl_maxCanHeight) { if (h>taccgl_maxCanHeight) h=taccgl_maxCanHeight;}
	if (window.taccgl_maxCanWidth) { if (w>taccgl_maxCanWidth) w=taccgl_maxCanWidth;}
	if (x==this.canvasX && y==this.canvasY && w==this.canvasW && h==this.canvasH && this.canvasPr==pr) return;
	var wpr=Math.round(w*pr), hpr=Math.round(h*pr);
//	w1pr=Math.round(w/pr), h1pr=Math.round(h/pr); 
	if (this.canvasW!=w || this.canvasH!=h ||  this.canvasPr!=pr) {
	    this.cv.width=wpr;  this.cv.style.width=w+"px";
	    this.cv.height=hpr; this.cv.style.height=h+"px";
	    if (taccgl_debug) {
		taccgl.clog ("Adjust Canvas Raw "+this.quality+" ratio="+this.pr + " realratio="+ pr + " style.width="+w+ " style.height="+h+
			     " width="+wpr+ " height="+hpr);
	    } // taccgl_debug_end
	}
	this.cv.style.top=y+"px";
	this.cv.style.left=x+"px"; 
	this.canvasX=x; this.canvasY=y; this.canvasW=w; this.canvasH=h; this.canvasPr=pr;
	if (this.dddmode) {
	    if (taccgl_adjusterrcheck) { if ((taccgl.glerr=this.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" before viewport"); }
            this.g.viewport (0,0,this.g.drawingBufferWidth,this.g.drawingBufferHeight);
  	    if (taccgl_adjusterrcheck) { if ((taccgl.glerr=this.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" after viewport "+w+","+h); }
	}
//	this.setCanvasDim (x,y,Math.round(w/this.pr),Math.round(h/this.pr));
//	this.setCanvasDim (x,y-h,w1pr,h1pr);
//	this.setCanvasDim (x,y-(h1pr-h),w1pr,h1pr); works with normal viewport
	this.setCanvasDim (x,y,w,h);
    }

    this.adjustCanvas = function (x,y,w,h,pr) {
	var b=document.body,  st = b.scrollTop, sl = b.scrollLeft, de=document.documentElement; 	
	if (de.scrollTop) st=de.scrollTop;
	if (de.scrollLeft) sl=de.scrollLeft;
	if (window.pageXOffset) sl=window.pageXOffset;
	if (window.pageYOffset) st=window.pageYOffset;

        var wiw=window.innerWidth, wih=window.innerHeight, vp=window.visualViewport;
        if (vp) { wiw=vp.width; wih=vp.height; sl=vp.pageLeft; st=vp.pageTop }
        if (this.isOldiOS) { // for older IOS devices use screen size instead of window size to avoid changing canvas size
           wiw=window.screen.width; wih = window.screen.height;
        }
      
	if (x<sl) x=sl;
	if (y<st) y=st;

	var  x1=x+w, y1=y+h;
	if (x1> wiw+sl)  { x1 = wiw+sl;  x=x1-w;}
	if (y1> wih+st) { y1 = wih+st; y=y1-h;}
	if (x<sl) x=sl;
	if (y<st) y=st;

	this.adjustCanvasRaw (x,y,x1-x,y1-y,pr);
    }

    this.adjustLowQuality = function () {
        var hpr = this.pr/2;
        if (this.isOldiOS) hpr=this.pr;
	if (this.lqc_w) {
	    this.adjustCanvas (this.lqc_x, this.lqc_y, this.lqc_w, this.lqc_h,hpr);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="red";
	    } // taccgl_debug_end
	} else {
            var x=0, y=0, b=document.body;
//	    var w= document.body.clientWidth; var h= document.body.clientHeight;
	    
	    var st = b.scrollTop, sl = b.scrollLeft, de=document.documentElement;
	    if (de.scrollTop) st=de.scrollTop;
	    if (de.scrollLeft) sl=de.scrollLeft;
	    if (window.pageXOffset) sl=window.pageXOffset;
	    if (window.pageYOffset) st=window.pageYOffset;
            var wiw=window.innerWidth, wih=window.innerHeight, vp=window.visualViewport;
            if (vp) { wiw=vp.width; wih=vp.height; sl=vp.pageLeft; st=vp.pageTop }

	    var h= wih, w= wiw;
	    x=sl; y=st;

	    var mw=512, mh=512;
  	    if (wiw > mw) { x=sl+Math.floor((wiw-mw)/2); w=mw;}
  	    if (wih > mh) { y=st+Math.floor((wih-mh)/2); h=mh;}

	    // if (w>mw) { x=Math.floor((w-mw)/2); w=mw;}
	    // if (h>mh) { y=Math.floor((h-mh)/2); h=mh;}
	    this.adjustCanvas (x,y,w,h,hpr);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="pink";
	    } // taccgl_debug_end
	}
    }

    this.documentWidth = function (){
        var w = document.body.clientWidth, e = document.documentElement;
        if (e && e.clientWidth &&  e.clientWidth>w) w= e.clientWidth;
        return w;
    }
    this.documentHeight = function (){
        var h = document.body.clientHeight, e = document.documentElement;
        if (e && e.clientHeight &&  e.clientHeight>h) h= e.clientHeight;
        return h;
    }

    this.adjustNormalQuality = function (pr) {
	if (this.nqc_w) {
	    this.adjustCanvas (this.nqc_x, this.nqc_y, this.nqc_w, this.nqc_h,pr);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="blue";
	    } // taccgl_debug_end
	} else {
            var x=0, y=0, w= this.documentWidth(), h= this.documentHeight();
	    var mw=1024; // , mh=1024;
	    if (w>mw) { x=Math.floor((w-mw)/2); w=mw;}
	    // if (h>mh) { y=Math.floor((h-mh)/2); h=mh;}
	    this.adjustCanvas (x,y,w,h,pr);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="cyan";
	    } // taccgl_debug_end
	}
    }

    this.adjustHighQuality = function () {
	this.adjustCanvas (0, 0, this.documentWidth(), this.documentHeight()+this.heightExtension, this.pr);
	if (taccgl_debug) {
	    if (taccgl_Qframe && this.cv) this.cv.style.borderColor="green";
	} // taccgl_debug_end
    }

    this.adjustQuality = function () {
	if (this.quality>=taccgl.hardFailQ) {
	    if (taccgl_debug) {
	       taccgl.tlog ("************ Hard Fail Quality="+(taccgl.hardFailQ-1));
	    } // taccgl_debug_end
	    this.quality=taccgl.hardFailQ-1;
	}
	if (taccgl_debug) {
	    taccgl.tlog ("************ Adjust Quality="+this.quality+
			 " time="+this.currenttime+
			 " frames="+this.draw_frames + " framerate=" + 
			 this.draw_meaFrames * this.draw_duration / (this.perfnow()-this.draw_meaTime-this.draw_meaAdjust));
	    this.dumpTiming();
	} // taccgl_debug_end

	if (this.quality==1) this.adjustLowQuality();
	if (this.quality==2 && !this.isOldiOS) this.adjustNormalQuality(this.pr/2);
	if (this.quality==3 || (this.quality==2 && this.isOldiOS)) this.adjustNormalQuality(this.pr);
	if (this.quality==4) this.adjustNormalQuality(this.pr);
	if (this.quality==5) this.adjustHighQuality();
	if (taccgl.draw_running) {
            this.measureQuality();
	    if (taccgl_debug) { 
		taccgl.printGPUTimers(); // taccgl.resetGPUTimers();
	    } // taccgl_debug_end
        }
	this.doHook(taccgl.onAdjustQuality);
    }

    this.reduceQuality = function () {
        if (this.qualitylock) return;
	if (this.draw_meaFrames<60) {
	    // apparently this quality failed
	    if (this.quality<this.softFailQ) {this.softFailQ=this.quality; this.softFailCnt=0;}
	    if (this.softFailQ==this.quality) this.softFailCnt++;
	    if ( this.softFailCnt > 2 )  this.hardFailQ= this.softFailQ;
	}
	this.quality--; this.adjustQuality(); 
	this.draw_meaFrames=-3;this.draw_meaAdjust=0; this.draw_meaIgnore=0; taccgl.resetGPUTimers();
    }

    this.onDprChange = function () {
	var pr = this.pr;
	this.detectPr();
	if (pr!=this.pr) {
	    taccgl_onresize();
	    return true;
	} else
	    return false
    }
    

    this.LQCanvas = function(x,y,w,h) {this.lqc_x=x;this.lqc_y=y; this.lqc_w=w; this.lqc_h=h; if (this.quality==1) this.adjustQuality();}
    this.NQCanvas = function(x,y,w,h) {
	this.nqc_x=x;this.nqc_y=y; this.nqc_w=w; this.nqc_h=h; if (this.quality>=2 && this.quality<=4) this.adjustQuality();
    }

    this.beginIgnoreDrop = function () {
//	if (window.performance && window.performance.now) 
//	    this.startTimeIGD =  window.performance.now();
//	else
//	    this.startTimeIGD =  new Date().getTime();
	this.startTimeIGD=this.perfnow();
    }

    this.endIgnoreDrop = function (pause) {
	if (!this.startTimeIGD) return;
	var now=this.perfnow();
	if (taccgl_debug) {
	    var estimateDropped = (now-this.startTimeIGD)*this.draw_frames/this.currenttime/this.draw_duration;
	    taccgl.clog ("endIgnoreDrop  droptime = "+(now-this.startTimeIGD)+"  estimateDropped = "+estimateDropped + " Quality="+this.quality+ 
			 " time="+this.currenttime+
			 " frames="+this.draw_frames + " framerate=" + this.draw_frames / this.currenttime);
	} // taccgl_debug_end
	if (pause) {
	    var d = now-(this.currenttime*this.draw_duration+this.draw_startTime); 
	    this.draw_startTime += d;
	} else {
//	    this.draw_frames+=Math.floor(estimateDropped);
	}
//	this.draw_meaFrames=-3;this.draw_meaAdjust=0; this.draw_meaIgnore=0;
	this.draw_meaIgnore=3;
    }


    if (taccgl_debug){

    this.showGLParameters = function() {
	var a = [ 
"ACTIVE_TEXTURE",
"ALIASED_LINE_WIDTH_RANGE",
"ALIASED_POINT_SIZE_RANGE",
"ALPHA_BITS",
"ARRAY_BUFFER_BINDING",
"BLEND",
"BLEND_COLOR",
"BLEND_DST_ALPHA",
"BLEND_DST_RGB",
"BLEND_EQUATION_ALPHA",
"BLEND_EQUATION_RGB",
"BLEND_SRC_ALPHA",
"BLEND_SRC_RGB",
"BLUE_BITS",
"COLOR_CLEAR_VALUE",
"COLOR_WRITEMASK",
"COMPRESSED_TEXTURE_FORMATS",
"CULL_FACE",
"CULL_FACE_MODE",
"CURRENT_PROGRAM",
"DEPTH_BITS",
"DEPTH_CLEAR_VALUE",
"DEPTH_FUNC",
"DEPTH_RANGE",
"DEPTH_TEST",
"DEPTH_WRITEMASK",
"DITHER",
"ELEMENT_ARRAY_BUFFER_BINDING",
"FRAMEBUFFER_BINDING",
"FRONT_FACE",
"GENERATE_MIPMAP_HINT",
"GREEN_BITS",
"LINE_WIDTH",
"MAX_COMBINED_TEXTURE_IMAGE_UNITS",
"MAX_CUBE_MAP_TEXTURE_SIZE",
"MAX_FRAGMENT_UNIFORM_VECTORS",
"MAX_RENDERBUFFER_SIZE",
"MAX_TEXTURE_IMAGE_UNITS",
"MAX_TEXTURE_SIZE",
"MAX_VARYING_VECTORS",
"MAX_VERTEX_ATTRIBS",
"MAX_VERTEX_TEXTURE_IMAGE_UNITS",
"MAX_VERTEX_UNIFORM_VECTORS",
"MAX_VIEWPORT_DIMS",
"NUM_COMPRESSED_TEXTURE_FORMATS",
"PACK_ALIGNMENT",
"POLYGON_OFFSET_FACTOR",
"POLYGON_OFFSET_FILL",
"POLYGON_OFFSET_UNITS",
"RED_BITS",
"RENDERBUFFER_BINDING",
"RENDERER",
"SAMPLE_BUFFERS",
"SAMPLE_COVERAGE_INVERT",
"SAMPLE_COVERAGE_VALUE",
"SAMPLES",
"SCISSOR_BOX",
"SCISSOR_TEST",
"SHADING_LANGUAGE_VERSION",
"STENCIL_BACK_FAIL",
"STENCIL_BACK_FUNC",
"STENCIL_BACK_PASS_DEPTH_FAIL",
"STENCIL_BACK_PASS_DEPTH_PASS",
"STENCIL_BACK_REF",
"STENCIL_BACK_VALUE_MASK",
"STENCIL_BACK_WRITEMASK",
"STENCIL_BITS",
"STENCIL_CLEAR_VALUE",
"STENCIL_FAIL",
"STENCIL_FUNC",
"STENCIL_PASS_DEPTH_FAIL",
"STENCIL_PASS_DEPTH_PASS",
"STENCIL_REF",
"STENCIL_TEST",
"STENCIL_VALUE_MASK",
"STENCIL_WRITEMASK",
"SUBPIXEL_BITS",
"TEXTURE_BINDING_2D",
"TEXTURE_BINDING_CUBE_MAP",
"UNPACK_ALIGNMENT",
"UNPACK_COLORSPACE_CONVERSION_WEBGL",
"UNPACK_FLIP_Y_WEBGL",
"UNPACK_PREMULTIPLY_ALPHA_WEBGL",
"VENDOR",
"VERSION",
"VIEWPORT"];
	var s="", i, j;

        for (i=0; i<a.length; i++) {
	    var n=a[i], v=this.g.getParameter (this.g[n]);
	    s=s+n+"=";
	    if (v && v.length) {
		for (j=0; j<v.length; j++) s+=v[j]+" ";
	    } else 
		s=s+v+"\n";
            if (i%32==31) {this.clog(s); s="";}
	}
	this.clog (s);
    };

	this.frameRateF = function (f) {
	    if (f>this.draw_meaFrames) f=this.draw_meaFrames;
	    return (f * 1000 / (this.meaA[ (this.draw_meaFrames) % this.meaAS ] - 
				this.meaA[ (this.draw_meaFrames-f) % this.meaAS ] ));
	}

	this.dumpTiming = function() {
	    var s = "meaFrames = "+this.draw_meaFrames+ " draw_meaTime ";
	    if (this.draw_meaTime) {
		    s+=this.draw_meaTime.toFixed(1);
		    s+=" rate="+
			(this.draw_meaFrames/(this.perfnow()-this.draw_meaTime-this.draw_meaAdjust)*1000).toFixed(2)
		};
	    s += " softFailQ="+taccgl.softFailQ+" softFailCnt="+taccgl.softFailCnt+" hardFailQ="+taccgl.hardFailQ +
		" draw_meaIgnore="+this.draw_meaIgnore+" draw_meaAdjust=";
	    if (+this.draw_meaAdjust) s+= this.draw_meaAdjust.toFixed(2);
	    s+=
		" rate(120)="+this.frameRateF(120).toFixed(2)+
	    	" rate(60)="+this.frameRateF(60).toFixed(2)+
		" rate(10)="+this.frameRateF(10).toFixed(2)+
		" rate(5)="+this.frameRateF(5).toFixed(2)+
		" rate(2)="+this.frameRateF(2).toFixed(2);
	    console.log ("Timing "+s);
	    
	    s = ""; var sd="", sj="", saa='', saad='';
	    for (var i=0; i<=40; i++) {
		if (this.draw_meaFrames + i - 40 > 0 ) {
		    var j = (this.draw_meaFrames +taccgl.meaAS + i - 40 )  % this.meaAS; 
		    var k = (j - 1 + this.meaAS)  % this.meaAS; 
		    if (i>15) {
			s += taccgl.meaA[j].toFixed(0)+",";
			saa += taccgl.meaAA[j].toFixed(0)+",";
			sj += j+",";
		    }
		    sd += (taccgl.meaA[j]-taccgl.meaA[k]).toFixed(0)+",";
		    saad += (taccgl.meaAA[j]-taccgl.meaAA[k]).toFixed(0)+",";
		}
	    }
	    console.log (sj);
//	    console.log (s);
	    console.log (sd);
//	    console.log (saa);
	    console.log (saad);

	}


    } // taccgl_debug_end

    this.setHandlers = function () {
//	document.body.onscroll="alert(33); taccgl.resizeBody();"; this does not seem to work on some IE
//      must use windows.onscroll and must assign a function, not a string
        var vp=window.visualViewport;
        if (vp) {
           vp.addEventListener('scroll',taccgl_onscroll);
   	   window.onscroll=taccgl_onscroll;
        } else {
   	   window.onscroll=taccgl_onscroll;
        }
	window.onresize=taccgl_onresize;
//	window.onmousewheel=taccgl_onmousewheel;
	document.body.onresize=taccgl_onresize; 
	document.body.onmousemove=taccgl_onmousemove;
//	var n=navigator.platform;
//	if (n.match(/^win/i))
//	document.body.onmousewheel=taccgl_onmousewheel;
	window.addEventListener ("mousewheel", taccgl_onmousewheel, {passive:false});

	if (taccgl_debug && window.taccgl_onDebugKeyPress) {
	    document.body.onkeypress=window.taccgl_onDebugKeyPress;
	}  // taccgl_debug_end
    }

    this.init = function () {
	if (taccgl_debug) {
	    taccgl.tlog ("%ctaccgl Main Initialization started","color:red; font-size:20px");
	}  // taccgl_debug_end
	this.init1();
	this.setHandlers();
//	this.resizeBody ();
	this.createShaders();
	this.ddFallBack();
//	this.showGLParameters ();
	if (taccgl_debug) {
	    taccgl.tlog ("%ctaccgl Main Initialization finished" + (this.ddmode ? " 2D Mode detected" : "") + (this.dddmode ? " 3D Mode detected" : "")
			 + ( !(this.ddmode||this.dddmode) ? " neither 2D nor 3D Mode detected!":"") + ( " initial quality level " + taccgl.quality),
                         "color:red");
	}  // taccgl_debug_end
    };


    this.createVertexShader = function (t) {
//	console.time("createVertexShader");
	var g = this.g;
        if (!t.match(/\n/)){ 
	    var el = document.getElementById(t);
	    if (el) {
		t = el.innerText; 
		if (!t) t=el.text;
	    }
	} 
	var vs = g.createShader (g.VERTEX_SHADER);
	g.shaderSource (vs, t); 
	g.compileShader (vs);
	if (!g.getShaderParameter(vs, g.COMPILE_STATUS)) {
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog ("Vertex Shader Compilation failed ");

		taccgl.clog (this.g.getShaderInfoLog(vs));
		this.logNumberedText(t);
		taccgl.clog ("**** END");
	    }  // taccgl_debug_end
	}
//	console.timeEnd("createVertexShader");
	return vs;
    }

    this.logNumberedText = function (t) {
	var a = t.split("\n");
	var i = 0, r="";
	while (i<a.length) {
	    r +=  (i+1)+"\t"+a[i]+"\n";
	    i++;
	}
	taccgl.clog(r);
    }
    
    this.createFragmentShader = function (t) {
//	console.time("createFrgamentShader");
	if (!this.dddmode) return null;
        if (!t.match(/\n/)){ 
	    var el = document.getElementById(t);
	    if (el) {
		t = el.innerText; 
		if (!t) t=el.text;
	    }
	} 
	var fs = this.g.createShader (this.g.FRAGMENT_SHADER);
        this.g.shaderSource (fs,t);
	this.g.compileShader (fs); 
	if (!this.g.getShaderParameter(fs, this.g.COMPILE_STATUS)) {
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog ("Fragment Shader Compilation failed");
		taccgl.clog (this.g.getShaderInfoLog(fs));
		this.logNumberedText(t);
		taccgl.clog ("**** END");
	    }  // taccgl_debug_end
	}
//	console.timeEnd("createFrgamentShader");
	return fs;
    }

    this.bindProgramAttributes = function (p)
    {
	var g=this.g;
	g.bindAttribLocation (p, 0, "pos");
	g.bindAttribLocation (p, 1, "origin");
	g.bindAttribLocation (p, 2, "texpos");
	g.bindAttribLocation (p, 3, "rotP");
	g.bindAttribLocation (p, 4, "rotA");
	g.bindAttribLocation (p, 5, "color");
	g.bindAttribLocation (p, 6, "texmix");
	g.bindAttribLocation (p, 7, "accel");
	g.bindAttribLocation (p, 8, "normal");
    }

    this.createShaderProgram = function (vs, fs) {
//	console.time("createShaderProgram");
	var g = this.g,
	p = g.createProgram();
	g.attachShader(p, vs);
	g.attachShader(p, fs);
	this.bindProgramAttributes(p); g.linkProgram(p);
	// alert (g.isProgram(p));
	// alert (g.getProgramParameter(p, g.LINK_STATUS));
        if (!g.isProgram(p) || !g.getProgramParameter(p, g.LINK_STATUS)) {
	    console.timeEnd("createShaderProgram");
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog('Shader Program Linking failed:\n'+ g.getProgramInfoLog(p));
	    }  // taccgl_debug_end
	    g.detachShader(p,vs); g.detachShader(p,fs); g.deleteProgram(p);
	    return null;
	}
//	console.timeEnd("createShaderProgram");
	g.validateProgram(p);
        if (!g.isProgram(p) || !g.getProgramParameter(p, g.LINK_STATUS)|| !g.getProgramParameter(p, g.VALIDATE_STATUS)) {
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog('Shader Program Validation failed:\n'+g.getProgramInfoLog(p));
	    }  // taccgl_debug_end
	    g.detachShader(p,vs); g.detachShader(p,fs); g.deleteProgram(p);
	    return null;
	}
        if (taccgl_errcheck) { 	taccgl.glerr=this.g.getError(); if (taccgl.glerr!=0) taccgl.clog ("Error "+taccgl.glerr+" after linking shader"); }

	return p;
    }

    this.newShaderConfigPrototype = function ()
    {
	if (this.shaderConfigPrototype) return;
	var pt = this.shaderConfigPrototype = new taccglShaderConfigPrototype ();
	pt.initShader();
	taccglShaderConfigEmpty.prototype = pt;
    }

    this.createShaderConfig = function () {
	this.newShaderConfigPrototype ();
	return new taccglShaderConfigEmpty();
    }
//    this.createShaderConfig.prototype = new taccglShaderConfigPrototype();
    this.createStdShaderConfig = this.ssc = function (n) {
	if (!this.initialized) this.begin();
	this.newShaderConfigPrototype ();
	var sc = new taccglShaderConfigEmpty();
	if (n) {
	    sc.extendShader(n);
	} 
	return sc;
    }

    this.cvxmin = function (z) { return ((this.stdEye.eyeX-this.cvpx)*z+this.cvpx*this.stdEye.eyeZ) / this.stdEye.eyeZ; }
    this.cvxmax = function (z) { return -((this.cvpw-this.stdEye.eyeX+this.cvpx)*z-this.stdEye.eyeZ*this.cvpw-this.cvpx*this.stdEye.eyeZ)/this.stdEye.eyeZ; }
    this.cvymin = function (z) { return ((this.stdEye.eyeY-this.cvpy)*z+this.cvpy*this.stdEye.eyeZ) / this.stdEye.eyeZ; }
    this.cvymax = function (z) { return -((this.cvph-this.stdEye.eyeY+this.cvpy)*z-this.stdEye.eyeZ*this.cvph-this.cvpy*this.stdEye.eyeZ)/this.stdEye.eyeZ; }

    this.adjustShcvp = function (){
//	this.shcvpx=this.cvpx; this.shcvpy=this.cvpy; this.shcvpw=this.cvpw; this.shcvph=this.cvph;
//	taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);
//	return;


	var zfront=this.zFront, zback=this.zBack;
	var xmin= this.cvxmin(zfront),
  	    xmax= this.cvxmax(zfront);
	this.shcvpw = (this.stdLight.z*xmin-this.stdLight.z*xmax)/(zfront-this.stdLight.z);
	this.shcvpx = (this.stdLight.x*zfront-this.stdLight.z*xmin)/(zfront-this.stdLight.z);
//	taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);

	xmin= this.cvxmin(zback);
	xmax= this.cvxmax(zback);
	var cx = (this.stdLight.x*zback-this.stdLight.z*xmin)/(zback-this.stdLight.z);
	if (cx < this.shcvpx) {	this.shcvpw += this.shcvpx-cx; this.shcvpx=cx; }
	var cw =  (this.stdLight.z*xmin-this.stdLight.z*xmax)/(zback-this.stdLight.z);
	if (cx+cw >this.shcvpx+this.shcvpw) this.shcvpw = cx+cw-this.shcvpx; 

	var ymin= this.cvymin(zfront),
  	    ymax= this.cvymax(zfront);
	this.shcvph = (this.stdLight.z*ymin-this.stdLight.z*ymax)/(zfront-this.stdLight.z);
	this.shcvpy = (this.stdLight.y*zfront-this.stdLight.z*ymin)/(zfront-this.stdLight.z);
//	taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);

	ymin= this.cvymin(zback);
	ymax= this.cvymax(zback);
	var cy = (this.stdLight.y*zback-this.stdLight.z*ymin)/(zback-this.stdLight.z);
	if (cy < this.shcvpy) {	this.shcvph += this.shcvpy-cy; this.shcvpy=cy; }
	var ch =  (this.stdLight.z*ymin-this.stdLight.z*ymax)/(zback-this.stdLight.z);
	if (cy+ch >this.shcvpy+this.shcvph) this.shcvph = cy+ch-this.shcvpy; 

	if (taccgl_debug && false) {
	    taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);
	}  // taccgl_debug_end
    }

    this.setCanvasDim = function (cpx,cpy,w,h) {
	this.cvpx=cpx; this.cvpy=cpy; this.cvpw=w; this.cvph=h;
	if (taccgl_debug) {
	    taccgl.clog ("setCanvasDim "+cpx+", "+cpy+", "+w+", "+h+" pr="+this.pr);
	}  // taccgl_debug_end
	this.adjustShcvp();
    }
    this.createShaders = function (){
	if (this.stdsc) this.stdsc.freeCompiled(); else this.stdsc = this.createStdShaderConfig ("taccgl_Shaders");
	this.stdsc.compile();
	this.p = this.stdsc.p;
	if (!this.p) this.dddmode=false;
	if (this.stdsc.advProg) this.shadowEna=true; else this.shadowEna=false;
    }

    this.replaceShaderVariables = function (t) {
	t=t.replace(/\$\$EYEX/g,Math.floor(this.stdEye.eyeX)+".0");
	t=t.replace(/\$\$EYEY/g,Math.floor(this.stdEye.eyeY)+".0");
	t=t.replace(/\$\$EYEZ/g,Math.floor(this.stdEye.eyeZ)+".0");
	t=t.replace(/\$\$TEXTURECANVASWIDTH/g,taccgl_texCanWidth+".0");
	t=t.replace(/\$\$TEXTURECANVASHEIGHT/g,taccgl_texCanHeight+".0");
	return t;
    }

/*
    this.showShader = function (t){
//	var el = document.getElementById('vertexShaderScript');
//	var t = el.innerText; 

        if (taccgl_showShader) {
  	   t=t.replace(/\</g,"&lt;");
   	   t=t.replace(/\'/g,"\\\'");
	   t="t='"+t.replace(/\n/g,"\\n'+\n'")+"';"; 
           document.body.insertAdjacentHTML (
	       "afterbegin",
	       '<textarea cols="80" rows="5">'+t+'</textarea>'
	   )
        }
    }
*/



    this.setupTextures = function ()
    {
	if (!this.dddmode) return;
	var timestr;
	var g=taccgl.g;
	if (taccgl_debug) {
            var timestr = "Load Textures into GPU (setupTextures) ";
	    if (this.textureCanvasChanged==false) timestr += "TC1 unchanged ";
	    if (this.textureCanvasChanged2==false) timestr += "TC2 unchanged ";
	    if (console.time) console.time(timestr);
	} // taccgl_debug_end

	var e;
	var tcv= document.getElementById ("taccgl_textureCanvas"),
	tcv2= document.getElementById ("taccgl_textureCanvas2");
	//	    tcv3= document.getElementById ("taccgl_textureCanvas3");

//	var t = tcv3.getContext('2d');
//	t.drawImage (tcv,0,0);

	if (tcv.getContext){

  	  if (taccgl_errcheck) {  if ((taccgl.glerr=g.getError())!=0) {taccgl.glError ("Error "+taccgl.glerr+" before setupTextures"); return}}
//	  g.deleteTexture ( this.draw_texturecanvas);  this.draw_texturecanvas = null;
//	  g.deleteTexture ( this.draw_texturecanvas2);  this.draw_texturecanvas2 = null;

          if (!this.draw_texturecanvas) {
	      this.draw_texturecanvas = g.createTexture(); this.textureCanvasChanged=true; 
	  }
          if (!this.draw_texturecanvas2) { 
	      this.draw_texturecanvas2 = g.createTexture(); this.textureCanvasChanged2=true
	  }

//	  this.textureCanvasChanged=true; this.textureCanvasChanged2=true; 

	    if (taccgl_debug_old) { // (taccgl_debug) need this to delete during make
		taccgl.clog ("Setup Textures "+this.textureCanvasChanged+" "+this.textureCanvasChanged2);
	    } // taccgl_debug_end
	  if (this.textureCanvasChanged) {
	    var tex = this.draw_texturecanvas;
    	    g.activeTexture(g.TEXTURE0);
  	    if (taccgl_errcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" activeTexture0");}
 	    g.bindTexture   (g.TEXTURE_2D, tex);
	    var t = tcv.getContext("2d");
	    //    g.pixelStorei   (g.UNPACK_FLIP_Y_WEBGL, true);
	    //    g.pixelStorei   (g.UNPACK_COLORSPACE_CONVERSION_WEBGL, g.NONE);
	    g.pixelStorei   (g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  	    if (taccgl_errcheck){if ((taccgl.glerr=g.getError())!=0){taccgl.glError("Error "+taccgl.glerr+" before texImage2D texturecanvas 1");return}}
	    g.texImage2D    (g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, tcv);
  	    if (taccgl_errcheck){if ((taccgl.glerr=g.getError())!=0){taccgl.glError("Error "+taccgl.glerr+" on texImage2D texturecanvas 1");return}}

	    if (taccgl_mipmap) {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR_MIPMAP_NEAREST);
		g.generateMipmap(g.TEXTURE_2D);
 	        if (taccgl_errcheck) { if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on generateMipmap");}
	    } else {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
	    }
	    this.textureCanvasChanged=false;
	  }


	  if (this.textureCanvasChanged2) {
	    tex = this.draw_texturecanvas2;
  	    g.activeTexture(g.TEXTURE1);
  	    if (taccgl_errcheck) {     if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" activeTexture0");}
            g.bindTexture   (g.TEXTURE_2D, tex);
	    t = tcv2.getContext("2d");
	    //    g.pixelStorei   (g.UNPACK_FLIP_Y_WEBGL, true);
	    g.pixelStorei   (g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  	    if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" before texImage2D texturecanvas 2");}
	    g.texImage2D    (g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, tcv2);
  	    if (taccgl_errcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on texImage2D texturecanvas 2"); }
	    if (taccgl_mipmap) {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR_MIPMAP_NEAREST);
		g.generateMipmap(g.TEXTURE_2D);
	    } else {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
	    }
	    this.textureCanvasChanged2=false;
          }
	}
	this.draw_meaIgnore=3;
	if (taccgl_debug) {
	    if (console.timeEnd) console.timeEnd(timestr);
	} // taccgl_debug_end
    }
 
    this.cvert = function (r,g,b,o)
    {
    }

    this.nvertAcceleration = function (x,y,z)
    {
	this.vertAcceleration[4*this.vertI-4]=x;
	this.vertAcceleration[4*this.vertI-3]=y;
	this.vertAcceleration[4*this.vertI-2]=z;
    }

    this.nvertTexMove = function (s,t){
	this.vertTexPos[4*this.vertI-2]=s/ taccgl_texCanWidth;;
	this.vertTexPos[4*this.vertI-1]=t/ taccgl_texCanHeight;
    }
    this.nvertTexMove4 = function (s0,t0,s1,t1){
	this.vertTexPos[4*this.vertI-4]=s0/ taccgl_texCanWidth;
	this.vertTexPos[4*this.vertI-3]=t0/ taccgl_texCanHeight;
	this.vertTexPos[4*this.vertI-2]=s1/ taccgl_texCanWidth;
	this.vertTexPos[4*this.vertI-1]=t1/ taccgl_texCanHeight;
    }
    this.nvertRot = function (px,py,pz, ax,ay,az, from,to, acc)
    {
        if (!acc) acc=0;

        if (from != 0 && to==0 )
             var breakhere=55;

//        if (az<0) {var s=to; to=from; from=s;}
        if (az<0) {
	    to=-to; from=-from; ax=-ax; ay=-ay;
	}

//        if (ax*ax + ay*ay > 1)
//            breakhere=66;

	this.vertRotP[4*this.vertI-4]=px;
	this.vertRotP[4*this.vertI-3]=py;
	this.vertRotP[4*this.vertI-2]=pz;
	this.vertRotP[4*this.vertI-1]=from;
	this.vertRotA[4*this.vertI-4]=ax;
	this.vertRotA[4*this.vertI-3]=ay;
	this.vertRotA[4*this.vertI-2]=acc;
	this.vertRotA[4*this.vertI-1]=to;
    }
    this.nvertN1 = function (nx1,ny1,nz1)
    {
	var nx0=this.vertNormal[4*this.vertI-4],
 	    ny0=this.vertNormal[4*this.vertI-3],
	    nz0=this.vertNormal[4*this.vertI-2],
	    nl0 = Math.sqrt (nx0*nx0+ny0*ny0+nz0*nz0),
	    nl1 = Math.sqrt (nx1*nx1+ny1*ny1+nz1*nz1),
 	    ax = -ny0*nz1 + nz0*ny1,
	    ay = -nz0*nx1 + nx0*nz1, 
	    az = -nx0*ny1 + ny0*nx1,
	    al = Math.sqrt (ax*ax+ay*ay+az*az),
  	    w =  Math.PI*2-Math.acos(Math.max(-1,Math.min((nx0*nx1+ny0*ny1+nz0*nz1)/nl0/nl1,1))),
	    w0= Math.PI*2;
	if (Math.abs(w-w0)<0.0001) w=w0=0; else {
	    az*=1.0;
	}
	
	ax/=al; ay/=al; az/=al;
	this.vertRotP[4*this.vertI-4]=this.vertPos[4*this.vertI-4];
	this.vertRotP[4*this.vertI-3]=this.vertPos[4*this.vertI-3];
	this.vertRotP[4*this.vertI-2]=this.vertPos[4*this.vertI-2];
	this.vertRotP[4*this.vertI-1]=w0;
	this.vertRotA[4*this.vertI-4]=ax;
	this.vertRotA[4*this.vertI-3]=ay;
	this.vertRotA[4*this.vertI-2]=az;
	this.vertRotA[4*this.vertI-1]=w;
    }
    this.nvertTime = function (basetime,duration,flags) 
    {
	this.vertOrigin [4*this.vertI+3]=basetime;
	this.vertPos [4*this.vertI+3]=(flags & 65535) + (flags>>16)*0.25;
	this.vertAcceleration[4*this.vertI+3]=duration;
	this.vertI+=1;
    }
    this.nvertMove = function (x0,y0,z0,x,y,z,nx,ny,nz,spec,s,t,flags,basetime,duration) 
    {
//	taccgl.clog("nvertMove "+"("+x0+","+y0+","+z0+") -> "+"("+x+","+y+","+z+") N "+"("+nx+","+ny+","+nz+")");

	if (16*this.vertI >= this.vertBufferSize) this.ResizeVertexBuffers(2*this.vertBufferSize);
	this.vertOrigin [4*this.vertI]=x0;
	this.vertOrigin [4*this.vertI+1]=y0;
	this.vertOrigin [4*this.vertI+2]=z0;
	this.vertOrigin [4*this.vertI+3]=basetime;
	this.vertPos [4*this.vertI]=x;
	this.vertPos [4*this.vertI+1]=y;
	this.vertPos [4*this.vertI+2]=z;
	this.vertPos [4*this.vertI+3]=(flags & 65535) + (flags>>16)*0.25;
	this.vertTexPos [4*this.vertI]=s/ taccgl_texCanWidth;
	this.vertTexPos [4*this.vertI+1]=t/ taccgl_texCanHeight;
	this.vertTexPos [4*this.vertI+2]=s/ taccgl_texCanWidth;
	this.vertTexPos [4*this.vertI+3]=t/ taccgl_texCanHeight;
/*
        this.vertRotP[4*this.vertI+0]=55.55; // avoid uninitialized
        this.vertRotP[4*this.vertI+1]=55.55; // avoid uninitialized
        this.vertRotP[4*this.vertI+2]=55.55; // avoid uninitialized
	this.vertRotP[4*this.vertI+3]=55.55; // avoid uninitialized
        this.vertRotA[4*this.vertI+0]=55.55; // avoid uninitialized
        this.vertRotA[4*this.vertI+1]=55.55; // avoid uninitialized
        this.vertRotA[4*this.vertI+2]=55.55; // avoid uninitialized
*/
	this.vertRotA[4*this.vertI+3]=0.0;
	this.vertRotP[4*this.vertI+3]=0.0;
/*
        this.vertTexmix[4*this.vertI+0]=55.55; // avoid uninitialized
        this.vertTexmix[4*this.vertI+1]=55.55; // avoid uninitialized
        this.vertTexmix[4*this.vertI+2]=55.55; // avoid uninitialized
	this.vertTexmix[4*this.vertI+3]=55.55; // avoid uninitialized
*/
	this.vertAcceleration[4*this.vertI]=0.0;
	this.vertAcceleration[4*this.vertI+1]=0.0;
	this.vertAcceleration[4*this.vertI+2]=0.0;
	this.vertAcceleration[4*this.vertI+3]=duration;
        this.vertNormal[4*this.vertI+0]=nx;
        this.vertNormal[4*this.vertI+1]=ny;
        this.vertNormal[4*this.vertI+2]=nz;
	this.vertNormal[4*this.vertI+3]=spec;
	this.vertI+=1;
//        document.getElementById ("status") .insertAdjacentHTML (
//	    "beforeend",
//	    '<div>'+x0+','+	y0+','+z0+','+x+','+y+','+z+','+s+','+t+' :: '+basetime+','+duration+','+flags+'</div>');
    }
    this.nvertColor = function (c0s,c0t,c1s,c1t,m0,m1,mm0,mm1)
    {
	var i=4*this.vertI, vc=this.vertColor, tm=this.vertTexmix;
	vc [i-4]=c0s;	vc [i-3]=c0t;	vc [i-2]=c1s;	vc [i-1]=c1t;	tm [i-4]=m0;	tm [i-3]=mm0;	tm [i-2]=m1;	tm [i-1]=mm1;
    }
    this.nvertColor3 = function (c0s,c0t,c1s,c1t,m0,m1,mm0,mm1)
    {
	var i=4*this.vertI, vc=this.vertColor, tm=this.vertTexmix;
	vc [i-4]=c0s;	vc [i-3]=c0t;	vc [i-2]=c1s;	vc [i-1]=c1t;	tm [i-4]=m0;	tm [i-3]=mm0;	tm [i-2]=m1;	tm [i-1]=mm1;
	vc [i-8]=c0s;	vc [i-7]=c0t;	vc [i-6]=c1s;	vc [i-5]=c1t;	tm [i-8]=m0;	tm [i-7]=mm0;	tm [i-6]=m1;	tm [i-5]=mm1;
	vc [i-12]=c0s;	vc [i-11]=c0t;	vc [i-10]=c1s;	vc [i-9]=c1t;	tm [i-12]=m0;	tm [i-11]=mm0;	tm [i-10]=m1;	tm [i-9]=mm1;
    }
    this.nvertColor6 = function (c0s,c0t,c1s,c1t,m0,m1,mm0,mm1)
    {
	var i=4*this.vertI, vc=this.vertColor, tm=this.vertTexmix;
	vc [i-4]=c0s;	vc [i-3]=c0t;	vc [i-2]=c1s;	vc [i-1]=c1t;	tm [i-4]=m0;	tm [i-3]=mm0;	tm [i-2]=m1;	tm [i-1]=mm1;
	vc [i-8]=c0s;	vc [i-7]=c0t;	vc [i-6]=c1s;	vc [i-5]=c1t;	tm [i-8]=m0;	tm [i-7]=mm0;	tm [i-6]=m1;	tm [i-5]=mm1;
	vc [i-12]=c0s;	vc [i-11]=c0t;	vc [i-10]=c1s;	vc [i-9]=c1t;	tm [i-12]=m0;	tm [i-11]=mm0;	tm [i-10]=m1;	tm [i-9]=mm1;
	vc [i-16]=c0s;	vc [i-15]=c0t;	vc [i-14]=c1s;	vc [i-13]=c1t;	tm [i-16]=m0;	tm [i-15]=mm0;	tm [i-14]=m1;	tm [i-13]=mm1;
	vc [i-20]=c0s;	vc [i-19]=c0t;	vc [i-18]=c1s;	vc [i-17]=c1t;	tm [i-20]=m0;	tm [i-19]=mm0;	tm [i-18]=m1;	tm [i-17]=mm1;
	vc [i-24]=c0s;	vc [i-23]=c0t;	vc [i-22]=c1s;	vc [i-21]=c1t;	tm [i-24]=m0;	tm [i-23]=mm0;	tm [i-22]=m1;	tm [i-21]=mm1;
    }

    this.nvertNormal = function (nx,ny,nz,spec)
    {
	this.vertNormal [4*this.vertI-4]=nx;
	this.vertNormal [4*this.vertI-3]=ny;
	this.vertNormal [4*this.vertI-2]=nz;
	this.vertNormal [4*this.vertI-1]=spec;
    }
    this.nvertNormal3 = function (nx,ny,nz)
    {
	this.vertNormal [4*this.vertI-4]=nx;
	this.vertNormal [4*this.vertI-3]=ny;
	this.vertNormal [4*this.vertI-2]=nz;
    }

    this.nvertOffset = function (i){
	this.vertI+=i;
    }

/*    this.nvert = function (x,y,z,s,t,flags,basetime,duration){
	this.vertOrigin [4*this.vertI]=0.0;
	this.vertOrigin [4*this.vertI+1]=y;
	this.vertOrigin [4*this.vertI+2]=z;
	this.vertOrigin [4*this.vertI+3]=basetime;
	this.vertPos [4*this.vertI]=x;
	this.vertPos [4*this.vertI+1]=y;
	this.vertPos [4*this.vertI+2]=z;
	this.vertPos [4*this.vertI+3]=flags;
	this.vertTexPos [4*this.vertI]=s;
	this.vertTexPos [4*this.vertI+1]=t;
	this.vertTexPos [4*this.vertI+2]=s;
	this.vertTexPos [4*this.vertI+3]=t;
	this.vertRotA[4*this.vertI+3]=0.0;
	this.vertRotA[4*this.vertI+0]=0.0;
	this.vertRotA[4*this.vertI+1]=0.0;
	this.vertRotA[4*this.vertI+2]=0.0;
	this.vertAcceleration[4*this.vertI]=0.0;
	this.vertAcceleration[4*this.vertI+1]=0.0;
	this.vertAcceleration[4*this.vertI+2]=0.0;
	this.vertAcceleration[4*this.vertI+3]=duration;
	this.vertI+=1;
    }
*/

    this.AllocateVertexBuffers = function (size) {
	size = Math.ceil(size/16)*16;
	var vertPosBuffer = new ArrayBuffer(size);
	this.vertPos = new Float32Array (vertPosBuffer);
	var vertOriginBuffer = new ArrayBuffer(size);
	this.vertOrigin = new Float32Array (vertOriginBuffer);
	var vertTexPosBuffer = new ArrayBuffer(size);
	this.vertTexPos = new Float32Array (vertTexPosBuffer);
	var vertRotPBuffer = new ArrayBuffer(size);
	this.vertRotP = new Float32Array (vertRotPBuffer);
	var vertRotABuffer = new ArrayBuffer(size);
	this.vertRotA = new Float32Array (vertRotABuffer);
	var vertcolorBuffer = new ArrayBuffer(size);
	this.vertColor = new Float32Array (vertcolorBuffer);
	var verttexmixBuffer = new ArrayBuffer(size);
	this.vertTexmix = new Float32Array (verttexmixBuffer);
	var vertAccelerationBuffer = new ArrayBuffer(size);
	this.vertAcceleration = new Float32Array (vertAccelerationBuffer);
	var vertnormalBuffer = new ArrayBuffer(size);
	this.vertNormal = new Float32Array (vertnormalBuffer);
	this.vertBufferSize=size;
    }

    this.ResizeVertexBuffers = function (size) {
	var vertPos = this.vertPos;
	var vertOrigin = this.vertOrigin;
	var vertTexPos = this.vertTexPos;
	var vertRotP = 	this.vertRotP;
	var vertRotA = 	this.vertRotA;
	var vertColor=	this.vertColor; 
	var vertTexmix = this.vertTexmix;
	var vertAcceleration = this.vertAcceleration;
	var vertNormal = this.vertNormal;
	this.AllocateVertexBuffers (size);
	var cs = size; if (this.vertBufferSize < cs) cs=this.vertBufferSize;
	this.vertPos.set(vertPos);
	this.vertOrigin.set(vertOrigin);
	this.vertTexPos.set(vertTexPos);
	this.vertRotP.set(vertRotP);
	this.vertRotA.set(vertRotA);
	this.vertColor.set(vertColor);
	this.vertTexmix.set(vertTexmix);
	this.vertAcceleration.set(vertAcceleration);
	this.vertNormal.set(vertNormal);
/*
	for (i=0;i<cs;i++) {
//	    this.vertPos[i]=vertPos[i];
	    this.vertOrigin[i]=vertOrigin[i];
	    this.vertTexPos[i]=vertTexPos[i];
	    this.vertRotP[i]=vertRotP[i];
	    this.vertRotA[i]=vertRotA[i];
	    this.vertColor[i]=vertColor[i];
	    this.vertTexmix[i]=vertTexmix[i];
	    this.vertAcceleration[i]=vertAcceleration[i];
	    this.vertNormal[i]=vertNormal[i];
	}
*/
	if (taccgl_debug) {
	    taccgl.tlog ("Resized Vertex Buffers to "+size+" bytes  "+size/16+" vertices");
	} // taccgl_debug_end
	this.vertBufferSize=size;
//	if (this.draw_running) this.bindDraw(this.g,this.p);
    }

    if (taccgl_debug) {
	this.dumpVertexTransition = function (t) {
	    console.log ("Transition ",t.el.tagName,"#",t.el.id,t.el);
	    taccgl.dumpVertexBuffer (t.vertindex, t.vertEndIndex-t.vertindex+1);
	}
	this.drf = function (f){
	    return (Math.round(f*1000)/1000);
        }
	this.drfv = function (x,y,z,w) {
	    return ( "("+taccgl.drf(x)+","+taccgl.drf(y)+","+taccgl.drf(z)+","+taccgl.drf(w)+")");
	}
	this.drfvert = function (b,i) {
	    return (taccgl.drfv(b[4*i],b[4*i+1],b[4*i+2],b[4*i+3])); 
	}
	this.drfv3 = function (x,y,z) {
	    return ( "("+taccgl.drf(x)+","+taccgl.drf(y)+","+taccgl.drf(z)+")");
	}
	this.drfvert3 = function (b,i) {
	    return (taccgl.drfv3(b[4*i],b[4*i+1],b[4*i+2])); 
	}
	this.dumpVertexBuffer = function (f,l) {
            for (i=f; i<f+l; i++) {
//		console.log( "(", this.vertOrigin[4*i], ",", this.vertOrigin[4*i+1], ",", this.vertOrigin[4*i+2], ",", this.vertOrigin[4*i+3], ")")
		console.log (this.vertOrigin[4*i+3]+".."+this.vertAcceleration[4*i+3]+"["+this.vertPos[4*i+3]+"]",
							  taccgl.drfvert3(this.vertOrigin,i)+"->"+taccgl.drfvert3(this.vertPos,i),
			    "A"+taccgl.drfvert3(this.vertAcceleration,i), 
			    "N"+taccgl.drfvert(this.vertNormal,i),
			    "RP"+taccgl.drfvert(this.vertRotP,i),
			    "RA"+taccgl.drfvert(this.vertRotA,i)
			    );
	    }
	}
    } // taccgl_debug_end

    this.StartRender = function (){
	if (!this.initialized) this.init();
	this.delno ++;
        // var g=this.g; 
	if (this.dddmode) {
	    if (!this.vertPos) {
		var size;
		if (window.taccgl_vertexMem) size = taccgl_vertexMem; else size=10000;
		this.AllocateVertexBuffers (size);
	    }
	    this.vertI = 0; 
	    this.shprog=Array(0); this.shprogfrom=Array(0);
	    this.shprog.push(this.stdsc); this.shprogfrom.push(0);
	}
	if (this.ddmode) {
	    this. AA=Array(0); this.AAstartedLength=0;
	}
	this.duration = 0;
	this.foregroundCnt = 0;
	this.currenttime=0;
	this.doat=Array(0); this.showAfterAnimation = Array(0); this.doParallax = Array(0);
	this.renderingStarted = true;
	this.adjustQuality();
	this.lqc_w=null;
    }

    this.BgControl = function (b) {
	this.vBgControl = b;
    }
 
    this.setEndMode = function (m) {
	this.endMode=m;
    }
    this.setEndStyle = function (st) {
	if (st) this.endStyle=st; else this.endStyle = {transition : "opacity 0.25s, visibility 0.25s", opacity : "0", visibility:"hidden"}; 
    }

    this.begin = function () {
	if (!this.initialized) {this.init(); this.StartRender();}
    }

    this.adjustForeground = function () {
//	this.cv.style.visibility='hidden';
	if (this.foregroundCnt>0) {
	    this.cv.style.zIndex=this.foreground_zIndex; 
	    if (taccgl_debug) {
		taccgl.clog ("3D Canvas moved to foreground");
	    } // taccgl_debug_end
	} else {
	    this.cv.style.zIndex=this.background_zIndex;
	    if (taccgl_debug) {
		taccgl.clog ("3D Canvas moved to background");
	    } // taccgl_debug_end
	}
//	this.cv.style.visibility='visible';
    }

    this.incForeground = function () {
	this.foregroundCnt++;
	if (this.foregroundCnt==1) this.adjustForeground();
    }
    this.decForeground = function () {
	this.foregroundCnt--;
	if (this.foregroundCnt==0) this.adjustForeground();
	if (this.foregroundCnt==-1)
	    taccgl.glAlert ("decForeground called more often that incForeground");
    }

    this.bindDraw = function (g,p) {
if (taccgl_debug) {
    var ts="Load Vertex Buffers into GPU (bindDraw) "+this.vertI+" size="+ this.vertBufferSize;
	if (console.time) console.time(ts);
} // taccgl_debug_end
	if (taccgl_errcheck) {  if ((taccgl.glerr=g.getError())!=0) { taccgl.glError ("Error "+taccgl.glerr+" before clearColor"); return} }
	g.clearColor (0.0,0.0,0.0,0.0);
	if (taccgl_errcheck) {  if ((taccgl.glerr=g.getError())!=0) { taccgl.glError ("Error "+taccgl.glerr+" on clearColor"); return} }
//	g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
//	if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on clear"); 
	g.enable(g.DEPTH_TEST); g.depthFunc (g.LEQUAL); 
        g.blendFunc (g.ONE,g.ONE_MINUS_SRC_ALPHA); 
	g.enable(g.BLEND);
	if (taccgl_errcheck) {  if ((taccgl.glerr=g.getError())!=0) { taccgl.glError ("Error "+taccgl.glerr+" on enable"); return} }
	// this.draw_locTime = g.getUniformLocation(p,"uTime");
	// this.draw_locCvp = g.getUniformLocation(p,"cvp");
	this.draw_locpos = g.getAttribLocation (p, "pos");
	this.draw_locOrigin = g.getAttribLocation (p, "origin");
	this.draw_loctexpos = g.getAttribLocation (p, "texpos");
	this.draw_locrotp = g.getAttribLocation (p, "rotP");
	this.draw_locrota = g.getAttribLocation (p, "rotA");
	this.draw_loccolor = g.getAttribLocation (p, "color");
	this.draw_loctexmix = g.getAttribLocation (p, "texmix");
	this.draw_locnormal = g.getAttribLocation (p, "normal");
	this.draw_locacceleration = g.getAttribLocation (p, "accel");
	if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) { taccgl.glError ("Error "+taccgl.glerr+" on getAttribLocation"); return}}
	this.draw_locuTexture = g.getUniformLocation(p,"uTexture");
	this.draw_locuTexture2 = g.getUniformLocation(p,"uTexture2");
	if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) { taccgl.glError ("Error "+taccgl.glerr+" on getUniformLocation");return}}
        this.createAndUploadVertexBuffers ();

	this.cv.style.transition=""; this.cv.style.display=''; this.cv.style.opacity=1; this.cv.style.visibility='visible';
	if (taccgl_debug) {
	    taccgl.clog ("Display 3D Canvas");
	} // taccgl_debug_end
	// this.draw_vertexnumber=this.vertI; this.draw_shprognumber=this.shprog.length;
	this.setupShprog();

        this.setVertAttrib();

//	if (this.draw_texturecanvas) {
	g.activeTexture(g.TEXTURE0);
  	if (taccgl_errcheck) {     if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" activeTexture0");}
	g.bindTexture(g.TEXTURE_2D, this.draw_texturecanvas);
  	if (taccgl_errcheck) {     if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" bindTexture0");}
//	}
//	if (this.draw_texturecanvas2) {
	g.activeTexture(g.TEXTURE1);
  	if (taccgl_errcheck) {     if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" activeTexture1");}
	g.bindTexture(g.TEXTURE_2D, this.draw_texturecanvas2);
  	if (taccgl_errcheck) {     if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" bindTexture1"); }
//	}
	if (taccgl_errcheck) {       if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bindTexture");}
if (taccgl_debug) {
	if (console.time) console.timeEnd(ts);
} // taccgl_debug_end
    }

    this.createAndUploadVertexBuffers = function () {
        var g=this.g;
        var drawpar =  g.DYNAMIC_DRAW;
//        var drawpar =  g.STATIC_DRAW;
        this.uploadedVertBufferSize = this.vertBufferSize;
	this.draw_vertexPosBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_locpos);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexPosBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertPos, drawpar);
	this.draw_originBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_locOrigin);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_originBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertOrigin, drawpar);
	
	this.draw_vertexTexPosBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_loctexpos);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexTexPosBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertTexPos, drawpar);   
	
	if (this.draw_locrotp>=0) {
	    this.draw_rotPBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_locrotp);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotPBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertRotP, drawpar);
	    if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bufferData rotp");}
	}
	
	this.draw_accelerationBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_locacceleration);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_accelerationBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertAcceleration, drawpar);
	if (taccgl_errcheck) { if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bufferData acceleration"); }
	if (this.draw_locrota>=0) {
	    this.draw_rotABufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_locrota);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotABufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertRotA, drawpar);
	    if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bufferData rota");}
	}
 
	if (this.draw_loccolor>=0) {
	    this.draw_colorBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_loccolor);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_colorBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertColor, drawpar);
	    if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bufferData color");}
	}

	if (this.draw_loctexmix>=0) {
	    this.draw_texmixBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_loctexmix);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_texmixBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertTexmix, drawpar);
	    if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bufferData texmix");}
	}

	if (this.draw_locnormal>=0) {
	    this.draw_normalBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_locnormal);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_normalBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertNormal, drawpar);
	    if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on bufferData normal");}
	}
    }

    this.setVertAttrib = function () {
	var jaccobj=taccgl;
        var g=this.g;

	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_vertexPosBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_locpos,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer pos"); }
	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_originBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_locOrigin,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {      if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer origin"); }
	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_vertexTexPosBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_loctexpos,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {      if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer texpos"); }
	if (jaccobj.draw_locrotp>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_rotPBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_locrotp,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {          if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer rotp");}
	}
	if (jaccobj.draw_locrota>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_rotABufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_locrota,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer rota");}
	}
	if (jaccobj.draw_loccolor>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_colorBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_loccolor,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {          if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer color");}
	}
	if (jaccobj.draw_loctexmix>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_texmixBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_loctexmix,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer texmix");}
	}
	if (jaccobj.draw_locnormal>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_normalBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_locnormal,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer normal");}
	}
	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_accelerationBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_locacceleration,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {       if (taccgl_errcheck) {      if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer acceleration");}}
    }

   
    this.setupShadow = function () {
	var g=this.g;
	var h=this.shadowH=2048;
	var w=this.shadowW=2048;
	this.shadowfb = g.createFramebuffer();
	g.bindFramebuffer (g.FRAMEBUFFER, this.shadowfb);
	this.shadowdb = g.createRenderbuffer();
	g.bindRenderbuffer (g.RENDERBUFFER, this.shadowdb);
	g.renderbufferStorage (g.RENDERBUFFER, g.DEPTH_COMPONENT16, w,h);
	g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, this.shadowdb);
	this.shadowtex = g.createTexture();
        g.activeTexture(g.TEXTURE2);
	g.bindTexture (g.TEXTURE_2D,this.shadowtex);
        g.activeTexture(g.TEXTURE2);
	g.texImage2D  (g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, null);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
//	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.REPEAT);
//	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.REPEAT);
	g.framebufferTexture2D (g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, this.shadowtex, 0)
    }

    this.setupShprog = function (){
	this.draw_vertexnumber=this.vertI; 
	this.shprogRun= this.shprog.slice();
	this.shprogfromRun = this.shprogfrom.slice();
	if (this.vertI == this.shprogfrom[this.shprogfrom.length-1]) {
	    this.shprogRun.pop(); this.shprogfromRun.pop();
	}
	this.draw_shprognumber=this.shprogRun.length;
    }

    this.startDraw = function (g,p) {
	if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" before startDraw"); }
        // var attr = g.getContextAttributes();  // get attr to inspect in debugger when needed
	this.detectPr();
	taccgl.parallaxAdjust();
	if (taccgl_errcheck) { if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" before adjustQuality"); }
	this.adjustQuality(); g=this.g; p=this.p;
	if (taccgl_errcheck) { if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" after adjustQuality"); }

	if (!this.vBgControl) this.incForeground(); else this.adjustForeground();

	
	this.draw_lastSwitchTime = -10;
	this.draw_duration =1000;
	this.doatI=0;
	this.pendingResizeBody=false;

        if (!this.extTimer) {
           var ua=navigator.userAgent;
           this.isAndroid = ua.match(/Android/)!=null;
           var force = location.href.match(/exttimer/)!=null;
	   if (!this.isAndroid || force) this.extTimer = g.getExtension('EXT_disjoint_timer_query');
           else this.extTimer=null;
        }
	this.resetGPUTimers();

	this.draw_frames=this.draw_meaFrames=0; this.slowStartupTime=0; this.slowStartupFrames=0;

	if (taccgl_errcheck) { if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" before bind Draw"); }
	this.bindDraw(g,p);
	if (this.webglerror) return;
	this.draw_startTime = this.draw_meaTime=   this.meaA[ 0 ] = this.perfnow();  this.draw_meaAdjust=0; this.draw_meaIgnore=0;
        this.loadTest=false; this.loadTestl=0;
	this.rAFdeviation = 0;    this.rAFcnt=0;
	if (taccgl_debug) {
	    taccgl_timestepi=0;  
	} // taccgl_debug_end

	if (this.shadow) this.setupShadow();

	if (taccgl_errcheck) { if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" at end startDraw"); }
        if (this.webglerror) return;

        var plug = new taccglAnimPlug();
	plug.attime = this.duration;
	this.newDoat(plug);
        this.draw_running=true; this.busy=true;
	this.removeClassRe (document.documentElement,'(no-)?taccgl-run');
	this.addClass (document.documentElement,'taccgl-run');

	if (taccgl_debug) {
	    taccgl.tlog ("++++++++++++++++++ 3D Rendering Loop Started +++++++++++++++++++");
	} // taccgl_debug_end
	taccgl_draw3d();
    }

    this.updateDraw = function () {
	if (taccgl_debug) {
	    var ts="Load Vertex Buffers into GPU (updateDraw) "+this.vertI+" size="+ this.vertBufferSize;
	    if (console.time) console.time(ts);
	} // taccgl_debug_end
	var g= this.g, e;
        var drawpar =  g.DYNAMIC_DRAW;
//        var drawpar =  g.STATIC_DRAW;

	if (taccgl_debug && false) {
        if (this.uploadedVertBufferSize == this.vertBufferSize) {
          var ofs=0;
          g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexPosBufferObjekt);
          g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertPos);
          g.bindBuffer(g.ARRAY_BUFFER, this.draw_originBufferObjekt);
	  g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertOrigin);
	  g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexTexPosBufferObjekt);
	  g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertTexPos);   
	  if (this.draw_locrotp>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotPBufferObjekt);
	    g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertRotP);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotABufferObjekt);
	    g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertRotA);
          }

	  if (this.draw_loccolor>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_colorBufferObjekt); 
	    g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertColor);
          }
	  if (this.draw_loctexmix>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_texmixBufferObjekt);
 	    g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertTexmix);
          }
	  if (this.draw_locnormal>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_normalBufferObjekt);
	    g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertNormal);
          }

	  g.bindBuffer(g.ARRAY_BUFFER, this.draw_accelerationBufferObjekt);
	  g.bufferSubData(g.ARRAY_BUFFER, ofs, this.vertAcceleration);
	  if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on update bufferSubData acceleration");}
        } else {
          this.uploadedVertBufferSize = this.vertBufferSize
          g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexPosBufferObjekt);
          g.bufferData(g.ARRAY_BUFFER, this.vertPos, drawpar);
          g.bindBuffer(g.ARRAY_BUFFER, this.draw_originBufferObjekt);
	  g.bufferData(g.ARRAY_BUFFER, this.vertOrigin, drawpar);
	  g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexTexPosBufferObjekt);
	  g.bufferData(g.ARRAY_BUFFER, this.vertTexPos, drawpar);   
	  if (this.draw_locrotp>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotPBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertRotP, drawpar);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotABufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertRotA, drawpar);
          }
	  if (this.draw_loccolor>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_colorBufferObjekt); 
	    g.bufferData(g.ARRAY_BUFFER, this.vertColor, drawpar);
          }
	  if (this.draw_loctexmix>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_texmixBufferObjekt);
 	    g.bufferData(g.ARRAY_BUFFER, this.vertTexmix, drawpar);
          }
	  if (this.draw_locnormal>=0) {
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_normalBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertNormal, drawpar);
          }
	  g.bindBuffer(g.ARRAY_BUFFER, this.draw_accelerationBufferObjekt);
	  g.bufferData(g.ARRAY_BUFFER, this.vertAcceleration, drawpar);
	  if (taccgl_errcheck) {if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on update bufferData acceleration");}
        }
	} else // taccgl_debug_end
          this.createAndUploadVertexBuffers();
        this.setVertAttrib();
        this.doat[this.doat.length-1].attime = this.duration;
	// this.draw_vertexnumber=this.vertI; this.draw_shprognumber=this.shprog.length;
	this.setupShprog();
	taccgl.draw_meaIgnore=3; // this.draw_meaFrames=0;
	if (taccgl_debug) {
	    if (console.time) console.timeEnd(ts);
	} // taccgl_debug_end
    }
    this.updateDrawDD = function () {
//	taccgl.clog ("updateDrawDD "+this.duration);
	this.doat[this.doat.length-1].attime = this.duration;
	this.AAstartedLength = this.AA.length;
    }

    
    this.measureQuality = function () {
	this.qualityCnt[this.quality]++;
	var s = this.qualityCnt[1] + this.qualityCnt[2] + this.qualityCnt[3] + this.qualityCnt[4] + this.qualityCnt[5],
            me= document.getElementById ("taccgl_ImmediateMeasureImage"); 
        if (me) {
	    me.src = taccgl_ImmediateMeasureImage + this.quality /* + (this.shadowEna ? "" : "")  */ + '.png'; 
	    var q=this.quality;
	    if (q==0) me.title="Slow taccGL Animations Disabled.";
	    if (q==1) me.title="For performance reasons taccGL Animations run on a small portion of the window only. Shadows are disabled.";
	    if (q==2) me.title="For performance reasons taccGL Animations are simplified and running with low resolution.";
	    if (q==3) me.title="For performance reasons taccGL Animations are simplified, use per Vertex shading, and do not run full window but still on a big portion of the window. Shadows are disabled.";
	    if (q==4) me.title="For performance reasons taccGL Animations are simplified and do not run full window but still on a big portion of the window. Shadows are disabled.";
	    if (q==5) me.title="taccGL Animations run full speed in full window mode " + (this.shadowEna ? "with" : "without")+" shadows.";
	}
	if (s==10) {
	    var p = this.qualityCnt[1] + this.qualityCnt[2]*2 + this.qualityCnt[3]*3  + this.qualityCnt[4]*4  + this.qualityCnt[5]*5 ;
	    var q=Math.round(p/s);
            me= document.getElementById ("taccgl_MeasureImage"); 
	    if (me) {
		me.src = taccgl_MeasureImage + q + '.png'; 
	    }
	}
    }

    this.applyObjStyle = function(el, st) {
	var n;
	for (n in st) el.style[n]=st[n];
    }

    this.NonDisplay3DCanvas = function () {
	if (taccgl.endMode=="background") {
	    this.foregroundCnt=0; this.adjustForeground();
	} else if (taccgl.endMode=="foreground") {
	    this.incForeground();
	} else {
	    // this.cv.style.display='none'; 
	    // this.cv.style.transition = "opacity 0.5s"; this.cv.style.opacity = 0;
	    this.applyObjStyle (this.cv,this.endStyle);
	    if (taccgl_debug) {
		taccgl.clog ("Non-Display 3D Canvas");
	    } // taccgl_debug_end
	    if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	}
	this.foregroundCnt = 0;
    }

    this.drawTerminated = function () {
	this.NonDisplay3DCanvas ();

	this.g.deleteBuffer(this.draw_vertexPosBufferObjekt);
	this.g.deleteBuffer(this.draw_originBufferObjekt);
	this.g.deleteBuffer(this.draw_vertexTexPosBufferObjekt);
	this.g.deleteBuffer(this.draw_rotPBufferObjekt);
	this.g.deleteBuffer(this.draw_rotABufferObjekt);
	this.g.deleteBuffer(this.draw_colorBufferObjekt);
	this.g.deleteBuffer(this.draw_texmixBufferObjekt);
	this.g.deleteBuffer(this.draw_normalBufferObjekt);
	this.g.deleteBuffer(this.draw_accelerationBufferObjekt);
        if (taccgl_errcheck) { if ((taccgl.glerr=this.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" deleteBuffer"); }

	this.g.deleteTexture ( this.draw_texturecanvas);  this.draw_texturecanvas = null;
	this.g.deleteTexture ( this.draw_texturecanvas2);  this.draw_texturecanvas2 = null;
	    if (taccgl_errcheck) { if ((taccgl.glerr=this.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" deleteTexture"); }

        this.draw_running=false; this.busy=false;
        var vel = document.getElementById('taccglVertexNumber');
        if (vel) vel.innerHTML = this.draw_vertexnumber + '/' + this.draw_frames + "/"+ this.draw_meaFrames / (this.perfnow() - this.draw_meaTime) * 1000;
	//		     + " T "+ this.timeofdraw;

	for (i=0; i<this.showAfterAnimation.length; i++) {
	    var pv=this.showAfterAnimation[i].el.taccgl.postVisibility
	    var ov=this.showAfterAnimation[i].el.taccgl.postOpacity
	    if (taccgl_debug) { 
		taccgl.clog ("Apply postVisibility "+this.showAfterAnimation[i].el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	    } // taccgl_debug_end
	    if (pv||pv=="") this.showAfterAnimation[i].el.style.visibility= pv;
	    if (ov||ov=="") this.showAfterAnimation[i].el.style.opacity= ov;
	}

	this.measureQuality();
        var uTime = (this.perfnow() - taccgl.draw_meaTime) / taccgl.draw_duration,
	    frate = taccgl.draw_meaFrames / uTime;
	if (frate > 50 && taccgl.quality < 5) {taccgl.quality++;}
//	taccgl.quality=2;

	this.showHideComments();
	if (taccgl_debug) { 
	    this.printGPUTimers();
	} // taccgl_debug_end
	
	this.removeClassRe (document.documentElement,'(no-)?taccgl-run');
	this.addClass (document.documentElement,'no-taccgl-run');
	if (taccgl_debug) {
	    taccgl.tlog ("------------------ 3D Rendering Loop Terminated ----------------");
	} // taccgl_debug_end
        this.StartRender();
    }
    this.drawImmediateTerm = function (errcode) {
	this.errcode=errcode;
	if (this.reqAnimFrameId) window.taccgl_cancelAnimationFrame (this.reqAnimFrameId);
	clearInterval(this.interval);
	this.cv.style.display='none'; 
	if (taccgl_debug) {
	    taccgl.clog ("Non-Display 3D Canvas");
	} // taccgl_debug_end
	if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	this.dddmode=false; this.compatmode=true; this.quality=0; 
	this.ddFallBack();
	this.nullDraw();
	if (taccgl_debug) {
	    taccgl.clog ("------------------ 3D Rendering Loop Aborted (because or Error or slow Timing Quality) ------------");
	} // taccgl_debug_end
	this.removeClassRe (document.documentElement,'(no-)?taccgl-run');
	this.addClass (document.documentElement,'no-taccgl-run');
	this.showHideComments();
	this.measureQuality();
	this.doHook(taccgl.onImmediateTerm);
    }

    this.resetGPUTimers = function () {
	taccgl.etGPUTime = 1000; taccgl.etGPUTimeLag = 1E10;
	taccgl.etGA=Array (this.meaAS); taccgl.etGAS=128; taccgl.etGi=-1; 

	if (this.extTimer) {
	    if (!this.eTimerAll) {
		this.eTimerAll= this.extTimer.createQueryEXT();
		/* time stamp queries mostly not supported so not used 
		this.eTimeStampBegin= this.extTimer.createQueryEXT();
		this.eTimeStampEnd= this.extTimer.createQueryEXT();
                */ 		
	    }
	    this.extTimerRunning = false;
	    if (taccgl_debug) {
		this.etAll = Array (5);
		this.etAllValues = Array(5);
		this.etAllLoad = Array(5); 
		this.etAllcnt = Array (5);
		this.etAllLoadcnt = Array(5);
		this.etloadFactors="";
		this.etNotAvailable = 0;
		taccgl.lastGPUtimeStamp = 0;
		taccgl.extTimerMeaIdentical=0; taccgl.extTimerMeaDifferent=0; taccgl.extTimerMeaDifferent1=0;
		var i;
		for (i=0; i<5; i++) {
		    this.etAll[i]= this.etAllLoad[i] = this.etAllcnt[i]= this.etAllLoadcnt[i] = 0;
		    this.etAllValues[i]="";
		}
	    } // taccgl_debug_end
	}
    }

    if (taccgl_debug) {
	this.printGPUTimers = function () {
	    if (!this.extTimer) return;
	    var q=0;
	    this.clog ("GPU Timers for vertex number="+this.draw_vertexnumber+" "+this.canvasW+"x"+this.canvasH+"*"+this.pr+"*"+this.pr+"="+this.canvasW*this.canvasH*this.pr*this.pr/1000000); 
	    for (q=1; q<5; q++) {
		this.clog ("GPU Timer All q="+q+" "+this.etAll[q]/this.etAllcnt[q]+"  ("+this.etAllcnt[q]+")");
	    }
	    for (q=1; q<5; q++) {
		this.clog ("GPU Timer All with Loadtest q="+q+" "+this.etAllLoad[q]/this.etAllLoadcnt[q]+"  ("+this.etAllLoadcnt[q]+")");
	    }
	    this.clog ("GPU Time not available Count = "+this.etNotAvailable);
	    this.clog ("GPU load Factors="+this.etloadFactors);
	    this.clog ("GPU Timer Values="+this.etAllValues);
	    this.clog ("GPU Timer etGAi="+this.etGi);
	    this.clog ("GPU Timer etGPUTime="+this.etGPUTime);

	    var s="GPU Timer Array=",i;
	    for (i = ( this.etGi < this.etGAS-1 ? this.etGi : this.etGAS-1 ); i>=0; i--) {
		s+= this.etGA[ (this.etGi-i) % this.etGAS ]+", ";
	    }
	    this.clog(s);
		
	    
//	    this.clog ("GPU Timer Identical="+taccgl.extTimerMeaIdentical);
//	    this.clog ("GPU Timer Different="+taccgl.extTimerMeaDifferent);
//	    this.clog ("GPU Timer Different1="+taccgl.extTimerMeaDifferent1);
	}
    } // taccgl_debug_end
	

    this.evaluateGPUTimer = function () {
	var et= taccgl.extTimer;
	if (!taccgl.extTimerRunning) return true;
//	if ( taccgl.g.getParameter(et.GPU_DISJOINT_EXT))
//	    this.tlog ("GPU ExtTime Disjoint");

	// var st= taccgl.g.getParameter(et.TIMESTAMP_EXT);    get GPU time stamp, mostly unsupported so no used
/*      using GPU time stamps,  mostly unsupported so no used
	if ( et.getQueryObjectEXT(taccgl.eTimeStampEnd, et.QUERY_RESULT_AVAILABLE_EXT)){
	    var b= et.getQueryObjectEXT(taccgl.eTimeStampBegin, et.QUERY_RESULT_EXT);
	    var e= et.getQueryObjectEXT(taccgl.eTimeStampEnd, et.QUERY_RESULT_EXT);
//	    taccgl.tlog("GPU time stamps "+b/1000000+"-"+e/1000000+" "+(e-b)/1000000+" Frame time="+(b-taccgl.lastGPUtimeStamp)/1000000 +
//	       (" GPU Time Stamp "+taccgl.GPUTimeStampBegin/1000000) + " "+ (b-taccgl.GPUTimeStampBegin)/1000000);
//	    taccgl.etAllValues+="\n"+/* (b-taccgl.lastGPUtimeStamp)/1000000+ * / " "+(e-b)/1000000+" ";
	    taccgl.lastGPUtimeStamp=b;
	} else {
   	    taccgl.etAllValues += "?";
	    // taccgl.tlog ("GPU time stamps not available");
	}
*/

	if ( et.getQueryObjectEXT( taccgl.eTimerAll, et.QUERY_RESULT_AVAILABLE_EXT )) {
	    var t=et.getQueryObjectEXT(taccgl.eTimerAll, et.QUERY_RESULT_EXT)/1000;
	    // if (taccgl_errcheck || true) {  if ((e=taccgl.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on getQueryObjectEXT");   }
	    //	    taccgl.tlog ("ExtTimer All="+et.getQueryObjectEXT(taccgl.eTimerAll, et.QUERY_RESULT_EXT)/1000);

            /* taccgl.etGPUTime = t; */ taccgl.etGPUTimeLag = 1;
	    taccgl.etGi++; 
            taccgl.etGA [ taccgl.etGi % taccgl.etGAS ] = t;

            var n=taccgl.etGi+1; if (n>5) n=5;
            var s=0, max=0;
            for (var i=0; i<n; i++) {
		var v = taccgl.etGA [ (taccgl.etGi-i) % taccgl.etGAS ];
		if (v>max) max=v;
		s+=v;
            }

            if (n>1) {s-=max; n--}
            taccgl.etGPUTime = s/n;

	    if (taccgl_debug) {
		var q = taccgl.extTimerQuality;
		if (taccgl.loadFactor==1){
		    // if ( t > 2 * 	taccgl.etAll[q] / taccgl.etAllcnt[q]) {
		    //   taccgl.tlog("GPU exceptional high timer value "+t+" q="+q);
		    // } 
		    taccgl.etAll[q] +=t; taccgl.etAllcnt[q] ++; taccgl.etAllValues+=t+"q"+q+",";
		    taccgl.etAllValues = taccgl.etAllValues.substring(0,1024);
                    /* time stamp code no used 
		       if ( (e-b)/1000 == t ) taccgl.extTimerMeaIdentical ++; else
		       if ( (e-b)/1000 == t+1000 ) taccgl.extTimerMeaDifferent1 ++; else taccgl.extTimerMeaDifferent ++;
                    */
		} else {
		    taccgl.etAllLoad[q] +=t; taccgl.etAllLoadcnt[q] ++;
		    taccgl.etloadFactors += taccgl.loadFactor+", ";
		    taccgl.etAllValues+=t+"q"+q+"L,";
		}
	    } // taccgl_debug_end
	    return true;
	} else {
	    // cgl.tlog ("ExtTimer not yet available")
	    if (taccgl_debug) {
   		taccgl.etAllValues += "!";
		taccgl.etNotAvailable ++;
	    } // taccgl_debug_end
            taccgl.etGPUTimeLag++;
	    return false;
	}
    }
    

    this.doHook = function (h,a,b,c,d,e,f,g) {
	if (typeof (h) == "function") return h(a,b,c,d,e,f,g);
	else if (typeof (h) == "string") return eval(h);
	else if (h && typeof (h) == "object") 
	    if (h.length||h.length==0) {
		var i, r;
		for (i=0;i<h.length;i++) r=this.doHook(h[i],a,b,c,d,e,f,g)
		return r;
	    } else {
		return h.todo(a,b,c,d,e,f,g);
	    }
    }
    this.hookDeclined=Array(0);
    this.doFirstHook = function (h,a,b,c,d,e,f,g) {
	if (typeof (h) == "function") return h(a,b,c,d,e,f,g);
	else if (typeof (h) == "string") return eval(h);
	else if (h && typeof (h) == "object") 
	    if (h.length||h.length==0) {
		var i, r=taccgl.hookDeclined;
		for (i=0;i<h.length;i++) r=this.doHook(h[i],a,b,c,d,e,f,g)
//		if (r!=taccgl.hookDeclined) return r;
	    } else {
		return h.todo(a,b,c,d,e,f,g);
	    }
	return taccgl.hookDeclined;
    }

    this.doat = new Array (0);

    this.newDoat = function (a) {
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
	var i=this.doat.length-1;
        while (i>=0 && this.doat[i].attime>a.attime) { this.doat[i+1]=this.doat[i]; i--;}
	this.doat[i+1]=a;
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
    }

    this.adjustDoat = function (i,t) {
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
	this.doat[i].attime=t;
	while (this.doat[i+1].attime<t) {
	    var x=this.doat[i+1]; this.doat[i+1]=this.doat[i]; this.doat[i]=x;
	    i++;
	}
	/* if (i==this.doatI)  this.doatI--; */
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
    }

    this.findInDoat = function (a) {
	var f=0, t=this.doat.length-1;
	var v=a.attime;
	if (!v && v!=0) return null;
	if (t<0) return null;
	
	while (true) {
	    var m=Math.floor((f+t)/2);
	    if ( this.doat[m].attime < v ) f=m; else 
		if ( this.doat[m].attime > v ) t=m; else {
		    var i=m;
		    while ( this.doat[i]!=a && this.doat[i-1].attime == v) i--;
		    if (this.doat[i]==a) return i;
		    i=m+1;
		    while ( this.doat[i]!=a && this.doat[i+1].attime == v) i++;
		    if (this.doat[i]==a) return i;
		    return null;
		}
	}
    }

    this.deleteFromDoat = function (a) {
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
	var i=this.findInDoat (a);
	if (i!=null) {
	    if (this.doatI>i)this.doatI--; 
	    this.doat.splice(i,1);
	}
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
    }

    this.checkDoat = function () {
	var i; 
	if (this.draw_running)
	    if (! this.doat[this.doat.length-1].isPlug) {
		taccgl.glAlert("missing plug");
	    }
	for (i=0; i<this.doat.length-1; i++) {
	    if (this.doat[i].isPlug) {
		taccgl.glAlert("plug not at end");
	    }
	    if ( !this.doat[i].attime && this.doat[i].attime!=0) 
		taccgl.glAlert ("doat null");
	    if (! (this.doat[i].attime <= this.doat[i+1].attime)) {
		taccgl.glAlert ("doat sort error ");
	    }
	}
    }

    this.setDuration = function (d) {
	this.duration = d;
    }

    this.setShader = function (p){
//	return;
	if (this.shprogfrom[this.shprogfrom.length-1]>this.vertI) {
	    return;
	} else if (this.shprogfrom[this.shprogfrom.length-1]==this.vertI) {
	    if (this.shprogfrom.length>1 && this.shprog[this.shprogfrom.length-2]==p) {
		this.shprog.pop();
		this.shprogfrom.pop();
	    } else
		this.shprog[this.shprogfrom.length-1]=p;
	} else if (this.shprog[this.shprogfrom.length-1]!=p) {
	    this.shprog.push(p);
	    this.shprogfrom.push(this.vertI);
	}
    }

    this.startDD = function () {
	if (!this.vBgControl) this.incForeground();
	this.draw_duration =1000;
	this.doatI=0;

	taccgl.parallaxAdjust();
	this.adjustQuality();
	if (!this.vBgControl) this.incForeground(); else this.adjustForeground();

        var plug = new taccglAnimPlug();
	plug.attime = this.duration;
	this.newDoat(plug);
        this.draw_running=true; this.busy=true;

	this.cv.style.transition=""; this.cv.style.display=this.epack!=false?'':'none'; this.cv.style.opacity=1; this.cv.style.visibility='visible';
	if (taccgl_debug) {
	    taccgl.clog ("Display 3D Canvas");
	} // taccgl_debug_end
	this.draw_frames=this.draw_meaFrames=0; this.slowStartupTime=0;this.slowStartupFrames=0;
	this.draw_startTime = this.draw_meaTime = this.perfnow(); this.draw_meaAdjust=0; this.draw_meaIgnore=0;

	this.loadTest=false; this.loadTestl=0;
	this.AAstartedLength=this.AA.length;
	
	// if (mozRequestAnimationFrame) taccgl_requestAnimationFrame=null;  

	this.removeClassRe (document.documentElement,'(no-)?taccgl-run');
	this.addClass (document.documentElement,'taccgl-run');
	if (!window.taccgl_requestAnimationFrame) this.interval = setInterval (taccgl_draw2d,16); 
	if (taccgl_debug) {
	    taccgl.clog ("++++++++++++++++++ 2D Rendering Loop Started +++++++++++++++++++");
	} // taccgl_debug_end
        taccgl_draw2d();
    }

    this.drawTerminatedDD = function () {
	clearInterval(this.interval);
	this.NonDisplay3DCanvas();

	/*
	this.cv.style.display='none'; 
	if (taccgl_debug) {
	    taccgl.clog ("Non-Display 3D Canvas");
	} // taccgl_debug_end
	*/

	
	if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	for (i=0; i<this.showAfterAnimation.length; i++) {
	    var pv=this.showAfterAnimation[i].el.taccgl.postVisibility
	    var ov=this.showAfterAnimation[i].el.taccgl.postOpacity
	    if (taccgl_debug) {
		taccgl.clog ("Apply postVisibility "+this.showAfterAnimation[i].el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	    } // taccgl_debug_end
	    if (pv||pv=="") this.showAfterAnimation[i].el.style.visibility= pv;
	    if (ov||ov==""||ov==0) this.showAfterAnimation[i].el.style.opacity= ov;
	}

        var vel = document.getElementById('taccglVertexNumber');
        if (vel) vel.innerHTML = this.draw_meaFrames /* + " " +(new Date().getTime() - this.draw_meaTime) */ + " " +
		     this.draw_meaFrames / (this.perfnow() - this.draw_meaTime - this.draw_meaAdjust) * 1000;

	this.measureQuality();

        var uTime = (this.perfnow()- taccgl.draw_meaTime - this.draw_meaAdjust) / taccgl.draw_duration,
	    frate = taccgl.draw_meaFrames / uTime;
	if (frate > 50 && taccgl.quality < 5) {taccgl.quality++;}

	this.removeClassRe (document.documentElement,'(no-)?taccgl-run');
	this.addClass (document.documentElement,'no-taccgl-run');
	if (taccgl_debug) {
	    taccgl.clog ("------------------ 2D Rendering Loop Terminated ----------------");
	} // taccgl_debug_end
	this.showHideComments();
        this.StartRender();
    }
    this.drawImmediateTermDD = function () {
	clearInterval(this.interval);
	this.cv.style.display='none'; 
	if (taccgl_debug) {
	    taccgl.clog ("Non-display 3D Canvas");
	} // taccgl_debug_end
	if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	this.ddmode=false; this.compatmode=true; this.quality=0;
	this.nullDraw();
	if (taccgl_debug) {
	    taccgl.clog ("------------------ 2D Rendering Loop Aborted  (because of Error or slow timing) ----------------");
	} // taccgl_debug_end
	this.removeClassRe (document.documentElement,'(no-)?taccgl-run');
	this.addClass (document.documentElement,'no-taccgl-run');
	this.showHideComments();
	this.measureQuality();
	this.doHook(taccgl.onImmediateTerm);
    }
    this.doAllDoats = function () {
	var i;
	for (i=0; i<this.doat.length;i++) {
	    var t=this.doat[i];
//	    if (t.elshowatend) t.elshowatend.style.visibility= t.elshowatend.taccgl.postVisibility;
	    if (t.elshowatend) {
		var pv = t.postVisibility;
		var ov = t.postOpacity;
   	        if (taccgl_debug) {
	           taccgl.clog ("doAllDoats Apply postVisibility "+t.el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	        } // taccgl_debug_end

		if (pv||pv=="") t.elshowatend.style.visibility=pv;
		if (ov||ov==""||ov==0) t.elshowatend.style.opacity=ov;
	    }	   
 	}
    }
    this.nullDraw = function () {
	var i;
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	this.doAllDoats();
	for (i=0; i<this.showAfterAnimation.length; i++) {
	    var pv=this.showAfterAnimation[i].el.taccgl.postVisibility
	    var ov=this.showAfterAnimation[i].el.taccgl.postOpacity
	    if (taccgl_debug) {
	        taccgl.clog ("NullDraw Apply postVisibility "+this.showAfterAnimation[i].el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	    } // taccgl_debug_end
	    if (pv||pv=="") this.showAfterAnimation[i].el.style.visibility= pv;
	    if (ov||ov=="") this.showAfterAnimation[i].el.style.opacity= ov;
	}
        this.StartRender();
	this.doHook(this.onTerm);
	// this.showHideComments(); Do not show comments if there was no animation actually running
       	if (this.cv) this.cv.style.display='none'; 
    }
    this.cancelDraw = function () {
	if (this.reqAnimFrameId) window.taccgl_cancelAnimationFrame (this.reqAnimFrameId);
	clearInterval(this.interval);
    }
    this.continueDraw = function () {
	if (window.taccgl_requestAnimationFrame) {
	    taccgl.reqAnimFrameId= taccgl_requestAnimationFrame (taccgl.dddmode?taccgl_draw3d:taccgl_draw2d); 
	} else {
	    taccgl.interval = setInterval (taccgl.dddmode?taccgl_draw3d:taccgl_draw2d,16);
	}
    }
    this.stop = function () {
	this.cancelDraw();
	if (!taccgl.draw_running) return;
	this.doAllDoats();
	if (this.dddmode) {
	    this.drawTerminated();
	} else if (this.ddmode) {
	    this.drawTerminatedDD();
	}
	this.doHook(this.onStop);
    }

    this.start = function (s) {
//	if (s!="no epilepsy warning" || (taccgl.busy && !taccgl.draw_running)) {
	if (s!="no epilepsy warning" || taccgl.epack==false || this.showWarning) {
            if (this.ddmode || this.dddmode) {
		// if (window.console) console.log(s);
		var w = this.epcheck();
		if (w=="wait") return;
		if (!w) { 
		    if (this.draw_running) this.stop(); else this.nullDraw(); 
		    this.cv.style.display='none'; 
		    return;
		}
	    }
	}
	if (this.prevPaintJob) {
	    var job=this.newJob ( function () {taccgl.start(s); } );
	    job.waitFor (this.prevPaintJob); 
	    this.prevPaintJob=null;return;
	}
	this.showHideComments();
	if (this.ddmode && taccgl.epack!=false ) {
	    if (!taccgl.draw_running) this.startDD(); else taccgl.updateDrawDD(); 
	} else 	if (this.dddmode && taccgl.epack!=false) {
            if (this.g.isContextLost()) {this.glError("Context Lost on start")};
	    if (!this.webglerror) this.setupTextures();
            if (!this.webglerror)
 	       if (!taccgl.draw_running) taccgl.startDraw(taccgl.g,taccgl.p); else taccgl.updateDraw();
            if (taccgl_setuperrcheck && this.dddmode) {
               if ((taccgl.glerr=this.g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" after start/bindDraw");
            }
            if (this.webglerror)  this.drawImmediateTerm(20);
	} else {
	    this.nullDraw();
	}
    }
    this.restart = function (){
	if (!taccgl.draw_running) this.start(); else this.draw_startTime = this.perfnow();
    }

//  Debug Functions
    this.ShowTexCanvas = function (i,bg) {
	var c;
	if (i==1)
	    c = document.getElementById ("taccgl_textureCanvas");
	else if (i==2)
	    c = document.getElementById ("taccgl_textureCanvas2");
	c.style.display='';
	c.style.backgroundColor=bg;
    }
    this.Bg3DCanvas = function (bg) {
	var c = document.getElementById ("taccgl_canvas3d");
	c.style.backgroundColor=bg;
    }
    this.Display3DCanvas = function (d) {
	var c = document.getElementById ("taccgl_canvas3d");
	c.style.display=d;
    }
    this.ZIndex3DCanvas = function (d) {
	var c = document.getElementById ("taccgl_canvas3d");
	c.style.zIndex=d;
    }
    this.HideTexCanvas = function () {
	document.getElementById ('taccgl_textureCanvas').style.display='none';
	document.getElementById ('taccgl_textureCanvas2').style.display='none';
    }
// End Debug Functions

    this.texTo = function (i) {
	this.texcanvasi=i;
	if (i==1)
	    this.texcanvas = document.getElementById ("taccgl_textureCanvas");
	else if (i==2)
	    this.texcanvas = document.getElementById ("taccgl_textureCanvas2");
        if (this.texcanvas && this.texcanvas.getContext){
          this.texc = this.texcanvas.getContext("2d");
        }
    }
    this.texTransform = function (a,b,c,d,e,f) {
//	this.texc.setTransform(a,b,c,d,e,f);
	var p=this.tpr;
	this.texc.setTransform(p*a,p*b,p*c,p*d,p*e,p*f);
    }
    this.resetTransform = function () {
	 taccgl.texTransform (1,0,0,1,0,0); 
    }

    this.markCanvasChanged = function (){
	if (this.texcanvasi==1) this.textureCanvasChanged = true; else
	    if (this.texcanvasi==2) this.textureCanvasChanged2 = true;
    }

    this.texClear = function (i) {
	var el;
	if (!this.initialized) this.begin();
	if (i==1) {
	    el = document.getElementById ("taccgl_textureCanvas");
	    this.textureCanvasChanged = true;
	} if (i==2) {
	    el = document.getElementById ("taccgl_textureCanvas2");
	    this.textureCanvasChanged2 = true;
	}
	if (el) {
	    var wpr=Math.round(taccgl_texCanWidth*this.tpr), hpr=Math.round(taccgl_texCanHeight*this.tpr);
	    el.width=wpr; el.height=hpr;
	}
	if (this.texcanvasi==i) {
	    if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    var x=this.texcanvas;
	    this.texTo(i); if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
	    this.texTo(x);
	}
    }
    this.texCanResize = function (i) {
	var el;
	if (i==1) {
    	    el = document.getElementById ("taccgl_textureCanvas");
	} if (i==2) {
	    el = document.getElementById ("taccgl_textureCanvas2");
	}
	var w = el.style.width, h = el.style.height;
	if (taccgl_texCanWidth+"px"==w && taccgl_texCanHeight+"px"==h) return false;
	el.style.width=w+"px";  el.style.height=h+"px";
	return true;
    }


    this.texClearAll = this.texInit = function () {
	if (taccgl_debug) { 
	    taccgl.clog ("texCanResize "+taccgl_texCanWidth+","+taccgl_texCanHeight);
	} // taccgl_debug_end 
	if (!this.initialized) { this.begin(); return }
	this.detectTpr();
	this.texClear(1);
	this.texClear(2);
//	if (this.texCanResize(1) || this.texCanResize(2)) this.createShaders(); no longer needed since stdsc does no longer use texcanwidth
	this.texTo(1);
	this.texAtlas.clear();    this.allocPaintErrorTexture();
    }

    this.allocPaintErrorTexture = function () {
	this.texAtlas.alloc(null,3,3); 
	this.texc.fillStyle="yellow"; this.texc.fillRect (0,0,3,3);
	this.texc.fillStyle="red"; this.texc.fillRect (1,1,1,1);
    }


    this.texIntResolution = function (tpr) {
	this.tpr=tpr; this.texClearAll();
    }

    this.a = function (el,k) {
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	if (typeof (k) == "object" ) {k.actorInit(el); return k;} else {var a= new k(el); a.initSecond(); return a}
    }

/*
    textureDraw now needs a canvas parameter, so if it turns out that actorHide is still needed
    this needs to be fixed
    this.actorHide = function (el,k) {
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	var a; 
	if (typeof (k) == "object" )  {k.actorInit(el); a=k;} else a = new k (el);
	a.hide(); a.textureDraw ();
	return a;
    }
*/

    this.actor = function (el,k,v,t){
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	if (!t) t=1; else 
	    throw ("actor: parameter error");  // t is ignored now since now defTexCan is set by alloc
	var a; 
	if (typeof (k) == "object" )  {k.actorInit(el); a=k; a.alloc();} else {a = new k(el); a.alloc(); a.initSecond();}
	a.hideAtBegin();  a.paint(); 
	if (v!=null) { a.visatend(v); } else {
	    taccgl.taccglAttach(a.el);
	    if (!a.el.taccgl.preVisibility&&a.el.taccgl.preVisibility!="") {a.el.taccgl.preVisibility=a.el.style.visibility;}
	    a.visatend(a.el.taccgl.preVisibility);
	}
//	if (v) {a.el.taccgl.postVisibility=v; } else {a.el.taccgl.postVisibility=a.el.taccgl.preVisibility;}
//	this.showAfterAnimation.push(a);
	if (a.defTexCan==2) a.blendInt(0,1);
	return a;
    }
    this.shadow = function (el,k) {
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel) { alert ("No Element with id "+el); return}
	    el=xel;
	}
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	this.taccglAttach(el);
	if (el.taccgl.asShadow) { return el.taccgl.asShadow;} 
	else {
	    var r;
	    if (typeof (k) == "object" ) {k.actorInit(el); r=k;} else { r= new k(el); r.initSecond();}
	    el.taccgl.asShadow=r;
	    return r;
	}
    }

    this.getShadow = function (el) {
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel) { alert ("No Element with id "+el); return}
	    el=xel;
	}
	if (!el) return null;
	if (!el.taccgl) return null;
	var as;
	if (!(as=el.taccgl.asShadow)) return null;
	return as;
    }

    this.taccglAnim = function (el){
	this.init(el);
    }
    var tap=new taccglAnimPrototype();
    tap.taccglAnimClone.prototype = tap;
    this.taccglAnim.prototype = tap;

    this.flexiBorder = function (el) {
	this.init(el);
    }
    this.multiFace = function (el) {
	this.init(el);
    }
    this.triangle = function (el) {
	this.init(el);
    }
    this.dddBox = function (el) {
	this.init(el);
    }

    this.mEmpty = function ()       { return new taccglMultiEmpty (); }
    this.mSingle= function (a)      { return new taccglMultiElement (a); }
    this.ma     = function (el,k)   { return new taccglMultiElement (this.a(el,k));}
    this.mac    = function (el,k)   { 
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel)  { return new taccglMultiEmpty (); }
	}
	return new taccglMultiElement (this.a(el,k));}
    this.mClass = function (cl,k)   { return new taccglMultiSet ( document.getElementsByClassName(cl),k);}
    this.mName  = function (cl,k)   { return new taccglMultiSet ( document.getElementsByName(cl),k);}
    this.mTagName = function (cl,k) { return new taccglMultiSet ( document.getElementsByTagName(cl),k);}

    
 
    this.paintTextNode = function (el){
	var r = document.createRange(),
            tcel = el.textContent; 
//        if (tcel.match(/Currently/)) 
//	    var breakhere=1;
	r.selectNode (el);
        var i =tcel.search(/\S+/); 
        if (i>0) r.setStart (el,i);
	var rects = r.getClientRects(),
	    t=this.texc;

	if (rects.length>=1) { 
	   var cs=null, font;
	   if (!cs) { 
	       if (el.parentElement)
		   cs=getComputedStyle(el.parentElement);
	       else
		   cs=getComputedStyle(el.parentNode);
	   } 
           if (cs["fontStyle"]) {
  	      font =   cs["fontStyle"] + " " 
	       + cs["fontVariant"] +  " "  + cs["fontWeight"]  +  " " + cs["fontSize"] + " " + cs["fontFamily"];
	   } else {
	      font =  cs["font-style"] + " " 
	      + cs["font-variant"] + " " + cs["font-weight"]  + " " + cs["font-size"] + " " + cs["font-family"];
	   }
	    t.lineWidth=1;
          font=font.replace(/Calibri/,"calibri");
  	  t.font = font;
	    if (taccgl_debug_paint) { // (taccgl_debug)
		taccgl.clog(font+" <-> "+t.font);
		// console.log(el.textContent, cs, font);
	    }  // taccgl_debug_end
	  t.fillStyle = cs.color;
	  var lh = parseInt(cs["line-height"]); 
	  if (typeof (lh)!="number" || isNaN(lh)) lh=parseInt(cs["lineHeight"]); 
	  if (typeof (lh)!="number" || isNaN(lh)) lh=1.2*parseInt(cs["font-size"]);
	  if (typeof (lh)!="number" || isNaN(lh)) lh=19;
	  t.textBaseline = "bottom";
	}

	if (rects.length==1 && cs["textAlign"]!="justify") { /* one line paint at once */
          var x= rects[0].left, y=rects[0].bottom;
  	  x+=this.scrollLeft; y+=this.scrollTop;
	  // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
	  var tc = el.textContent; 
	  tc = r.toString();
	    tc = tc.replace (/\s+/g," ");  
	  t.fillText (tc,x,y);
	  // t.strokeRect (x,y-rects[0].height,rects[0].width,rects[0].height);
	} else if (rects.length>=1) { /* paint word by word */
  	   var regex = /[A-Za-z0-9]+|\s|\S/g,
	       res, j=0; 
	   while ((res = regex.exec(tcel)) && j<1000) {
               r.setStart (el,res.index);
               r.setEnd   (el,res.index+res[0].length);
	       rects = r.getClientRects();
               if (rects.length>1) {
                   var breakhere=65;
               } 
	       if (rects.length){ 
                   var re=rects[0];
                   if (rects.length>1 && re.width==0) re=rects[1];
	           var tc = r.toString(), x= re.left, y=re.bottom;
		   x+=this.scrollLeft; y+=this.scrollTop;
 	           // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
                   // if (t.fillStyle=="red") t.fillStyle="blue"; else t.fillStyle="red";
 	           t.fillText (tc,x,y);
	       }
 	        // t.strokeRect (x,y-rects[0].height,rects[0].width,rects[0].height);
	       j++;
	   }
	}

    }

    this.paintBackground = function (el) { 
	var t=this.texc,
	    cs=getComputedStyle(el),
	    c = cs.backgroundColor;
	if (c!='none' && c!='rgba(0, 0, 0, 0)' && c!="transparent") {
            t.fillStyle = c;
            // var par=el, x= el.offsetLeft, y=el.offsetTop;
            // while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
            var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop;
            var btlr = this.getPxProp (cs.borderTopLeftRadius,0),
	    btrr = this.getPxProp (cs.borderTopRightRadius,0),
	    bblr = this.getPxProp (cs.borderBottomLeftRadius,0),
	    bbrr = this.getPxProp (cs.borderBottomRightRadius,0),
	    ww=0.5;

	    var wi=el.offsetWidth, he= el.offsetHeight;
	    if (el.tagName=="TD") {
		var  cr=el.getClientRects();
		wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		// x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		x+=this.scrollLeft; y+=this.scrollTop;
	    }
	    
	    if (btlr==0 && btrr==0 && bblr==0 && bbrr==0) {
		t.fillRect (x,y,wi,he);
	    } else {
		t.beginPath();
		/* top */
		var d = (1-Math.sqrt(0.5))*btlr;
		if (btlr>0) { t.moveTo ( x+d+ww,  y+d+ww ); t.arcTo ( x+d+d+ww,  y+ww, x+btlr+ww,y+ww, btlr ) } else t.moveTo (x+ww,y+ww);
		t.lineTo ( x+wi - btrr-ww, y+ww );
   		d = (1-Math.sqrt(0.5))*btrr;
		if (btrr>0) { t.arcTo (   x+wi-d-d-ww,  y+ww, x+wi-d-ww, y+ww+d,  btrr ) } else t.lineTo ( x+wi, y+ww );
  		
		/* right side */
		d = (1-Math.sqrt(0.5))*btrr;
		if (btrr>0) { t.arcTo ( x+wi-ww,  y+d+d+ww, x+wi-ww, y+btrr+ww, btrr ) };
  		t.lineTo ( x+wi-ww, y+he-bbrr-ww );
   		d = (1-Math.sqrt(0.5))*bbrr;
		if (bbrr>0) { t.arcTo (  x+wi-ww,  y+he-d-d-ww, x+wi-d-ww, y+he-ww-d,  bbrr ) };
		
		/* bottom side */
		d = (1-Math.sqrt(0.5))*bbrr;
		if (bbrr>0) { t.arcTo (  x+wi-d-d-ww,  y+he-ww,  x+wi - bbrr-ww,  y+he-ww, bbrr ) }; 
		t.lineTo ( x+ bblr+ww, y+he-ww );
		d = (1-Math.sqrt(0.5))*bblr;
		if (bblr>0) { t.arcTo ( x+d+d+ww,  y+he-ww,  x+d+ww, y+he-d-ww,  bblr ) } 
		
		/* left side */
   		d = (1-Math.sqrt(0.5))*bblr;
		if (bblr>0) { t.arcTo (  x+ww,  y+he-d-d-ww, x+ww, y+he-bblr, bblr ) };
		
		t.lineTo ( x+ww, y+btlr+ww );
		d = (1-Math.sqrt(0.5))*btlr;
		if (btlr>0) { t.arcTo ( x+ww,  y+d+d+ww, x+ww+d, y+d+ww, btlr ) }
  		t.fill();
	    }
	}
/*
	var u= cs.backgroundImage;
	if ((u && u!="none")) {
	    var url = u.replace (/url\("([^)]*)"\)/,"$1");
	    var img= this.imageTable[url];
	    var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop;
	    taccgl.texc.drawImage(img, x, y, rect.width, rect.height);
	}
*/
	var u= cs.backgroundImage, i;
	if ((u && u!="none")) {
	    var sImage = u.split (/\s*,\s*/),
	    sAttachment=cs.backgroundAttachment.split (/\s*,\s*/),
	    bbm=cs.backgroundBlendMode, sBlendMode;
	    if (typeof(bbm)=="string") sBlendMode=bbm.split (/\s*,\s*/); else sBlendMode=Array(sImage.length);
	    var sClip=cs.backgroundClip.split (/\s*,\s*/),
	    sOrigin=cs.backgroundOrigin.split (/\s*,\s*/),
	    sPosition=cs.backgroundPosition.split (/\s*,\s*/),
//	    sPositionX=cs.backgroundPositionX.split (/\s*,\s*/),
//	    sPositionY=cs.backgroundPositionY.split (/\s*,\s*/),
	    sRepeat=cs.backgroundRepeat.split (/\s*,\s*/),
//	    sRepeatX=cs.backgroundRepeatX.split (/\s*,\s*/),
//	    sRepeatY=cs.backgroundRepeatY.split (/\s*,\s*/),
	    sSize=cs.backgroundSize.split (/\s*,\s*/);
	    for (i=sImage.length-1; i>=0; i--) {
		var u = sImage[i];
		if (u!="none") {
		    this.paintBackgroundSingle(el,cs,u,
					       sAttachment[i],
					       sBlendMode[i],
					       sClip[i],
					       sOrigin[i],
					       sPosition[i],
//					       sPositionX[i],
//					       sPositionY[i],
					       sRepeat[i],
//					       sRepeatX[i],
//					       sRepeatY[i],
					       sSize[i])
		}
	    }
	}	
    }

    /* 
    this.paintBackgroundSingleSimple = function(el,Image,Attachment,BlendMode,Clip,
					       Origin,Position,/* PositionX,PositionY,* /
					       Repeat,/*RepeatX,RepeatY, * / size){
	var url = Image.replace (/url\("([^)]*)"\)/,"$1");
	var img= this.imageTable[url];
	var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop;
	taccgl.texc.drawImage(img, x, y, rect.width, rect.height);
    }
    */

    this.paintBackgroundSingle = function(el,cs,Image,Attachment,BlendMode,Clip,
					       Origin,Position,/* PositionX,PositionY,*/
					       Repeat,/* RepeatX,RepeatY, */ size){
	var url = Image.replace (/url\("([^)]*)"\)/,"$1");
	var img= this.imageTable[url];
	var rect=el.getBoundingClientRect(); var x0=rect.left+this.scrollLeft, y0=rect.top+this.scrollTop,
	w=rect.width, h=rect.height,
	clpx=x0, clpy=y0, clpw=w, clph=h,
        btlr = 0, btrr = 0, bblr = 0, bbrr=0;


        if (Origin=="content-box") {
	    var b = this.getPxProp (cs.borderLeftWidth,0); x0+=b; w-=b;
	    b = this.getPxProp (cs.borderRightWidth,0); w-=b;
	    b = this.getPxProp (cs.borderTopWidth,0); y0+=b; h-=b;
	    b = this.getPxProp (cs.borderBottomWidth,0); h-=b;
	    var pl= this.getPxProp (cs.paddingLeft,0),
	    pt= this.getPxProp (cs.paddingTop,0),
	    pr= this.getPxProp (cs.paddingRight,0),
	    pb= this.getPxProp (cs.paddingBottom,0);
	    x0+=pl; w-=pl+pr;
	    y0+=pt; h-=pt+pb;
	} else  if (Origin=="border-box") {
	} else { /* Origin=="padding-box" */
	    var b = this.getPxProp (cs.borderLeftWidth,0); x0+=b; w-=b;
	    b = this.getPxProp (cs.borderRightWidth,0); w-=b;
	    b = this.getPxProp (cs.borderTopWidth,0); y0+=b; h-=b;
	    b = this.getPxProp (cs.borderBottomWidth,0); h-=b;
	}

        if (Clip=="padding-box" || Clip=="content-box") {
	    var b = this.getPxProp (cs.borderLeftWidth,0); clpx+=b; clpw-=b;
	    b = this.getPxProp (cs.borderRightWidth,0); clpw-=b;
	    b = this.getPxProp (cs.borderTopWidth,0); clpy+=b; clph-=b;
	    b = this.getPxProp (cs.borderBottomWidth,0); clph-=b;
	} 
	if (Clip=="content-box") {
	    var pl= this.getPxProp (cs.paddingLeft,0),
	    pt= this.getPxProp (cs.paddingTop,0),
	    pr= this.getPxProp (cs.paddingRight,0),
	    pb= this.getPxProp (cs.paddingBottom,0);
	    clpx+=pl; clpw-=pl+pr;
	    clpy+=pt; clph-=pt+pb;
	}
        if (Clip!="content-box" ) {
            var btlr = this.getPxProp (cs.borderTopLeftRadius,0),
	    btrr = this.getPxProp (cs.borderTopRightRadius,0),
	    bblr = this.getPxProp (cs.borderBottomLeftRadius,0),
	    bbrr = this.getPxProp (cs.borderBottomRightRadius,0);
	}
	var  drw=img.width, drh=img.height;

	if (size=="cover"){
	    var scale = w/drw;
	    if (h/drh > scale) scale=h/drh;
	    drw*=scale; drh*=scale;
	} else if (size=="contain"){
	    var scale = w/drw;
	    if (h/drh < scale) scale=h/drh;
	    drw*=scale; drh*=scale;
	} else if (typeof(size)=="string") {
	    var sa=size.split(/\s+/), sizex, sizey;
	    if (sa.length>=1) sizex=sa[0]; else sizex=drw+"px";
	    if (sa.length==2) sizey=sa[1]; else sizey="auto";

	    if (sizex=="auto") {
		if (sizey!="auto") {
		    var sy=this.getPxProp (sizey);
		    if (sizey.match(/[0-9.]*%/)) sy *= 0.01*h;
		    drw *= sy/drh; drh=sy;
		}
	    } else {
		var sx = this.getPxProp (sizex);
		if (sizex.match(/[0-9.]*%/)) sx *= 0.01*w;
		if  (sizey=="auto") {
		    drh *= sx/drw; drw=sx;
		} else {
		    drw=sx; drh=this.getPxProp (sizey);
		    if (sizey.match(/[0-9.]*%/)) drh *= 0.01*h;
		}
	    }
	}

	var xn=1, yn=1, xo=drw, yo=drh, i, j;


	if (typeof(Position)=="string") {
	    var pa=Position.split(/\s+/), posx="0px", posy="0px";
	    if (pa.length>=1) posx=pa[0];
	    if (pa.length==2) posy=pa[1];
	    var px = this.getPxProp (posx), py=this.getPxProp (posy);
	    if (posx.match(/[0-9.]*%/)) {
		x0 += px*0.01*(w-drw);
	    } else x0 +=  px;
	    if (posx.match(/[0-9.]*%/)) {
		y0 += py*0.01*(h-drh);
	    } else y0 +=  py;
	}




	xn = Math.ceil ( w / drw );
	yn = Math.ceil ( h / drh );


	if (typeof(Repeat)=="string") {
	    var ra=Repeat.split (/\s+/), repx, repy;
	    if (ra.length==0) repx="repeat";
	    if (ra.length>=1) repx=ra[0];
	    if (ra.length==2) repy=ra[1]; else repy=repx;

	    if (repx=="no-repeat") {	xn=1; }
	    if (repy=="no-repeat") {	yn=1; }
	    if (repx=="repeat-x")  {	yn=1; }
	    if (repx=="repeat-y")  {	xn=1; }

	    if (repx=="space")
		if (w>=2*drw) {
		    xn = Math.floor ( w / drw );
		    var used = xn*drw, free= w-used, fp= free/(xn-1);
		    xo = drw+fp;
		} else 
		    xn=1;
	    if (repy=="space")
		if (h>=2*drh) {
		    yn = Math.floor ( h / drh );
		    var used = yn*drh, free= h-used, fp= free/(yn-1);
		    yo = drh+fp;
		} else 
		    yn=1;
	    if (repx=="round")
		if (w>=drw) {
		    xn = Math.floor ( w / drw );
		    drw = w / xn; xo = drw;
		} else 
		    xn=1;
	    if (repy=="round")
		if (h>=drh) {
		    yn = Math.floor ( h / drh );
		    drh = h / yn; yo = drh;
		} else 
		    yn=1;
	}

	var t=	taccgl.texc, ww=0.5;
	t.save();
	{
	    t.beginPath();
	    /* top */
	    var d = (1-Math.sqrt(0.5))*btlr;
	    if (btlr>0) { t.moveTo ( clpx+d+ww,  clpy+d+ww ); t.arcTo ( clpx+d+d+ww,  clpy+ww, clpx+btlr+ww,clpy+ww, btlr ) }
	    else t.moveTo (clpx+ww,clpy+ww);
	    t.lineTo ( clpx+clpw - btrr-ww, clpy+ww );
   	    d = (1-Math.sqrt(0.5))*btrr;
	    if (btrr>0) { t.arcTo (   clpx+clpw-d-d-ww,  clpy+ww, clpx+clpw-d-ww, clpy+ww+d,  btrr ) } 
	    else t.lineTo ( clpx+clpw, clpy+ww );
  		
	    /* right side */
	    d = (1-Math.sqrt(0.5))*btrr;
	    if (btrr>0) { t.arcTo ( clpx+clpw-ww,  clpy+d+d+ww, clpx+clpw-ww, clpy+btrr+ww, btrr ) };
  	    t.lineTo ( clpx+clpw-ww, clpy+clph-bbrr-ww );
   	    d = (1-Math.sqrt(0.5))*bbrr;
	    if (bbrr>0) { t.arcTo (  clpx+clpw-ww,  clpy+clph-d-d-ww, clpx+clpw-d-ww, clpy+clph-ww-d,  bbrr ) };
		
	    /* bottom side */
	    d = (1-Math.sqrt(0.5))*bbrr;
	    if (bbrr>0) { t.arcTo (  clpx+clpw-d-d-ww,  clpy+clph-ww,  clpx+clpw - bbrr-ww,  clpy+clph-ww, bbrr ) }; 
	    t.lineTo ( clpx+ bblr+ww, clpy+clph-ww );
	    d = (1-Math.sqrt(0.5))*bblr;
	    if (bblr>0) { t.arcTo ( clpx+d+d+ww,  clpy+clph-ww,  clpx+d+ww, clpy+clph-d-ww,  bblr ) } 
		
	    /* left side */
   	    d = (1-Math.sqrt(0.5))*bblr;
	    if (bblr>0) { t.arcTo (  clpx+ww,  clpy+clph-d-d-ww, clpx+ww, clpy+clph-bblr, bblr ) };
		
	    t.lineTo ( clpx+ww, clpy+btlr+ww );
	    d = (1-Math.sqrt(0.5))*btlr;
	    if (btlr>0) { t.arcTo ( clpx+ww,  clpy+d+d+ww, clpx+ww+d, clpy+d+ww, btlr ) }
	    t.clip();
	}

	if (xn>1 && yn>1) {
	    /* clpx >= x0+xo*i0 => (clpx-x0)/xo >= i0 */
	    /* clpx+clpw <= x0+xo*i1+drw => (clpx+clpw-x0-drw) /xo <= i1 */
	    var i0 = Math.floor((clpx-x0)/xo), i1 = Math.ceil((clpx+clpw-x0-drw)/xo);
	    var j0 = Math.floor((clpy-y0)/yo), j1 = Math.ceil((clpy+clph-y0-drh)/yo);
            for (i=i0; i<=i1; i++) {
		for (j=j0; j<=j1; j++) {
		    taccgl.texc.drawImage(img, x0+xo*i, y0+yo*j, drw, drh);
		}
	    }
	} else if (xn==1 && yn==1) {
	    taccgl.texc.drawImage(img, x0, y0, drw, drh);
	} else if (xn==1 && yn>1) {
	    var j0 = Math.floor((clpy-y0)/yo), j1 = Math.ceil((clpy+clph-y0-drh)/yo);
	    for (j=j0; j<=j1; j++) {
		taccgl.texc.drawImage(img, x0, y0+yo*j, drw, drh);
	    }
	} else if (yn==1 && xn>1) {
	    var i0 = Math.floor((clpx-x0)/xo), i1 = Math.ceil((clpx+clpw-x0-drw)/xo);
            for (i=i0; i<=i1; i++) {
		taccgl.texc.drawImage(img, x0+xo*i, y0, drw, drh);
	    }
	}
	t.restore();

/*
        for (i=0; i<xn; i++) {
	    for (j=0; j<yn; j++) {
		taccgl.texc.drawImage(img, x0+xo*i, y0+yo*j, drw, drh);
	    }
	}
*/

//	taccgl.texc.drawImage(img, x, y, rect.width, rect.height);
    }

    this.getPxProp = function (s,d) {
	var r = parseInt (s);
	if (typeof (r) != 'number') return d;
        if (r<0) return d;
	return r;
    }

    this.paintBorder = function (el) { 
	var t=this.texc,
  	cs=getComputedStyle(el),
        c= cs.borderTopColor,cr;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    var btlr = this.getPxProp (cs.borderTopLeftRadius,0),
	        btrr = this.getPxProp (cs.borderTopRightRadius,0);

	    var w =  this.getPxProp (cs.borderTopWidth,0); var ww=w*0.5;
	    if (w>0) {
		var wi=el.offsetWidth, he= el.offsetHeight,x ,y;
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		    x+=this.scrollLeft; y+=this.scrollTop;

		} else {
                    // var par=el; x= el.offsetLeft, y=el.offsetTop;
                    // while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
                    var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop;
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w;
		var d = (1-Math.sqrt(0.5))*btlr;
		if (btlr>0) { t.moveTo ( x+d+ww,  y+d+ww ); t.arcTo ( x+d+d+ww,  y+ww, x+btlr+ww,y+ww, btlr ) } else t.moveTo (x,y+ww);
		t.lineTo ( x+wi - btrr-ww, y+ww );
		d = (1-Math.sqrt(0.5))*btrr;
		if (btrr>0) { t.arcTo (   x+wi-d-d-ww,  y+ww, x+wi-d-ww, y+ww+d,  btrr ) } else t.lineTo ( x+wi, y+ww );
		t.stroke();
	    }
	}
	c = cs.borderRightColor;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    btrr = this.getPxProp (cs.borderTopRightRadius,0);
	    var bbrr = this.getPxProp (cs.borderBottomRightRadius,0);
	    w =  this.getPxProp (cs.borderRightWidth,0); ww=w*0.5;
	    if (w>0) {
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    // var wi,he,x,y;
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=this.scrollLeft; y+=this.scrollTop;
		    // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    // par=el; x= el.offsetLeft, y=el.offsetTop, he=el.offsetHeight, wi=el.offsetWidth;
                    // while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
                    var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop, he=rect.height, wi=rect.width; 
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		x += wi;
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w;
		d = (1-Math.sqrt(0.5))*btrr;
		if (btrr>0) { t.moveTo ( x-d-ww,  y+d+ww ); t.arcTo ( x-ww,  y+d+d+ww, x-ww, y+btrr+ww, btrr ) } else t.moveTo (x-ww,y);
		t.lineTo ( x-ww, y+he-bbrr-ww );
		d = (1-Math.sqrt(0.5))*bbrr;
		if (bbrr>0) { t.arcTo (  x-ww,  y+he-d-d-ww, x-d-ww, y+he-ww-d,  bbrr ) } else t.lineTo ( x-ww, y+he);
		t.stroke();
	    }
	}
	c = cs.borderBottomColor;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    var bblr = this.getPxProp (cs.borderBottomLeftRadius,0);
  	    bbrr = this.getPxProp (cs.borderBottomRightRadius,0),
	    w =  this.getPxProp (cs.borderBottomWidth,0), ww=w*0.5;
	    if (w>0) {
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=this.scrollLeft; y+=this.scrollTop;
		    // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    // par=el, x= el.offsetLeft, y=el.offsetTop; he=el.offsetHeight; wi=el.offsetWidth;
                    // while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
                    var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop, he=rect.height, wi=rect.width; 
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w; y+=he;
		d = (1-Math.sqrt(0.5))*bblr;
		if (bblr>0) { t.moveTo ( x+d+ww,  y-d-ww ); t.arcTo ( x+d+d+ww,  y-ww, x+bblr+ww,y-ww, bblr ) } else t.moveTo (x,y-ww);
		t.lineTo ( x+wi - bbrr-ww, y-ww );
		d = (1-Math.sqrt(0.5))*bbrr;
		if (bbrr>0) { t.arcTo (   x+wi-d-d-ww,  y-ww, x+wi-d-ww, y-ww-d,  bbrr ) } else	t.lineTo ( x+wi, y-ww ); 
		t.stroke();
	    }
	}

	c = cs.borderLeftColor;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    btlr = this.getPxProp (cs.borderTopLeftRadius,0);
	    bblr = this.getPxProp (cs.borderBottomLeftRadius,0);

	    w =  this.getPxProp (cs.borderLeftWidth,0), ww=w*0.5;
	    if (w>0) {
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    // var wi, he, x,y;
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=this.scrollLeft; y+=this.scrollTop;
		    // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    // par=el, x= el.offsetLeft, y=el.offsetTop, he=el.offsetHeight, wi=el.offsetWidth;
                    // while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
                    var rect=el.getBoundingClientRect(); var x=rect.left+this.scrollLeft, y=rect.top+this.scrollTop, he=rect.height, wi=rect.width; 
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w;
		d = (1-Math.sqrt(0.5))*btlr;
		if (btlr>0) { t.moveTo ( x+d+ww,  y+d+ww ); t.arcTo ( x+ww,  y+d+d+ww, x+ww, y+btlr+ww, btlr ) } else t.moveTo (x+ww,y);
		t.lineTo ( x+ww, y+he-bblr-ww );
		d = (1-Math.sqrt(0.5))*bblr;
		if (bblr>0) { t.arcTo (   x+ww,  y+he-d-d-ww, x+d+ww, y+he-ww-d,  bblr ) } else t.lineTo ( x+ww, y+he);
		t.stroke();
	    }
	}
     }

    this.paintImg = function (el) {
	var cs=getComputedStyle(el),
	    pl= this.getPxProp (cs.paddingLeft,0),
	    pt= this.getPxProp (cs.paddingTop,0),
	    pr= this.getPxProp (cs.paddingRight,0),
	    pb= this.getPxProp (cs.paddingBottom,0);
        // par=el, x0=el.clientLeft+el.offsetLeft, y0= el.clientTop+el.offsetTop;
	// while (par.offsetParent) { par=par.offsetParent; x0+=par.offsetLeft; y0+=par.offsetTop;}
        var rect=el.getBoundingClientRect(); var x0=rect.left+this.scrollLeft, y0=rect.top+this.scrollTop; 


//	taccgl.texc.drawImage(el, x0+pl, y0+pt, el.clientWidth-pl-pr, el.clientHeight-pt-pb );
	taccgl.texc.drawImage(el, x0+pl, y0+pt, rect.width-pl-pr, rect.height-pt-pb );
    }
    this.paintSVG = function (el) {
	var cs=getComputedStyle(el),
	    pl= this.getPxProp (cs.paddingLeft,0),
	    pt= this.getPxProp (cs.paddingTop,0),
	    pr= this.getPxProp (cs.paddingRight,0),
	    pb= this.getPxProp (cs.paddingBottom,0);
        var rect=el.getBoundingClientRect(); var x0=rect.left+this.scrollLeft, y0=rect.top+this.scrollTop; 
  	taccgl.texc.drawImage(el.taccgl.img, x0+pl, y0+pt, rect.width-pl-pr, rect.height-pt-pb );
    }

    this.paintElementInt = function (el,ignoreHidden,dofloat) {
	var needsRestore=false;
	if (!(this.ddmode || this.dddmode)) return;
       this.markCanvasChanged();
       if (typeof (el)=="string") el=document.getElementById(el);
       if (el.nodeType==3) {
	   this.paintTextNode(el);
       } else if (el.nodeType==1) {
  	   var cs=getComputedStyle(el);
	   if (el.style.visibility=='hidden' && !ignoreHidden) return;
	   if (cs.display== 'none') return;
	   var fl=cs.getPropertyValue("float");
	   if (fl!='none' && fl+''!="undefined" && !dofloat) {this.elToPaint.push(el); return; }
	   	   
//	   if (el.id=='MOvery_fast')
//	       var breakhere=1;
	   if (el.style.visibility!='visible' && !ignoreHidden) {
	       if (!this.hiddenClasses) this.calcHiddenClasses();
               var cnstr = el.className;
               if (typeof cnstr=="string"){
		   var cns = cnstr.split(" "), i;
		   for (i=0; i<cns.length; i++) {
		       var c=cns[i];
		       if (this.hiddenClasses["."+c]=='hidden') return;
		       if (this.hiddenClasses[(el.tagName.toUpperCase()+"."+c)]=='hidden') return;
		       if (this.hiddenClasses["#"+el.id]=='hidden') return;
		   }
	       }
	   }
	   
	   var t;
	   if ( ((t=cs.webkitTransform) || (t=cs.mozTransform) || (t=cs.msTransform) || (t=cs.transform)) && (t!="none") ) {
	       needsRestore=true;
	       this.texc.save();
	       var m;
	       var savekind, to;
	       if ( t = cs.transform) { m= taccgl.m32Parse(t); to=cs.transformOrigin; savekind="trans"; el.style.transform="none";} else
		   if ( t = cs.webkitTransform) { m= taccgl.m32Parse(t); to=cs.webkitTransformOrigin; savekind="webkit";el.style.webkitTransform= "none";} else 
		       if ( t = cs.mozTransform) { m= taccgl.m32Parse(t);to=cs.mozTransformOrigin; savekind="moz";el.style.mozTransform= "none"; } else
			   if ( t = cs.mstTransform) { m= taccgl.m32Parse(t);to=cs.msTransformOrigin; savekind="ms"; el.style.msTransform= "none";}
	       var savetrans="matrix("+m[0].toFixed(20)+","+m[3].toFixed(20)+","+m[1].toFixed(20)+","+ m[4].toFixed(20)+","+ m[2].toFixed(20)+","+ m[5].toFixed(20)+")";
               var toa=to.split(" ");
	       var tox=parseFloat(toa[0]), toy=parseFloat(toa[1]);
//	       var savetrans= el.style.webkitTransform; el.style.webkitTransform= "none";
	       var cr=el.getClientRects();
	       var x = cr[0].left, y = cr[0].top;
	       x+=this.scrollLeft; y+=this.scrollTop;
               // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
	       if (taccgl_debug_paint) {
		   taccgl.clog(cr[0]); taccgl.clog (t); taccgl.clog(m); taccgl.clog(toa);
	       }  // taccgl_debug_end
//	       this.texc.translate( 50,50 );
	       this.texc.translate( x+tox, y+toy); 
	       this.texc.transform (m[0], m[3], m[1], m[4], m[2], m[5]);
//	       this.texc.transform (1, 0, 0, 2, 0, 0);
//	       this.texc.transform (0, 1, 1, 0, 0, 0);
	       this.texc.translate( -x-tox, -y-toy);
	   }
	   this.paintBackground(el); this.paintBorder(el);

	   var n=el.tagName.toLowerCase();
           if (n=="img") { this.paintImg(el)} else 
           if (n=="svg") { this.paintSVG(el);
	   }
       }

       c=el.firstChild;
       while (c) {
	   this.paintElementInt(c,false,false);
	   c=c.nextSibling;
       }
	if (needsRestore) {
	    this.texc.restore();
	    if (savekind=="trans") el.style.transform=savetrans;
	    else if (savekind=="webkit")  el.style.webkitTransform=savetrans;
	    else if (savekind=="moz")  el.style.mozTransform=savetrans;
	    else if (savekind=="ms")  el.style.msTransform=savetrans;
	}
    }

    this.paintElement = function (el,ignoreHidden) {
        this.autoDetectScroll();
	this.elToPaint=Array(0);
	this.paintElementInt (el,ignoreHidden);
	var i=0;
	while (i<this.elToPaint.length) {
	    var igh=false;
	    if (this.elToPaint[i]==el) igh=ignoreHidden;
	    this.paintElementInt (this.elToPaint[i],igh,true);
	    i++;
	}
	this.elToPaint=null;
    }
    this.prepareBackground = function (el) { 
	var i,cs=getComputedStyle(el),
	    sImage = cs.backgroundImage.split (/\s*,\s*/);

	for (i=0; i<sImage.length; i++) {
	    var u = sImage[i];
	    if (u!="none") {
		var url = u.replace (/url\("([^)]*)"\)/,"$1"),
		img = this.newImageEntry (url);
	    }
	}
    }
    this.prepareImg = function (el) {
	if (!el.complete) {
	    this.createCurPaintJob();
	    var job = 	this.curPaintJob; job.incWait();
	    var ponload=el.onload;
	    el.onload = function () { el.onload=ponload; job.decWait(); taccgl.jobScheduleAll(); if (ponload) ponload(); }
	}
    }
    this.prepareSVG = function (el) {
        var t = el.outerHTML;
/*        var t = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 300 300">' +
               '<circle cx="10" cy="10"  r="250"  fill="red" stroke="black"></circle> '+
           '</svg>';
*/
        t= t.replace (/svg/,'svg xmlns="http://www.w3.org/2000/svg"');
        t= t.replace (/width\s*=\s*"[0-9]+%"/,'width="'+el.clientWidth+'px"');
        t= t.replace (/height\s*=\s*"[0-9]+%"/,'height="'+el.clientHeight+'px"');

        var img = new Image(el.clientWidth, el.clientHeight);
        var blob = new Blob([t], {type: 'image/svg+xml;charset=utf-8'});
        var texc =  taccgl.texc;
        var u = (window.URL || window.webkitURL || window) . createObjectURL(blob);
//        u = "http://taccgl.h-e-i.de/pic/taccglLogo-o.png";
        img.src = u;
	this.createCurPaintJob();
	var job = this.curPaintJob; job.incWait();
	img.onload = function () { img.onload=null; job.decWait(); taccgl.jobScheduleAll(); }
	this.taccglAttach(el); el.taccgl.img=img;
    }
    this.prepareElementInt = function (el,ignoreHidden,dofloat) {
       if (!(this.ddmode || this.dddmode)) return;
       if (typeof (el)=="string") el=document.getElementById(el);
       if (el+""=="undefined") 
	   { var t=45 }
       if (el.nodeType==3) {
	   // this.prepareTextNode(el);
       } else if (el.nodeType==1) {
  	   var cs=getComputedStyle(el);
	   if (el.style.visibility=='hidden' && !ignoreHidden) return;
	   if (cs.display== 'none') return;
	   var fl=cs.getPropertyValue("float");
	   if (fl!='none' && fl+''!="undefined" && !dofloat) {this.elToPrepare.push(el); return; }
	   	   
//	   if (el.id=='MOvery_fast')
//	       var breakhere=1;
	   if (el.style.visibility!='visible' && !ignoreHidden) {
	       if (!this.hiddenClasses) this.calcHiddenClasses();
               var cnstr = el.className;
               if (typeof cnstr=="string"){
		   var cns = cnstr.split(" "), i;
		   for (i=0; i<cns.length; i++) {
		       var c=cns[i];
		       if (this.hiddenClasses["."+c]=='hidden') return;
		       if (this.hiddenClasses[(el.tagName.toUpperCase()+"."+c)]=='hidden') return;
		       if (this.hiddenClasses["#"+el.id]=='hidden') return;
		   }
	       }
	   }
	   
	   this.prepareBackground(el); 
	   // this.prepareBorder(el);

	   var n=el.tagName.toLowerCase();
           if (n=="img") { this.prepareImg(el)} else 
           if (n=="svg") { this.prepareSVG(el);
	   }
       }

       c=el.firstChild;
       while (c) {
	   this.prepareElementInt(c,false,false);
	   c=c.nextSibling;
       }
    }

    this.createCurPaintJob = function () {
	if (!this.curPaintJob) 	this.curPaintJob = this.newJob (null);
    }

    this.prepareElement = function (el,ignoreHidden) {
	this.curPaintjob=null;
	if (taccgl.prevPaintJob)  this.createCurPaintJob();
        this.autoDetectScroll();
	this.elToPrepare=Array(0);
	this.prepareElementInt (el,ignoreHidden);
	var i=0;
	while (i<this.elToPrepare.length) {
	    this.prepareElementInt (this.elToPrepare[i],false,true);
	    i++;
	}
	this.elToPrepare=null;
    }

    this.prePaintElement = function (el,ignoreHidden,canvas,pre,post) {
// When a paint call of an HTML element needs painting of an image that is not present yet, 
// the complete paint call is packed into a job and performed later when the image 
// is there. For the complete paint call a new job is created to perform that paint call 
// using newJob in createCurPaintJob and incWait is called to make the job
// wait. The onload handler of the image then calls decWait and jobScheduleAll
// to unblock the job and to perform it and dependent jobs.
// If a paint call requires multiple images incWait is called for each image
// just counting the number of images needed. Each onload handler decreases
// the counter and when all images are loaded the paint call is done. 
//
// if a paint call is waiting all subsequent paint calls will wait on it as well, since
// the order of paint calls may be importatnt. taccgl.prevPaintJob contains the 
// previous pending paint job and if set new paint calls create a job and use waitFor
// to wait on the previous paint job.

	this.prepareElement (el, ignoreHidden);  // walk the DOM and find any missinge images
	if (this.curPaintJob) {  // if there were any the curPaintJob is set, finalize it
	    this.curPaintJob . f = function () {
		taccgl.texTo (canvas);	
		if (typeof(pre)=="function") pre();
		taccgl.paintElement (el,ignoreHidden);
		if (typeof(post)=="function") post();
		if (taccgl.prevPaintJob==this) taccgl.prevPaintJob=null;
	    }
	    if (this.prevPaintJob) {
		this.curPaintJob.waitFor (this.prevPaintJob); 
	    }
	    this.prevPaintJob= this.curPaintJob;
	    this.curPaintJob = null;
	}
	if (!this.prevPaintJob) {
	    taccgl.texTo (canvas);	
	    if (typeof(pre)=="function") pre(); 
	    this.paintElement (el,ignoreHidden);
	    if (typeof(post)=="function") post();
	}
    }

    this.hiddenClassesConstr= function () {}
    this.calcHiddenClasses = function () {
	this.hiddenClasses = new this.hiddenClassesConstr();
	var ss = window.document.styleSheets, i,s;
        for (i=0; i<ss.length; i++) {
	    s = ss[i];
	    if (!s.disabled && s.type=="text/css") {
		var j,r;
		for (j=0; j<s.cssRules.length; j++) {
		    r = s.cssRules[j];
		    if (r.selectorText && r.selectorText.match (/([^.:]*\.[^.:]+)|(#[^.:]+)/)) {
			this.hiddenClasses[r.selectorText]=r.style.visibility;
		    }
		}
	    }
	}

    }

    this.taccglAttachment = function (){
	this.delno=taccgl.delno;
    }

    this.taccglAttach = function (el) {
	if (el.taccgl && el.taccgl.delno==this.delno) return;
	if (!el.taccgl) { 
	    var t;
	    t = new this.taccglAttachment();
	    el.taccgl = t;
	}
	el.taccgl.delno=taccgl.delno;
	el.taccgl.preVisibility=el.taccgl.postVisibility=el.taccgl.preOpacity=el.taccgl.postOpacity=null;
	el.taccgl.asShadow=null;
    }
    // Image Handler
    this.createImageTable = function () {}
    this.imageTable = new this.createImageTable();
    this.newImageEntry = function (u) {
	var t;
	if ((t=this.imageTable[u])) {
	    if (t.complete) return t;
	    this.createCurPaintJob();
	    var job = this.curPaintJob; job.incWait();
	    var ponload=t.onload;
	    t.onload = function () { t.onload=ponload; job.decWait(); taccgl.jobScheduleAll(); if (ponload) ponload();  }
	}
	var img = new Image ();
	img.src = u;
	this.createCurPaintJob();
	var job = this.curPaintJob; job.incWait();
	img.onload = function () { img.onload=null; job.decWait(); taccgl.jobScheduleAll(); }
	this.imageTable[u]=img;
    }

    // Math utilities

    this.vAdd= this.mAdd= function (a,b){
	var r=a.slice();
	for (var i=0; i<a.length; i++) r[i]+=b[i];
	return r;
    }
    this.vSub= this.mSub= function (a,b){
	var r=a.slice();
	for (var i=0; i<a.length; i++) r[i]-=b[i];
	return r;
    }
    this.vNeg= this.mNeg = function (a){
	var r=a.slice();
	for (var i=0; i<a.length; i++) r[i]*=-1;
	return r;
    }
    this.vMulS= this.mMulS = function (a,b){
	var r=a.slice();
	for (var i=0; i<a.length; i++) r[i]*=b;
	return r;
    }
    this.viAdd= this.miAdd= function (a,b){
	for (var i=0; i<a.length; i++) a[i]+=b[i];
	return a;
    }
    this.viSub= this.miSub= function (a,b){
	for (var i=0; i<a.length; i++) a[i]-=b[i];
	return a;
    }
    this.viNeg= this.miNeg = function (a){
	for (var i=0; i<a.length; i++) a[i]*=-1;
	return a;
    }
    this.viMulS= this.miMulS = function (a,b){
	for (var i=0; i<a.length; i++) a[i]*=b;
	return a;
    }


    // Matrixes are stored in arrays in row major order
    this.m32IConst = [1,0,0,0,1,0];
    this.m32I = function () { return this.m32IConst.slice(0);} 
    this.mi32Add = function (a,b) {
	a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];a[3]+=b[3];
	a[4]+=b[4];a[5]+=b[5];return a;
    }
    this.m32Add = function (a,b) {
	return [
	    a[0]+b[0], a[1]+b[1], a[2]+b[2],
	    a[3]=b[3], a[4]+b[4], a[5]+=b[5] ];
    }
    this.m32Mulx = function (m,v) { var a=m; return a[0]*v[0]+a[1]*v[1]+a[2]; }
    this.m32Muly = function (m,v) { var a=m; return a[3]*v[0]+a[4]*v[1]+a[5]; }
    this.m32Parse = function (t) {
	var regex= /matrix\(([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*)\)/;
	var a=regex.exec(t);
	if (a && a.length==7) {
	    return ([ parseFloat(a[1]), parseFloat(a[3]),parseFloat(a[5]),parseFloat(a[2]),parseFloat(a[4]),parseFloat(a[6])] );
	}
	return null;
    }

    this.m33IConst = [1,0,0,0,1,0,0,0,1];
    this.m33I = function () { return this.m33IConst.slice(0);}
    this.mi33Add = function (a,b) {
	a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];a[3]+=b[3];
	a[4]+=b[4];a[5]+=b[5];a[6]+=b[6];a[7]+=b[7];a[8]+=b[8];return a;
    }
    this.m33Add = function (a,b) {
	return [
	    a[0]+b[0], a[1]+b[1], a[2]+b[2],
	    a[3]+b[3], a[4]+b[4], a[5]+b[5],
	    a[6]+b[6], a[7]+b[7], a[8]+b[8] ]
    }
    this.mi33Mul = function (a,b) {
	var x=a[0]*b[0]+a[1]*b[3]+a[2]*b[6];
	var y=a[0]*b[1]+a[1]*b[4]+a[2]*b[7];
	var z=a[0]*b[2]+a[1]*b[5]+a[2]*b[8];
	a[0]=x; a[1]=y; a[2]=z;
	x= a[3]*b[0]+a[4]*b[3]+a[5]*b[6];
	y= a[3]*b[1]+a[4]*b[4]+a[5]*b[7];
	z= a[3]*b[2]+a[4]*b[5]+a[5]*b[8];
	a[3]=x; a[4]=y; a[5]=z;
	x= a[6]*b[0]+a[7]*b[3]+a[8]*b[6];
	y= a[6]*b[1]+a[7]*b[4]+a[8]*b[7];
	z= a[6]*b[2]+a[7]*b[5]+a[8]*b[8];
	a[6]=x; a[7]=y; a[8]=z; return a;
    }
    this.m33Mul = function (a,b) {
	return [ 
	    a[0]*b[0]+a[1]*b[3]+a[2]*b[6], a[0]*b[1]+a[1]*b[4]+a[2]*b[7], a[0]*b[2]+a[1]*b[5]+a[2]*b[8],
	    a[3]*b[0]+a[4]*b[3]+a[5]*b[6], a[3]*b[1]+a[4]*b[4]+a[5]*b[7], a[3]*b[2]+a[4]*b[5]+a[5]*b[8],
	    a[6]*b[0]+a[7]*b[3]+a[8]*b[6], a[6]*b[1]+a[7]*b[4]+a[8]*b[7], a[6]*b[2]+a[7]*b[5]+a[8]*b[8] ];
    }
    this.mi33MulV = function (a,v){
	return  [ a[0]*v[0]+a[1]*v[1]+a[2]*v[2], 
		  a[3]*v[0]+a[4]*v[1]+a[5]*v[2],
		  a[6]*v[0]+a[7]*v[1]+a[8]*v[2] ]
    }
    this.mi33T = function(a) {
	var x=a[3];a[3]=a[1];a[1]=x;
	x=a[2];a[2]=a[6];a[6]=x;
	x=a[5];a[5]=a[7];a[7]=x;return a;
    }
    this.m33T = function(a) {
	return [ a[0], a[3], a[6],
		 a[1], a[4], a[7],
		 a[2], a[5], a[8] ];
    }
    taccgl.m33Det = function(a) {
	return a[0]*(a[4]*a[8]-a[5]*a[7])-a[1]*(a[3]*a[8]-a[5]*a[6])+a[2]*(a[3]*a[7]-a[4]*a[6]);
    }
    this.m33Inverse = function(a) {
	var d=a[0]*(a[4]*a[8]-a[5]*a[7])-a[1]*(a[3]*a[8]-a[5]*a[6])+a[2]*(a[3]*a[7]-a[4]*a[6]);
	var di=1/d;
	return [(a[4]*a[8]-a[5]*a[7])*di, (a[2]*a[7]-a[1]*a[8])*di, (a[1]*a[5]-a[2]*a[4])*di,
		(a[5]*a[6]-a[3]*a[8])*di, (a[0]*a[8]-a[2]*a[6])*di, (a[2]*a[3]-a[0]*a[5])*di,
		(a[3]*a[7]-a[4]*a[6])*di, (a[1]*a[6]-a[0]*a[7])*di, (a[0]*a[4]-a[1]*a[3])*di];
    }
    this.mi33Negate = function(a) {
	a[0]=-a[0];a[1]=-a[1];a[2]=-a[2];a[3]=-a[3];
	a[4]=-a[4];a[5]=-a[5];a[6]=-a[6];a[7]=-a[7];a[8]=-a[8]; return a;
    }
    this.m33Negate = function(a) {
	return [ -a[0], -a[1], -a[2], -a[3],
		 -a[4], -a[5], -a[6], -a[7], -a[8]];
    }
    this.m33Rotation = function(alpha,av){
	var s = Math.sin(alpha), c=Math.cos(alpha), mc=1-c, ax=av[0], ay=av[1], az=av[2];
	return [c+ax*ax*mc,        ax*ay*mc-az*s,    ax*az*mc+ay*s,
                ax*ay*mc+az*s,     c+ay*ay*mc,       ay*az*mc-ax*s,
                az*ax*mc-ay*s,     az*ay*mc+ax*s,    c+az*az*mc]
    }

    this.m33ToString=function (a){
	return '['+a[0]+',\t'+a[1]+',\t'+a[2]+',\n'+a[3]+',\t'+a[4]+',\t'+a[5]+',\n'+a[6]+',\t'+a[7]+',\t'+a[8]+']'
    }
    if (taccgl_debug) {
	this.m33Test=function(){
	    taccgl.clog (this.m33ToString(this.m33I()));
	    taccgl.clog (this.m33ToString(this.mi33Add(this.m33I(),this.m33I())));
	    taccgl.clog (this.m33ToString(this.mi33Mul(this.m33I(),this.mi33Add(this.m33I(),this.m33I()))));
	    taccgl.clog (this.m33ToString(this.mi33Mul([1,2,3,4,5,6,7,8,9],[1,0,0,1,0,0,1,0,0])));
	    taccgl.clog (this.m33ToString(this.m33Inverse(this.m33I())));
	    var i = this.m33Inverse([1,2,3,4,5,6,7,9,8]);
	    taccgl.clog (this.m33ToString(i));
	    taccgl.clog (this.m33ToString(this.mi33Mul([1,2,3,4,5,6,7,9,8],i)));
	}
	// this.m33Test();
	
    } // taccgl_debug_end

    this.m44IConst = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    this.m44I = function () { return this.m44IConst.slice(0);}
    this.mi44Add = function (a,b) {
	a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];a[3]+=b[3];
	a[4]+=b[4];a[5]+=b[5];a[6]+=b[6];a[7]+=b[7];a[8]+=b[8];
	a[9]+=b[9];a[10]+=b[10];a[11]+=b[11];a[12]+=b[12];a[13]+=b[13];
	a[14]+=b[14];a[15]+=b[15];
	return a;
    }
    this.m44Add = function (a,b) {
	return [ a[0]+b[0],a[1]+b[1],a[2]+b[2],a[3]+b[3],
	a[4]+b[4],a[5]+b[5],a[6]+b[6],a[7]+b[7],a[8]+b[8],
	a[9]+b[9],a[10]+b[10],a[11]+b[11],a[12]+b[12],a[13]+b[13],
	a[14]+b[14],a[15]+b[15] ];
    }
    this.mi44Mul = function (a,b) {
	var x=a[0]*b[0]+a[1]*b[4]+a[2]*b[8]+a[3]*b[12];
	var y=a[0]*b[1]+a[1]*b[5]+a[2]*b[9]+a[3]*b[13];
	var z=a[0]*b[2]+a[1]*b[6]+a[2]*b[10]+a[3]*b[14];
	var w=a[0]*b[3]+a[1]*b[7]+a[2]*b[11]+a[3]*b[15];
	a[0]=x; a[1]=y; a[2]=z; a[3]=w;
	x=a[4]*b[0]+a[5]*b[4]+a[6]*b[8]+a[7]*b[12];
	y=a[4]*b[1]+a[5]*b[5]+a[6]*b[9]+a[7]*b[13];
	z=a[4]*b[2]+a[5]*b[6]+a[6]*b[10]+a[7]*b[14];
	w=a[4]*b[3]+a[5]*b[7]+a[6]*b[11]+a[7]*b[15];
	a[4]=x; a[5]=y; a[6]=z; a[7]=w;
	x=a[8]*b[0]+a[9]*b[4]+a[10]*b[8]+a[11]*b[12];
	y=a[8]*b[1]+a[9]*b[5]+a[10]*b[9]+a[11]*b[13];
	z=a[8]*b[2]+a[9]*b[6]+a[10]*b[10]+a[11]*b[14];
	w=a[8]*b[3]+a[9]*b[7]+a[10]*b[11]+a[11]*b[15];
	a[8]=x; a[9]=y; a[10]=z; a[11]=w;
	x=a[12]*b[0]+a[13]*b[4]+a[14]*b[8]+a[15]*b[12];
	y=a[12]*b[1]+a[13]*b[5]+a[14]*b[9]+a[15]*b[13];
	z=a[12]*b[2]+a[13]*b[6]+a[14]*b[10]+a[15]*b[14];
	w=a[12]*b[3]+a[13]*b[7]+a[14]*b[11]+a[15]*b[15];
	a[12]=x; a[13]=y; a[14]=z; a[15]=w; return a;
    }
    this.m44Mul = function (a,b) {
	return [
	a[0]*b[0]+a[1]*b[4]+a[2]*b[8]+a[3]*b[12],
	a[0]*b[1]+a[1]*b[5]+a[2]*b[9]+a[3]*b[13],
	a[0]*b[2]+a[1]*b[6]+a[2]*b[10]+a[3]*b[14],
	a[0]*b[3]+a[1]*b[7]+a[2]*b[11]+a[3]*b[15],

	a[4]*b[0]+a[5]*b[4]+a[6]*b[8]+a[7]*b[12],
	a[4]*b[1]+a[5]*b[5]+a[6]*b[9]+a[7]*b[13],
	a[4]*b[2]+a[5]*b[6]+a[6]*b[10]+a[7]*b[14],
	a[4]*b[3]+a[5]*b[7]+a[6]*b[11]+a[7]*b[15],
	
	a[8]*b[0]+a[9]*b[4]+a[10]*b[8]+a[11]*b[12],
	a[8]*b[1]+a[9]*b[5]+a[10]*b[9]+a[11]*b[13],
	a[8]*b[2]+a[9]*b[6]+a[10]*b[10]+a[11]*b[14],
	a[8]*b[3]+a[9]*b[7]+a[10]*b[11]+a[11]*b[15],
	
	a[12]*b[0]+a[13]*b[4]+a[14]*b[8]+a[15]*b[12],
	a[12]*b[1]+a[13]*b[5]+a[14]*b[9]+a[15]*b[13],
	a[12]*b[2]+a[13]*b[6]+a[14]*b[10]+a[15]*b[14],
	a[12]*b[3]+a[13]*b[7]+a[14]*b[11]+a[15]*b[15]
	];
    }
    this.mi44MulV = function (a,v){
	return  [ a[0]*v[0]+a[1]*v[1]+a[2]*v[2]+a[3]*v[3], 
		  a[4]*v[0]+a[5]*v[1]+a[6]*v[2]+a[7]*v[3],
		  a[8]*v[0]+a[9]*v[1]+a[10]*v[2]+a[11]*v[3],
		  a[12]*v[0]+a[13]*v[1]+a[14]*v[2]+a[15]*v[3] ]
    }
    // this.mxxMulS = function (a,s){
	// for (i=0; i<a.length; i++) a[i]*=s;
	// return a;
    // }
    this.m33FromM44=function (a) {
	return [a[0],a[1],a[2],a[4],a[5],a[6],a[8],a[9],a[10]];
    }
    this.mi33FromM44=function (r,a) {
	r[0]=a[0]; r[1]=a[1]; r[2]=a[2];
	r[3]=a[4]; r[4]=a[5]; r[5]=a[6];
	r[6]=a[8]; r[7]=a[9]; r[8]=a[10]; return r;
    }
    this.mi33FromM44T=function (r,a) {
	r[0]=a[0]; r[1]=a[4]; r[2]=a[8];
	r[3]=a[1]; r[4]=a[5]; r[5]=a[9];
	r[6]=a[2]; r[7]=a[6]; r[8]=a[10]; return r;
    }
     /* this is probably not needed any more
    this.m44FromM33s = function (a,x,y,z) {
	return [a[0],a[1],a[2],x, 
                a[3],a[4],a[5],y, 
		a[6],a[7],a[8],z,
	        0,0,0,1]
    }
    */
    this.m44FromM33 = function (a,v) {
	return [a[0],a[1],a[2],v[0], 
                a[3],a[4],a[5],v[1], 
		a[6],a[7],a[8],v[2],
	        0,0,0,1]
    }
    /* this is probably not needed any more 
    this.m44FromM33VT = function (a,v) {
	return [a[0],a[1],a[2],0, 
                a[3],a[4],a[5],0, 
		a[6],a[7],a[8],0,
	        v[0],v[1],v[2],1]
    }
    */
    this.m44FromM33C = function (a,c,t) {
	// create a translation matrix that performs the liner transformation a around center
	// point c and if given performs an additional translation t
	var v=taccgl.mi33MulV(a,c);
	if (t)
	    return [a[0],a[1],a[2],c[0]-v[0]+t[0], 
                    a[3],a[4],a[5],c[1]-v[1]+t[1], 
		    a[6],a[7],a[8],c[2]-v[2]+t[2],
	            0,0,0,1]
	else
	    return [a[0],a[1],a[2],c[0]-v[0], 
                    a[3],a[4],a[5],c[1]-v[1], 
		    a[6],a[7],a[8],c[2]-v[2],
	            0,0,0,1]
    }
    taccgl.mi44Scale = function (m,s) {
	m[0]*=s;m[1]*=s;m[2]*=s;
	m[4]*=s;m[5]*=s;m[6]*=s;
	m[8]*=s;m[9]*=s;m[10]*=s;
	return m;
    }
    taccgl.m44Scale = function (m,s) {
	return [
	    m[0]*s,m[1]*s,m[2]*s,
	    m[4]*s,m[5]*s,m[6]*s,
	    m[8]*s,m[9]*s,m[10]*s ];
    }
    this.m44Translation = function (x,y,z) {
	return [1,0,0,x,
	        0,1,0,y,
	        0,0,1,z,
	        0,0,0,1]
    }
    this.mi44T = function(a) {
	var x=a[1];a[1]=a[4];a[4]=x;
	x=a[2];a[2]=a[8];a[8]=x;
	x=a[3];a[3]=a[12];a[12]=x;
	x=a[6];a[6]=a[9];a[9]=x;
	x=a[7];a[7]=a[13];a[13]=x;
	x=a[11];a[11]=a[14];a[14]=x;
	return a;
    }
    this.m44T = function(a) {
	return [
	    a[0], a[4], a[8], a[12],
	    a[1], a[5], a[9], a[13],
	    a[2], a[6], a[10], a[14],
	    a[3], a[7], a[11], a[15] ]
    }
    taccgl.mAffInverse = function (a) {
	var R = taccgl.m33FromM44 (a);
	var S = taccgl.m33Inverse (R);
	var t = taccgl.viNeg(taccgl.mi33MulV(S,taccgl.m44TransV(a)));
	return taccgl.m44FromM33(S,t);
    }
    this.m44TransV = function (a) {
	return [a[3],a[7],a[11]];
    }
/*  does not seem to be used any more    
    this.m44TransVT = function (a) {
	return [a[12],a[13],a[14]];
    }
*/
    /* was just an experiment
    this.vInclination= function (x,y,z){
	return Math.atan(Math.sqrt(x*x+y*y)/z);   // classical formula
    }
    this.vInclinationYZ= function (x,y,z){
//	taccgl.tlog(Math.sqrt(x*x+z*z)/y);
	var g = Math.atan2(Math.sqrt(x*x+z*z),y);   // with exchanged z and y axis
//	if (g<0) g+=Math.PI;
	return g;
    }
    this.vAzimuth = function (x,y,z){             // classical formula
	var g= Math.atan2(y,x);
	if (g<0) g+=2*Math.PI;
	return g;
    }
    this.vAzimuthYZ = function (x,y,z){             // with exchanged z and y axis
	var g=Math.atan2(z,x)+Math.PI/2;
	if (g>Math.PI) g-=2*Math.PI;
	return g;
    }
    */

    this.clamp = function (v,mi,ma){
	return Math.max (mi, Math.min (v,ma));
    }
/*  was just an experiment
    this.m33FromSpherical = function (s,az,incl,inclO) {
	var m = this.m33Rotation(-az, [0,1,0]);
        var im =  this.m33Rotation(Math.PI/2-incl, [1,0,0]);
	this.mi33Mul (im,m);
       	this.mi33Mul (im, this.m33Rotation(Math.PI/2-inclO, [0,0,1]));
	return im;
    }
*/

/* first Version
    taccgl.m33ToEulerAngles = function (m) {
	var a = {
	    yaw : Math.atan2(m[3],m[0]),
	    pitch : -Math.asin(m[6]),
	    roll: Math.atan2(m[7],m[8]),
	}
	return a;
    }
*/
    taccgl.m33ToEulerAngles = function (m) {
	var d = taccgl.m33Det(m);
	var scale = Math.pow(d,1/3);
	var e = 1/scale;
	// compute euler angles
	// gimbal lock not implemented 
	var a = {
//	    yaw : Math.atan2(m[6],m[0]),
//	    yaw : Math.atan2(m[6],m[8]),
	    yaw : Math.atan2(-m[2]*e,m[8]*e),
	    pitch : -Math.asin(-m[5]*e),
	    roll: Math.atan2(m[3]*e,m[4]*e),
	    scale: scale,
	}
	return a;
    }
    
/* first version worked for passive
    this.m33FromEulerAngles = function (a) {
	var f =  this.m33Rotation(a.yaw,   [0,1,0])
	var m =  this.m33Rotation(a.roll,  [0,0,1]);
        var im = this.m33Rotation(a.pitch, [1,0,0]);
	this.mi33Mul (im,m);
       	this.mi33Mul (im,f);
	return im;
    }
*/

    this.m33FromEulerAngles = function (a) {
	var f =  this.m33Rotation(a.roll,   [0,0,1]);
	var m =  this.m33Rotation(-a.pitch, [1,0,0]);
        var im = this.m33Rotation(-a.yaw,   [0,1,0]);
	this.mi33Mul (im,m);
       	this.mi33Mul (im,f);
	taccgl.miMulS (im,a.scale);
	return im;
    }


    this.m44ToString=function (a){
	return '['+a[0]+',\t'+a[1]+',\t'+a[2]+',\t'+a[3]+',\n'+a[4]+',\t'+a[5]+',\t'+a[6]+',\t'+a[7]+',\n'
	    +a[8]+',\t'+a[9]+',\t'+a[10]+',\t'+a[11]+',\n'+a[12]+',\t'+a[13]+',\t'+a[14]+',\t'+a[15]+']';
    }
    this.vToString=function(v){
	var s= '['+v[0];
	for (var i=1; i<v.length; i++) s+=',\t '+v[i];
	return s+']';
    }
    if (taccgl_debug) {
	this.m44Test=function(){
	    taccgl.clog (this.m44ToString(this.m44I()));
	    taccgl.clog (this.m44ToString(this.mi44Add(this.m44I(),this.m44I())));
	    taccgl.clog (this.m44ToString(this.mi44Mul(this.m44I(),this.mi44Add(this.m44I(),this.m44I()))));
	    taccgl.clog (this.m44ToString(this.mi44Mul([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0])));
//	    taccgl.clog (this.m44ToString(this.m44inv(this.m44I())));
//	    var i = this.m44inv([1,2,3,4,5,6,7,9,8]);
//	    taccgl.clog (this.m44ToString(i));
//	    taccgl.clog (this.m44ToString(this.mi44Mul([1,2,3,4,5,6,7,9,8],i)));
	}
	// this.m44Test();
	
    } // taccgl_debug_end

    // set taccgl.TM and evaluate taccgl.TM_1, tm must be orthogonal
    this.setTMorth = function (tm){
	this.TM=tm;
	// this.mi33T( this.mi33FromM44(this.TM_1, this.TM));
	this.mi33FromM44T(this.TM_1, this.TM);
    }
    // set taccgl.TM and evaluate taccgl.TM_1
    this.setTM = function (tm){
	this.TM=tm;
	this.TM_1= this.m33Inverse(this.m33FromM44(this.TM));
    }
    // apply (multiply) given matrix m to TM
    this.applyTM = function (m){
	taccgl.setTM( taccgl.m44Mul(m,taccgl.TM) );
    }

    this. projectionMatrix = function () {
	return [1,0,this.stdEye.eyeX/this.stdEye.eyeZ,0,
		0,1,this.stdEye.eyeY/this.stdEye.eyeZ,0,
		0,0,1,0,
		0,0,1/this.stdEye.eyeZ,1]
    }
    this.projectX = function (x,y,z) {
	var w=-z*(1/this.stdEye.eyeZ)+1;
	return (x-z*(this.stdEye.eyeX/this.stdEye.eyeZ))/w;
    }
    this.projectY = function (x,y,z) {
	var w=-z*(1/this.stdEye.eyeZ)+1;
	return (y-z*(this.stdEye.eyeY/this.stdEye.eyeZ))/w;
    }
    if (window.taccgl_ext) this.doHook (taccgl_ext);
}

var taccgl = new taccgl_create();

function taccglAnimPlug () {
    this.isPlug = true;
    this.doPreDraw = function () {taccgl.doatI++; return true;}
}

function taccglAnimPrototype (el)
{
    this.init = function (el) {
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel) { alert ("No Element with id "+el); return}
	    el=xel;
	}
	var par=el;
	this.curface=this;
	this.el=el;
        taccgl.autoDetectScroll();
//	this.x0= el.offsetLeft; this.y0= el.offsetTop;
//	while (par.offsetParent) { par=par.offsetParent; this.x0+=par.offsetLeft; this.y0+=par.offsetTop;}
        var rect=el.getBoundingClientRect();
	this.x1=this.x0=rect.left+taccgl.scrollLeft; this.y1=this.y0=rect.top+taccgl.scrollTop;
	this.z0=this.z1=0.0;
	this.w=this.wx0=this.wx1= el.offsetWidth; this.wy0=this.wz1=this.wz0=this.hx1=0;
	this.h=this.hy0=this.hy1= el.offsetHeight; this.hx0=this.hz1=this.wy1=this.hz0=0;
	this.dx0=this.dx1=this.dy0=this.dy1=this.dz0=this.dz1=0;
//	this.x=this.s0=this.x0;
//	this.y=this.t0=this.y0;
//	this.ws0=this.wx0; this.wt0=0;
//	this.ht0=this.hy0; this.hs0=0;
	this.x=this.x0;	this.y=this.y0;
	this.s0=1; this.t0=1; this.ws0=1; this.wt0=0; this.ht0=1; this.hs0=0; // Error Texture
	this.rotation = false;
	this.flags = 0;
	this.basetime = taccgl.currenttime;
	this.vduration = taccgl.timeScale;
	this.isforeground = false;
	this.elshowatend = false;
	this.elhideatbegin = false;
	this.p=taccgl.stdsc;
	this.lightSpecular=taccgl.lightSpecular;
	this.lightShininess=taccgl.lightShininess;
        this.defTexCan=1;
    }
    this.initSecond = function (){};

    this.pclone = function () {
	if ( typeof (this.attime) == "number") {
	   return this.clone();
       } else {
	   this.astepdelno=null; return this;
       }
    }
    this.pnclone = function () {
	var x
	if ( typeof (this.attime) == "number") {
	    x = this.clone();
	} else {
	    x = this;
	}
	if (this.vertEndIndex)
	    x. vertindex = this.vertEndIndex;
	return x;
    }
    this.appendBuffer = function () {
        this.astepdelno=null; return this;
    }

    this.specLight = function (s, shini) {
	this.lightSpecular=s%1;
	this.lightShininess=Math.floor(shini); return this;
    }
    this.shadowOnly = function (b) {
	if (b==false) this.flags &= ~128; else 	this.flags |= 128; return this;
    }
    this.opaqueShadow = function (b) {
      if (b!=false) this.color("black");
      this.shadowOnly(b); return this;
    }
    this.castShadow = function (b) {
	if (b) this.flags &= ~256; else this.flags|=256; return this;
    }

    this.useTM = function (b){
	if (b==false) this.flags &= ~8; else this.flags |= 8; return this;
    }

    this.foreground = function (){
	if (taccgl.vBgControl) { this.isforeground=true; this.special=true; /* this.registerBeginEnd(); */ }
	return this;
    }

    this.ddstop = function () {
	var t=taccgl;
	taccgl.AA.splice(this.ddindex,1);
	for (var i=this.ddindex; i<t.AA.length; i++) {
	    t.AA[i].ddindex= i;
	}
	t.AAstartedLength--;
    }
    this.dddstop = function () {
	var j=taccgl;
	var maxindex= j.vertI; j.vertI=this.vertindex;
	var f=this.flags&=~2;
	while (j.vertI<this.vertEndIndex){
	    j.nvertTime (-2,1,f);
	    // Deactivate animation step using a negative starting time.
	    // Currently this works fine, but in future negative starting times
	    // might be used to encode something else and then this cannot be 
	    // used any more.
	    // formerly duration and starttime 0 was used that might cause
	    // a flashing effect on the first frame if a step is stopped
	    // before the complete animation was started.
	}
	j.vertI=maxindex;	
    }
    this.stop = function () {
        // taccgl.clog ("stop ",this.astepdelno==taccgl.delno);
	if (this.astepdelno==taccgl.delno){
 	    // this.doAtEndDone=false;
	    // this.dur(1); this.absStartTime(-2); this.flags&=~2; 
	    // this.start(); we cannot call start here, because 
	    if (taccgl.dddmode) this.dddstop(); else this.ddstop();
	}
	// this.elshowatend=null;
	taccgl.deleteFromDoat (this); this.attime=null;
    }

    this.cposClientRects = function () {
        taccgl.autoDetectScroll();
	var cr=this.el.getClientRects();
	var x = cr[0].left, y = cr[0].top, w = cr[0].width, h = cr[0].height;
	x+=taccgl.scrollLeft; y+=taccgl.scrollTop;
        // x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;

	this.x=this.s0=this.x0=x;
	this.y=this.t0=this.y0=y;
	this.x1=this.x0; this.y1=this.y0

	this.w=this.ws0=this.wx0=this.wx1= w; this.wt0=0;
	this.h=this.ht0=this.hy0=this.hy1= h; this.hs0=0;
    }

    this.cposTransform = function () {
	var cs=getComputedStyle(this.el);
	var x = this.x, y = this.y, w = this.w, h = this.h;
	var t, to, m=null;

	if ( t = cs.transform) { m= taccgl.m32Parse(t); to=cs.transformOrigin;} else
	    if ( t = cs.webkitTransform) { m= taccgl.m32Parse(t); to=cs.webkitTransformOrigin;} else 
		if ( t = cs.mozTransform) { m= taccgl.m32Parse(t);to=cs.mozTransformOrigin;} else
		    if ( t = cs.mstTransform) { m= taccgl.m32Parse(t);to=cs.msTransformOrigin;}
        var toa=to.split(" ");
	var tox=parseFloat(toa[0]), toy=parseFloat(toa[1]);

	if (m) {
	    var v=[x-x-tox,y-y-toy]; x = taccgl.m32Mulx(m,v)+x+tox; y = taccgl.m32Muly(m,v)+toy+y;
	    
	    this.x=this.s0=this.x0=x;
	    this.y=this.t0=this.y0=y;
	    this.x1=this.x0; this.y1=this.y0

	    v=[w,0]; this.wx1=this.wx0 = this.ws0 = taccgl.m32Mulx(m,v); this.wy1=this.wy0 = this.wt0 = taccgl.m32Muly(m,v);
	    v=[0,h]; this.hx1=this.hx0 = this.hs0 = taccgl.m32Mulx(m,v); this.hy1=this.hy0 = this.ht0 = taccgl.m32Muly(m,v);
            this.ws0 = this.ht0 = 0;

	    this.w=Math.sqrt (this.wx0*this.wx0+this.wy0*this.wy0);
	    this.h=Math.sqrt (this.hx0*this.hx0+this.hy0*this.hy0);
	}
    }

    this.flyHome = function (){
//	var par=this.el;
//	this.x1=this.el.offsetLeft; this.y1= this.el.offsetTop; this.z1=0;
//	while (par.offsetParent) { par=par.offsetParent; this.x1+=par.offsetLeft; this.y1+=par.offsetTop;}
        taccgl.autoDetectScroll();
        var rect=this.el.getBoundingClientRect();
	this.x1=rect.left+taccgl.scrollLeft; this.y1=rect.top+taccgl.scrollTop;  this.z1=0;
	return this;
    }
    this.rotateHome = function (){
	this.wx1= this.el.offsetWidth; this.wz1=this.hx1=0;
	this.hy1= this.el.offsetHeight; this.hz1=this.wy1=0;
	return this;
    }

   this.flyToElement = function (el) {
      if (typeof (el)=="string") el=document.getElementById(el);
      var par=el;
//      this.x1= el.offsetLeft; this.y1= el.offsetTop; this.z1=0;
//      while (par.offsetParent) { par=par.offsetParent; this.x1+=par.offsetLeft; this.y1+=par.offsetTop;}
      taccgl.autoDetectScroll();
      var rect=el.getBoundingClientRect();
      this.x1=rect.left+taccgl.scrollLeft; this.y1=rect.top+taccgl.scrollTop;  this.z1=0;

      this.wx1= el.offsetWidth; this.wz1=this.hx1=0;
      this.hy1= el.offsetHeight; this.hz1=this.wy1=0;
      return this;
   }


   this.hvec = this.hV = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.hx0=this.hx1=x; this.hy0=this.hy1=y; this.hz0=this.hz1=z; return this;
   }
   this.hVFrom = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.hx0=x; this.hy0=y; this.hz0=z; return this;
   }
   this.hvec1 = this.hVTo = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.hx1=x; this.hy1=y; this.hz1=z; return this;
   }
   this.wvec = this.wV = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.wx0=this.wx1=x; this.wy0=this.wy1=y; this.wz0=this.wz1=z; return this;
   }
   this.wVFrom = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.wx0=x; this.wy0=y; this.wz0=z; return this;
   }
   this.wvec1 = this.wVTo = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.wx1=x; this.wy1=y; this.wz1=z; return this;
   }
   this.dvec = this.dV = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.dx0=this.dx1=x; this.dy0=this.dy1=y; this.dz0=this.dz1=z;return this;
   }
   this.dVFrom = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.dx0=x; this.dy0=y; this.dz0=z;return this;
   }
   this.dvec1 = this.dVTo = function (x,y,z){
       if (typeof(x)=="object")  { this.resolvePosition(x); x=this.resx-this.x0; y=this.resy-this.y0; z=this.resz-this.z0 }
       this.dx1=x; this.dy1=y; this.dz1=z;return this;
   }
   /* very incomplete implementation of line, only works in z=0 plane for lines from tl to br */
   this.line = function (x,y,z,t) {
     x-=this.x0; y-=this.y0; z-=this.z0;
     this.wx0=this.wx1=x; this.wy0=this.wy1=y; this.wz0=this.wz1=z;
     if (Math.abs(x)>Math.abs(y)) {
       this.hx0 = -y/x; this.hy0=1;
     } else {
       this.hy0 = -x/y; this.hx0=1;
     }
     var d=this.hx0*this.hx0+this.hy0*this.hy0;
     var s=t/Math.sqrt(d);
     this.hx1= (this.hx0 *= s);
     this.hy1= (this.hy0 *= s);

     this.x1=this.x0 += 0.5 - this.hx1*0.5;
     this.y1=this.y0 += 0.5 - this.hy1*0.5;
     this.z1=this.z0 += 0 - this.hz1*0.5;

     var l=Math.sqrt(this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
     s=(l+1)/l;
     this.wx1=this.wx0*=s; this.wy1=this.wy0*=s; this.wz1=this.wz0*=s;
     s=-0.5/(l+1);
     this.x1=this.x0 += s* this.wx1;
     this.y1=this.y0 += s* this.wy1;
     this.z1=this.z0 += s* this.wz1;

     return this;
   }

   this.depth = function (d,d1) {
       /*	this.dx0=this.dx1=this.dy0=this.dy1=0; this.dz1=this.dz0=d;return this; */
       if (typeof(d)=="number") {
	   var ds0=  Math.sqrt(this.dx0*this.dx0+this.dy0*this.dy0+this.dz0*this.dz0);
	   if (typeof(d1)!="number") d1=d;
	   if (ds0<0.000001) {
	       this.dx0=0; this.dy0=0; this.dz0=d;}
	   else {
	       this.dx0*=d/ds0;this.dy0*=d/ds0;this.dz0*=d/ds0;
	   }
       }
       if (typeof(d1)=="number") {
	   var ds1=  Math.sqrt(this.dx1*this.dx1+this.dy1*this.dy1+this.dz1*this.dz1);
	   if (ds1<0.000001) {
	       this.dx1=0; this.dy1=0; this.dz1=d1;}
	   else {
	       this.dx1*=d1/ds1;this.dy1*=d1/ds1;this.dz1*=d1/ds1;
	   }
       }

       return this;

    }
    this.LQCanvas = function (x0,x1,y0,y1){return this.SetQCanvas (x0,x1,y0,y1,taccgl.LQCanvas);}
    this.NQCanvas = function (x0,x1,y0,y1){return this.SetQCanvas (x0,x1,y0,y1,taccgl.NQCanvas);}

    this.SetQCanvas = function (x0,x1,y0,y1,f){
        if (!x0) x0=0;
        if (!x1 && x1!=0) x1=x0;
	if (!y0 && y0!=0) y0=x0;
	if (!y1 && y1!=0) y1=y0;

	var x=this.x-x0, y=this.y-y0, xend=this.x+this.w+x1, yend=this.y+this.h+y1;
        
	if (x<0) x=0;
	if (y<0) y=0; 

	var w=xend-x, h=yend-y;
	f.call(taccgl,x,y,w,h);
	return this;
    }

   this.shader = function (p) { this.p = p; }
   this.sc = function (sc) { if (!taccgl.dddmode) return this;
			      if (!sc.p) sc.compile(); 
			         this.p = sc; 
			      if (!sc.p&&taccgl.webglerror) {this.p=taccgl.stdsc; taccgl.webglerror=false;taccgl.dddmode=true;}
			      this.special=true; return this;}

   this.doAtBegin = function () {
//       document.getElementById('status').innerHTML='BG';
       if (this.elhideatbegin) 
	   if (this.opaqueLevelBegin||this.opaqueLevelBegin==0) this.elhideatbegin.style.opacity=this.opaqueLevelBegin;
	       else  this.elhideatbegin.style.visibility="hidden";
       if (this.isforeground) taccgl.incForeground();
       if (this.todoAtBegin) {
	   var i,d;
	   for (i=0; i<this.todoAtBegin.length; i++) {
	       d = this.todoAtBegin[i];
	       /* if (typeof (d) == "") {*/ this.todo=d; this.todo(); /* } else d(this); */
	   }
       }
   }

   this.doAtEnd = function () {
//       document.getElementById('status').innerHTML='END';
       if (this.elshowatend) {
	   var pv = this.postVisibility;
	   var ov = this.postOpacity;
	   if (taccgl_debug) {
	       taccgl.clog ("doAtEnd Apply postVisibility "+this.el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	   } // taccgl_debug_end
	   if (pv||pv=="") this.elshowatend.style.visibility=pv;
	   if (ov||ov==""||ov==0) this.elshowatend.style.opacity=ov;
	   var as;
           if (this.el.taccgl && (as=this.el.taccgl.asShadow) && pv!="hidden" && ov!==0) {
	       if (taccgl_debug) {
		taccgl.clog ("showAtEnd  asShadow "+this.el.id);
	       } // taccgl_debug_end
	       if (!as.hbStarted || !as.inTime()) {
		   as.showafter(); as.start();
		   if (taccgl.dddmode) taccgl.updateDraw(); else taccgl.updateDrawDD();
	       }
	   }
       }
       if (this.isforeground) taccgl.decForeground();
       if (this.todoAtEnd) {
	   var i,d;
	   for (i=0; i<this.todoAtEnd.length; i++) {
	       d = this.todoAtEnd[i];
	       if (typeof (d) == "function") { d.call(this); } else d(this);
	   }
       }
   }

   this.registerBegin = this.onBegin = function (d) {
       if (!this.todoAtBegin) this.todoAtBegin=Array(0);
       this.todoAtBegin.push(d); this.special=true;
       // this.registerBeginEnd(); 
       return this;
   }
   this.registerEnd = this.onEnd = function (d) {
       if (!this.todoAtEnd) this.todoAtEnd=Array(0);
       this.todoAtEnd.push(d);this.special=true;
       // this.registerBeginEnd(); 
       return this;
   }

   this.doPreDraw = function (i) {
       if (taccgl_debug) {
           var s;
	   if  (this.draw_running) s='End   '; else s='Begin ';
	   if  (this.el && this.el.id) s+= "id="+this.el.id;
	   taccgl.tlog ("on"+s+' '+i+ (this.doAtEndDone ? " doAtEndDone="+this.doAtEndDone : ""));
       } // taccgl_debug_end
       if (this.draw_running) {
	   if (taccgl_debug) {
	       if (this.doAtEndDone)  
		   taccgl.tlog(" !!!!!!!!!!!!!!!!!!! doAtEnd called twice");
	   } // taccgl_debug_end
	   this.doAtEndDone=true;
	   this.doAtEnd(); 
	   taccgl.doatI++;
       } else {
	   this.doAtBegin(); this.draw_running=true;
	   taccgl.adjustDoat(i,this.basetime+this.vduration);
       }
   }

   this.registerBeginEnd = function (){
       if (!this.attime && this.attime!=0) {
	   // set the duration of the complete animation
           var e = this.vduration + this.basetime;
	   if (taccgl.duration < e && ((this.flags&1<<16)==0)) taccgl.setDuration(e);
	   // and possibly fix the time of the plug in doat
	   var a=taccgl.doat[taccgl.doat.length-1];
	   if (a && a.isPlug && a.attime<e) {a.attime=e;}
	   // now insert the animation step into doat
	   this.attime= this.basetime; taccgl.newDoat (this);
       }
   }

   this.acceleration = function (x,y,z) {
       if ( typeof(y) != "number" ) {
         var dx =(this.x1-this.x0),   dy =(this.y1-this.y0),  dz =(this.z1-this.z0);
         var d = x/Math.sqrt(dx*dx+dz*dz+dy*dy);
         x = dx * d;y = dy * d;z = dz * d;
       } else 
         if ( typeof(z) != "number" ) {z=0}
       var dd=this.vduration*this.vduration;
       this.ax=x*dd; this.ay=y*dd; this.az=z*dd;  this.doacceleration=true; this.flags|=4; return this;
   }

   this.scalarAcceleration = function (r) {
       this.ax = (this.x1-this.x0)*r; 
       this.ay = (this.y1-this.y0)*r; 
       this.az = (this.z1-this.z0)*r; this.doacceleration=true; this.flags|=4;return this;
   }

   this.vBegin = function (x,y,z) {
       if ( typeof(y) != "number" ) {
         var dx =(this.x1-this.x0),   dy =(this.y1-this.y0),  dz =(this.z1-this.z0);
         var d = x/Math.sqrt(dx*dx+dz*dz+dy*dy);
         x = dx * d;y = dy * d;z = dz * d;
       } else 
         if ( typeof(z) != "number" ) {z=0}

       this.ax = (this.x1-this.x0)*2 - 2*this.vduration*x; 
       this.ay = (this.y1-this.y0)*2 - 2*this.vduration*y; 
       this.az = (this.z1-this.z0)*2 - 2*this.vduration*z; this.doacceleration=true; this.flags|=4;
     
       return this;
   }
   this.vEnd = function (x,y,z) {
       if ( typeof(y) != "number" ) {
         var dx =(this.x1-this.x0),   dy =(this.y1-this.y0),  dz =(this.z1-this.z0);
         var d = x/Math.sqrt(dx*dx+dz*dz+dy*dy);
         x = dx * d;y = dy * d;z = dz * d;
       } else 
         if ( typeof(z) != "number" ) {z=0}

       this.ax = -(this.x1-this.x0)*2 + 2*this.vduration*x; 
       this.ay = -(this.y1-this.y0)*2 + 2*this.vduration*y; 
       this.az = -(this.z1-this.z0)*2 + 2*this.vduration*z; this.doacceleration=true; this.flags|=4;
       return this;
   }



   this.rotateNN = function (px,py,pz, ax,ay,az){
      this.rotation = true;
      this.rotpx=px;
      this.rotpy=py;
      this.rotpz=pz;
      this.rotax=ax;
      this.rotay=ay;
      this.rotaz=az;
      this.rotfrom=0;
      this.rotto=2*Math.PI;
      return this;
   }
   this.rotate = function (px,py,pz, ax,ay,az){
      if (typeof(px)=="object")  { this.resolvePosition(px);  az=ax; ay=pz; ax=py; px=this.resx; py=this.resy; pz=this.resz }

      var ali=1/Math.sqrt(ax*ax+ay*ay+az*az);
      this.rotateNN (px,py,pz, ax*ali,ay*ali,az*ali);return this;
   }
   this.rotateMiddleNN = function (ax,ay,az){
      this.rotateNN (this.x1+this.wx1/2.0, this.y1+this.hy1/2.0, this.z1+this.dz1/2, ax,ay,az);return this;
   }
   this.rotateMiddle = function (ax,ay,az){
      var ali=1/Math.sqrt(ax*ax+ay*ay+az*az);
      this.rotateNN (this.x1+this.wx1/2.0, this.y1+this.hy1/2.0, this.z1+this.dz1/2, ax*ali,ay*ali,az*ali);return this;
   }

   this.rotVEnd = function (v) {
       this.rotacc = (this.rotto-this.rotfrom)*2 - 2*this.vduration*v; 
       return this;
   }
   this.rotVBegin = function (v) {
       this.rotacc = -(this.rotto-this.rotfrom)*2 + 2*this.vduration*v;
       return this;
   }

   this.rotatePart = this.rotPart = function (from, to, acc){
       this.rotfrom=from; this.rotto=to;
       if (!acc) acc=0;
       this.rotacc=acc;
       return this;
   }

   this.PWHRF  = function (x,y,wx,wy,hx,hy) {
      this.x0 += this.wx0*x + this.hx0*y;
      this.y0 += this.wy0*x + this.hy0*y;
      this.z0 += this.wz0*x + this.hz0*y;
      var hx0 = this.wx0*hx + this.hx0*hy;
      var hy0 = this.wy0*hx + this.hy0*hy;
      var hz0 = this.wz0*hx + this.hz0*hy;
      this.wx0 = this.wx0*wx + this.hx0*wy;
      this.wy0 = this.wy0*wx + this.hy0*wy;
      this.wz0 = this.wz0*wx + this.hz0*wy;
      this.hx0 = hx0; this.hy0 = hy0; this.hz0 = hz0; return this;
   }
   this.mapRFrom  = function (x,y,wx,wy,hx,hy) {
      if (!this.dotexmove) {
        this.dotexmove=true;
        this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0;
      }
      this.s0 += this.ws0*x + this.hs0*y;
      this.t0 += this.wt0*x + this.ht0*y;
      var hs0  = this.ws0*hx + this.hs0*hy;
      var ht0  = this.wt0*hx + this.ht0*hy;
      this.ws0  = this.ws0*wx + this.hs0*wy;
      this.wt0  = this.wt0*wx + this.ht0*wy;
      this.hs0=hs0; this.ht0=ht0;

      if ( typeof(this.wp0)=="number" ) {
        this.p0 += this.wp0*x + this.hp0*y; 
        this.q0 += this.wq0*x + this.hq0*y; 
        var hp0= this.wp0*hx + this.hp0*hy;
        var hq0= this.wq0*hx + this.hq0*hy;
        this.wp0= this.wp0*wx + this.hp0*wy;
        this.wq0= this.wq0*wx + this.hq0*wy;
        this.hp0=hp0; this.hq0=hq0;
      }
      return this;
   }
   this.mapR   = function (x,y,wx,wy,hx,hy) {
      if (this.dotexmove) {
        this.mapRFrom(x,y,wx,wy,hx,hy);this.mapRTo(x,y,wx,wy,hx,hy);
      } else {
        this.s0 += this.ws0*x + this.hs0*y; 
        this.t0 += this.wt0*x + this.ht0*y;
        var hs0  = this.ws0*hx + this.hs0*hy;
        var ht0  = this.wt0*hx + this.ht0*hy;
        this.ws0  = this.ws0*wx + this.hs0*wy;
        this.wt0  = this.wt0*wx + this.ht0*wy;
        this.hs0=hs0; this.ht0=ht0;
 
        if ( typeof(this.wp0)=="number" ) {
           this.p0 += this.wp0*x + this.hp0*y; 
           this.q0 += this.wq0*x + this.hq0*y; 
           var hp0= this.wp0*hx + this.hp0*hy;
           var hq0= this.wq0*hx + this.hq0*hy;
           this.wp0= this.wp0*wx + this.hp0*wy;
           this.wq0= this.wq0*wx + this.hq0*wy;
           this.hp0=hp0; this.hq0=hq0;

           this.wp1=this.wp0; this.wq1=this.wq0;
           this.hq1=this.hq0; this.hp1=this.hp0;
           this.p1=this.p0; this.q1=this.q0;
        }
      }
      return this;
   }
   this.clipRFrom = function (x,y,wx,wy,hx,hy) { 
       if ( typeof(this.wp0)!="number" ) {
	   this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
	   this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
	   this.p0=this.p1=this.x; this.q0=this.q1=this.y;
       }
       this.mapRFrom(x,y,wx,wy,hx,hy); this.PWHRF(x,y,wx,wy,hx,hy); return this; 
   }
   this.PWHRT  = function (x,y,wx,wy,hx,hy) {
      this.x1 += this.wx1*x + this.hx1*y;
      this.y1 += this.wy1*x + this.hy1*y;
      this.z1 += this.wz1*x + this.hz1*y;
      var hx1 = this.wx1*hx + this.hx1*hy;
      var hy1 = this.wy1*hx + this.hy1*hy;
      var hz1 = this.wz1*hx + this.hz1*hy;
      this.wx1 = this.wx1*wx + this.hx1*wy;
      this.wy1 = this.wy1*wx + this.hy1*wy;
      this.wz1 = this.wz1*wx + this.hz1*wy;
      this.hx1 = hx1; this.hy1 = hy1; this.hz1 = hz1; return this;
   }
   this.mapRTo  = function (x,y,wx,wy,hx,hy) {
      if (!this.dotexmove) {
        this.dotexmove=true;
        this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0;
      }
      this.s1 += this.ws1*x + this.hs1*y;
      this.t1 += this.wt1*x + this.ht1*y;
      var hs1  = this.ws1*hx + this.hs1*hy;
      var ht1  = this.wt1*hx + this.ht1*hy;
      this.ws1  = this.ws1*wx + this.hs1*wy;
      this.wt1  = this.wt1*wx + this.ht1*wy;
      this.hs1=hs1; this.ht1=ht1;


      if ( typeof(this.wp0)=="number" ) {
        this.p1 += this.wp1*x + this.hp1*y; 
        this.q1 += this.wq1*x + this.hq1*y; 
        var hp1= this.wp1*hx + this.hp1*hy;
        var hq1= this.wq1*hx + this.hq1*hy;
        this.wp1= this.wp1*wx + this.hp1*wy;
        this.wq1= this.wq1*wx + this.hq1*wy;
        this.hp1=hp1; this.hq1=hq1;
      }
      return this;
   }
   this.clipRTo = function (x,y,wx,wy,hx,hy) {
       if ( typeof(this.wp0)!="number" ) {
	   this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
	   this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
	   this.p0=this.p1=this.x; this.q0=this.q1=this.y;
       }
       this.mapRTo(x,y,wx,wy,hx,hy); this.PWHRT(x,y,wx,wy,hx,hy); return this;
   }

   this.clipR = function (x,y,wx,wy,hx,hy) {
//     if (this.dotexmove){
//       this.clipRTo (x,y,wx,wy,hx,hy);
//       this.clipRFrom (x,y,wx,wy,hx,hy);
//     } else {
       if ( typeof(this.wp0)!="number" ) {
	   this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
	   this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
	   this.p0=this.p1=this.x; this.q0=this.q1=this.y;
       }
       this.PWHRT(x,y,wx,wy,hx,hy);
       this.PWHRF(x,y,wx,wy,hx,hy);
       this.mapR(x,y,wx,wy,hx,hy);
//     }
     return this;    
   }

   this.restrict = this.clip = function (xx,yy,w,h) {
     if (typeof(xx)=="object")  { this.resolvePosition(xx);  h=w; w=yy; xx=this.resx; yy=this.resy; }
     if (typeof(w)=="object")   { this.resolvePosition(w);   w=this.resx-xx; h=this.resy-yy; }

     if ( typeof(this.wp0)!="number" ) {
       this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
       this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
       this.p0=this.p1=this.x; this.q0=this.q1=this.y;
     }

     var d = this.hq0*this.wp0 - this.hp0*this.wq0;

     this.clipR ( ((xx-this.p0)*this.hq0 + (this.q0-yy)*this.hp0) / d, - ((xx-this.p0)*this.wq0 + (this.q0-yy)*this.wp0) / d,
                  w*this.hq0/d, 0,0, h*this.wp0/d );

//   var d = this.ht0*this.ws0 - this.hs0*this.wt0;
//
//   this.clipR ( ((xx-this.p0)*this.ht0 + (this.q0-yy)*this.hs0) / d, - ((xx-this.p0)*this.wt0 + (this.q0-yy)*this.ws0) / d,
//                w*this.ht0/d, 0,0, h*this.ws0/d );

//     this.wp0=this.wp1=w; this.wq0=this.wq1=0;  now handled inside mapR
//     this.hq0=this.hq1=h; this.hp0=this.hp1=0;
//     this.p0=this.p1=xx; this.q0=this.q1=yy;
     return this;
   }
   /* note that clipFrom and clipTo are alomst copies of restrict and so take very little space in the compressed version of the lib */
   this.clipFrom = function (xx,yy,w,h) {
     if (typeof(xx)=="object")  { this.resolvePosition(xx);  h=w; w=yy; xx=this.resx; yy=this.resy; }
     if (typeof(w)=="object")   { this.resolvePosition(w);   w=this.resx-xx; h=this.resy-yy; }
     if ( typeof(this.wp0)!="number" ) {
       this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
       this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
       this.p0=this.p1=this.x; this.q0=this.q1=this.y;
     }

     var d = this.ht0*this.ws0 - this.hs0*this.wt0;

     this.clipRFrom ( ((xx-this.p0)*this.ht0 + (this.q0-yy)*this.hs0) / d, - ((xx-this.p0)*this.wt0 + (this.q0-yy)*this.ws0) / d,
                  w*this.ht0/d, 0,0, h*this.ws0/d );

     return this;
   }
   this.clipTo = function (xx,yy,w,h) {
     if (typeof(xx)=="object")  { this.resolvePosition(xx);  h=w; w=yy; xx=this.resx; yy=this.resy; }
     if (typeof(w)=="object")   { this.resolvePosition(w);   w=this.resx-xx; h=this.resy-yy; }
     if ( typeof(this.wp0)!="number" ) {
       this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
       this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
       this.p0=this.p1=this.x; this.q0=this.q1=this.y;
     }

     var d = this.ht0*this.ws0 - this.hs0*this.wt0;

     this.clipRTo ( ((xx-this.p0)*this.ht0 + (this.q0-yy)*this.hs0) / d, - ((xx-this.p0)*this.wt0 + (this.q0-yy)*this.ws0) / d,
                  w*this.ht0/d, 0,0, h*this.ws0/d );

     return this;
   }
 

   this.clipT = function (s,t,ws,wt,hs,ht) {
     if (typeof(s)=="object")  { this.resolvePosition(s);  ht=hs; hs=wt; wt=ws; ws=t; s=this.resx; t=this.resy; }
     if (typeof(ws)=="object") { this.resolvePosition(ws); ht=hs; hs=wt; ws=this.resx-s; wt=this.resy-t; }
     if (typeof(hs)=="object") { this.resolvePosition(hs); hs=this.resx-s; ht=this.resy-t; }
     if ( typeof(this.wp0)!="number" ) {
       this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
       this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
       this.p0=this.p1=this.x; this.q0=this.q1=this.y;
     }

     var d = this.ht0*this.ws0 - this.hs0*this.wt0;
     this.clipR ( ((s-this.p0)*this.ht0 + (this.q0-t)*this.hs0) / d, - ((s-this.p0)*this.wt0 + (this.q0-t)*this.ws0) / d,
                  (ws*this.ht0 - wt*this.hs0)/d , - (ws*this.wt0 - wt*this.ws0)/d ,
                  (hs*this.ht0 - ht*this.hs0)/d , - (hs*this.wt0 - ht*this.ws0)/d );
     
     return this;
   } 

   this.clipTFrom = function (s,t,ws,wt,hs,ht) {
     if (typeof(s)=="object")  { this.resolvePosition(s);  ht=hs; hs=wt; wt=ws; ws=t; s=this.resx; t=this.resy; }
     if (typeof(ws)=="object") { this.resolvePosition(ws); ht=hs; hs=wt; ws=this.resx-s; wt=this.resy-t; }
     if (typeof(hs)=="object") { this.resolvePosition(hs); hs=this.resx-s; ht=this.resy-t; }
     if ( typeof(this.wp0)!="number" ) {
       this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
       this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
       this.p0=this.p1=this.x; this.q0=this.q1=this.y;
     }

     var d = this.ht0*this.ws0 - this.hs0*this.wt0;
     this.clipRFrom ( ((s-this.p0)*this.ht0 + (this.q0-t)*this.hs0) / d, - ((s-this.p0)*this.wt0 + (this.q0-t)*this.ws0) / d,
                  (ws*this.ht0 - wt*this.hs0)/d , - (ws*this.wt0 - wt*this.ws0)/d ,
                  (hs*this.ht0 - ht*this.hs0)/d , - (hs*this.wt0 - ht*this.ws0)/d );
     
     return this;
   } 

   this.clipTTo = function (s,t,ws,wt,hs,ht) {
     if (typeof(s)=="object")  { this.resolvePosition(s);  ht=hs; hs=wt; wt=ws; ws=t; s=this.resx; t=this.resy; }
     if (typeof(ws)=="object") { this.resolvePosition(ws); ht=hs; hs=wt; ws=this.resx-s; wt=this.resy-t; }
     if (typeof(hs)=="object") { this.resolvePosition(hs); hs=this.resx-s; ht=this.resy-t; }
     if ( typeof(this.wp0)!="number" ) {
       this.wp0=this.wp1=this.w; this.wq0=this.wq1=0;
       this.hq0=this.hq1=this.h; this.hp0=this.hp1=0;
       this.p0=this.p1=this.x; this.q0=this.q1=this.y;
     }
     if (!this.dotexmove) {
       this.dotexmove=true;
       this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0;
     }

     var d = this.ht1*this.ws1 - this.hs1*this.wt1;
     this.clipRTo ( ((s-this.p1)*this.ht1 + (this.q1-t)*this.hs1) / d, - ((s-this.p1)*this.wt1 + (this.q1-t)*this.ws1) / d,
                  (ws*this.ht1 - wt*this.hs1)/d , - (ws*this.wt1 - wt*this.ws1)/d ,
                  (hs*this.ht1 - ht*this.hs1)/d , - (hs*this.wt1 - ht*this.ws1)/d );
     
     return this;
   } 


   this.cvCssTex = function (x,y,ti) {  // convert css coordinates to texture coordinates using the texture at time t
     if (!ti) ti=0;
     var tm=1-ti, rx,ry;
     var ws, wt, s, hs, ht, t;  
     if (this.dotexmove) {
         ws = this.ws0*tm + this.ws1*ti,  wt = this.wt0*tm + this.wt1*ti,
         hs = this.hs0*tm + this.hs1*ti,  ht = this.ht0*tm + this.ht1*ti,
         s = this.s0*tm   + this.s1*ti,   t  = this.t0*tm  + this.t1*ti;
     } else {
         ws = this.ws0;  wt = this.wt0;
         hs = this.hs0;  ht = this.ht0;
         s =  this.s0*tm   + this.s1*ti,   t  = this.t0*tm  + this.t1*ti;
     }

     if ( typeof(this.wp0)!="number" ) {
	 // x+= this.s0-this.x; y+= this.t0-this.y}   // this is correct if the texture width ws0,wt0 is identical to w  and height hs0,ht0 identical to h
	 var lx = (x-this.x)/this.w, ly =(y-this.y)/this.h;  // make x and y relative to the element
         rx = ws*lx + hs*lx + s;	 
         ry = ws*ly + hs*ly + t;	 
     } else {
         var m = [this.wp0, this.wq0, this.p0,
		  this.hp0, this.hq0, this.q0,
		  0, 0, 1];
	 var i = taccgl.m33Inverse (m);
	 var l = taccgl.mi33MulV (i, [x, y, 1]);
         rx = ws*l[0] + hs*l[0] + s;	 
         ry = ws*l[1] + hs*l[1] + t;	 
     }
     return [rx,ry];
   }
   this.cvTexCss = function (x,y) {
   }


   this.clipA = function (w0,h0,w1,h1) {
       this.dotexmove=true;
       this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;
       if (w0) this.wx0=w0; else this.wx0=0;
       if (h0) this.hy0=h0; else this.hy0=0;
       if (w1||w1==0) this.wx1=w1; 
       if (h1||h1==0) this.hy1=h1;
       this.ws0=this.wx0; this.wt0= this.hs0= this.wt1=this.hs1=0;
       this.ht0=this.hy0;
       this.ws1=this.wx1;
       this.ht1=this.hy1;
       return this;
   }

   this.growA = function (w0,h0,w1,h1) {
       // this.dotexmove=true;
       // this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;
       if (w0 || w0==0) this.wx0=w0; else this.wx0=0;
       if (h0 || h0==0) this.hy0=h0; else this.hy0=0;
       if (w1 || w1==0) this.wx1=w1; 
       if (h1 || h1==0) this.hy1=h1;
       return this;
   }

   this.resize = function (w,h,w1,h1) {
       if (typeof(h)=="number") {
	   var hs0=  Math.sqrt(this.hx0*this.hx0+this.hy0*this.hy0+this.hz0*this.hz0);
	   if (hs0<0.000001) {
	       this.hy0=h; this.hx0=0; this.hz0=0;}
	   else {
	       this.hx0*=h/hs0;this.hy0*=h/hs0;this.hz0*=h/hs0;
	   }
	   if (typeof(h1)!="number") h1=h;
       }

       if (typeof(h1)=="number") {
	   var hs1=  Math.sqrt(this.hx1*this.hx1+this.hy1*this.hy1+this.hz1*this.hz1);
	   if (hs1<0.000001) {
	       this.hy1=h; this.hx1=0; this.hz1=0;}
	   else {
	       this.hx1*=h1/hs1;this.hy1*=h1/hs1;this.hz1*=h1/hs1;
	   }
       }

       if (typeof(w)=="number") {
	   var ws0=  Math.sqrt(this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
	   if (typeof(w1)!="number") w1=w;
	   if (ws0<0.000001) {
	       this.wx0=w; this.wy0=0; this.wz0=0;}
	   else {
	       this.wx0*=w/ws0;this.wy0*=w/ws0;this.wz0*=w/ws0;
	   }
       }
       if (typeof(w1)=="number") {
	   var ws1=  Math.sqrt(this.wx1*this.wx1+this.wy1*this.wy1+this.wz1*this.wz1);
	   if (ws1<0.000001) {
	       this.wx1=w; this.wy1=0; this.wz1=0;}
	   else {
	       this.wx1*=w1/ws1;this.wy1*=w1/ws1;this.wz1*=w1/ws1;
	   }
       }

       return this;
   }

   this.resizeZ = function (z0,z1,z0s,z1s) {
       if (!taccgl.dddmode) return this;
       if (!z0&&z0!=0) z0=this.z0;
       if (!z1&&z1!=0) z1=z0;
       if (!z0s) z0s=0;
       if (!z1s) z1s=0;
       if (z0=="out") { z1=z0=this.z1; } else if (z0=="both") {z0=this.z0; z1=this.z1;}
       var scale = (-taccgl.stdEye.eyeZ+z0)/(-taccgl.stdEye.eyeZ+z0s);
//       this.resize (scale*this.w,scale*this.h);
       this.hx0*=scale;this.hy0*=scale;this.hz0*=scale;
       this.wx0*=scale;this.wy0*=scale;this.wz0*=scale;
       this.dx0*=scale;this.dy0*=scale;this.dz0*=scale;
       scale = (-taccgl.stdEye.eyeZ+z1)/(-taccgl.stdEye.eyeZ+z1s);
       this.hx1*=scale;this.hy1*=scale;this.hz1*=scale;
       this.wx1*=scale;this.wy1*=scale;this.wz1*=scale;
       this.dx1*=scale;this.dy1*=scale;this.dz1*=scale;
       return this;
   }

    this.posZ = function (z0,z1,ex,ey,ez,ox,oy,oadd) {
	// if z1 is missing, i.e. the second parameter is an object, z1 uses z0 as default
	if (!z1&&z1!=0) z1=z0; else if (typeof(z1)=="object") {oadd=oy;oy=ox;ox=ez;ez=ey;ey=ex;ex=z1; z1=z0;}

	var eye=this.veye?this.veye:taccgl.stdEye; // use the this.veye if available or stdEye otherwise
	var offx=0, offy=0, offz=0;
	// if and object is given, this can either be an eye point object or a parameter object
	if (ex && typeof(ex)=="object") {
	    if (ex.eyeX || ex.eyeX==0){   // if the third parameter is an eye object use it as eye
		eye=ex; 
		ex=ey; ey=ez; ez=ox; ox=oy; oy=oadd;
	    } else {                      // if the third parameter is a parameter object evaluate it 
		var l=null, t=null;
		if (ex.eye) eye=ex.eye;
		if (ex.l||ex.l==0) l=ex.l;
		if (ex.t||ex.t==0) t=ex.t;
		if (ex.r||ex.r==0) l=ex.r+this.wx0;
		if (ex.b||ex.b==0) t=ex.b+this.hy0;
		if (ex.l0||ex.l0==0) l=ex.l0+this.x0;
		if (ex.t0||ex.t0==0) t=ex.t0+this.y0;
		if (ex.r0||ex.r0==0) l=ex.r0+this.x0+this.wx0;
		if (ex.b0||ex.b0==0) t=ex.b0+this.y0+this.hy0;
		if (ex.l1||ex.l1==0) l=ex.l1+this.x1;
		if (ex.t1||ex.t1==0) t=ex.t1+this.y1;
		if (ex.r1||ex.r1==0) l=ex.r1+this.x1+this.wx1;
		if (ex.b1||ex.b1==0) t=ex.b1+this.y1+this.hy1;

		if (ex.ox||ex.ox==0) ez=ex.ox;
		if (ex.oy||ex.oy==0) ey=ex.oy;

		if (l||l==0||t||t==0) {      // if l? or r? parameters are given, use calcPos to calculate the position of the eye
		    if (!l) l=0;
		    if (!t) t=0;
		    var v=eye.calcPos(l,t);
		    ex=v[0]; ey=v[1]; ez=v[2];
		} else {                     // otherwise if ex, ey, ez are given use them, or if not given ex...ey can be undefined
		    if (ex.ez||ex.ez==0) ez=ex.ez;
		    if (ex.ey||ex.ey==0) ey=ex.ex;
		    if (ex.ex||ex.ex==0) ex=ex.ex;
		}
		
	    }

	}

        // per default use the coordinates of the eye object unless parameters are given explicitely
	if (!ex && ex!=0) ex=eye.eyeX+offx;
	if (!ey && ey!=0) ey=eye.eyeY+offy;
	if (!ez && ez!=0) ez=eye.eyeZ+offz;
	if (!ox && ox!=0) ox=eye.ox;
	if (!oy && oy!=0) oy=eye.oy;

	if (taccgl.dddmode) {
	    if (typeof(z0)=="number"){
		this.x0  =  -((-ez+z0)/(-ez+this.z0) * (-ez*this.x0+this.z0* ex) - z0*ex)/ez;
		this.y0  =  -((-ez+z0)/(-ez+this.z0) * (-ez*this.y0+this.z0* ey) - z0*ey)/ez;
		this.z0  =  z0;
	    }
	    if (typeof(z1)=="number"){
		this.x1  =  -((-ez+z1)/(-ez+this.z1) * (-ez*this.x1+this.z1* ex) - z1*ex)/ez;
		this.y1  =  -((-ez+z1)/(-ez+this.z1) * (-ez*this.y1+this.z1* ey) - z1*ey)/ez;
		this.z1  =  z1;
	    }	
	} else {
	    var ddfx= (ex-ox)/ez, ddfy=(ey-oy)/ez;
	    if (typeof(z0)=="number"){
		this.x0  += ddfx*(z0-this.z0);
		this.y0  += ddfy*(z0-this.z0);
		this.z0  =  z0;
	    }
	    if (typeof(z1)=="number"){
		this.x1  += ddfx*(z1-this.z1);
		this.y1  += ddfy*(z1-this.z1);
		this.z1  =  z1;
	    }
	}
	return this;
    }

   this.texmove = function (s,t,p,q) {
       this.dotexmove=true;
       this.s1=p; this.ws1=this.ws0; this.t1=q; this.ht1=this.ht0; this.hs1=this.hs0; this.wt1=this.wt0;
       this.s0=s; this.t0=t;return this;
   }

   this.flyIn = this.from = function (x0,y0,z0){
      if (typeof(x0)=="object") { this.resolvePosition(x0); x0=this.resx; y0=this.resy; z0=this.resz;}
      if (typeof(z0)!="number") z0=0;
      this.x0=x0; this.y0=y0; this.z0=z0;return this;
   }

   this.flyOut = this.to = function (x,y,z){
      if (typeof(x)=="object") { this.resolvePosition(x); x=this.resx; y=this.resy; z=this.resz;}
      if (typeof(z)!="number") z=0;
      this.x1=x; this.y1=y; this.z1=z;return this;
   }

   this.position = this.pos = function (x,y,z){
      if (typeof(x)=="object") { this.resolvePosition(x); x=this.resx; y=this.resy; z=this.resz;}
      if (!typeof(z)=="number") z=0;
      this.x1=x; this.y1=y; this.z1=z;this.x0=x; this.y0=y; this.z0=z;return this;
   }

   this.controllerRotationCenter = function (x,y,z,c){
      if (typeof(x)=="object") { c=y; this.resolvePosition(x); x=this.resx; y=this.resy; z=this.resz;}
      if (!c) c=taccgl.controller;
      c.rotationCenter(x,y,z);
      return this;
   }

   this.resolvePosition = function (o) {
      var t=this,x,y,z,hx,hy,hz,wx,wy,wz,dx,dy,dz;
      var el=o.el;
      if (o.t) t=o.t;
      if (el) {
        taccgl.autoDetectScroll();
        if (typeof (el)=="string") el=document.getElementById(el);
        var rect=el.getBoundingClientRect();
	x=rect.left+taccgl.scrollLeft; y=rect.top+taccgl.scrollTop; z=0;
        if (o.ex) { x+=o.ex*rect.width}
        if (o.ey) { y+=o.ey*rect.height}
      } else {
        if (o.pt) {
          var tt=o.pt, mt=1-tt;
          x=t.x0*mt+t.x1*tt;       
          y=t.y0*mt+t.y1*tt;       
          z=t.z0*mt+t.z1*tt;       
        } else {
          x=t.x0; y=t.y0; z=t.z0
        }
      }
      if (o.rt) {
         var rtt=o.rt, mrt=1-rtt;
         hx=t.hx0*mrt+t.hx1*rtt;       
         hy=t.hy0*mrt+t.hy1*rtt;       
         hz=t.hz0*mrt+t.hz1*rtt;       
         wx=t.wx0*mrt+t.wx1*rtt;       
         wy=t.wy0*mrt+t.wy1*rtt;       
         wz=t.wz0*mrt+t.wz1*rtt;       
         dx=t.dx0*mrt+t.dx1*rtt;       
         dy=t.dy0*mrt+t.dy1*rtt;       
         dz=t.dz0*mrt+t.dz1*rtt;       
      } else {
        hx=t.hx0; hy=t.hy0; hz=t.hz0
        wx=t.wx0; wy=t.wy0; wz=t.wz0
        dx=t.dx0; dy=t.dy0; dz=t.dz0
      }
      if (typeof(o.hx)=="number")  { x=t.x+t.w*o.hx }
      if (typeof(o.hy)=="number")  { y=t.y+t.h*o.hy }
      if (typeof(o.Tx)=="number" || typeof(o.Ty)=="number")  {
          if (typeof(o.Tx)!="number") o.Tx=0;
          if (typeof(o.Ty)!="number") o.Ty=0;
          var hs,ht,ws,wt;
          if (o.pt) {
            var tt=o.pt, mt=1-tt;
            x=t.s0*mt+t.s1*tt;       
            y=t.t0*mt+t.t1*tt;       
          } else {
            x=t.s0; y=t.t0;
          }
          if (o.rt && t.dotexmove) {
            var rtt=o.rt, mrt=1-rtt;
            hs=t.hs0*mrt+t.hs1*rtt;       
            ht=t.ht0*mrt+t.ht1*rtt;       
            ws=t.ws0*mrt+t.ws1*rtt;       
            wt=t.wt0*mrt+t.wt1*rtt;       
          } else {
            hs=t.hs0; ht=t.ht0;
            ws=t.ws0; wt=t.wt0;
          }
          x=x+o.Tx*ws+o.Ty*hs;
          y=y+o.Tx*wt+o.Ty*ht;
       }
      if (o.M){
        var mx=o.mx, my=o.my, mz=o.mz, mat, M=o.M;
        if (!mx) mx=0;
        if (!my) my=0;
        if (!mz) mz=0;

        if (typeof (o.Mx)=="number") mx= M.obj_xmin*(1-o.Mx)+  M.obj_xmax*o.Mx;
        if (typeof (o.My)=="number") my= M.obj_ymin*(1-o.My)+  M.obj_ymax*o.My;
        if (typeof (o.Mz)=="number") mz= M.obj_zmin*(1-o.Mz)+  M.obj_zmax*o.Mz;

        if (M.objt0) mat=M.objt0; else {
	    mat = taccgl.mi44Mul ([M.wx0, M.hx0, M.dx0, M.x0,
				     M.wy0, M.hy0, M.dy0, M.y0,
				     M.wz0, M.hz0, M.dz0, M.z0,
				     0, 0,  0, 1], M.objt);
        }

 	x = mx*mat[0]+my*mat[1]+mz*mat[2]+mat[3]; 
	y = mx*mat[4]+my*mat[5]+mz*mat[6]+mat[7]; 
	z = mx*mat[8]+my*mat[9]+mz*mat[10]+mat[11]; 
     }
      if (typeof(o.x)=="number")  { x=o.x }
      if (typeof(o.y)=="number")  { y=o.y }
      if (typeof(o.z)=="number")  { z=o.z }

      if (o.rx) { x+=o.rx*wx; y+=o.rx*wy; z+=o.rx*wz}
      if (o.ry) { x+=o.ry*hx; y+=o.ry*hy; z+=o.ry*hz}
      if (o.rz) { x+=o.rz*dx; y+=o.rz*dy; z+=o.rz*dz}
      if (o.rel) {
        var rel=o.rel;
        taccgl.autoDetectScroll();
        if (typeof (rel)=="string") rel=document.getElementById(rel);
        var rect=rel.getBoundingClientRect();
	x+=rect.left+taccgl.scrollLeft; y+=rect.top+taccgl.scrollTop; 
        if (o.rex) { x+=o.rex*rect.width}
        if (o.rey) { y+=o.rey*rect.height}
      } 
      if (o.mel) {
        var mel=o.mel;
        taccgl.autoDetectScroll();
        if (typeof (mel)=="string") mel=document.getElementById(mel);
        var rect=mel.getBoundingClientRect();
	x-=rect.left+taccgl.scrollLeft; y-=rect.top+taccgl.scrollTop; 
        if (o.mex) { x-=o.mex*rect.width}
        if (o.mey) { y-=o.mey*rect.height}
      } 
      if (o.ox) x+=o.ox;
      if (o.oy) y+=o.oy;
      if (o.oz) z+=o.oz;

      this.resx=x; this.resy=y; this.resz=z;
   }

    
    this.reverseLMotion = function(){
	var x=this.x0, y=this.y0, z=this.z0;
	this.x0=this.x1; this.y0=this.y1; this.z0=this.z1;
	this.x1=x; this.y1=y; this.z1=z;
	return this;
    }
    

    this.textureDraw = function (canvas) {
        var el=this.el;
	if (this.mappedEl) el=this.mappedEl;
	taccgl.prePaintElement(el,true,canvas); return this;
    }


    this.setCanvas = function(t) {
	var cf=this.curface;
	if (cf.defTexCan!=t) {    // if the texture canvas changes then we need to tansfer the blend values 
	    if (!cf.docolor) {cf.mix1=cf.mix0=1; cf.mixs0=cf.mixs1=0;}
	    var a,e;
	    if (cf.defTexCan==1){
		a=cf.mix0; e=cf.mix1;
	    } else {
		a=cf.mixs0; e=cf.mixs1;
	    }
	    if (t==1)	    {
		this.blend(a,0,e,0)
	    } 	else  { 
		this.blend(0,a,0,e);
	    }
	}
	cf.defTexCan=t;
    }


/*
    this.allocInt = function (w,pr,pl,h,pt,pb) {
	var p = taccgl.texAtlas.alloc (this, w+pr+pl, h+pt+pb);
	cf.ws0=w; cf.wt0=0; cf.hs0=0; cf.ht0=h;
	if (p == null) {
	    console.log("Out of texture space"); return;
	}
	cf.s0=cf.s1=p.x+pl; cf.t0=cf.t1=p.y+pt; 
	this.setCanvas(p.t);
	return this;
    }

    this.allocCache = function (w,h) {
	var cf=this.curface;
        if (typeof(w)=="object") { 
	    el=w.el;
	} else {
	    el = cf.el;
	}
	
	if (el.taccgl) {
	    if ( (b = el.taccgl.cachedAtlasBlock) && (b.delno==taccgl.texAtlas.delno) ) {
		if (b.el == el /* && * / ) {
		    this.setTextureFromAtlasBlock (b);
		    return;
		}
	    }
	}
        return this.alloc(w,h);
    }
*/


    this.alloc = function (w,h) {
//	var p = taccgl.texAtlas.alloc (this, this.ws0, this.ht0);
//      Allocates space on the texture atlas for the transition
//      if w and h are given this is equivaltent to p={w: , h:}
//      if no parameters are given the idea is to allocate space for the HTML element associated with the transition
//         in that case cf.w and cf.h are used 
//      if el is given width and heidth of the el are used as default, which can be overridden by w and h
//         cf.w and cf.h are never used in this case 
	var cf=this.curface;
        var t=w, pl=1, pt=1, pb=1, pr=1, cache=true, el=cf.el;
	if (cf.mappedEl) {
	    el=cf.mappedEl;
	    var rect=el.getBoundingClientRect(), w=rect.width, h=rect.height;
	}

        if (typeof(w)=="object") { 
	    w=cf.w; h=cf.h;
	    if (t.el) {
		el=t.el;
		var rect=el.getBoundingClientRect(), w=rect.width, h=rect.height;
	    } else 
		if (cf.mappedEl) {
		    el=cf.mappedEl;
		    var rect=el.getBoundingClientRect(), w=rect.width, h=rect.height;
		}
	    if (t.w) w=t.w;
	    if (t.h) h=t.h;
	    if (t.scale)  { w*=t.scale; h*=t.scale; }
	    if (t.scalew) { w*=t.scalew; }
	    if (t.scaleh) { h*=t.scaleh; }
	    if (t.padleft) { pl=t.padleft; }
	    if (t.padright) { pr=t.padright }
	    if (t.padtop)    { pt=t.padtop; }
	    if (t.padbottom) { pb=t.padbottom }
	    if (t.cache==false || t.cache) {cache=t.cache;}
	} else {
	    if (cf.mappedEl) {
		el=cf.mappedEl;
		var rect=el.getBoundingClientRect(), w=rect.width, h=rect.height;
	    }

	    if (!w) w=cf.w;
	    if (!h) h=cf.h;
	}

	var p=null;
	if (cache) {
	    if (el.taccgl) {
		if ( (p = el.taccgl.cachedAtlasBlock) && (p.delno==taccgl.texAtlas.delno) ) {
		    if (p.el == el && p.w==w && p.h==h && p.pr==pr && p.pl==pl && p.pt==pt && p.pb==pb) {
		    } else p=null;
		} else
		    p=null;
	    }
	}

	if (!p) p = taccgl.texAtlas.alloc (this, w+pr+pl, h+pt+pb);
        cf.atBl = p; 

	if (p == null) {
	    console.log("Out of texture space for element "+el.id+" needed "+(w+pr+pl)+"x"+(h+pt+pb)); return this;
	}
	cf.ws0=w; cf.wt0=0; cf.hs0=0; cf.ht0=h;
	cf.s0=cf.s1=p.x+pl; cf.t0=cf.t1=p.y+pt; 
	this.setCanvas(p.t);

	if (cache) {
	    taccgl.taccglAttach(el);
	    el.taccgl.cachedAtlasBlock = p; p.el=el; p.w=w; p.h=h, p.pr=pr, p.pl=pl, p.pt=pt, p.pb=pb;
	}
	return this;
    }


    // this.ap = function (w,h) {
	// this.alloc(w,h); this.paint(); return this;
    // }

    this.texClear = function (canvas) {
	var cf=this.curface;
	canvas = cf.defTexCan;
	// if the error texture is allocated (e.g. because of a missing alloc or out of texture space, just ignore the paint 
	if (canvas==1 && cf.s0==1 && cf.t0==1 && cf.ws0==1 && cf.wt0==0 && cf.ht0==1 && cf.hs0==0) return this;
	taccgl.texTo (canvas);
	if (!taccgl.texc) return this;
        taccgl.markCanvasChanged();
	if (cf.s0!=cf.x || cf.t0!=cf.y || cf.ws0!=cf.w || cf.ht0!=cf.h) {
	    var sx=cf.ws0/cf.w; var sy=cf.ht0/cf.h;
	    taccgl.texTransform (sx,0,0,sy,(cf.s0-cf.x*sx),(cf.t0-cf.y*sy));
	    taccgl.texc.clearRect(cf.x,cf.y,cf.w,cf.h);
	    taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    taccgl.texc.clearRect(cf.x,cf.y,cf.w,cf.h);
	}
	return this;
    }

    this.mActor = function (v,t) {
	if (!t) t=1;
        this.hideAtBegin();
        this.defTexCan=t; this.paint(); 
	if (v!=null) { this.visatend(v); } else {
	    taccgl.taccglAttach(this.el);
	    if (!this.el.taccgl.preVisibility&&this.el.taccgl.preVisibility!="") {this.el.taccgl.preVisibility=this.el.style.visibility;}
	    this.visatend(this.el.taccgl.preVisibility);
	}
	if (t==2) this.blend(0,1);
        return this;
    }

    this.paintJob = function (f) {
	/* perform f after any other painting [of this transition] has finished, possibly immediately */
        /* this is only partially implemented, currently all painting is serialized */
	if (taccgl.prevPaintJob) {
	    var job=taccgl.newJob ( f );
	    job.waitFor (taccgl.prevPaintJob); 
	    taccgl.prevPaintJob=job;
	    return;
	} else {
	    f();
	}
    }

    this.paint = function (canvas,ignorehide){
	var cf=this.curface, el=cf.el, w=cf.w, h=cf.h, x=cf.x, y=cf.y;
	if (cf.mappedEl) {
	    el=cf.mappedEl;
	    taccgl.autoDetectScroll();
	    var rect=el.getBoundingClientRect();
	    w=rect.width; h=rect.height;
	    x=rect.left+taccgl.scrollLeft, y=rect.top+taccgl.scrollTop;
	}
	if (!cf.atBl) this.alloc();
	if (typeof(canvas)=="object") { 
	    var p=canvas;
	    canvas=cf.defTexCan;
	    ignorehide = (p.ignorehide!=false);
	    if (p.el) {
		el=p.el;
		taccgl.autoDetectScroll();
		var rect=el.getBoundingClientRect();
		w=rect.width; h=rect.height;
		x=rect.left+taccgl.scrollLeft, y=rect.top+taccgl.scrollTop;
	    }
	} else {
	    if (ignorehide!=false) ignorehide=true;
	    if (!canvas) canvas=this.defTexCan; else { 
		throw "paint: parameter error" 
	    }
	}

	// if the error texture is allocated (e.g. because of a missing alloc or out of texture space, just ignore the paint 
	if (canvas==1 && cf.s0==1 && cf.t0==1 && cf.ws0==1 && cf.wt0==0 && cf.ht0==1 && cf.hs0==0) return this;


	if (!(taccgl.ddmode || taccgl.dddmode)) return this;
//	taccgl.texTo (canvas);
	if (cf.s0!=this.x || cf.t0!=this.y || cf.ws0!=this.w || cf.ht0!=this.h || this.hs0!=0 || this.wt0!=0) {
	    var sx=cf.ws0/w; var sy=cf.ht0/h, s0=cf.s0, t0=cf.t0;
//	    taccgl.texTransform (sx,0,0,sy,(this.s0-this.x*sx),(this.t0-this.y*sy));
	    taccgl.prePaintElement(el,ignorehide,canvas,
			       function() { taccgl.texTransform (sx,0,0,sy,(s0-x*sx),(t0-y*sy));},
			       function() { taccgl.texTransform (1,0,0,1,0,0)} );
//	    taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    taccgl.prePaintElement(el,ignorehide,canvas);
	}
	return this;
    }

   this.texTransform = function () {
       var cf=this.curface, w=cf.w, h=cf.h, x=cf.x, y=cf.y;
       taccgl.texTo (cf.defTexCan);
       var sx=cf.ws0/w; var sy=cf.ht0/h, s0=cf.s0, t0=cf.t0;
       taccgl.texTransform (sx,0,0,sy,(s0-x*sx),(t0-y*sy));
   }

   this.hide = function () {
       taccgl.taccglAttach(this.el);
       if (!this.el.taccgl.preVisibility&&this.el.taccgl.preVisibility!="") {this.el.taccgl.preVisibility=this.el.style.visibility;}
//       this.el.style.opacity=0;return this;
       this.el.style.visibility="hidden";
       var as;
       if (as=this.el.taccgl.asShadow) {
	   if (taccgl_debug) {
		taccgl.clog ("Use asShadow "+this.el.id);
	   } // taccgl_debug_end
	   as.showafter(false);  as.starttime(-1); as.dur(0.001); as.start();
       }
       return this;
   }
    this.opacity = function (o){
	if (!o) o=0;
	taccgl.taccglAttach(this.el);
        if (!this.el.taccgl.preOpacity&&this.el.taccgl.preOpacity!=0) {this.el.taccgl.preOpacity=this.el.style.opacity;}
        this.el.style.opacity=o;
	var as;
	if (o==0 && (as=this.el.taccgl.asShadow)) {
	    as.showafter(false); as.starttime(-1);  as.dur(0.001); as.start();
	}
	return this;
    }
   this.visatend = this.visAtEnd = function (v) {
       taccgl.taccglAttach(this.el);
       if (v!=null) {this.postVisibility=v; } else {
	   if (this.el.taccgl.preVisibility!=null) {
	      this.postVisibility=this.el.taccgl.preVisibility;
           } else {
	      this.postVisibility=this.el.style.visibility
	   }
       }
       this.elshowatend=this.el; this.special=true;// this.registerBeginEnd();
       return this;
   }
   this.opacityatend = this.opacityAtEnd = function (v) {
       taccgl.taccglAttach(this.el);
       if (v!=null) {this.postOpacity=v; } else {
	   if (this.el.taccgl.preOpacity!=null) {
	      this.postOpacity=this.el.taccgl.preOpacity;
           } else {
	      this.postOpacity=this.el.style.opacity
	   }
       }
       this.elshowatend=this.el; this.special=true;// this.registerBeginEnd();
       return this;
   }
   this.hideAtBegin = function () {
       this.elhideatbegin=this.el; this.special=true;// this.registerBeginEnd();
/*     moved into startSpecial because a correct basetime is needed
       if (this.el.taccgl && (as=this.el.taccgl.asShadow)) {
	   if (taccgl_debug) {
		taccgl.clog ("hideAtBegin  asShadow "+this.el.id);
	   } // taccgl_debug_end
	   as.showafter(false);  as.dur(this.basetime-as.basetime); as.start();
       }
*/
       return this;
   }
   this.opacityAtBegin = function (o) {
       if (!o) o=0;
       this.elhideatbegin=this.el; this.opaqueLevelBegin=o;this.special=true; // this.registerBeginEnd();
       var as;
       if (this.el.taccgl && (as=this.el.taccgl.asShadow)) {
	   if (taccgl_debug) {
		taccgl.clog ("opacityAtBegin  asShadow "+this.el.id);
	   } // taccgl_debug_end
	   as.showafter(false);  as.dur(this.basetime-as.basetime); as.start();
       }
       return this;
   }
   this.visFinal = function (v) {
       taccgl.taccglAttach(this.el);
       if (v) {this.el.taccgl.postVisibility=v; } else {
	   if (this.el.taccgl.preVisibility!=null) {
	      this.el.taccgl.postVisibility=this.el.taccgl.preVisibility;
           } else {
	      this.el.taccgl.postVisibility=this.el.style.visibility
	   }
       }
       taccgl.showAfterAnimation.push(this);
       return this;
    }
    this.opacityFinal = function (v) {
       taccgl.taccglAttach(this.el);
       if (v) {this.el.taccgl.postOpacity=v; } else {
	   if (this.el.taccgl.preOpacity!=null) {
	      this.el.taccgl.postOpacity=this.el.taccgl.preOpacity;
           } else {
	      this.el.taccgl.postOpacity=this.el.style.opacity
	   }
       }
       taccgl.showAfterAnimation.push(this);
       return this;
    }
 
   this.absStartScroll = function (r) {
       if (!r) r=0;
       this.basetime = r;
       this.flags &= 65535;
       this.flags |= 1 << 16;
       return this;
   }
   this.startScroll = function (r) {
       if (!r) r=0;
       this.basetime = this.y + r;
       this.flags &= 65535;
       this.flags |= 1 << 16;
       return this;
   }
   this.distance = this.dist = function (d) {
       this.vduration=d;
       return this;
   }

   this.eye = function (e) {
       this.veye=e;  return this;     
   }

   this.starttime = this.startTime = function (basetime) {
       if (!basetime) basetime=0;
       this.basetime=basetime+taccgl.currenttime;
       //  var e = basetime + this.vduration;
       //       if (taccgl.duration < e) taccgl.setDuration(e);
       // if (this.attime || this.attime==0) {taccgl.deleteFromDoat (this); this.attime=null;}
       this.flags &= 65535;
       return this;
   }
   this.absStartTime = function (basetime) {
       this.basetime=basetime;
       //  var e = basetime + this.vduration;
       // if (taccgl.duration < e) taccgl.setDuration(e);
//       if (this.attime || this.attime==0) {taccgl.deleteFromDoat (this); this.attime=null;}
       this.flags &= 65535;
       return this;
   }

   this.duration = this.dur = function (d) {
       this.vduration=d*taccgl.timeScale;
       // var e = this.vduration + this.basetime;
       // if (taccgl.duration < e) taccgl.setDuration(e);
//       if (this.attime || this.attime==0) {taccgl.deleteFromDoat (this); this.attime=null;}
       return this;
   }

    this.permanent = this.perm = function (){
	this.vduration = 100000000; return this;
    }
 
    this.until = function (t) {
	this.dur (t+taccgl.currenttime-this.basetime); return this;
    }
    this.untilEo = function (e) {   // until end of
	this.until (e.basetime+e.vduration);return this;
    }
    this.untilBo = function (e) {   // until begin of
	this.until (e.basetime);return this;
    }
    this.untilaLEo = function (e) {  // until at least end of
	if (e.basetime+e.vduration > this.basetime+this.vduration)
	    this.until (e.basetime+e.vduration);
	return this;
    }
    this.untilaLBo = function (e) {  // until at least begin of
	if (e.basetime > this.basetime+this.vduration)
	    this.until (e.basetime);
	return this;
    }
    this.untilaMEo = function (e) {  // until at most end of
	if (e.basetime+e.vduration < this.basetime+this.vduration)
	    this.until (e.basetime+e.vduration);
	return this;
    }
    this.untilaMBo = function (e) {  // until at most begin of
	if (e.basetime < this.basetime+this.vduration)
	    this.until (e.basetime);
	return this;
    }

   this.showbefore = this.showBefore = function (b){  if (b==false) this.flags&=~1; else this.flags|=1;return this;}
   this.showafter  = this.showAfter  = function (b){ if (b==false) this.flags&=~2; else this.flags|=2;return this;}


   this.texCan     = function (t) {
     this.defTexCan=t; return this;
   }

   this.alpha      = function (a,e) {
     if (this.defTexCan==1) { this.blend(a,0,e,0)} else {this.blend(0,a,0,e)};
     return this;
   }

   this.blend = this.blendInt = function (f,s,f1,s1) {
       if (!this.docolor) {       this.col0s= this.col0t=this.col1s=this.col1t=-128*256; }
       this.docolor=true; this.flags|=16;
       this.mix0=f; this.mix1=f;
       if (!s) s=0;
       this.mixs0=s; this.mixs1=s;
       if (typeof (f1)=="number" )  this.mix1=f1;
       if (typeof (s1)=="number" )  this.mixs1=s1;
       return this;
   }
   this.blendA     = function (f0,f1,s0,s1) {
       if (!this.docolor) {       this.col0s= this.col0t=this.col1s=this.col1t=-128*256; }
       this.docolor=true; this.flags|=16;
       this.mix0=f0; this.mix1=f1;
       if (!s0) s0=0; if (!s1) s1=0;
       this.mixs0=s0; this.mixs1=s1;
       return this;
   } 
   this.color        = function (c,c1) {
       this.bgColor (c,c1);
       this.mix1=this.mix0=0; this.mixs0=this.mixs1=0;
       return this;
   }
   this.bgColor      = function (c,c1) {
       var idata,r,g,b,a;
       if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
       this.docolor=true; this.flags|=16;this.flags &= ~32;this.flags &= ~64;
       this.ddcolor0=this.ddcolor1=c;
       if (c1) this.ddcolor1=c1;
       if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.col0s= this.col1s = r+256*(g-128); this.col0t=this.col1t=a+256*(b-128);
       }
       if (c1 && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c1;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1), r = idata.data[0], g = idata.data[1],
	   b = idata.data[2], a = idata.data[3];
	   this.col1s = r+256*(g-128); this.col1t=a+256*(b-128);
       }
       return this;
   }
    this.colorInt    = function (r,g,b,a,r1,g1,b1,a1){
	if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
	this.docolor=true; this.flags|=16;this.flags &= ~32;this.flags &= ~64;
 	this.col0s = r+256*(g-128); this.col0t=a+256*(b-128);
	this.col1s = r1+256*(g1-128); this.col1t=a1+256*(b1-128);
	return this;
    }
    this.discardThreshold = function (t) {
	this.colorInt (t*255,0,0,0,t*255,0,0,0); return this;
    }
    
   this.colorA      = function (c,c1) {
       var idata,r,g,b,a;
       if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
       this.docolor=true; this.flags|=16;this.flags &= ~32;this.flags &= ~64;
       this.ddcolor0=c; this.ddcolor1=c1;
       if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.col0s = r+256*(g-128); this.col0t=a+256*(b-128);
       }
       if (c1 && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c1;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.col1s = r+256*(g-128); this.col1t=a+256*(b-128);
       }
       return this;
   }

    this.lightAmbDiff = function (ambCol, diffCol, a0, a1) {
	this.bgColor(ambCol, diffCol);
        this.ddcolor0="rgba(255,255,255,"+a0+")"; this.ddcolor1=this.ddcolor0="rgba(255,255,255,"+a1+")";
	if (!a0 && a0!=0.0) a0=0.0;
	if (!a1 && a1!=0.0) a1=0.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
	this.col0t = Math.floor (this.col0t / 256) * 256 + a0*255;
	this.col1t = Math.floor (this.col1t / 256) * 256 + a1*255;
	this.flags |=32; this.flags &= ~64; return this;
    }
    this.lightBgAmbDiff = function (c,amb,diff, a0, a1) {
        if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
        this.docolor=true; this.flags|=16+32+64;
        this.ddcolor0=c; this.ddcolor1=c;
	if (!a0 && a0!=0.0) a0=1.0;
	if (!a1 && a1!=0.0) a1=1.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
        if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   var idata = taccgl.scratchc.getImageData(0,0,1,1),
	       r = idata.data[0],
	       g = idata.data[1],
	       b = idata.data[2]; 
	       // a = idata.data[3]; 
	    this.col0s = r+256*(g-128); this.col0t=Math.floor(a0*255)+256*(b-128);
	    this.ddcolor0="rgba("+r+","+g+","+b+","+a0+")";
	    this.ddcolor1="rgba("+r+","+g+","+b+","+a1+")";
        }
	if (amb>1) amb=1;
	if (diff>1) diff=1;
	if (amb<0) amb=0;
	if (diff<0) diff=0; 
	amb=Math.floor(amb*255); diff=Math.floor(diff*255);
	this.col1s = amb+256*(diff-128); this.col1t=Math.floor(a1*255); return this;
   }
   this.material = function (m) {m.applyToAnim(this); return this;}

    this.applyToAnim = function (a) {
	a.lightSpecular= this.lightSpecular;
	a.lightShininess= Math.round(this.lightShininess);
	if (this.docolor) {
	    a.docolor=this.docolor;
	    a.flags |= this.flags;
	    a.col0s = this.col0s; 
	    a.col0t = this.col0t;
	    a.col1s = this.col1s;
	    a.col1t = this.col1t;
	    a.ddcolor0= this.ddcolor0; a.ddcolor1=this.ddcolor1;
	    
	    a.mix0=this.mix0; a.mix1=this.mix1; a.mixs0=this.mixs0; a.mixs1=this.mixs1; a.defTexCan=this.defTexCan;
	}
//	if (this.s0) {   // s0 in fact may be 0
	    a.s0=this.s0; a.t0=this.t0;
	    a.ws0=this.ws0; a.ht0=this.ht0; a.wt0=this.wt0; a.hs0=this.hs0;
	    if (this.dotexmove) {
		a.dotexmove=this.texmove;
		a.s1=this.s1; a.t1=this.t1;
		a.ws1=this.ws1; a.ht1=this.ht1; a.wt1=this.wt1; a.hs1=this.hs1;
	    }
//	}
    }

   
   this.map = function (s,t,w,h) {
       if (typeof(s)=="object")  { this.resolvePosition(s);  h=w; w=t; s=this.resx; t=this.resy; }
       if (typeof(w)=="object")  { this.resolvePosition(w);  w=this.resx-s; h=this.resy-t; }
       this.dotexmove=false;
       if (s||s==0) this.s0=s; if (t||t==0) this.t0=t;
       if (w||h) {this.wt0=this.hs0=0;}
       if (w && h) { this.ws0=w; this.ht0=h;}
       else if (w) { this.ht0*=w/this.ws0; this.ws0=w;} 
       else if (h) { this.ws0*=h/this.ht0; this.ht0=h;}
       return this;
   }
    this.mapScale = function (s) {
	this.ws0*=s; this.ht0*=s; this.wt0*=s; this.hs0*=s; return this;
    }
   this.map1 = this.mapTo = function (s,t,w,h) {
       if (typeof(s)=="object")  { this.resolvePosition(s);  h=w; w=t; s=this.resx; t=this.resy; }
       if (typeof(w)=="object")  { this.resolvePosition(w);  w=this.resx-s; h=this.resy-t; }
       this.dotexmove=true;
       if (s||s==0) this.s1=s; if (t||t==0) this.t1=t;
       if (w||h) {this.wt1=this.hs1=0;}
       if (w && h) { this.ws1=w; this.ht1=h;}
       else if (w) { this.ht1*=w/this.ws1; this.ws1=w;} 
       else if (h) { this.ws1*=h/this.ht1; this.ht1=h;}
       return this;
   }
   this.mapFrom = function (s,t,w,h) {
      if (!this.dotexmove) {
        this.dotexmove=true;
        this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0;
      }
       if (typeof(s)=="object")  { this.resolvePosition(s);  h=w; w=t; s=this.resx; t=this.resy; }
       if (typeof(w)=="object")  { this.resolvePosition(w);  w=this.resx-s; h=this.resy-t; }
       if (s||s==0) this.s0=s; if (t||t==0) this.t0=t;
       if (w||h) {this.wt0=this.hs0=0;}
       if (w && h) { this.ws0=w; this.ht0=h;}
       else if (w) { this.ht0*=w/this.ws0; this.ws0=w;} 
       else if (h) { this.ws0*=h/this.ht0; this.ht0=h;}
       return this;
   }
   this.mapT = function (s,t,ws,wt,hs,ht) {
      if (typeof(s)=="object")  { this.resolvePosition(s);  ht=hs; hs=wt; wt=ws; ws=t; s=this.resx; t=this.resy; }
      if (typeof(ws)=="object") { this.resolvePosition(ws); ht=hs; hs=wt; ws=this.resx-s; wt=this.resy-t; }
      if (typeof(hs)=="object") { this.resolvePosition(hs); hs=this.resx-s; ht=this.resy-t; }
      if (this.doftetexmove) {
        this.mapRFrom(s,t,ws,wt,hs,ht);this.mapRTo(s,t,ws,wt,hs,ht);
      } else {
        this.s0=s; this.t0=t; this.ws0=ws; this.wt0=wt; this.hs0=hs; this.ht0=ht;
      }
      return this;
   }
   this.mapTFrom = function (s,t,ws,wt,hs,ht) {
      if (!this.dotexmove) {
        this.dotexmove=true;
        this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0;
      }
      if (typeof(s)=="object")  { this.resolvePosition(s);  ht=hs; hs=wt; wt=ws; ws=t; s=this.resx; t=this.resy; }
      if (typeof(ws)=="object") { this.resolvePosition(ws); ht=hs; hs=wt; ws=this.resx-s; wt=this.resy-t; }
      if (typeof(hs)=="object") { this.resolvePosition(hs); hs=this.resx-s; ht=this.resy-t; }
      this.s0=s; this.t0=t; this.ws0=ws; this.wt0=wt; this.hs0=hs; this.ht0=ht; return this;
   }
   this.mapTTo= function (s,t,ws,wt,hs,ht) {
      if (typeof(s)=="object")  { this.resolvePosition(s);  ht=hs; hs=wt; wt=ws; ws=t; s=this.resx; t=this.resy; }
      if (typeof(ws)=="object") { this.resolvePosition(ws); ht=hs; hs=wt; ws=this.resx-s; wt=this.resy-t; }
      if (typeof(hs)=="object") { this.resolvePosition(hs); hs=this.resx-s; ht=this.resy-t; }
      this.dotexmove=true;
      this.s1=s; this.t1=t; this.ws1=ws; this.wt1=wt; this.hs1=hs; this.ht1=ht; return this;
   }
   this.mapAnim = function () {
       this.dotexmove=true;
       this.s1=this.s0; this.t1=this.t0; this.ws1=this.ws0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0; return this;
   }
   this.mapReverse = function () {
       if (this.dotexmove) {
	   var s1=this.s1, t1=this.t1, ws1=this.ws1, ht1=this.ht1, wt1=this.wt1,hs1= this.hs1; 
	   this.s1=this.s0; this.t1=this.t0; this.ws1=this.ws0; this.ht1=this.ht0; this.wt1=this.wt0; this.hs1=this.hs0; 
	   this.s0=s1; this.t0=t1; this.ws0=ws1; this.ht0=ht1; this.wt0=wt1; this.hs0=hs1; 
	   return this;
       }
   }
   this.mapElement = function (el) {
 	if (typeof (el)=="string") el=document.getElementById(el);
//       var par=el,s,t;
//	s= el.offsetLeft; t=el.offsetTop;
//	while (par.offsetParent) { par=par.offsetParent; s+=par.offsetLeft; t+=par.offsetTop;}
        taccgl.autoDetectScroll();
        var rect=el.getBoundingClientRect(), s=rect.left+taccgl.scrollLeft, t=rect.top+taccgl.scrollTop;
	this.map (s,t,el.offsetWidth,el.offsetHeight);
	return this;
   }
//    this.mapA = function (el) {
//        if (typeof (el)=="string") el=document.getElementById(el);
//	this.curface.mappedEl=el;
//    }

    this.mapA = function (el) {
        if (typeof (el)=="string") el=document.getElementById(el);
	var cf=	this.curface; cf.mappedEl=el;
	taccgl.autoDetectScroll();
	var rect=el.getBoundingClientRect();
	cf.wp0=cf.wp1=rect.width; cf.wq0=cf.wq1=0;
	cf.hq0=cf.hq1=rect.height; cf.hp0=cf.hp1=0;
	cf.p0=cf.p1=rect.left+taccgl.scrollLeft; cf.q0=cf.q1=rect.top+taccgl.scrollTop;
    }

    this.mapActor = function (el,p) {
        if (typeof (el)=="string") el=document.getElementById(el);
	this.mapA(el);
//	this.alloc(p); this.paint();
	if (typeof(p)=="object") p.el=el; else p={el:el}; 
	this.alloc( p );

/*      assertion check
        var cf = this.curface, x=cf.el;
	if (this.curface.mappedEl) x=this.curface.mappedEl;
	taccgl.autoDetectScroll();
	var rect=el.getBoundingClientRect();
	if (x!=el || cf.y!=rect.top+taccgl.scrollTop) {
	    var t=50;
	}
*/

	this.paint({}); // ( {el:el} );
        return this;
   }
   this.mapMirrorY = function () {
       this.s0 += this.ws0; this.t0 += this.wt0; this.ws0=-this.ws0; this.wt0=-this.wt0;
       return this;
   }
   this.mapMirrorX = function () {
       this.t0 += this.ht0; this.s0 += this.hs0; this.ht0=-this.ht0; this.hs0=-this.hs0;
       return this;
   }
   this.mapTurn = function () {
       this.s0 = this.s0+ this.ws0 + this.hs0;
       this.t0 = this.t0+ this.ht0 + this.wt0;
       this.ht0=-this.ht0; this.hs0=-this.hs0;
       this.ws0=-this.ws0; this.wt0=-this.wt0;
       return this;
   }
/*
   this.mapTurnXY = function () {
       this.s0' = this.s0;
       this.t0' = this.t0 + this.ht0;

       this.s0'+ this.ws0' = this.s0;
       this.t0'+ this.ht0' = this.t0;


       var y = this.t0;
       this.t0 = y+this.ht0; this.ht0=-this.ht0;
       return this;
   }
*/
   this.mapRelative = function (s,t,w,h) {
       if (!w && w!=0) w=this.ws0;
       if (!h && h!=0) h=this.ht0;
       this.s0+=s; this.t0+=t; this.ws0 = w; this.ht0 = h; this.wt0=0; this.hs0=0; return this;
   }

   this.mapClip = function (w,h,pos,overflow) {
       if (overflow != "b" && overflow != 'br'){
	   if (h>this.ht0) h=this.ht0;
       } 
       if (overflow != "r" && overflow != 'br'){
	   if (w>this.ws0) w=this.ws0;
       } 
       
       if (pos=="tl") {
       } else if (pos=="t") {
	   w=this.ws0;
       } else if (pos=="tr") {
	   this.s0 += this.ws0-w;
       } else if (pos=="l") {
	   h=this.ht0;
       } else if (pos=="r") {
	   this.s0 += this.ws0-w; h=this.ht0;
       } else if (pos=="bl") {
	   this.t0 += this.ht0-h;
       } else if (pos=="b") {
	   this.t0 += this.ht0-h;  w=this.ws0;
       } else if (pos=="br") {
	   this.t0 += this.ht0-h;  this.s0 += this.ws0-w;
       }
       this.ws0 = w; this.ht0 = h; // FIXME hs0
       return this;
   }

   this.mapClipToElement = function (pos,overflow) {
       var h = Math.sqrt (this.hx0*this.hx0+this.hy0*this.hy0+this.hz0*this.hz0),
           w = Math.sqrt (this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
       this.mapClip (w,h,pos,overflow); return this;
   }

  /* normal methods */

    this.initNormals = function () {
        this.donormal=true;
	this.ntlx=this.nblx=this.ntrx=this.nbrx = this.hy0*this.wz0 - this.hz0*this.wy0;	
	this.ntly=this.nbly=this.ntry=this.nbry = this.hz0*this.wx0 - this.hx0*this.wz0;
	this.ntlz=this.nblz=this.ntrz=this.nbrz = this.hx0*this.wy0 - this.hy0*this.wx0;
    }

    this.copyTiming = function (a){
	this.absStartTime (a.basetime);
	this.dur (a.vduration);
	return this;
    }

    this.copyMotion = function (a) {
	this.rotate (a.rotpx, a.rotpy, a.rotpz, a.rotax, a.rotay, a.rotaz);
	this.rotatePart (a.rotfrom, a.rotto); return this;
    }

   /* query methods */

    this.hbStarted = function () {
	if (!this.astepdelno) return false;
	return this.astepdelno==taccgl.delno;
    }
    this.inTime = function (t) {
	if (!t && t!=0) t=taccgl.currenttime;
	if (t<this.basetime && ((this.flags&1)==0)) return false;
	if (t>this.basetime+this.vduration && ((this.flags&2)==0)) return false
	return true;
    }

   this.calcBounds0 = function () {
       var x= taccgl.projectX (this.x0,this.y0,this.z0);
       var xmin=x; var xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0,this.y0+this.hy0,this.z0+this.hz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.wx0,this.y0+this.wy0,this.z0+this.wz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.dx0,this.y0+this.dy0,this.z0+this.dz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0+this.wx0,this.y0+this.hy0+this.wy0,this.z0+this.hz0+this.wz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0+this.dx0,this.y0+this.hy0+this.dy0,this.z0+this.hz0+this.dz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.dx0+this.wx0,this.y0+this.dy0+this.wy0,this.z0+this.dz0+this.wz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0+this.wx0+this.dx0,this.y0+this.hy0+this.wy0+this.dy0,this.z0+this.hz0+this.wz0+this.dz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       this.pxmin = xmin; this.pxmax=xmax;

       var y= taccgl.projectY (this.x0,this.y0,this.z0);
       var ymin=y; var ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0,this.y0+this.hy0,this.z0+this.hz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.wx0,this.y0+this.wy0,this.z0+this.wz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.dx0,this.y0+this.dy0,this.z0+this.dz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0+this.wx0,this.y0+this.hy0+this.wy0,this.z0+this.hz0+this.wz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0+this.dx0,this.y0+this.hy0+this.dy0,this.z0+this.hz0+this.dz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.dx0+this.wx0,this.y0+this.dy0+this.wy0,this.z0+this.dz0+this.wz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0+this.wx0+this.dx0,this.y0+this.hy0+this.wy0+this.dy0,this.z0+this.hz0+this.wz0+this.dz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       this.pymin = ymin; this.pymax=ymax;
       return this;
   }

   /* helper functions for start methods */
   this.evalObjt = function () {
       	this.objt0 = [this.wx0, this.hx0, this.dx0, this.x0,
		      this.wy0, this.hy0, this.dy0, this.y0,
		      this.wz0, this.hz0, this.dz0, this.z0,
		      0, 0,  0, 1];

	this.objt1 = [this.wx1, this.hx1, this.dx1, this.x1,
		      this.wy1, this.hy1, this.dy1, this.y1,
		      this.wz1, this.hz1, this.dz1, this.z1,
		      0, 0,  0, 1];

	this.objt0inv = taccgl.mi33T(taccgl.m33Inverse(taccgl.m33FromM44(this.objt0)));
	this.objt1inv = taccgl.mi33T(taccgl.m33Inverse(taccgl.m33FromM44(this.objt1)));
   }
	

   /* start methods */

   this.ddstart = function () {
       var j = taccgl,
           e = this.vduration + this.basetime;
       if (this.special) this.startSpecialDD();
       if (!taccgl.ddmode) return;
//       if (this.flags&128) return; // ignore shadowOnly steps
       if (j.duration < e && ((this.flags&1<<16)==0)) j.setDuration(e);
       if (!this.doacceleration) {this.ax=this.ay=this.az=0;}
       if (!this.dotexmove) {
	   this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;
       }
       if (this.face){
	   var i;
 	   for (i=0; i<this.face.length; i++){
	       var f=this.face[i];
	       if (!f.dotexmove)
		   f.s1=f.s0; f.ws1=f.ws0; f.t1=f.t0; f.ht1=f.ht0;
	   }
       }
       if (this.astepdelno!=j.delno) { j.AA.push(this); this.ddindex=j.AA.length-1;}
       this.astepdelno=j.delno;
       return this; 
   }

    this.startSpecialDD = function (){
	if (((this.flags&1<<16)==0) && 
	    (this.isforeground || this.todoAtBegin || this.todoAtEnd || this.elshowatend || this.elhideatbegin))
	    this.registerBeginEnd();
    }
    this.startSpecial = function (){
	if (this.p!=taccgl.stdsc) taccgl.setShader(this.p);
	if (this.isforeground || this.todoAtBegin || this.todoAtEnd || this.elshowatend || this.elhideatbegin)
	    this.registerBeginEnd();
	var as;
	if (this.elhideatbegin && this.el.taccgl && (as=this.el.taccgl.asShadow)){
	   if (taccgl_debug) {
		taccgl.clog ("hideAtBegin  asShadow "+this.el.id);
	   } // taccgl_debug_end
           if (this.basetime-as.basetime>0){
   	      as.showafter(false);  as.dur(this.basetime-as.basetime); as.start();
	   }
	}
    }

   this.start = function () {
       var j = taccgl;
       if (!j.dddmode) {
	   this.ddstart();
	   return this; 
       }

       var maxindex=null;
       if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}

//     if (this.p!=j.stdsc) j.setShader(this.p);
       if (this.special) this.startSpecial();

       var nx = -this.hy0*this.wz0 + this.hz0*this.wy0,
           ny = -this.hz0*this.wx0 + this.hx0*this.wz0,
           nz = -this.hx0*this.wy0 + this.hy0*this.wx0;
       var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer

       j.nvertMove (this.x0, this.y0, this.z0                              ,this.x1, this.y1, this.z1
		    ,nx,ny,nz,spec,  this.s0,this.t0,  this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.hx0, this.y0+this.hy0, this.z0+this.hz0   ,this.x1+this.hx1, this.y1+this.hy1, this.z1+this.hz1   
		    ,nx,ny,nz,spec, this.s0+this.hs0,this.t0+this.ht0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0, this.y0+this.wy0, this.z0+this.wz0   ,this.x1+this.wx1, this.y1+this.wy1, this.z1+this.wz1  
		    ,nx,ny,nz,spec,  this.s0+this.ws0 ,this.t0+this.wt0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0+this.hx0, this.y0+this.wy0+this.hy0, this.z0+this.wz0+this.hz0  
                    ,this.x1+this.wx1+this.hx1, this.y1+this.hy1+this.wy1, this.z1+this.wz1+this.hz1    
		    ,nx,ny,nz,spec, this.s0+this.ws0+this.hs0, this.t0+this.ht0+this.wt0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0, this.y0+this.wy0, this.z0+this.wz0   ,this.x1+this.wx1, this.y1+this.wy1, this.z1+this.wz1   
		    ,nx,ny,nz,spec, this.s0+this.ws0, this.t0+this.wt0 
		    ,this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.hx0, this.y0+this.hy0, this.z0+this.hz0   ,this.x1+this.hx1,  this.y1+this.hy1, this.z1+this.hz1  
		    ,nx,ny,nz,spec, this.s0+this.hs0, this.t0+this.ht0, this.flags,this.basetime,this.vduration);

       this.startRest();
       if (this.p!=j.stdsc) j.setShader(j.stdsc);
       this.vertEndIndex=j.vertI;
       if (maxindex) j.vertI=maxindex;
       if (taccgl_debug_vertex) {
	   taccgl.dumpVertexTransition(this);
       } // taccgl_debug_end
       return this;
   }

   this.startRest = function () {
      var j = taccgl, i,
          e = this.vduration + this.basetime;
      if (j.duration < e && ((this.flags&1<<16)==0)) j.setDuration(e);
      if (this.rotation) {
         for (i=1; i<=6; i++) {
	     j.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto,this.rotacc); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (this.doacceleration){
         for (i=1; i<=6; i++) {
	     j.nvertAcceleration(this.ax,this.ay,this.az); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (this.dotexmove) {
           j.nvertOffset (-5); 
	   j.nvertTexMove (this.s1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.hs1,this.t1+this.ht1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1+this.wt1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1+this.hs1,this.t1+this.wt1+this.ht1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1+this.wt1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.hs1,this.t1+this.ht1); 
       }
       if (this.docolor) {
	   j.nvertColor6 (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); 
/*
           j.nvertOffset (-5); 
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); 
*/
       }
       if (this.donormal){
           j.nvertOffset (-5); 
	   j.nvertNormal3 (this.ntlx, this.ntly, this.ntlz);j.nvertOffset(1);
	   j.nvertNormal3 (this.nblx, this.nbly, this.nblz);j.nvertOffset(1);
	   j.nvertNormal3 (this.ntrx, this.ntry, this.ntrz);j.nvertOffset(1);
	   j.nvertNormal3 (this.nbrx, this.nbry, this.nbrz);j.nvertOffset(1);
	   j.nvertNormal3 (this.ntrx, this.ntry, this.ntrz);j.nvertOffset(1);
	   j.nvertNormal3 (this.nblx, this.nbly, this.nblz);
       }
   }

   this.startRestTriangle = function () {
      var j = taccgl, i,
          e = this.vduration + this.basetime;
      if (j.duration < e && ((this.flags&1<<16)==0)) j.setDuration(e);
      if (this.rotation) {
         for (i=1; i<=3; i++) {
	     j.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto,this.rotacc); j.nvertOffset(-1);
	 }
         j.nvertOffset (3); 
       }
       if (this.doacceleration){
         for (i=1; i<=3; i++) {
	     j.nvertAcceleration(this.ax,this.ay,this.az); j.nvertOffset(-1);
	 }
         j.nvertOffset (3); 
       }
       if (this.dotexmove) {
           j.nvertOffset (-2); 
	   j.nvertTexMove (this.s1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.hs1,this.t1+this.ht1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1+this.wt1);
       }
       if (this.docolor) {
	   j.nvertColor3 (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1);
/*
           j.nvertOffset (-2); 
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); 
*/
       }
   }

    this.startFixNormal0 = function () {
	var j = taccgl;
	var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer
	
	j.nvertOffset (-3);
	var hx0 = j.vertOrigin [4*j.vertI+4] - j.vertOrigin [4*j.vertI],
	    hy0 = j.vertOrigin [4*j.vertI+5] - j.vertOrigin [4*j.vertI+1],
	    hz0 = j.vertOrigin [4*j.vertI+6] - j.vertOrigin [4*j.vertI+2],
	    wx0 = j.vertOrigin [4*j.vertI+8] - j.vertOrigin [4*j.vertI],
	    wy0 = j.vertOrigin [4*j.vertI+9] - j.vertOrigin [4*j.vertI+1],
	    wz0 = j.vertOrigin [4*j.vertI+10] - j.vertOrigin [4*j.vertI+2],
            nx = -hy0*wz0 + hz0*wy0,
            ny = -hz0*wx0 + hx0*wz0,
            nz = -hx0*wy0 + hy0*wx0; j.nvertOffset(1);
        j.nvertNormal (nx,ny,nz,spec); j.nvertOffset(1);
        j.nvertNormal (nx,ny,nz,spec); j.nvertOffset(1);
        j.nvertNormal (nx,ny,nz,spec); 
    }
    this.startFixNormal = function () {
	var j = taccgl;
	var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer

	j.nvertOffset (-3);
	var b=4*j.vertI;
	var hx0 = j.vertOrigin [b+4] - j.vertOrigin [b],
	    hy0 = j.vertOrigin [b+5] - j.vertOrigin [b+1],
	    hz0 = j.vertOrigin [b+6] - j.vertOrigin [b+2],
	    wx0 = j.vertOrigin [b+8] - j.vertOrigin [b],
	    wy0 = j.vertOrigin [b+9] - j.vertOrigin [b+1],
	    wz0 = j.vertOrigin [b+10] - j.vertOrigin [b+2],
            nx0 = -hy0*wz0 + hz0*wy0,
            ny0 = -hz0*wx0 + hx0*wz0,
            nz0 = -hx0*wy0 + hy0*wx0,
	    hx1 = j.vertPos [b+4] - j.vertPos [b],
	    hy1 = j.vertPos [b+5] - j.vertPos [b+1],
	    hz1 = j.vertPos [b+6] - j.vertPos [b+2],
	    wx1 = j.vertPos [b+8] - j.vertPos [b],
	    wy1 = j.vertPos [b+9] - j.vertPos [b+1],
	    wz1 = j.vertPos [b+10] - j.vertPos [b+2],
            nx1 = -hy1*wz1 + hz1*wy1,
            ny1 = -hz1*wx1 + hx1*wz1,
            nz1 = -hx1*wy1 + hy1*wx1,
	    ax = -ny0*nz1 + nz0*ny1,
	    ay = -nz0*nx1 + nx0*nz1, 
	    az = -nx0*ny1 + ny0*nx1,
	    al = Math.sqrt (ax*ax+ay*ay+az*az),
	    nl0 = Math.sqrt (nx0*nx0+ny0*ny0+nz0*nz0),
	    nl1 = Math.sqrt (nx1*nx1+ny1*ny1+nz1*nz1);
//	    w =  Math.PI*2 - Math.asin (al/nl0/nl1),
//	    w0 = Math.PI*2;
	if (nl0<0.001) {
	    nx0=ny0=0; nz0=1; nl0=1;
	}
	if (nl1<0.001) {
	    nx1=ny1=0; nz1=1; nl1=1;
	}
	var
	    w = Math.PI*2-Math.acos((nx0*nx1+ny0*ny1+nz0*nz1)/nl0/nl1),
	    w0 = Math.PI*2;

//	w=Math.PI*2;
//	nx0=1; ny0=0; nz0=-1; 
//      taccgl.clog ("Normal="+nx0+","+ny0+","+nz0);
        if (Math.abs(w-w0)<0.001) w=w0=0;
	ax/=al; ay/=al; az/=al;
	j.nvertOffset(1); j.nvertNormal (nx0,ny0,nz0,spec); 
	if (al>0.001) j.nvertRot (j.vertPos [b], j.vertPos [b+1], j.vertPos [b+2], ax, ay, az, w0, w);
	j.nvertOffset(1); j.nvertNormal (nx0,ny0,nz0,spec); 
	if (al>0.001) j.nvertRot (j.vertPos [b+4], j.vertPos [b+5], j.vertPos [b+6], ax, ay, az, w0, w);
	j.nvertOffset(1); j.nvertNormal (nx0,ny0,nz0,spec); 
	if (al>0.001) j.nvertRot (j.vertPos [b+8], j.vertPos [b+9], j.vertPos [b+10], ax, ay, az, w0, w);
    }
    this.startFixNormal1 = function () {
	var j = taccgl;
	j.nvertOffset (-3);
	var b=4*j.vertI,
	    hx1 = j.vertPos [b+4] - j.vertPos [b],
	    hy1 = j.vertPos [b+5] - j.vertPos [b+1],
	    hz1 = j.vertPos [b+6] - j.vertPos [b+2],
	    wx1 = j.vertPos [b+8] - j.vertPos [b],
	    wy1 = j.vertPos [b+9] - j.vertPos [b+1],
	    wz1 = j.vertPos [b+10] - j.vertPos [b+2],
            nx1 = -hy1*wz1 + hz1*wy1,
            ny1 = -hz1*wx1 + hx1*wz1,
            nz1 = -hx1*wy1 + hy1*wx1;
	j.nvertOffset(1);
	j.nvertN1 (nx1, ny1, nz1); j.nvertOffset(1);
	j.nvertN1 (nx1, ny1, nz1); j.nvertOffset(1);
	j.nvertN1 (nx1, ny1, nz1);
    }

    /* continuation methods */

    this.a = function (el,k) {
	var an = taccgl.a(el,k);
 	an.absStartTime (this.basetime+this.vduration);
	return (an)
    }

    this.actor = function (el,k,v,n) {
	var an = taccgl.actor(el,k,v,n);
 	an.absStartTime (this.basetime+this.vduration);
	return (an)
    }

    this.vecsize = function (x,y,z) {
	return Math.sqrt(x*x+y*y+z*z);
    }

    this.contIntern = function (an,el) {
	if (this.flags & 65536)
	    an.absStartScroll (this.basetime+this.vduration)
	else
	    an.absStartTime (this.basetime+this.vduration);
	if (this.mappedEl) an.mappedEl=this.mappedEl;

	if (!el) {
	    an.defTexCan = this.defTexCan;
	    this.calcRotEndPoints();
//	    taccgl.clog ("RotEndPoints "+this.roex+","+this.roey+","+this.roez+",H"+this.rohx+","+this.rohy+","+this.rohz+",W"+this.rowx+","+this.rowy+","+this.rowz+",D"+this.rodx+","+this.rody+","+this.rodz);
//	    taccgl.clog ("|H|"+this.vecsize(this.rohx,this.rohy,this.rohz)+"|W|"+this.vecsize(this.rowx,this.rowy,this.rowz)+"|D|"+this.vecsize(this.rodx,this.rody,this.rodz));
	    an.flyIn  (this.roex,this.roey,this.roez);
	    an.hvec   (this.rohx,this.rohy,this.rohz);
	    an.wvec   (this.rowx,this.rowy,this.rowz);
	    an.dvec   (this.rodx,this.rody,this.rodz);
	    an.flyOut (this.roex,this.roey,this.roez);
	    an.eye    (this.veye);
	    //	    an.resize (this.wx1, this.hy1);
	    if (this.docolor) {
		an.blendInt  (this.mix1, this.mixs1);
		if (this.flags & 32) {
		    an.col0s=this.col0s; an.col1s=this.col1s;
		    an.col0t=this.col0t; an.col1t=this.col1t;
		    an.col0t=Math.floor (this.col0t / 256) * 256 + (this.col1t&255);
		} else {
		    an.col0s=this.col1s; an.col1s=this.col1s;
		    an.col0t=this.col1t; an.col1t=this.col1t;
		}
		an.flags |= this.flags & (16+32+64);
	    }
            if ( typeof(this.wp0)=="number" ) {
              an.wp0=this.wp1; an.wq0=this.wq1;
              an.hp0=this.hp1; an.hq0=this.hq1;
              an.p0=this.p1; an.q0=this.q1;
              an.wp1=this.wp1; an.wq1=this.wq1;
              an.hp1=this.hp1; an.hq1=this.hq1;
              an.p1=this.p1; an.q1=this.q1;
            }
            an.flags |= this.flags & 256; // castShadow
	    an.s0  = this.s0; 
	    an.t0  = this.t0; 
	    an.ws0 = this.ws0; an.wt0=this.wt0; // FIXME texmove
	    an.ht0 = this.ht0; an.hs0=this.hs0;
	    an.p   = this.p;
	}
	return (an)
    }
    this.contShiftAtEndAction = function(an){
	if (this.elshowatend) { an.elshowatend = this.elshowatend;  this.elshowatend=null; an.special=true; 
				if (this.postVisibility||this.postVisibility=="") an.postVisibility=this.postVisibility;
				if (this.postOpacity||this.postOpacity==0||this.postOpacity=="") an.postOpacity=this.postOpacity;
			      }
    }

    this.cont = function () {
        var e=this.el, an = new taccgl.taccglAnim (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	return (this.contIntern (an,null));
    }

    this.baseCont  = function () {
        var e=this.el, an = new taccgl.taccglAnim (e);
	return (this.contIntern (an,null));
    }

    this.calcRotation = function (o,x,y,z) {
	var c = Math.cos(-o), mc=(1-c),
	    s = -Math.sin(-o);
        x-=this.rotpx; y-=this.rotpy; z-=this.rotpz;
        this.resx= (c+this.rotax*this.rotax*mc)*x                + (this.rotax*this.rotay*mc-this.rotaz*s)*y + (this.rotax*this.rotaz*mc+this.rotay*s)*z;
	this.resy= (this.rotax*this.rotay*mc+this.rotaz*s)*x +     (c+this.rotay*this.rotay*mc)*y+             (this.rotay*this.rotaz*mc-this.rotax*s) * z;
	this.resz= (this.rotaz*this.rotax*mc-this.rotay*s) * x+    (this.rotaz*this.rotay*mc+this.rotax*s)*y+  (c+this.rotaz*this.rotaz*mc) * z;
	this.resx += this.rotpx;
	this.resy += this.rotpy;
	this.resz += this.rotpz;
    }

    this.calcRotEndPoints = function () {
	if (this.rotation) {
           this.calcRotation(this.rotto,this.x1,this.y1,this.z1);
           this.roex=this.resx;
	   this.roey=this.resy;
	   this.roez=this.resz;
	   this.calcRotation(this.rotto,this.x1+this.hx1,this.y1+this.hy1,this.z1+this.hz1);
	   this.rohx=this.resx-this.roex;
	   this.rohy=this.resy-this.roey;
	   this.rohz=this.resz-this.roez;
	   this.calcRotation(this.rotto,this.x1+this.wx1,this.y1+this.wy1,this.z1+this.wz1);
	   this.rowx=this.resx-this.roex;
	   this.rowy=this.resy-this.roey;
	   this.rowz=this.resz-this.roez;
	   this.calcRotation(this.rotto,this.x1+this.dx1,this.y1+this.dy1,this.z1+this.dz1);
	   this.rodx=this.resx-this.roex;
	   this.rody=this.resy-this.roey;
	   this.rodz=this.resz-this.roez;
        } else {
           this.roex=this.x1;
	   this.roey=this.y1;
	   this.roez=this.z1;
 	   this.rohx=this.hx1;
	   this.rohy=this.hy1;
	   this.rohz=this.hz1;
 	   this.rowx=this.wx1;
	   this.rowy=this.wy1;
	   this.rowz=this.wz1;
 	   this.rodx=this.dx1;
	   this.rody=this.dy1;
	   this.rodz=this.dz1;
       }
    }


    this.freeze = function (t) {
        if (t && t!=1) alert("nyi");
	this.calcRotEndPoints();
	this.x0=this.x1=this.roex; this.y0=this.y1=this.roey; this.z0=this.z1=this.roez;
	this.hx0=this.hx1=this.rohx; this.hy0=this.hy1=this.rohy; this.hz0=this.hz1=this.rohz;
	this.wx0=this.wx1=this.rowx; this.wy0=this.wy1=this.rowy; this.wz0=this.wz1=this.rowz;
	this.dx0=this.dx1=this.rodx; this.dy0=this.dy1=this.rody; this.dz0=this.dz1=this.rodz;
	if (this.docolor) {
	    this.blend(this.mix1, this.mixs1);
	    if (this.flags & 96) {
	    } else {
		this.col0s=this.col1s; this.col1s=this.col1s;
		this.col0t=this.col1t; this.col1t=this.col1t;
	    }
	}
	if (this.dotexmix){
	    this.s0  = this.s1; 
	    this.t0  = this.t1; 
	    this.ws0 = this.ws1; this.wt0=this.wt1;
	    this.ht0 = this.ht1; this.hs0=this.hs1;
	    this.dotexmix=false;
	}
	return this;
    }

    this.calcPos = function (t) {
	if (this.dorotation) {
	    alert("nyi")
	} else {
	    var s=1-t;
	    this.resx=this.x0*s+this.x1*t;
	    this.resy=this.y0*s+this.y1*t;
	    this.resz=this.z0*s+this.z1*t;
	}
    }
    this.intProject = function (x,y,z) {
	if (taccgl.dddmode) {
	    var w=-z*(1/taccgl.stdEye.eyeZ)+1;
	    this.respx= (x-z*(taccgl.stdEye.eyeX/taccgl.stdEye.eyeZ))/w;
	    this.respy= (y-z*(taccgl.stdEye.eyeY/taccgl.stdEye.eyeZ))/w;
	} else {
	    this.respx= x+z*taccgl.stdEye.ddfx;
	    this.respy= y+z*taccgl.stdEye.ddfy;
	}
    }

    this.cssRelPos = function (t) {
	if (!t) t=0;
	this.calcPos(t);
	this.intProject(this.resx,this.resy,this.resz);
        this.el.style.left = this.respx-this.x+"px";	
        this.el.style.top = this.respy-this.y+"px";	
	this.el.style.position = "relative";
	this.cssAdjustFun= function(){this.cssRelPos(t)}; return this;
    }

    this.cssIgnoreRelPos = function (){
	var dx=parseFloat(this.el.style.left);
	var dy=parseFloat(this.el.style.top);
	if (dx) {
	     this.x=this.s0=this.x0=this.x1=this.x-dx;
	}
	if (dy) {
	     this.y=this.t0=this.y0=this.y1=this.y-dy;
	}
	return this;
    }

    this.cssParallax = function (){
	taccgl.doParallax.push(this); return this;
    }

    this.vEnd_x = function () { return((this.ax*0.5 + this.x1-this.x0)/this.vduration);}
    this.vEnd_y = function () { return((this.ay*0.5 + this.y1-this.y0)/this.vduration);}
    this.vEnd_z = function () { return((this.az*0.5 + this.z1-this.z0)/this.vduration);}

    this.contAccel = function (x,y,z,d) {
        if (typeof(x)=="object") { this.resolvePosition(x); x=this.resx;  d=y; y=this.resy; z=this.resz;}
	var an = new taccgl.taccglAnim (this.el);
        an.defTexCan = this.defTexCan;
	an.absStartTime (this.basetime+this.vduration);
	an.flyIn (this.x1,this.y1,this.z1).duration(d).flyOut(x,y,z);
	an.vBegin (this.vEnd_x(),this.vEnd_y(),this.vEnd_z());
	an.hvec(this.hx1,this.hy1,this.hz1);
	an.wvec(this.wx1,this.wy1,this.wz1);
	an.dvec(this.dx1,this.dy1,this.hd1);
	if (this.docolor) {
	    an.blendInt  (this.mix1, this.mixs1);
	    if (this.flags & 96) {
		an.col0s=this.col0s; an.col1s=this.col1s;
		an.col0t=this.col0t; an.col1t=this.col1t;
	    } else {
		an.col0s=this.col1s; an.col1s=this.col1s;
		an.col0t=this.col1t; an.col1t=this.col1t;
	    }
	    an.flags |= this.flags & (16+32+64);
	}
	if (this.mappedEl) an.mappedEl=this.mappedEl;
        if ( typeof(this.wp0)=="number" ) {
            an.wp0=this.wp1; an.wq0=this.wq1;
            an.hp0=this.hp1; an.hq0=this.hq1;
            an.p0=this.p1; an.q0=this.q1;
            an.wp1=this.wp1; an.wq1=this.wq1;
            an.hp1=this.hp1; an.hq1=this.hq1;
            an.p1=this.p1; an.q1=this.q1;
        }
        an.flags |= this.flags & 256; // castShadow
	an.s0  = this.s0; 
	an.t0  = this.t0; 
	an.ws0 = this.ws0; an.wt0=this.wt0; // FIXME texmove
	an.ht0 = this.ht0; an.hs0=this.hs0;
	an.p   = this.p;

	if (this.elshowatend) { an.elshowatend = this.elshowatend;  this.elshowatend=null; an.special=true;
				if (this.postVisibility||this.postVisibility=="") an.postVisibility=this.postVisibility;
				if (this.postOpacity||this.postOpacity==0||this.postOpacity=="") an.postOpacity=this.postOpacity;
			      }
	return (an)
    }

    this.clone = function () {
	return new this.taccglAnimClone (this);
    }

    this.taccglAnimClone = function  (a)
    {
	this.el = a.el; this.x=a.x; this.y=a.y; this.w=a.w; this.h=a.h;
	if (a.mappedEl) this.mappedEl=a.mappedEl;
	this.curface=this;

	
	this.x0 = a.x0; this.y0 = a.y0; this.z0=a.z0; this.s0 = a.s0; this.t0 = a.t0;
	this.wx0 = a.wx0; this.wy0 = a.wy0; this.wz0=a.wz0; 
	this.hx0 = a.hx0; this.hy0 = a.hy0; this.hz0=a.hz0; 
	this.dx0 = a.dx0; this.dy0 = a.dy0; this.dz0=a.dz0; 
	this.ws0 = a.ws0; this.ht0 = a.ht0; this.wt0=a.wt0; this.hs0=a.hs0;
	
	this.x1 = a.x1; this.y1 = a.y1; this.z1=a.z1; this.s1 = a.s1; this.t1 = a.t1;
	this.wx1 = a.wx1; this.wy1 = a.wy1; this.wz1=a.wz1; 
	this.hx1 = a.hx1; this.hy1 = a.hy1; this.hz1=a.hz1; 
	this.dx1 = a.dx1; this.dy1 = a.dy1; this.dz1=a.dz1; 
	this.ws1 = a.ws1; this.ht1 = a.ht1; this.wt1=a.wt1; this.hs1=a.hs1;
	
	this.rotation = a.rotation;
	this.flags = a.flags;
	this.basetime = a.basetime;
	this.vduration = a.vduration;
	this.isforeground = a.isforeground;
	this.elshowatend = a.elshowatend;
	this.doacceleration = a.doacceleration;
	this.dotexmove = a.dotexmove;
	this.docolor = a.docolor;
	this.p = a.p;
	this.lightSpecular = a.lightSpecular;
	this.lightShininess= a.lightShininess;
        this.defTexCan = a.defTexCan;
	this.veye = a.veye;

	if (this.doacceleration)  {this.ax=a.ax; this.ay=a.ay; this.az=a.az;}

	if (this.rotation) {      this.rotpx=a.rotpx; this.rotpy=a.rotpy; this.rotpz=a.rotpz;
				  this.rotax=a.rotax; this.rotay=a.rotay;  this.rotaz=a.rotaz;
				  this.rotfrom=a.rotfrom; this.rotto=a.rotto; }

	if (this.docolor) {
	    this.mix1=a.mix1; this.mix0=a.mix0; this.mixs0=a.mixs0; this.mixs1=a.mixs1;
	    this.col0s=a.col0s;
	    this.col0t=a.col0t;
	    this.col1s=a.col1s;
	    this.col1t=a.col1t;
	}
        if ( typeof(a.wp0)=="number" ) {
           this.wp0=a.wp0; this.wq0=a.wq0;
           this.hp0=a.hp0; this.hq0=a.hq0;
           this.p0=a.p0; this.q0=a.q0;
           this.wp1=a.wp1; this.wq1=a.wq1;
           this.hp1=a.hp1; this.hq1=a.hq1;
           this.p1=a.p1; this.q1=a.q1;
        }
	if (a.attime || a.attime==0) {
	    this.attime = a.attime; taccgl.newDoat (this);
	}
    }
}

// taccglAnimClone.prototype = new taccglAnimPrototype();


function taccglFlexiBorderPrototype (el)
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
	this.initSuper(el);
	this.vnparts=100; this.vtest2=false;
	this.dx0=this.dx1=0; this.dy0=this.dy1=0; this.dz0=this.dz1=this.hy0;
    }
    this.initSecond = function (){};
    this.nparts = function (n){
	this.vnparts = n; return this;
    }

    this.startH = function () {
        var j = taccgl, n = this.vnparts, i, px1, pz1, py1, px0, pz0, py0, n0x1, n0y1, n0z1, n1x1, n1y1, n1z1, n2x1, n2y1, n2z1;
	var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer

	for (i=0; i<=n; i++) {
	    if (this.vtest2 && i%2==1) continue;
	    //	    qx = this.x0 + this.hx0/n*i;
            if (i < n  ) {
/*		var nx = this.hy0*this.wz0 - this.hz0*this.wy0,
		    ny = this.hz0*this.wx0 - this.hx0*this.wz0,
		    nz = this.hx0*this.wy0 - this.hy0*this.wx0; */
		
		this.resnx=this.resny=this.resnz=0;
		this.borderFun1 (this.x1 + this.wx1/n*i, this.y1 + this.wy1/n*i, this.z1 + this.wz1/n*i, i/n, 0);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		n0x1=this.resnx; n0y1=this.resny; n0z1=this.resnz;
		this.resnx=this.resny=this.resnz=0;
		this.borderFun0 (this.x0 + this.wx0/n*i, this.y0 + this.wy0/n*i, this.z0 + this.wz0/n*i, i/n, 0);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, this.resnx, this.resny, this.resnz, spec,
			     this.s0 + this.ws0/n*i, this.t0+this.wt0/n*i,
			     this.flags,this.basetime,this.vduration);

		this.resnx=this.resny=this.resnz=0;
		this.borderFun1 (this.x1 + this.wx1/n*i+this.hx1, this.y1 + this.wy1/n*i+this.hy1, this.z1 + this.wz1/n*i+this.hz1, i/n, 1);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		n1x1=this.resnx; n1y1=this.resny; n1z1=this.resnz;
		this.resnx=this.resny=this.resnz=0;
		this.borderFun0 (this.x0 + this.wx0/n*i+this.hx0, this.y0 + this.wy0/n*i+this.hy0, this.z0 + this.wz0/n*i+this.hz0, i/n, 1);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, this.resnx, this.resny, this.resnz, spec,
			     this.s0 + this.ws0/n*i + this.hs0, this.t0 + this.wt0/n*i + this.ht0,
			     this.flags,this.basetime,this.vduration);

		this.resnx=this.resny=this.resnz=0;
		i++; this.borderFun1 (this.x1 + this.wx1/n*i, this.y1 + this.wy1/n*i, this.z1 + this.wz1/n*i, i/n, 0);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		n2x1=this.resnx; n2y1=this.resny; n2z1=this.resnz;
		this.resnx=this.resny=this.resnz=0;
		this.borderFun0 (this.x0 + this.wx0/n*i, this.y0 + this.wy0/n*i, this.z0 + this.wz0/n*i, i/n, 0);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, this.resnx, this.resny, this.resnz, spec,
			     this.s0 + this.ws0/n*i, this.t0+this.wt0/n*i,
			     this.flags,this.basetime,this.vduration); i--;
		if (this.resnx==0 && this.resny==0 && this.resnz==0) {
		    if (n2x1==0 && n2y1==0 && n2z1==0) {
			this.startFixNormal();
		    } else {
			this.startFixNormal0();
			j.nvertOffset (-2);
			j.nvertN1 (n0x1, n0y1, n0z1); j.nvertOffset(1);
			j.nvertN1 (n1x1, n1y1, n1z1); j.nvertOffset(1);
			j.nvertN1 (n2x1, n2y1, n2z1); 
		    }
		} else {
		    if (n2x1==0 && n2y1==0 && n2z1==0) {
			this.startFixNormal1();
		    } else {
			j.nvertOffset (-2);
			j.nvertN1 (n0x1, n0y1, n0z1); j.nvertOffset(1); 
			j.nvertN1 (n1x1, n1y1, n1z1); j.nvertOffset(1);
			j.nvertN1 (n2x1, n2y1, n2z1);
		    }
		}

		this.resnx=this.resny=this.resnz=0;
		this.borderFun1 (this.x1 + this.wx1/n*i+this.hx1, this.y1 + this.wy1/n*i+this.hy1, this.z1 + this.wz1/n*i+this.hz1, i/n, 1);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		n0x1=this.resnx; n0y1=this.resny; n0z1=this.resnz;
		this.resnx=this.resny=this.resnz=0;
		this.borderFun0 (this.x0 + this.wx0/n*i+this.hx0, this.y0 + this.wy0/n*i+this.hy0, this.z0 + this.wz0/n*i+this.hz0, i/n, 1);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, this.resnx, this.resny, this.resnz, spec,
			     this.s0 + this.ws0/n*i+this.hs0, this.t0 + this.wt0/n*i + this.ht0,
			     this.flags,this.basetime,this.vduration);
		i++; this.borderFun1 (this.x1 + this.wx1/n*i+this.hx1, this.y1 + this.wy1/n*i+this.hy1, this.z1 + this.wz1/n*i+this.hz1, i/n, 1);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		n1x1=this.resnx; n1y1=this.resny; n1z1=this.resnz;
		this.borderFun0 (this.x0 + this.wx0/n*i+this.hx0, this.y0 + this.wy0/n*i+this.hy0, this.z0 + this.wz0/n*i+this.hz0, i/n, 1);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, this.resnx, this.resny, this.resnz, spec,
			     this.s0 + this.ws0/n*i + this.hs0, this.t0 + this.wt0/n*i + this.ht0,
			     this.flags,this.basetime,this.vduration); i--;
		this.resnx=this.resny=this.resnz=0;
		i++; this.borderFun1 (this.x1 + this.wx1/n*i, this.y1 + this.wy1/n*i, this.z1 + this.wz1/n*i, i/n, 0);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		n2x1=this.resnx; n2y1=this.resny; n2z1=this.resnz;
		this.resnx=this.resny=this.resnz=0;
		this.borderFun0 (this.x0 + this.wx0/n*i, this.y0 + this.wy0/n*i, this.z0 + this.wz0/n*i, i/n, 0);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, this.resnx, this.resny, this.resnz, spec,
			     this.s0 + this.ws0/n*i, this.t0 + this.wt0/n*i,
			     this.flags,this.basetime,this.vduration); i--;

		if (this.resnx==0 && this.resny==0 && this.resnz==0) {
		    if (n2x1==0 && n2y1==0 && n2z1==0) {
			this.startFixNormal();
		    } else {
			this.startFixNormal0();
			j.nvertOffset (-2);
			j.nvertN1 (n0x1, n0y1, n0z1); j.nvertOffset(1);
			j.nvertN1 (n1x1, n1y1, n1z1); j.nvertOffset(1);
			j.nvertN1 (n2x1, n2y1, n2z1); 
		    }
		} else {
		    if (n2x1==0 && n2y1==0 && n2z1==0) {
			this.startFixNormal1();
		    } else {
			j.nvertOffset (-2);
			j.nvertN1 (n0x1, n0y1, n0z1); j.nvertOffset(1);
			j.nvertN1 (n1x1, n1y1, n1z1); j.nvertOffset(1);
			j.nvertN1 (n2x1, n2y1, n2z1); 
		    }
		}
		this.startRest();
	    }
	}
   }


    this.startC = function (){
        var j = taccgl, n = this.vnparts,
            mx0=this.x0+this.wx0/2, my0=this.y0+this.hy0/2, mz0=this.z0,
            mx1=this.x1+this.wx1/2, my1=this.y1+this.hy1/2, mz1=this.z1,
            ms=this.s0+this.ws0*0.5, mt=this.t0+this.ht0*0.5, // FIXME hs0
	    i,px,py,pz,px1,py1,pz1,
	    qx,qy,qz,qx1,qy1,qz1,
	    ps,pt,qs,qt;

        for (i=0; i<=n; i++) {
	    var al= Math.PI*2*i/n,
	        s = Math.sin(al), c=Math.cos(al),
	        w=1, relx, rely;

            px1= mx1+(c*w*this.wx1);    py1 =my1+(s*w*this.hy1);  pz1= this.z1; relx=c; rely=s;

	    if (s<=-0.5) { py1=my1-this.hy1*0.5; px1= mx1-0.5*this.wx1*c/s; rely=0; relx=0.5-0.5*c/s;} 
	    if (s>=0.5)  { py1=my1+this.hy1*0.5; px1= mx1+0.5*this.wx1*c/s; rely=1; relx=0.5+0.5*c/s;} 
	    if (px1>mx1+this.wx1/2) { px1=mx1+this.wx1/2; py1= my1+0.5*this.hy1*s/c; relx=1; rely=0.5+0.5*s/c;}
	    if (px1<mx1-this.wx1/2) { px1=mx1-this.wx1/2; py1= my1-0.5*this.hy1*s/c; relx=0; rely=0.5-0.5*s/c;}


	    this.borderFun1 (px1,py1,pz1,relx,rely);
	    px1=this.resx; py1=this.resy; pz1=this.resz;


	    var rx0=mx0+c*this.wx0, ry0 /*=my0+s*this.hy0*/ ; // coordinates of point on rectangle x0,y0,wx0,hy0
	    relx=c; rely=s;
            if (s<=-0.5) {ry0=my0-this.hy0*0.5; rx0=mx0-0.5*this.wx0*c/s;rely=0; relx=0.5-0.5*c/s;}
	    if (s>=0.5)  {ry0=my0+this.hy0*0.5; rx0=mx0+0.5*this.wx0*c/s;rely=1; relx=0.5+0.5*c/s;}
	    if (rx0<mx0-this.wx0*0.5)  {rx0=mx0-this.wx0*0.5; ry0=my0-0.5*this.hy0*s/c;relx=1; rely=0.5+0.5*s/c;}
	    if (rx0>mx0+this.wx0*0.5)  {rx0=mx0+this.wx0*0.5; ry0=my0+0.5*this.hy0*s/c;relx=0; rely=0.5-0.5*s/c;}
	    px=rx0; py=ry0;pz= this.z0;

	    this.borderFun0 (px,py,pz,relx,rely);
	    px=this.resx; py=this.resy; pz=this.resz;

	    // ps and pt become coordinates of point in texture on rectangle s0,t0,ws0,ht0
	    ps=ms+c*this.ws0;
            if (s<=-0.5) {pt=mt-this.ht0*0.5; ps=ms-0.5*this.ws0*c/s;}
	    if (s>=0.5)  {pt=mt+this.ht0*0.5; ps=ms+0.5*this.ws0*c/s;}
	    if (ps<ms-this.ws0*0.5)  {ps=ms-this.ws0*0.5; pt=mt-0.5*this.ht0*s/c;}
	    if (ps>ms+this.ws0*0.5)  {ps=ms+this.ws0*0.5; pt=mt+0.5*this.ht0*s/c;}

            if (i>0   && (!this.vtest2 || (i%2!=1))  ) { /* FIXME nvertMove */
//		alert("FIXME 487456");
		j.nvertMove (qx,qy,qz, qx1,qy1,qz1, 0,0,0,0, qs,qt   
  		         ,this.flags,this.basetime,this.vduration);
		j.nvertMove (px,py,pz, px1,py1,pz1, 0,0,0,0, ps, pt 
  		         ,this.flags,this.basetime,this.vduration);
		j.nvertMove (mx0,my0,mz0, mx1,my1,mz1, 0,0,0,0,  this.s0+this.ws0/2, this.t0+this.ht0/2  
  		         ,this.flags,this.basetime,this.vduration);
  	       this.startFixNormal();
	       this.startRestTriangle ();
	    }
	    qx=px; qy=py; qz=pz;
	    qx1=px1; qy1=py1; qz1=pz1; qs=ps; qt=pt;
       }
       return this;
    }

    this.renderFun= this.startH;

    this.start = function () {
	if (taccgl.dddmode) {
	    if (this.special) this.startSpecial();
            var maxindex=null, j=taccgl;
            if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}

	    this.evalObjt();

	    this.renderFun(); 
	    this.vertEndIndex=j.vertI;
	    if (maxindex) j.vertI=maxindex;
	    if (taccgl_debug_vertex) {
		taccgl.dumpVertexTransition(this);
	    } // taccgl_debug_end
	    if (this.p!=j.stdsc) j.setShader(j.stdsc);
	} else
	    this.ddstart(); 
	return this;
    }

    this.horizontal = function () { this.renderFun=this.startH; return this;}
    this.vertical   = function () { this.renderFun=this.startV; return this;}
    this.circular   = function () { this.renderFun=this.startC; return this;}
    this.test2      = function () { this.vtest2=true; return this;}


    this.borderRect = function (x,y,z) {
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderRelRect0 = function (x,y,z,rx,ry) {
	this.resx=this.x0+this.wx0*rx+this.hx0*ry;
	this.resy=this.y0+this.wy0*rx+this.hy0*ry; 
	this.resz=this.z0+this.wz0*rx+this.hz0*ry;
    }
    this.borderRelRect1 = function (x,y,z,rx,ry) {
	this.resx=this.x1+this.wx1*rx+this.hx1*ry;
	this.resy=this.y1+this.wy1*rx+this.hy1*ry; 
	this.resz=this.z1+this.wz1*rx+this.hz1*ry;
    }

    this.borderCircle1 = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
//	    r = this.wx1*0.5,
	    nd=d,
	    ne = Math.sqrt (this.hy1*this.hy1*0.25 - this.hy1*this.hy1/this.wx1/this.wx1*d*d);
	if (e<0) ne=-ne;
	if (isNaN(ne)) ne=0;
	this.resx=mx+nd; this.resy=my+ne; this.resz=this.z1;
    }
	
    this.borderCircle0 = function (x,y,z) {
	var mx= this.x0+this.wx0*0.5,
	    my= this.y0+this.hy0*0.5,
	    d= x-mx, e=y-my,
//	    r = this.wx0*0.5,

	    nd=d,
	    ne = Math.sqrt (this.hy0*this.hy0*0.25 - this.hy0*this.hy0/this.wx0/this.wx0*d*d);
	if (isNaN(ne)) ne=0;
	if (e<0) ne=-ne;
	this.resx=mx+nd; this.resy=my+ne; this.resz=this.z0;
    }

    this.borderResize = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
	
 	    nd=d+0.01*e*e,
	    ne=e+0.001*d*d;

	this.resx=mx+nd; this.resy=my+ne; this.resz=this.z1;
    }

    this.borderWave0 = function (x,y,z) {
	var mx= this.x0+this.wx0*0.5,
	    my= this.y0+this.hy0*0.5,
	    d= x-mx, e=y-my,
	    p=(x-this.x0)/this.wx0,
	    al = this.wavefv0*(1-p)+this.wavetv0*p, ne ,nd;
	if (e>0) 
	    ne = e+ Math.sin(al)*this.ampb0; 
	else
	    ne = e+ Math.sin(al)*this.ampt0; 
	p=(y-this.y0)/this.hy0,
	al = this.wavefh0*(1-p)+this.waveth0*p;
	if (d>0) 
	    nd = d+ Math.sin(al)*this.ampl0; 
	else
	    nd = d+ Math.sin(al)*this.ampr0; 
	this.resx=mx+nd; this.resy=my+ne; this.resz=z;
    }
    this.borderWave1 = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
	    p=(x-this.x1)/this.wx1,
	al = this.wavefv1*(1-p)+this.wavetv1*p, ne, nd;
	if (e>0) 
	    ne = e+ Math.sin(al)*this.ampb1; 
	else
	    ne = e+ Math.sin(al)*this.ampt1; 
	p=(y-this.y1)/this.hy1,
	al = this.wavefh1*(1-p)+this.waveth1*p;
	if (d>0) 
	    nd = d+ Math.sin(al)*this.ampl1; 
	else
	    nd = d+ Math.sin(al)*this.ampr1; 
	this.resx=mx+nd; this.resy=my+ne; this.resz=z;
    }

    this.borderZWave0 = function (x,y,z,rx,ry) {
	var nx, rz,
	    al = this.wavefv0*(1-rx)+this.wavetv0*rx;
	if (ry>0.5) {
	    rz = Math.sin(al)*this.ampb0; 
	    nx = Math.cos(al)*this.ampb0*(this.wavetv0-this.wavefv0); 
	} else {
	    rz = Math.sin(al)*this.ampt0; 
	    nx = Math.cos(al)*this.ampt0*(this.wavetv0-this.wavefv0); 
	}
	al = this.wavefh0*(1-ry)+this.waveth0*ry;
	if (rx<0.5) 
	    rz += Math.sin(al)*this.ampl0; 
	else
	    rz += Math.sin(al)*this.ampr0; 
	this.resx=x+rz*this.dx0; this.resy=y+rz*this.dy0; this.resz=z+rz*this.dz0;

	var nz=1, ny=0;
	var t=this.objt0inv;
	this.resnx = nx*t[0]+ny*t[1]+nz*t[2];
	this.resny = nx*t[3]+ny*t[4]+nz*t[5];
	this.resnz = nx*t[6]+ny*t[7]+nz*t[8];
//	this.resnx=0; this.resny=0; this.resnz=1;
    }
    this.borderZWave1 = function (x,y,z,rx,ry) {
	var nx, rz,
	    al = this.wavefv1*(1-rx)+this.wavetv1*rx;
	if (ry>0.5) {
	    rz = Math.sin(al)*this.ampb1; 
	    nx = Math.cos(al)*this.ampb1*(this.wavetv1-this.wavefv1); 
	} else {
	    rz =  Math.sin(al)*this.ampt1; 
	    nx = Math.cos(al)*this.ampt1*(this.wavetv1-this.wavefv1); 
	}
	al = this.wavefh1*(1-ry)+this.waveth1*ry;
	if (rx>0.5) 
	    rz +=  Math.sin(al)*this.ampl1; 
	else
	    rz +=  Math.sin(al)*this.ampr1; 
	this.resx=x+rz*this.dx1; this.resy=y+rz*this.dy1; this.resz=z+rz*this.dz1;

	var nz=1, ny=0;
	var t=this.objt1inv;
	this.resnx = nx*t[0]+ny*t[1]+nz*t[2];
	this.resny = nx*t[3]+ny*t[4]+nz*t[5];
	this.resnz = nx*t[6]+ny*t[7]+nz*t[8];

//	this.resnx=0; this.resny=0; this.resnz=1;
    }

    this.borderFlip1x = function (x,y,z) {
	var f;
	if (y < this.y1+0.5*this.hy1) f = this.flipt1; else f = this.flipb1;

	var fx= this.x1+this.wx1*f;
//	    fy= this.y1+this.hy1*f;
	
	if (x<fx  /* || y<fy */ ) {
	    this.resx=x; this.resy=y; this.resz=z;
	    return;
	}
	 
	var p = (x - fx) / (this.wx1*(1-f));

        x = fx + Math.cos (Math.PI * (1-p) * 0.5 ) *((1-f)*this.wx1) / Math.PI * 2;
	//        z += (- 1 + Math.sin (Math.PI * (1-p) * 0.5 )) *((1-f)*this.wx1) / Math.PI *2;
        z += (- 1 + Math.sin (Math.PI * (1-p) * 0.5 )) *((1-f)*1000) / Math.PI *2;
       
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderFlip1 = function (x,y,z,rx,ry) {
	var f,p,q,nx,ny,nz,gamma;

	if (ry < 0.5) { f = this.flipt1; gamma=this.flipGammat1; } 
	else { f = this.flipb1; gamma=this.flipGammab1;}

//	if (y < this.y1+0.5*this.hy1) f = this.flipt1; else f = this.flipb1;

	var fx= this.x1+this.wx1*f, fy= this.y1+this.wy1*f, fz= this.z1+this.wz1*f;

	if (ry > 0.5) {fx+=this.hx1; fy+=this.hy1; fz+=this.hz1;}
	
        q=rx;

	if (q<f) {
	    nx=0; ny=0; nz=1;
	} else {
	    var alpha= -(q-f)*(2*gamma+Math.PI)/(1-f)*0.5 +Math.PI*0.5;
//	    p = (q-f)/(1-f);
	    var wl=  Math.sqrt (this.wx1*this.wx1+this.wy1*this.wy1+this.wz1*this.wz1),
	    dl=  Math.sqrt (this.dx1*this.dx1+this.dy1*this.dy1+this.dz1*this.dz1),
	    wlb = wl * (1-f);
            var s= -(8*wlb-8*f) / ((4*Math.sqrt(dl*wlb)-6*wlb-6*dl)*gamma + 2*Math.PI*Math.sqrt(dl*wlb) - 3*Math.PI*wlb - 3*dl*Math.PI );
//	    var s= -(8*wlb-8*f) / (2 * Math.sqrt(dl*wlb)*Math.PI -3*Math.PI*wlb - 3*dl*Math.PI );
//            var g = s*(1-f)*(Math.cos(-p*Math.PI*0.5 + Math.PI*0.5 )),  h = s*(Math.sin(-p*Math.PI*0.5 + Math.PI*0.5 ))-s;
            var g = s*(1-f)*(Math.cos(alpha)),  h = s*(Math.sin(alpha))-s;

	    x = fx + g*this.wx1 - h*this.dx1;
	    y = fy + g*this.wy1 - h*this.dy1;
	    z = fz + g*this.wz1 - h*this.dz1;
	    //        x = fx + Math.cos (Math.PI * (1-p) * 0.5 ) *((1-f)*this.wx0) / Math.PI * 2;

	    nx = s*(2*gamma+Math.PI) * Math.cos(alpha) / (f-1) * 0.5;
            ny = 0;
	    nz = s*(2*gamma+Math.PI) * Math.sin(alpha) * 0.5;
// 	    nx=0; ny=0; nz=-1;
//           nx= - Math.cos (Math.PI * (1-p) * 0.5 ) * wl; ny=0; nz= - Math.sin(Math.PI * (1-p) * 0.5 );
	}
	var t=this.objt1inv;
	this.resnx = nx*t[0]+ny*t[1]+nz*t[2];
	this.resny = nx*t[3]+ny*t[4]+nz*t[5];
	this.resnz = nx*t[6]+ny*t[7]+nz*t[8];
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderFlip0 = function (x,y,z,rx,ry) {
	var f,p,q,nx,ny,nz, gamma;

	if (ry < 0.5) { f = this.flipt0; gamma=this.flipGammat0; } 
	else { f = this.flipb0; gamma=this.flipGammab0;}

	var fx= this.x0+this.wx0*f, fy= this.y0+this.wy0*f, fz= this.z0+this.wz0*f;

	if (ry > 0.5) {fx+=this.hx0; fy+=this.hy0; fz+=this.hz0;}
	
        q=rx;
	if (q<f) {
	    nx=0; ny=0; nz=1;
	} else {
//	    p = (q-f)/(1-f);
	    var alpha= -(q-f)*(2*gamma+Math.PI)/(1-f)*0.5 +Math.PI*0.5;
	    var wl=  Math.sqrt (this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0),
	    dl=  Math.sqrt (this.dx0*this.dx0+this.dy0*this.dy0+this.dz0*this.dz0),
	    wlb = wl * (1-f);
//            var s= -(8*wlb-8*f) / (2 * Math.sqrt(dl*wlb)*Math.PI -3*Math.PI*wlb - 3*dl*Math.PI );
            var s= -(8*wlb-8*f) / ((4*Math.sqrt(dl*wlb)-6*wlb-6*dl)*gamma + 2*Math.PI*Math.sqrt(dl*wlb) - 3*Math.PI*wlb - 3*dl*Math.PI );
//            var g = s*(1-f)*(Math.cos(-p*Math.PI*0.5 + Math.PI*0.5 )),  h = s*(Math.sin(-p*Math.PI*0.5 + Math.PI*0.5 ))-s;
            var g = s*(1-f)*(Math.cos(alpha)),  h = s*(Math.sin(alpha))-s;

	    x = fx + g*this.wx0 - h*this.dx0;
	    y = fy + g*this.wy0 - h*this.dy0;
	    z = fz + g*this.wz0 - h*this.dz0;


	    nx = s*(2*gamma+Math.PI) * Math.cos(alpha) / (f-1) * 0.5;
            ny = 0;
	    nz =  s*(2*gamma+Math.PI) * Math.sin(alpha) * 0.5;
//	    nx=0; ny=0; nz=-1;
//            nx=  -Math.cos (Math.PI * (1-p) * 0.5 ) * wl; ny=0; nz=-Math.sin(Math.PI * (1-p) * 0.5 );
	}
	var t=this.objt0inv;
	this.resnx = nx*t[0]+ny*t[1]+nz*t[2];
	this.resny = nx*t[3]+ny*t[4]+nz*t[5];
	this.resnz = nx*t[6]+ny*t[7]+nz*t[8];
  	this.resx=x; this.resy=y; this.resz=z;
    }

    this.Flip = function (ft,fb,gammat,gammab) {
	if (!gammat) gammat=0;
	if (!gammab) gammab=0;
	this.flipGammat1=gammat; this.flipGammab1=gammab;
	this.flipGammat0=gammat; this.flipGammab0=gammab;
	this.flipt1=ft; this.flipb1=fb;
	this.flipt0=ft; this.flipb0=fb;
	this.borderFun1 = this.borderFlip1; 
	this.borderFun0 = this.borderFlip0; 
	return this;
    }
    this.Flip1 = function (ft,fb,gammat,gammab) {
	if (!gammat) gammat=0;
	if (!gammab) gammab=0;
	this.flipGammat1=gammat; this.flipGammab1=gammab;
	this.flipt1=ft; this.flipb1=fb
	this.borderFun1 = this.borderFlip1; 
	return this;
    }

    this.borderFun1 = this.borderRect;
    this.borderFun0 = this.borderRect;

    this.Circle = function (){
        this.borderFun0 = this.borderCircle0;this.borderFun1 = this.borderCircle1; return this;
    }
    this.Circle1 = function (){
        this.borderFun1 = this.borderCircle1; return this;
    }
    this.Rect = function (){
        this.borderFun0 = this.borderRect;this.borderFun1 = this.borderRect; return this;
    }
    this.Rect1 = function (){
        this.borderFun1 = this.borderRect; return this;
    }
    this.RelRect = function (){
        this.borderFun0 = this.borderRelRect0;this.borderFun1 = this.borderRelRect1; return this;
    }
    this.RelRect1 = function (){
        this.borderFun1 = this.borderRelRect1; return this;
    }

    this.Wave = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	this.Wave1 (ampt,ampb,fv,tv,ampl,ampr,fh,th);
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt0=ampt; 
	this.ampb0=ampb; 
	this.ampl0=ampl; 
	this.ampr0=ampr; 
	this.wavefh0=fh;
	this.waveth0=th;
	this.wavefv0=fv;
	this.wavetv0=tv;
        this.borderFun0 = this.borderWave0; return this;
    }
    this.Wave1 = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt1=ampt; 
	this.ampb1=ampb; 
	this.ampl1=ampl; 
	this.ampr1=ampr; 
	this.wavefh1=fh;
	this.waveth1=th;
	this.wavefv1=fv;
	this.wavetv1=tv;
        this.borderFun1 = this.borderWave1; return this;
    }
    this.ZWave = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	this.ZWave1  (ampt,ampb,fv,tv,ampl,ampr,fh,th);
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt0=ampt; 
	this.ampb0=ampb; 
	this.ampl0=ampl; 
	this.ampr0=ampr; 
	this.wavefh0=fh;
	this.waveth0=th;
	this.wavefv0=fv;
	this.wavetv0=tv;
        this.borderFun0 = this.borderZWave0; return this;
    }
    this.ZWave1 = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt1=ampt; 
	this.ampb1=ampb; 
	this.ampl1=ampl; 
	this.ampr1=ampr; 
	this.wavefh1=fh;
	this.waveth1=th;
	this.wavefv1=fv;
	this.wavetv1=tv;
        this.borderFun1 = this.borderZWave1; return this;
    }


    this.cont = function (el) {
	var e = el;
        if (!el) e=this.el;
	var an = new taccgl.flexiBorder (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an,el);  
	an.nparts (this.vnparts);
	an.renderFun = this.renderFun; an.vtest2=this.vtest2;
	if (this.borderFun1==this.borderCircle1) {
	    an.Circle();
	} else 	if (this.borderFun1==this.borderWave1) {
	    an.Wave( this.ampt1, this.ampb1, this.wavefv1, this.wavetv1, this.ampl1, this.ampr1, this.wavefh1, this.waveth1)
	} else 	if (this.borderFun1==this.borderZWave1) {
	    an.ZWave( this.ampt1, this.ampb1, this.wavefv1, this.wavetv1, this.ampl1, this.ampr1, this.wavefh1, this.waveth1)
	} else 	if (this.borderFun1==this.borderFlip1) {
	    an.Flip (this.flipt1, this.flipb1, this.flipGammat1,this.flipGammab1);
	}

	return (an);
    }

    this.clone = function (a) { return new this.taccglFlexiBorderClone (this); }
    this.taccglFlexiBorderClone = function (a) {
	this.taccglAnimClone (a);
	this.vnparts= a.vnparts;
	this.vtest2= a.vtest2;
	this.renderFun = a.renderFun;
	this.borderFun1 = a.borderFun1;
	this.borderFun0 = a.borderFun0;
	if (this.borderFun1==this.borderWave1 || this.borderFun1==this.borderZWave1) {
	    this.ampt1=a.ampt1; this.ampb1=a.ampb1; this.wavefv1=a.wavefv1; this.wavetv1=a.wavetv1; 
	    this.ampl1=a.ampl1; this.ampr1=a.ampr1; this.wavefh1=a.wavefh1; this.waveth1=a.waveth1;
	} else 	if (this.borderFun1==this.borderFlip1) {
	    this.flipt1=a.flipt1; this.flipb1=a.flipb1;
	}
	if (this.borderFun0==this.borderWave0 || this.borderFun0==this.borderZWave0) {
	    this.ampt0=a.ampt0; this.ampb0=a.ampb0; this.wavefv0=a.wavefv0; this.wavetv0=a.wavetv0; 
	    this.ampl0=a.ampl0; this.ampr0=a.ampr0; this.wavefh0=a.wavefh0; this.waveth0=a.waveth0;
	} else 	if (this.borderFun0==this.borderFlip0) {
	    this.flipt0=a.flipt0; this.flipb0=a.flipb0;
	}
    }
}
taccglFlexiBorderPrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.flexiBorder.prototype = new taccglFlexiBorderPrototype();
taccgl.flexiBorder.prototype.taccglFlexiBorderClone.prototype = taccgl.flexiBorder.prototype;

function taccglTrianglePrototype (el)
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
	this.initSuper(el);
    }
    this.cont = function () {
        var e=this.el, an = new taccgl.triangle (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	return (this.contIntern (an,null));
    }
    this.clone = function(a) {return new this.taccglTriangleClone(this);}
    this.taccglTriangleClone = function (a){
	this.taccglAnimClone(a);
    }
   this.start = function () {
       var j = taccgl;
       if (!j.dddmode)  return this; 

       var maxindex=null;
       if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}

       if (this.special) this.startSpecial();

       var nx = -this.hy0*this.wz0 + this.hz0*this.wy0,
           ny = -this.hz0*this.wx0 + this.hx0*this.wz0,
           nz = -this.hx0*this.wy0 + this.hy0*this.wx0;
       var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer

       j.nvertMove (this.x0, this.y0, this.z0                              ,this.x1, this.y1, this.z1
		    ,nx,ny,nz,spec,  this.s0,this.t0,  this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.hx0, this.y0+this.hy0, this.z0+this.hz0   ,this.x1+this.hx1, this.y1+this.hy1, this.z1+this.hz1   
		    ,nx,ny,nz,spec, this.s0+this.hs0,this.t0+this.ht0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0, this.y0+this.wy0, this.z0+this.wz0   ,this.x1+this.wx1, this.y1+this.wy1, this.z1+this.wz1  
		    ,nx,ny,nz,spec,  this.s0+this.ws0 ,this.t0+this.wt0, this.flags,this.basetime,this.vduration);

       this.startRestTriangle();
       if (this.p!=j.stdsc) j.setShader(j.stdsc);
       this.vertEndIndex=j.vertI;
       if (maxindex) j.vertI=maxindex;
       if (taccgl_debug_vertex) {
	   taccgl.dumpVertexTransition(this);
       } // taccgl_debug_end
       return this;
   }
}
taccglTrianglePrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.triangle.prototype = new taccglTrianglePrototype();
taccgl.triangle.prototype.taccglTriangleClone.prototype = taccgl.triangle.prototype;

function taccglMultiFacePrototype (el)
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
	this.face = Array(0);
	this.initSuper(el);
    }
    this.initSecond = function (){};
    this.createFace = function (xtl,ytl,ztl,xtr,ytr,ztr,xbl,ybl,zbl,xbr,ybr,zbr){
	this.xtl=xtl;this.ytl=ytl;this.ztl=ztl;
	this.xtr=xtr;this.ytr=ytr;this.ztr=ztr;
	this.xbl=xbl;this.ybl=ybl;this.zbl=zbl;
	this.xbr=xbr;this.ybr=ybr;this.zbr=zbr;
    }
    this.newFace = function(xtl,ytl,ztl,xtr,ytr,ztr,xbl,ybl,zbl,xbr,ybr,zbr){
	var f = new this.createFace(xtl,ytl,ztl,xtr,ytr,ztr,xbl,ybl,zbl,xbr,ybr,zbr);
        if (!this.dotexmove) {this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;this.wt1=this.wt0;this.hs1=this.hs0}
	f.flags=this.flags; f.defTexCan=1;
	f.s0=this.s0; f.t0=this.t0;
	f.ws0=this.ws0; f.ht0=this.ht0; f.wt0=this.wt0; f.hs0=this.hs0; 
	f.s1=this.s1; f.t1=this.t1;
	f.ws1=this.ws1; f.ht1=this.ht1; f.w=this.w; f.h=this.h; f.x=this.x; f.y=this.y;
	f.docolor=this.docolor; 
	if (this.docolor) {
	    f.ddcolor0=this.ddcolor0; f.ddcolor1=this.ddcolor1;
	    f.mix0=this.mix0; f.mix1=this.mix1; 
	    f.mixs0=this.mixs0; f.mixs1=this.mixs1; 
	    f.col0s=this.col0s;
	    f.col0t=this.col0t;
	    f.col1s=this.col1s;
	    f.col1t=this.col1t;
	}
	if (this.atBl) f.atBl=this.atBl;
	f.lightSpecular=taccgl.lightSpecular;
	f.lightShininess=taccgl.lightShininess;
	f.el = this.el;
	f.defTexCan= this.defTexCan;

	this.face.push (f)
	this.selFace (this.face.length-1);
	return f;
    }
    this.cloneFaces = function (an){
	var f,j,nf;
	for (j=0;j<this.face.length;j++){
	    f = this.face[j], nf=an.newFace (f.xtl,f.ytl,f.ztl,f.xtr,f.ytr,f.ztr,f.xbl,f.ybl,f.zbl,f.xbr,f.ybr,f.zbr);
	    nf.s0=f.s0; nf.t0=f.t0;
	    nf.ws0=f.ws0; nf.ht0=f.ht0; nf.wt0=f.wt0; nf.hs0=f.hs0;
	    nf.s1=f.s1; nf.t1=f.t1;
	    nf.ws1=f.ws1; nf.ht1=f.ht1;
	    nf.flags=f.flags;
	    nf.docolor=f.docolor;
            nf.w=f.w; nf.h=f.h; nf.x=f.x; nf.y=f.y;
	    if (f.docolor) {
		nf.ddcolor0=f.ddcolor0; nf.ddcolor1=f.ddcolor1;
		nf.mix0=f.mix0; nf.mix1=f.mix1; 
		nf.mixs0=f.mixs0; nf.mixs1=f.mixs1; 
		nf.col0s=f.col0s;
		nf.col0t=f.col0t;
		nf.col1s=f.col1s;
		nf.col1t=f.col1t;
	    }
	    if (f.atBl) nf.atBl=f.atBl;
	}
    }
    this.selFace = function (j) {
	this.curface = this.face[j];
	this.curfacei = j; return this;
    }
   this.blend     = function (f,s,f1,s1) {
       if (!this.curface.docolor) {       this.curface.col0s= this.curface.col0t=this.curface.col1s=this.curface.col1t=-128*256; }
       this.curface.docolor=true; this.curface.flags|=16;
       this.curface.mix0=f; this.curface.mix1=f;
       if (!s) s=0;
       this.curface.mixs0=s; this.curface.mixs1=s;
       if (typeof (f1)=="number" )  this.curface.mix1=f1;
       if (typeof (s1)=="number" )  this.curface.mixs1=s1;
       return this;
   }
   this.color        = function (c,c1) {
       this.bgColor (c,c1);
       this.curface.mix1=this.curface.mix0=0; this.curface.mixs0=this.curface.mixs1=0;
       return this;
   }
   this.bgColor      = function (c,c1) {
       var idata,r,g,b,a;
       if (!this.curface.docolor) {this.curface.mix1=this.curface.mix0=1; this.curface.mixs0=this.curface.mixs1=0;}
       this.curface.docolor=true; this.curface.flags|=16;this.flags &= ~32;this.flags &= ~64;
       this.curface.ddcolor0=c; this.curface.ddcolor1=c;
       if (c1) this.curface.ddcolor1=c1;
       if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.curface.col1s =this.curface.col0s = r+256*(g-128); this.curface.col1t= this.curface.col0t=a+256*(b-128);
       }
       if (c1 && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c1;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.curface.col1s = r+256*(g-128); this.curface.col1t=a+256*(b-128);
       }
       return this;
   }
    this.specLight = function (s, shini) {
	this.curface.lightSpecular=s%1;
	this.curface.lightShininess=Math.floor(shini); return this;
    }
    this.lightAmbDiff = function (ambCol, diffCol, a0, a1) {
	this.bgColor(ambCol, diffCol);
        this.curface.ddcolor0=diffCol; this.curface.ddcolor1=diffCol;
	if (!a0 && a0!=0.0) a0=0.0;
	if (!a1 && a1!=0.0) a1=0.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
	this.curface.col0t = Math.floor (this.curface.col0t / 256) * 256 + a0*255;
	this.curface.col1t = Math.floor (this.curface.col1t / 256) * 256 + a1*255;
	this.curface.flags |=32; this.curface.flags &= ~64; return this;
    }
    this.lightBgAmbDiff = function (c,amb,diff, a0, a1) {
        if (!this.curface.docolor) {this.curface.mix1=this.curface.mix0=1; this.curface.mixs0=this.curface.mixs1=0;}
        this.curface.docolor=true; this.curface.flags|=16+32+64;
        this.curface.ddcolor0=c; this.curface.ddcolor1=c;
	if (!a0 && a0!=0.0) a0=1.0;
	if (!a1 && a1!=0.0) a1=1.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
        if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   var idata = taccgl.scratchc.getImageData(0,0,1,1),
	       r = idata.data[0],
	       g = idata.data[1],
	       b = idata.data[2];
	       // a = idata.data[3]; 
	    this.curface.col0s = r+256*(g-128); this.curface.col0t=Math.floor(a0*255)+256*(b-128);
        }
	if (amb>1) amb=1;
	if (diff>1) diff=1;
	if (amb<0) amb=0;
	if (diff<0) diff=0; 
	amb=Math.floor(amb*255); diff=Math.floor(diff*255);
	this.curface.col1s = amb+256*(diff-128); this.curface.col1t=Math.floor(a1*255); return this;
   }
/*
    this.paint = function (canvas,ignorehide){
	if (ignorehide!=false) ignorehide=true;
	if (!canvas) canvas=this.defTexCan;
	if (!(taccgl.ddmode || taccgl.dddmode)) return this;
	taccgl.texTo (canvas);
	if (this.curface.s0!=this.x || this.curface.t0!=this.y || this.curface.ws0!=this.w || this.curface.ht0!=this.h || this.hs0!=0 || this.wt0!=0) {
	    var sx=this.curface.ws0/this.curface.w; var sy=this.curface.ht0/this.curface.h;   // FIXME paint to 
	    taccgl.texTransform (sx,0,0,sy,(this.curface.s0-this.curface.x*sx),(this.curface.t0-this.curface.y*sy));
	    taccgl.paintElement(this.el,ignorehide);
	    taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    taccgl.paintElement(this.el,ignorehide);
	}
	return this;
    }
*/

   this.map = function (s,t,w,h) {
       if (s||s==0) this.curface.s0=s; if (t||t==0) this.curface.t0=t;
       if (w || h) { this.curface.wt0 = this.curface.hs0 =0;}
       if (w && h) { this.curface.ws0=w; this.curface.ht0=h;}
       else if (w) { this.curface.ws0=w; this.curface.ht0*=w/this.curface.ws0;} 
       else if (h) { this.curface.ws0*=h/this.curface.ht0; this.curface.ht0=h;}
       return this;
   }
   this.map1 = this. mapTo= function (s,t,w,h) {
       this.curface.dotexmove=true;
       this.curface.s1=s; this.curface.t1=t; this.curface.ws1=w; this.curface.ht1=h; this.curface.wt1 = this.curfact.hs1 =0; return this;
   }

   this.mapAnim = function () {
       this.curface.dotexmove=true;
       this.curface.s1=this.curface.s0; this.curface.t1=this.curface.t0; this.curface.ws1=this.curface.ws0; this.curface.ht1=this.curface.ht0;
       this.curface.wt1=this.curface.wt0; this.curface.hs1=this.curface.hs0;
       return this;
   }

   this.mapMirrorY = function () {
       this.curface.s0 += this.curface.ws0; this.curface.t0 += this.curface.wt0; this.curface.ws0=-this.curface.ws0; this.curface.wt0=-this.curface.wt0;
       return this;
   }
   this.mapMirrorX = function () {
       this.curface.t0 += this.curface.ht0; this.curface.s0 += this.curface.hs0; this.curface.ht0=-this.curface.ht0; this.curface.hs0=-this.curface.hs0;
       return this;
   }
   this.mapRelative = function (s,t,w,h) {
       this.curface.s0+=s; this.curface.t0+=t; this.curface.ws0 = w; this.curface.ht0 = h;  this.curface.wt0=0; this.curface.hs0=0; return this;
   }

   this.mapClip = function (w,h,pos,overflow) {
       if (overflow != "b" && overflow != 'br'){
	   if (h>this.curface.ht0) h=this.curface.ht0;
       } 
       if (overflow != "r" && overflow != 'br'){
	   if (w>this.curface.ws0) w=this.curface.ws0;
       } 
       
       if (pos=="tl") {
       } else if (pos=="t") {
	   w=this.curface.ws0;
       } else if (pos=="tr") {
	   this.curface.s0 += this.curface.ws0-w;
       } else if (pos=="l") {
	   h=this.curface.ht0;
       } else if (pos=="r") {
	   this.s0 += this.curface.ws0-w; h=this.curface.ht0;
       } else if (pos=="bl") {
	   this.curface.t0 += this.curface.ht0-h;
       } else if (pos=="b") {
	   this.t0 += this.curface.ht0-h;  w=this.curface.ws0;
       } else if (pos=="br") {
	   this.curface.t0 += this.curface.ht0-h;
	   this.curface.s0 += this.curface.ws0-w;
       }
       this.curface.ws0 = w; this.curface.ht0 = h;
       this.curface.ws0 = w; this.curface.ht0 = h; // FIXME hs0
       return this;
   }
    this.initNormals = function () {
	var f=this.curface;
        f.donormal=true;
	f.ntlx=f.nblx=f.ntrx=f.nbrx = this.hy0*this.wz0 - this.hz0*this.wy0;	
	f.ntly=f.nbly=f.ntry=f.nbry = this.hz0*this.wx0 - this.hx0*this.wz0;
	f.ntlz=f.nblz=f.ntrz=f.nbrz = this.hx0*this.wy0 - this.hy0*this.wx0;
    }
    this.restrict = this.clip = function (x,y,w,h) {
	this.x0=this.x1= x;	
	this.y0=this.y1= y;
	this.wx0=this.wx1=w;
	this.hy0=this.hy1= h;
	this.s0=this.x0; 
	this.t0=this.y0;
	this.ws0=this.wx0;this.wt0=0;
	this.ht0=this.hy0;this.hs0=0;
	var i;
	for (i=0; i<this.face.length; i++) {
	    this.selFace (i);
	    this.map(x,y,w,h);
	}
	return this;
    }

    this.cont = function (el) {
	var e = el;
        if (!el) e=this.el;
	var an = new taccgl.multiFace (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an,el);  this.cloneFaces(an);
	return (an);
    }
    this.startFace = function (f) {
       var j = taccgl, i,
           e = this.vduration + this.basetime;
       if (j.duration < e && ((this.flags&1<<16)==0)) j.setDuration(e);

       var hx0= this.wx0*f.xbl+this.hx0*f.ybl+this.dx0*f.zbl - this.wx0*f.xtl-this.hx0*f.ytl-this.dx0*f.ztl,
	   hy0= this.wy0*f.xbl+this.hy0*f.ybl+this.dy0*f.zbl - this.wy0*f.xtl-this.hy0*f.ytl-this.dy0*f.ztl,
	   hz0= this.wz0*f.xbl+this.hz0*f.ybl+this.dz0*f.zbl - this.wz0*f.xtl-this.hz0*f.ytl-this.dz0*f.ztl,
	   wx0= this.wx0*f.xtr+this.hx0*f.ytr+this.dx0*f.ztr - this.wx0*f.xtl-this.hx0*f.ytl-this.dx0*f.ztl,
	   wy0= this.wy0*f.xtr+this.hy0*f.ytr+this.dy0*f.ztr - this.wy0*f.xtl-this.hy0*f.ytl-this.dy0*f.ztl,
	   wz0= this.wz0*f.xtr+this.hz0*f.ytr+this.dz0*f.ztr - this.wz0*f.xtl-this.hz0*f.ytl-this.dz0*f.ztl,
	   nx = -hy0*wz0 + hz0*wy0,
	   ny = -hz0*wx0 + hx0*wz0,
           nz = -hx0*wy0 + hy0*wx0,
	   spec=this.lightSpecular + this.lightShininess;
	
       j.nvertMove (this.x0+this.wx0*f.xtl+this.hx0*f.ytl+this.dx0*f.ztl,  this.y0+this.wy0*f.xtl+this.hy0*f.ytl+this.dy0*f.ztl, 
		       this.z0+this.wz0*f.xtl+this.hz0*f.ytl+this.dz0*f.ztl
                    ,this.x1+this.wx1*f.xtl+this.hx1*f.ytl+this.dx1*f.ztl, this.y1+this.wy1*f.xtl+this.hy1*f.ytl+this.dy1*f.ztl, 
		       this.z1+this.wz1*f.xtl+this.hz1*f.ytl+this.dz1*f.ztl
		    ,nx,ny,nz,spec, f.s0, f.t0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xbl+this.hx0*f.ybl+this.dx0*f.zbl,  this.y0+this.wy0*f.xbl+this.hy0*f.ybl+this.dy0*f.zbl, 
		       this.z0+this.wz0*f.xbl+this.hz0*f.ybl+this.dz0*f.zbl
                    ,this.x1+this.wx1*f.xbl+this.hx1*f.ybl+this.dx1*f.zbl, this.y1+this.wy1*f.xbl+this.hy1*f.ybl+this.dy1*f.zbl, 
		       this.z1+this.wz1*f.xbl+this.hz1*f.ybl+this.dz1*f.zbl
		    ,nx,ny,nz,spec, f.s0+f.hs0, f.t0+f.ht0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xtr+this.hx0*f.ytr+this.dx0*f.ztr,  this.y0+this.wy0*f.xtr+this.hy0*f.ytr+this.dy0*f.ztr, 
		       this.z0+this.wz0*f.xtr+this.hz0*f.ytr+this.dz0*f.ztr
                    ,this.x1+this.wx1*f.xtr+this.hx1*f.ytr+this.dx1*f.ztr, this.y1+this.wy1*f.xtr+this.hy1*f.ytr+this.dy1*f.ztr, 
		       this.z1+this.wz1*f.xtr+this.hz1*f.ytr+this.dz1*f.ztr
		    ,nx,ny,nz,spec ,f.s0+f.ws0, f.t0+f.wt0, f.flags|this.flags,this.basetime,this.vduration);

       j.nvertMove (this.x0+this.wx0*f.xbr+this.hx0*f.ybr+this.dx0*f.zbr,  this.y0+this.wy0*f.xbr+this.hy0*f.ybr+this.dy0*f.zbr, 
		       this.z0+this.wz0*f.xbr+this.hz0*f.ybr+this.dz0*f.zbr
                    ,this.x1+this.wx1*f.xbr+this.hx1*f.ybr+this.dx1*f.zbr, this.y1+this.wy1*f.xbr+this.hy1*f.ybr+this.dy1*f.zbr, 
		       this.z1+this.wz1*f.xbr+this.hz1*f.ybr+this.dz1*f.zbr
		    ,nx,ny,nz,spec ,f.s0+f.ws0+f.hs0, f.t0+f.ht0+f.wt0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xtr+this.hx0*f.ytr+this.dx0*f.ztr,  this.y0+this.wy0*f.xtr+this.hy0*f.ytr+this.dy0*f.ztr, 
		       this.z0+this.wz0*f.xtr+this.hz0*f.ytr+this.dz0*f.ztr
                    ,this.x1+this.wx1*f.xtr+this.hx1*f.ytr+this.dx1*f.ztr, this.y1+this.wy1*f.xtr+this.hy1*f.ytr+this.dy1*f.ztr, 
		       this.z1+this.wz1*f.xtr+this.hz1*f.ytr+this.dz1*f.ztr
		    ,nx,ny,nz,spec ,f.s0+f.ws0, f.t0+f.wt0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xbl+this.hx0*f.ybl+this.dx0*f.zbl,  this.y0+this.wy0*f.xbl+this.hy0*f.ybl+this.dy0*f.zbl, 
		       this.z0+this.wz0*f.xbl+this.hz0*f.ybl+this.dz0*f.zbl
                    ,this.x1+this.wx1*f.xbl+this.hx1*f.ybl+this.dx1*f.zbl, this.y1+this.wy1*f.xbl+this.hy1*f.ybl+this.dy1*f.zbl, 
		       this.z1+this.wz1*f.xbl+this.hz1*f.ybl+this.dz1*f.zbl
		    ,nx,ny,nz,spec  ,f.s0+f.hs0, f.t0+f.ht0, f.flags|this.flags,this.basetime,this.vduration);

      if (this.rotation) {
         for (i=1; i<=6; i++) {
	     j.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto,this.rotacc); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (this.doacceleration){
         for (i=1; i<=6; i++) {
	     j.nvertAcceleration(this.ax,this.ay,this.az); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (f.dotexmove) {
           j.nvertOffset (-5); 
	   j.nvertTexMove (f.s1,f.t1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.ws1,f.t1+f.wt1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.hs1,f.t1+f.ht1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.ws1+f.hs1,f.t1+f.ht1+f.wt1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.hs1,f.t1+f.ht1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.ws1,f.t1+f.wt1); 
       }
       if (f.docolor) {
	   j.nvertColor6 (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1);
/*
           j.nvertOffset (-5); 
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); 
*/
       }
	if (f.donormal){
           j.nvertOffset (-5); 
	   j.nvertNormal3 (f.ntlx, f.ntly, f.ntlz);j.nvertOffset(1);
	   j.nvertNormal3 (f.nblx, f.nbly, f.nblz);j.nvertOffset(1);
	   j.nvertNormal3 (f.ntrx, f.ntry, f.ntrz);j.nvertOffset(1);
	   j.nvertNormal3 (f.nbrx, f.nbry, f.nbrz);j.nvertOffset(1);
	   j.nvertNormal3 (f.ntrx, f.ntry, f.ntrz);j.nvertOffset(1);
	   j.nvertNormal3 (f.nblx, f.nbly, f.nblz);
	}
       return this;
    }
    this.start = function () {
	var j,f,i;  
	if (!taccgl.dddmode) {this.ddstart(); return this;}
        var maxindex=null; j=taccgl;

        if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}
        if (this.special) this.startSpecial();
	for (i=0; i<this.face.length; i++){
	    f = this.face[i];
	    this.startFace (f);
	}
	this.vertEndIndex=j.vertI;
	if (maxindex) j.vertI=maxindex;
	if (taccgl_debug_vertex) {
	    taccgl.dumpVertexTransition(this);
	} // taccgl_debug_end
        if (this.p!=j.stdsc) j.setShader(j.stdsc);
	return this;
    }
    this.clone = function(a) {return new this.taccglMultiFaceClone(this);}
    this.taccglMultiFaceClone = function (a){
	this.taccglAnimClone(a);
	this.face = Array(0);
	a.cloneFaces(this);
    }
}
taccglMultiFacePrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.multiFace.prototype =  new taccglMultiFacePrototype();
taccgl.multiFace.prototype.taccglMultiFaceClone.prototype = taccgl.multiFace.prototype;

function taccglDddBoxPrototype (el)
{
    this.initSuper2 =taccgl.multiFace.prototype.init;
    this.startSuper =taccgl.multiFace.prototype.start;
    this.init = function (el){
	this.initSuper2(el);
    }
    this.initSecond = function (el){
	this.newFace (0,0,1, 1,0,1, 0,1,1, 1,1,1); // front 
	this.newFace (1,0,1, 1,0,0, 1,1,1, 1,1,0); // right
	this.newFace (1,0,0, 0,0,0, 1,1,0, 0,1,0); // back
	this.newFace (0,0,0, 0,0,1, 0,1,0, 0,1,1); // left
	this.newFace (0,0,0, 1,0,0, 0,0,1, 1,0,1); // top
	this.newFace (0,1,1, 1,1,1, 0,1,0, 1,1,0); // bottom
	this.dx0=this.dx1=0; this.dy0=this.dy1=0; this.dz0=this.dz1=this.hy0;
    }
    this.selFront = function (){return this.selFace(0);}
    this.selRight = function (){return this.selFace(1);}
    this.selBack  = function (){return this.selFace(2);}
    this.selLeft  = function (){return this.selFace(3);}
    this.selTop   = function (){return this.selFace(4);}
    this.selBottom= function (){return this.selFace(5);}
    this.cont = function (el) {
	var e = el;
        if (!el) e=this.el;
	var an = new taccglDddBoxSuper2 (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an,el);  this.cloneFaces(an);
	return (an);
    }
    this.clone = function(a) {return new this.taccglDddBoxClone(this);}
    this.taccglDddBoxClone = function (a){
	this.taccglMultiFaceClone(a);
    }
}

taccglDddBoxPrototype.prototype = taccgl.multiFace.prototype;
taccgl.dddBox.prototype =  new taccglDddBoxPrototype();
var taccglDddBoxSuper2=function (el) {this.initSuper2(el);}
taccglDddBoxSuper2.prototype =taccgl.dddBox.prototype;
taccgl.dddBox.prototype.taccglDddBoxClone.prototype=taccgl.dddBox.prototype;

/* Shader Configurations */
function taccglShaderConfigPrototype () {
    var x=this; if(x){} // artificially use x to avoid tools the cannot handle eval complaining about unused x

/* To work on the shaders, cut and paste the following script block (all lines until
 * '// END taccgl_shader') into your HTML page.
   To incorporate the changed shaders in here, set taccgl_showShaders = true, run
   an animation and cut and paste the content of the third shader field into here 
   replacing all text up to the init function. */
/*
/*
<script id="taccgl_Shaders" type="x-gsgl/x-vertex">


:stdUniformsBg                    
//=====   Uniforms used by almost all Shaders
uniform   sampler2D uTexture;     //: first and 
uniform   sampler2D uTexture2;    //: second texture canvas

:stdUniformsEnd
//=====   Generated Uniforms
$$genUniforms
//=====   Generated Constants
$$genConsts


:stdVertexUniforms                
//=====   Uniforms used by almost all vertex Shaders
$$stdUniformsBg
uniform   highp vec4 uTime;            //: time in seconds since start of the animation
$$?!this.inShadow{ 
uniform   vec4   cvp;             //: (p,q) size of the animation canvas p=2/w q=2/h
                                  //: (s,t) position of the animation canvas
$$?}
$$?this.inShadow{ 
uniform   highp vec4   shcvp;     //: (p,q) size of the animation canvas p=2/w q=2/h
                                  //: (s,t) position of the animation canvas
$$?}
$$?this.sp.useTM{
$$?}
$$stdUniformsEnd 


:stdFragmentUniforms
$$stdUniformsBg
$$?this.inShadow||this.sp.showShadow{ 
uniform   mediump vec4  fshcvp;    //: (p,q) size of the animation canvas p=2/w q=2/h
                                   //: (s,t) position of the animation canvas
                                   //: this is identical to the shcvp except for the precision mediump
$$?}
$$?this.sp.showShadow{
uniform   sampler2D uShadowMap;    //: second texture canvas
$$?}
$$stdUniformsEnd 



:stdAttributes
//=====  Attributes used by standard vertex shader 
//:   flags:
//:      1     showBefore
//:      2     showAfter
//:      8     useTM
//:     16     color or texmix are set
//:     32  0  color animation mode backgroundcolor changes from c0 to c1,
//:            ambient and diffuse factors are given in uLightingPar.xy
//:     32  1
//:      64 0  c1.r and c1.g give ambient and diffuse factors
//:            c0 is background color with alpha value mix(c0.w,c1.w,t)
//:      64 1  c1 diffuse color c0 ambient color background color is white * mix(c0.w,c1.w,t)
//:     128    show shadows on triangle
//:     256    suppress casting a shadow

attribute vec4 pos;       //: 1 available: flags
attribute vec4 origin;    //: 1 available: basetime
attribute vec4 texpos;    //: 2 available: st starting and pq final texture coordinates
attribute vec4 rotP;      //: 1 available: from Rotation
attribute vec4 accel;     //: 1 available: duration
attribute vec4 rotA;      //: 1 available: to Rotation
attribute vec4 color;     //: c0=(s,t) first and c1=(p,q) second color
attribute vec4 texmix;    //: factors mixing textures and animation
attribute vec4 normal;    //: 1 available: ligthting parameters interger part: shininess, fractional part: 



:stdVarying
//=====  Varyings used by almost all Shaders
varying   $$FSMAXP vec4 vtexpos;   //: texture position
varying   $$LOWP  vec4 vAmbColor; //: ambient color or background color
$$iVarying

$$?this.sp.lightingPerVertex{
varying   $$FSMAXP vec4 vLight;    //: vertex lighting
$$?}

$$?this.sp.lightingPerFragment{
varying $$LOWP vec4 vDiffColor;  //: diffuse color 
varying $$FSMAXP vec3 vnormal;     //: normal vector
varying $$FSMAXP vec4 vLightingPar;//: Lighting parameters
$$?}

$$?this.sp.lightingPerFragment||this.sp.showShadow{
varying $$FSMAXP vec3 v3Dpos;      //: 3D position of fragment
$$?}



:DoRotation
//: H E L P E R    F U N C T I O N S

vec3 tnormal;

vec4 
DoRotation (vec4 p, float t)
//: rotate vector p and normal vector tnormal according to rotP and rotA
//: t denotes the point in time within the animation step scaled to 0..1
{
   float from = rotP.w;
   float to   = rotA.w; 
   float b    = mix (from,to,t) + 0.5*t*(t-1.0)*rotA.z; 
   float z = sqrt(abs(1.0-rotA.x*rotA.x-rotA.y*rotA.y));

   vec3  q = vec3(p) - vec3(rotP);
   float c = cos(b); float mc= (1.0-c);
   float s = -sin(b);

   mat3 Mrot = mat3 (c+rotA.x*rotA.x*mc,            rotA.x*rotA.y*mc-z*s,    rotA.x*z*mc+rotA.y*s,
                     rotA.x*rotA.y*mc+z*s,     c+rotA.y*rotA.y*mc,           rotA.y*z*mc-rotA.x*s,
                     z*rotA.x*mc-rotA.y*s,     z*rotA.y*mc+rotA.x*s,    c+z*z*mc);



   q = Mrot * q;
   tnormal = Mrot * tnormal;

   q=q+vec3(rotP);    return vec4( q.x, q.y, q.z, p.w);
}




:stdVertexHead
//: 
//: S T D    V E R T E X   S H A D E R
//: 

//:  Standard Vertex Shader Main
void main()
{
    vec4 a = vec4 (vec3(pos),1.0);  
    flags = int(pos.w);
    float basetime = origin.w;
    float duration = accel.w;
    mat4 pm;

//:  Time transformation
    float rt =  (uTime[int(fract(pos.w)*4.0)]-basetime)/duration;
    tnormal = normal.xyz;



$$?!this.isTrident{
    float t  =  clamp(rt,0.0,1.0);
$$?}
$$?this.isTrident{
    float t  =  rt; 
    if (t>1.0) t=1.0;
    if (t<0.0) t=0.0;
$$?}

    $$iTimes

:stdVertexCondition   
  if (  (((flags/2)*2 == flags) && (rt<0.0)) || (((flags/4)*4 == (flags/2)*2)) && (rt>1.0)  ) {
        gl_Position = vec4(0.0,0.0,0.0,1.0); 
  } else {

:stdVertexMotionAnimation
//:  Possibly do a rotation animation
    if (rotA.w!=0.0 || rotP.w!=0.0) {
       vec4 ra = DoRotation (a,t);
       a = vec4 ((mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel)-vec3(a)+vec3(ra)),1.0);   //: accelerated motion using builtin function mix
    } else {

       a = vec4 (mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel),1.0);       }
$$?this.sp.useTM{
    if ((flags/16)*16 != (flags/8)*8) {
      a=uTM*a;
      tnormal = uTM_1T * tnormal;
    }
$$?}

:stdVertex3DmappingEye
//:  3d -> 2d mapping

$$?this.sp.useuEye{
    float ex=uEye.x; float ey=uEye.y; float ez=uEye.z;
    vec3 eyePoint = uEye;
$$?}

$$?!this.sp.useuEye{
    const float ex=$$EYEX;     const float ey=$$EYEY;     const float ez=$$EYEZ;
    vec3 eyePoint = vec3($$EYEX,$$EYEY,$$EYEZ);
$$?}

:stdVertex3DmappingBase





    pm = mat4   (    cvp.p,                            0.0,                            0.0,    0.0,  
                             0.0,                       -  cvp.q,                            0.0,    0.0,
                        (1.0+cvp.p*(cvp.s-ex))/ez,   (-1.0+cvp.q*(ey-cvp.t))/ez,          0.0,   -1.0/ez,
                         -cvp.p*cvp.s-1.0,              cvp.q*cvp.t+1.0,              -ez/65536.0,    1.0);


                     
    vec4 pos; 
    pos = pm*a;

    gl_Position = pos;

:stdVertexTexmix    
    vtexpos.st=mix (texpos.st,texpos.pq,t); 
:stdVertexLighting
$$?this.sp.lightingPerVertex{
    vec3 diffColor, ambColor;
    vec3 lightDir = normalize(uLightPos.xyz - a.xyz);
$$?}
    if ((flags/32)*2 != (flags/16) ) {  //: check if do color is enabled otherwise color and mix are undefined
       vec4 c0 = vec4( mod(color.s,256.0)/255.0 , (floor(color.s*(1.0/256.0))+128.0)*(1.0/255.0), 
                 (floor(color.t*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.t,256.0) *(1.0/255.0));
       vec4 c1 = vec4( mod(color.p,256.0)/255.0 , (floor(color.p*(1.0/256.0))+128.0)*(1.0/255.0), 
                 (floor(color.q*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.q,256.0) *(1.0/255.0));


       vec4 m = texmix;
       if ((flags/64)*2 != (flags/32)) {
$$?this.sp.lightingPerFragment{
          if ((flags/128)*2 != (flags/64)) { //: background color and factors given
             vDiffColor = vec4(c1.r,c1.g,0.0,0.0);
               vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t);
          } else { //: ambient and diffuse color given
             vDiffColor = vec4(c1.rgb,1.0);
             vAmbColor  = vec4(c0.rgb, mix(c0.w,c1.w,t));
          }
$$?}
$$?this.sp.lightingPerVertex{
          if ((flags/128)*2 != (flags/64)) { //: background color and factors given
             diffColor = vec3 (c1.g,c1.g,c1.g);
             ambColor = vec3 (c1.r,c1.r,c1.r);
             vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t); //: Background Color
          } else {
             diffColor = c1.rgb;
             ambColor  = c0.rgb;                vAmbColor  = vec4(1.0,1.0,1.0, 1.0) * mix(c0.w,c1.w,t); //: Background Color
          }  
$$?}
$$?(!this.sp.lightingPerFragment)&&(!this.sp.lightingPerVertex){
          if ((flags/128)*2 != (flags/64)) { //: background color and factors given
              vAmbColor  = vec4(c0.rgb, 1.0) * (c1.g+c1.r) * mix(c0.w,c1.w,t); //: Background Color
          } else {
              vAmbColor  = vec4(c0.rgb+c1.rgb,1.0) * mix(c0.w,c1.w,t); //: Background Color
          }  
$$?}

       } else { //: Color Animation Mode
$$?this.sp.lightingPerFragment{
          vDiffColor = vec4 (uLightingPar.x, uLightingPar.y, 0.0, 0.0);
$$?}
$$?this.sp.lightingPerVertex{
          ambColor = vec3 (uLightingPar.x,uLightingPar.x,uLightingPar.x);
          diffColor = vec3 (uLightingPar.y,uLightingPar.y,uLightingPar.y);
$$?}
          vAmbColor  = mix (c0,c1,t);
       }
       vtexpos.pq  = clamp (mix (m.st,m.pq,t), 0.0, 1.0);
    } else {
       vAmbColor = vec4(0.0,0.0,0.0,0.0);
$$?this.sp.lightingPerFragment{
       vDiffColor = vec4(uLightingPar.x, uLightingPar.y,0.0,0.0);
$$?}
$$?this.sp.lightingPerVertex{
          ambColor = vec3 (uLightingPar.x,uLightingPar.x,uLightingPar.x);
          diffColor = vec3 (uLightingPar.y,uLightingPar.y,uLightingPar.y);
$$?}
       vtexpos.pq  = vec2(1.0,0.0);
    }

$$?this.sp.lightingPerFragment||this.sp.showShadow{
   v3Dpos=a.xyz; $$calcv3Dpos
$$?}
$$?this.sp.lightingPerFragment{
   vnormal=normalize(tnormal.xyz);
   vLightingPar = vec4((((flags/256)*2 != (flags/128)) ? 1.0 : 0.0 ), 0.0, fract(normal.w), floor(normal.w));
$$?}
$$?this.sp.lightingPerVertex{
          if (dot( (eyePoint-a.xyz), tnormal) <0.0 ) tnormal=-tnormal;  
   
   vLight.rgb = diffColor * ( clamp(   (dot(normalize(tnormal.xyz), lightDir )), 0.0, 1.0));
   if ((flags/256)*2 != (flags/128)) { vLight.a =-1.0; } //: shadowOnly vLight contains only the diffuse light for shadows
   else { vLight.a=0.0;vLight.rgb+=ambColor;}
$$?}




:stdVertexConditionEnd
  }
:stdVertexFoot
}

:stdVertex3Dmapping
   $$stdVertex3DmappingEye
   $$stdVertex3DmappingBase

:SHCVP
$$?this.inFragment{fshcvp$$?}$$?this.inVertex{shcvp$$?}

:stdShadow3Dmapping
//:   Shadow Mapping Matrix (transposed)
      mat4 shadowPM = 



          mat4 (      $$SHCVP.p,                                                             0.0,                                  0.0,    0.0,  
                          0.0,                                                            -  $$SHCVP.q,                            0.0,    0.0,
               (1.0+$$SHCVP.p*($$SHCVP.s-uLightPos.x))/uLightPos.z, (-1.0+$$SHCVP.q*(uLightPos.y-$$SHCVP.t))/uLightPos.z,      0.0,   -shF/uLightPos.z,
               -$$SHCVP.p*$$SHCVP.s-1.0,                                       $$SHCVP.q*$$SHCVP.t+1.0,                  -uLightPos.z/65536.0,    shF);


//:
//:
//:  Normal Vertex Shader starts here
//:
//:
:vertexShaderCode
$$stdVertexUniforms
$$stdAttributes
$$stdVarying

int flags;

$$vertexVar
$$DoRotation

$$stdVertexHead 
   $$stdVertexCondition
   $$pos
   $$stdVertexMotionAnimation
   $$stdVertex3Dmapping
   $$stdVertexTexmix 
   $$stdVertexLighting
$$stdVertexConditionEnd
$$stdVertexFoot



//:
//:
//: Shadow Map Vertex Shader Starts Here
//:
//:
:shadowVertexShaderCode
$$stdVertexUniforms
$$stdAttributes
$$stdVarying

int flags;

$$vertexVar
$$DoRotation

$$stdVertexHead 
$$stdVertexCondition
   $$pos
    if ((flags/512)*2 != (flags/256)) {   //: flag 256 suppresses shadow of element
        gl_Position = vec4(0.0,0.0,0.0,1.0);
    } else {
   $$stdVertexMotionAnimation
   const float shF=1.0;
   $$stdShadow3Dmapping
   
   v3Dpos=a.xyz; 
   gl_Position=shadowPM*a;
$$?this.sp.lightingPerFragment{
   vnormal=normalize(tnormal.xyz);
$$?}
   $$stdVertexTexmix 
    //: for the shadow map shader it is sufficient to calculate the alpha values, so the 
    //: following code is the part of stdVertexLighting code calculating the alpha
    //: values and vmix which the fragment shader needs to calculate alpha values
    if ((flags/32)*2 != (flags/16)) { //: check if do color is enabled otherwise color and mix are undefined
       vec4 m = texmix;
       vtexpos.pq   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);
       float c0a =  mod(color.t,256.0) *(1.0/255.0);
       float c1a =  mod(color.q,256.0) *(1.0/255.0);
       vAmbColor = vec4( mod(color.s,256.0)/255.0 ,0.0 ,0.0 ,mix(c0a,c1a,t));
					//: the red component is used only for detectThreshold
    } else {
       vAmbColor = vec4(0.0,0.0,0.0,0.0);
       vtexpos.pq   = vec2(1.0,0.0);
    }
$$stdVertexConditionEnd
    }
$$stdVertexFoot




//:
//:
//: Standard Fragment Shader
//:
//:

:fragmentDefs
#define TS(S) ((S)*(1.0/$$TEXTURECANVASWIDTH))
#define TT(T) ((T)*(1.0/$$TEXTURECANVASHEIGHT))
#define TS_1(S) ((S)*($$TEXTURECANVASWIDTH))
#define TT_1(T) ((T)*($$TEXTURECANVASHEIGHT))


:fragmentShaderCode

precision $$FSMAXP float;

$$stdFragmentUniforms

//:a
$$fragmentDefs
//:b
$$ifragDef
//:c
$$fragDef


$$stdVarying



void main()
{
   mediump vec4 c, d, e;
   

   $$dyntexvar
   $$ifragVar
   $$fragVar
   $$fragPos

  $$?this.sp.useTex{
   c  = texture2D(uTexture,  $$vtexpos_st);
  $$?}

  $$?this.sp.showShadow{
      const float shF=2.0;
      $$stdShadow3Dmapping
      vec4 sp4=shadowPM * vec4(v3Dpos,1.0);
      vec3 sp=(sp4.xyz/sp4.w) + vec3(0.5,0.5,0.5); 


   vec4 sm  = texture2D(uShadowMap,  sp.xy);
   const float shadowDiff = 0.0005;
//:   bool  hasShadow = sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0));
   float hasShadow = (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(4.0/2048.0,4.0/2048.0));
   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-4.0/2048.0,-4.0/2048.0));
   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;

   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,1.0/2048.0));
   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,-1.0/2048.0));
   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;



   hasShadow *= uShadowFactor;
   $$endShadowCalc


//:   sm=vec4(0.0,0.0,0.0,1.0);					
//:   bool hasShadow = vShadowPos.z > 0.4845;
//:   bool hasShadow = sm.r >  0.4862;
//:   vec4 sm  = texture2D(uShadowMap,  vec2((gl_FragCoord.x+1.0)*0.01, (gl_FragCoord.y+1.0)*0.01));
//:   vec4 sm  = vec4 ((gl_FragCoord.x+1.0)*0.001, (gl_FragCoord.y+1.0)*0.001, 0.0, 1.0);
//:   vec4 sm  = texture2D(uShadowMap,  vec2(s, 1.0-t));
//:     if (s<0.1) sm=vec4(1.0,0.0,0.0,1.0);
//:     if (t<0.1) sm=vec4(0.0,1.0,0.0,1.0);
  $$?}

   //: if !colormode
   //:    vec4(vAmbColor) is the background color
   //:    vDiffColor.x    ambientLightFactor
   //:    vDiffColor.y    diffuseLightFactor
   //:    vDiffColor.z    unused
   //:    vDiffColor.w    0  (flag for colormode)
   //: if colormode
   //:    vAmbColor.xyz   ambient Color
   //:    vDiffColor.xyz  diffuse Color
   //:    vAmbColor.w     background color is (1,1,1,1)*vAmbColor.z
   //:    vDiffColor.w    1  (flag for colormode)

  $$?this.sp.lightingPerFragment{
     bool  colormode= vDiffColor.w!=0.0; 
   vec4  bgcolor  = colormode ? vec4(1.0,1.0,1.0,1.0)*vAmbColor.w : vAmbColor;
  $$?}
  $$?!this.sp.lightingPerFragment{
   vec4  bgcolor  = vAmbColor;
  $$?}


  $$?this.sp.useTex{
  $$?!this.sp.singleTex{				
   d = texture2D(uTexture2, $$vtexpos_st2);
   float da = vtexpos.q; float ca = vtexpos.p;
   $$mixAlpha
   $$mix
   $$?this.qmix{
   e = c*ca+d*da;
   $$?}
   $$?!this.qmix{
   float dam=d.a*da; float cam=c.a*ca;
   e = vec4 (c.rgb * ca * (1.0-dam) + d.rgb*da, 1.0-(1.0-dam)*(1.0-cam)); 
   $$?}
  $$?}

  $$?this.sp.singleTex{
   float ca = vtexpos.p;
   $$mixAlpha
   $$mix
   float cam=c.a*ca; float dam=0.0;
   e = vec4 (c.rgb * ca,  cam);
  $$?}


   float a =  1.0  -(1.0-bgcolor.a)*(1.0-e.a);
   mediump vec3 col = e.rgb + bgcolor.rgb * (1.0-e.a);  
  $$?}    $$?!this.sp.useTex{
   vec3 col=bgcolor.rgb; float a=bgcolor.a;
  $$?}
   $$alpha
   $$color

  $$?this.sp.useDiscard&&!this.sp.discardThreshold{
   if (a<0.01) discard;
  $$?}
  $$?this.sp.discardThreshold{
   if (a<bgcolor.r) discard;
  $$?}


  $$?this.sp.lightingPerFragment{
   $$FSMAXP vec3 lightDir = normalize( (uLightPos.xyz - v3Dpos)  $$?!this.fsHighp{*(1.0/8192.0)$$?} );
   $$FSMAXP vec3 normal;
  $$?this.sp.frontfacing{
   if (gl_FrontFacing) normal=vnormal; else normal=-vnormal;
  $$?}
  $$?!this.sp.frontfacing{
   normal=vnormal;					
  $$?}
  normal=normalize(normal);
   
  mediump vec3 Light =  (colormode ? vDiffColor.rgb : uLightingColor * vDiffColor.y ) *
  	          ( clamp( ( $$?!this.sp.frontfacing{abs$$?}(dot(normal, lightDir ))), 0.0, 1.0));


$$?this.sp.useuEye{
  vec3 eye = vec3 (uEye);
$$?}


$$?!this.sp.useuEye{
  vec3 eye = vec3 ($$EYEX, $$EYEY, $$EYEZ);
$$?}

$$?this.sp.specLight{
    Light += $$?this.sp.showShadow{ (uShadowFactor-hasShadow)* $$?} uLightingColor * vLightingPar.z * pow ( clamp ( dot ( reflect (-lightDir, normal), normalize((eye - v3Dpos) $$?!this.fsHighp{*(1.0/8192.0)$$?} ) ), 0.0, 1.0),  0.000001+vLightingPar.w) ; 
$$?}



    col *= ( Light   $$?this.sp.showShadow{ * (1.0-hasShadow) $$?} + (colormode ? vAmbColor.rgb : uLightingAmbientColor * vDiffColor.x));
  $$?}
  $$?this.sp.lightingPerVertex{  
    col *= vLight.rgb;  
  $$?}



  $$?this.sp.shadowOnly!=false&&this.sp.shadowOnly!=true{
  $$?this.sp.lightingPerFragment{
   if (vLightingPar.x>0.0) {
      col=vec3(0.0,0.0,0.0);
      a =  $$?this.sp.showShadow{hasShadow*(Light.r+Light.g+Light.b)/3.0+$$?}0.0;
   }
  $$?}
  $$?this.sp.lightingPerVertex{
   if (vLight.a<=-1.0) {
      col=vec3(0.0,0.0,0.0);
      a =  $$?this.sp.showShadow{hasShadow*(vLight.r+vLight.g+vLight.b)/3.0+$$?}0.0;
   }
  $$?}
  $$?}
  $$?this.sp.shadowOnly{
      col=vec3(0.0,0.0,0.0);
      $$?this.sp.lightingPerFragment{
      a =  $$?this.sp.showShadow{hasShadow*(Light.r+Light.g+Light.b)/3.0+$$?}0.0;
      $$?}
      $$?this.sp.lightingPerVertex{
         a =  $$?this.sp.showShadow{hasShadow*(vLight.r+vLight.g+vLight.b)/3.0+$$?}0.0;
      $$?}
      $$?!this.sp.lighting{
         a =  $$?this.sp.showShadow{hasShadow+$$?}0.0;
      $$?}
  $$?} 


   $$finalcolor
  $$?this.sp.showShadow{
  $$?}  
      gl_FragColor = vec4(col,a);
}


:endShadowCalc
:calcv3Dpos

//:
//:
//:  Shadow map Fragment Shader
//:
//:
:shadowFragmentShaderCode
precision mediump float;

$$stdUniformsBg $$stdUniformsEnd
$$fragmentDefs
$$ifragDef
$$fragDef


$$stdVarying

void main()
{
   vec4 c, d, e;

   $$dyntexvar
   $$ifragVar
   $$fragVar
   $$fragPos

   float bgcolora = vAmbColor.a; 
  $$?this.sp.useTex{
   c  = texture2D(uTexture,  $$vtexpos_st);
  $$?!this.sp.singleTex{				
   d = texture2D(uTexture2,  $$vtexpos_st2);
   float da = vtexpos.q; float ca = vtexpos.p;
   $$mixAlpha
   float dam=d.a*da; float cam=c.a*ca;
   float ea = 1.0-(1.0-dam)*(1.0-cam); 
  $$?}
  $$?this.sp.singleTex{
   float ca = vtexpos.p;
   $$mixAlpha
   float cam=c.a*ca; float dam=0.0;
   float ea = cam;
  $$?}
   float a =  1.0  -(1.0-bgcolora)*(1.0-ea);
  $$?}
  $$?!this.sp.useTex{
   float a=bgcolora;
  $$?}

   $$alpha

  $$?this.sp.useDiscard&&!this.sp.discardThreshold{
   if (a<0.01) discard;
  $$?}
  $$?this.sp.discardThreshold{
   if (a<vAmbColor.r) discard;
  $$?}



   gl_FragColor = floor ( fract( gl_FragCoord.z*vec4(1.0,256.0,65536.0,256.0*65536.0) ) * 256.0 ) * (1.0/255.0);

}



</script>
*/
{x.dummy='\n'+
'\n'+
'//-----\n'+
'';}; x.stdUniformsBg=function(){return '//+++++ stdUniformsBg                     \n'+
'//=====   Uniforms used by almost all Shaders\n'+
'uniform   sampler2D uTexture;     //: first and \n'+
'uniform   sampler2D uTexture2;    //: second texture canvas\n'+
'//-----\n'+
'';}; x.stdUniformsEnd=function(){return '//+++++ stdUniformsEnd \n'+
'//=====   Generated Uniforms\n'+
''+this.ins(this.genUniforms)+'\n'+
'//=====   Generated Constants\n'+
''+this.ins(this.genConsts)+'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVertexUniforms=function(){return '//+++++ stdVertexUniforms                 \n'+
'//=====   Uniforms used by almost all vertex Shaders\n'+
''+this.ins(this.stdUniformsBg)+'\n'+
'uniform   highp vec4 uTime;            //: time in seconds since start of the animation\n'+
''+((!this.inShadow)?(' \n'+
'uniform   vec4   cvp;             //: (p,q) size of the animation canvas p=2/w q=2/h\n'+
'                                  //: (s,t) position of the animation canvas\n'+
''):'')+'\n'+
''+((this.inShadow)?(' \n'+
'uniform   highp vec4   shcvp;     //: (p,q) size of the animation canvas p=2/w q=2/h\n'+
'                                  //: (s,t) position of the animation canvas\n'+
''):'')+'\n'+
''+((this.sp.useTM)?('\n'+
''):'')+'\n'+
''+this.ins(this.stdUniformsEnd)+' \n'+
'\n'+
'//-----\n'+
'';}; x.stdFragmentUniforms=function(){return '//+++++ stdFragmentUniforms \n'+
''+this.ins(this.stdUniformsBg)+'\n'+
''+((this.inShadow||this.sp.showShadow)?(' \n'+
'uniform   mediump vec4  fshcvp;    //: (p,q) size of the animation canvas p=2/w q=2/h\n'+
'                                   //: (s,t) position of the animation canvas\n'+
'                                   //: this is identical to the shcvp except for the precision mediump\n'+
''):'')+'\n'+
''+((this.sp.showShadow)?('\n'+
'uniform   sampler2D uShadowMap;    //: second texture canvas\n'+
''):'')+'\n'+
''+this.ins(this.stdUniformsEnd)+' \n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdAttributes=function(){return '//+++++ stdAttributes \n'+
'//=====  Attributes used by standard vertex shader \n'+
'//:   flags:\n'+
'//:      1     showBefore\n'+
'//:      2     showAfter\n'+
'//:      8     useTM\n'+
'//:     16     color or texmix are set\n'+
'//:     32  0  color animation mode backgroundcolor changes from c0 to c1,\n'+
'//:            ambient and diffuse factors are given in uLightingPar.xy\n'+
'//:     32  1\n'+
'//:      64 0  c1.r and c1.g give ambient and diffuse factors\n'+
'//:            c0 is background color with alpha value mix(c0.w,c1.w,t)\n'+
'//:      64 1  c1 diffuse color c0 ambient color background color is white * mix(c0.w,c1.w,t)\n'+
'//:     128    show shadows on triangle\n'+
'//:     256    suppress casting a shadow\n'+
'\n'+
'attribute vec4 pos;       //: 1 available: flags\n'+
'attribute vec4 origin;    //: 1 available: basetime\n'+
'attribute vec4 texpos;    //: 2 available: st starting and pq final texture coordinates\n'+
'attribute vec4 rotP;      //: 1 available: from Rotation\n'+
'attribute vec4 accel;     //: 1 available: duration\n'+
'attribute vec4 rotA;      //: 1 available: to Rotation\n'+
'attribute vec4 color;     //: c0=(s,t) first and c1=(p,q) second color\n'+
'attribute vec4 texmix;    //: factors mixing textures and animation\n'+
'attribute vec4 normal;    //: 1 available: ligthting parameters interger part: shininess, fractional part: \n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVarying=function(){return '//+++++ stdVarying \n'+
'//=====  Varyings used by almost all Shaders\n'+
'varying   '+this.ins(this.FSMAXP)+' vec4 vtexpos;   //: texture position\n'+
'varying   '+this.ins(this.LOWP)+'  vec4 vAmbColor; //: ambient color or background color\n'+
''+this.ins(this.iVarying)+'\n'+
'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'varying   '+this.ins(this.FSMAXP)+' vec4 vLight;    //: vertex lighting\n'+
''):'')+'\n'+
'\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'varying '+this.ins(this.LOWP)+' vec4 vDiffColor;  //: diffuse color \n'+
'varying '+this.ins(this.FSMAXP)+' vec3 vnormal;     //: normal vector\n'+
'varying '+this.ins(this.FSMAXP)+' vec4 vLightingPar;//: Lighting parameters\n'+
''):'')+'\n'+
'\n'+
''+((this.sp.lightingPerFragment||this.sp.showShadow)?('\n'+
'varying '+this.ins(this.FSMAXP)+' vec3 v3Dpos;      //: 3D position of fragment\n'+
''):'')+'\n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.DoRotation=function(){return '//+++++ DoRotation \n'+
'//: H E L P E R    F U N C T I O N S\n'+
'\n'+
'vec3 tnormal;\n'+
'\n'+
'vec4 \n'+
'DoRotation (vec4 p, float t)\n'+
'//: rotate vector p and normal vector tnormal according to rotP and rotA\n'+
'//: t denotes the point in time within the animation step scaled to 0..1\n'+
'{\n'+
'   float from = rotP.w;\n'+
'   float to   = rotA.w; \n'+
'   float b    = mix (from,to,t) + 0.5*t*(t-1.0)*rotA.z; \n'+
'   float z = sqrt(abs(1.0-rotA.x*rotA.x-rotA.y*rotA.y));\n'+
'\n'+
'   vec3  q = vec3(p) - vec3(rotP);\n'+
'   float c = cos(b); float mc= (1.0-c);\n'+
'   float s = -sin(b);\n'+
'\n'+
'   mat3 Mrot = mat3 (c+rotA.x*rotA.x*mc,            rotA.x*rotA.y*mc-z*s,    rotA.x*z*mc+rotA.y*s,\n'+
'                     rotA.x*rotA.y*mc+z*s,     c+rotA.y*rotA.y*mc,           rotA.y*z*mc-rotA.x*s,\n'+
'                     z*rotA.x*mc-rotA.y*s,     z*rotA.y*mc+rotA.x*s,    c+z*z*mc);\n'+
'\n'+
'\n'+
'\n'+
'   q = Mrot * q;\n'+
'   tnormal = Mrot * tnormal;\n'+
'\n'+
'   q=q+vec3(rotP);    return vec4( q.x, q.y, q.z, p.w);\n'+
'}\n'+
'\n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVertexHead=function(){return '//+++++ stdVertexHead \n'+
'//: \n'+
'//: S T D    V E R T E X   S H A D E R\n'+
'//: \n'+
'\n'+
'//:  Standard Vertex Shader Main\n'+
'void main()\n'+
'{\n'+
'    vec4 a = vec4 (vec3(pos),1.0);  \n'+
'    flags = int(pos.w);\n'+
'    float basetime = origin.w;\n'+
'    float duration = accel.w;\n'+
'    mat4 pm;\n'+
'\n'+
'//:  Time transformation\n'+
'    float rt =  (uTime[int(fract(pos.w)*4.0)]-basetime)/duration;\n'+
'    tnormal = normal.xyz;\n'+
'\n'+
'\n'+
'\n'+
''+((!this.isTrident)?('\n'+
'    float t  =  clamp(rt,0.0,1.0);\n'+
''):'')+'\n'+
''+((this.isTrident)?('\n'+
'    float t  =  rt; \n'+
'    if (t>1.0) t=1.0;\n'+
'    if (t<0.0) t=0.0;\n'+
''):'')+'\n'+
'\n'+
'    '+this.ins(this.iTimes)+'\n'+
'//-----\n'+
'';}; x.stdVertexCondition=function(){return '//+++++ stdVertexCondition    \n'+
'  if (  (((flags/2)*2 == flags) && (rt<0.0)) || (((flags/4)*4 == (flags/2)*2)) && (rt>1.0)  ) {\n'+
'        gl_Position = vec4(0.0,0.0,0.0,1.0); \n'+
'  } else {\n'+
'//-----\n'+
'';}; x.stdVertexMotionAnimation=function(){return '//+++++ stdVertexMotionAnimation \n'+
'//:  Possibly do a rotation animation\n'+
'    if (rotA.w!=0.0 || rotP.w!=0.0) {\n'+
'       vec4 ra = DoRotation (a,t);\n'+
'       a = vec4 ((mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel)-vec3(a)+vec3(ra)),1.0);   //: accelerated motion using builtin function mix\n'+
'    } else {\n'+
'\n'+
'       a = vec4 (mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel),1.0);       }\n'+
''+((this.sp.useTM)?('\n'+
'    if ((flags/16)*16 != (flags/8)*8) {\n'+
'      a= a*uTMT ;\n'+
'      tnormal = uTM_1T * tnormal;\n'+
'    }\n'+
''):'')+'\n'+
'//-----\n'+
'';}; x.stdVertex3DmappingEye=function(){return '//+++++ stdVertex3DmappingEye \n'+
'//:  3d -> 2d mapping\n'+
'\n'+
''+((this.sp.useuEye)?('\n'+
'    float ex=uEye.x; float ey=uEye.y; float ez=uEye.z;\n'+
'    vec3 eyePoint = uEye;\n'+
''):'')+'\n'+
'\n'+
''+((!this.sp.useuEye)?('\n'+
'    const float ex='+this.ins(this.EYEX)+';     const float ey='+this.ins(this.EYEY)+';     const float ez='+this.ins(this.EYEZ)+';\n'+
'    vec3 eyePoint = vec3('+this.ins(this.EYEX)+','+this.ins(this.EYEY)+','+this.ins(this.EYEZ)+');\n'+
''):'')+'\n'+
'//-----\n'+
'';}; x.stdVertex3DmappingBase=function(){return '//+++++ stdVertex3DmappingBase \n'+
'\n'+
'\n'+
'\n'+
'\n'+
'\n'+
'    pm = mat4   (    cvp.p,                            0.0,                            0.0,    0.0,  \n'+
'                             0.0,                       -  cvp.q,                            0.0,    0.0,\n'+
'                        (1.0+cvp.p*(cvp.s-ex))/ez,   (-1.0+cvp.q*(ey-cvp.t))/ez,          0.0,   -1.0/ez,\n'+
'                         -cvp.p*cvp.s-1.0,              cvp.q*cvp.t+1.0,              -ez/65536.0,    1.0);\n'+
'\n'+
'\n'+
'                     \n'+
'    vec4 pos; \n'+
'    pos = pm*a;\n'+
'\n'+
'    gl_Position = pos;\n'+
'//-----\n'+
'';}; x.stdVertexTexmix=function(){return '//+++++ stdVertexTexmix     \n'+
'    vtexpos.st=mix (texpos.st,texpos.pq,t); //-----\n'+
'';}; x.stdVertexLighting=function(){return '//+++++ stdVertexLighting \n'+
''+((this.sp.lightingPerVertex)?('\n'+
'    vec3 diffColor, ambColor;\n'+
'    vec3 lightDir = normalize(uLightPos.xyz - a.xyz);\n'+
''):'')+'\n'+
'    if ((flags/32)*2 != (flags/16) ) {  //: check if do color is enabled otherwise color and mix are undefined\n'+
'       vec4 c0 = vec4( mod(color.s,256.0)/255.0 , (floor(color.s*(1.0/256.0))+128.0)*(1.0/255.0), \n'+
'                 (floor(color.t*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.t,256.0) *(1.0/255.0));\n'+
'       vec4 c1 = vec4( mod(color.p,256.0)/255.0 , (floor(color.p*(1.0/256.0))+128.0)*(1.0/255.0), \n'+
'                 (floor(color.q*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.q,256.0) *(1.0/255.0));\n'+
'\n'+
'\n'+
'       vec4 m = texmix;\n'+
'       if ((flags/64)*2 != (flags/32)) {\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'          if ((flags/128)*2 != (flags/64)) { //: background color and factors given\n'+
'             vDiffColor = vec4(c1.r,c1.g,0.0,0.0);\n'+
'               vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t);\n'+
'          } else { //: ambient and diffuse color given\n'+
'             vDiffColor = vec4(c1.rgb,1.0);\n'+
'             vAmbColor  = vec4(c0.rgb, mix(c0.w,c1.w,t));\n'+
'          }\n'+
''):'')+'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'          if ((flags/128)*2 != (flags/64)) { //: background color and factors given\n'+
'             diffColor = vec3 (c1.g,c1.g,c1.g);\n'+
'             ambColor = vec3 (c1.r,c1.r,c1.r);\n'+
'             vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t); //: Background Color\n'+
'          } else {\n'+
'             diffColor = c1.rgb;\n'+
'             ambColor  = c0.rgb;                vAmbColor  = vec4(1.0,1.0,1.0, 1.0) * mix(c0.w,c1.w,t); //: Background Color\n'+
'          }  \n'+
''):'')+'\n'+
''+(((!this.sp.lightingPerFragment)&&(!this.sp.lightingPerVertex))?('\n'+
'          if ((flags/128)*2 != (flags/64)) { //: background color and factors given\n'+
'              vAmbColor  = vec4(c0.rgb, 1.0) * (c1.g+c1.r) * mix(c0.w,c1.w,t); //: Background Color\n'+
'          } else {\n'+
'              vAmbColor  = vec4(c0.rgb+c1.rgb,1.0) * mix(c0.w,c1.w,t); //: Background Color\n'+
'          }  \n'+
''):'')+'\n'+
'\n'+
'       } else { //: Color Animation Mode\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'          vDiffColor = vec4 (uLightingPar.x, uLightingPar.y, 0.0, 0.0);\n'+
''):'')+'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'          ambColor = vec3 (uLightingPar.x,uLightingPar.x,uLightingPar.x);\n'+
'          diffColor = vec3 (uLightingPar.y,uLightingPar.y,uLightingPar.y);\n'+
''):'')+'\n'+
'          vAmbColor  = mix (c0,c1,t);\n'+
'       }\n'+
'       vtexpos.pq  = clamp (mix (m.st,m.pq,t), 0.0, 1.0);\n'+
'    } else {\n'+
'       vAmbColor = vec4(0.0,0.0,0.0,0.0);\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'       vDiffColor = vec4(uLightingPar.x, uLightingPar.y,0.0,0.0);\n'+
''):'')+'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'          ambColor = vec3 (uLightingPar.x,uLightingPar.x,uLightingPar.x);\n'+
'          diffColor = vec3 (uLightingPar.y,uLightingPar.y,uLightingPar.y);\n'+
''):'')+'\n'+
'       vtexpos.pq  = vec2(1.0,0.0);\n'+
'    }\n'+
'\n'+
''+((this.sp.lightingPerFragment||this.sp.showShadow)?('\n'+
'   v3Dpos=a.xyz; '+this.ins(this.calcv3Dpos)+'\n'+
''):'')+'\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'   vnormal=normalize(tnormal.xyz);\n'+
'   vLightingPar = vec4((((flags/256)*2 != (flags/128)) ? 1.0 : 0.0 ), 0.0, fract(normal.w), floor(normal.w));\n'+
''):'')+'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'          if (dot( (eyePoint-a.xyz), tnormal) <0.0 ) tnormal=-tnormal;  \n'+
'   \n'+
'   vLight.rgb = diffColor * ( clamp(   (dot(normalize(tnormal.xyz), lightDir )), 0.0, 1.0));\n'+
'   if ((flags/256)*2 != (flags/128)) { vLight.a =-1.0; } //: shadowOnly vLight contains only the diffuse light for shadows\n'+
'   else { vLight.a=0.0;vLight.rgb+=ambColor;}\n'+
''):'')+'\n'+
'\n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVertexConditionEnd=function(){return '//+++++ stdVertexConditionEnd \n'+
'  }//-----\n'+
'';}; x.stdVertexFoot=function(){return '//+++++ stdVertexFoot \n'+
'}\n'+
'//-----\n'+
'';}; x.stdVertex3Dmapping=function(){return '//+++++ stdVertex3Dmapping \n'+
'   '+this.ins(this.stdVertex3DmappingEye)+'\n'+
'   '+this.ins(this.stdVertex3DmappingBase)+'\n'+
'//-----\n'+
'';}; x.SHCVP=function(){return '//+++++ SHCVP \n'+
''+((this.inFragment)?('fshcvp'):'')+''+((this.inVertex)?('shcvp'):'')+'\n'+
'//-----\n'+
'';}; x.stdShadow3Dmapping=function(){return '//+++++ stdShadow3Dmapping \n'+
'//:   Shadow Mapping Matrix (transposed)\n'+
'      mat4 shadowPM = \n'+
'\n'+
'\n'+
'\n'+
'          mat4 (      '+this.ins(this.SHCVP)+'.p,                                                             0.0,                                  0.0,    0.0,  \n'+
'                          0.0,                                                            -  '+this.ins(this.SHCVP)+'.q,                            0.0,    0.0,\n'+
'               (1.0+'+this.ins(this.SHCVP)+'.p*('+this.ins(this.SHCVP)+'.s-uLightPos.x))/uLightPos.z, (-1.0+'+this.ins(this.SHCVP)+'.q*(uLightPos.y-'+this.ins(this.SHCVP)+'.t))/uLightPos.z,      0.0,   -shF/uLightPos.z,\n'+
'               -'+this.ins(this.SHCVP)+'.p*'+this.ins(this.SHCVP)+'.s-1.0,                                       '+this.ins(this.SHCVP)+'.q*'+this.ins(this.SHCVP)+'.t+1.0,                  -uLightPos.z/65536.0,    shF);\n'+
'\n'+
'\n'+
'//:\n'+
'//:\n'+
'//:  Normal Vertex Shader starts here\n'+
'//:\n'+
'//://-----\n'+
'';}; x.vertexShaderCode=function(){return '//+++++ vertexShaderCode \n'+
''+this.ins(this.stdVertexUniforms)+'\n'+
''+this.ins(this.stdAttributes)+'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'int flags;\n'+
'\n'+
''+this.ins(this.vertexVar)+'\n'+
''+this.ins(this.DoRotation)+'\n'+
'\n'+
''+this.ins(this.stdVertexHead)+' \n'+
'   '+this.ins(this.stdVertexCondition)+'\n'+
'   '+this.ins(this.pos)+'\n'+
'   '+this.ins(this.stdVertexMotionAnimation)+'\n'+
'   '+this.ins(this.stdVertex3Dmapping)+'\n'+
'   '+this.ins(this.stdVertexTexmix)+' \n'+
'   '+this.ins(this.stdVertexLighting)+'\n'+
''+this.ins(this.stdVertexConditionEnd)+'\n'+
''+this.ins(this.stdVertexFoot)+'\n'+
'\n'+
'\n'+
'\n'+
'//:\n'+
'//:\n'+
'//: Shadow Map Vertex Shader Starts Here\n'+
'//:\n'+
'//://-----\n'+
'';}; x.shadowVertexShaderCode=function(){return '//+++++ shadowVertexShaderCode \n'+
''+this.ins(this.stdVertexUniforms)+'\n'+
''+this.ins(this.stdAttributes)+'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'int flags;\n'+
'\n'+
''+this.ins(this.vertexVar)+'\n'+
''+this.ins(this.DoRotation)+'\n'+
'\n'+
''+this.ins(this.stdVertexHead)+' \n'+
''+this.ins(this.stdVertexCondition)+'\n'+
'   '+this.ins(this.pos)+'\n'+
'    if ((flags/512)*2 != (flags/256)) {   //: flag 256 suppresses shadow of element\n'+
'        gl_Position = vec4(0.0,0.0,0.0,1.0);\n'+
'    } else {\n'+
'   '+this.ins(this.stdVertexMotionAnimation)+'\n'+
'   const float shF=1.0;\n'+
'   '+this.ins(this.stdShadow3Dmapping)+'\n'+
'   \n'+
'   v3Dpos=a.xyz; \n'+
'   gl_Position=shadowPM*a;\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'   vnormal=normalize(tnormal.xyz);\n'+
''):'')+'\n'+
'   '+this.ins(this.stdVertexTexmix)+' \n'+
'    //: for the shadow map shader it is sufficient to calculate the alpha values, so the \n'+
'    //: following code is the part of stdVertexLighting code calculating the alpha\n'+
'    //: values and vmix which the fragment shader needs to calculate alpha values\n'+
'    if ((flags/32)*2 != (flags/16)) { //: check if do color is enabled otherwise color and mix are undefined\n'+
'       vec4 m = texmix;\n'+
'       vtexpos.pq   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);\n'+
'       float c0a =  mod(color.t,256.0) *(1.0/255.0);\n'+
'       float c1a =  mod(color.q,256.0) *(1.0/255.0);\n'+
'       vAmbColor = vec4( mod(color.s,256.0)/255.0 ,0.0 ,0.0 ,mix(c0a,c1a,t));\n'+
'					//: the red component is used only for detectThreshold\n'+
'    } else {\n'+
'       vAmbColor = vec4(0.0,0.0,0.0,0.0);\n'+
'       vtexpos.pq   = vec2(1.0,0.0);\n'+
'    }\n'+
''+this.ins(this.stdVertexConditionEnd)+'\n'+
'    }\n'+
''+this.ins(this.stdVertexFoot)+'\n'+
'\n'+
'\n'+
'\n'+
'\n'+
'//:\n'+
'//:\n'+
'//: Standard Fragment Shader\n'+
'//:\n'+
'//:\n'+
'//-----\n'+
'';}; x.fragmentDefs=function(){return '//+++++ fragmentDefs \n'+
'#define TS(S) ((S)*(1.0/'+this.ins(this.TEXTURECANVASWIDTH)+'))\n'+
'#define TT(T) ((T)*(1.0/'+this.ins(this.TEXTURECANVASHEIGHT)+'))\n'+
'\n'+
'//-----\n'+
'';}; x.fragmentShaderCode=function(){return '//+++++ fragmentShaderCode \n'+
'\n'+
'precision '+this.ins(this.FSMAXP)+' float;\n'+
'\n'+
''+this.ins(this.stdFragmentUniforms)+'\n'+
'\n'+
'//:a\n'+
''+this.ins(this.fragmentDefs)+'\n'+
'//:b\n'+
''+this.ins(this.ifragDef)+'\n'+
'//:c\n'+
''+this.ins(this.fragDef)+'\n'+
'\n'+
'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'\n'+
'\n'+
'void main()\n'+
'{\n'+
'   mediump vec4 c, d, e;\n'+
'   \n'+
'\n'+
'   '+this.ins(this.dyntexvar)+'\n'+
'   '+this.ins(this.ifragVar)+'\n'+
'   '+this.ins(this.fragVar)+'\n'+
'   '+this.ins(this.fragPos)+'\n'+
'\n'+
'  '+((this.sp.useTex)?('\n'+
'   c  = texture2D(uTexture,  '+this.ins(this.vtexpos_st)+');\n'+
'  '):'')+'\n'+
'\n'+
'  '+((this.sp.showShadow)?('\n'+
'      const float shF=2.0;\n'+
'      '+this.ins(this.stdShadow3Dmapping)+'\n'+
'      vec4 sp4=shadowPM * vec4(v3Dpos,1.0);\n'+
'      vec3 sp=(sp4.xyz/sp4.w) + vec3(0.5,0.5,0.5); \n'+
'\n'+
'\n'+
'   vec4 sm  = texture2D(uShadowMap,  sp.xy);\n'+
'   const float shadowDiff = 0.0005;\n'+
'//:   bool  hasShadow = sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0));\n'+
'   float hasShadow = (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(4.0/2048.0,4.0/2048.0));\n'+
'   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-4.0/2048.0,-4.0/2048.0));\n'+
'   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n'+
'\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,1.0/2048.0));\n'+
'   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,-1.0/2048.0));\n'+
'   hasShadow += (sp.z - shadowDiff > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n'+
'\n'+
'\n'+
'\n'+
'   hasShadow *= uShadowFactor;\n'+
'   '+this.ins(this.endShadowCalc)+'\n'+
'\n'+
'\n'+
'//:   sm=vec4(0.0,0.0,0.0,1.0);					\n'+
'//:   bool hasShadow = vShadowPos.z > 0.4845;\n'+
'//:   bool hasShadow = sm.r >  0.4862;\n'+
'//:   vec4 sm  = texture2D(uShadowMap,  vec2((gl_FragCoord.x+1.0)*0.01, (gl_FragCoord.y+1.0)*0.01));\n'+
'//:   vec4 sm  = vec4 ((gl_FragCoord.x+1.0)*0.001, (gl_FragCoord.y+1.0)*0.001, 0.0, 1.0);\n'+
'//:   vec4 sm  = texture2D(uShadowMap,  vec2(s, 1.0-t));\n'+
'//:     if (s<0.1) sm=vec4(1.0,0.0,0.0,1.0);\n'+
'//:     if (t<0.1) sm=vec4(0.0,1.0,0.0,1.0);\n'+
'  '):'')+'\n'+
'\n'+
'   //: if !colormode\n'+
'   //:    vec4(vAmbColor) is the background color\n'+
'   //:    vDiffColor.x    ambientLightFactor\n'+
'   //:    vDiffColor.y    diffuseLightFactor\n'+
'   //:    vDiffColor.z    unused\n'+
'   //:    vDiffColor.w    0  (flag for colormode)\n'+
'   //: if colormode\n'+
'   //:    vAmbColor.xyz   ambient Color\n'+
'   //:    vDiffColor.xyz  diffuse Color\n'+
'   //:    vAmbColor.w     background color is (1,1,1,1)*vAmbColor.z\n'+
'   //:    vDiffColor.w    1  (flag for colormode)\n'+
'\n'+
'  '+((this.sp.lightingPerFragment)?('\n'+
'     bool  colormode= vDiffColor.w!=0.0; \n'+
'   vec4  bgcolor  = colormode ? vec4(1.0,1.0,1.0,1.0)*vAmbColor.w : vAmbColor;\n'+
'  '):'')+'\n'+
'  '+((!this.sp.lightingPerFragment)?('\n'+
'   vec4  bgcolor  = vAmbColor;\n'+
'  '):'')+'\n'+
'\n'+
'\n'+
'  '+((this.sp.useTex)?('\n'+
'  '+((!this.sp.singleTex)?('				\n'+
'   d = texture2D(uTexture2, '+this.ins(this.vtexpos_st2)+');\n'+
'   float da = vtexpos.q; float ca = vtexpos.p;\n'+
'   '+this.ins(this.mixAlpha)+'\n'+
'   '+this.ins(this.mix)+'\n'+
'   '+((this.qmix)?('\n'+
'   e = c*ca+d*da;\n'+
'   '):'')+'\n'+
'   '+((!this.qmix)?('\n'+
'   float dam=d.a*da; float cam=c.a*ca;\n'+
'   e = vec4 (c.rgb * ca * (1.0-dam) + d.rgb*da, 1.0-(1.0-dam)*(1.0-cam)); \n'+
'   '):'')+'\n'+
'  '):'')+'\n'+
'\n'+
'  '+((this.sp.singleTex)?('\n'+
'   float ca = vtexpos.p;\n'+
'   '+this.ins(this.mixAlpha)+'\n'+
'   '+this.ins(this.mix)+'\n'+
'   float cam=c.a*ca; float dam=0.0;\n'+
'   e = vec4 (c.rgb * ca,  cam);\n'+
'  '):'')+'\n'+
'\n'+
'\n'+
'   float a =  1.0  -(1.0-bgcolor.a)*(1.0-e.a);\n'+
'   mediump vec3 col = e.rgb + bgcolor.rgb * (1.0-e.a);  \n'+
'  '):'')+'    '+((!this.sp.useTex)?('\n'+
'   vec3 col=bgcolor.rgb; float a=bgcolor.a;\n'+
'  '):'')+'\n'+
'   '+this.ins(this.alpha)+'\n'+
'   '+this.ins(this.color)+'\n'+
'\n'+
'  '+((this.sp.useDiscard&&!this.sp.discardThreshold)?('\n'+
'   if (a<0.01) discard;\n'+
'  '):'')+'\n'+
'  '+((this.sp.discardThreshold)?('\n'+
'   if (a<bgcolor.r) discard;\n'+
'  '):'')+'\n'+
'\n'+
'\n'+
'  '+((this.sp.lightingPerFragment)?('\n'+
'   '+this.ins(this.FSMAXP)+' vec3 lightDir = normalize( (uLightPos.xyz - v3Dpos)  '+((!this.fsHighp)?('*(1.0/8192.0)'):'')+' );\n'+
'   '+this.ins(this.FSMAXP)+' vec3 normal;\n'+
'  '+((this.sp.frontfacing)?('\n'+
'   if (gl_FrontFacing) normal=vnormal; else normal=-vnormal;\n'+
'  '):'')+'\n'+
'  '+((!this.sp.frontfacing)?('\n'+
'   normal=vnormal;					\n'+
'  '):'')+'\n'+
'   '+this.ins(this.normal)+'\n'+
'  normal=normalize(normal);\n'+
'   \n'+
'  mediump vec3 Light =  (colormode ? vDiffColor.rgb : uLightingColor * vDiffColor.y ) *\n'+
'  	          ( clamp( ( '+((!this.sp.frontfacing)?('abs'):'')+'(dot(normal, lightDir ))), 0.0, 1.0));\n'+
'\n'+
'\n'+
''+((this.sp.useuEye)?('\n'+
'  vec3 eye = vec3 (uEye);\n'+
''):'')+'\n'+
'\n'+
'\n'+
''+((!this.sp.useuEye)?('\n'+
'  vec3 eye = vec3 ('+this.ins(this.EYEX)+', '+this.ins(this.EYEY)+', '+this.ins(this.EYEZ)+');\n'+
''):'')+'\n'+
'\n'+
''+((this.sp.specLight)?('\n'+
'    Light += '+((this.sp.showShadow)?(' (uShadowFactor-hasShadow)* '):'')+' uLightingColor * vLightingPar.z * pow ( clamp ( dot ( reflect (-lightDir, normal), normalize((eye - v3Dpos) '+((!this.fsHighp)?('*(1.0/8192.0)'):'')+' ) ), 0.0, 1.0),  0.000001+vLightingPar.w) ; \n'+
''):'')+'\n'+
'\n'+
'\n'+
'\n'+
'    col *= ( Light   '+((this.sp.showShadow)?(' * (1.0-hasShadow) '):'')+' + (colormode ? vAmbColor.rgb : uLightingAmbientColor * vDiffColor.x));\n'+
'  '):'')+'\n'+
'  '+((this.sp.lightingPerVertex)?('  \n'+
'    col *= vLight.rgb;  \n'+
'  '):'')+'\n'+
'\n'+
'\n'+
'\n'+
'  '+((this.sp.shadowOnly!=false&&this.sp.shadowOnly!=true)?('\n'+
'  '+((this.sp.lightingPerFragment)?('\n'+
'   if (vLightingPar.x>0.0) {\n'+
'      col=vec3(0.0,0.0,0.0);\n'+
'      a =  '+((this.sp.showShadow)?('hasShadow*(Light.r+Light.g+Light.b)/3.0+'):'')+'0.0;\n'+
'   }\n'+
'  '):'')+'\n'+
'  '+((this.sp.lightingPerVertex)?('\n'+
'   if (vLight.a<=-1.0) {\n'+
'      col=vec3(0.0,0.0,0.0);\n'+
'      a =  '+((this.sp.showShadow)?('hasShadow*(vLight.r+vLight.g+vLight.b)/3.0+'):'')+'0.0;\n'+
'   }\n'+
'  '):'')+'\n'+
'  '):'')+'\n'+
'  '+((this.sp.shadowOnly)?('\n'+
'      col=vec3(0.0,0.0,0.0);\n'+
'      '+((this.sp.lightingPerFragment)?('\n'+
'      a =  '+((this.sp.showShadow)?('hasShadow*(Light.r+Light.g+Light.b)/3.0+'):'')+'0.0;\n'+
'      '):'')+'\n'+
'      '+((this.sp.lightingPerVertex)?('\n'+
'         a =  '+((this.sp.showShadow)?('hasShadow*(vLight.r+vLight.g+vLight.b)/3.0+'):'')+'0.0;\n'+
'      '):'')+'\n'+
'      '+((!this.sp.lighting)?('\n'+
'         a =  '+((this.sp.showShadow)?('hasShadow+'):'')+'0.0;\n'+
'      '):'')+'\n'+
'  '):'')+' \n'+
'\n'+
'\n'+
'   '+this.ins(this.finalcolor)+'\n'+
'  '+((this.sp.showShadow)?('\n'+
'  '):'')+'  \n'+
'      gl_FragColor = vec4(col,a);\n'+
'}\n'+
'\n'+
'//-----\n'+
'';}; x.endShadowCalc=function(){return '//+++++ endShadowCalc //-----\n'+
'';}; x.calcv3Dpos=function(){return '//+++++ calcv3Dpos \n'+
'\n'+
'//:\n'+
'//:\n'+
'//:  Shadow map Fragment Shader\n'+
'//:\n'+
'//://-----\n'+
'';}; x.shadowFragmentShaderCode=function(){return '//+++++ shadowFragmentShaderCode \n'+
'precision mediump float;\n'+
'\n'+
''+this.ins(this.stdUniformsBg)+' '+this.ins(this.stdUniformsEnd)+'\n'+
''+this.ins(this.fragmentDefs)+'\n'+
''+this.ins(this.ifragDef)+'\n'+
''+this.ins(this.fragDef)+'\n'+
'\n'+
'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'void main()\n'+
'{\n'+
'   vec4 c, d, e;\n'+
'\n'+
'   '+this.ins(this.dyntexvar)+'\n'+
'   '+this.ins(this.ifragVar)+'\n'+
'   '+this.ins(this.fragVar)+'\n'+
'   '+this.ins(this.fragPos)+'\n'+
'\n'+
'   float bgcolora = vAmbColor.a; \n'+
'  '+((this.sp.useTex)?('\n'+
'   c  = texture2D(uTexture,  '+this.ins(this.vtexpos_st)+');\n'+
'  '+((!this.sp.singleTex)?('				\n'+
'   d = texture2D(uTexture2,  '+this.ins(this.vtexpos_st2)+');\n'+
'   float da = vtexpos.q; float ca = vtexpos.p;\n'+
'   '+this.ins(this.mixAlpha)+'\n'+
'   float dam=d.a*da; float cam=c.a*ca;\n'+
'   float ea = 1.0-(1.0-dam)*(1.0-cam); \n'+
'  '):'')+'\n'+
'  '+((this.sp.singleTex)?('\n'+
'   float ca = vtexpos.p;\n'+
'   '+this.ins(this.mixAlpha)+'\n'+
'   float cam=c.a*ca; float dam=0.0;\n'+
'   float ea = cam;\n'+
'  '):'')+'\n'+
'   float a =  1.0  -(1.0-bgcolora)*(1.0-ea);\n'+
'  '):'')+'\n'+
'  '+((!this.sp.useTex)?('\n'+
'   float a=bgcolora;\n'+
'  '):'')+'\n'+
'\n'+
'   '+this.ins(this.alpha)+'\n'+
'\n'+
'  '+((this.sp.useDiscard&&!this.sp.discardThreshold)?('\n'+
'   if (a<0.01) discard;\n'+
'  '):'')+'\n'+
'  '+((this.sp.discardThreshold)?('\n'+
'   if (a<vAmbColor.r) discard;\n'+
'  '):'')+'\n'+
'\n'+
'\n'+
'\n'+
'   gl_FragColor = floor ( fract( gl_FragCoord.z*vec4(1.0,256.0,65536.0,256.0*65536.0) ) * 256.0 ) * (1.0/255.0);\n'+
'\n'+
'}\n'+
'\n'+
'\n'+
'\n'+
'';}
// END taccgl_shader

    this.init = function () {
	this.p=null;
	this.ifragDef="";
	this.ifragVar=""; this.iTimes=""; this.iVarying="";
	this.dyntexvar = ""; this.vtexpos_st = 	this.vtexpos_st2 = "vtexpos.st";

//	this.lighting=false; this.lightingPerFragment=false; this.lightingPerVertex=false;
	this.lighting=true; this.lightingPerFragment=!taccgl_perVertex; this.lightingPerVertex=taccgl_perVertex;
        this.frontfacing=taccgl_frontfacing; this.useTex=true; this.shadowOnly=null; this.useDiscard=true;
	this.discardThreshold=false;
	if (window.taccgl_TM || window.taccgl_TM==false) this.useTM=window.taccgl_TM;  else this.useTM=true;
	if (window.taccgl_parallax || window.taccgl_parallax==false) this.useuEye=window.taccgl_parallax;  else this.useuEye=true;
	if (window.taccgl_noSpecular || window.taccgl_noSpecular==false) this.specLight=!taccgl_noSpecular;  else this.specLight=true;
	if (window.taccgl_mediump || window.taccgl_mediump==false) this.force_mediump=taccgl_mediump;  else this.force_mediump=false;
	if (window.taccgl_qmix || window.taccgl_qmix==false) this.qmix=taccgl_qmix;  else this.qmix=true;
	if (window.taccgl_singleTex || window.taccgl_singleTex==false) this.singleTex=taccgl_singleTex;  else this.singleTex=false;
	this.consts=new this.empty();
	this.uniforms=new this.empty();
//	this.shadow=  true;  
	this.showShadow = true;
	this.castShadow = true;
        var ua=navigator.userAgent;
        this.isTrident = ua.match(/Trident|Edge/);
        if (this.lightingPerVertex) {
	    this.showShadow =this.castShadow = false;
	}
	if (this.dddmode) this.evalPrecisionFormat();
	this.reuseSc = {};
    }
    this.empty = function () {};

    this.setLighting = function (ena, perVertex){
	if (ena) {
	    this.lighting=true;
	    if (perVertex) { 
		 this.lightingPerFragment=false; this.lightingPerVertex=true;
	    } else {
		 this.lightingPerFragment=true; this.lightingPerVertex=false;
	    }
	} else {
	    this.lighting=false;  this.lightingPerFragment=false; this.lightingPerVertex=false;
	    this.showShadow=false;
	}
	return this;
    }

    this.initShader = function (){
	if (!taccgl.dddmode) return;
        var x = this;if(x){} // artificially use x to avoid tools the cannot handle eval complaining about unused x
	var s=this.prepShader('taccgl_Shaders',this.getShader('taccgl_Shaders'));
//	taccgl.clog(s);
	eval(s);
    }
    this.extendShader = function (n){
	if (!taccgl.dddmode) return;
	if (n=='taccgl_Shaders') return;
        var x = this;if(x){} // artificially use x to avoid tools the cannot handle eval complaining about unused x
	eval(this.prepShader(n,this.getShader(n)));
    }
    this.fpn = function (f) {
        var s=f+"";
        return (s. replace(/^([0-9]*)$/,"$1.0"));
    }
    this.el = function (pre, el, t, ti){
	if (!taccgl.dddmode) return this;
        if (typeof (el)=="string") el=document.getElementById(el);
//        var par=el, x= el.offsetLeft, y=el.offsetTop;
//        while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
        taccgl.autoDetectScroll();
        var rect=el.getBoundingClientRect(), x=rect.left+taccgl.scrollLeft, y=rect.top+taccgl.scrollTop;

//        if (t) { x+= t.atBl.x-t.x; y+= t.atBl.y-t.y}
//        if (t) { x+= t.s0-t.x; y+= t.t0-t.y}   // FIXME el xxxx
	if (t) { var v = t.cvCssTex (x,y,ti); x=v[0]; y=v[1]; }

        this.ifragDef += "#define "+pre+"S TS("+this.fpn(x)+")\n"+
            "#define "+pre+"T TT("+this.fpn(y)+")\n"+
            "#define "+pre+"W TS("+el.offsetWidth+".0)\n"+
	    "#define "+pre+"H TT("+el.offsetHeight+".0)\n"+
            "#define "+pre+"MS TS("+this.fpn(x)+"+"+el.offsetWidth+".0/2.0)\n"+
            "#define "+pre+"MT TT("+this.fpn(y)+"+"+el.offsetHeight+".0/2.0)\n";
	return this;
    }
    this.transtex = function (pre, tr, ti) {
	if (!taccgl.dddmode) return this;
	if (!ti) ti=0;
	var tm=1-ti;
	var ws, wt, s, hs, ht, t;  
	if (tr.dotexmove) {
            ws = tr.ws0*tm + tr.ws1*ti,  wt = tr.wt0*tm + tr.wt1*ti,
            hs = tr.hs0*tm + tr.hs1*ti,  ht = tr.ht0*tm + tr.ht1*ti,
            s = tr.s0*tm   + tr.s1*ti,   t  = tr.t0*tm  + tr.t1*ti;
	} else {
            ws = tr.ws0;  wt = tr.wt0;
            hs = tr.hs0;  ht = tr.ht0;
            s =  tr.s0*tm   + tr.s1*ti,   t  = tr.t0*tm  + tr.t1*ti;
	}
	    
        this.ifragDef += "#define "+pre+"S TS("+this.fpn(s)+")\n"+
            "#define "+pre+"T TT("+this.fpn(t)+")\n"+
	    "#define "+pre+"WS TS("+this.fpn(ws)+")\n"+
	    "#define "+pre+"WT TT("+this.fpn(wt)+")\n"+
	    "#define "+pre+"HS TS("+this.fpn(hs)+")\n"+
	    "#define "+pre+"HT TT("+this.fpn(ht)+")\n"
    }
    this.times = function () {
	if (!taccgl.dddmode) return this;
//	this.ifragVar+="float basetime = times.s; float duration = times.t; float rt = (uTime-basetime)/duration;  float ct = clamp(rt,0.0,1.0);\n"+
//	    "float mct= 1.0-ct;\n";
	this.ifragVar+="float basetime = times.s; float duration = times.t; float rt = times.p; float ct = times.q;\n"+
	    "float mct= 1.0-ct;\n";

	this.iTimes += "times.s=basetime;  times.t= duration; times.p=rt; times.q=t;\n";
	this.iVarying += "varying   "+this.FSMAXP()+" vec4 times;     //: passing on timing information for user shaders \n";
	return this;
    }
    this.fragCoord = function () {
	if (!taccgl.dddmode) return this;
	this.ifragVar+="float fx=gl_FragCoord.x; float fy=gl_FragCoord.y; float fz=gl_FragCoord.z; float fw=gl_FragCoord.w;\n";
	return this;
    }

    this.evalPrecisionFormat = function () {
	this.pfFsHighP = taccgl.g.getShaderPrecisionFormat(taccgl.g.FRAGMENT_SHADER, taccgl.g.HIGH_FLOAT);
	this.pfFsMediumP = taccgl.g.getShaderPrecisionFormat(taccgl.g.FRAGMENT_SHADER, taccgl.g.MEDIUM_FLOAT);
	this.pfFsLowP = taccgl.g.getShaderPrecisionFormat(taccgl.g.FRAGMENT_SHADER, taccgl.g.LOW_FLOAT);
	if (taccgl_debug) { 
	    console.log ("HighP Precision Format");
	    console.log (this.pfFsHighP);
	    console.log ("MediumP Precision Format");
	    console.log (this.pfFsMediumP);
	    console.log ("LowP Precision Format");
	    console.log (this.pfFsLowP);
	} // taccgl_debug_end
	this.fsHighp = (this.pfFsHighP.rangeMin != 0 && this.pfFsHighP.rangeMax !=0 );
	// this.fsHighp=false;
    }

    this.dynTex = function () {
        this.dyntexvar = function () {
	  if (!this.singleTex) 
	    return  "float s=vtexpos.s; float t=vtexpos.t; float s2=vtexpos.s; float t2=vtexpos.t;\n";
	  else
	    return "float s=vtexpos.s; float t=vtexpos.t;\n";
        }
	this.vtexpos_st = "vec2(s,t)";
	this.vtexpos_st2 = "vec2(s2,t2)";
	return this;
    }

    this.ins = function (h,a,b,c,d,e,f,g) {
	if (typeof (h) == "function") {this.h=h; var r= this.h(a,b,c,d,e,f,g); this.h=null; return r;}
	else if (typeof (h) == "string") return h;
	else if (typeof (h) == "number") {
	    var s=""+h;
	    if (s.match(/\./)) return s;
	    return s+".0";
	}
	else if (h && typeof (h) == "object") 
	    if (h.length) {
		var x="", i;
		for (i=0;i<h.length;i++) x+=this.ins(h[i],a,b,c,d,e,f,g)
		return x;
	    } else {
		return h.gen(a,b,c,d,e,f,g);
	    }
    }


    this.prepShader = function (n,s) {
	var t;
	t="{x.dummy='"+s;
	t=t.replace(/\n:([A-Za-z0-9]+)/g,"//-----\n';}; x.$1=function(){return '//+++++ $1 ")
	t=t.replace(/\n/g,"\\n'+\n'")
	t=t.replace(/\$\$([A-Za-z0-9_]+)/g,"'+this.ins(this.$1)+'")
	t=t.replace(/\$\$\[/g,"'+")
	t=t.replace(/\$\$\]/g,"+'")
	t=t.replace(/\$\$\?([A-Za-z0-9_!|.()&=<>]+)\{/g,"'+(($1)?('")
	t=t.replace(/\$\$\?\}/g,"'):'')+'")
	t+="';}"; 

	s='/*\n<script id="taccgl_Shaders" type="x-gsgl/x-vertex">'+s+'</script>\n*/\n'
	if (taccgl_showShader)
            document.body.insertAdjacentHTML (
		"afterbegin",
		'<H1 style="z-index:1000000; position:relative; color:red; background-color:white; margin-top:20px;">Cut and Paste Shader '
		+n
		+ '</h1><div style="z-index:100000; position:relative"><textarea cols="80" rows="5">'+s+t+'</textarea></div>'
	    )
	return (t);
    }
    this.getShader = function (n) {
	var el = document.getElementById(n), t = " ";
	if (el) {
	    t = el.innerHTML; 
	    if (!t) t=el.text;
	}
	return (t);
    }

    this.TEXTURECANVASWIDTH = function() {return taccgl_texCanWidth+".0";}
    this.TEXTURECANVASHEIGHT = function() {return taccgl_texCanHeight+".0";}
    this.EYEX = function() {return Math.floor(taccgl.stdEye.eyeX)+".0";}
    this.EYEY = function() {return Math.floor(taccgl.stdEye.eyeY)+".0";}
    this.EYEZ = function() {return Math.floor(taccgl.stdEye.eyeZ)+".0";}
    this.fragDef = "/* fragDef */";
    this.fragVar = "/* fragVar */";
    this.fragPos = "/* fragPos */";
    this.mix = "/* mix */";
    this.color = "/* color */";
    this.finalcolor = "/* finalcolor */";
    this.vertexVar = "/* vertexVar */";
    this.pos = "/* pos */";
    this.alpha = "/* alpha */";
    this.mixAlpha = "/* mixAlpha */";
    this.normal = "/* normal */";
    this.LOWP = function () {
	if (this.force_mediump) return "mediump"; else return 'lowp';
    }
    this.FSMAXP = function () {
	if (this.fsHighp) return "highp"; else return "mediump";
    }

    this.genUniforms = function () {
	var s="", n;
	for (n in this.uniforms) {
	    var u=this.uniforms[n];
	    s += "uniform ";
	    if (u.d==1) s+=" float "; else if (u.d<=4) s+=" "+this.FSMAXP()+" vec"+u.d; else s+=" "+this.FSMAXP()+" mat"+(u.d-100);
	    s += " " + u.name + ";\n";
	}
	return s;
    }
    this.genConsts = function () {
	var s="", n;
	for (n in this.consts) {
	    var u=this.consts[n];
	    s += "const  ";
	    if (u.d==1) s+=" float "; else s+=" vec"+u.d;
	    s += " " + u.name + " = ";
	    if (u.d==1) s+=u.jcx; else  {
		s+=" vec"+u.d + "(";
		s+=u.jcx;
		if (u.jcy) s+= ","+u.jcy;
		if (u.jcz) s+= ","+u.jcz;
		if (u.jcw) s+= ","+u.jcw;
		s+=")";
	    }
 	    s += ";\n";
	}
	return s;
    }

    this.shaderPar  = function (sc) {
	this.lighting=sc.lighting; this.lightingPerFragment=sc.lightingPerFragment; this.lightingPerVertex=sc.lightingPerVertex;
        this.singleTex=sc.singleTex; this.frontfacing=sc.frontfacing; this.useTM=sc.useTM; this.useuEye=sc.useuEye;
	this.specLight=sc.specLight; this.useTex=sc.useTex; this.shadowOnly=sc.shadowOnly; this.useDiscard=sc.useDiscard;
	this.discardThreshold= sc.discardThreshold;
//	this.consts=new this.empty();
//	this.uniforms=new this.empty();
//	this.shadow=  sc.shadow;  
	this.showShadow = sc.showShadow;
	this.castShadow = sc.castShadow;
	if (taccgl_debug) {
	    this.toString = function () {
		var s="[";
		if (this.lighting) s+="lighting, ";
		if (this.lightingPerFragment) s+="lightingPerFragment, ";
		if (this.lightingPerVertex) s+="lightingPerVertex, ";
		if (this.singleTex) s+="singleTex, ";
		if (this.useTex) s+="useTex, ";
		if (this.frontfacing) s+="frontfacing, ";
		if (this.showShadow) s+="showShadow, ";
		if (this.castShadow) s+="castShadow, ";
		if (this.specLight) s+="specLight, ";
		if (this.shadowOnly) s+="shadowOnly, ";
		if (this.useDiscard) s+="useDiscard, ";
		if (this.discardThreshold) s+="discardThreshold, ";
		return s+"]";
	    }
	}  // taccgl_debug_end
    }

    this.newUniform = function  (name, d, jcx, jcy, jcz, jcw) {
	this.name=name; this.jcx=jcx; this.jcy=jcy; this.jcz=jcz; this.jcw=jcw; this.d=d;
    }
    this.newConst = function  (name, d, jcx, jcy, jcz, jcw) {
	this.name=name; this.jcx=jcx; this.jcy=jcy; this.jcz=jcz; this.jcw=jcw; this.d=d
    }
    this.createUniform = function (name, jcx, jcy, jcz, jcw) {
	var d=1; if (jcy) d=2; if (jcz) d=3; if (jcw) d=4;
	this.uniforms[name] =  new this.newUniform(name, d, jcx, jcy, jcz, jcw);
    }
    this.createUniformMatrix = function (name, d, transpose, m) {
	// d can be 2,3 or 4
	this.uniforms[name] =  new this.newUniform(name, 100+d, transpose, m);
    }
    this.createConst = function (name, jcx, jcy, jcz, jcw) {
	var d=1; if (jcy) d=2; if (jcz) d=3; if (jcw) d=4;
	this.consts[name] =  new this.newConst(name, d, jcx, jcy, jcz, jcw);
    }

    this.setupGen = function () {
	if (this.sp.lighting) {
	    this.createUniform ("uLightingPar", "taccgl.lightAmbient", "taccgl.lightDiffuse", "taccgl.lightSpecular", "taccgl.lightShininess");
	    this.createUniform ("uLightPos", "taccgl.stdLight.x", "taccgl.stdLight.y", "taccgl.stdLight.z", "taccgl.stdLight.focus");
	    if (!this.uniforms.uLightingAmbientColor) this.createConst ("uLightingAmbientColor", "1.0", "1.0", "1.0");
	    if (!this.uniforms.uLightingColor) this.createConst ("uLightingColor", "1.0", "1.0", "1.0");
	    if (!window.taccgl_shadowFactor) taccgl_shadowFactor=0.8;
	    if (!this.uniforms.uShadowFactor) this.createConst ("uShadowFactor", taccgl_shadowFactor.toFixed(5));
	}
	if (this.sp.useTM){
	    // would like to use transpose=true, but this is not supported by webgl
	    // so matrices are implicitely transposed when passed to GLSL
	    // because in taccgl-js matrices are stored in row major order
	    // but WEBGL/GLSL expects them in column major order
	    // So we added a 'T' to the variable name in GLSL to indicate that the
	    // variables hold transposed matrices.
	    // since the trnaformation matrix appears transposed in the shader we use
	    // multiplication from the left in the shader
	    // with regards of TM_1 we actually need the transpose version in the shader
	    this.createUniformMatrix ("uTMT", 4, "false", "taccgl.TM");
	    this.createUniformMatrix ("uTM_1T", 3, "false", "taccgl.TM_1");
	}
	if (this.sp.useuEye){
	    this.createUniform ("uEye","taccgl.stdEye.eyeX", "taccgl.stdEye.eyeY", "taccgl.stdEye.eyeZ")
	}
    }

    this.reuseVertexShader = function (sc) {
	this.reuseSc=sc;
    }

    this.trycompile = function (par,reuse){
	taccgl.webglerror=false;
	this.sp= par; // during compilation this.sp contains the current compile parameters
	this.setupGen();
	this.inShadow=false;
	if (reuse && par.lightingPerVertex!=reuse.lightingPerVertex) reuse=this.reuseSc.perVpar;
	if (reuse && reuse.vertexShader ) { par.vertexShader = reuse.vertexShader } else 
	{ this.inFragment=false; this.inVertex=true; par.vstext=this.vertexShaderCode(); this.inVertex=false;}
	this.inFragment=true; this.inVertex=false; par.fstext=this.fragmentShaderCode(); this.inFragment=false;
	this.inShadow=null;
	if (taccgl_showShader) {
            document.body.insertAdjacentHTML (
 		"afterbegin",
		'<textarea cols="80" rows="2" style="z-index:100000; position:relative">'+par.fstext+'</textarea>'
	    )
            document.body.insertAdjacentHTML (
 		"afterbegin",
		'<textarea cols="80" rows="2" style="z-index:100000; position:relative">'+par.vstext+'</textarea>'
	    )
	}
	if (!par.vertexShader) {
	    par.vertexShader = taccgl.createVertexShader(taccgl.replaceShaderVariables(par.vstext));
	    if (par.vertexShader==null || taccgl.webglerror) return null;
	}
	par.fragmentShader = taccgl.createFragmentShader(taccgl.replaceShaderVariables(par.fstext));
	if (par.fragmentShader==null || taccgl.webglerror) return null;
	return par.p=taccgl.createShaderProgram (par.vertexShader, par.fragmentShader);
    }
    this.compileShadowShader = function () {
	this.shadowP=null; taccgl.webglerror=false;
	this.inShadow=true;
	if (this.reuseSc && this.reuseSc.shadowMapVertexShader) {
	    this.shadowMapVertexShader=this.reuseSc.shadowMapVertexShader
	} else {
	    this.inFragment=false; this.inVertex=true; var vstext=this.shadowVertexShaderCode();this.inVertex=false;
	}
	this.inFragment=true; this.inVertex=false; var fstext=this.shadowFragmentShaderCode(); this.inFragment=false;
	this.inShadow=null;
	// taccgl.clog("Listing Shadow Shaders");
	// taccgl.logNumberedText(vstext);
	// taccgl.logNumberedText(fstext);
        var vs;
	if (!this.shadowMapVertexShader) {
            vs = this.shadowMapVertexShader = taccgl.createVertexShader(taccgl.replaceShaderVariables(vstext));
	    if (vs==null || taccgl.webglerror) return;
	}
	var fs = taccgl.createFragmentShader(taccgl.replaceShaderVariables(fstext));
	if (fs==null || taccgl.webglerror) return;
	this.shadowP = taccgl.createShaderProgram (this.shadowMapVertexShader, fs);
    }
    this.newLocs = function (p,shadowmap,genshadowmap) {
	var g = taccgl.g;
	this.uTime =g.getUniformLocation(p,"uTime");
	if (genshadowmap)
	    this.shcvp= g.getUniformLocation(p,"shcvp")
	else
	    this.cvp= g.getUniformLocation(p,"cvp")
	this.uTexture = g.getUniformLocation(p,"uTexture");
	this.uTexture2 = g.getUniformLocation(p,"uTexture2");
	if (shadowmap) {
	    this.uShadowMap = g.getUniformLocation(p,"uShadowMap");
	    this.shcvp = g.getUniformLocation(p,"shcvp");
	    this.fshcvp = g.getUniformLocation(p,"fshcvp");
	}
    }
    this.compileUniforms = function () {
	this.fastLoc=new this.newLocs(this.fastProg, this.fastPar.showShadow, false);
        this.perVLoc=new this.newLocs(this.perVProg, false, false);
	if (this.advProg)
	    this.advLoc=new this.newLocs(this.advProg, this.advPar.showShadow, false);
	if (this.shadowP) 
	    this.shadowLoc = new this.newLocs(this.shadowP, false, true);
	
	var s="x.passUniforms=function (loc) {var g=taccgl.g;\n", n, u;
        for (n in this.uniforms) {
	    u=this.uniforms[n];
	    if (u.d>100){
	        s += "g.uniformMatrix"+(u.d-100)+"fv(loc."+u.name+","+u.jcx+","+u.jcy+");\n";	
	    } else {
		s += "g.uniform"+u.d+"f(loc."+u.name+","+u.jcx;
		if (u.jcy) s+=","+u.jcy;
		if (u.jcz) s+=","+u.jcz;
		if (u.jcw) s+=","+u.jcw;
		s+=");\n";
	    }
	    this.fastLoc[u.name]= taccgl.g.getUniformLocation(this.fastProg,u.name); 
	    this.perVLoc[u.name]= taccgl.g.getUniformLocation(this.perVProg,u.name); 
	    if (this.advProg)
		this.advLoc[u.name]= taccgl.g.getUniformLocation(this.advProg,u.name); 
	}
	s += "};\n";

        if (this.shadowP){
	    s+="x.shadowPassUniforms=function () {var g=taccgl.g;\n";
            for (n in this.uniforms) {
		u=this.uniforms[n];
		if (u.d>100){
	            s += "g.uniformMatrix"+(u.d-100)+"fv(this.shadowLoc."+u.name+","+u.jcx+","+u.jcy+");\n";	
		} else {
		    s += "g.uniform"+u.d+"f(this.shadowLoc."+u.name+","+u.jcx;
		    if (u.jcy) s+=","+u.jcy;
		    if (u.jcz) s+=","+u.jcz;
		    if (u.jcw) s+=","+u.jcw;
		    s+=");\n";
		}
		this.shadowLoc[u.name]= taccgl.g.getUniformLocation(this.shadowP,u.name); 
	    }
	    s += "}";
	}
	var x=this; eval(s); if(x){} // artificially use x to avoid tools that cannot handle eval complaining about unused x
    }
    this.compile = function () {
	if (!taccgl.dddmode) return this;

	/* Create the fastProg with fastPar and possibly the advProg with advPar.
	   The fastProg usually does not show shadows while the advProg does.
	   If either prog does not compile with frontfacing disable and try again.
	   If the fastProg does not compile with lighting, disable it and then shadows 
	   and advProg make no sense.
	   */

	if (taccgl_debug) {
	    taccgl.tlog("Start compiling shaders");
	}  // taccgl_debug_end
	var fastCompileStart = taccgl.perfnow();

        this.fastPar = new this.shaderPar(this);
	this.fastPar.showShadow=false; 
	this.fastProg = this.trycompile(this.fastPar, this.reuseSc.fastPar);
        if (!this.fastProg) {
	    if (taccgl_debug) {
		taccgl.tlog ("Compilation of fastProg failed, now try without frontfacing "+this.fastPar.toString()+"\n\n");
	    }  // taccgl_debug_end
	    this.fastPar.frontfacing=false; this.fastProg=this.trycompile(this.fastPar, this.reuseSc.fastPar);
 	    if (taccgl_debug) {
		if (!this.fastProg) {
		    taccgl.tlog ("Compilation of fastProg without frontfacing failed, try without lighting "+this.fastPar.toString()+"\n\n");
		}
	    }  // taccgl_debug_end
	}
	if (!this.fastProg && this.fastPar.lighting) {
	    this.fastPar.lighting=false;  this.fastPar.lightingPerFragment=false; this.fastPar.lightingPerVertex=false;
	    this.fastProg = this.trycompile(this.fastPar, this.reuseSc.fastPar);
	    if (taccgl_debug) {
		if (!this.fastProg) {
		    taccgl.tlog ("Compilation of fastProg without lighting failed "+this.fastPar.toString()+"\n\n");
		}
	    }  // taccgl_debug_end
	}
	if (!this.fastProg || taccgl.webglerror) return;

	var fastCompileTime = taccgl.perfnow()-fastCompileStart;
	if (taccgl_debug) { 
            taccgl.tlog ("Compilation of fastProg with  "+this.fastPar.toString()+"\n");
	} // taccgl_debug_end
	


	var n=navigator.appVersion;
	var aT;
	if (n.match(/Chrome/)) aT=taccgl_advCompileTimeChrome; else aT=taccgl_advCompileTime;

	if (this.showShadow && this.fastPar.lighting && (fastCompileTime < aT || taccgl.shadowEna==true) && taccgl.shadowEna!=false) {
	    if (taccgl_debug) {
		taccgl.tlog("Start compiling advanced Shaders - fastCompileTime="+fastCompileTime);
	    }  // taccgl_debug_end
            this.advPar  = new this.shaderPar(this); 
	    this.advPar.frontfacing = this.fastPar.frontfacing;
  	    this.advProg = this.trycompile(this.advPar,	 this.reuseSc.advPar);
            if (!this.advProg) {
		if (taccgl_debug) {
		    taccgl.tlog ("Compilation of advProg without frontfacing failed, run without shadows "+this.advPar.toString()+"\n\n");
//		    taccgl.clog ("Compilation of advProg failed, try without frontfacing "+this.advPar.toString()+"\n\n");
		}  // taccgl_debug_end
		taccgl.webglerror=false; /* ignore error, can work without advanced shader */
		/*
		this.advPar.frontfacing=false; this.p = this.trycompile(this.advPar, this.reuseSc.fastPar);
		if (taccgl_debug) {
		    if (!this.advProg) {
			taccgl.clog ("Compilation of advProg without frontfacing failed, run without shadows "+this.advPar.toString()+"\n\n");
		    }
		}  // taccgl_debug_end
		*/
	    } else {
		if (taccgl_debug) { 
		    taccgl.tlog ("Compilation of advProg with  "+this.advPar.toString()+"\n");
		} // taccgl_debug_end
            }
        } else {
	    if (taccgl_debug) {
		taccgl.tlog("Not compiling advanced Shaders because fastCompileTime="+fastCompileTime+ " > "+aT+" see advCompileTime option");
	    }  // taccgl_debug_end
	    this.advProg = null;
	}
    
        if (this.castShadow && this.advProg) {
	    this.sp=this.advPar;
	    this.compileShadowShader(); 
	    if (taccgl.webglerror) {
		taccgl.shadowEna=false; taccgl.webglerror=false;
	    } else {
		if (taccgl_debug) { 
		    taccgl.tlog ("Compilation of shadow map shaders with  "+this.advPar.toString()+"\n");
		} // taccgl_debug_end
            }
//	    if (!this.shadowP) {
//		this.shadow=false; this.advPar.shadow=false;
//		this.p = this.trycompile(this.advPar);
//		if (!this.p || taccgl.webglerror) return;
//	    }
	}
	
	if (this.fastPar.lightingPerVertex || !this.fastPar.lighting) {
	    this.perVPar=this.fastPar; this.perVProg=this.fastProg; this.perVLoc=this.fastLoc;
	    if (taccgl_debug) {
		taccgl.tlog ("Using fastProg as perVProg  with  "+this.perVPar.toString()+"\n");
	    } // taccgl_debug_end
	} else {
            this.perVPar = new this.shaderPar(this);
	    this.perVPar.showShadow=false; this.perVPar.lightingPerFragment=false; this.perVPar.lightingPerVertex=true; 
	    this.perVProg = this.trycompile(this.perVPar, this.reuseSc.perVPar);
	    if (!this.perVProg || taccgl.webglerror) {
		taccgl.tlog ("Compilation of perVProg failed with  "+this.perVPar.toString()+"\n");
		this.perVPar=this.fastPar; this.perVProg=this.fastProg; this.perVLoc=this.fastLoc;
		taccgl.tlog ("Using fastProg as perVProg  with  "+this.perVPar.toString()+"\n");
            } else {
		if (taccgl_debug) {
		    taccgl.tlog ("Compilation of perVProg with  "+this.perVPar.toString()+"\n");
		} // taccgl_debug_end
            }
	}

	this.compileUniforms();

        if (this.advProg != null) {this.p=this.advProg; this.loc=this.advLoc;} else {this.p=this.fastProg; this.loc=this.fastLoc;}

	this.qp=new Array(6); this.qLoc=new Array(6);
	this.qp[1]=this.perVProg; this.qLoc[1]=this.perVLoc;
	this.qp[2]=this.perVProg; this.qLoc[2]=this.perVLoc;
	this.qp[3]=this.perVProg; this.qLoc[3]=this.perVLoc;
	this.qp[4]=this.fastProg; this.qLoc[4]=this.fastLoc;
	this.qp[5]=this.fastProg; this.qLoc[5]=this.fastLoc;
        if (this.advProg != null) {this.qp[5]=this.advProg; this.qLoc[5]=this.advLoc;}
    }
    this.freeCompiled = function () {
	if (!taccgl.dddmode) return this;
	taccgl.g.useProgram (null);
//	taccgl.g.detachShader(this.p,this.vertexShader);
//	taccgl.g.detachShader(this.p,this.fragmentShader);
	taccgl.g.deleteProgram(this.p);
    }
}
function taccglShaderConfigEmpty () {
    this.init();
}
// taccglShaderConfigEmpty.prototype=new taccglShaderConfigPrototype ();




/* Multiples */
function taccglMultiPrototype () { 
    this.start = function (a,b,c,d,e,f) { 
	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var o = (this.ar[i]);
	    o.start(a,b,c,d,e,f);
	} 
	return this;
    }
    this.mActor = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mActor(a,b,c,d,e,f);}; return this;}
    this.stop = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.stop(a,b,c,d,e,f);}; return this;}
    this.hide = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.hide(a,b,c,d,e,f);}; return this;}
    this.hideAtBegin = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.hideAtBegin(a,b,c,d,e,f);}; return this;}
    this.cposClientRects = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.cposClientRects(a,b,c,d,e,f);}; return this;}
    this.cposTransform = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.cposTransform(a,b,c,d,e,f);}; return this;}
    this.opacity = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacity(a,b,c,d,e,f);}; return this;}
    this.alpha = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.alpha(a,b,c,d,e,f);}; return this;}
    this.textureDraw = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.textureDraw(a,b,c,d,e,f);}; return this;}
    this.paint = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.paint(a,b,c,d,e,f);}; return this;}
    this.alloc = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.alloc(a,b,c,d,e,f);}; return this;}
    this.ap = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.ap(a,b,c,d,e,f);}; return this;}
    this.texClear = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.texClear(a,b,c,d,e,f);}; return this;}
    this.rotate = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotate(a,b,c,d,e,f);}; return this;}
    this.rotateMiddle = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotateMiddle(a,b,c,d,e,f);}; return this;}
    this.rotVBegin = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotVBegin(a,b,c,d,e,f);}; return this;}
    this.rotVEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotVEnd(a,b,c,d,e,f);}; return this;}
    this.rotatePart = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotatePart(a,b,c,d,e,f);}; return this;}
    this.foreground = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.foreground(a,b,c,d,e,f);}; return this;}
    this.visatend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.visatend(a,b,c,d,e,f);}; return this;}
    this.visAtEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.visAtEnd(a,b,c,d,e,f);}; return this;}
    this.opacityatend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacityatend(a,b,c,d,e,f);}; return this;}
    this.opacityAtEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacityAtEnd(a,b,c,d,e,f);}; return this;}
    this.showafter= function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showafter(a,b,c,d,e,f);}; return this;}
    this.showbefore = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showbefore(a,b,c,d,e,f);}; return this;}
    this.showAfter= function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showAfter(a,b,c,d,e,f);}; return this;}
    this.showBefore = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showBefore(a,b,c,d,e,f);}; return this;}
    this.visFinal = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.visFinal(a,b,c,d,e,f);}; return this;}
    this.opacityFinal = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacityFinal(a,b,c,d,e,f);}; return this;}
    this.posZ = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.posZ(a,b,c,d,e,f);}; return this;}
    this.resizeZ = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.resizeZ(a,b,c,d,e,f);}; return this;}
    this.flyIn = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.flyIn(a,b,c,d,e,f);}; return this;}
    this.flyOut = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.flyOut(a,b,c,d,e,f);}; return this;}
    this.from = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.from(a,b,c,d,e,f);}; return this;}
    this.to = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.to(a,b,c,d,e,f);}; return this;}
    this.position = this.pos = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.position(a,b,c,d,e,f);}; return this;}
    this.restrict = this.clip = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clip(a,b,c,d,e,f);}; return this;}
    this.clipFrom = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipFrom(a,b,c,d,e,f);}; return this;}
    this.clipTo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipTo(a,b,c,d,e,f);}; return this;}
    this.clipT = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipT(a,b,c,d,e,f);}; return this;}
    this.clipTFrom = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipTFrom(a,b,c,d,e,f);}; return this;}
    this.clipTTo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipTTo(a,b,c,d,e,f);}; return this;}
    this.clipR = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipR(a,b,c,d,e,f);}; return this;}
    this.clipRFrom = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipRFrom(a,b,c,d,e,f);}; return this;}
    this.clipRTo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.clipRTo(a,b,c,d,e,f);}; return this;}
    this.mapR = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapR(a,b,c,d,e,f);}; return this;}
    this.mapRFrom = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapRFrom(a,b,c,d,e,f);}; return this;}
    this.mapRTo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapRTo(a,b,c,d,e,f);}; return this;}
    this.depth = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.depth(a,b,c,d,e,f);}; return this;}
    this.resize = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.resize(a,b,c,d,e,f);}; return this;}
    this.starttime = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.starttime(a,b,c,d,e,f);}; return this;}
    this.startTime = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.startTime(a,b,c,d,e,f);}; return this;}
    this.duration = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.duration(a,b,c,d,e,f);}; return this;}
    this.dur = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.dur(a,b,c,d,e,f);}; return this;}
    this.flyHome = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.flyHome(a,b,c,d,e,f);}; return this;}
    this.color = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.color(a,b,c,d,e,f);}; return this;}
    this.bgColor = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.bgColor(a,b,c,d,e,f);}; return this;}
    this.shadowOnly = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.shadowOnly(a,b,c,d,e,f);}; return this;}
    this.castShadow = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.castShadow(a,b,c,d,e,f);}; return this;}
    this.lightAmbDiff = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.lightAmbDiff(a,b,c,d,e,f);}; return this;}
    this.lightBgAmbDiff = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.lightBgAmbDiff(a,b,c,d,e,f);}; return this;}
    this.specLight = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.specLight(a,b,c,d,e,f);}; return this;}
    this.material = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.material(a,b,c,d,e,f);}; return this;}
    this.blend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.blend(a,b,c,d,e,f);}; return this;}
    this.acceleration = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.acceleration(a,b,c,d,e,f);}; return this;}
    this.vEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.vEnd(a,b,c,d,e,f);}; return this;}
    this.vBegin = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.vBegin(a,b,c,d,e,f);}; return this;}
    this.scalarAcceleration = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.scalarAcceleration(a,b,c,d,e,f);}; return this;}
//    this.blend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.blend(a,b,c,d,e,f);}; return this;}
    this.until = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.until(a,b,c,d,e,f);}; return this;}
    this.untilEo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilEo(a,b,c,d,e,f);}; return this;}
    this.untilBo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilBo(a,b,c,d,e,f);}; return this;}
    this.untilaLEo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilaLEo(a,b,c,d,e,f);}; return this;}
    this.untilaMEo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilaMEo(a,b,c,d,e,f);}; return this;}
    this.untilaLBo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilalBo(a,b,c,d,e,f);}; return this;}
    this.untilaMBo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilaMBo(a,b,c,d,e,f);}; return this;}
    this.LQCanvas = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.LQCanvas(a,b,c,d,e,f);}; return this;}
    this.NQCanvas = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.NQCanvas(a,b,c,d,e,f);}; return this;}
    this.map = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.map(a,b,c,d,e,f);}; return this;}
    this.mapScale = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapScale(a,b,c,d,e,f);}; return this;}
    this.mapRelative = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapRelative(a,b,c,d,e,f);}; return this;}
    this.copyTiming = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.copyTiming(a,b,c,d,e,f);}; return this;}
    this.copyMotion = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.copyMotion(a,b,c,d,e,f);}; return this;}
    this.copyMotion = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.copyMotion(a,b,c,d,e,f);}; return this;}
    this.opacity3D = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.opacity3D) o.opacity3D(a,b,c,d,e,f);}; return this;}
    this.appendBuffer = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.appendBuffer) o.appendBuffer(a,b,c,d,e,f);}; return this;}
    this.startScroll = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.startScroll) o.startScroll(a,b,c,d,e,f);}; return this;}
    this.absStartScroll = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.absStartScroll) o.absStartScroll(a,b,c,d,e,f);}; return this;}
    this.freeze = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.distance) o.freeze(a,b,c,d,e,f);}; return this;}
    this.distance = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.distance) o.distance(a,b,c,d,e,f);}; return this;}
    this.eye = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.distance) o.eye(a,b,c,d,e,f);}; return this;}


    this.selVisible = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var cs=getComputedStyle(this.ar[i].el);
	    if (cs.visibility=='visible') r.push(this.ar[i]);
	}
	return new taccglMultiIntClone(r);
    }

    this.getI = function (i) {
        if (i<0 || i>=this.ar.length) return null;
        return this.ar[i];
    }
    this.length = function () {
        return this.ar.length;
    }

    this.mp = function (f,d) {
	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    f(a,i,d,this);
	}
	return this;
    }

    this.select =  function (f,d) {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    if (f(a,i,d,this)) r.push(a);
	}
	return new taccglMultiIntClone(r);
    }

    this.selModulo =  function (m,f,t) {
	var r=Array(0);	var i; 
	if (!f) f=0;
	if (!t) t=f;
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    if (f<=i%m  && i%m<=t) r.push(a);
	}
	return new taccglMultiIntClone(r);
    }

    this.cont = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    r.push ( a.cont() );
	}
	return new taccglMultiIntClone(r);
    }
    this.clone = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    r.push ( a.clone() );
	}
	return new taccglMultiIntClone(r);
    }
    this.pclone = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    r.push ( a.pclone() );
	}
	return new taccglMultiIntClone(r);
    }
    this.pnclone = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    r.push ( a.pnclone() );
	}
	return new taccglMultiIntClone(r);
    }




    this.a = this.ma = function (el,k) {
	if (!k) k=taccgl.taccglAnim; 
	var a;
	if (typeof (k) == "object" ) {k.actorInit(el);a=k;} else a = new k (el);
	this.ar.push (a); 
	return this;
    }
    this.mac = function (el,k)   { 
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel)  { return this }
	}
	return this.ma(el,k);
    }

    this.add = this.mSingle = function (a) {this.ar.push(a); return this;}
    this.mClass = function (cl,k) { this.union ( taccgl.mClass(cl,k) ); return this; }
    this.mName  = function (cl,k) { this.union ( taccgl.mName(cl.k) ); return this;}
    this.mTagName = function (cl,k) { this.union ( taccgl.mTagName(cl.k) ); return this;}

    this.union = function (s) {	this.ar = this.ar.concat (s.ar); return this;}

    this.sequence = function (d,g) {
	if (!g) g=0;
	var n = this.ar.length, i;
	//  n*sd + (n-1)*g = d    sd + (sd+g)*(n-1) = d 
	var sd = (d-(n-1)*g)/n,
	    st = this.ar[0].basetime;
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    a.dur(sd);
	    a.absStartTime (st+i*(sd+g));
	}
	return this;
    }

    this.sliceV = function (n,g,s,f) {
	if (!g) g=0;
	if (!s) s=0;
	if (!f) f=1;
	var r=Array(0);	var i,j; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i], b, d;
            if ( typeof(a.wp0)!="number" ) {
               a.wp0=a.wp1=a.w; a.wq0=a.wq1=0;
               a.hq0=a.hq1=a.h; a.hp0=a.hp1=0;
               a.p0=a.p1=a.x; a.q0=a.q1=a.y;
            }
	    if (f==1) {d=n;} else { d=(1-Math.pow(f,n))/(1-f);}
	    var w = (a.wp0 - g*(n-1))/ d - n*s/2 + s/2;
	    for (j=0; j<n; j++) {
		if (j!=n-1) b=a.clone(); else b=a;
		if (f==1)
		    b.clip (a.p0 + j*(w+g)+j*(j-1)/2*s, a.q0, w+s*j, a.hq0); 
		else
		    b.clip (a.p0 + w*(1-Math.pow(f,j))/(1-f)+ j*g+j*(j-1)/2*s, a.q0, Math.pow(f,j)*w+s*j, a.hq0); 
		r.push(b);
	    }
	}
	this.ar=r; return this;
    }

    this.sliceH = function (n,g,s,f) {
	if (!g) g=0;
	if (!s) s=0;
	if (!f) f=1;
	var r=Array(0), i,j; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i], b, d;
            if ( typeof(a.wp0)!="number" ) {
               a.wp0=a.wp1=a.w; a.wq0=a.wq1=0;
               a.hq0=a.hq1=a.h; a.hp0=a.hp1=0;
               a.p0=a.p1=a.x; a.q0=a.q1=a.y;
            }
	    if (f==1) {d=n;} else { d=(1-Math.pow(f,n))/(1-f);}
	    var w = (a.hq0 - g*(n-1))/ d - n*s/2 + s/2;
	    for (j=0; j<n; j++) {
		if (j!=n-1) b=a.clone(); else b=a;
		if (f==1)
		    b.clip (a.p0, a.q0 + j*(w+g)+j*(j-1)/2*s, a.wp0, w+s*j); 
		else
		    b.clip (a.p0, a.q0 + w*(1-Math.pow(f,j))/(1-f)+ j*g+j*(j-1)/2*s, a.wp0, Math.pow(f,j)*w+s*j); 
		r.push(b);
	    }
	}
	this.ar=r; return this;
    }

    this.mult = function (n) {
	var r=Array(0), i,j; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i], b, d;
	    for (j=0; j<n; j++) {
		if (j!=n-1) b=a.clone(); else b=a;
		r.push(b);
	    }
	}
	this.ar=r; return this;
    }


    return this;
} 



function taccglMultiEmpty ()    { this.ar=Array(0); return this;}
function taccglMultiElement (e) { this.ar=Array(1); this.ar[0]=e; return this;}
function taccglMultiSet (s,k)     { 
    var i; this.ar=Array(s.length); 
    if (!taccgl.cv) taccgl.begin();
    if (!k) k=taccgl.taccglAnim;
    for (i=0; i<s.length; i++) {this.ar[i]=new k(s[i]);} return this;}
function taccglMultiIntClone (ar){this.ar=ar; return this;}
taccglMultiEmpty.prototype =taccglMultiElement.prototype= taccglMultiSet.prototype=
taccglMultiIntClone.prototype=new taccglMultiPrototype();

// Materials 

function taccglMaterialPrototype () { 
    var tap=taccgl.taccglAnim.prototype;
/*
    this.color          = function (c,c1) {
	this.colkind='color'; this.c=c; this.c1=c1; return this;}
    this.lightAmbDiff   = function (ambCol, diffCol, a0, a1) {
	this.colkind='lightAmbDiff'; this.ambCol=ambCol; this.diffCol=diffCol; this.a0=a0; this.a1=a1; return this;}
    this.lightBgAmbDiff = function (c,amb,diff, a0, a1){
	this.colkind='lightBgAmbDiff'; this.c=c; this.amb=amb; this.diff=diff; this.a0=a0; this.a1=a1; return this;}
    this.specLight = function (s, shini) {
	this.doSpecLight=true; this.spec=s; this.shini=shini; return this;}
    this.applyToAnim = function (a) {
	if (this.colkind=='color') {a.color(this.c,this.c1);}
	if (this.colkind=='lightAmbDiff') {a.lightAmbDiff (this.ambCol, this.diffCol, this.a0, this.a1);}
	if (this.colkind=='lightBgAmbDiff') {a.lightBgAmbDiff (this.c,this.amb,this.diff, this.a0, this.a1);}
	if (this.doSpecLight) {a.specLight(this.spec, this.shini);}
    }
*/

    this.applyToAnim=tap.applyToAnim;
    this.blend=tap.blend;
    this.color=tap.color;
    this.bgColor=tap.bgColor;
    this.lightAmbDiff=tap.lightAmbDiff;
    this.lightBgAmbDiff=tap.lightBgAmbDiff;
    this.specLight=tap.specLight;
    this.mapElement=tap.mapElement;
    this.map=tap.map;
    this.mapScale=tap.mapScale;
    this.map1=tap.map1;
    this.mapA=tap.mapA;
    this.mapTo=tap.mapTo;
    this.mapFrom=tap.mapFrom;
    this.mapT=tap.mapT;
    this.mapTTo=tap.mapTTo;
    this.mapTFrom=tap.mapTFrom;
    this.mapActor=tap.mapActor;
    this.mapMirrorY=tap.mapMirrorY;
    this.mapMirrorX=tap.mapMirrorX;
    this.mapTurn=tap.mapTurn;
    this.mapClip=tap.mapClip;
    this.mapClip=tap.mapRelative;
    this.setCanvas=tap.setCanvas;
    this.alloc=tap.alloc;
    this.paint=tap.paint;
}
function taccglMaterial () { 
    this.curface=this;
    this.flags = 0;
    this.lightSpecular=taccgl.lightSpecular;
    this.lightShininess=taccgl.lightShininess;
    this.col0s= this.col0t=this.col1s=this.col1t=-128*256; 
    this.mix1=this.mix0=1; this.mixs0=this.mixs1=0; this.docolor=true; this.flags|=16; this.defTexCan=1;
    this.colkind=null; this.doSpecLight=false;return this;
}
taccglMaterial.prototype= new taccglMaterialPrototype();
taccgl.material = function () {return new taccglMaterial();}

function taccglLightSourcePrototype () { 
    this.setPos = function (x,y,z) {this.x=x; this.y=y; this.z=z; taccgl.adjustShcvp();}
    this.setPosI = function (x,y,z) {this.x=x; this.y=y; this.z=z; }
    this.setShadowZRange = function (front, back){this.zBack=back; this.zFront=front;this.adjustShcvp(); }
    this.setFocus = function (f) {this.focus=f;}
    this.parallaxPos = function (fx,fy,x,y,z){
	if (x==null) x=this.x;
	if (y==null) y=this.y;
	if (z==null) z=this.z;
	this.plxfx=fx;
	this.plxfy=fy;
	this.plxx=x;
	this.plxy=y;
	this.plxz=z;
	taccgl.parallaxAdjust();
    }
}
function taccglLightSource () { this.x = -200; this.y=-200; this.z=5000; this.focus=1; return this;}
taccglLightSource.prototype= new taccglLightSourcePrototype();
taccgl.lightSource = function () {return new taccglLightSource();}

function taccglEyePrototype () { 

    this.setDefault = function (x,y,z) {
	this.ox=0; this.oy=500;
	this.setPos(0,0,5000)
    }
    this.intSetPos = function (x,y,z) {
	this.eyeX=x; this.eyeY=y; this.eyeZ=z; 
	if (taccgl.stdEye==this && taccgl.stdsc && taccgl.stdsc.sp && taccgl.stdsc.sp.useuEye==false) {
	    taccgl.createShaders(); taccgl.adjustQuality();
	}
	// if (taccgl.ddmode) { // note that this method is called during initialzation when ddmode is yet not set
	this.ddfx= -(x-this.ox)/z; this.ddfy=-(y-this.oy)/z;
	// }
	return this;
    }
    this.setPos = function (x,y,z){
	this.plxx=this.plxy=this.plxz=this.plxfx=this.plxfy=null;
	this.intSetPos (x,y,z)
	return this;
    }

    this.parallaxAdjust = function () {
	if (this.plxfx || this.plxfy) {
	    this.intSetPos (this.plxx+this.plxfx*taccgl.o_sl, this.plxy+taccgl.o_st*this.plxfy, this.plxz); 	
	}
	return this;
    }

    this.calcPos = function (left,top) {
        return [this.plxx+this.plxfx*left, this.plxy+top*this.plxfy, this.plxz];	
    }

    this.setOrigin = function (x,y) {
	this.ox=x; this.oy=y;
	if (taccgl.ddmode) {
	    this.ddfx=- (this.eyeX-this.ox)/this.eyeZ; this.ddfy=-(this.eyeY-this.oy)/this.eyeZ;
	}
	return this;
    }

    this.parallax = function (fx,fy,x,y,z) {
	if (!taccgl.initialized) taccgl.begin();
	if (x==null) {if (this.plxx || this.plxx==0) x=this.plxx; else x=this.eyeX;}
	if (y==null) {if (this.plxy || this.plxy==0) y=this.plxy; else y=this.eyeY;}
	if (z==null) {if (this.plxz || this.plxz==0) z=this.plxz; else z=this.eyeZ;}
	this.plxfx=fx;
	this.plxfy=fy;
	this.plxx=x;
	this.plxy=y;
	this.plxz=z;
	taccgl.parallaxAdjust();
	return this;
    }

    this.clone = function (){
	return new taccglEye(this);
    }
}
function taccglEye (e) {
    if (e) { 
	this.eyeX=e.eyeX; this.eyeY=e.eyeY; this.eyeZ=e.eyeZ; 
	this.ox=e.ox; this.oy=e.oy; this.oz=e.oy; 
	if (e.plxz) {
	    this.plxfx=e.plxfx;
	    this.plxfy=e.plxfy;
	    this.plxx=e.plxx;
	    this.plxy=e.plxy;
	    this.plxz=e.plxz;
	}
	taccgl.eyePositions.push(this); 
    } else {
	// this.eyeX=this.eyeY=0; this.eyeZ=5000; 
	// this.ox=0; this.oy=500; 
	this.setDefault();
	taccgl.eyePositions.push(this); 
    }
    return this;
}


function taccglTextureAtlasPrototype () { 
    this.init = function () {this.bins=Array(0);this.delno=1;}
    this.addBin = function (id,w,h) {
	this.bins.push ({id:id, w:w, h:h, blocks:Array(0), points:[{x:0,y:0}]});
    }
    this.clear = function () {
	var i;
	for (i=0;i<this.bins.length; i++) { this.bins[i].blocks=Array(0); this.bins[i].points=[{x:0,y:0}];}
	this.delno++;
    }
/*    this.allocInBin = function (id,w,h,bin) {
	var b = this.bins[bin];
	var i = 0;
	var res=null;
	while (i<b.points.length) {
	    var p = b.points[i];
	    if (p.x+w<=b.w && p.y+h<=b.h) {
		var j=0;
		while (j<b.blocks.length) {
		    var a=b.blocks[j];
		    if (  p.x+w>a.x && p.x<a.x+a.w    &&    p.y+h>a.y &&  p.y<a.y+a.h) { break; }
		    j++;
		}
		if (j>=b.blocks.length) {
		    res = {x:p.x, y:p.y, t:b.id};
		    b.blocks.push({ x:p.x, y:p.y, w:w, h:h, id:id});
		    b.points.push({ x:p.x, y:p.y+h});
		    p.x+=w;
		    break;
		}
	    }
	    i++;
	}
	return res;
    }
*/
    this.allocInBin = function (id,w,h,bin) {
	var b = this.bins[bin];
	var i = 0;
	var res=null;
	while (i<b.points.length) {
	    var p = b.points[i];
	    if (p.x+w<=b.w && p.y+h<=b.h) {
		var j=0;
		while (j<b.blocks.length) {
		    var a=b.blocks[j];
		    if (  p.x+w>a.x && p.x<a.x+a.w    &&    p.y+h>a.y &&  p.y<a.y+a.h) { break; }
		    j++;
		}
		if (j>=b.blocks.length) {
		    res = {x:p.x, y:p.y, w:w, h:h, id:id, t:b.id, delno:this.delno}; 
		    b.blocks.push(res);
		    b.points.push({ x:p.x, y:p.y+h});
		    p.x+=w;
		    break;
		}
	    }
	    i++;
	}
	return res;
    }
    this.alloc = function (id,w,h) {
	var i=0;
	while (i<this.bins.length) {
	    var a=this.allocInBin (id,w,h,i);
	    if (a) {return a;}
	    i++;
	}
	return null;
    }
}
function taccglTextureAtlas () { this.init(); return this;}
taccglTextureAtlas.prototype= new taccglTextureAtlasPrototype();
taccgl.textureAtlas = function () {return new taccglTextureAtlas();}


function taccgl_opaqueShadow (t)
{
    var g=taccgl.g; var jaccobj=taccgl, pr=jaccobj.pr;
    g.bindFramebuffer (g.FRAMEBUFFER, jaccobj.shadowfb);
//    g.bindFramebuffer (g.FRAMEBUFFER, null);

    g.viewport (0,0,2048,2048);
    g.disable(g.BLEND); // g.disable(g.SAMPLE_COVERAGE);

    g.clearColor (1.0,1.0, 1.0 ,1.0);
//   g.clearColor (0.0, ldt>1/30 ? 1.0 : 0.0, 0.0 ,0.0);
    g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
   var ii; 
   for (ii=0; ii<jaccobj.draw_shprognumber; ii++) {
       var dff=jaccobj.shprogfromRun[ii], cnt;
       if (ii<jaccobj.draw_shprognumber-1) 
	   cnt=jaccobj.shprogfromRun[ii+1]-dff;
       else
	   cnt= jaccobj.draw_vertexnumber-dff;
       var sc=jaccobj.shprogRun[ii], pp=sc.shadowP; 
       if (pp) {
	   g.useProgram(pp);
	   g.uniform4f(sc.shadowLoc.uTime,t,taccgl.o_st,0,0);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on uniform1f "); }
	   g.uniform4f(sc.shadowLoc.shcvp,jaccobj.shcvpx,jaccobj.shcvpy,2/jaccobj.shcvpw,2/jaccobj.shcvph);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on uniform4f "); }
	   g.uniform1i(sc.shadowLoc.uTexture,0);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli"); }
	   g.uniform1i(sc.shadowLoc.uTexture2,1);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli");}
	   if (sc.shadowPassUniforms) sc.shadowPassUniforms();
	   g.drawArrays (g.TRIANGLES, dff, cnt);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on drawArrays in opaqueShadow"); }
       }
   }
   g.enable(g.BLEND);
   g.bindFramebuffer (g.FRAMEBUFFER, null);
   var pr=jaccobj.pr;
   g.viewport (0,0,g.drawingBufferWidth,g.drawingBufferHeight);
}


var taccgl_breakframe = -100000;

function taccgl_draw3d (curtp)
{

    // We can either use the time passed as parameter or get the current time using the timer.
    // Note that this function is called normally as RAF call back, however, also initially
    // by the start method. In the latter case it does not receive a time parameter.
    //
    // If possible the parameter curtp could be used instead of asking the timer.
    // On Chrome this has the problem, that sometimes time goes backwards, because
    // the time supplied to the RAF call backs is significant earlier.
    // Comment out the following line and the if (!curt...) below to use the time passed as parameter.
    // the additional    condition  curt < jaccobj.draw_startTime   handles the problem
    // of time going backwards, still the jumping time stamps might not look good.
    //  var curt=curtp;
    var curt=null;
//    console.time("draw3d");
    var lF=1;
    var jaccobj=taccgl, g=jaccobj.g, e;


    if (taccgl.drawConsoleTime) console.time ("PreDraw3d");
    if (jaccobj.pendingResizeBody) {jaccobj.resizeBody(); jaccobj.pendingResizeBody=false;} 

/*  commented out smooth scroll experiment
    var b=document.body, de=document.documentElement;
    var st = b.scrollTop;
    if (de.scrollTop) st=de.scrollTop;
    if (window.pageYOffset) st=window.pageYOffset;
    var sl = b.scrollLeft;
    if (de.scrollLeft) sl=de.scrollLeft;
    if (window.pageXOffset) sl=window.pageXOffset;
//    jaccobj.o_sl=sl; jaccobj.o_st=st;
    var delta=5;
//    var delta=Math.abs(st-jaccobj.o_st)/2+1;

    if (taccgl_debug) {
       if   (jaccobj.o_st != st) taccgl.tlog("scroll animation "+st+" "+jaccobj.o_st );
    }  // taccgl_debug_end

    if   (jaccobj.o_sl > sl+delta) jaccobj.o_sl -= delta; else
    if   (jaccobj.o_sl < sl-delta) jaccobj.o_sl += delta; else  jaccobj.o_sl = sl;
    if   (jaccobj.o_st > st+delta) jaccobj.o_st -= delta; else
    if   (jaccobj.o_st < st-delta) jaccobj.o_st += delta; else  jaccobj.o_st = st;
*/
	

    if (window.devicePixelRatio && jaccobj.prevDpr!=window.devicePixelRatio)
	if (taccgl.onDprChange()) return;
    
    if (taccgl_drawerrcheck) {  
      if ((taccgl.glerr=g.getError())!=0){
	  taccgl.glError ("Error "+taccgl.glerr+" on start of draw3d ");  jaccobj.drawImmediateTerm(25); return
      } 
    }

//    if (!curt || curt>1E12 || curt < jaccobj.draw_startTime)  {
	if (window.performance && window.performance.now) 
	    curt =  window.performance.now();
	else
	    curt =  new Date().getTime();
//    }

    if (taccgl_debug) {
	if (taccgl.onDebugDraw)
	    if (!taccgl.doHook(taccgl.onDebugDraw,curt)) return;
    }  // taccgl_debug_end
   

   
/*  experiment 
    var t = jaccobj.currenttime + 1/60; 
    jaccobj.draw_startTime = curt - t * jaccobj.draw_duration;
*/

    var t = (curt - jaccobj.draw_startTime) / jaccobj.draw_duration;

    if (taccgl_debug) {
	var ldt = t-jaccobj.currenttime; 
    }  // taccgl_debug_end
    jaccobj.currenttime=t;



    // t= 0.01666 * Math.floor(taccgl_timestepi);

    var b=false;

    while (t > jaccobj.doat[jaccobj.doatI].attime) {
	b = jaccobj.doat[jaccobj.doatI].doPreDraw(jaccobj.doatI) || b;
	if (jaccobj.doatI>=jaccobj.doat.length) break;
    }
    
    if (b) {
	jaccobj.drawTerminated(); 
	jaccobj.doHook(jaccobj.onTerm);
	return;
    }
    jaccobj.draw_frames++;  
    if ( jaccobj.draw_meaIgnore-->0 &&jaccobj.draw_meaFrames>=0 ) {
	jaccobj.draw_meaAdjust += curt -  jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] - 17;
    }
    jaccobj.draw_meaFrames++;
    jaccobj.meaA [ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt;
    jaccobj.meaAA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt-jaccobj.draw_meaAdjust;
    var et=taccgl.extTimer, gput=null, gpul=1E10;
    if (!taccgl.evaluateGPUTimer()) et=null;
    if (taccgl_use_disjoint_timer_query) { gput = jaccobj.etGPUTime; gpul=jaccobj.etGPUTimeLag;}

    var tmea, frate, rfr, tfr=taccgl_tfr[jaccobj.quality], adfr=60/tfr;
    if ( jaccobj.draw_meaFrames <= 0 ) {
	jaccobj.draw_meaTime=curt; // jaccobj.perfnow(); 
	rfr=30; tmea=0;
    } else {
      tmea = (curt - jaccobj.draw_meaTime -jaccobj.draw_meaAdjust ) / jaccobj.draw_duration;
      var f=240;
      if (jaccobj.draw_meaFrames <= f )
        // frame rate of the complete animation so far, if the runtime so far is smaller than 4 seconds
        rfr = jaccobj.draw_meaFrames/tmea;
      else
        // frame rate of the last 4 seconds
        rfr = (f * 1000 / (jaccobj.meaA[ (jaccobj.draw_meaFrames) % jaccobj.meaAS ] - 
				jaccobj.meaA[ (jaccobj.draw_meaFrames-f) % jaccobj.meaAS ] ));
    }

    // rfr is the real frame rate measured,  frate is rfr adjusted by the target frame rate adjust adfr,
    // if tfr=60 then rfr=frate, if tfr=30 then frate=rfr*2.
    frate = rfr*adfr;

    if (taccgl_debug) {
	if (jaccobj.draw_meaFrames < taccgl_debug_drawloop ||  jaccobj.draw_meaIgnore>=0 || jaccobj.loadTestl>0 || ldt>0.04) {
	    taccgl.tlog ("%cFRAME "+jaccobj.draw_frames+' '+ldt.toFixed(4)+
		     ' t='+t.toFixed(4)+'/curt='+curt.toFixed(1)+'/GPUTime='+jaccobj.etGPUTime+'('+jaccobj.etGPUTimeLag+
                     ')/meaFrames='+jaccobj.draw_meaFrames+
		     (jaccobj.draw_meaIgnore > 0 ? '/meaIgnore='+jaccobj.draw_meaIgnore : '') +
		     '/meaAdjust='+jaccobj.draw_meaAdjust+
		     '/rate=' + rfr.toFixed(4) + '/' + jaccobj.quality, ldt>0.02*adfr ? "color:red" : "" );
	}
      if (taccgl_breakframe ==  jaccobj.draw_meaFrames && jaccobj.draw_frames ==2) {
	  var breakhere = 1; taccgl.drawImmediateTerm(); return;
      }
      if (jaccobj.qualitylock) frate=55;
    }  // taccgl_debug_end

    // during startup working on the second frame
    if  (jaccobj.draw_frames==2) {
	// Frame #1 has been drawn, now we are at frame #2, possibly decide to redo #1
	if (taccgl_debug) {
	    taccgl.clog ("         START "+curt.toFixed(1)+"::-:"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    taccgl.clog ("         Checking for slowStartUp  slowStartupFrames="+jaccobj.slowStartupFrames+" slowStartupTime="+jaccobj.slowStartupTime);
	}  // taccgl_debug_end

        // The if below checks whether to repeat the first frame 
	if ( ( jaccobj.slowStartupFrames<4  ||     // at the very beginning for the first 4 frames or
	       jaccobj.loadTest===false && (!(jaccobj.quality==jaccobj.hardFailQ-1 && t<0.02)) ||
	                                           // it worked well but there are chances to improve quality and no load test yet
	       (jaccobj.loadTest>0) && (frate>50 ||jaccobj.draw_meaFrames<=2 ) )  // or the loadTest is running but was not successful so far
             && jaccobj.slowStartupTime<1000 && gpul>jaccobj.slowStartupFrames-4) {    // unless the whole startup takes too long
	    // if we are at the very beginning and have not done the loadTest yet we go here,
	    // or if we are doing the loadTest right now, and it was not yet successful
	    // unless the startup is really slow and the  maximal slowStartupTime is reached
	    if (jaccobj.loadTest==false) {
		if (jaccobj.slowStartupFrames>2 && t<0.02 && gpul > 10000) {
		// if the last frame was slow we just repeat showing the first frame, until
		// it either gets fast or we reach the maximal slowStartupTime
		// otherwise we come here and perform the loadTest
		    if (jaccobj.quality<4) {
			jaccobj.quality++; jaccobj.adjustQuality(); 
			jaccobj.draw_meaFrames=-2;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
		    } else {
			lF=4; jaccobj.loadTest=6; 
		    }
		}
	    } else {
		lF=4; jaccobj.loadTest--;
	    }
	    jaccobj.slowStartupTime += curt-jaccobj.draw_startTime;
	    jaccobj.slowStartupFrames +=1;
	    jaccobj.draw_startTime= /* jaccobj.draw_meaTime= */ curt; t=0; jaccobj.draw_frames=1; 
	    // jaccobj.draw_meaFrames=0; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; // lets redo the first frame	
            jaccobj.currenttime=0;

	    if (taccgl_debug) {
		taccgl.clog ("         Redo first frame instead of second one, loadTest="+ jaccobj.loadTest+" lf="+lF);
	    }  // taccgl_debug_end
	} else
	    // we either come here if the loadTest was done or if the max slowStartupTime was reached or we have gpu timing info
            if (gpul <=  jaccobj.slowStartupFrames-4) {
              // we have gpu timing info
              var gt=gput, nq;
              if (jaccobj.quality==1) gt*=12; else if (jaccobj.quality==2) gt*=8;  else if (jaccobj.quality==3) gt*=4; else if (jaccobj.quality==4) gt*=2;
	      if (gt<10000) nq=5; else if (gt<20000) nq=4; else if (gt<40000) nq=3; else if (gt<80000) nq=2; else nq=1;
	      if (taccgl_debug) {
	          taccgl.clog("         GPUADJUST  "+" gt="+gt);
	      } // taccgl_debug_end
              jaccobj.quality=nq;  jaccobj.adjustQuality(); 
	      jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; taccgl.resetGPUTimers();
	    } else if (jaccobj.quality==jaccobj.hardFailQ-1 && t<0.02) { 
		// if we are already on the best allowed quality level just go on
	    } else if (jaccobj.loadTest===false && frate<30) {
		// max slowStartupTime was reached, so use Q1
		jaccobj.quality=1; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; taccgl.resetGPUTimers();
                jaccobj.loadTest=0;
	    } else {
		// loadTest was performed
		jaccobj.loadTest=false;
		if  (frate > 54) {
		    // and fast, use Q4
		    jaccobj.quality=5; jaccobj.adjustQuality();
		    jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; taccgl.resetGPUTimers();
		} else { 
		    // loadTest was slow, so stay in the current quality level
		}
	    }
    } else if ( (jaccobj.draw_frames>=2) && (
	(t>0.2*adfr && (jaccobj.draw_meaFrames>10 || tmea>1)) || t<0.02*adfr )  )  {
        // during a running animation reconsider the quality level

	if (frate < taccgl_immediateStop && jaccobj.quality==1) { 
	    jaccobj.webglerror=true; jaccobj.drawImmediateTerm(26); return; 
	}
	if (frate < 25 && jaccobj.quality > 1  && (gpul>jaccobj.draw_meaFrames || gput>12000)) {
	    if (taccgl_debug) {
		taccgl.clog ("SLOWFRAME  "+curt.toFixed(1)+"::m:"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + rfr.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end

	    if (jaccobj.loadTestl>=0) {
		if (taccgl_debug) { 
		    taccgl.clog ("          Aborting Load Test I ");
		} // taccgl_debug_end 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; taccgl.resetGPUTimers();
		jaccobj.loadTestl=-1; 
	    } else 
	    if ( (jaccobj.draw_meaFrames < 5 ||  5*adfr / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.025 ) && 
		 (jaccobj.draw_meaFrames < 2 ||  2*adfr / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.025 ) ) {
		      jaccobj.reduceQuality(); // return;
	    }
	}

	if (frate > 54 && jaccobj.quality < jaccobj.hardFailQ-1 && (jaccobj.epack || curt-jaccobj.draw_lastSwitchTime>2000)
	    && (gpul>jaccobj.draw_meaFrames || gput<7000)) {
            // framereate is good and quality not yet at maximum, so perform load test and improve quality
	    if (taccgl_debug /* && ( frate>54 ||jaccobj.loadTestl>0) not needed any more */ ) {
		taccgl.tlog ("%cFASTFRAME "+jaccobj.draw_frames+' '+ldt.toFixed(4)+
		     ' t='+t.toFixed(4)+'/curt='+curt.toFixed(1)+'/GPUTime='+jaccobj.etGPUTime+'('+jaccobj.etGPUTimeLag+
                     ')/meaFrames='+jaccobj.draw_meaFrames+
		     (jaccobj.draw_meaIgnore > 0 ? '/meaIgnore='+jaccobj.draw_meaIgnore : '') +
		     '/meaAdjust='+jaccobj.draw_meaAdjust+
		     '/rate=' + rfr.toFixed(4) + '/' +  "loadTestl="+ jaccobj.loadTestl + '/' + jaccobj.quality,
                             ldt>0.02*adfr ? "color:red" : "");
	    }  // taccgl_debug_end
	    if (gpul<=jaccobj.draw_meaFrames) { /* we have GPU timing info, so we switch up immediately */
		jaccobj.quality++; jaccobj.adjustQuality(); jaccobj.draw_lastSwitchTime=curt;
		jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;jaccobj.loadTestl=0;
		taccgl.resetGPUTimers();
	    } else if (jaccobj.loadTestl<-60 /* not needed any more && frate>54 */) {
		jaccobj.loadTestl=15;   // if the previous load test is longer than 1 second ago, start a new load test
	    } else {
                // if the load test is running
		if (jaccobj.loadTestl>0 && jaccobj.loadTestl<2) {
                    // and we are at the last frame of the load test
		    if ( (jaccobj.draw_meaFrames < 5 ||  5*adfr / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ]) > 0.054 ) && 
			 (jaccobj.draw_meaFrames < 2 ||  2*adfr / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ]) > 0.054 ) ) {
		        // and within the last 5 and the last 2 frames the rate did not drop below 54
                        // then we improve quality
			jaccobj.quality++; jaccobj.adjustQuality(); jaccobj.draw_lastSwitchTime=curt;
			jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;jaccobj.loadTestl=0;
			taccgl.resetGPUTimers();
		    }
		}
	    }
	}
        // framerate too low, reduce quality
	if (frate < 51 && jaccobj.quality > 2 && jaccobj.epack && jaccobj.draw_meaFrames>20 && (gpul>jaccobj.draw_meaFrames || gput>12000)) {
	    if (taccgl_debug) {
		taccgl.tlog ("%cSLOW2FRAME "+jaccobj.draw_frames+' '+ldt.toFixed(4)+
		     ' t='+t.toFixed(4)+'/curt='+curt.toFixed(1)+'/GPUTime='+jaccobj.etGPUTime+'('+jaccobj.etGPUTimeLag+
                     ')/meaFrames='+jaccobj.draw_meaFrames+
		     (jaccobj.draw_meaIgnore > 0 ? '/meaIgnore='+jaccobj.draw_meaIgnore : '') +
		     '/meaAdjust='+jaccobj.draw_meaAdjust+
		     '/rate=' + rfr.toFixed(4) + '/' +  "loadTestl="+ jaccobj.loadTestl + '/' + jaccobj.quality,
                             ldt>0.02*adfr ? "color:red" : "");
	    }  // taccgl_debug_end
	    if (jaccobj.loadTestl>=0) {
		if (taccgl_debug) { 
		    taccgl.clog ("         Aborting Load Test II ");
		} // taccgl_debug_end
		
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
		jaccobj.loadTestl=-1;  taccgl.resetGPUTimers();
	    } else 
	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
  	          (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust)<0.050*adfr ) && 
		 (jaccobj.draw_meaFrames < 2 ||  2 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust)<0.050*adfr ) &&
		 (jaccobj.draw_meaFrames < 4 ||  2 / 
		  (jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] -
                   jaccobj.meaAA[ (jaccobj.draw_meaFrames-4) % jaccobj.meaAS ])<0.050*adfr ) &&
                 (jaccobj.draw_meaFrames < 6 ||  2 / 
		  (jaccobj.meaAA[ (jaccobj.draw_meaFrames-4) % jaccobj.meaAS ] -
                   jaccobj.meaAA[ (jaccobj.draw_meaFrames-6) % jaccobj.meaAS ])<0.050*adfr ) ) {
		jaccobj.reduceQuality(); // return;
	    }
	}
        if (jaccobj.loadTestl-->0){
          // if this is during load test, either continue or abort the test,
          // otherwise just count the frames until it is time to load test again
          if (frate>52) lF=3; else jaccobj.loadTestl=-1;
        }
    } 

    jaccobj.rAFdeviation += t*60-Math.round(t*60);
    jaccobj.rAFcnt++;
    
    if (taccgl_debug) 
	taccgl_timestep[taccgl_timestepi++] = t; 
    // taccgl_debug_end

//    if  (jaccobj.rAFcnt>20) t-=jaccobj.rAFdeviation/jaccobj.rAFcnt;
//    t = Math.round(t * 60)/60;

//  if (!t>taccgl.previoust) taccgl.tlog("backstep ! "+t);
//    taccgl.previoust = t;

    if (taccgl.drawConsoleTime) console.timeEnd ("PreDraw3d");

    if (taccgl.drawConsoleTimeStamp) console.timeStamp("Stamp "+jaccobj.quality+" "+lF);


    if (taccgl.drawConsoleTime) console.time("Draw "+jaccobj.quality+" "+lF);
//    var iii, iiii=0, www;
//    if (jaccobj.draw_meaFrames % 3==0) www=4000000; else www=3700000;
//    for (iii=0; iii<www; iii++) iiii++;

    if (et) {
//	taccgl.GPUTimeStampBegin = taccgl.g.getParameter(et.TIMESTAMP_EXT);
//	et.queryCounterEXT(taccgl.eTimeStampBegin, et.TIMESTAMP_EXT);
//	if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on beginQueryEXT");   }
	et.beginQueryEXT(et.TIME_ELAPSED_EXT, taccgl.eTimerAll);
	if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on beginQueryEXT");   }
    }

    var jj;
    if (jaccobj.shadowEna && (jaccobj.quality>4 || ((lF>1)&&(jaccobj.quality==4))) ) {
	for (jj=0; jj<lF; jj++) 
	    taccgl_opaqueShadow(t);
    }
    if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) 	taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer draw3D before bindFramebuffer "); }
    g.bindFramebuffer (g.FRAMEBUFFER, null);
    if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) 	taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer draw3D bindFramebuffer ");     }

//    if ( taccgl_timestepi % 2 != 0) return ;

    // Most devices do not need an explicit clear but FF on Android does
    // g.flush();    g.finish();
    g.clearColor (0.0,0.0, 0.0 ,0.0);
//   g.clearColor (0.0, ldt>1/30 ? 1.0 : 0.0, 0.0 ,0.0);
//    g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
    if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) 	taccgl.glError ("Error "+taccgl.glerr+" on vertexAttribPointer draw3D clear ");     }

//   var x = g.getProgramParameter(p, g.LINK_STATUS);
//   x = g.getProgramParameter(p, g.VALIDATE_STATUS);
//   x = g.getProgramParameter(p, g.ATTACHED_SHADERS);
//   x = g.getProgramParameter(p, g.ACTIVE_ATTRIBUTES);
//   x = g.getProgramParameter(p, g.ACTIVE_UNIFORMS);

//    g.enable(g.DEPTH_TEST);

   jaccobj. doHook (taccgl.onBeforeDraw3D, t);

     
    var ii;
    for (jj=0; jj<lF*1; jj++) {
     if (jj>0)	    g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
     for (ii=0; ii<jaccobj.draw_shprognumber; ii++) {
       var dff=jaccobj.shprogfromRun[ii], cnt;
       if (ii<jaccobj.draw_shprognumber-1) 
	   cnt=jaccobj.shprogfromRun[ii+1]-dff;
       else
	   cnt= jaccobj.draw_vertexnumber-dff;
       var sc=jaccobj.shprog[ii], pp=sc.qp[jaccobj.quality]; g.useProgram(pp);
       var loc=sc.qLoc[jaccobj.quality];
       g.uniform4f(loc.uTime,t,taccgl.o_st,0,0);
       if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on uniform1f "); }
       g.uniform4f(loc.cvp,jaccobj.cvpx,jaccobj.cvpy,2/jaccobj.cvpw,2/jaccobj.cvph);
       if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on uniform4f "); }
       g.uniform1i(loc.uTexture,0);
       if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli"); }
       g.uniform1i(loc.uTexture2,1);
       if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli");}
       if (sc.passUniforms) sc.passUniforms(loc);
       if (jaccobj.shadowEna) {
	   g.uniform1i(loc.uShadowMap,2);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli");}
//	   g.uniform4f(loc.shcvp,jaccobj.shcvpx,jaccobj.shcvpy,2/jaccobj.shcvpw,2/jaccobj.shcvph);
//	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifoml4f shcvp");}
	   g.uniform4f(loc.fshcvp,jaccobj.shcvpx,jaccobj.shcvpy,2/jaccobj.shcvpw,2/jaccobj.shcvph);
	   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifoml4f fshcvp");}
       }
//	 if (et) {
//	     et.beginQueryEXT(et.TIME_ELAPSED_EXT, taccgl.eTimerAll);
//	     if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on beginQueryEXT");   }
//	 }
	 g.drawArrays (g.TRIANGLES, dff, cnt);
//      if (et) {
//	et.endQueryEXT(et.TIME_ELAPSED_EXT, taccgl.eTimerAll);
//        if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on endQueryEXT");   }
//      }
//       for unkonwn reasons the error check below does not run in chrome
//       if (taccgl_looperrcheck) {      if ((taccgl.glerr=g.getError())!=0) 
//	   if (taccgl.glerr!=1285)
//	       taccgl.glError ("Error "+taccgl.glerr+" on drawArrays");
//   
     }
	if (lF>1) {
	    if (taccgl_looperrcheck) { if ((taccgl.glerr=g.getError())!=0) { jaccobj.webglerror=true; jaccobj.drawImmediateTerm(27); } }
	    // the less function can be used for timing extperiments, since it avoids drawing pixels a seond time
	    // it however does not work with well with taccgl scenes if an element is drawn on a shadowonly elemnent with identical z
	    // if (jj==lF-1) g.depthFunc (g.LEQUAL); else g.depthFunc (g.LESS); 
        }
    } 
//   if (jaccobj.shprogfrom[jaccobj.draw_shprognumber-1] >= jaccobj.draw_vertexnumber) 
//       alert(55);
//   if ( jaccobj.draw_vertexnumber > 240) 
//       alert (jaccobj.draw_vertexnumber + ","+jaccobj.vertI);
//   g.drawArrays (g.TRIANGLES, jaccobj.shprogfrom[jaccobj.draw_shprognumber-1], jaccobj.draw_vertexnumber-1);
/*   var df=  jaccobj.shprogfrom[jaccobj.draw_shprognumber-1]; 
   g.useProgram(jaccobj.shprog[jaccobj.draw_shprognumber-1]);
   g.uniform1f(jaccobj.draw_locTime,t);
   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on uniform1f "); }
   g.uniform1i(jaccobj.draw_locuTexture,0);
   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli"); }
   g.uniform1i(jaccobj.draw_locuTexture2,1);
   if (taccgl_looperrcheck) {   if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on unifomli");}
   g.drawArrays (g.TRIANGLES, df, jaccobj.draw_vertexnumber-df);
*/
    if (taccgl_debug) {
        if (taccgl_errcheck && (e=g.getError())!=0) {
	   jaccobj.webglerror=true; jaccobj.dddmode=false;
   	   if (taccgl_debug) {
	      alert ("Error "+e+" on drawArrays");
	   }   // txaccgl_debug_end
	   jaccobj.drawImmediateTerm(28); return;
        }
	if (taccgl_timestepi%600==0 && false){
	        var s=""; var i;
	        taccgl.clog ("          rAFDeviation "+jaccobj.rAFdeviation + " " +
			     jaccobj.rAFcnt  + " " + jaccobj.rAFdeviation / jaccobj.rAFcnt);
	        for (i=-600;i<0;i++) {
//		    s+=Math.round(60*taccgl_timestep[taccgl_timestepi+i])+",";
		    if (i<-1) {
			var id=-Math.round(60*taccgl_timestep[taccgl_timestepi+i])+
			    Math.round(60*taccgl_timestep[taccgl_timestepi+i+1]);
			if (id==1) s+=",";
			if (id==0) {
			    s+=60*taccgl_timestep[taccgl_timestepi+i];
			    s+="=";
			    s+=60*taccgl_timestep[taccgl_timestepi+i+1];
			    s+="\n";
			}
			if (id>1)  {
			    s+=60*taccgl_timestep[taccgl_timestepi+i];
			    s+="("+id+")";
			    s+=60*taccgl_timestep[taccgl_timestepi+i+1];
			    s+="\n";
			}
		    } else {
			s+=60*taccgl_timestep[taccgl_timestepi+i];
		    }
		}
		taccgl.clog (s);
        }
    }  // taccgl_debug_end



    if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0)  if (taccgl.glerr!=1285) taccgl.glError ("Error "+taccgl.glerr+" on drawArrays");   }
//    g.flush();    g.finish();

    if (et) {
//	et.queryCounterEXT(taccgl.eTimeStampEnd, et.TIMESTAMP_EXT);
//	if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on queryCounterEXT");   }
	et.endQueryEXT(et.TIME_ELAPSED_EXT, taccgl.eTimerAll);
        if (taccgl_looperrcheck) {  if ((taccgl.glerr=g.getError())!=0) taccgl.glError ("Error "+taccgl.glerr+" on endQueryEXT");   }
    }


    // var vel = document.getElementById('taccglVertexNumber');
    // if (vel) vel.innerHTML = jaccobj.draw_vertexnumber + '/' + jaccobj.draw_frames;
    // jaccobj.timeofdraw = new Date().getTime() - curt;
    //    console.timeEnd("draw3d");
    // taccgl.tlog ("::--");

    if (jaccobj.onAfterDraw) jaccobj.doHook(jaccobj.onAfterDraw);
    if (et) {
//	if (taccgl.evaluateTimerTimer) clearTimeout(taccgl.evaluateTimerTimer); 
//	taccgl.evaluateTimerTimer = setTimeout(taccgl.evaluateGPUTimer,2);
	taccgl.extTimerRunning = true;
	taccgl.loadFactor = lF;
	taccgl.extTimerQuality = taccgl.quality;
    }
    if (taccgl.drawConsoleTime) console.timeEnd("Draw "+jaccobj.quality+" "+lF);
    if (taccgl.drawConsoleTime) console.time("Draw glError");
    // g.finish();
    // if (taccgl.drawerrcheck) {  if ((taccgl.glerr=g.getError())!=0){
    //   taccgl.glError ("Error "+taccgl.glerr+" on start of draw3d ");  jaccobj.drawImmediateTerm(); return} }
    if (taccgl.drawConsoleTime) console.timeEnd("Draw glError");
    if (window.taccgl_requestAnimationFrame) {
//	if (jaccobj.draw_frames<10) {
//	    setTimeout(taccgl_draw3d,0);  jaccobj.reqAnimFrameId=null;
//	} else 
	    jaccobj.reqAnimFrameId= taccgl_requestAnimationFrame (taccgl_draw3d); 
    } 
}

function taccgl_draw2d (curtp)
{
    var jaccobj=taccgl, g=jaccobj.g, lF=1, pr=jaccobj.pr, tpr=jaccobj.tpr;
    if (!jaccobj.draw_running) return;

    // We can either use the time passed as parameter or get the current time using the timer.
    // Note that this function is called normally as RAF call back, however, also initially
    // by the start method. In the latter case it does not receive a time parameter.
    //
    // If possible the parameter curtp could be used instead of asking the timer.
    // On Chrome this has the problem, that sometimes time goes backwards, because
    // the time supplied to the RAF call backs is significant earlier.
    // Comment out the following line and the if (!curt...) below to use the time passed as parameter.
    // the additional    condition  curt < jaccobj.draw_startTime   handles the problem
    // of time going backwards, still the jumping time stamps might not look good.
    //  var curt=curtp;
    var curt=null;
    
    // if (!curt || curt>1E12 || curt < jaccobj.draw_startTime)  {
	if (window.performance && window.performance.now) 
	    curt =  window.performance.now();
	else
	    curt =  new Date().getTime();
    // }

    if (taccgl_debug) {
	if (taccgl.onDebugDraw)
	    if (!taccgl.doHook(taccgl.onDebugDraw,curt)) return;
    }  // taccgl_debug_end

    
    var uTime = (curt - jaccobj.draw_startTime) / jaccobj.draw_duration;

    if (jaccobj.quality<=2) pr*=0.5;
    if (taccgl_debug) {
	var ldt = uTime-jaccobj.currenttime; 
    }  // taccgl_debug_end


    // Debug code for diagnosing the problem of negative uTime, which occurs if curtp is much earlier than the timer.
    // taccgl.tlog ("uTime="+uTime+" curt="+curt+" curtp="+curtp+" startTime="+jaccobj.draw_startTime+" ldt= "+ldt);
    // 
    // if (uTime < 0)
    // 	var stoputime=1;
    //    alert("draw2d " +uTime);

    jaccobj.currenttime=uTime;
    if (taccgl_debug) 
	taccgl_timestep[taccgl_timestepi++] = uTime;  
    // taccgl_debug_end
    var b=false, i, a, t, rt, x,y,z;
    var tcan = document.getElementById ('taccgl_textureCanvas');
    var tcan2 =	document.getElementById ('taccgl_textureCanvas2');


    while (uTime > jaccobj.doat[jaccobj.doatI].attime) {
	b = jaccobj.doat[jaccobj.doatI].doPreDraw(jaccobj.doatI) || b;
	if (jaccobj.doatI>=jaccobj.doat.length) break;
    }
    
    if (b) {
	jaccobj.drawTerminatedDD(); 
	jaccobj.doHook(jaccobj.onTerm);
	return; 
    }
    jaccobj.draw_frames++; 
    if ( jaccobj.draw_meaIgnore-->0 &&jaccobj.draw_meaFrames>=0 ) {
	jaccobj.draw_meaAdjust += curt -  jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ];
    }
    jaccobj.draw_meaFrames++;
    jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt;
    jaccobj.meaAA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt-jaccobj.draw_meaAdjust;
    var tmea, frate;
    if ( jaccobj.draw_meaFrames <= 0 ) {
	jaccobj.draw_meaTime=curt; // jaccobj.perfnow(); 
	frate=30; tmea=0;
    } else {
	tmea = (curt - jaccobj.draw_meaTime -jaccobj.draw_meaAdjust ) / jaccobj.draw_duration; frate = jaccobj.draw_meaFrames/tmea;
    }

    if (taccgl_debug) {
	if (jaccobj.draw_meaFrames < taccgl_debug_drawloop ||  jaccobj.draw_meaIgnore>=0) {
	    taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /uTime= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+
		     '/meaIgnore='+jaccobj.draw_meaIgnore+
		     '/meaAdjust='+jaccobj.draw_meaAdjust+
		     '/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	}
    }  // taccgl_debug_end


/*  old draw2d quality code 
    if  (jaccobj.draw_frames==2) {
        // taccgl.clog('at 2nd frame');
	// Frame #1 has been drawn, now we do #2
	if (uTime>0.02 && jaccobj.slowStartupTime<1) { // but the startup was slow ...
            // taccgl.clog('repeat');
	    jaccobj.slowStartupTime += curt-jaccobj.draw_startTime;
	    jaccobj.draw_startTime=curt; uTime=0; jaccobj.draw_frames=1;  // lets redo the first frame	
	}
    } 
    if ( uTime>0.1 ) {
	var frate = jaccobj.draw_frames / uTime;
	if (frate < taccgl_immediateStop) { 
	    jaccobj.drawImmediateTermDD(); return; 
	}
	if (frate < 20 && jaccobj.quality > 1) {
	    jaccobj.quality--; jaccobj.adjustQuality(); 
	}
	if (frate > 50 && jaccobj.quality < 3 && jaccobj.epack) {
	    jaccobj.quality++; jaccobj.adjustQuality(); 
	}
    }
*/
    if  (jaccobj.draw_frames==2) {
	// Frame #1 has been drawn, now we are at frame #2, possibly decide to redo #1
	if (taccgl_debug) {
	    taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    taccgl.clog ("Checking for slowStartUp  slowStartupFrames="+jaccobj.slowStartupFrames+" slowStartupTime="+jaccobj.slowStartupTime);
	}  // taccgl_debug_end
	if ( ( jaccobj.loadTest===false && (!(jaccobj.quality==5 && uTime<0.02))
	       ||jaccobj.slowStartupFrames<4 || (jaccobj.loadTest>0&&uTime>0.02)) && jaccobj.slowStartupTime<3000) { 
	    // if we are at the very beginning and have not done the loadTest yet we go here,
	    // or if we are doing the loadTest right now, and it was not yet successful
	    // unless the startup is really slow and the  maximal slowStartupTime is reached
	    if (jaccobj.loadTest==false) {
		if (jaccobj.slowStartupFrames>2 && uTime<0.02) {
		// if the last frame was slow we just repeat showing the first frame, until
		// it either gets fast or we reach the maximal slowStartupTime
		// otherwise we come here and perform the loadTest
		    lF=8; jaccobj.loadTest=6;
		}
	    } else {
		lF=8; jaccobj.loadTest--;
	    }
	    jaccobj.slowStartupTime += curt-jaccobj.draw_startTime;
	    jaccobj.slowStartupFrames +=1;
	    jaccobj.draw_startTime=jaccobj.draw_meaTime=curt; uTime=0; jaccobj.draw_frames=1; 
	    jaccobj.draw_meaFrames=0; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; // lets redo the first frame	
	    if (taccgl_debug) {
		taccgl.clog ("Redo first frame instead of second one, loadTest="+ jaccobj.loadTest);
	    }  // taccgl_debug_end
	} else 
	    // we either come here if the loadTest was done or if the max slowStartupTime was reached
	    if (jaccobj.quality==5 && uTime<0.02) { 
		// if we are already on quality level 3 just go on
	    } else if (jaccobj.loadTest===false) {
		// max slowStartupTime was reached, so use Q1
		jaccobj.quality=1; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
                jaccobj.loadTest=0;
	    } else {
		// loadTest was performed
		jaccobj.loadTest=false;
		if  (uTime<0.02) {
		    // and fast, use Q3
		    jaccobj.quality++; jaccobj.adjustQuality();
		    jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
		} else { 
		    // loadTest was slow, so stay in Q2
		}
	    }
    } else if ( (jaccobj.draw_frames>=2) && ((uTime>0.2 && (jaccobj.draw_meaFrames>10 || tmea>1)) || uTime<0.02 || jaccobj.draw_frames==2) ) {
	if (frate < taccgl_immediateStop && jaccobj.quality==1) { 
	    jaccobj.webglerror=true; jaccobj.drawImmediateTermDD(29); return; 
	}
	if (frate < 20 && jaccobj.quality > 1) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end

	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.020 ) && 
		 (jaccobj.draw_meaFrames < 2 ||  2 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.020 ) ) {

		if (jaccobj.draw_meaFrames<60) {
		    // apparently this quality failed
		    if (jaccobj.quality<jaccobj.softFailQ) {jaccobj.softFailQ=jaccobj.quality; jaccobj.softFailCnt=0;}
		    jaccobj.softFailCnt++;
		    if ( jaccobj.softFailCnt > 1 )  jaccobj.hardFailQ= jaccobj.softFailQ;
		}
		jaccobj.quality--; jaccobj.draw_lastSwitchTime=curt; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
	    }
	}
	if (frate > 50 && jaccobj.quality < jaccobj.hardFailQ-1 &&  (jaccobj.epack || curt-jaccobj.draw_lastSwitchTime>2000) ) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /uTime= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+ '/rate=' + frate.toFixed(4) + '/' + jaccobj.quality + 
			     " loadTestl="+ jaccobj.loadTestl);
	    }  // taccgl_debug_end
	    if (jaccobj.loadTestl<-60) {
		jaccobj.loadTestl=6;
	    } else {
		if (jaccobj.loadTestl>=0 && jaccobj.loadTestl<2) {
		    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ]) > 0.050 ) && 
			 (jaccobj.draw_meaFrames < 2 ||  2 / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ]) > 0.050 ) ) {
		    
			jaccobj.quality++; jaccobj.adjustQuality();
			jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;jaccobj.loadTestl=0;
		    }
		}
	    }
	}
        if (jaccobj.loadTestl-->0){ lF=8; }
	if (frate < 30 && jaccobj.quality > 2 &&  (jaccobj.epack || curt-jaccobj.draw_lastSwitchTime>2000) && jaccobj.draw_meaFrames>60) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /uTime= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end
	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.030 ) && 
		     (jaccobj.draw_meaFrames < 2 ||  2 / 
		      (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.030 ) ) {
		
		if (jaccobj.draw_meaFrames<60) {
		    // apparently this quality failed
		    if (jaccobj.quality<jaccobj.softFailQ) {jaccobj.softFailQ=jaccobj.quality; jaccobj.softFailCnt=0;}
		    jaccobj.softFailCnt++;
		    if ( jaccobj.softFailCnt > 1 )  jaccobj.hardFailQ= jaccobj.softFailQ;
		}
		jaccobj.quality--; jaccobj.draw_lastSwitchTime=curt; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
	    }
	}
    } 




//    g.fillStyle = "rgba(0,0,0,0)";
//    g.fillRect (0,0, jaccobj.cv.width, jaccobj.cv.height);
    for (var jj=0; jj<lF; jj++){

    g.clearRect (0,0, jaccobj.cv.width, jaccobj.cv.height);

    i=0; 
    while (i<jaccobj.AAstartedLength) {
	a = jaccobj.AA[i];
	var flags = a.flags;
	var ttt=uTime;
	if (a.flags>65535)
	    ttt=taccgl.o_st;
	t = rt = (ttt - a.basetime) / a.vduration;
	if (t<0) { t=0; if ((flags & 1) == 0) {i++; continue;} }
	if (t>1) {
	    t=1; 
	    if ((flags & 2) == 0) {
		i++; continue;
	    } 
	}
	var tt=1-t;

        // if (flags&128){
	//    var breakhere=45;
	// }

	var eye= a.veye?a.veye:jaccobj.stdEye; // use the this.veye if available or stdEye otherwise
	if ((!a.rotation) && !a.face && a.wy0==0 && a.wz0==0 && a.hx0==0 && a.hz0==0 && a.wy1==0 && a.wz1==0 && a.hx1==0 && a.hz1==0) {
	    var wtex=a.wx0*tt+a.wx1*t, htex=a.hy0*tt+a.hy1*t;

	    x= a.x0*tt+a.x1*t-0.5*t*tt*a.ax;
	    y= a.y0*tt+a.y1*t-0.5*t*tt*a.ay;
	    z= a.z0*tt+a.z1*t-0.5*t*tt*a.az;

	    x=x+eye.ddfx*z;
	    y=y+eye.ddfy*z;

	    if (wtex>0 && htex>0)
		if (flags&128) {
		    g.globalAlpha=1.0;
		    g.clearRect ( (x-jaccobj.canvasX)*pr, (y-jaccobj.canvasY)*pr, wtex*pr, htex*pr );
		} else if (a.docolor) {
		    if ((tt>0) && a.ddcolor0) {
			g.fillStyle=a.ddcolor0;
			g.globalAlpha=1;
			g.fillRect ((x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    }
		    if ((t>0) && a.ddcolor1) {
			g.fillStyle=a.ddcolor1;
			g.globalAlpha=t;
			g.fillRect ((x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    }
		    
		    var alpha0 = (1-t)*a.mix0 + t*a.mix1;
		    if (alpha0>0.0) {
			g.globalAlpha = alpha0;
			g.drawImage (tcan, 
				     (a.s0*tt+a.s1*t)*tpr, (a.t0*tt+a.t1*t)*tpr,
				     (a.ws0*tt+a.ws1*t)*tpr, (a.ht0*tt+a.ht1*t)*tpr,
				     (x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    } 
		    var alpha1 = (1-t)*a.mixs0 + t*a.mixs1;
		    if (alpha1>0.0) {
			g.globalAlpha = alpha1;
			g.drawImage (tcan2, 
				     (a.s0*tt+a.s1*t)*tpr, (a.t0*tt+a.t1*t)*tpr,
				     (a.ws0*tt+a.ws1*t)*tpr, (a.ht0*tt+a.ht1*t)*tpr,
				     (x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    } 
		}	else  {
		    g.globalAlpha=1.0;
		    g.drawImage (tcan,
				 (a.s0*tt+a.s1*t)*tpr, (a.t0*tt+a.t1*t)*tpr,
				 (a.ws0*tt+a.ws1*t)*tpr, (a.ht0*tt+a.ht1*t)*tpr,
				 (x-jaccobj.canvasX)*pr, (y-jaccobj.canvasY)*pr, wtex*pr, htex*pr );
		}
	    // Insert Debugging info into the 3d Canvas
	    // g.font = '24px sans-serif';
	    // g.fillStyle = 'red';
	    // g.fillText("TEST "+i, (x-jaccobj.canvasX)*pr, (y-jaccobj.canvasY)*pr);
	} else {
	    g.save();
	    // g.translate (x,y);

	    var hx= a.hx0*tt+a.hx1*t,
	        hy= a.hy0*tt+a.hy1*t,
	        hz= a.hz0*tt+a.hz1*t,
	        wx= a.wx0*tt+a.wx1*t,
	        wy= a.wy0*tt+a.wy1*t,
	        wz= a.wz0*tt+a.wz1*t,
	        dx= a.dx0*tt+a.dx1*t,
	        dy= a.dy0*tt+a.dy1*t,
	        dz= a.dz0*tt+a.dz1*t;

	    if (a.rotation) {
		var o = a.rotfrom*tt + a.rotto*t;

		/*
		var rx, ry, rz;
		a.calcRotation (o,x,y,z); rx=a.resx; ry=a.resy; rz=a.resz;
		a.calcRotation (o,x+hx,y+hy,z+hz); hx=a.resx-rx; hy=a.resy-ry; hz=a.resz-rz;
		a.calcRotation (o,x+wx,y+wy,z+wz); wx=a.resx-rx; wy=a.resy-ry; wz=a.resz-rz;
		*/

		var rx, ry, rz, nx, ny, nz;
		a.calcRotation (o,a.x1,a.y1,a.z1); rx=a.resx; ry=a.resy; rz=a.resz;
		nx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx;
		ny= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry;
		nz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz;

		a.calcRotation (o,a.x1+a.hx1,a.y1+a.hy1,a.z1+a.hz1); rx=a.resx; ry=a.resy; rz=a.resz;
		hx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx -nx;
		hy= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry -ny;
		hz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz -nz;

		a.calcRotation (o,a.x1+a.wx1,a.y1+a.wy1,a.z1+a.wz1); rx=a.resx; ry=a.resy; rz=a.resz;
		wx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx -nx;
		wy= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry -ny;
		wz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz -nz;

		a.calcRotation (o,a.x1+a.dx1,a.y1+a.dy1,a.z1+a.dz1); rx=a.resx; ry=a.resy; rz=a.resz;
		dx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx -nx;
		dy= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry -ny;
		dz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz -nz;

		x=nx; y=ny; z=nz;
	    } else {
		x= a.x0*tt+a.x1*t-0.5*t*tt*a.ax;
		y= a.y0*tt+a.y1*t-0.5*t*tt*a.ay;
		z= a.z0*tt+a.z1*t-0.5*t*tt*a.az;
	    }

	    x=x+eye.ddfx*z;
	    y=y+eye.ddfy*z;

	    hx=hx+eye.ddfx*hz;
	    hy=hy+eye.ddfy*hz;
	    wx=wx+eye.ddfx*wz;
	    wy=wy+eye.ddfy*wz;
	    dx=dx+eye.ddfx*dz;
	    dy=dy+eye.ddfy*dz;

  	    g.setTransform (wx/4096*pr, wy/4096*pr,hx/4096*pr, hy/4096*pr, (x-jaccobj.canvasX)*pr, (y-jaccobj.canvasY)*pr);

	    if (!a.face) {
  	      if (a.docolor) {
		if ((tt>0) && a.ddcolor0) {
		    g.fillStyle=a.ddcolor0;
		    g.globalAlpha=1;
		    g.fillRect (0,0,4096,4096);
		}
		if ((t>0) && a.ddcolor1) {
		    g.fillStyle=a.ddcolor1;
		    g.globalAlpha=t;
		    g.fillRect (0,0,4096,4096);
		}
		    
		alpha0 = (1-t)*a.mix0 + t*a.mix1;
		if (alpha0>0.0) {
		    g.globalAlpha = alpha0;
		    g.drawImage (tcan, 
				 (a.s0*tt+a.s1*t)*tpr, (a.t0*tt+a.t1*t)*tpr,
				 (a.ws0*tt+a.ws1*t)*tpr, (a.ht0*tt+a.ht1*t)*tpr,
				 0, 0, 4096, 4096 );
		} 
		alpha1 = (1-t)*a.mixs0 + t*a.mixs1;
		if (alpha1>0.0) {
		    g.globalAlpha = alpha1;
		    g.drawImage (tcan2, 
				 (a.s0*tt+a.s1*t)*tpr, (a.t0*tt+a.t1*t)*tpr,
				 (a.ws0*tt+a.ws1*t)*tpr, (a.ht0*tt+a.ht1*t)*tpr,
				 0, 0, 4096, 4096 );
		} 

	      }	else  {
		  g.globalAlpha=1;
		  g.drawImage (tcan, 
			       (a.s0*tt+a.s1*t)*tpr, (a.t0*tt+a.t1*t)*tpr,
			       (a.ws0*tt+a.ws1*t)*tpr, (a.ht0*tt+a.ht1*t)*tpr,
			       0, 0, 4096, 4096 );
	      }
	    } else {
		var j, f,
		    da = Array(a.face.length),
		    sa = Array(a.face.length);
		for (j=0; j<a.face.length; j++){
		    f = a.face[j];
		    var p1z = z,
		        p2z = z + wz*f.xtr + hz*f.ytr + dz*f.ztr,
		        p3z = z + wz*f.xbl + hz*f.ybl + dz*f.zbl,
		        zest =( p1z+p2z+p3z ) / 3;
		    da [j] = -zest; sa [j] = f;
		}
		var stable = false;
		while (!stable) {
		    stable=true;
		    for (j=1; j<sa.length; j++){
			if (da[j-1]<da[j]) {
			    var swap;
			    swap=da[j]; da[j]=da[j-1]; da[j-1]=swap;
			    swap=sa[j]; sa[j]=sa[j-1]; sa[j-1]=swap; stable = false;
			}
		    }
		}
		for (j=0; j<a.face.length; j++){
		    f=sa[j];
		    g.setTransform ((wx/4096*(f.xtr-f.xtl)+hx/4096*(f.ytr-f.ytl)+dx/4096*(f.ztr-f.ztl))*pr, 
				    (wy/4096*(f.xtr-f.xtl)+hy/4096*(f.ytr-f.ytl)+dy/4096*(f.ztr-f.ztl))*pr, 
                                    (wx/4096*(f.xbl-f.xtl)+hx/4096*(f.ybl-f.ytl)+dx/4096*(f.zbl-f.ztl))*pr, 
				    (wy/4096*(f.xbl-f.xtl)+hy/4096*(f.ybl-f.ytl)+dy/4096*(f.zbl-f.ztl))*pr,
				    (x+wx*f.xtl+hx*f.ytl+dx*f.ztl-jaccobj.canvasX)*pr,
				    (y+wy*f.xtl+hy*f.ytl+dy*f.ztl-jaccobj.canvasY)*pr);
		    if (f.docolor) {
			if ((tt>0) && f.ddcolor0) {
			    g.fillStyle=f.ddcolor0;
			    g.globalAlpha=1;
			    g.fillRect (0,0,4096,4096);
			}
			if ((t>0) && f.ddcolor1) {
			    g.fillStyle=f.ddcolor1;
			    g.globalAlpha=t;
			    g.fillRect (0,0,4096,4096);
			}
			
			alpha0 = (1-t)*f.mix0 + t*f.mix1;
			if (alpha0>0.0) {
			    g.globalAlpha = alpha0;
			    g.drawImage (tcan, 
					 tpr*(f.s0*tt+f.s1*t), tpr*(f.t0*tt+f.t1*t),
					 tpr*(f.ws0*tt+f.ws1*t), tpr*(f.ht0*tt+f.ht1*t),
					 0, 0, 4096, 4096 );
			} 
			alpha1 = (1-t)*f.mixs0 + t*f.mixs1;
			if (alpha1>0.0) {
			    g.globalAlpha = alpha1;
			    g.drawImage (tcan2, 
					 tpr*(f.s0*tt+f.s1*t), tpr*(f.t0*tt+f.t1*t),
					 tpr*(f.ws0*tt+f.ws1*t), tpr*(f.ht0*tt+f.ht1*t),
					 0, 0, 4096, 4096 );
			} 
			
		    }	else  {
			g.globalAlpha=1;
			g.drawImage (tcan, 
				     tpr*(f.s0*tt+f.s1*t), tpr*(f.t0*tt+f.t1*t),
				     tpr*(f.ws0*tt+f.ws1*t), tpr*(f.ht0*tt+f.ht1*t),
				     0, 0, 4096, 4096 );
		    }
		}
	    }
		
	    g.restore();

	}
	i++;
    }
    }

    if (window.taccgl_requestAnimationFrame) {
	jaccobj.reqAnimFrameId=taccgl_requestAnimationFrame (taccgl_draw2d); 
    } 

//   var uTimeEnd = (curt - jaccobj.draw_startTime) / jaccobj.draw_duration;
//   alert(uTimeEnd - uTime);
//   if (uTimeEnd - uTime > 1.0) {
//	jaccobj.drawImmediateTermDD()
//   }

 //   var vel = document.getElementById('taccglVertexNumber');
 //   if (vel) vel.innerHTML = jaccobj.draw_vertexnumber + '/' + jaccobj.draw_frames;
}

// OBJ File taccgl Module
function taccglObjFile () {
    this.onload = this.onreadystatechange=null; this.vready="init"; this.verror=false;
    this.loadmtl = true;
    this.read = function (url, async, onload){
        if (onload) this.onload=onload;
	this.faces = Array(0);
	if (!taccgl.dddmode) {
	    this.vready=this.verror="ddmode"; 
	    this.mtl = new taccglMtlFile (); this.mtl.vready=this.mtl.verror="ddmode"; 
	    var t=this;
            setTimeout (function () {
                taccgl.doHook(t.onload,t);
	    },1);
	    return this; 
	}
	if (!async) async=false;
	if (window.taccgl_nocache) { 	 
	    var curt =  new Date().getTime();
	    url += "?t="+curt
	}
	this.url = url;
	this.req=null;
	if (window.taccgl_activeX!=false  && !url.match(/^http:/)) 
	    if ("ActiveXObject" in window) this.req = new ActiveXObject("MSXML2.XMLHTTP.6.0");
	if (!this.req) this.req = new XMLHttpRequest();
	this.req.open ("GET",url,async); this.vready="loading";
	if (async) {
	    var objfile = this;
	    this.req.onreadystatechange = function () {
		objfile.readyStateChange();
	    }
	}
	this.req.send();
	if (!async) {
	    this.processRequest(this.req);
	    if (this.vready=="ready" && this.loadmtl) {
		this.mtl = new taccglMtlFile ();
		this.mtl.read(this.mtlurl(),async);
	    }
	}
	return this;
    }
    this.ready  = function () {return this.vready;}
    this.error  = function () {return this.verror;}
    this.mtlurl = function() {
	if (/\//.test(this.url)) return (this.url.replace (/^(.*)\/([^\/]+)$/,"$1/"+this.mtllib));
	else return this.mtllib;
    }
    this.readyStateChange = function (){
	// note this becomes not a method of the taccglObjFile but of the reqest
	taccgl.doHook(this.onreadystatechange,this);
	if (this.req.readyState==4) {
	    this.processRequest(this.req);
	    if (this.vready=="ready" && this.loadmtl) {
		this.mtl = new taccglMtlFile ();
		this.mtl.obj=this;
		this.mtl.read(this.mtlurl(),true);
		this.vready="loading";
	    } else {
		taccgl.doHook(this.onload,this);
	    }
//	    alert ("request finished");
	}
    }
    this.initvb = function (n){
	this.vb =  new ArrayBuffer(n);
	this.vf =  new Float32Array (this.vb);
	this.vbsize=n;
    }
    this.resizevb = function (){
	var vf=this.vf, vbsize=this.vbsize;
        this.initvb (2*vbsize);
        var i, k=vbsize/4;
	for (i=0; i<k; i++) {this.vf[i]=vf[i];}
    }
    this.initfb = function (n){
	this.fb =  new ArrayBuffer(n);
	this.fi =  new Int32Array (this.fb);
	this.fbsize=n;
    }
    this.resizefb = function (){
	var fi=this.fi, fbsize=this.fbsize;
        this.initfb (2*fbsize);
        var i, k=fbsize/4;
	for (i=0; i<k; i++) {this.fi[i]=fi[i];}
    }
    this.initData = function () {
	var size=100;
	this.initvb(size); this.initfb(size);
	this.facesMaterial =Array(0);
	this.objects = new this.createObjects();
	this.currentObject = null;
    }
    this.createObject = function (){};
    this.createObjects = function (){};
    this.processRequest = function(req) {
	if (req.status!=200 && req.status!=0) {
	    this.vready="error"; this.verror = req.statusText; return;
	}
        this.initData();
	var nextv=0, nextvt=0, nextvn=0, nextf=0, p;

//	alert ("request finished");
	var r = /(\#.*)|(mtllib .*)|(o .*)|(vt?n?) ([0-9.-]+) ([0-9.-]+)( ([0-9.-]*))?$|([0-9.-]+)|(usemtl .*)|(f .*)|(s .*)/gm;
	var rf = /(\n)|([0-9-]+)(\/([0-9-]*)(\/([0-9-]+))?)?/g;
	var a, af;
	var rtxt = req.responseText;
	while ((a = r.exec (rtxt))!=null) {
            if (a[4]) {
		var x= parseFloat (a[5]);
		var y= parseFloat (a[6]);
		var z= parseFloat (a[7]);
		if (a[4]=="v")  { p= nextv*9; nextv++; y=-y; /* z=-z; */}
		if (a[4]=="vt") { 
		    p= 3+nextvt*9; nextvt++;}
		if (a[4]=="vn") { p= 6+nextvn*9; nextvn++; y=-y; /* z=-z; */ }
		if (4*p+12>=this.vbsize) this.resizevb();
		this.vf[p]=x; this.vf[p+1]=y; this.vf[p+2]=z;
	    }
	    if (a[11]){
//		rf.lastIndex=r.lastIndex;
		this.faces.push(nextf); this.facesMaterial.push(currentMaterial);
//		taccgl.clog ("New Face at "+nextf);
		while ((af = rf.exec (a[11]))!=null && af[1]==null) {
		    var vnr=parseInt(af[2]);
		    var vtnr=parseInt(af[4]); if(isNaN(vtnr)) vtnr=0;
		    var vnnr=parseInt(af[6]); if(isNaN(vnnr)) vnnr=0;
		    if (12*nextf+12>=this.fbsize) 
			this.resizefb();
		    this.fi [3*nextf]=vnr;
		    if (vnr<0) alert ("Cannot handle negative vertex index");
		    this.fi [3*nextf+1]=vtnr;
		    this.fi [3*nextf+2]=vnnr;
		    nextf++;
//		    taccgl.clog (a[0]);
		}
//		r.lastIndex = rf.lastIndex; 
//		this.fi [3*(nextf-1)]=-vnr;
	    } else 
		if (a[3]) {
		    var n=a[3].replace(/o /,"");
		    if (this.currentObject){
			this.currentObject.endFace=this.faces.length-1;
			this.currentObject.endf=nextf; this.currentObject.endv=nextvt; this.currentObject.endvn=nextvn; this.currentObject.endvt=nextvt;
		    }
		    this.objects[n]=this.currentObject=new this.createObject();
		    this.currentObject.startFace=this.faces.length;
		    this.currentObject.bgf=nextf; this.currentObject.bgv=nextvt; this.currentObject.bgvn=nextvn; this.currentObject.bgvt=nextvt;
		} else if (a[10]) {
		    var currentMaterial=a[10].replace(/usemtl /,"");
		} else if (a[2]) {
		    this.mtllib=a[2].replace(/mtllib /,"")
		}  

//	    taccgl.clog (a[0]);

//	    taccgl.clog (a[1]);
//	    taccgl.clog (r.lastIndex);
	    if (r.lastIndex==0) return;
	}
	if (this.currentObject){
	    this.currentObject.endFace=this.faces.length-1;
	    this.currentObject.endf=nextf; this.currentObject.endv=nextvt; this.currentObject.endvn=nextvn; this.currentObject.endvt=nextvt;
	}
	this.faceNumber = nextf;
	this.vready="ready";
    }
    this. scene = function () {
	var a=new taccgl.DDDObject(this,true); return a;
    }
    this. objs = function (o) {
	var a=new taccgl.DDDObject(this,o); return a;
    }
}

taccgl.objFile = function () {
    if (!this.initialized) this.begin();
    var f = new taccglObjFile ();
    return (f);
}

function taccglMtlFile () {
    // this part was copied unchanged so far from OBJ File, consider inheriting
    this.onload = this. onreadystatechange=null; this.vready="init"; this.verror=false;
    this.ready  = function () {return this.vready;}
    this.error  = function () {return this.verror;}
    this.read = function (url, async){
	if (!async) async=false;
	if (window.taccgl_nocache) { 	 
	    var curt =  new Date().getTime();
	    url += "?t="+curt
	}
	this.req=null;
	if (window.taccgl_activeX!=false  && !url.match(/^http:/)) 
	    if ("ActiveXObject" in window) this.req = new ActiveXObject("MSXML2.XMLHTTP.6.0");
	if (!this.req)	this.req = new XMLHttpRequest();
	this.req.open ("GET",url,async);
	if (async) {
	    var mtlfile=this;
	    this.req.onreadystatechange = function () {
		mtlfile.readyStateChange();
	    }
	}
	this.req.send();
	if (!async) {
	    this.processRequest(this.req);
	}
    }
    this.readyStateChange = function (){
	// note this becomes a method of the taccglObjFile but of the reqest
	taccgl.doHook(this.onreadystatechange,this);
	if (this.req.readyState==4) {
	    this.processRequest(this.req);
	    var obj=this.obj;
	    if (obj) {
		obj.vready=this.vready;
		taccgl.doHook(obj.onload,obj);
	    } else
		taccgl.doHook(this.onload,this);
//	    alert ("request finished");
	}
    }
    // end copied part
    this.initData = function () {
	this.materials = new this.createMaterials();
    }
    this.createMaterial = function (){};
    this.createMaterials = function (){};
    this.processRequest = function(req) {
	if (req.status!=200 && req.status!=0) {
	    this.vready="error"; this.verror = req.statusText; return;
	}
        this.initData();
	var r = /(\#.*)|(newmtl .*)|(Ns .*)|(Ni .*)|(Ka?d?s?) ([0-9.-]+) ([0-9.-]+) ([0-9.-]+)|(d .*)|(illum .*)/g;
	var a, m, s;
	var autoAmbAdjust = false, autoAmbAdjust1;
        // console.log ("MTL Text="+req.responseText);
	while ((a = r.exec (req.responseText))!=null) {
	    if (a[5]) {
		var cr=parseFloat (a[6]);
		var cg=parseFloat (a[7]);
		var cb=parseFloat (a[8]);
		if (a[5]=="Ka") {m.ambR=cr; m.ambG=cg; m.ambB=cb;
				 if (cr>0 || cg >0 || cb>0)  autoAmbAdjust = false;
				 if ((cr<0.8 || cg <0.8 || cb<0.8) && (cr>0 || cg >0 || cb>0))  autoAmbAdjust1 = false;
				}
		if (a[5]=="Kd") {m.diffR=cr; m.diffG=cg; m.diffB=cb;}
		if (a[5]=="Ks") {m.specR=cr; m.specG=cg; m.specB=cb;}
	    } else if (a[3]) {
		s=a[3].replace(/Ns /,"");
		m.Ns=parseFloat (s);
	    } else if (a[4]) {
		s=a[4].replace(/Ni /,"");
		m.Ni=parseFloat (s);
	    } else if (a[2]) {
		var mn=a[2].replace(/newmtl /,"");
		m = new this.createMaterial(); this.materials[mn]=m;
	    } else if (a[10]) {
		s=a[10].replace(/illum /,"");
		m.illum=parseInt (s);
	    } else if (a[9]) {
		s=a[9].replace(/d /,""); s=s.replace(/Tr /,"");
		m.transp=parseFloat (s);
	    } else if (a[1]) {
		if (a[1].match(/Blender/)) autoAmbAdjust = autoAmbAdjust1 = true; 
	    }
		
	}
	this.vready="ready";
        if ( autoAmbAdjust) this.ambientAdjust (0.6,0.6);
           else if (autoAmbAdjust1) this.ambientAdjust (0.6,0.6,0);
    }
    this.defaultSpec = function (specular, shininess, min) {
	var mn,m;
	if (!min) min=0;
	for (mn in this.materials){
	    m = this.materials[mn];
	    if (m.Ns <= min) {
		m.Ns=shininess;
		m.specR=m.specB=m.specG=specular;
	    }
	}
    }
    this.ambientAdjust = function (f,d,a,s) {
	if (!d && d!=0) d=1;
	if (!s && s!=0) s=1;
	if (!a && a!=0) a=1;
	var mn,m;
	for (mn in this.materials){
	    m = this.materials[mn];
	    m.ambDiffc=f; m.diffc=d; m.specc=s; m.ambc=a;
	}
    }
}

taccgl.mtlFile = function (url, async) {
    var f = new taccglMtlFile ();
    f.read(url,async);
    return (f);
}



// var to = new taccglImportObj();
// to.read("http://taccgl.h-e-i.de/objtest/objtestempty.obj");

function taccgl3DObjectPrototype ()
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
//	this.face = Array(0);
	this.initSuper(el);
	this.objt=null;
	this.dz0=this.dz1=this.hy0;
	this.flags=16; this.docolor=true;
	this.col0s=-32768; this.col0t=-32768; this.col1s=-32768; this.col1t=-32768; this.mix0=1; this.mix1=1; this.mixs0=0; this.mixs1=0;
	this.dddo0=this.dddo1=1;
	this.materials = new this.createMaterials();
    }
    this.actorInit = function (el){ this.init(el);}
    this.contInit = function (el) { this.init(el);}
    this.createMaterials = function (){};

    this.getModMat = function () {
	if (!this.objt) {this.objt = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];} 
	return this.objt;
    }
    this.setModMat = function (t) {
	this.objt = t; return this;
    }
    this.axisSet = function(a,c) {
	var b=0, n=1;
	if (c=="x") b=0;
	else if (c=="y") b=1;
	else if (c=="z") b=2;
	else {
	    n=-1;
	    if (c=="X") b=0;
	    else if (c=="Y") b=1;
	    else if (c=="Z") b=2;
	}
	this.objt[4*a+b]=n;
    }
    this.axis = function (s,neg) {
        if (!neg) neg=false;
	this.negNormal=neg;
	this.objt=[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1];
	this.axisSet (0,s[0]);
	this.axisSet (1,s[1]);
	this.axisSet (2,s[2]); return this;
    }

    this.dMMVertex = function (vnr) {
	var j=(vnr-1)*9;
	var xx = this.ofi.vf[j];
	var yy = this.ofi.vf[j+1];
	var zz = this.ofi.vf[j+2];
	var t=this.objt;
	var x = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; 
	var y = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; 
	var z = xx*t[8]+yy*t[9]+zz*t[10]+t[11];
	if (x<this.obj_xmin) this.obj_xmin=x; 
	if (y<this.obj_ymin) this.obj_ymin=y; 
	if (z<this.obj_zmin) this.obj_zmin=z; 
	if (x>this.obj_xmax) this.obj_xmax=x; 
	if (y>this.obj_ymax) this.obj_ymax=y; 
	if (z>this.obj_zmax) this.obj_zmax=z; 
    }
    this.dMMFace = function (i,j) {
	var k;
	for (k=i;k<j;k++) {
	    this.dMMVertex(this.ofi.fi[3*k]);
	}
    }
    this.dMMFaces = function (f,t){
	var i;
	for (i=f; i<=t; i++) {
	    var e;
	    if (i<this.ofi.faces.length-1) e=this.ofi.faces[i+1]; else e=this.ofi.faceNumber;
	    this.dMMFace (this.ofi.faces[i],e);
	}
    }
    this.determineMinMax = function (selObjects) {
	this.obj_xmax=-1E39;this.obj_ymax=-1E39;this.obj_zmax=-1E39;
	this.obj_xmin=1E39;this.obj_ymin=1E39;this.obj_zmin=1E39;

	if (!selObjects) selObjects=this.selObjects;
	if (selObjects==true) {
	    this.dMMFaces (0,this.ofi.faces.length-1)
	} else {
	    var rex=new RegExp(selObjects);
	    var n;
	    for (n in this.ofi.objects) {
		if (rex.test(n)) {
		    var o=this.ofi.objects[n];
		    this.dMMFaces (o.startFace,o.endFace)
		}
	    }
	}
/*
	var i;

	for (i=0; i<this.ofi.faces.length-1; i++) {
	    this.dMMFace (this.ofi.faces[i],this.ofi.faces[i+1]);
	}
	if (this.ofi.faces.length>0)
	    this.dMMFace(this.ofi.faces[this.ofi.faces.length-1],this.ofi.faceNumber);
*/


    }

    this.material = function (n,m) {
        if (typeof (n) == "object") n.applyToAnim(this); else this.materials[n]=m; return this;
    }


    this.modAlign = function (m) {
	this.objt = m.objt.slice(0); return this;
    }
    this.makeFit = function (axis, align, selObjects) {
	this.modFit (align,axis,selObjects); return this;
    }

    this.modFit  = function (align, axis, selObjects) { 
	if (!this.objt) this.objt=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
	if (!taccgl.dddmode) {return this;}
	if (!axis) axis="xyz";
	this.determineMinMax(selObjects);
	
	if (!align) {
	    this.objt =  taccgl.mi44Mul ([1/(this.obj_xmax-this.obj_xmin),0,0,-this.obj_xmin/(this.obj_xmax-this.obj_xmin), 
			  0,1/(this.obj_ymax-this.obj_ymin),0,-this.obj_ymin/(this.obj_ymax-this.obj_ymin), 
			  0,0,1/(this.obj_zmax-this.obj_zmin),-this.obj_zmin/(this.obj_zmax-this.obj_zmin),  0,0,0,1], this.objt);
	} else if (axis.match(/x|X|y|Y|z|Z/)) {
	    var s=1E39; var m;
  	    var hs0=  Math.sqrt(this.hx0*this.hx0+this.hy0*this.hy0+this.hz0*this.hz0);
	    var ws0=  Math.sqrt(this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
	    var ds0=  Math.sqrt(this.dx0*this.dx0+this.dy0*this.dy0+this.dz0*this.dz0);
	    if (axis.match(/x|X/)) { m = ws0/(this.obj_xmax-this.obj_xmin); if (m<s) s=m;}
	    if (axis.match(/y|Y/)) { m = hs0/(this.obj_ymax-this.obj_ymin); if (m<s) s=m;}
	    if (axis.match(/z|Z/)) { m = ds0/(this.obj_zmax-this.obj_zmin); if (m<s) s=m;}
	    var tm =  [s/ws0,0,0,-this.obj_xmin*s/ws0, 
			  0,s/hs0,0,-this.obj_ymin*s/hs0, 
			  0,0,s/ds0,-this.obj_zmin*s/ds0, 0,0,0,1];
	    if (align.length<3) align+="   ";
	    if (align[0].match(/r|b/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; tm[3]+= 1-m;
	    } else if (align[0].match(/L|T/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; tm[3]+= -m;
	    } else if (align[0].match(/c/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; tm[3]+= -m/2;
	    } else if (align[0].match(/R|B/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; tm[3]+= 1;
	    } else  if (align[0].match(/m|M/)) {
		m = (this.obj_xmax-this.obj_xmin)*s*0.5/ws0; tm[3]+= 0.5-m;
	    } else  if (align[0].match(/C/)) {
		m = (this.obj_xmax-this.obj_xmin)*s*0.5/ws0; tm[3]+= 1-m;
	    } else  if (align[0].match(/s/)) {
		tm[3] = -this.obj_xmin/(this.obj_xmax-this.obj_xmin);
		tm[0] = 1/(this.obj_xmax-this.obj_xmin);
	    } else  if (align[0].match(/S/)) {
		tm[3] = -this.obj_xmin/(this.obj_xmax-this.obj_xmin)-1;
		tm[0] = 1/(this.obj_xmax-this.obj_xmin);
	    }
	    if (align[1].match(/r|b/)) {
		m = (this.obj_ymax-this.obj_ymin)*s/hs0; tm[7]+= 1-m;
	    } else if (align[1].match(/L|T/)) {
		m = (this.obj_ymax-this.obj_ymin)*s/hs0; tm[7]+= -m;
	    } else if (align[1].match(/c/)) {
		m = (this.obj_ymax-this.obj_ymin)*s/hs0; tm[7]+= -m/2;
	    } else  if (align[1].match(/B/)) {
		m = (this.obj_ymax-this.obj_ymin)*s*0.5/hs0; tm[7]+= 1;
	    } else  if (align[1].match(/m|M/)) {
		m = (this.obj_ymax-this.obj_ymin)*s*0.5/hs0; tm[7]+= 0.5-m;
	    } else  if (align[1].match(/C/)) {
		m = (this.obj_ymax-this.obj_ymin)*s*0.5/hs0; tm[7]+= 1-m;
	    } else  if (align[1].match(/s/)) {
		tm[7] = -this.obj_ymin/(this.obj_ymax-this.obj_ymin);
		tm[5] = 1/(this.obj_ymax-this.obj_ymin);
	    } else  if (align[1].match(/S/)) {
		tm[7] = -this.obj_ymin/(this.obj_ymax-this.obj_ymin)-1;
		tm[5] = 1/(this.obj_xmax-this.obj_xmin);
	    }
	    if (align[2].match(/b/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; tm[11]+= 0;
	    } else if (align[2].match(/c/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; tm[11]+= 1-m/2;
	    } else if (align[2].match(/F/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; tm[11]+= 1;
	    } else if (align[2].match(/f/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; tm[11]+= 1-m;
	    } else  if (align[2].match(/m/)) {
		m = (this.obj_zmax-this.obj_zmin)*s*0.5/ds0; tm[11]+= 0.5-m;
	    } else  if (align[2].match(/C/)) {
		m = (this.obj_zmax-this.obj_zmin)*s*0.5/ds0; tm[11]+=  -m;
	    } else  if (align[2].match(/B/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; tm[11]+= -m;
	    } else  if (align[2].match(/s/)) {
		tm[11] = -this.obj_zmin/(this.obj_zmax-this.obj_zmin);
		tm[10] = 1/(this.obj_zmax-this.obj_zmin);
	    } else  if (align[2].match(/S/)) {
		tm[11] = -this.obj_zmin/(this.obj_zmax-this.obj_zmin)-1;
		tm[10] = 1/(this.obj_zmax-this.obj_zmin);
	    }
	    this.objt =  taccgl.mi44Mul (tm , this.objt); 
	}
	return this;
    }

    this.opacity3D = function (o0, o1) {
	if (typeof (o0)=="number") { this.dddo0 = o0; this.dddo1=o0; }
	if (typeof (o1)=="number") this.dddo1 = o1;
    }

    this.cont = function () {
	var an = new taccgl.DDDObject (this.ofi,this.selObjects);
	an.contInit(this.el);
	an.objt = this.objt.slice(0);
        var m; 
        for (m in this.materials) an.materials[m] = this.materials[m];
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an); 
	return (an);
    }


    // triangle generation follows
    this.getVertexCoord = function (vnr) {
	var j=(vnr-1)*9;
	var xx = this.ofi.vf[j];
	var yy = this.ofi.vf[j+1];
	var zz = this.ofi.vf[j+2];
	/*
	var t=this.objt;
	var x = xx*t[0]+yy*t[1]+zz*t[2]+t[3];
	var y = xx*t[4]+yy*t[5]+zz*t[6]+t[7];
	var z = xx*t[8]+yy*t[9]+zz*t[10]+t[11];
	this.ox = x*this.wx0+y*this.hx0+z*this.dx0+ this.x0;
	this.oy = x*this.wy0+y*this.hy0+z*this.dy0+ this.y0;
	this.oz = x*this.wz0+y*this.hz0+z*this.dz0+ this.z0;
	*/
	var t=this.objt0;
	this.ox = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; // +this.x0;
	this.oy = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; // +this.y0;
	this.oz = xx*t[8]+yy*t[9]+zz*t[10]+t[11]; // +this.z0;
    }
    this.startVertex = function (vnr,vtnr,vnnr) {
	var j=(vnr-1)*9;
	var xx = this.ofi.vf[j];
	var yy = this.ofi.vf[j+1];
	var zz = this.ofi.vf[j+2];
/*	var t=this.objt;
	var xt = xx*t[0]+yy*t[1]+zz*t[2]+t[3];
	var yt = xx*t[4]+yy*t[5]+zz*t[6]+t[7];
	var zt = xx*t[8]+yy*t[9]+zz*t[10]+t[11];
	var x = xt*this.wx0+yt*this.hx0+zt*this.dx0+this.x0;
	var y = xt*this.wy0+yt*this.hy0+zt*this.dy0+this.y0;
	var z = xt*this.wz0+yt*this.hz0+zt*this.dz0+this.z0;
	var x1 = xt*this.wx1+yt*this.hx1+zt*this.dx1+this.x1;
	var y1 = xt*this.wy1+yt*this.hy1+zt*this.dy1+this.y1;
	var z1 = xt*this.wz1+yt*this.hz1+zt*this.dz1+this.z1;
//	x = x1+this.x0;	y = y1+this.y0;	z = z1+this.z0;
//	x1= x1+this.x1;	y1= y1+this.y1;	z1= z1+this.z1;
*/
	var t=this.objt0;
	var x = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; // +this.x0;
	var y = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; // +this.y0;
	var z = xx*t[8]+yy*t[9]+zz*t[10]+t[11]; // +this.z0;
	t=this.objt1;
	var x1 = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; // +this.x1;
	var y1 = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; // +this.y1;
	var z1 = xx*t[8]+yy*t[9]+zz*t[10]+t[11]; // +this.z1;
	
	var nx=0, ny=0, nz=0, spec=this.flightSpecular + this.flightShininess;
	if (vnnr) {
	    j=(vnnr-1)*9;
	    xx = this.ofi.vf[j+6]; yy = this.ofi.vf[j+6+1]; zz = this.ofi.vf[j+6+2]; 	
	    t=this.objt0inv;
	    nx = xx*t[0]+yy*t[1]+zz*t[2];
	    ny = xx*t[3]+yy*t[4]+zz*t[5];
	    nz = xx*t[6]+yy*t[7]+zz*t[8];
	    /* var xt = xx*t[0]+yy*t[1]+zz*t[2];
	    var yt = xx*t[4]+yy*t[5]+zz*t[6];
	    var zt = xx*t[8]+yy*t[9]+zz*t[10];
	    var nx = xt*this.wx0+yt*this.hx0+zt*this.dx0;
	    var ny = xt*this.wy0+yt*this.hy0+zt*this.dy0;
	    var nz = xt*this.wz0+yt*this.hz0+zt*this.dz0; */
	} else {
            nx = this.nx; ny = this.ny; nz = this.nz;
 	}
	var s0=this.fs0, t0=this.ft0; var mix=this.mix0;
	if (vtnr) {
	    j=(vtnr-1)*9;
	    s0 += this.ofi.vf[j+3]*this.fws0 +  (1-this.ofi.vf[j+4])*this.fhs0; t0 += this.ofi.vf[j+3]*this.fwt0 + (1-this.ofi.vf[j+4])*this.fht0; mix=1;
	} 
//        if (this.fflags & 64)
//	    var breakhere=76;
//        nx=0; ny=0, nz=1;
        taccgl.nvertMove (x, y, z   ,x1, y1, z1
			  ,nx,ny,nz,spec,  s0,t0,  this.fflags, this.basetime,this.vduration);
//	taccgl.nvertColor (this.fcol0s,this.fcol0t,this.fcol1s, this.fcol1t, this.fmix0, this.fmix1, this.fmixs0, this.fmixs1); 

        if (this.rotation) {
	     taccgl.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto,this.rotacc);
	}
	if (this.doacceleration){
	    taccgl.nvertAcceleration(this.ax,this.ay,this.az); 
	}
    }
    this.startTriangle = function (a,at,an,b,bt,bn,c,ct,cn) {
//	an=bn=cn=0;
	if (an==0 || bn==0 || cn==0) {
	    this.getVertexCoord (a); var ax=this.ox; var ay=this.oy; var az=this.oz;
	    this.getVertexCoord (b); var bx=this.ox; var by=this.oy; var bz=this.oz;
	    this.getVertexCoord (c); var cx=this.ox; var cy=this.oy; var cz=this.oz;
	    this.nx = -(by-ay)*(cz-az) + (bz-az)*(cy-ay);
            this.ny = -(bz-az)*(cx-ax) + (bx-ax)*(cz-az);
            this.nz = -(bx-ax)*(cy-ay) + (by-ay)*(cx-ax);
	}
//	console.log("Triangle "+a+","+b+","+c+"vertI="+taccgl.vertI);
	this.startVertex (a,at,an);
	this.startVertex (b,bt,bn);
	this.startVertex (c,ct,cn);
	taccgl.nvertColor3 (this.fcol0s,this.fcol0t,this.fcol1s, this.fcol1t, this.fmix0, this.fmix1, this.fmixs0, this.fmixs1); 
    }
    this.startMapElement = function () {
	var t=taccgl;
	if (!this.dotexmove) {this.s1=this.s0; this.t1=this.t0; this.ws1=this.ws0; this.ht1=this.ht0;this.wt1=this.wt0; this.hs1=this.hs0}
	t.nvertOffset(-5);
/*
	t.nvertTexMove4 (this.s0,this.t0,this.s1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0,this.s1+this.ws1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.ht0,this.s1+this.ws1,this.t1+this.ht1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0,this.s1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.ht0,this.s1+this.ws1,this.t1+this.ht1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0+this.ht0,this.s1,this.t1+this.ht1);
*/
	t.nvertTexMove4 (this.s0+this.hs0,this.t0+this.ht0,this.s1+this.hs1,this.t1+this.ht1);t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0+this.hs0,this.t0+this.wt0+this.ht0,this.s1+this.ws1+this.hs1,this.t1+this.wt1+this.ht1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.wt0,this.s1+this.ws1,this.t1+this.wt1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.hs0,this.t0+this.ht0,this.s1+this.hs1,this.t1+this.ht1);t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.wt0,this.s1+this.ws1,this.t1+this.wt1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0,this.s1,this.t1); 
    }
    this.startMapMaterial = function (m) {
	var t=taccgl, s1, t1, ws1, ht1, wt1, hs1;
	if (!m.dotexmove) {s1=m.s0; t1=m.t0; ws1=m.ws0; ht1=m.ht0; wt1=m.wt0; hs1=m.hs0;}
	else {s1=m.s1; t1=m.t1; ws1=m.ws1; ht1=m.ht1;}
	t.nvertOffset(-5);
	t.nvertTexMove4 (m.s0+m.hs0,m.t0+m.ht0,s1+hs1,t1+ht1); t.nvertOffset(1);
	t.nvertTexMove4 (m.s0+m.ws0,m.t0+m.ht0,s1+ws1,t1+ht1); t.nvertOffset(1);
	t.nvertTexMove4 (m.s0+m.ws0,m.t0+m.wt0,s1+ws1,t1+wt1); t.nvertOffset(1);
	t.nvertTexMove4 (m.s0+m.hs0,m.t0+m.ht0,s1+hs1,t1+ht1); t.nvertOffset(1);
	t.nvertTexMove4 (m.s0+m.ws0,m.t0+m.wt0,s1+ws1,t1+wt1); t.nvertOffset(1);
	t.nvertTexMove4 (m.s0,m.t0,s1,t1); 
    }
     this.startFace = function (i,j,mn) {
//	taccgl.clog("start Face "+i+","+j);
	var k;
	var ms=this.ofi.mtl.materials;
	var m=null, tm=this.materials[mn];
	if (ms) { m=ms[mn];}

        if (tm && tm.docolor){	// Material explicitely selected 
	    this.fflags = tm.flags | this.flags;
	    this.fcol0s = tm.col0s; 
	    this.fcol0t = tm.col0t;
	    this.fcol1s = tm.col1s;
	    this.fcol1t = tm.col1t;
	    this.flightSpecular= tm.lightSpecular;
	    this.flightShininess= Math.round(tm.lightShininess);
	    this.fmix0=tm.mix0; this.fmix1=tm.mix1; this.fmixs0=tm.mixs0; this.fmixs1=tm.mixs1;
	    if (typeof (tm.s0)!="number") {
		this.fmix0=0; this.fmix1=0; this.fmixs0=0; this.fmixs1=0;
	    }
	    // this.fcol0s = 	-32703; this.fcol0t= -31745; 
	    // this.fcol1s = 	-32703; this.fcol1t= -31745; 
            // this.fflags=48;
	    // this.fflags=65587;
	    // this.fflags=65555;
	    // this.flightShininess= 96;
	    // this.flightSpecular= 0.935897000000000;
	    this.fs0=tm.s0; this.ft0=tm.t0; this.fhs0=tm.hs0; this.fht0=tm.ht0; this.fws0=tm.ws0; this.fwt0=tm.wt0; 
	} else {
            // m refers to the material spec in the mtl file and is null, if no mtl file is present or the material is not conatined therein
	    if (mn=="HTML")  if ( j-i==4 || this.ofi.fi[3*i+1]!=0 ) m=null;
//	if (this.ofi.fi[3*i+1]!=0) m=null;
	    this.fs0=this.s0; this.ft0=this.t0; this.fhs0=this.hs0; this.fht0=this.ht0; this.fws0=this.ws0; this.fwt0=this.wt0; 
	    if (m) {
		var ambDiffc, ambc, diffc, specc;
		if (!m.ambDiffc) ambDiffc=0; else ambDiffc=m.ambDiffc;
		if (!m.diffc && m.diffc!=0) diffc=1; else diffc=m.diffc;
		if (!m.ambc && m.ambc!=0) ambc=1; else ambc=m.ambc;
		if (!m.specc && m.specc!=0) specc=1; else specc=m.specc;
		if (tm) specc=tm.lightSpecular + tm.lightShininess;
		var R=m.ambR*ambc+m.diffR*ambDiffc;
		var G=m.ambG*ambc+m.diffG*ambDiffc;
		var B=m.ambB*ambc+ambDiffc*m.diffB;
		if (R>1) R=1;
		if (G>1) G=1;
		if (B>1) B=1;
		this.fflags = (this.flags | 48 ) & ~64;
		this.fcol0s = Math.floor(R*255)+256*(Math.floor(G*255)-128); 
		this.fcol0t = this.dddo0*255+256*(Math.floor(255*B)-128);
		this.fcol1s = Math.floor(diffc*m.diffR*255)+256*(Math.floor(diffc*m.diffG*255)-128); 
		this.fcol1t = this.dddo1*255+256*(Math.floor(diffc*255*m.diffB)-128);
		this.flightSpecular=Math.min((m.specR+m.specG+m.specB)/3,0.999)*specc; 
		this.flightShininess=Math.round(m.Ns);
		this.fmix0=0; this.fmix1=0; this.fmixs0=0; this.fmixs1=0;
	    } else {
		this.fflags = this.flags;
		this.fcol0s = this.col0s; 
		this.fcol0t = this.col0t;
		this.fcol1s = this.col1s;
		this.fcol1t = this.col1t;
		this.flightSpecular= this.lightSpecular;
		this.flightShininess= Math.round(this.lightShininess);
		this.fmix0=this.mix0; this.fmix1=this.mix1; this.fmixs0=this.mixs0; this.fmixs1=this.mixs1;
	    }
	}

	// this.mix0=1; this.mix1=1;
	for (k=i+2;k<j;k++) {
	    this.startTriangle(this.ofi.fi[3*i],this.ofi.fi[3*i+1],this.ofi.fi[3*i+2], 
			       this.ofi.fi[3*(k-1)],this.ofi.fi[3*(k-1)+1],this.ofi.fi[3*(k-1)+2], 
			       this.ofi.fi[3*k],this.ofi.fi[3*k+1],this.ofi.fi[3*k+2]);
	}

	if (j-i==4 && tm && typeof (tm.s0)=="number" && this.ofi.fi[3*i+1]==0) this.startMapMaterial(tm);
	if (j-i==4 && mn=="HTML" && this.ofi.fi[3*i+1]==0) this.startMapElement();
    }
    this.startFaces = function (f,t){
	var i;
	for (i=f; i<=t; i++) {
	    var e;
	    if (i<this.ofi.faces.length-1) e=this.ofi.faces[i+1]; else e=this.ofi.faceNumber;
	    this.startFace (this.ofi.faces[i],e,this.ofi.facesMaterial[i]);
	}
    }
    this.start = function () {
	if (!taccgl.dddmode) return this;

        var maxindex=null, j=taccgl;
        if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}

        var e = this.vduration + this.basetime;
        if (taccgl.duration < e && ((this.flags&1<<16)==0)) taccgl.setDuration(e);

	if (this.special) this.startSpecial();

//	if (!this.objt) {this.objt = [1,0,0,0, 0,1,0,0, 0,0,1,0];}
//	if (!this.objt) {this.objt = [0.1,0,0,0.5, 0,0.1,0,1, 0,0,0.1,1, 0,0,0,1];}
	if (!this.objt) {this.objt = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];}

/*
	this.objt0 = taccgl.mi44Mul ([this.wx0, this.wy0, this.wz0, 0, this.hx0, this.hy0, this.hz0, 0, this.dx0, this.dy0, this.dz0, 0,
				     this.x0, this.y0, this.z0, 1], this.objt);
	this.objt1 = taccgl.mi44Mul ([this.wx1, this.wy1, this.wz1, 0, this.hx1, this.hy1, this.hz1, 0, this.dx1, this.dy1, this.dz1, 0,
				     this.x1, this.y1, this.z1, 1], this.objt);

*/

	this.objt0 = taccgl.mi44Mul ([this.wx0, this.hx0, this.dx0, this.x0,
				     this.wy0, this.hy0, this.dy0, this.y0,
				     this.wz0, this.hz0, this.dz0, this.z0,
				     0, 0,  0, 1], this.objt);

	this.objt1 = taccgl.mi44Mul ([this.wx1, this.hx1, this.dx1, this.x1,
				     this.wy1, this.hy1, this.dy1, this.y1,
				     this.wz1, this.hz1, this.dz1, this.z1,
				     0, 0,  0, 1], this.objt);


	this.objt0inv = taccgl.mi33T(taccgl.m33Inverse(taccgl.m33FromM44(this.objt0)));
	if (this.negNormal) taccgl.mi33Negate(this.objt0inv);
//	if (taccgl_debug) {
//	    taccgl.clog (taccgl.m33ToString(this.objt0inv));
//        } // taccgl_debug_end


	if (this.selObjects==true) {
	    this.startFaces (0,this.ofi.faces.length-1)
	} else {
	    var rex=new RegExp(this.selObjects);
	    var n;
	    for (n in this.ofi.objects) {
		if (rex.test(n)) {
		    var o=this.ofi.objects[n];
		    this.startFaces (o.startFace,o.endFace)
		}
	    }
	}
	this.vertEndIndex=j.vertI;
	if (maxindex) j.vertI=maxindex;
	if (taccgl_debug_vertex) {
	   taccgl.dumpVertexTransition(this);
	} // taccgl_debug_end
	if (this.p!=j.stdsc) j.setShader(j.stdsc);
	return this;
    }
    this.clone = function (a) { return new this.taccglDDDObjectClone (this); }
    this.taccglDDDObjectClone = function (a) {
	this.taccglAnimClone (a);
	this.objt=a.objt.slice(0);
	this.dddo0=a.dddo0; this.dddo1=a.dddo1;
	this.obj_xmin=a.obj_xmin;
	this.obj_ymin=a.obj_ymin;
	this.obj_zmin=a.obj_zmin;
	this.obj_xmax=a.obj_xmax;
	this.obj_ymax=a.obj_ymax;
	this.obj_zmax=a.obj_zmax;
	this.ofi=a.ofi;
	this.selObjects=a.selObjects;
	this.materials=a.materials;
    }
}
taccgl.DDDObject = function(f,objects) {this.ofi=f;this.selObjects=objects;}
taccgl3DObjectPrototype.prototype =  taccgl.taccglAnim.prototype;
taccgl.DDDObject.prototype=new taccgl3DObjectPrototype();
taccgl.DDDObject.prototype.taccglDDDObjectClone.prototype = taccgl.DDDObject.prototype;

function taccglControllerPrototype ()
{
    this.baseinit = function () {
	this.can=document.getElementById ("taccgl_canvas3d");
	if (!taccgl.overs) taccgl.overs=new Array(0);
	this.automaticMouseMoveOut=true;
    }
    this.init= function () { this.baseinit();}
    this.attachEventForwarding = function() { }
    this.detachEventForwarding = function() { }
    this.attach = function() { this.baseAttach(); }
    this.baseAttach = function (){
	this.can=document.getElementById ("taccgl_canvas3d");
	this.attachEventForwarding ();
    }
    this.detach = function() { this.baseDetach(); }
    this.baseDetach = function (){
	this.detachEventForwarding ();
    }


    this.instMouseOverFilterClass = function (c,elimDoubleOver,elimSpontanousOut,delay){
	if (!document.getElementsByClassName) return;
	var s = document.getElementsByClassName(c);
	for (var i=0; i<s.length; i++) this.instMouseOverFilter(s[i],elimDoubleOver,elimSpontanousOut,delay);
    }

    this.elstr = function (e) {
	if (!e) return e+"";
	var str="";
	if (e.tagName) str+=e.tagName;
	str+="#";
	if (e.id && e.id+""!="undefined") str+=e.id;
	str+=" ";
	return str;
    }
    

    this.instMouseOverFilter = function (el,elimDoubleOver,elimSpontanousOut,delay) {
	if (typeof (el)=="string") el=document.getElementById(el);
	var ov=el.onmouseover;
        var out=el.onmouseout;
	var con=this;
	if (!delay) delay=0;
	if (ov && !ov.istaccglfilter) {
	    el.onmouseover=function(e){
		if (!e) e=window.event;
		if (taccgl_debug) {
		    taccgl.clog("filtered mouseover"+ " fromElement="+taccgl.controller.elstr(e.fromElement) + 
			    "toElement="+taccgl.controller.elstr(e.toElement) + 
			    "target="+taccgl.controller.elstr(e.target) + 
			    "relatedTarget="+taccgl.controller.elstr(e.relatedTarget) );
		} // taccgl_debug_end
		con.prevFound=e.target;
		if (!e.fromElement || e.fromElement.id!="taccgl_canvas3d") {
		    var i=0; while (i<taccgl.overs.length && taccgl.overs[i]!=el) i++;
		    if (i<taccgl.overs.length) {
			if (elimDoubleOver) return;
		    } else taccgl.overs.push(el);
		    if (delay==0) {ov(e)} else {
			if (el.outTimer) {
			    clearTimeout (el.outTimer); el.outTimer=null;
			} else {
			    el.overTimer = setTimeout (
				function () { el.overTimer=null; ov(e)}, 
				delay);
			}
		    }
		}
	    }
	    el.onmouseover.istaccglfilter=true;
	}
	if (out && !out.istaccglfilter) {
	    el.onmouseout=function(e){
		if (!e) e=window.event;
		if (taccgl_debug) {
		    taccgl.clog("filtered mouseout"+ " fromElement="+taccgl.controller.elstr(e.fromElement) + 
				"toElement="+taccgl.controller.elstr(e.toElement) + 
				"target="+taccgl.controller.elstr(e.target) + 
				"relatedTarget="+taccgl.controller.elstr(e.relatedTarget) );
		} // taccgl_debug_end
		if (!e.toElement || e.toElement.id!="taccgl_canvas3d") {
		    if (con.prevFound==el) con.prevFound=null;
		    var i=0; while (i<taccgl.overs.length && taccgl.overs[i]!=el) i++;
		    if (i>=taccgl.overs.length) {
			if (elimSpontanousOut) { /* taccgl.clog("eliminate mouseout");*/ return;}
		    } else 
			taccgl.overs.splice(i,1);
		    if (delay==0) { /* taccgl.clog("forward mouseout immediately"); */ out(e);} else {
			if (el.overTimer){
			    // taccgl.clog("clear mouseover and do not mouseout");
			    clearTimeout (el.overTimer); el.overTimer=null;
			} else {
			    // taccgl.clog("pending mouseout");
			    el.outTimer = setTimeout (
				function () { el.outTimer=null;/* taccgl.clog("forward delayed mouseout"); */ out(e)}, 
				delay);
			}
		    }
		}
	    }
	    el.onmouseout.istaccglfilter=true;
	}
    }

    this.bodyOnMouseMove = function (e) {
	if (!e) e=window.event;
	if (!this.automaticMouseMoveOut) return;
	if (!document.createEvent) return;
	var p=e.target;
	if (!p) e=e.srcElement;
	if (p && p.id && p.id=="taccgl_canvas3d") return;
	var ov=new Array(0);
	while (p) {ov.push(p); p=p.parentElement;}
	var i=0; 
	while (i<taccgl.overs.length) {
	    var j=0;
	    while (j<ov.length && ov[j]!=taccgl.overs[i]) j++;
	    if (j>=ov.length) {
		var ovleave=taccgl.overs[i]; 
		if (document.createEvent) {
		    var ne=document.createEvent("MouseEvents");
		    ne.initMouseEvent ("mouseout",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
				       e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.target);
		    // Version following the newest standard not understood by older browsers
		    // var ne=new MouseEvent ("mouseout", {'view' : window, 'bubbles' : true, 'cancelable' : true });
		    if (taccgl_debug) {
			taccgl.clog("body.mouseMoveOut Dispach Mouseout to  prevFound="+this.elstr(taccgl.overs[i])+" foundEl="+this.elstr(this.foundEl)+" relatedTarget="+this.elstr(e.target));
		    } // taccgl_debug_end
		    
		    taccgl.overs[i].dispatchEvent (ne);;
		    // Version following the newest standard not understood by older browsers
		    // var ne=new MouseEvent ("mouseleave", {'view' : window, 'bubbles' : true, 'cancelable' : true });
		    ne=document.createEvent("MouseEvents");
		    ne.initMouseEvent ("mouseleave",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
				       e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.target);
		    ovleave.dispatchEvent (ne);
		}
		if (taccgl.overs[i]==ovleave) taccgl.overs.splice(i,1);
	    } else 
		i++;
	}
    }
}

function taccglForwardingControllerPrototype ()
{
    this.init = function () {
	this.baseinit();
    }

    this.invisibleCanvas = function (){
    }

    this.attachEventForwarding = function() {
	var t=this;
	if (this.can) {
	    this.can.onclick=function(e){t.fwonclick(e,"click");};
	    this.can.ondblclick=function(e){t.fwonclick(e,"dblclick");};
	    this.can.onmouseup=function(e){t.fwonclick(e,"mouseup");};
	    this.can.onmousedown=function(e){t.fwonclick(e,"mousedown");};
	    this.can.onmousemove=function(e){t.fwonmousemove(e);};
	    this.can.style.pointerEvents = "none";
	}
    }
    this.detachEventForwarding = function() {
	if (this.can) {
	    this.can.onclick= this.can.ondblclick= this.can.onmouseup= this.can.onmousedown=
		this.can.onmousemove=null;
	    this.can.style.pointerEvents = "all";
	}
    }

    this.findElement = function (x,y,el,op,bx,by,hid,zindex){
	this.can.style.visibility = "hidden";
	this.foundEl = document.elementFromPoint (x,y);
	this.can.style.visibility = "visible";
    }


    this.fwonclick = function(e,k) {
	this.foundEl=null;
	this.findElement(e.clientX, e.clientY);

	var ne=document.createEvent("MouseEvents");
	ne.initMouseEvent (k,e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);
	ne.toElement=this.foundEl;

        /* new std code not supported by IE 10
	var ne=new MouseEvent (k, {'view' : window, 'bubbles' : true, 'cancelable' : true });
        */
	if (this.foundEl) {
	    if (taccgl_debug) {
		taccgl.clog ("Dispatch onclick "+this.elstr(this.foundEl));
	    } // taccgl_debug_end
            this.foundEl.dispatchEvent (ne);
	}
    }
    this.fwonmouseout  = function(e,el) {
	var ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseout",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.foundEl);
	// ne.toElement=this.prevFound;
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseout", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	if (taccgl_debug) {
	    taccgl.clog("Dispach Mouseout to "+this.elstr(el)+" prevFound="+this.elstr(this.prevFound)+" foundEl="+this.elstr(this.foundEl)+" relatedTarget="+this.elstr(e.relatedTarget));
	} // taccgl_debug_end
        el.dispatchEvent (ne);
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseleave", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseleave",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.foundEl);
	// ne.toElement=this.prevFound;
        el.dispatchEvent (ne);
    }
    this.fwonmouseover = function(e,el) {
	var ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseover",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.prevFound);
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseover", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	if (taccgl_debug) {
	    taccgl.clog("Dispach Mouseover to "+this.elstr(el)+" foundEl="+this.elstr(this.foundEl)+" prevFound="+this.elstr(this.prevFound)+" relatedTarget="+this.elstr(e.relatedTarget));
	} // taccgl_debug_end
        el.dispatchEvent (ne);
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseenter", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseenter",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.prevFound);
        el.dispatchEvent (ne);
    }
    this.fwonmousemove = function(e) {
	this.foundEl=null;
//	this.findElementTree(e.pageX, e.pageY, document.body, document.body, 0,0, false, "0");
	this.findElement(e.clientX, e.clientY);

	this.doHoverChain (e, this.prevFound, this.foundEl);
//	if (this.prevFound && this.prevFound != this.foundEl) this.fwonmouseout(e);

//	var ne=new MouseEvent ("mousemove", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	if (this.foundEl) {
//	    taccgl.clog (this.foundEl.id + this.foundEl.tagName);
//            this.foundEl.dispatchEvent (ne);
//	    if (this.prevFound != this.foundEl) this.fwonmouseover(e);
	    var ne=document.createEvent("MouseEvents");
	    ne.initMouseEvent ("move",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			       e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);
	    ne.toElement=this.foundEl;
            this.foundEl.dispatchEvent (ne);
	}
	this.prevFound = this.foundEl;
    }
    this.matchesOnElement = function (st,el) {
	var rx=/(,?([A-Za-z0-9][-_A-Za-z0-9]*))|(\.([A-Za-z0-9][-_A-Za-z0-9]*))|(#([A-Za-z0-9][-_A-Za-z0-9]*))|(:([A-Za-z0-9][-_A-Za-z0-9]*))/g;
	var tn=el.tagName.toLowerCase(), id=el.id, tagNameMatch=false, idSelector=false, idMatch=false, tagNameSelector=false,
	classSelector=false, classMatch=false, a, cn=el.className.toLowerCase();
	while ((a=rx.exec(st))!=null) {
	    if (a[1]) {
		tagNameSelector=true;
		if (a[2].toLowerCase()==tn) tagNameMatch=true;
		if (taccgl_debug) {
		    taccgl.clog (st+"/"+l+"/"+tn+"TAGNAME");
		} // taccgl_debug_end
	    } else if (a[3]) {
		classSelector=true;
		var l=a[4].toLowerCase();
		if (taccgl_debug) {
		    taccgl.clog (st+"/"+l+"/"+cn+"CLASSNAME");
		} // taccgl_debug_end
		if (l==cn || cn.indexOf (" "+l) != -1 || cn.indexOf (l+" ") != -1 ) classMatch=true;
	    } else if (a[5]) {
		idSelector=true;
		if (a[6]==id) idMatch=true;
	    }
	}
	return ( (idSelector && idMatch) ||
		 (!idSelector && (
		     (( (tagNameSelector && tagNameMatch) || !tagNameSelector) && (!classSelector || classMatch) ) 
		 )))
    }
    this.styleText = function (r){
	var cst = r.cssText;
	var rex=/{([^}]*)}/g;
	var a=rex.exec(cst);
	if (!a) return "";
	if (!a[1]) return "";
	return a[1];
    }
    this.doHoverChain = function (e,p,n) {
	var pc=new Array(0), nc=new Array(0), pp=p, nn=n;
	while (pp) {pc.push(pp); pp=pp.parentElement;}
	while (nn) {nc.push(nn); nn=nn.parentElement;}
	var ni=nc.length, pi=pc.length;
	while (ni>0 && pi>0 && pc[pi]===nc[ni]) {ni--; pi--}
	while (pi>0) { pi--; this.unHover(e,pc[pi]);}
	while (ni>0) { ni--; this.doHover(e,nc[ni]);}
    }
    this.doHover = function (e,el){
        this.fwonmouseover(e,el);
	var i,ss = document.styleSheets;
	if (el.tagName.toLowerCase()=="a") {  this.can.style.cursor = "pointer"; }
	for (i=0; i<ss.length; i++) {
	    var s=ss[i], j;
	    var rs = s.cssRules;
	    for (j=0; j<rs.length; j++) {
		var r=rs[j], st=r.selectorText;
		if (r.type==r.STYLE_RULE && st.match(/:hover/)) {
		    if (this.matchesOnElement(st,el)){
			if (!el.taccglNoHoverStyle) el.taccglNoHoverStyle=el.style.cssText;
			var as=this.styleText(r);
			if (el.tagName.toLowerCase()=="a") {
			    this.can.style.cursor = "pointer";
			    as = "cursor:pointer;"+as;
			}
			el.style.cssText=el.taccglNoHoverStyle+";"+as;
			if (taccgl_debug) {
			    taccgl.clog (el.tagName + " " + r.selectorText + " || " + r.cssText + " = " +as);
			} // taccgl_debug_end
		    }
		}
	    }
	}
    }
    this.unHover = function (e,el) {
	if (!el) return;
        this.fwonmouseout(e,el);
	if (taccgl_debug) {
	    taccgl.clog ("UnHover "+el.tagName+" " +el.taccglNoHoverStyle);
	} // taccgl_debug_end
	if (el.taccglNoHoverStyle || el.taccglNoHoverStyle=="") el.style.cssText=el.taccglNoHoverStyle;
	el.taccglNoHoverStyle=null;
	this.can.style.cursor = "";
    }
}
taccgl.createController = function() { this.init(); }
taccgl.createController.prototype=new taccglControllerPrototype();
taccglForwardingControllerPrototype.prototype =  new taccglControllerPrototype();
taccgl.createForwardingController = function() { this.init(); }
taccgl.createForwardingController.prototype=new taccglForwardingControllerPrototype();
taccgl.blockingController = function() {return new this.createController();}
taccgl.forwardingController = function() {return new this.createForwardingController();}


function taccgl3DCanvasPrototype (){
    this.init = function () {}
}
taccgl.createDDDCanvas = function() { this.init(); }
taccgl.createDDDCanvas.prototype=new taccgl3DCanvasPrototype();
taccgl.useController = function (c) {
    if (!this.initialized) this.begin();
    this.controller.detach();
    this.previousController=this.controller; this.controller=c;
    this.controller.attach();
}


function taccglTransformControllerPrototype (){
    this.init = function () {
	this.baseinit();
	this.rcx = 500; this.rcy =500; this.rcz=0; this.vexitOnMouseout=false;
	this.moveStep=2;
	this.minPitch=-10; this.maxPitch=10;
	this.minRoll=-10; this.maxRoll=10;
	this.minYaw=-10; this.maxYaw=10;
	this.isactive=true;
    }

    this.pitch = function (mi, ma) {
	this.minPitch=mi; this.maxPitch=ma;
    }
    this.roll = function (mi, ma) {
	this.minRoll=mi; this.maxRoll=ma;
    }

    this.yaw = function (mi, ma) {
	this.minYaw=mi; this.maxYaw=ma;
    }
    this.active = function (a) { this.isactive=a; }
    
    this.attachEventForwarding = function() {
	var t=this;
	var mt=document.getElementById('taccgl_mouseTrap');
	if (!mt) {
	    if (document.body.insertAdjacentHTML) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    "<div id='taccgl_mouseTrap' tabindex=\"0\" style=\"cursor:crosshair;xbackground-color:rgba(100,0,0,0.5); height:100%; width:100%; position:fixed;z-index:9999; display:none\"></div>");
	    }
	}
	mt=document.getElementById('taccgl_mouseTrap');
	if (!mt) return;
	mt.onmousedown=function(e){ t.tronmousedown(e)}
	mt.onmouseup=function(e){ t.tronmouseup(e)}
	mt.onmousemove=function(e){ t.tronmousemove(e)}
	mt.onclick=function(e){ t.tronclick(e)}
	mt.onkeypress=function(e) {
	    return t.tronkeypress(e);
	}
	mt.onkeydown=function(e) {
	    return t.tronkeydown(e);
	}
	mt.onkeyup=function(e) {
	    return t.tronkeyup(e);
	}
	mt.oncontextmenu=function(){ return false;}
	mt.style.display=''; 
	var x=mt.clientWidth;
	mt.style.opacity=1;
	mt.focus();
    }
    this.detachEventForwarding = function() {
	var mt=document.getElementById('taccgl_mouseTrap');
	if (mt) {
	    mt.style.display='none'; mt.style.opacity=0;
	}
    }
    this.rotationCenter=function(x,y,z){
	this.rcx=x; this.rcy=y; this.rcz=z;	
    }
    this.mouseBox=function(mbxmin,mbxmax,mbymin,mbymax){
	this.mbxmin=mbxmin; this.mbxmax=mbxmax; this.mbymin=mbymin; this.mbymax=mbymax;
    }
    this.extendMouseBox=function(mbxmin,mbxmax,mbymin,mbymax){
	this.mbxmin=Math.min(mbxmin,this.mbxmin); 
	this.mbxmax=Math.max(mbxmax,this.mbxmax);
	this.mbymin=Math.min(mbymin,this.mbymin);
	this.mbymax=Math.max(mbymax,this.mbymax);
    }

    this.exitOnMouseout=function(b){
	if (b!=false) b=true;
	this.vexitOnMouseout= b;
    }
    this.tronmousedown=function(e){
	if (!e) e=event;
	this.vexitOnMouseout=false;
//	console.log ("Mouse Down Event",e,e.which,e.button,e.buttons);
	this.cX=e.clientX; this.cY=e.clientY; this.button=e.which;
	this.IM=taccgl.TM.slice();
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
    }
    this.tronmousemove=function(e){
//	console.log ("move ",e,e.which);
	if (this.vexitOnMouseout) {
	    var x=e.pageX; var y=e.pageY;
	    if (x > this.mbxmax || x<this.mbxmin || y>this.mbymax  || y<this.mbymin) this.doexit();
	}
	if (this.button==1 || this.button==3) {
	    var dX=e.clientX-this.cX, dY=e.clientY-this.cY;
	    if (e.shiftKey) {
		dX/=10; dY/=10;
	    }
	    if (this.button==1 && !e.ctrlKey) {
		if (taccgl_debug) {
		    console.log (dX, dY, [this.rcx, this.rcy, this.rcz, 1]);
		} // taccgl_debug_end
		var rm=taccgl.m33Rotation (-dX/300*Math.PI, [0,1,0]);
		var lxa  = taccgl.mi33MulV(rm,[1,0,0]);
		rm = taccgl.m33Rotation (dX/300*Math.PI, [0,1,0]);
		rm = taccgl.mi33Mul(rm,taccgl.m33Rotation (-dY/300*Math.PI, lxa));
		var rcx= this.rcx+this.IM[3], rcy=this.rcy+this.IM[7], rcz=this.rcz+this.IM[11];
//		this.TM= taccgl.mi44Mul ( taccgl.m44FromM33s (rm,rcx,rcy,rcz), taccgl.m44Translation (-rcx,-rcy,-rcz) );
//		var rv = taccgl.mi44MulV(this.IM,[this.rcx, this.rcy, this.rcz, 1]);
//		this.TM= taccgl.mi44Mul ( taccgl.m44FromM33s (rm,rv[0],rv[1],rv[2]), taccgl.m44Translation (-rv[0],-rv[1],-rv[2]) );
//		this.TM= taccgl.m44FromM33C (rm,rv);
		this.TM= taccgl.m44FromM33C (rm,[this.rcx, this.rcy, this.rcz, 1]);
	    } else  if (this.button==1 && e.ctrlKey) {
		var rm=taccgl.m33Rotation (dX/300*Math.PI, [0,1,0]);
		rm = taccgl.mi33Mul(rm,taccgl.m33Rotation (dY/300*Math.PI, [0,0,1]));
		var rcx= this.rcx+this.IM[3], rcy=this.rcy+this.IM[7], rcz=this.rcz+this.IM[11];
		// this.TM= taccgl.mi44Mul ( taccgl.m44FromM33s (rm,rcx,rcy,rcz), taccgl.m44Translation (-rcx,-rcy,-rcz) );
		var rv = taccgl.mi44MulV(this.IM,[this.rcx, this.rcy, this.rcz, 1]);
		// this.TM= taccgl.mi44Mul ( taccgl.m44FromM33s (rm,rv[0],rv[1],rv[2]), taccgl.m44Translation (-rv[0],-rv[1],-rv[2]) );
		this.TM= taccgl.m44FromM33C (rm,rv);
	    } else if (this.button==3 && !e.ctrlKey) {
    	        this.TM=taccgl.m44Translation (dX,dY,0); 
	    } else if (this.button==3 && e.ctrlKey) {
    	        this.TM=taccgl.m44Translation (dX,0,-dY*10); 
	    }
	    
       
//	    taccgl.setTM( taccgl.mi44T(taccgl.mi44Mul(this.TM,this.IM)) );
//	    var newtm =  taccgl.mi44T(taccgl.mi44Mul(this.TM,this.IM));

	    var newtm =  taccgl.mi44Mul(this.TM,this.IM);
	    // taccgl.tlog("newtm =\n"+taccgl.m44ToString(taccgl.TM));

	    var eam;
	    if (this.isactive) {
		var eam = taccgl.m33FromM44(newtm);
	    } else {
		var eam = taccgl.mi33T(taccgl.m33FromM44(newtm));
	    }
	    if (taccgl_debug) {
		taccgl.tlog("this.IM=\n"+taccgl.m44ToString(this.IM));
		taccgl.tlog("this.TM=\n"+taccgl.m44ToString(this.TM));

		taccgl.tlog("eam =\n"+taccgl.m33ToString(eam));
	    } // taccgl_debug_end
	    var ea = taccgl.m33ToEulerAngles (eam);
	    if (taccgl_debug) {
		taccgl.tlog(JSON.stringify(ea));
	    } // taccgl_debug_end

	    // Previous version calculating az, incl, and inclO
	    /*
	    var v= taccgl.mi44MulV(newtm,[0,0,-1,0]);
	    taccgl.tlog("viewDirection="+taccgl.vToString(v));
            var az=taccgl.vAzimuthYZ(v[0],v[1],v[2]);
	    if (this.maxAzimuth>Math.PI) az+=Math.PI*2;
	    var incl=taccgl.vInclinationYZ(v[0],v[1],v[2]);
	    taccgl.tlog("Inclination="+incl);
	    taccgl.tlog("Azimuth="+az);
	    var vO= taccgl.mi44MulV(newtm,[1,0,0,0]);
	    var inclO=taccgl.vInclinationYZ(vO[0],vO[1],vO[2]);
	    taccgl.tlog("InclinationO="+inclO);
	    */
	    // var az=ea.yaw, incl=ea.pitch, inclO=ea.roll;

	    
	    if ((this.minPitch<=ea.pitch && ea.pitch<=this.maxPitch) &&
	        (this.minRoll<=ea.roll && ea.roll<=this.maxRoll) &&
		(this.minYaw<=ea.yaw && ea.yaw<=this.maxYaw))
		taccgl.setTM(newtm);
	    else {
		if (taccgl_debug) {
		    taccgl.tlog('Recalc Matrix');
		} // taccgl_debug_end
		ea.pitch = taccgl.clamp (ea.pitch, this.minPitch, this.maxPitch);
		ea.roll  = taccgl.clamp (ea.roll, this.minRoll, this.maxRoll);
		ea.yaw   = taccgl.clamp (ea.yaw, this.minYaw, this.maxYaw);

		// var S = taccgl.m33FromSpherical (1,az,incl,inclO);

		// ea.pitch=ea.roll=0;

		var S = taccgl.m33FromEulerAngles (ea);
		if (!this.isactive) S=taccgl.mi33T(S);
		/* var t = taccgl.m44TransV (newtm);
		var c = [this.rcx,this.rcy,this.rcz,1];
		var R = taccgl.m33FromM44(newtm);
		var Ri= taccgl.m33Inverse(R);
		taccgl.tlog("R=\n"+taccgl.m33ToString(R)+"\nRi="+taccgl.m33ToString(Ri));
		taccgl.tlog("C="+taccgl.vToString(c)+"\nnewtm*c="+taccgl.vToString(taccgl.mi44MulV(newtm,c)));
		
		// Formula 1: solve equation RC+T=SC+T' does not work after moving
		// taccgl.viAdd(t, taccgl.viSub( taccgl.mi33MulV(taccgl.m33FromM44(newtm),[rcx,rcy,rcz]) , taccgl.mi33MulV(S,[rcx,rcy,rcz])));

	 	var s = taccgl.mi33MulV(S,taccgl.mi33MulV(Ri,t));
		s=taccgl.viSub(s, taccgl.mi33MulV(S,taccgl.mi33MulV(Ri,c)));
		s=taccgl.viAdd(s, c); */

		var c = [this.rcx,this.rcy,this.rcz,1];
		var IMi = taccgl.mAffInverse (this.IM);
		var u = taccgl.mi44MulV(IMi,c);
		var s = c.slice();
		taccgl.viSub(s,taccgl.mi33MulV(S,u));
		
		
                // S=taccgl.m33I();
		// t=[0,0,0];
	        // taccgl.setTM ( taccgl.m44FromM33VT (taccgl.mi33T(S), s));
	        taccgl.setTM (taccgl.m44FromM33(S, s));
	    }
	    if (taccgl_debug) {
    		taccgl.tlog("taccgl.TM=\n"+taccgl.m44ToString(taccgl.TM));
	    } // taccgl_debug_end
	    
	    // showControlTM();
	}	
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
    }
    this.tronmouseup=function(e){
	this.button=0;
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
	
    }
    this.tronclick=function(e){
        var dX=e.clientX-this.cX, dY=e.clientY-this.cY;
	if (dX==0&&dY==0) this.doexit();
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
    }

    this.applyTM = function(m){
	taccgl.tlog("taccgl.TM before =\n"+taccgl.m44ToString(taccgl.TM));
	taccgl.applyTM(m);
	taccgl.tlog("taccgl.TM after \n"+taccgl.m44ToString(taccgl.TM));
    }

    this.tronkeypress=function(e){
	var c=event.charCode;
	var s=String.fromCharCode(c);
	taccgl.tlog("Transformcontroller onkeypress "+c+" "+s);
	if (s=="w") {
	    this.applyTM ( taccgl.m44Translation (0,0,-200) ); 
	} else if (s=="s") {
	    this.applyTM ( taccgl.m44Translation (0,0,200) ); 
	} else if (s=="a") {
	    this.applyTM ( taccgl.m44Translation (-2,0,0) ); 
	} else if (s=="d") {
	    this.applyTM ( taccgl.m44Translation (2,0,0) ); 
	} else if (s=="q") {
	    this.applyTM ( taccgl.m44Translation (0,-2,0) ); 
	} else if (s=="e") {
	    this.applyTM ( taccgl.m44Translation (0,2,0) ); 
	} else if (s=="i") {
	    this.applyTM ( taccgl.m44Translation (0,0,-2) ); 
	} else if (s=="k") {
	    this.applyTM ( taccgl.m44Translation (0,0,2) ); 
	} else if (s=="j") {
	    this.applyTM ( taccgl.m44Translation (-2,0,0) ); 
	} else if (s=="l") {
	    this.applyTM ( taccgl.m44Translation (2,0,0) ); 
	} else if (s=="r") {
	    var e=taccgl.stdEye;
	    e.setPos(e.eyeX, e.eyeY, e.eyeZ+2);
	} else if (s=="f") {
	    var e=taccgl.stdEye;
	    e.setPos(e.eyeX, e.eyeY, e.eyeZ-2);
        } else if (s=="R") {
	    taccgl.TM= taccgl.m44IConst.slice();
        } else if (s=="+") {
	    // var t=taccgl.m33FromM44(taccgl.TM); taccgl.miMulS (t, 1.1);  taccgl.setTM (taccgl.m44FromM33VT(t, taccgl.m44TransVT(taccgl.TM)));
	    this.applyTM ( taccgl.m44FromM33C (taccgl.miMulS (taccgl.m33I(), 1.1), [this.rcx,this.rcy,this.rcz]));
        } else if (s=="-") {
	    // var t=taccgl.m33FromM44(taccgl.TM); taccgl.miMulS (t, 1/1.1);  taccgl.setTM (taccgl.m44FromM33VT(t, taccgl.m44TransVT(taccgl.TM)));
	    this.applyTM ( taccgl.m44FromM33C (taccgl.miMulS (taccgl.m33I(), 1/1.1), [this.rcx,this.rcy,this.rcz]));
	    
        } else if (s=="I") {
	    taccgl.tlog("taccgl.TM=\n"+taccgl.m44ToString(taccgl.TM));
	    var v= taccgl.mi44MulV(taccgl.TM,[0,0,-1,0]);
	    taccgl.tlog("viewDirection="+taccgl.vToString(v));
//	    taccgl.tlog("Inclination="+taccgl.vInclinationYZ(v[0],v[1],v[2]));
//	    taccgl.tlog("Azimuth="+taccgl.vAzimuthYZ(v[0],v[1],v[2]));
	}
	else
	    return true;
	if (e.preventDefault) e.preventDefault();
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	e.cancelBubble=true;
	return false;
//	taccgl.tlog("controller.TM=\n"+taccgl.m44ToString(this.TM));
//	var IM=taccgl.mi44T(taccgl.TM.slice());
//	taccgl.setTM(  taccgl.mi44T(taccgl.mi44Mul(this.TM.slice(),IM)) );
//        this.applyTM (this.TM);
//	taccgl.tlog("taccgl.TM=\n"+taccgl.m44ToString(taccgl.TM));
    }
    this.tronkeydown=function(e){
	var c=event.charCode;
	var s=String.fromCharCode(c);
	taccgl.tlog("Transformcontroller onkeydown "+c+" "+s);
	if (s=="w") {
//	    this.TM= taccgl.m44Translation (0,0,-20); 
	}
    }
    this.tronkeyup=function(e){
	var c=event.charCode;
	var s=String.fromCharCode(c);
	taccgl.tlog("Transformcontroller onkeyup "+c+" "+s);
	if (s=="w") {
//	    this.TM= taccgl.m44Translation (0,0,-20); 
	}
    }

    this.doexit = function(){
	this.nextController=taccgl.previousController; 
	taccgl.doHook (this.onTerm)
	if (this.nextController) taccgl.useController(this.nextController);
    }
    this.onTerm = null;
}

taccglTransformControllerPrototype.prototype=taccglForwardingControllerPrototype.prototype;
taccgl.createTransformController = function() { this.init(); }
taccgl.createTransformController.prototype=new taccglTransformControllerPrototype();
taccgl.transformController = function() {return new this.createTransformController();}

//
// taccgl Job Scheduler
// Schedules jobs for painting
// jobs may be dependent on other jobs finishing first (waitFor)
// jobScheduleAll performs all jobs that are ready to go (not waiting)
//     including any jobs that become ready by performing other jobs before
// jobs have a waitcnt counting on how many events the job waits
// decWait is called when such an event occured and if waitcnt becomes 0
// the jobs gets into the jobsReady queue

function taccglJobPrototype ()
{
    this.init = function (f,p1,p2,p3) {
	this.waitcnt=0;
	this.f=f; this.p1=p1; this.p2=p2; this.p3=p3;
    }
    this.doJob = function () { 
	var i;
	this.f(this.p1, this.p2, this.p3); 
	if (this.succ) {
	    for (i=0; i<this.succ.length; i++) { this.succ[i].decWait(); }
	}
    }
    this.waitFor = function (j) {
	if (!j.succ) j.succ=Array(0);
	j.succ.push(this); this.incWait();
    }
    this.incWait = function () { this.waitcnt++};
    this.decWait = function () {
	this.waitcnt --;
	if (taccgl_debug) {
	    if (this.waitcnt < 0 ) alert ("WAIT < 0");
	} // taccgl_debug_end
	if (this.waitcnt==0) taccgl.jobsReady.push(this);
    }
}
taccgl.createJob = function (f,p1,p2,p3) {this.init(f,p1,p2,p3);}
taccgl.createJob.prototype = new  taccglJobPrototype ();
taccgl.newJob = function (f,p1,p2,p3) {return new this.createJob(f,p1,p2,p3);}
taccgl.jobsReady = Array(0);
taccgl.jobSchedule = function () {
    if (taccgl.jobsReady.length>0) {
	var j=taccgl.jobsReady[0];
	taccgl.jobsReady= taccgl.jobsReady.slice(1);
	j.doJob();
    }
}
taccgl.jobScheduleAll = function() {
    while (taccgl.jobsReady.length>0) taccgl.jobSchedule();
}
