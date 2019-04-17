<?php
/**
 * CourseRoad: A Four-Year Planner for the MIT Undergraduate Community
 * August 17, 2012
 * By: Danny Ben-David (dannybd@mit.edu)
 */

require 'functions.php';

// Beginnings of an external API hook. From a comma-separated list of classes,
// a year value and a term, this will drop a set of classes into CourseRoad, to
// be saved by the user.

if (isset($_GET['addclasses'])) {
  if (!isset($_GET['year'])) {
    $_GET['year'] = false;
  }

  if (!isset($_GET['term'])) {
    $_GET['term'] = 1;
  }

  // SESSION.add_new_term holds onto the new term's data
  $_SESSION['add_new_term'] = array(
    'year' => $_GET['year'],
    'term' => $_GET['term'],
    'classes' => explode(',', $_GET['addclasses'])
  );

  if (!(isset($_GET['hash']) && CourseRoadDB::hashExists($_GET['hash']))) {
    $_GET['hash'] = '';
  }
}

// Record failed login attempts (when user denies login after pressing Login)
if (isset($_GET['triedlogin'])) {
  $_SESSION['triedcert'] = true;
  redirectHash($_SESSION['crhash']);
}

// A visible "?hash=" in the URL is unwanted, so we redirect to remove it,
// but first store the hash to make loading faster.
if (isset($_GET['hash'])) {
  redirectHash(urldecode($_GET['hash']));
}

// Store that we've been to index.php.
$_SESSION['wenttoindex'] = true;

// We originally add add_new_term to SESSION to protect over the redirect above.
// Now we read it into a variable and clear the SESSION version.
$add_new_term = 0;
if (isset($_SESSION['add_new_term'])) {
  $add_new_term = $_SESSION['add_new_term'];
  unset($_SESSION['add_new_term']);
  $json = array();
  foreach ($add_new_term['classes'] as $classname) {
    $classdata = pullClass(
      rtrim($classname, 'J'),
      $add_new_term['year'],
      $add_new_term['term']
    );
    if (!isset($classdata['error'])) {
      $json[] = $classdata;
    }
  }
  $add_new_term = addslashes(json_encode($json));
}

// If we haven't tried to log in, then default to false.
if (!isset($_SESSION['triedcert'])) {
  $_SESSION['triedcert'] = false;
}

// SESSION.athena is only set within secure.php, so if it has a value then we've
// logged in sucessfully
$loggedin = isset($_SESSION['athena']);
$athena = $loggedin ? $_SESSION['athena'] : false;

// Without logging in, we don't have a user pref map, so this set the default.
// class_year is assumed to be that of the freshmen.
if (!isset($_SESSION['user'])) {
  $_SESSION['user'] = getDefaultUserPrefs();
}

// If logged in, repopulate the user prefs with their real values.
if ($loggedin) {
  importUserPrefs($athena);
}

header('Content-type: text/html; charset=utf-8');
header('X-UA-Compatible: IE=edge');
?>
<!doctype html>
<html class="no-js" lang="en-us">
<head>
  <title>CourseRoad<?= $loggedin ? ": $athena" : "" ?></title>
  <meta name="description" content="A Four-Year Planner for the MIT Undergraduate Community" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="<?= noCacheLink('css/cr.css') ?>">
  <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>
