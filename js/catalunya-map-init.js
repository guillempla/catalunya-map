/**
 * Catalunya 2015 - Open Source Catalunya Map
 * 
 * Author : Enric Ballo
 * 
 */
 
$(function () {

    //---------------------------    
    // Configuration values
    //---------------------------
    
    var softBrown = '#c7ab89';  //color for the limit line of comarca (clear brown)
    var darkBrown = '#a07a49';  //color for the text of comarca (dark brown)
    var softGrey  = '#fee8cb';
    
    var colorIn  = softGrey;   //color when the mouse is over
    var colorOut = '#fff';      //color when the mouse is not over

    var scale    = 0.8;         //scale value

    var mapInitWidth  = 825;    //initial map width
    var mapInitHeight = 800;    //initial map height

    var textInitWidth = 250;     //initial text width

    var mapWidth  = mapInitWidth;  //map width variable
    var mapHeight = mapInitHeight; //map height variable

    var debug      = false;       //enable/disable debug mode
    var responsive = true;
    var useText    = true;

    var onClick = false;         //enable/disable onclick open link
    var newWindow = false;       //enable/disable open a page in a new window for onClick functionality
    
    var comarcaAttr = {          //comarca style configuration
        fill : colorOut,         
        stroke : softBrown,      
        'stroke-width' : 0.8,
        'stroke-linejoin' : 'round',
        'font-family': 'Verdana',
        'font-size': '19px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'z-index' : 10
    };

    var nomComcarcaAttr_in = {      //nom comarca style configuration for hover in
        fill : darkBrown,           
        stroke : '#000000',         //black
        'stroke-width' : 0.4,
        'font-family': 'Verdana',
        'font-size': '12px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'z-index' : 20
    };

    var nomComcarcaAttr_out = {      //nom comarca style configuration for hover out
        fill : darkBrown,            
        'stroke-width' : 0,
        'font-family': 'Verdana',
        'font-size': '12px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'z-index' : 20
    };

    var nomCapitalAttr = {       //nom capital comarca style configuration
       fill : '#FF9900',         //orange
       "font-family": "Arial, sans-serif",
       "font-size": "10px",
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
        if(debug){
            console.log('createArrayComarcas ...');
        }
        
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
        mcat.cat42 = paper.set();
    }
    
     /**
     * Function that create a text list of all the comarques
     * 
     */
    function createLlistaComarques(){
        if(debug){
            console.log('create llista comarques ...');
        }
        
        var llistaComarques =[];
        for (var comarca in mappaths) {
            llistaComarques.push({ name: mappaths[comarca].name, url:mappaths[comarca].url });
        }
        
        // Order the list by name
        llistaComarques = llistaComarques.sort(function (a, b) {
            return a.name.localeCompare( b.name );
        });
        
        // Create list with bootstrap styles
        for(i=0;i<llistaComarques.length;i++){
          $("<li class='list-group-item'><a href='"+llistaComarques[i].url+"' class='list-group-item'>"+llistaComarques[i].name+"</a></li>").appendTo("ul.list");
        }
    }

    /**
     * Function that create the map based in the mappaths array
     * 
     * @param  {[type]} paper [the raphaelJs paper object]
     * 
     */
    function createMap(paper) {
        if(debug){
            console.log('CreateMap ...');
        }
        
        var i = 0;
        for (var comarca in mappaths) {

            //Create obj
            obj = mcat[comarca];

            // raphael object
            // object 0 (the map)
            obj.push(paper.path(mappaths[comarca].path).attr(comarcaAttr));
            obj.animate({transform: "t0,-200"});
            
            // object 1 and 2 (comarca name / capital comarca name)
            obj.push(paper.text(mappaths[comarca].nx, mappaths[comarca].ny, mappaths[comarca].name).attr(nomComcarcaAttr_out));
            obj.push(paper.text(mappaths[comarca].cx, mappaths[comarca].cy, mappaths[comarca].capital).attr(nomCapitalAttr));

            obj[0].comarcaName = mappaths[comarca].name;
            obj[1].comarcaName = mappaths[comarca].name;
            obj[2].comarcaName = mappaths[comarca].name;

            obj[0].contentText = mappaths[comarca].info;
            obj[1].contentText = mappaths[comarca].info;
            obj[2].contentText = mappaths[comarca].info;

            obj[0].comarcaLink = mappaths[comarca].url;
            obj[1].comarcaLink = mappaths[comarca].url;
            obj[2].comarcaLink = mappaths[comarca].url;

            obj[0].node.id = i;
            obj[0].toBack();
            
            obj[1].toFront();
            obj[2].toFront();

            //Initial status hiden
            obj[1].hide();
            obj[2].hide();

            // Change the color of each comarca animation hover event
            obj.hover(hoverIn, hoverOut, obj, obj);

            if(useText){
                // on click event
                obj[0].click(function(){
                    var comarcaName = this.comarcaName;
                    var contentText = this.contentText;
                    var comarcaLink = this.comarcaLink;
                    onMapClick(comarcaName, contentText, comarcaLink);
                });

                obj[1].click(function(){
                    var comarcaName = this.comarcaName;
                    var contentText = this.contentText;
                    var comarcaLink = this.comarcaLink;
                    onMapClick(comarcaName, contentText, comarcaLink);
                });

                obj[2].click(function(){
                    var comarcaName = this.comarcaName;
                    var contentText = this.contentText;
                    var comarcaLink = this.comarcaLink;
                    onMapClick(comarcaName, contentText, comarcaLink);
                });

                obj[0].touchstart(function(){
                    var comarcaName = this.comarcaName;
                    var contentText = this.contentText;
                    var comarcaLink = this.comarcaLink;
                    onMapClick(comarcaName, contentText, comarcaLink);
                });

                obj[1].touchstart(function(){
                    var comarcaName = this.comarcaName;
                    var contentText = this.contentText;
                    var comarcaLink = this.comarcaLink;
                    onMapClick(comarcaName, contentText, comarcaLink);
                }); 

                obj[2].touchstart(function(){
                    var comarcaName = this.comarcaName;
                    var contentText = this.contentText;
                    var comarcaLink = this.comarcaLink;
                    onMapClick(comarcaName, contentText, comarcaLink);
                });
            }

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
     * On Map click show the information text
     * @return {[type]} [description]
     */
    function onMapClick(comarcaName, contentText, comarcaLink){
        if(onClick){
            //console.log(comarcaLink);
            if(newWindow){
                window.open(comarcaLink);
            }else{
                window.location=comarcaLink;
            }
        }else{
            $('#comarcaName').html('<h1>' + comarcaName + '</h1>');
            $('#contentText').html(contentText);
        }
    }

    /**
     * hoverIn 
     * @return {[type]} [description]
     */
    function hoverIn() {

        this[0].animate({ fill : colorIn }, 100);       
        this[1].attr(nomComcarcaAttr_in);
        this[2].show();

    }

    /**
     * hoverOut
     * @return {[type]} [description]
     */
    function hoverOut() {

        this[0].animate({ fill : colorOut }, 100);
        this[1].attr(nomComcarcaAttr_out);
        this[2].hide();
    }

    /**
     * resize the map on change
     * 
     * @param  {[type]} paper [the raphaelJs paper object]
     * 
     */
    function resizeMap(paper){
        if(debug){
            console.log('resizeMap ...');
        }
        
        paper.changeSize(mapWidth, mapHeight, true, false);
        if(debug){
            console.log('resize map with : ' + mapWidth + ' height : ' + mapHeight);
        }
        
        $(".map").css({
            'width': mapWidth + 'px',
            'height': mapHeight + 'px'
        });

        $(".mapWrapper").css({
            'width': mapWidth + textInitWidth + 'px',
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
        if(debug){
            console.log('responsiveResize ...');
        }
        
        winWidth = win.width();
        
        if (winWidth >= 960) {
            if(debug){
                console.log('WindowWith > 960');
            }
            hideListShowMap();
            
            mapWidth = mapInitWidth * 0.8;
            mapHeight = mapInitHeight * 0.8;
            paper.scaleAll(scale);
            resizeMap(paper);
            
        }
        else if (winWidth < 960 && winWidth >= 768) {
            if(debug){
                console.log('768 =< WindowWith < 960 ');
            }
            hideMapShowList();
            
            //mapWidth =  mapInitWidth;
            //mapHeight = mapWidth/ratio;
            //paper.scaleAll(scale/2);
            //resizeMap(paper);

        }
        else if (winWidth < 768 && winWidth >= 480) {
            if(debug){
                console.log('480 =< WindowWith < 768 ');
            }
            
            //mapWidth = mapInitWidth;
            //mapHeight = mapWidth/ratio;
            //resizeMap(paper);
            
            hideMapShowList();
        }
        else if (winWidth < 480) {
            if(debug){
                console.log('480 < WindowWith');
            }
            
            //mapWidth = mapInitWidth /2;
            //mapHeight = mapWidth/ratio;
            //resizeMap(paper);
            
            hideMapShowList();

        }

        showValues();
    }
    
    function hideMapShowList(){
        $('.mapWrapper').hide();
        $('.llistaComarques').show();
    }
    
    function hideListShowMap(){
        $('.llistaComarques').hide();
        $('.mapWrapper').show();
    }

    /**
     * Debug porpouse function
     * @return {[type]} [description]
     */
    function showValues(){
        if(debug){
            console.log('showValues ...');
            console.log("Win Width: " + winWidth + " Map with: " + mapWidth + " Map Height: " + mapHeight + " Ratio: " + ratio);
            $("#debugInfo").html("Win Width: " + winWidth + " Map with: " + mapWidth + " Map Height: " + mapHeight + " Ratio: " + ratio);
        }
    }

    /**
     * Load the map and the text 
     * @return {[type]} [description]
     */
    function loadMapAndText() {
        if(debug){
            console.log('loadMapAndText ...');
            console.log('Create map with : ' + mapWidth + ' height : ' + mapHeight);
        }
        
        paper = new ScaleRaphael('map', mapWidth, mapHeight);

        //apply the scale value
        if(debug){
            console.log('scale map : ' + scale);
        }
        
        paper.scaleAll(scale);

        oMapWidth = mapWidth;
        ratio = mapWidth/mapHeight;
        
        if(debug){
            console.log('ratio : ' + ratio);
        }

        win = $(window);
        winWidth = win.width();
        
        if(debug){
            console.log('Window With : ' + winWidth);
        }
        
        //create array
        createArrayComarcas();
        
        //create map
        createMap(paper);
        
        //create list
        createLlistaComarques();
        
    }

    //When the page is load call the loadMapAndText function
    window.onload  = loadMapAndText();

});