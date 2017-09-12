(function (document, window, $) {
    'use strict';

    $(document).ready(function () {
        Site.run();

        // fetch list of projects from the server
        var pr = DataService.loadCodeBook();
        pr.success( function( data ){
            console.log( "from server", data );
            var projectDropdownItemTemplate = $("#projectDropdownItemTemplate").html().trim();
            var projectDropdownOutlet = $("#projectDropdownOutlet");

            render( data[0].structure );
            for (var i = 0; i < data.length; i++) {
                var object = data[i];
                var newItem = $( projectDropdownItemTemplate );
                newItem.html( object.project.name );
                newItem.data( "test", "success" );
                projectDropdownOutlet.append( newItem );
            }

        });
        pr.error( function( err ){
            console.log( "server error", err );
        });
    });
})(document, window, jQuery);

function openProject( buttonElement ){
    console.log( buttonElement.dataset );
}

function render( projectStructure ){
    var domainTabsOutlet = $( "#domainTabs" );
    var panelsOutlet = $(".tab-content");
    domainTabsOutlet.empty();
    panelsOutlet.empty();
    /* Create Domain Tabs */
    var domainTabTemplate = $("#domainTab").html().trim();
    var domainBlockTemplate = $("#domain-block").html().trim();
    var variableTemplate = $("#variable").html().trim();

    for( var i = 0; i < projectStructure.length; i++ ){
        /* Create a domain tab */
        var domain = projectStructure[i];
        var name = domain.name;
        var icon = domain.icon;
        var key = domain._key;

        var newTab = $( domainTabTemplate );
        newTab.find(".domain-name").html( name );
        newTab.find("i").addClass( icon );
        newTab.attr("href", "#" + key );
        domainTabsOutlet.append( newTab );

        /* Create a domain block */
        var newBlock = $( domainBlockTemplate );
        newBlock.attr("id", key );
        panelsOutlet.append( newBlock );

        /* Fill the domain block with variable blocks */
        for( var j = 0; j < domain.variables.length; j++ ){
            var question = domain.variables[j];
            var qName = question.name;
            var qIcon = question.icon;
            var qKey = question._key;
            var qQuestion = question.question;
            var qTooltip = question.tooltip;

            var newVariable = $( variableTemplate );
            newVariable.find(".var-name").html( qName );
            newVariable.find(".icon").addClass( qIcon );
            newVariable.find(".panel-title").attr("href", "#" + qKey );
            newVariable.find(".panel-collapse").attr("id", qKey );
            newVariable.find(".panel-body").html( qQuestion + "<br><br>" + qTooltip );
            newBlock.find(".panel-group").append( newVariable );
        }
    }
}