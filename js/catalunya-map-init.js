/**
 * Catalunya 2015 - Open Source Map
 * 
 * Author : Enric Ballo
 * 
 */

$(function () {

    //---------------------------    
    // Configuration values
    //---------------------------
    var colorIn = '#d1eafe';     //color when the mouse is over
    var colorOut = '#fff';       //color when the mouse is not over
    var scale = 1.5;             //scale value

    var mapInitWidth=425;        //initial map width
    var mapInitHeight=400;       //initial map height

    var mapWidth=mapInitWidth;   //map width variable
    var mapHeight=mapInitHeight; //map height variable

    var debug = false;            //enable/disable debug mode
    var responsive = true;

    var comarcaAttr = {          //comarca style configuration
        fill : colorOut,
        stroke : '#abacae',
        'stroke-width' : 0.8,
        'stroke-linejoin' : 'round',
        'font-family': 'Verdana',
        'font-size': '19px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'z-index' : 10
    };

    var nomComcarcaAttr = {      //nom comarca style configuration 
        fill : '#000000',
        'font-family': 'Verdana',
        'font-size': '8px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'z-index' : 20
    };

    var nomCapitalAttr = {       //nom capital comarca style configuration
       fill : '#000000',
       "font-family": "Arial, sans-serif",
       "font-size": "8px",
       'cursor': 'pointer',
       'z-index': 30
   };

   //---------------------------

    var paper;
    var winWidth;
    var win;
    var obj;

    //Array of comarcas
    var mcat = {};

    /**
     * Create the Array of Comarcas
     */
    function createArrayComarcas(){

        console.log('createArrayComarcas ...');

        mcat.cat1 = paper.set();
        mcat.cat2 = paper.set();
        mcat.cat3 = paper.set();
        mcat.cat4 = paper.set();
        mcat.cat5 = paper.set();
        mcat.cat6 = paper.set();
        mcat.cat7 = paper.set();
        mcat.cat8 = paper.set();
        mcat.cat9 = paper.set();
        mcat.cat10 = paper.set();
        mcat.cat11 = paper.set();
        mcat.cat12 = paper.set();
        mcat.cat13 = paper.set();
        mcat.cat14 = paper.set();
        mcat.cat15 = paper.set();
        mcat.cat16 = paper.set();
        mcat.cat17 = paper.set();
        mcat.cat18 = paper.set();
        mcat.cat19 = paper.set();
        mcat.cat20 = paper.set();
        mcat.cat21 = paper.set();
        mcat.cat22 = paper.set();
        mcat.cat23 = paper.set();
        mcat.cat24 = paper.set();
        mcat.cat25 = paper.set();
        mcat.cat26 = paper.set();
        mcat.cat27 = paper.set();
        mcat.cat28 = paper.set();
        mcat.cat29 = paper.set();
        mcat.cat30 = paper.set();
        mcat.cat31 = paper.set();
        mcat.cat32 = paper.set();
        mcat.cat33 = paper.set();
        mcat.cat34 = paper.set();
        mcat.cat35 = paper.set();
        mcat.cat36 = paper.set();
        mcat.cat37 = paper.set();
        mcat.cat38 = paper.set();
        mcat.cat39 = paper.set();
        mcat.cat40 = paper.set();
        mcat.cat41 = paper.set();
    }

    /**
     * Function that create the map based in the mappaths array
     * 
     * @param  {[type]} paper [the raphaelJs paper object]
     * 
     */
    function createMap(paper) {

        console.log('CreateMap ...');

        createArrayComarcas();
        
        var i = 0;
        for (var comarca in mappaths) {

            //Create obj
            obj = mcat[comarca];

            // raphael object
            // object 0 (the map)
            obj.push(paper.path(mappaths[comarca].path).attr(comarcaAttr));
            
            // object 1 and 2 (comarca name / capital comarca name)
            obj.push(paper.text(mappaths[comarca].nx/scale, mappaths[comarca].ny/scale, mappaths[comarca].name).attr(nomComcarcaAttr));
            obj.push(paper.text(mappaths[comarca].cx/scale, mappaths[comarca].cy/scale, mappaths[comarca].capital).attr(nomCapitalAttr));

            obj[0].node.id = i;
            obj[0].toBack();
            
            obj[1].toFront();
            obj[1].toFront();

            //Initial status hiden
            obj[1].hide();
            obj[2].hide();

            // Change the color of each comarca animation hover event
            obj.hover(hoverIn, hoverOut, obj, obj);

            i++;
        }

        if(responsive){
            responsiveResize();
            $(window).resize(function() {
                responsiveResize();
            });
        }
        else{
            resizeMap(paper);
        }

    }

    /**
     * hoverIn 
     * @return {[type]} [description]
     */
    function hoverIn() {

        this[0].animate({ fill : colorIn }, 100);
        //this[1].show();
        this[2].show();

    }

    /**
     * hoverOut
     * @return {[type]} [description]
     */
    function hoverOut() {

        this[0].animate({ fill : comarcaAttr.fill }, 100);
        //this[1].hide();
        this[2].hide();

    }

    /**
     * resize the map on change
     * 
     * @param  {[type]} paper [the raphaelJs paper object]
     * 
     */
    function resizeMap(paper){

        console.log('resizeMap ...');

        paper.changeSize(mapWidth, mapHeight, true, false);
        console.log('resize map with : ' + mapWidth + ' height : ' + mapHeight);

        $(".map").css({
            'width': mapWidth + 'px',
            'height': mapHeight + 'px'
        });

        $(".mapWrapper").css({
            'width': mapWidth + 'px',
            'height': mapHeight + 'px'
        });

        //On mouse enter show comarca name
        $('.mapWrapper').mouseenter(function() {
            showComarcaName();
        });

        //On mouse leave hide comarca name
        $('.mapWrapper').mouseleave(function() {
            hideComarcaName();
        });

    }

    /**
     * show comarca name
     * @return {[type]} [description]
     */
    function showComarcaName(){
        for (var comarca in mappaths) {
                //Create obj
                obj = mcat[comarca];
                obj[1].show();
        }
    }

    /**
     * hide comarca name
     * @return {[type]} [description]
     */
    function hideComarcaName(){
        for (var comarca in mappaths) {
            //Create obj
            obj = mcat[comarca];
            obj[1].hide();
        }
    }

    /**
     * Map Responsive Resize
     * @return {[type]} [description]
     */
    function responsiveResize(){
        console.log('responsiveResize ...');

        winWidth = win.width();
        
        if (winWidth >= 960) {
            console.log('WindowWith > 960');
            
            mapWidth = mapInitWidth * 1.5;
            mapHeight = mapInitHeight * 1.5;
            paper.scaleAll(scale);
            resizeMap(paper);
            
        }
        else if (winWidth < 960 && winWidth >= 768) {
            console.log('768 =< WindowWith < 960 ');

            mapWidth =  mapInitWidth;
            mapHeight = mapWidth/ratio;
            paper.scaleAll(scale/2);
            resizeMap(paper);

        }
        else if (winWidth < 768 && winWidth >= 480) {
            console.log('480 =< WindowWith < 768 ');

            mapWidth = mapInitWidth;
            mapHeight = mapWidth/ratio;
            resizeMap(paper);
        }
        else if (winWidth < 480) {
            console.log('480 < WindowWith');

            mapWidth = mapInitWidth /2;
            mapHeight = mapWidth/ratio;
            resizeMap(paper);

        }

        showValues();
    }

    /**
     * Debug porpouse function
     * @return {[type]} [description]
     */
    function showValues(){
        console.log('showValues ...');
        console.log("Win Width: " + winWidth + " Map with: " + mapWidth + " Map Height: " + mapHeight + " Ratio: " + ratio);
        
        if(debug){
            $("#debugInfo").html("Win Width: " + winWidth + " Map with: " + mapWidth + " Map Height: " + mapHeight + " Ratio: " + ratio);
        }
    }

    /**
     * Load the map and the text 
     * @return {[type]} [description]
     */
    function loadMapAndText() {

        console.log('loadMapAndText ...');
        console.log('Create map with : ' + mapWidth + ' height : ' + mapHeight);

        paper = new ScaleRaphael('map', mapWidth, mapHeight);

        //apply the scale value
        console.log('scale map : ' + scale);
        paper.scaleAll(scale);

        oMapWidth = mapWidth;
        ratio = mapWidth/mapHeight;
        console.log('ratio : ' + ratio);

        win = $(window);
        winWidth = win.width();
        console.log('Window With : ' + winWidth);

        createMap(paper);
    }

    //When the page is load call the loadMapAndText function
    window.onload  = loadMapAndText();

});