</head>
<body>
<div id="leftbar" class="unhighlight">
  <div id="getnewclass" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
    <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
      <li class="ui-state-default ui-corner-top <?= $loggedin ? '' : 'ui-tabs-active ui-state-active' ?>"><a href="#infotabs-about">About</a></li>
      <li class="ui-state-default ui-corner-top <?= $loggedin ? 'ui-tabs-active ui-state-active' : '' ?>"><a href="#infotabs-add">Add</a></li>
      <li class="ui-state-default ui-corner-top"><a href="#infotabs-save">Save</a></li>
    </ul>
    <div id="infotabs-about" class="ui-corner-all leftbarholder ui-tabs-panel ui-widget-content ui-corner-bottom">
      <div class="infotabs-about-header flakyCSS">Welcome to CourseRoad!</div>
      <div class="infotabs-about-subheader flakyCSS">
        A four-year planner for the MIT community.
      </div>
      <a id="openhelp" href="#" class="dummylink">Help</a> ~
      <a href="https://www.facebook.com/courseroad" target="_blank">Facebook Page</a> ~
      <a href="https://github.com/dannybd/courseroad" target="_blank">Github</a>
      <br>
      <?php
        if ($loggedin) {
          echo <<<EOD
      Hello, <strong>$athena</strong>!<br>
      <br>
      <a href="download.php">
      <div style="padding: 0.5em; border: 3px solid white; background-color: red; font-size: 1.3em;"><b>
      New:
      click here
      to download all of your CourseRoad data.
      </b></div></a>
EOD;
        } else {
          if (!$_SESSION['triedcert']) {
            echo <<<EOD
      <input
        type="button"
        id="userlogin"
        class="bubble loaders"
        value="Login">
      <input
        type="button"
        id="showusersettings"
        class="bubble loaders"
        value="User Settings">
EOD;
          } else {
            echo <<<EOD
      <input
        type="button"
        id="baduserlogin"
        class="bubble loaders"
        value="Couldn't Login :( Click here for help">
EOD;
          }
        }
      ?>
    </div>
    <div id="infotabs-add" class="ui-corner-all leftbarholder ui-tabs-panel ui-widget-content ui-corner-bottom">
      Class Type:
      <br>
      <input
        type="radio"
        name="getnewclasstype"
        id="getnewclasstype-subject"
        value="subject"
        checked>
      <label for="getnewclasstype-subject" title="18.01, CMS.631, etc.">
        Subject
      </label>
      &nbsp;
      <input
        type="radio"
        name="getnewclasstype"
        id="getnewclasstype-custom"
        value="custom">
      <label for="getnewclasstype-custom" title="Summer UROP, Lab Assistant, etc.">
        Custom
      </label>
      <br>
      <span>Add</span>
      <div id="getnewclass-class"  class="getnewclasstypes visible">
        <input
          id="getnewclassid"
          type="text"
          name="classid"
          placeholder="18.01"
          pattern="[A-Za-z0-9\.]*"
          autofocus>
      </div>
      <div id="getnewclass-custom" class="getnewclasstypes">
        <input id="getnewclassname" type="text" name="classname" placeholder="UROP">
        &nbsp;
        (<input id="getnewclassunits" type="text" name="classunits" placeholder="0" pattern="[0-9\.]*"> units)
      </div>
      <br>
      &nbsp;to
      <select id="getnewclassterm" name="classterm">
        <option value="0">Prior Credit</option>
        <option value="1">Freshman Fall</option>
        <option value="2">Freshman IAP</option>
        <option value="3">Freshman Spring</option>
        <option value="4">Freshman Summer</option>
        <option value="5">Sophomore Fall</option>
        <option value="6">Sophomore IAP</option>
        <option value="7">Sophomore Spring</option>
        <option value="8">Sophomore Summer</option>
        <option value="9">Junior Fall</option>
        <option value="10">Junior IAP</option>
        <option value="11">Junior Spring</option>
        <option value="12">Junior Summer</option>
        <option value="13">Senior Fall</option>
        <option value="14">Senior IAP</option>
        <option value="15">Senior Spring</option>
        <option value="16">Senior Summer</option>
        <option value="17">Super-Senior Fall</option>
        <option value="18">Super-Senior IAP</option>
        <option value="19">Super-Senior Spring</option>
        <option value="20">Super-Senior Summer</option>
      </select>
        <button type="button" id="changeclassterm-up" class="bubble loaders changeclassterm ui-button" value="-1">
          <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-n"></span>
        </button>
        <button type="button" id="changeclassterm-down" class="bubble loaders changeclassterm ui-button" value="1">
          <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span>
        </button>
      <br>
      <input type="button" id="getnewclasssubmit" class="bubble loaders" value="Add Class">
    </div>
    <div id="infotabs-save" class="ui-corner-all leftbarholder ui-tabs-panel ui-widget-content ui-corner-bottom">
      <input type="button" id="save-courses" class="bubble loaders" value="Save Courses">
      <input type="button" id="roads-or-login-save" class="bubble loaders" value="<?= $loggedin ? "View Saved Roads" : "Save with Login (requires certs)"; ?>"><br><br>
    </div>
  </div>
  <div id="COREchecker" class="leftbarholder">
  <strong title="CourseRoad isn't the official system, and so what you see here isn't a guarantee. Go check the official audit to be sure.">Unofficial Audit<sup class="noprint">[?]</sup>:</strong><br>
  <strong>General Institute Requirements:</strong><br>
    Physics I: <span id="Physics_I" class="checkbox1 corecheck GIR PHY1">[<span>&#x2713;</span>]</span><br>
    Physics II: <span id="Physics_II" class="checkbox1 corecheck GIR PHY2">[<span>&#x2713;</span>]</span><br>
    Calculus I: <span id="Calculus_I" class="checkbox1 corecheck GIR CAL1">[<span>&#x2713;</span>]</span><br>
    Calculus II: <span id="Calculus_II" class="checkbox1 corecheck GIR CAL2">[<span>&#x2713;</span>]</span><br>
    Chemistry: <span id="Chemistry" class="checkbox1 corecheck GIR CHEM">[<span>&#x2713;</span>]</span><br>
    Biology: <span id="Biology" class="checkbox1 corecheck GIR BIOL">[<span>&#x2713;</span>]</span><br>
    REST <span id="REST" class="checkbox1 corecheck GIR REST">[<span>&#x2713;</span>]</span>&nbsp;<span id="REST2" class="checkbox1 corecheck GIR REST">[<span>&#x2713;</span>]</span><br>
    LAB <span id="LAB" class="checkbox1 corecheck GIR LAB LAB2">[<span>&#x2713;</span>]</span>&nbsp;<span id="LAB2" class="checkbox1 corecheck GIR LAB LAB2">[<span>&#x2713;</span>]</span><br>
    -----------------<br>
    CI-H <span id="CI_H" class="checkbox1 corecheck CI CIH CIHW">[<span>&#x2713;</span>]</span>&nbsp;<span id="CI_H2" class="checkbox1 corecheck CI CIH CIHW">[<span>&#x2713;</span>]</span><br>
    -----------------<br>
    HASS:<br>
    &nbsp;&nbsp;&nbsp;A <span id="HASS_Arts" class="checkbox1 corecheck HASS HA">[<span>&#x2713;</span>]</span>
          &nbsp;H <span id="HASS_Humanities" class="checkbox1 corecheck HASS HH">[<span>&#x2713;</span>]</span>
          &nbsp;S <span id="HASS_Social_Sciences" class="checkbox1 corecheck HASS HS">[<span>&#x2713;</span>]</span><br>
    &nbsp;&nbsp;&nbsp;Other HASS:
    <span id="HASS_E"  class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
    <span id="HASS_E2" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
    <span id="HASS_E3" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
    <span id="HASS_E4" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
    <span id="HASS_E5" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span><br>
    <span class="majorminor">-----------------<br></span>
    <select id="choosemajor" name="choosemajor" class="majorminor choosemajor" data-div="#majorreqs">
      <option value="m0">---Select a Major---</option>
    </select><br>
    <div id="majorreqs" class="majorminor"></div>
    <span class="majorminor">-----------------<br></span>
    <select id="choosemajor2" name="choosemajor2" class="majorminor choosemajor" data-div="#majorreqs2">
      <option value="m0">---Select a Major---</option>
    </select><br>
    <div id="majorreqs2" class="majorminor"></div>
    <span class="majorminor">-----------------<br></span>
    <select id="chooseminor" name="chooseminor" class="majorminor chooseminor" data-div="#minorreqs">
      <option value="m0">---Select a Minor---</option>
    </select><br>
    <div id="minorreqs" class="majorminor"></div>
    <span class="majorminor">-----------------<br></span>
    <select id="chooseminor2" name="chooseminor2" class="majorminor chooseminor" data-div="#minorreqs2">
      <option value="m0">---Select a Minor---</option>
    </select><br>
    <div id="minorreqs2" class="majorminor"></div>
    <span class="majorminor">-----------------<br></span>
    <select id="chooseneet" name="chooseneet" class="majorminor chooseneet" data-div="#neetreqs">
      <option value="m0">---Select a NEET Thread---</option>
    </select><br>
    <div id="neetreqs" class="majorminor"></div>
    <!--
    -----------------<br>
    <strong>Total Units: <span id="totalunits">0</span></strong>
    --><br>
  </div>
  <div id="overrider" class="leftbarholder"><span><label for="overridercheck" title="Check this box if you received credit for this class, overriding standard requisites.">OVERRIDE REQUISITES: </label><input id="overridercheck" type="checkbox"></span></div>
  <div id="nowreading" class="leftbarholder"></div>
</div>
<div id="rightbar">
  <div id="banner" class="noprint" style="display: none;">
Hey all, we're really sorry that much of CourseRoad's info has fallen behind while we work on the new version. All known classes through Fall 2018 should now be available and this is the last batch of major updates that are likely to happen to this version so we can focus all our effort on version 2. You will be able to export your roads to the new version when it's released, so we encourage you to continue using CourseRoad and please bear with these minor errors for a little while longer, and make sure to double check our list with your department's requirements. Apologies again for any confusion this may have caused.<br><br>
Best,<br>
The CourseRoad Team
    <span>(Hide this)</span>
  </div>
  <div class="term credit"><div class="termname"><span>Prior<br>Credit</span></div></div>
  <div class="year freshman">
    <div class="yearname"><span>Freshman Year</span></div>
    <div class="term fall"><div class="termname"><span>Fall</span></div></div>
    <div class="term iap"><div class="termname"><span>Iap</span></div></div>
    <div class="term spring"><div class="termname"><span>Spring</span></div></div>
    <div class="term summer"><div class="termname"><span>Summer</span></div></div>
  </div>
  <div class="year sophomore">
    <div class="yearname"><span>Sophomore Year</span></div>
    <div class="term fall"><div class="termname"><span>Fall</span></div></div>
    <div class="term iap"><div class="termname"><span>Iap</span></div></div>
    <div class="term spring"><div class="termname"><span>Spring</span></div></div>
    <div class="term summer"><div class="termname"><span>Summer</span></div></div>
  </div>
  <div class="year junior">
    <div class="yearname"><span>Junior Year</span></div>
    <div class="term fall"><div class="termname"><span>Fall</span></div></div>
    <div class="term iap"><div class="termname"><span>Iap</span></div></div>
    <div class="term spring"><div class="termname"><span>Spring</span></div></div>
    <div class="term summer"><div class="termname"><span>Summer</span></div></div>
  </div>
  <div class="year senior">
    <div class="yearname"><span>Senior Year</span></div>
    <div class="term fall"><div class="termname"><span>Fall</span></div></div>
    <div class="term iap"><div class="termname"><span>Iap</span></div></div>
    <div class="term spring"><div class="termname"><span>Spring</span></div></div>
    <div class="term summer"><div class="termname"><span>Summer</span></div></div>
  </div>
  <div class="year supersenior hidden">
    <div class="yearname supersenior hidden"><span>Super-senior Year</span></div>
    <div class="term fall supersenior hidden"><div class="termname supersenior hidden"><span>Fall</span></div></div>
    <div class="term iap supersenior hidden"><div class="termname supersenior hidden"><span>Iap</span></div></div>
    <div class="term spring supersenior hidden"><div class="termname supersenior hidden"><span>Spring</span></div></div>
    <div class="term summer supersenior hidden"><div class="termname supersenior hidden"><span>Summer</span></div></div>
  </div>
</div>
<div id="trash" class="trash trashdefault">
  <!--svg class="trash" xmlns="http://www.w3.org/2000/svg">
    <g>
    <line id="svg_1" y2="100%" x2="100%" y1="0" x1="0" stroke-width="15" stroke="#f00000" fill="none"/>
    <line id="svg_2" y2="0" x2="100%" y1="100%" x1="0" stroke-width="15" stroke="#f00000" fill="none"/>
    </g>
  </svg-->
  <img src="images/trashx.png" alt="" class="trash">
</div>
<div id="loading" class="bubble"><h1>Loading...</h1></div>
<div id="viewroads" class="bubble my-dialog">
  <div id="viewroads_close" class="my-dialog-close">Close this</div>
  <h3 id="viewroads_header" class="my-dialog-header">Your saved roads:</h3>
  <div id="savedroads">Loading...</div>
</div>
<div id="help" class="bubble my-dialog">
  <div id="help_close" class="my-dialog-close">Close this</div>
  <h2 id="help_welcome" class="my-dialog-header">CourseRoad Help</h2>
  <div id="help_content">
    <h3>What is CourseRoad?</h3>
    <div>
      CourseRoad allows you to plan out your classes over your MIT undergrad career.<br>
      <br>
      Enter classes you have taken and want to take, and CourseRoad will tell you all about how you're doing on class prerequisites, General Institute Requirements (GIRs), and requirements for majors and minors.<br>
      You can even save course mappings to share with friends and advisors to get feedback!
    </div>
    <h3>How do I add/move/delete classes?</h3>
    <div>
      In the upper-left, click the "Add" tab, where you can enter the course numbers of your classes and choose the semester you took them/want to take them.
      You'll see that class added on the main timeline on the right-hand side of the page. This area gets filled with the classes you choose.<br>
      <br>
      If you want to move a class around, simply drag and drop it to another semester.<br><br>
      If you want to delete the class, drag it to the right-hand and drop it on the the black X that appears, or select the class and hit Delete.
    </div>
    <h3>How do I add a UROP/elective/PE class/thing that isn't an MIT class?</h3>
    <div>
      When you click the "Add" tab in the upper-left, change "Class Type" from Subject to Custom: from there, type the subject's name and units, and proceed as you would normally for a class.
    </div>
    <h3>What are those weird lines everywhere? Why are some classes red?</h3>
    <div>
      Those lines appear between classes to show you the map of prerequisites and corequisites for your classes. Grey is for prereqs, black is for coreqs.<br>
      <br>
      If you've added a class and all of its requisites are satisfied by the classes you've already added, then it'll turn green. If you're still missing reqs, it'll appear red and you can mouse over the part that says "Reqs: [ ]" to see which classes you still need. Your class might also be red if it's placed in the wrong semester, isn't counting for credit, or isn't available in that year.
    </div>
    <h3>I have permission to override the requisites for X.XX. How do I show that?</h3>
    <div>
      If you've taken a class without taking its requisites (or if CourseRoad's acting up and not recognizing that you've completed said reqs), you can click once on the class (thus highlighting the class in pink) and click "OVERRIDE REQUISITES" in the lower-left. You can also read that course's description and other info in the lower-left as well.
    </div>
    <h3>What are the years displayed on each class?</h3>
    <div>
      The year attached to each class represents the <strong>catalog year from which that class' data was taken</strong>. It doesn't necessarily match the year in which you took the class: if the requisites and teachers are the same then and now, then you don't have to worry about it.<br>
      <br>
      If, however, you took (say) the 2009-2010 version of a class, simply click the displayed year and choose "'09-'10" from the dropdown. The class will automatically replace itself with the proper version.<br>
      <br>
      If you're entering a lot of classes and this seems like an issue, try clicking the "About" tab and choosing "User Settings": if you update your class year in that field, CourseRoad will try to add the classes to semesters using data from the year in which you took said classes.
    </div>
    <h3>What is that checklist for?</h3>
    <div>
      The checklist on the left-hand side lets you keep track of all of your GIRs and major/minor requirements. If you choose majors and minors from the dropdowns, then you'll also see how you're doing on their respective requirements as well.
    </div>
    <h3>How do I save a "road" for later or to share with others?</h3>
    <div>
      If you want to save your course map for later, simply click the "Save" tab in the upper-left, and click "Save Classes". The URL you see in the address bar will become a specialized, saved link to your courses. Copy and share it with whomever you like.<br>
      <br>
      You can also click "Save with Login" to save the road while connecting it to your Kerberos username (i.e. the <em>username</em> in <em>username</em>@mit.edu). Note: this requires that you have certificates installed and enabled on the browser you're using.
    </div>
    <h3>What good does logging in do?</h3>
    <div>
      Logging in allows you to:
      <ul>
        <li>Save your roads attached to your account and manage them later (go to the "Save" tab and click "View Saved Roads")</li>
        <li>Save user settings such as class year and toggling CourseRoad features</li>
        <li>Choose custom save hashes for your roads (e.g. "<em>username</em>/with-energy-minor"), and even choose a "public" road to be visible at courseroad.mit.edu/<em>username</em></li>
      </ul>
      and more!
    </div>
    <h3>What about privacy?</h3>
    <div>
      When you aren't signed in, the save hashes you generate (the stuff after the "#" in the URL) are random and don't contain any information about you, specifically. On my end in those cases, the database is only storing your IP address, the classes and majors/minors you added, and a timestamp.<br>
      <br>
      If you save roads while signed in, the road will be attached to your athena username with a timestamp, thus hiding the link from being easily discoverable.<br>
      You can personally choose to change these hashes by clicking the "Save" tab, clicking "View Saved Roads", and editing the hash from there.<br>
      You can also choose to enable one of your saved roads as public: a public road will be viewable to anyone who goes to courseroad.mit.edu/<em>username</em>.
      <br>
      You'll also have the option to supply your graduation year to CourseRoad, in case you want the class year versions to be accurate (see above in "What are the years displayed on each class?").
      <br>
      <br>
      tl;dr: don't worry, you're safe :)
    </div>
    <h3>Further help, who's behind this, and why?</h3>
    <div>
      First off, feel free to email me at <a href="mailto:courseroad@mit.edu?subject=[CourseRoad]%20">courseroad@mit.edu</a> if you have any comments/complaints/hate mail/cool historical maps.<br>
      <br>
      CourseRoad is the brainchild of Danny Ben-David '15, and was the Grand Prize Winner in the 2012 <a href="http://icampusprize.mit.edu">iCampus Student Prize Competition</a>. Ever since I showed up at MIT, I've been bothered at how unintuitive the course and major structures are as laid out in the MIT Catalog. Seeking a better way, the iCampus Prize provided the motive for me to build CourseRoad, and here we are. :)<br>
      <br>
      Special thanks to <a href="http://oeit.mit.edu">OEIT<a> for funding and guiding me through the spring and summer, and to the awesome folks at <a href="http://sipb.mit.edu">SIPB</a> for their litany of services and helpful insights.
    </div>
  </div>
</div>
<div id="usersettings" class="bubble my-dialog">
  <div id="usersettings_close" class="my-dialog-close">Close this</div>
  <h3 id="usersettings_header" class="my-dialog-header">User Settings<?= $athena?" for $athena":"" ?>:</h3>
  <div id="usersettings_div"><?= makeUserSettingsHTML(); ?></div>
  <input id="usersettings_save" type="button" name="save" value="Save Settings"><span id="usersettings_saved">Settings saved!</span>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/yui/2.9.0/build/utilities/utilities.js"></script>
<script src="js/wireit-min.js"></script>
<script src="<?= noCacheLink('js/majors.js') ?>"></script>
<script src="<?= noCacheLink('js/cr.js') ?>"></script>
<script>
  var _gaq=[["_setAccount","UA-31018454-1"],
  ["_trackPageview",location.pathname+location.search+location.hash]];
  (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.async=1;g.src="https://ssl.google-analytics.com/ga.js";
  s.parentNode.insertBefore(g,s)}(document,"script"));
  // These are not trusted variables, but they do aid in displaying
  // different (non-secure) things based on login status.
  var loggedin = <?= intval($loggedin) ?>;
  var triedlogin = <?= intval($_SESSION['triedcert']) ?>;
  var user = {
    classYear: <?= $_SESSION['user']['class_year'] ?>,
    viewReqLines: <?= $_SESSION['user']['view_req_lines'] ?>,
    autocomplete: <?= $_SESSION['user']['autocomplete'] ?>,
    needPermission: <?= $_SESSION['user']['need_permission'] ?>
  };
  _gaq.push(['_setCustomVar', 1, 'Class Year', user.classYear, 1]);
  var add_new_term = $.parseJSON('<?= $add_new_term ?>');
  var CSRF_token = '<?= $_SESSION['csrf_token'] ?>';
  $(crSetup);
</script>
</body>
</html>
