// dlgMaster.js
// Copyright (c) 2018, Norman H. Strassner


// Callers:
// 1. create new dlgMaster object and fill in the details
// 2. if you need more buttons, use addButtons function and pass object to Daddbuttons
// 3. Fillsin openCB and closeCB functions ****

/* call example:
    var xxx = new dlgMaster();
    d.pgkkeys     = false;      // For keyboard keys: true if returning to package list, false if returning to review page
    d.modal       = true;        // True if modal
    d.resizable   = false;
    d.src         = "help";          // calling function
    d.title       = "Keyboard Shortcuts";
    d.markup      = html_string;
    d.width       = 450;
    d.height      = 500;
    d.topOffset   = 0;
    d.positionMy  = "left top";
    d.positionAt  = 0;
    d.collision   = none;
    d.posParent   = parent_element;
    d.btn1        = "Ok";         // Button 1 text
    d.btn2        = "Cancel";         // Button 2 text
    d.dfltbtn     = 1;      // 1 or 2 ( null || 0 || false === 1 )
    d.doitbtn     = 2;      // 1 (yes btn) or 2 (no btn)
    d.cbBtn1      = function() {};
    d.cbBtn2      = function() {};
    d.addbuttons  = Array of addButtons( Bid, Btext, Bbuttonclass, Bonclick );
    d.openCB      = Callback on open;
    d.closeCB     = Callback on close;
    d.exopenCB    = Additional open functions;
    d.excloseCB   = Additiona close functions;
    d.onFocus     = Callback on focus;
    d.
    d.muteButtons = Page buttons to 'mute';
};

*/

"use strict";

/* global reviewPageLoaded */


/*---------------------------------------------------------------*/
/* The Dialog Box */
var buttonCss = {'background-color' : '#337AB7', 'color': '#fff'};
var buttonCssHover = {'background-color' : '#286090'};
var dialogCLOSED;

var currentDialogBox=null;
var currentDialog=null;

dlgMaster.dialogWidth = 0;
dlgMaster.dialogLeft = 0;
dlgMaster.dialogTop = 0;

function messageBox( msg ) {
    var d = new dlgMaster( {
    src       : "messageboxW",
    title     : "Information",
    markup    : msg,
    width     : "auto",
    height    : "auto",
    btn1      : "Ok",
    btn2      : null,
    dfltbtn   : 1,
    doitbtn   : null,
    });
}

dlgMaster.theVersion = ".01";

/* Constructor */
function dlgMaster( options ) {
    dlgMaster.inst = dlgMaster.init(options);  
    currentDialogBox = dlgMaster.inst;
    return dlgMaster.inst;
}

dlgMaster.close = function() {
        //alert("closing");
        if( self.closeCB ) { self.closeCB(self); }
        $( "#theDialogBox" ).remove();
        //currentDialog=null;    
};

dlgMaster.prototype = {
	constructor : dlgMaster,

    version : function() {
        return this.theVersion;
    },
    
    testing : function() {
        return this.test();
    },
    
    close : function() { 
    
    },
    inst        : null,
    
};

