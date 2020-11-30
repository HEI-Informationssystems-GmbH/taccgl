# taccGL

javaScript library to add 2D and 3D graphics to CSS/HTML web pages via WebGL, https://www.taccgl.org.

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Impressum](#impressum)

## Features
taccGL turns classical HTML/CSS text pages into 3D scenes by
- adding 3D objects that share lighting, hidden surface elimination, and shadows with HTML elements (https://www.taccgl.org/blog/HTMLpages-with-3D-objects.html),
- positioning 3D objects in relation to responsive HTML elements using the HTML coordinate system, (https://www.taccgl.org/blog/css_transition_display.html),
- animation of HTML elements (mapped on 3D objects) with webGL, (https://www.taccgl.org/blog/deforming-morphing-HTML.html, https://www.taccgl.org/blog/css-transition-visibility.html)
- parallax scroll, large virtual 3D canvas of a complete scrolling web page, (https://www.taccgl.org/blog/parallax-scrolling.html)
- automatic feature degradation to work on most devices, 2D canvas fall back,

- a simple fluent interface for CSS/HTML/javaScript developers

## Usage

After [Installation](#Installation) on your web site include the library into your web pages using 
```
<script src="/taccgl062/taccgl.js"></script>
```

### Rotation Example
Use the following javascript code to make the HTML element with `id="firstdiv"` spin for 5 seconds.  
```
taccgl.actor('firstdiv') . rotateMiddle(1,0,0) . duration(5). start();
taccgl.start();
```
In fact this creates a rectangle in 3D space, maps the HTML element "firstdiv" thereon as a texture
and displays it with HTML 3D canvas, i.e. WebGL.
See the tutorial page https://www.taccgl.org/tutorial/firstExample.html for a more detailed description 
of this example.

### 3D Model with mapped HTML Example
The following code reads a 3D model file created with a 3D modelling program (e.g. blender) and displays 
that 3D model hovering over the HTML element with `id="pinned"` rotating for 5 seconds. 
The 3D model is resized to match the width of the HTML element and positioned in the middle of it.
If the model contains a material named HTML the HTML element is mapped on the 3D element.

```
var modelfile=taccgl. objFile().read('/objtest/roundcube/roundcube1.obj',false);
taccgl.actor("pinned",modelfile.scene()) .modFit("mmm","x") .dur(5).rotateMiddle(2,1,2) .bgColor("yellow") .start();
```
See the tutorial page https://www.taccgl.org/tutorial/HTML-CSS-textures-on-3D-Models.html for details.

### Splintering HTML element Example
The following 3rd example shows a splintering animation of the HTML element 'thisbox'. It cuts the HTML element
into 24x24 rectangles and programs each to fly to a random location with a negative accelaration. 
```
taccgl.ma('thisbox'). paint() . hide() . visFinal() . showbefore() . 
    sliceH(24) . sliceV(24) . alpha(1,‑0.3). dur(2) .
    mp ( t=>{
       t . to({ox:2000*Math.random()‑1000,oy:2000*Math.random()‑1000}) . posZ(0,‑4000) .vEnd(0,0,0)
    }) . start();
```
See the tutorial page https://www.taccgl.org/tutorial/firstExample.html.

## Documentation
Tutorial : https://www.taccgl.org/tutorial \
Manual : https://www.taccgl.org/developer_doc \
Blog : https://www.taccgl.org/blog

## Limitations
taccGL converts CSS formatted HTML elements into images which are then used a textures for 3D surfaces. 
This process covers big parts of HTML / CSS but does not cover HTML / CSS completely, e.g. no form elements or taken link colors.

taccGL is based on WebGL i.e. HMTL 5 canvas 3D. Most browsers do support this. Performance however is heavily
dependant on the graphics hardware (GPU) used and on the number of pixels displayed. taccGL detects slow
animations and disables features e.g. shadows if required. As a last resort it disables WebGL and used
HTML 5 canvas 2D instead. In this mode however not all features are available.

See https://www.taccgl.org/developer_doc/Restrictions.html for details. 

## Warnings

### Beta Software

This is BETA Software and known to contain bugs. It is probably
not implemented completely and will probably not run on all
browsers and client computers. It will switch off itself on
certain client computers and browsers. In addition some client
computers might run animations slowly, animations may appear
choppy or jumpy, or even client computers might get overloaded or
even crash. 



###   M E D I C A L     W A R N I N G   
Note that taccgl allows you to add fast flashing and video game like animations to web pages. A small percentage of 
the population may experience epileptic symptoms when exposed to such animations. You might want to, or you may even 
be required to, add / show an epileptic warning message on your web site before showing such animations and you might 
want to or you may even be required to avoid certain types of animations on your web site. Please protect yourself 
when programming animations and protect the users of your web site and take the following warning message seriously:  
 
EPILEPSY WARNING, READ BEFORE VIEWING THE FOLLOWING ANIMATIONS,                                                      
BEFORE USING A VIDEO GAME SYSTEM, BEFORE PROGRAMMING, WATCHING AND PUTTING ANIMATIONS ONLINE                         
                                                                                                                          
MEDICAL RESEARCH INDICATES A SMALL PERCENTAGE OF THE POPULATION MAY EXPERIENCE EPILEPTIC SEIZURES OR SEIZURE-LIKE     
SYMPTOMS  EXPOSED TO CERTAIN STIMULI, INCLUDING, WITHOUT LIMITATION, LIGHT PATTERNS, FLASHING LIGHTS OR CERTAIN       
PATTERNS OF BACKGROUND ON A TELEVISION SCREEN, OR VIDEO MONITOR. EXPOSURE TO THESE STIMULI WHILE PLAYING VIDEO GAMES  
OR WATCHING ANIMATIONS MAY INDUCE AN EPILEPTIC SEIZURE OR SEIZURE LIKE SYMPTOMS IN THESE INDIVIDUALS. CERTAIN         
CONDITIONS MAY INDUCE EPILEPTIC SYMPTOMS EVEN IN PERSONS WHO HAVE NO PRIOR HISTORY OF SEIZURES OF EPILEPSY. IF YOU    
EXPERIENCE ANY OF THE FOLLOWING SYMPTOMS WHILE PLAYING A VIDEO GAME OR WATCH ANIMATIONS --- DIZZINESS, ALTERED VISION,
EYE OR MUSCLE TWITCHES, LOSS OF AWARENESS, DISORIENTATION, AND INVOLUNTARZ MOVEMENT OR CONVULSIONS ---                
IMMEDIATELY DISCONTINUE USE AND CONSULT YOUR PHYSICAN BEFORE PLAY OR WATCHING ANIMATIONS.

There are guidelines from the W3C https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure.html



##  Installation

Download the zip file from https://www.taccgl.org/download.html and unpack it in the document
root of your private protected web server.
It contains a directory named `taccgl062`
with a compressed (`taccgl062/taccgl.js`) and an uncompressed version (`taccgl062/src/taccgl.js`) of the library,
some documentation, and  example files.
If you want to run it on a public web site see Installing the Library  (https://www.taccgl.org/InstallLibrary.html) for details.

Afterwards point your browser to `/taccgl062/index.html`.
On successful installation this shows some simple examples.


## Manual Installation by Downloading from GitHub

Alternatively to downloading the zip file from taccgl.org you can can get the library file `taccgl.js` directly from github and
put it into a directory named `taccgl062` of your web site. This is the uncompressed version of the library without examples.

You can also check out this repository or download the zip file from GitHub. Its content should be almost identical
to the zip file from taccgl.org, but it does not include a compressed version of the library. The head
of the library contains instructions on how to create the compressed version. Also the zip file from GitHub has
unix line endings while the zip file from taccgl.org has windows line endings.



## Impressum
This software package is provided by:

H.E.I. Informationssysteme GmbH\
Wimpfener Strasse 23\
68259 Mannheim\
Germany\
https://www.taccgl.org \
email: contact@taccgl.org \
Sales Tax ID: DE185233091\
HRB Mannheim 7273\
Geschäftssführer: Dr. Helmut Emmelmann\
Phone: +49 - 621 - 79 51 41\
Fax:   +49 - 621 - 79 51 61\
Email: contact@taccgl.org \


## Support
After consulting the FAQ https://www.taccgl.org/faq.html please send email to contact@taccgl.org

