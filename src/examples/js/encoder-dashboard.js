(function(document, window, $) {
  'use strict';

  var Site = window.Site;

  $(document).ready(function($) {
    Site.run();
  });

  // Top Line Chart With Tooltips
  // ------------------------------
  (function() {

    // options for style
    var options = {
      showArea: true,
      low: 0,
      high: 1000,
      height: 453,
      fullWidth: true,
      axisX: {
        offset: 30
      },
      axisY: {
        offset: 30,
        labelInterpolationFnc: function(value) {
          if (value == 0) {
            return null;
          }
          return value;
        },
        scaleMinSpace: 50
      },
      chartPadding: {
        bottom: 12,
        left: 10
      },
      plugins: [
        Chartist.plugins.tooltip()
      ]
    };

    // team total completed data
    var labelList = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    var series1List = {
      name: 'series-1',
      data: [0, 180, 600, 980, 850, 600, 300, 350, 600, 200, 630]
    };
    var series2List = {
      name: 'series-2',
      data: [0, 100, 520, 810, 620, 500, 630, 400, 380, 405, 210]

    };

    var newScoreLineChart = function(chartId, labelList, series1List, series2List, options) {

      var lineChart = new Chartist.Line(chartId, {
        labels: labelList,
        series: [series1List, series2List]
      }, options);

      //start create
      lineChart.on('draw', function(data) {
        var elem, parent;
        if (data.type === 'point') {
          elem = data.element;
          parent = new Chartist.Svg(elem._node.parentNode);

          parent.elem('line', {
            x1: data.x,
            y1: data.y,
            x2: data.x + 0.01,
            y2: data.y,
            "class": 'ct-point-content'
          });
        }
      });
      //end create
    }

    newScoreLineChart("#teamCompletedWidget .ct-chart", labelList,
      series1List, series2List, options);

  })();

})(document, window, jQuery);


/*
* Data this page needs:
* -> total papers encoded
* -> total projects started
* -> total data collected
*
* User Specific
* -> assignments completed
* -> average completion
* -> active papers
* -> total sessions
* -> notifications
* -> invitations
* -> new assignments
* */