/* */
// Data object for theDialogBox
dlgMaster.init = function ( options ) {
    this.pgkkeys     = (typeof options.pgkkeys    !== 'undefined') ? options.pgkkeys     : false;              // For keyboard keys: true if returning to package list, false if returning to review page
    this.modal       = (typeof options.modal      !== 'undefined') ? options.modal       : true;               // True if modal
    this.resizable   = (typeof options.resizable  !== 'undefined') ? options.resizable   : false;  
    this.src         = (typeof options.src        !== 'undefined') ? options.src         : "";                  // calling function
    this.title       = (typeof options.title      !== 'undefined') ? options.title       : "";  
    this.markup      = (typeof options.markup     !== 'undefined') ? options.markup      : "";  
    this.width       = (typeof options.width      !== 'undefined') ? options.width       : 400;  
    this.height      = (typeof options.height     !== 'undefined') ? options.height      : 200;  
    this.topOffset   = (typeof options.topOffset  !== 'undefined') ? options.topOffset   : 0;  
    this.positionMy  = (typeof options.positionMy !== 'undefined') ? options.positionMy  : "center top";  
    this.positionAt  = (typeof options.positionAt !== 'undefined') ? options.positionAt  : "center top";  
    this.collision   = (typeof options.collision  !== 'undefined') ? options.collision   : "none";  
    this.posParent   = (typeof options.posParent  !== 'undefined') ? options.posParent   : "#page";  
    this.btn1        = (typeof options.btn1       !== 'undefined') ? options.btn1        : "Ok";               // Button 1 text
    this.btn2        = (typeof options.btn2       !== 'undefined') ? options.btn2        : "Cancel";           // Button 2 text
    this.dfltbtn     = (typeof options.dfltbtn    !== 'undefined') ? options.dfltbtn     : 1;                  // 1 or 2 ( null || 0 || false !== 1 )
    this.doitbtn     = (typeof options.doitbtn    !== 'undefined') ? options.doitbtn     : 2;                  // 1 (yes btn) or 2 (no btn)
    this.cbBtn1      = (typeof options.cbBtn1     !== 'undefined') ? options.cbBtn1      : null;  
    this.cbBtn2      = (typeof options.cbBtn2     !== 'undefined') ? options.cbBtn2      : null;  
    this.addbuttons  = (typeof options.addbuttons !== 'undefined') ? options.addbuttons  : [];  
    this.openCB      = (typeof options.openCB     !== 'undefined') ? options.openCB      : null;  
    this.closeCB     = (typeof options.closeCB    !== 'undefined') ? options.closeCB     : null;  
    this.exopenCB    = (typeof options.exopenCB   !== 'undefined') ? options.exopenCB    : null;  
    this.excloseCB   = (typeof options.excloseCB  !== 'undefined') ? options.excloseCB   : null;  
    this.onFocus     = (typeof options.onFocus    !== 'undefined') ? options.onFocus     : null;      

    this.theDialog();
    return $("#theDialogBox").html(this.markup);
};

function addButtons( Bid, Btext, Bbuttonclass, Bonclick ) {
    var id          = Bid;
    var text        = Btext;
    var buttonclass = Bbuttonclass;
    var onclick     = Bonclick;
}

