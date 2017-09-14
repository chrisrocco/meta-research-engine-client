<?php

const APP = "app";
/*
 * ANGULAR ACTIVITY GENERATOR
 * generates the following structure within your 'APP' directory:
 *  /<APP>
 *      /<activity>
 *          /<activity>.module.js
 *          /<activity>.controller.js
 *          /<activity>.html
 * */

if(!isset($argv[1])){
    echo "Invalid Input";
    exit();
}

$activity = $argv[1];
/* load templates */
$module = str_replace("{{activity}}", $activity, file_get_contents(__DIR__ . '/_module.js'));
$controller = str_replace("{{activity}}", $activity, file_get_contents(__DIR__ . '/_controller.js'));
$view = str_replace("{{activity}}", $activity, file_get_contents(__DIR__ . '/_view.html'));
/* create files */
$cmds = [
    "cd ".APP,
    "mkdir $activity",
    "cd $activity",
        "touch $activity.module.js",
        "touch $activity.controller.js",
        "touch $activity.html"
];
echo shell_exec(implode(" && ", $cmds));

file_put_contents(APP."/$activity/$activity.module.js", $module);
file_put_contents(APP."/$activity/$activity.controller.js", $controller);
file_put_contents(APP."/$activity/$activity.html", $view);

print "\n";
print "Activity '$activity' generated!\n";
print "NOTE: module not added to app.js or index.html";