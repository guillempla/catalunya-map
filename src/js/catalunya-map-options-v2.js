//---------------------------
// Configuration values
//---------------------------

(function(window, catmap) {

    catmap.URL_JSON = "https://localhost:3000/assets/js/catalunya-map-path.json";

    catmap.MAP_OPTIONS = {

        colorIn: '#fee8cb', //color when the mouse is over
        colorOut: '#fff', //color when the mouse is not over

        scale: 0.8, //scale value

        mapInitWidth: 825, //initial map width
        mapInitHeight: 800, //initial map height

        textInitWidth: 250, //initial text width

        mapWidth: 825, //map width variable
        mapHeight: 800, //map height variable

        debug: false, //enable/disable debug mode
        responsive: true, //enable/disable responsive funcionality
        useText: true, //enable/disable list text comarques

        button: false, //enable/disable button functionality

        //if no button functionality
        onClick: false, //enable/disable onclick open link
        newWindow: false, //enable/disable open a page in a new window for onClick functionality

        comarcaAttr: { //comarca style configuration
            //fill: 'url(assets/images/natural_paper.png)',
            fill: '#fff',
            stroke: '#c7ab89', //color for the limit line of comarca (clear brown)
            'stroke-width': 0.8,
            'stroke-linejoin': 'round',
            'font-family': 'Droid Sans,Verdana',
            'font-size': '19px',
            'font-weight': 'bold',
            'cursor': 'pointer',
            'z-index': 10
        },

        nomComcarcaAttr_in: { //nom comarca style configuration for hover in
            fill: '#a07a49', //color for the text of comarca (dark brown)
            stroke: '#000000', //black
            'stroke-width': 0.4,
            'font-family': 'Droid Sans,Verdana',
            'font-size': '14px',
            'font-weight': 'bold',
            'cursor': 'pointer',
            'z-index': 20
        },

        nomComcarcaAttr_out: { //nom comarca style configuration for hover out
            fill: '#a07a49',
            'stroke-width': 0,
            'font-family': 'Droid Sans,Verdana',
            'font-size': '14px',
            'font-weight': 'bold',
            'cursor': 'pointer',
            'z-index': 20
        },

        nomCapitalAttr: { //nom capital comarca style configuration
            fill: '#FF9900', //orange
            "font-family": "Droid Sans, Arial, sans-serif",
            "font-size": "12px",
            'font-weight': 'bold',
            'cursor': 'pointer',
            'z-index': 30
        }
    };

}(window, window.Catmap || (window.Catmap = {})));