/* */
dlgMaster.theDialog = function() {
    self=this;
    //var elebase= ((this.posParent) ? $(this.posParent) : ($("#lbwrapper").length === 0) ? $("#page") : $("#lbwrapper"));
    $('<div id="theDialogBox" class="theDialogBox"style="overflow-y:auto"></div>').dialog({
        close: this.close,
        modal: this.modal,
        title: this.title,
        resizable: this.resizable,
        closeOnEscape: false,
        position: { my: this.positionMy, 
                    at: this.positionAt + this.topOffset, 
                    of: this.posParent,
                    collision: this.collision, 
                  },


        width: this.width ,
        height: this.height,
        dialogClass: this.src,
        show: {
            effect: 'fade',
            duration: 300,
        },
        hide: {
            effect: 'fade',
            duration: 300,
    },
        buttons: [
            {
                id: "cancel-button",
                text: this.btn1,
                "class" : "cancel " + ((this.dfltbtn === 1) ? "default " : " ") + ((this.doitbtn === 1) ? "yesbtn" : "nobtn"),
                click: function(){
                    if( self.cbBtn1 ) {
                        self.cbBtn1();
                    }
                    $( "#theDialogBox" ).dialog( "close" ).remove();
                }
            },
            {
                id: "ok-button",
                text: ((this.btn2) ? this.btn2: "OK"),
                "class" : ((this.dfltbtn === 2) ? "default " : " ") + ((this.doitbtn === 2) ? "yesbtn" : "nobtn"),
                click: function () {
                    var dt;
                    if( self.src === 'doctype') {
                        dt = $("#theDialogBox select").val();
                    } else if(self.src === 'multappend') {
                        dt = parseInt($("#theDialogBox #append-to").attr('row-data'));
                    }
                    if(self.cbBtn2) {
                        self.cbBtn2(dt);
                    }
                    $( "#theDialogBox" ).dialog( "close" ).dialog( "close" ).remove();
                }
            }
        ],

        open: function() {
            if( self.openCB ) {
                self.openCB(self);
            }

            $(this).parent().promise().done(function () {
                if(self.cbBtn1 === null) {
                    $("#theDialogBox #ok-button").css({display:'none'});
                }
                if(self.cbBtn2 === null) {

                }
                if( !self.modal ) {
                    var h = "<div id='dlg-xtra-btns' style='display:inline;float:right;margin-right: 10px;'>" +
                            "<img style='height:20px; width:20px;margin-top:2px;margin-right:10px;' class='move-window-icon'/>" +
                            "<input id='min-dlg' type=button onclick='dlgMaster.dialogMin();' style='height:20px; width:20px;margin-top:2px;margin-right:4px;' class='ui-icon ui-icon-minusthick'/>" +
                            "<input id='max-dlg' type=button onclick='dlgMaster.dialogMax();' style='height:20px; width:20px;margin-top:2px;margin-right:4px;' class='ui-icon ui-icon-newwin' disabled/>" +
                            "</div>";                    
                    $(".ui-dialog-titlebar").append(h);
                    $(".ui-dialog .ui-dialog-title").addClass('ui-dialog-title-75-width');
                }

 /*               var parentheight = $(self.posParent).outerHeight();// (reviewPageLoaded) ? $("#lbwrapper").outerHeight() :  $("#table-container #table-wrapper").outerHeight();
                if( $("#theDialogBox").outerHeight() > parentheight ) {
                    $("#theDialogBox").height(parentheight - 100);
                }
*/

                if( self.exopenCB) {self.exopenCB();}

                if( self.muteButtons ) {
                    $(self.muteButtons).prop("disabled", true).css("background-color", "#888" );  
                 }

            });

        },

        focus: function() {
            if( this.onFocus) {this.onFocus();}
        }
        
    });  //end confirm dialog

    if( self.addbuttons ) {
        var buttons = $('#theDialogBox').dialog("option", "buttons"); // getter
        $.each(self.addbuttons, function(i,v) {
                buttons.push({
                        id      : (v.id) ? v.id : self.makeid(8),
                        text    : v.text,
                        "class" : v.buttonclass,
                        click   : v.onclick
                    });
            });
        $('#theDialogBox').dialog("option", "buttons", buttons); // setter
    }

    if(!self.btn1) {
        $("#cancel-button").hide();
    }
    if(!self.btn2) {
        $("#ok-button").hide();
    }

    reStyleUibuttons();
};

/* */
dlgMaster.dialogMin = function() {
    $("#min-dlg").prop('disabled', true);
    $("#max-dlg").prop('disabled', false);
    
    this.dialogWidth = $(".ui-dialog").css('width');
    this.dialogLeft = $(".ui-dialog").css('left');
    this.dialogTop =  $(".ui-dialog").css('top');
    $("#theDialogBox").hide();
    $(".ui-dialog .ui-dialog-buttonpane").hide();
    $(".ui-dialog").css('top', parseInt(($('footer').css('top'))) - 42 + 'px');
    $(".ui-dialog").css('left', '0');
    $(".ui-dialog").css('width', 500);
};

/* */
dlgMaster.dialogMax = function() {
    $("#min-dlg").prop('disabled', false);
    $("#max-dlg").prop('disabled', true);
    $(".ui-dialog").css('width', this.dialogWidth);
    $(".ui-dialog").css('left', this.dialogLeft);
    $(".ui-dialog").css('top', this.dialogTop);
    $("#theDialogBox").show();    
    $(".ui-dialog .ui-dialog-buttonpane").show();
};

dlgMaster.test = function() {
    return "hello";
};

/* */
dlgMaster.makeid = function(l) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < l; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
/* */
function reStyleUibuttons() {
    $(".ui-dialog-buttonset .ui-button").css(buttonCss);
    $(".ui-dialog-buttonset .ui-button").off("mouseenter").on("mouseenter", function() {
            $( this ).css(buttonCssHover);
        });
    $(".ui-dialog-buttonset .ui-button").off("mouseleave").on("mouseleave", function() {
            $( this ).css(buttonCss);
        });
    $(".ui-dialog-buttonset .default").css('border', '2px solid #ccc');
}
