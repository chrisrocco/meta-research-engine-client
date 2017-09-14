/**
 * Created by Chris Rocco on 5/15/2017.
 */
angular.module("project-builder")
    .controller("ProjectBuilderController", ProjectBuilderController);

ProjectBuilderController.$inject = ['$scope'];
function ProjectBuilderController( $scope ){
    $scope.questionTypes = [
        {
            id: "text",
            name: "Text"
        },
        {
            id: "number",
            name: "Number"
        },
        {
            id: "boolean",
            name: "True | False"
        },
        {
            id: "range",
            name: "Range Slider"
        },
        {
            id: "select",
            name: "Multiple Choice"
        },
        {
            id: "multiselect",
            name: "Multi-Select"
        }
    ];

    /**
     * Business Logic
     * ========================
     */
    $scope.domains = [];
    $scope.questions = [];
    function createDomain( data ){
        $scope.domains.push( data );
    }
    function deleteDomain( domain ){
        for (var i = $scope.domains.length-1; i >= 0; i--) {
            if( $scope.domains[i].parent === domain.id ){
                $scope.domains[i] = domain.parent;
            }
        }
        for (var i = $scope.questions.length-1; i >= 0; i--) {
            var q = $scope.questions[i];
            if( q.parent == domain.id ){
                if( domain.parent === "#"){
                    deleteQuestion( q );
                    continue;
                }
                q.parent = domain.parent;
            }
        }
        var ind = $scope.domains.indexOf(domain);
        $scope.$apply(function(){
            $scope.domains.splice( ind, 1 );
        });
    }
    function createQuestion( data ){
        $scope.questions.push( data );
    }
    function deleteQuestion( question ){
        var ind = $scope.questions.indexOf(question);
        $scope.$apply(function(){
            $scope.questions.splice( ind, 1);
        });
    }

    /**
     * Action Handlers
     * =========================
     */
    $scope.handleEditDomain = handleEditDomain;
    $scope.handleEditQuestion = handleEditQuestion;
    $scope.handleDeleteDomain = handleDeleteDomain;
    $scope.handleDeleteQuestion = handleDeleteQuestion;
    $scope.handleCreateDomain = handleCreateDomain;
    $scope.handleCreateQuestion = handleCreateQuestion;
    function handleCreateDomain(){
        var newDomainObject = parseDomainForm();
        createDomain( newDomainObject );
        refresh();
    }
    function handleDeleteDomain( domain ){
        var msg = "This data cannot be recovered!";
        if( domain.parent === "#" ){
            msg = "This is root domain. All of its variables will be deleted!";
        } else {
            msg = "Questions and sub-domains will be moved to this domain's parent";
        }
        swal({
            title: "Are you sure?",
            text: msg,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function(){
            for (var i = $scope.domains.length-1; i >= 0; i--) {
                var obj = $scope.domains[i];
                if( obj.parent === domain.id ) obj.parent = domain.parent;
            }
            for (var i = $scope.questions.length-1; i >= 0; i--) {
                var q = $scope.questions[i];
                if( q.parent == domain.id ){
                    if( domain.parent === "#"){
                        deleteQuestion( q );
                        continue;
                    }
                    q.parent = domain.parent;
                }
            }
            deleteDomain( domain );
            refresh();
            swal("Deleted!", domain.name + " has been deleted.", "success");
        });
    }
    function handleCreateQuestion(){
        var newQuestionObject = parseQuestionForm();
        if( !newQuestionObject ) return;
        createQuestion( newQuestionObject );
        refresh();
    }
    function handleDeleteQuestion( question ){
        swal({
                title: "Are you sure?",
                text: "This data cannot be recovered!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function(){
                deleteQuestion( question );
                refresh();
                swal("Deleted!", question.name + " has been deleted.", "success");
            });
    }
    function handleEditDomain( domain ){

        $scope.modalDomain = domain;
        $("#editDomainModal").modal("show");
    }
    function handleEditQuestion( question ){
        $scope.modalQuestion = question;
        resetEditTokenField();
        loadEditTokenField( question );
        resetEditMultiselectTokenField();
        loadEditMultiselectTokenField( question );
        $("#editQuestionModal").modal("show");
    }

    /*
    * Event/Lifecycle Handlers
    * ==========================
    */
    function init(){

        window.scope = $scope;
        let promise = DataService.getProjectBuilderData( localStorage.projectKey );
        promise.success( function( data ){

            let structure = data.structure;
            if( structure ){
                $scope.$apply(function(){
                    $scope.domains = structure.domains;
                    $scope.questions = structure.questions;
                    $scope.project = data.project;
                });
            }
            renderTree();
        });

        $("#editDomainModal").on('hidden.bs.modal', function () {
            refresh()
        });
        $("#editQuestionModal").on('hidden.bs.modal', function () {
            refresh()
        });
        $(".tokenfield").tokenfield();
    }
    function refresh(){
        renderTree();
        save();
    }
    function renderTree(){
        var treeData = [];
        for (var i = 0; i < $scope.domains.length; i++) {
            var domain = $scope.domains[i];
            var node = {
                id          : domain.id,
                parent      : domain.parent,
                text        : domain.name,
                icon        : domain.icon,
                state       : {
                    opened    : true
                }
            };
            if( node.parent === "" ) node.parent = "#";
            treeData.push( node );
        }
        for (var i = 0; i < $scope.questions.length; i++) {
            var question = $scope.questions[i];
            var node = {
                id          : question.id,
                parent      : question.parent,
                text        : question.name,
                icon        : question.icon,
                state       : {
                    opened    : true
                }
            };
            if( node.parent === "" ) node.parent = "#";
            treeData.push( node );
        }
        $('#projectStructure').jstree(true).settings.core.data = treeData;
        $('#projectStructure').jstree(true).refresh();
    }
    function save(){
        var structure = {
            domains: $scope.domains,
            questions: $scope.questions
        };
        var req = {
            "structure": JSON.stringify( structure )
        };
        var promise = DataService.postProjectStructure( localStorage.projectKey, req );
        promise.success( function( res ){

        });
        promise.error(function(err){
            alert("Something went wrong :(");
        });
    }

    /**
     * Document Controllers
     * ========================
     */
    $scope.selectedQuestionType = $scope.questionTypes[0].id;
    function parseQuestionForm(){
        var form        = document.forms.questionForm;
        var name        = form.name.value;
        var parent      = form.parent.value;
        var question    = form.question.value;
        var tooltip     = form.tooltip.value;
        var icon        = form.icon.value;
        var type        = $scope.selectedQuestionType;

        if( parent == "" ){
            alert("Questions must have a parent domain"); return false;
        }

        var questionObject = {
            id: (Math.floor( Math.random() * 99999) ).toString(),
            parent: parent,
            type: type,
            name: name,
            question: question,
            tooltip: tooltip,
            icon: icon
        };

        if( type == "text" ){
            questionObject.placeholder = form.placeholder.value;
        }
        if( type == "number" ){
            questionObject.min = parseInt( form.min.value );
            questionObject.max = parseInt( form.max.value );
            questionObject.unit = form.unit.value;
        }
        if( type == "boolean" ){
            /* Init true/false if blank */
            questionObject.trueOption = form.trueOption.value;
            questionObject.falseOption = form.falseOption.value;
            if( questionObject.trueOption == "" ){
                questionObject.trueOption = "true";
            }
            if( questionObject.falseOption == "" ){
                questionObject.falseOption = "false";
            }
        }
        if( type == "range" ){
            questionObject.rangeMin = parseInt( form.rangeMin.value );
            questionObject.rangeMax = parseInt( form.rangeMax.value );
            questionObject.rangeUnit = form.rangeUnit.value;
        }
        if( type == "select" ){
            var $el = $('#multipleChoiceInput');
            questionObject.options = [];
            extractQuestions( $el, questionObject.options );
            $el.tokenfield('destroy');
            $el.val("");
            $el.tokenfield();
        }
        if( type == "multiselect" ){
            questionObject.options = [];
            var $el = $('#multiselectInput');
            extractQuestions( $('#multiselectInput'), questionObject.options );
            $el.tokenfield('destroy');
            $el.val("");
            $el.tokenfield();
        }

        // form.parent.value   =   "";
        form.name.value     =   "";
        form.question.value =   "";
        form.tooltip.value  =   "";
        form.icon.value = icon;

        if( form.min ) form.min.value = "";
        if( form.max ) form.max.value = "";
        if( form.unit ) form.unit.value = "";
        if( form.trueOption ) form.trueOption.value = "";
        if( form.falseOption ) form.falseOption.value = "";
        if( form.rangeMin ) form.rangeMin.value = "";
        if( form.rangeMax ) form.rangeMax.value = "";
        if( form.rangeUnit ) form.rangeUnit.value = "";

        return questionObject;
    }
    function parseDomainForm(){
        var form            = document.forms.domainForm;
        var name            = form.name.value;
        var parent          = form.parent.value;
        var description     = form.description.value;
        var tooltip         = form.tooltip.value;
        var icon            = form.icon.value;

        // form.parent.value       =   "";
        form.name.value         =   "";
        form.description.value  =   "";
        form.tooltip.value      =   "";
        form.icon.value         =   "";
        form.icon.value = icon;

        if( parent === "" ){
            parent = "#";
        }

        var domainObject = {
            id: ( Math.floor( Math.random() * 99999 )).toString(),
            parent: parent,
            name: name,
            description: description,
            tooltip: tooltip,
            icon: icon
        };

        return domainObject;
    }

    /**
     * Bootstrap Tokenfield Angular Adapter
     * ========================================
     */
    function extractQuestions( tokenFieldElement, target ){
        var tokens = tokenFieldElement.tokenfield('getTokens');

        for (var i = 0; i < tokens.length; i++) {
            var option = tokens[i];
            target.push( option.value );
        }
    }
    function resetEditTokenField(){
        var tf = $('#editMultipleChoiceInput');
        tf.tokenfield('setTokens', []);
        tf.val('');
    }
    function loadEditTokenField( questionObject ){
        if( questionObject.options ){
            var tf = $('#editMultipleChoiceInput');
            tf.tokenfield('setTokens', questionObject.options );
        }
    }
    function resetEditMultiselectTokenField(){
        var tf = $('#editMultiselectInput');
        tf.tokenfield('setTokens', []);
        tf.val('');
    }
    function loadEditMultiselectTokenField( questionObject ){
        if( questionObject.options ){
            var tf = $('#editMultiselectInput');
            tf.tokenfield('setTokens', questionObject.options );
        }
    }
    window.updateMultipleChoice = function(){
        $scope.modalQuestion.options = [];
        extractQuestions( $('#editMultipleChoiceInput'), $scope.modalQuestion.options );
    }
    window.updateMultiselect = function(){
        $scope.modalQuestion.options = [];
        extractQuestions( $('#editMultiselectInput'), $scope.modalQuestion.options );
    }

    var newDomain = $('#domain-icon-picker');
    var newQuestion = $('#variable-icon-picker');
    var editDomain = $('#modal-icon-picker');
    var editQuestion = $('#variable-editor-icon-picker');

    var newDomainPicker = newDomain.fontIconPicker({
        theme: 'fip-darkgrey',
        source: iconSources,
        emptyIcon: false,
        hasSearch: true
    });
    var newQuestionPicker = newQuestion.fontIconPicker({
        theme: 'fip-darkgrey',
        source: iconSources,
        emptyIcon: false,
        hasSearch: true
    });
    var editDomainPicker = editDomain.fontIconPicker({
        theme: 'fip-darkgrey',
        source: iconSources,
        emptyIcon: false,
        hasSearch: true
    });
    var editQuestionPicker = editQuestion.fontIconPicker({
        theme: 'fip-darkgrey',
        source: iconSources,
        emptyIcon: false,
        hasSearch: true
    });

    $(newDomainPicker).val('fa-folder');
    $(newQuestionPicker).val('fa-question');
    newDomainPicker.refreshPicker();
    newQuestionPicker.refreshPicker();

    $('#projectStructure').jstree();

    init();
}

var iconSources = ["fa-500px", "fa-address-book", "fa-address-book-o", "fa-address-card", "fa-address-card-o", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-american-sign-language-interpreting", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h", "fa-arrows-v", "fa-asl-interpreting", "fa-assistive-listening-systems", "fa-asterisk", "fa-at", "fa-audio-description", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bandcamp", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-bath", "fa-bathtub", "fa-battery", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-blind", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-braille", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-deaf", "fa-deafness", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-drivers-license", "fa-drivers-license-o", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eercast", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-open", "fa-envelope-open-o", "fa-envelope-square", "fa-envira", "fa-eraser", "fa-etsy", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-fa", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-first-order", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-font-awesome", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-free-code-camp", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gitlab", "fa-gittip", "fa-glass", "fa-glide", "fa-glide-g", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-circle", "fa-google-plus-official", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-grav", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-handshake-o", "fa-hard-of-hearing", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-id-badge", "fa-id-card", "fa-id-card-o", "fa-ils", "fa-image", "fa-imdb", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linode", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-low-vision", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meetup", "fa-meh-o", "fa-mercury", "fa-microchip", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pied-piper-pp", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-podcast", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-question-circle-o", "fa-quora", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-ravelry", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-resistance", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-s15", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-shower", "fa-sign-in", "fa-sign-language", "fa-sign-out", "fa-signal", "fa-signing", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-snapchat", "fa-snapchat-ghost", "fa-snapchat-square", "fa-snowflake-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superpowers", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-telegram", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-themeisle", "fa-thermometer", "fa-thermometer-0", "fa-thermometer-1", "fa-thermometer-2", "fa-thermometer-3", "fa-thermometer-4", "fa-thermometer-empty", "fa-thermometer-full", "fa-thermometer-half", "fa-thermometer-quarter", "fa-thermometer-three-quarters", "fa-thumb-tack", "fa-thumbs-down", "fa-thumbs-o-down", "fa-thumbs-o-up", "fa-thumbs-up", "fa-ticket", "fa-times", "fa-times-circle", "fa-times-circle-o", "fa-times-rectangle", "fa-times-rectangle-o", "fa-tint", "fa-toggle-down", "fa-toggle-left", "fa-toggle-off", "fa-toggle-on", "fa-toggle-right", "fa-toggle-up", "fa-trademark", "fa-train", "fa-transgender", "fa-transgender-alt", "fa-trash", "fa-trash-o", "fa-tree", "fa-trello", "fa-tripadvisor", "fa-trophy", "fa-truck", "fa-try", "fa-tty", "fa-tumblr", "fa-tumblr-square", "fa-turkish-lira", "fa-tv", "fa-twitch", "fa-twitter", "fa-twitter-square", "fa-umbrella", "fa-underline", "fa-undo", "fa-universal-access", "fa-university", "fa-unlink", "fa-unlock", "fa-unlock-alt", "fa-unsorted", "fa-upload", "fa-usb", "fa-usd", "fa-user", "fa-user-circle", "fa-user-circle-o", "fa-user-md", "fa-user-o", "fa-user-plus", "fa-user-secret", "fa-user-times", "fa-users", "fa-vcard", "fa-vcard-o", "fa-venus", "fa-venus-double", "fa-venus-mars", "fa-viacoin", "fa-viadeo", "fa-viadeo-square", "fa-video-camera", "fa-vimeo", "fa-vimeo-square", "fa-vine", "fa-vk", "fa-volume-control-phone", "fa-volume-down", "fa-volume-off", "fa-volume-up", "fa-warning", "fa-wechat", "fa-weibo", "fa-weixin", "fa-whatsapp", "fa-wheelchair", "fa-wheelchair-alt", "fa-wifi", "fa-wikipedia-w", "fa-window-close", "fa-window-close-o", "fa-window-maximize", "fa-window-minimize", "fa-window-restore", "fa-windows", "fa-won", "fa-wordpress", "fa-wpbeginner", "fa-wpexplorer", "fa-wpforms", "fa-wrench", "fa-xing", "fa-xing-square", "fa-y-combinator", "fa-y-combinator-square", "fa-yahoo", "fa-yc", "fa-yc-square", "fa-yelp", "fa-yen", "fa-yoast", "fa-youtube", "fa-youtube-play", "fa-youtube-square"];