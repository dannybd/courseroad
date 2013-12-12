/**
 * Welcome to the cr.js file!
 */

var Defaults = {
  requisiteCount: {
    count: 0,
    type: "",
    desc: "from",
    special: 0,
    globalskip: 0,
    globalignore: 0,
    runinfull: 0,
    pullmatches: 0
  },

  requisiteClass: {
    id: "",
    desc: "",
    skip: 0,
    coreq: 0,
    range: 0,
    dept: "",
    from: "",
    to: "",
    globalskip: 0,
    globalignore: 0
  }
};

var globalmatches = [];

/**
 * The idea here is to make it possible to loop recursively through
 * a requisite tree and perform callback actions when a class matches.
 */
function checkReqs(arr, callback, callbackargs, level, test) {
  callback = callback || function() {
    // The default callback is just a return true
    return true;
  };
  /**
   * Holds the arguments for callback. "cls" (with quotes) will be replaced
   * with the matched course number before being fed into callback.
   */
  callbackargs = callbackargs || [];
  test = test || true;
  if (level === undefined) {
    level = []; // Keep track of recursion.
    globalmatches = [];
  }
  if (arr[0] === 0) {
    /**
     * allows "and" arrays to be prefixed with a 0 (easier)
     * [0, "a", "b"] --> [2, "a", "b"];
     */
    arr[0] = arr.length - 1;
  }
  // Transform the default number form into an object
  var matched = null;
  if (typeof (arr[0]) == "number") {
    matched = $.extend({}, Defaults.requisiteCount, {
      count: parseInt(0 + arr[0])
    });
  } else {
    matched = $.extend({}, Defaults.requisiteCount, arr[0]);
  }
  matched.ocount = 0 + matched.count;
  matched.matches = [];
  // Holds the unsatisfied requisites in a string for display to the user.
  var tempstr = [];
  var temp2 = true;
  for (var i = 1; i < arr.length; i++) {
    if ($.isArray(arr[i])) {
      /**
       * In case a sub-branch is inside this branch,
       * we recursively solve that branch and use its result.
       */
      var req = checkReqs(arr[i], callback, callbackargs, level.concat([i]));
      if (req[0] || matched.pullmatches) {
        if (matched.special) {
          $(req[2]).each(function() {
            matched.count -= $(this).data(matched.type);
          });
        } else {
          matched.count--;
        }
      }
      // If the sub-branch matched its requirements
      if (req[0]) {
        var tempargs = callbackargs.slice();
        var clspos = $.inArray("cls", tempargs);
        if (clspos != -1) {
          tempargs[clspos] = $.extend({}, newarr, {
            div: arr[i]
          });
        }
        var lvlpos = $.inArray("lvl", tempargs);
        if (lvlpos != -1) {
          tempargs[lvlpos] = level.concat([i]);
        }
        var temp2 = callback.apply(null, tempargs);
      } else {
        tempstr.push(req[1]);
      }
      continue;
    }
    /**
     * Deal with the objects (for things like coreqs) now.
     * Converting both things to objects, but only the coreq ones
     * will have a "coreq":1 attribute.
     */
    var newarr = null;
    if (typeof (arr[i]) == "object") {
      newarr = $.extend({}, Defaults.requisiteClass, arr[i]);
    } else {
      newarr = $.extend({}, Defaults.requisiteClass, {
        id: arr[i]
      });
    }
    if (newarr.desc === undefined) {
      newarr.desc = "";
    }
    if (newarr.skip) {
      continue;
    }
    if (newarr.id === "Permission" && !user.needPermission) {
      if (matched.ocount == arr.length - 1) {
        matched.count -= matched.special ? $(this).data(matched.type) : 1;
      }
      continue;
    }
    // Now check for ranges. These are strings of the form "X.XXX-X.XXX"
    if (newarr.range) {
      var rangematches = $(".classdiv:not(.custom)").filter(function(index) {
        var rng = [newarr.dept, "." + newarr.from, "." + newarr.to];
        var temp2 = [$(this).data("subject_id")].concat(
          $(this).data("joint_subjects") || []
        );
        for (j in temp2) {
          var temp3 = [temp2[j].split(".")[0], "." + temp2[j].split(".")[1]];
          if ((temp3[0] == rng[0]) && (rng[1] <= temp3[1]) && (temp3[1] <=
            rng[2])) {
            return true;
          }
        }
        return false;
      }).each(function() {
        if ($.inArray(this, globalmatches) != -1 && !matched.globalignore && !
            newarr.globalignore) {
          return true;
        }
        var tempargs = callbackargs.slice();
        var clspos = $.inArray("cls", tempargs);
        if (clspos != -1) {
          tempargs[clspos] = $.extend({}, newarr, {
            div: $(this)
          });
        }
        var lvlpos = $.inArray("lvl", tempargs);
        if (lvlpos != -1) {
          tempargs[lvlpos] = level.concat([i]);
        }
        // Calls callback with tempargs as its arguments.
        var temp2 = callback.apply(null, tempargs);
        if (temp2) {
          matched.count -= matched.special ? $(this).data(matched.type) : 1;
          matched.matches.push(this);
          !newarr.globalskip && !matched.globalskip && globalmatches.push(this);
          newarr.globalskip && console.log("newarrskip", newarr, matched);
          matched.globalskip && console.log("matchedskip", newarr, matched);
        }
        if (matched.count <= 0 && !matched.runinfull) {
          return [true, "", level.length ? matched.matches : globalmatches];
        }
      });
      if (matched.count <= 0) {
        return [true, "", level.length ? matched.matches : globalmatches];
      }
      tempstr.push(
        (newarr.coreq === 1)
        ? ("[" + newarr.id + newarr.desc + "]")
        : (newarr.id + newarr.desc)
      );
      continue;
    }
    // Now only bona fide classes
    var classmatches = $(".classdiv." + (
      newarr.id.toUpperCase().replace('.', '_').replace(':', '.')
    ));
    classmatches.each(function() {
      if ($.inArray(this, globalmatches) != -1 && !matched.globalignore && !
          newarr.globalignore) {
        return true;
      }
      var tempargs = callbackargs.slice();
      var clspos = $.inArray("cls", tempargs);
      if (clspos != -1) {
        tempargs[clspos] = $.extend({}, newarr, {
          div: $(this)
        });
      }
      var lvlpos = $.inArray("lvl", tempargs);
      if (lvlpos != -1) {
        tempargs[lvlpos] = level.concat([i]);
      }
      // Calls callback with tempargs as its arguments.
      var temp2 = callback.apply(null, tempargs);
      if (temp2) {
        matched.count -= matched.special ? $(this).data(matched.type) : 1;
        matched.matches.push(this);
        !newarr.globalskip && !matched.globalskip && globalmatches.push(this);
        return false;
      }
    });
    // If it's not a class, or callback failed, then we need to note that.
    if (!classmatches.length || !temp2) {
      tempstr.push(
        (newarr.coreq == 1)
        ? ("[" + newarr.id + newarr.desc + "]")
        : (newarr.id + newarr.desc)
      );
    }
    if (matched.count <= 0 && !matched.runinfull) {
      return [true, "", level.length ? matched.matches : globalmatches];
    }
  }
  // return two pieces of info: state and string
  if (matched.count <= 0) {
    return [true, "", level.length ? matched.matches : globalmatches];
  }
  var tempstr = tempstr.join(", ");
  tempstr = deGIR(tempstr);
  if (matched.special) {
    tempstr = "(" + matched.count + " " + matched.desc + ": " +
      (JSON.stringify(arr.slice(1))) + ")";
  } else if (level.length || (!level.length && (arr[0] != arr.length - 1))) {
    tempstr = "(" + matched.count + " " + matched.desc + ": " + tempstr + ")";
  }
  return [false, tempstr, level.length ? matched.matches : globalmatches];
}

/*** Course functions ***/

/**
 * Defines new wire's properties (black/grey, straight/curved)
 * partially based on the relative semesters and terms of the two
 * would-be connected classes.
 * from is $() div, to is object with to.div as $() div.
 */
function newWire(from, to) {
  if ($.isArray(to.div)) {
    return true;
  }
  var fromid = from.attr("id");
  var toid = to.div.attr("id");
  var fromterm = from.data("classterm") + 0;
  var toterm = to.div.data("classterm") + 0;
  var dterm = Math.abs(fromterm - toterm);
  var options = {
    prereq: {
      color: "#888888",
      bordercolor: "#B8B8B8",
      borderwidth: 1,
      width: 2,
      OK: true
    },
    coreq: {
      color: "#000000",
      bordercolor: "#000000",
      borderwidth: 1,
      width: 1,
      OK: true
    },
    error: {
      color: "#ff0000",
      bordercolor: "#dd0000",
      borderwidth: 1,
      width: 1,
      OK: false
    }
  };
  var option = "prereq";
  if (to.coreq) {
    option = "coreq";
  } else {
    toterm += to.div.data("override") ? 0 : 1;
  }
  if ((fromterm < toterm) && (fromterm || dterm)) {
    option = "error";
  }
  var wireType = (dterm == 1 || dterm == 2) ? "Wire" : "BezierWire";
  user.viewReqLines && from.data("terminals").wires.push(
    new WireIt[wireType](
      from.data("terminals").terminal,
      to.div.data("terminals").terminal,
      document.body,
      options[option]
    )
  );
  return (options[option].OK);
}

// Frankly, this function has outgrown its name.
// addWires adds everything for a given class and updates its status.
function addWires(div, addwires) {
  if (addwires === undefined) {
    addwires = true;
  }
  var data = div.data();
  data.terminals.wires = [];
  data.reqstatus = true;
  if (data.reqs) {
    var reqcheck = checkReqs(data.reqs, newWire, [div, "cls"]);
    data.reqstatus = reqcheck[0];
    var tempstr = reqcheck[1];
    if (data.reqstatus || data.override || !data.classterm) {
      div.find(".reqs").html("Reqs: [X]").removeAttr('title');
    } else {
      div.find(".reqs").html("Reqs: [ ]").attr('title', 'Need: ' + tempstr);
    }
    if (data.override) div.find(".reqs").attr('title',
      'OVERRIDE enabled');
  }
  data.checkterm = (data.classterm == 0) || (([data.fall,
    data.iap, data.spring, data.summer])[(data.classterm - 1) % 4]);
  data.checkrepeat = true;
  if ($.inArray(data.grade_rule, ['J', 'U', 'R']) == -1) {
    if ($(".classdiv").not(div).filter(function(j) {
      return (
        (
          $.inArray($(this).data("subject_id"), data.equiv_subjects) !== -1 ||
          $(this).hasClass(data.id)
        ) &&
        (j < $(div).index(".classdiv"))
      );
    }).length) {
      data.checkrepeat = false;
    }
  }
  data.status = (
    (
      data.reqstatus &&
      data.checkrepeat &&
      data.offered_this_year ||
      data.override
    ) &&
    data.checkterm ||
    data.classterm == 0
  );
  div.removeClass("classdivgood").removeAttr('title');
  if (data.status) div.addClass("classdivgood");
  if (!data.checkrepeat) div.attr('title', data.subject_id +
    ' is not counting for credit');
  if (!data.checkterm) div.attr('title', data.subject_id +
    ' is not available ' + (['in the Fall term', 'during IAP',
      'in the Spring term', 'in the Summer term'])[(data.classterm - 1) %
      4]);
  if (!data.offered_this_year) div.attr('title', data.subject_id +
    ' is not available in this year (' + div.data('ayear') + ')');
  if (data.override) div.find(".coreqs").attr('title',
    'OVERRIDE enabled');
  if ($('.classdivhigh').length == 1) {
    $('.WireIt-Wire').addClass("WireIt-Wire-low");
    for (i in $(".classdivhigh").data("terminals").terminal.wires) {
      $($(".classdivhigh").data("terminals").terminal.wires[i].element)
        .removeClass("WireIt-Wire-low");
    }
  }
  return data.status;
}

function updateWires() {
  $(".term").each(function() {
    $(this).find(".termname, .termname span").css(
      "width", $(this).height() + "px"
    );
  });
  $(".year").each(function() {
    $(this).find(".yearname, .yearname span").css(
      "width", $(this).height() + "px"
    );
  });
  if (preventUpdateWires) {
    return false;
  }
  $(".classdiv").each(function() {
    $(this).data("terminals").terminal.redrawAllWires();
  });
}

// This does the work for the left-hand side checklist bar.
function checkClasses() {
  var totalUnits = 0;
  $("#COREchecker span.checkbox1").removeAttr('title');
  $(".corecheck").addClass("unused").removeClass("used");
  $(".classdiv").each(function(i) {
    var div = this;
    if (!$(div).data("checkrepeat")) return true;
    var forUnits = true;
    if (!$(div).data("special")) {
      totalUnits += $(div).data("total_units");
      return true;
    }
    if ($(div).data("gir")) {
      var effect = "#COREchecker .corecheck.unused.GIR." + $(div).data("gir") +
        ":first";
      if ($(effect).length) {
        $(effect).removeClass('unused').addClass('used').attr('title', $(div)
          .data("subject_id"));
        if ($(div).data("gir") == "LAB") {
          if (!$(effect).length) {
            totalUnits += $(div).data("total_units") - 6;
          }
          $(effect).removeClass('unused').addClass('used').attr('title', $(
            div).data("subject_id"));
        }
        forUnits = false;
      }
    }
    var thisterm = $(div).data("classterm");
    if ($(div).data("ci") && !($(".classdiv.CI:not(.CIM)").not(div).filter(
      function() {
        return ($(this).data("classterm") == $(div).data("classterm")) &&
          ($(this).index(".classdiv") < i);
      }).length)) {
      var effect = "#COREchecker .corecheck.unused.CI." + $(div).data("ci") +
        ":first";
      if ($(effect).length) {
        $(effect).removeClass('unused').addClass('used').attr('title', $(div)
          .data("subject_id"));
        forUnits = false;
      }
    }
    if ($(div).data("hass")) {
      var hass = [$(div).data("hass")];
      if (hass[0].indexOf(",") != -1) {
        hass = hass[0].split(",");
      }
      for (i in hass) {
        var effect = "#COREchecker .corecheck.unused.HASS." + hass[i] +
          ":first";
        if ($(effect).length) {
          $(effect).removeClass('unused').addClass('used').attr('title', $(
            div).data("subject_id"));
          forUnits = false;
        } else {
          if ((hass.length > 1) && (i != (hass.length - 1))) continue;
          var effect = "#COREchecker .corecheck.unused.HASS.HE:first";
          if ($(effect).length) {
            $(effect).removeClass('unused').addClass('used').attr('title', $(
              div).data("subject_id"));
            forUnits = false;
          }
        }
      }
    }
    if (forUnits) totalUnits += $(div).data("total_units");
  });
  totalUnits = Math.round(100 * totalUnits) / 100;
  $("#totalunits").html(totalUnits);
}

function addAllWires(noreload) {
  var status = true;
  $(".classdiv").each(function() {
    $(this).data("terminals").terminal.removeAllWires();
    $(this).data("classterm", $(this).parent().index(".term"));
    if ($(this).data("substitute")) {
      $(this).addClass($(this).data("substitute")
        .replace(/\./g, "_").replace(/,/g, " "));
    }
  }).each(function() {
    if ($(this).data("custom")) return true;
    var temp = addWires($(this));
    status = status && temp;
  });
  $(".term").each(function() {
    $(this).find(".termname span a").attr("href",
      "http://picker.mit.edu/browse.html?courses=" +
      $(this).find(".classdiv:not(.custom)").map(function() {
        return $(this).data("subject_code");
      }).get().join("%3B")
    );
  });
  updateWires();
  checkClasses();
  $("select.majorminor").each(function() {
    checkMajor(this);
  });
  // console.log("addAllWires");
  if (!noreload) {
    $(window).on("beforeunload", runBeforeUnload);
  }
  return status;
}

/*** Course-loading functions ***/

function classFromJSON(json, loadspeed, replacediv) {
  if (loadspeed === undefined) loadspeed = "slow";
  json = $.extend({}, {
    override: false
  }, json);
  if (json.classterm > 16) {
    $(".supersenior.hidden").removeClass("hidden", loadspeed);
  }
  if (json.classterm && json.classterm % 4 == 0) {
    $(".term .termname").eq(json.classterm)
      .fadeIn(loadspeed).parent().slideDown(loadspeed, function() {
        updateWires();
      }).siblings(".yearname").addClass("showsummer", loadspeed);
  }
  json.info = deGIR(json.info);
  if (replacediv === undefined) {
    $('.term').eq(json.classterm).append(json.div);
  } else {
    replacediv.replaceWith(json.div);
  }
  var id = json.divid;
  var newdiv = $("#" + id);
  if (json.reqs === null) {
    json.reqs = false;
  }
  json.reqstatus = true;
  if (json.override) {
    newdiv.addClass('classdivoverride');
  }
  for (attr in json) {
    newdiv.data(attr, json[attr]);
  }
  newdiv.data("terminals", {
    terminal: new WireIt.Terminal(newdiv[0], {
      editable: false
    }),
    wires: []
  });
  return newdiv;
}

function properYear(classterm) {
  return user.classYear
    - parseInt(3 - Math.floor((classterm - 1) / 4))
    - user.supersenior;
}

function getClass() {
  // pulls down and interprets the class data
  var classterm = $("#getnewclassterm").val();
  user.supersenior = (
    ($(".year.supersenior").is(":visible") || classterm > 16) ? 1 : 0
  );
  if ($("input[name='getnewclasstype']:checked").val() == "custom") {
    if (!$("#getnewclassname").val()) {
      return false;
    }
    var data = {
      getcustom: $("#getnewclassname").val(),
      getunits: $("#getnewclassunits").val() || 0
    };
  } else {
    if (!$("#getnewclassid").val()) {
      return false;
    }
    var data = {
      getclass: $("#getnewclassid").val(),
      getyear: 0
    };
    data.getyear = properYear(classterm);
  }
  $("#getnewclass .ui-autocomplete").hide();
  $(".getnewclasstypes input").val("");
  $.post('?', data, function(json) {
    if ($.inArray(json, ["error", "noclass", ""]) != -1) {
      return false;
    }
    json.classterm = classterm;
    json.override = false;
    classFromJSON(json);
    addAllWires();
    $('.getnewclasstypes.visible input:first').focus();
    $("#getnewclass .ui-autocomplete").hide();
    return true;
  }, "json");
}

// Used for initial pageload when a hash is present:
// takes in an array containing objects describing the classes.
function getClasses(classarr, noreload) {
  for (i = 0; i < classarr.length; i++) {
    classFromJSON(classarr[i], 0);
  }
  addAllWires(noreload);
}

/*** Major/minor functions ***/

function checkOff(majordiv, lvl, cls) {
  // $(majordiv+" .majorchk.majorchk_"+lvl.join("_")+":not(.chk):first")
  //   .addClass("chk").html("[X]")
  //   .attr("title",$.isArray(cls.div)?null:cls.div.data("subject_id"));
  var boxes = $(majordiv + " .majorchk.majorchk_" + lvl.join("_") +
    ":not(.chk):first");
  boxes.addClass("chk").attr("title", $.isArray(cls.div) ? null : cls.div.data(
    "subject_id"));
  return boxes.length;
}

function checkMajor(selector) {
  var val = $(selector).val();
  var div = $(selector).data("div");
  var span = $(selector).prev("span.majorminor");
  span.attr("data-empty", 1).removeAttr("data-value");
  if (majors[val] == undefined) majors[val] = [0];
  if (val == "m0") return $(div).html("") && false;
  span.attr("data-value", $(selector).find("option:selected").text())
    .removeAttr("data-empty");
  $(div).html(buildMajor(majors[val])).append(
    "<span class=\"letmeknow\"><br>See an error? Let me know " +
    "<a href=\"mailto:courseroad@mit.edu?subject=[CourseRoad]%20Error%20in%20" +
    val + "\">here<\/a>.<\/span>");
  draggableChecklist();
  checkReqs(majors[val], checkOff, [div, "lvl", "cls"]);
}

function buildMajor(arr, level) {
  if (level == undefined) level = []; // Keep track of recursion.
  // allows "and" arrays to be prefixed with a 0 (easier)
  // [0, "a", "b"] --> [2, "a", "b"];
  if (arr[0] == 0) arr[0] = arr.length - 1;
  if (typeof (arr[0]) == "number") {
    var holdobj = $.extend({}, Defaults.requisiteCount, {
      count: (0 + arr[0])
    });
  } else {
    var holdobj = $.extend({}, Defaults.requisiteCount, arr[0]);
  }
  // Holds the unsatisfied requisites in a string for display to the user.
  var tempstr = "";
  var temp2 = true;
  for (var i = 1; i < arr.length; i++) {
    if ($.isArray(arr[i])) {
      // In case a sub-branch is inside this branch,
      // we recursively solve that branch and use its result.
      var req = buildMajor(arr[i], level.concat([i]));
      tempstr += req;
      continue;
    }
    // Converting both things to objects,
    // but only the coreq ones will have a "coreq":1 thing.
    if (typeof (arr[i]) == "object") {
      var newarr = $.extend({}, Defaults.requisiteClass, arr[i]);
    } else {
      var newarr = $.extend({}, Defaults.requisiteClass, {
        id: arr[i]
      });
    }
    // Now check for ranges. These are strings of the form "X.XXX-X.XXX"
    if (newarr.range) {
      var innertempstr = "";
      for (var j = 0; j < holdobj.count; j++) {
        innertempstr += (
          "<span class='majorchk majorchk_" +
          level.concat([i]).join("_") +
          " checkbox1'>[<span>&#x2713;<\/span>]<\/span>"
        );
      }
      tempstr += (
        "<li>" + innertempstr + " The range " + newarr.id +
        newarr.desc + "<\/li>\n"
      );
      // return "<li>"+innertempstr + " " + holdobj.count +
      // "from the range "+newarr.id+newarr.desc+"<\/li>\n";
      continue;
    }
    // Now only strings
    tempstr += (
      "<li>" + (
        newarr.skip
        ? "&#x2006;&#x2014; "
        : "<span class='majorchk majorchk_" + level.concat([i]).join("_") +
          " checkbox1'>[<span>&#x2713;<\/span>]<\/span> "
      ) +
      (
        newarr.skip
        ? ""
        : "<span class='checkbox1_text' data-id='" + newarr.id + "'>"
      ) +
      newarr.id +
      (newarr.skip ? "" : "</span>") +
      newarr.desc + "<\/li>\n"
    );
  }
  tempstr = "<ul>\n" + tempstr + "<\/ul>\n";
  if (holdobj.special) {
    tempstr = holdobj.count + " " + holdobj.desc + ":\n" + tempstr;
  } else if (level.length || (!level.length && (holdobj.count != arr.length - 1))) {
    // the != part find the "2 from following" strings
    tempstr = holdobj.count + " " + holdobj.desc + ":\n" + tempstr;
  }
  if (!level.length) return "<strong>Requirements:<\/strong><br>\n" + tempstr;
  return "<li><span class='majorchk majorchk_" + level.join("_") +
    " checkbox1'>[<span>&#x2713;<\/span>]<\/span> " + tempstr + "<\/li>\n";
}

function draggableChecklist() {
  $(".checkbox1_text").draggable({
    appendTo: "#rightbar",
    // containment: "body",
    // distance: 30,
    helper: "clone",
    start: function(event, ui) {
      ui.helper.attr("data-term", "(none)");
      $(".term").addClass("notOKterm");
      $(".WireIt-Wire").addClass("WireIt-Wire-low");
    },
    stop: function(event, ui) {
      $(".term").removeClass("notOKterm");
      unhighlightClasses();
      $(".WireIt-Wire").removeClass("WireIt-Wire-low");
    },
    revert: "invalid",
    zIndex: 2700
  });
}

/*** Helper functions ***/

function unhighlightClasses() {
  $("#overridercheck").prop("disabled", true);
  $("#overrider span").css('opacity', 0);
  $(".classdiv").removeClass("classdivhigh classdivlow");
  $('.WireIt-Wire').removeClass("WireIt-Wire-low");
  $("#nowreading").html('Click on a class to see more info.');
}

function deGIR(str) {
  return str.replace(/GIR:PHY1/g, "Physics I (GIR)")
            .replace(/GIR:PHY2/g, "Physics II (GIR)")
            .replace(/GIR:CAL1/g, "Calculus I (GIR)")
            .replace(/GIR:CAL2/g, "Calculus II (GIR)")
            .replace(/GIR:BIOL/g, "Biology (GIR)")
            .replace(/GIR:CHEM/g, "Chemistry (GIR)")
            .replace(/GIR:REST/g, "REST Requirement")
            .replace(/GIR:LAB/g, "LAB Requirement")
            .replace(/GIR:LAB2/g, "1/2 LAB Requirement");
}

/**
 * Creates the storable string which holds our precious class data.
 * Used primarily in saved classes
 */
function minclass(stringify) {
  if (stringify == undefined) stringify = false;
  var temp = $(".classdiv").map(function() {
    arr = $(this).data("custom") ? {
      name: $(this).data("subject_title"),
      units: $(this).data("total_units"),
      custom: true
    } : {
      id: $(this).data("subject_id"),
      year: $(this).data("oyear")
    };
    arr.term = $(this).data("classterm");
    if ($(this).data("override")) {
      arr.override = $(this).data("override");
    }
    if ($(this).data("substitute")) {
      arr.substitute = $(this).data("substitute");
    }
    return arr;
  }).get();
  return stringify ? JSON.stringify(temp) : temp;
}

function minmajors(stringify) {
  var temp = [
    $("#choosemajor").val(),
    $("#choosemajor2").val(),
    $("#chooseminor").val(),
    $("#chooseminor2").val()
  ];
  return stringify ? JSON.stringify(temp) : temp;
}

// Simply returns a date which is relative to now
function deltaDate() {
  var d = new Date();
  d = [
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  ];
  for (var t = 0; t < arguments.length; t++) {
    d[t] += arguments[t];
  }
  return new Date(d[0], d[1], d[2], d[3], d[4], d[5], d[6]);
}

/*** UI/Page-loading functions ***/

function runBeforeUnload() {
  return (
    "Are you sure you want to close CourseRoad? " +
    "You'll lose any unsaved changes you've made."
  );
}

var userHashChange = true;
window.onhashchange = function() {
  // userHashChange means that if the user types in a new hash in the URL,
  // the browser will reload, but if the hash changes due to saving a new version or something it won't.
  userHashChange = !userHashChange || window.location.reload();
  document.title = "CourseRoad: " + window.location.hash.substr(1);
}

function swapClassYear(oldclass, newyear) {
  oldclass.addClass("classdivlow");
  $.post('?', {
    getclass: oldclass.data("subject_id"),
    getyear: newyear
  }, function(json) {
    if ($.inArray(json, ["error", "noclass", ""]) != -1) return false;
    json.classterm = oldclass.data("classterm");
    json.override = oldclass.data("override");
    classFromJSON(json, 0, oldclass);
    addAllWires();
    unhighlightClasses();
  }, "json");
}

var reasonToTrySave = preventUpdateWires = false;
var totalUnits = 0;
var crSetup = function() {
  crSetup = undefined;
  $("#getnewclass").tabs({
    collapsible: false,
    selected: (loggedin ? 1 : 0)
  });
  user.supersenior = $(".year.supersenior").is(":visible") ? 1 : 0;
  /**
   * // Assures regular updating of the window, should anything change
   * setInterval(function() {
   *   if(Math.random() < 0.1) {
   *     console.log(1);
   *     addAllWires(true)
   *   } else {
   *     console.log(0);
   *     updateWires()
   *   }
   * }, 10000);
   */
  // Assures regular updating of the window, should anything change
  setInterval(function() {
    addAllWires(true);
  }, 10000);
  if (thishash) {
    var jsonmajors = thishash.pop();
    $("select.majorminor").each(function(i) {
      $(this).val(jsonmajors[i]).attr("selected", true);
    });
    getClasses(thishash);
  } else if (window.location.hash) {
    // Load hash's classes on pageload
    $("#loading").show();
    userHashChange = false;
    window.location.hash = window.location.hash.replace(/\/+$/, '');
    document.title = "CourseRoad: " + window.location.hash.substr(1);
    $.post("?", {
      gethash: window.location.hash
    }, function(data) {
      $("#loading").hide();
      if (data == "") return false;
      var json = $.parseJSON(data);
      var jsonmajors = json.pop();
      $("select.majorminor").each(function(i) {
        $(this).val(jsonmajors[i]).attr("selected", true);
      });
      getClasses(json, true);
      $(window).off("beforeunload", runBeforeUnload);
    });
    userHashChange = true;
  }
  if (addterm) {
    getClasses(addterm);
    $(window).on("beforeunload", runBeforeUnload);
  }
  thisterm = addterm = 0;
  $("body").on("click", ".classdivyear span", function() {
    var par = $(this).parents(".classdiv");
    if (par.data("changing")) return false;
    par.data("changing", true);
    $(this).replaceWith(function() {
      return par.data("otheryears");
    });
    par.data("changing", false);
    par.find(".classdivyear select").focus();
  }).on("change blur", ".classdivyear select", function(event) {
    var val = $(this).val();
    var oldclass = $(this).parents(".classdiv");
    if (oldclass.data("changing")) return false;
    oldclass.data("changing", true);
    if (val == oldclass.data("year")) {
      $(this).replaceWith(function() {
        return oldclass.data("yearspan");
      });
      oldclass.data("changing", false);
      return false;
    }
    swapClassYear(oldclass, val);
  }).on("click", ".classdiv", function() {
    // Highlights the selected class, dims the others,
    // and displays info on that class in the lower right
    $(".classdiv").not($(this)).removeClass("classdivhigh");
    $(".classdiv").removeClass("classdivlow");
    $(this).toggleClass("classdivhigh");
    if ($('.classdivhigh').length == 1) {
      $("#overrider span").css('opacity', 1);
      $('.classdiv').not($(this)).addClass("classdivlow");
      $('.WireIt-Wire').addClass("WireIt-Wire-low");
      for (i in $(".classdivhigh").data("terminals").terminal.wires) {
        $($(".classdivhigh").data("terminals").terminal.wires[i].element)
          .removeClass("WireIt-Wire-low");
      }
      $("#nowreading").html($('.classdivhigh').data("info")).scrollTop(0);
      $("#overridercheck").prop("disabled", false).prop("checked", $(
        '.classdivhigh').data('override'));
    } else {
      unhighlightClasses();
    }
  }).on("click", "canvas.WireIt-Wire", unhighlightClasses).keydown(function(
    event) {
    var cls = $(".classdiv.classdivhigh");
    if (event.which == 46 && cls.length && confirm(
      "Are you sure you want to delete " + (cls.data("subject_id") || ("\"" +
        cls.data("subject_title") + "\"")) + "?")) {
      cls.remove();
      unhighlightClasses();
      addAllWires();
    }
  }).on("click", ".my-dialog-close, .ui-widget-overlay", function() {
    $(".my-dialog").dialog('close');
  }).on("click", ".choosesavedroad", function() {
    $.post("?", {
      choosesavedroad: $(this).val()
    });
  }).on("click", ".deleteroad", function() {
    if (!confirm(
      "Are you sure you want to delete this road? This action cannot be undone."
    )) return false;
    var parent = $(this).parents("tr");
    $.post("?", {
      deleteroad: parent.data("hash")
    }, function(data) {
      if (data == "ok") parent.fadeOut('slow').delay(2000).queue(function() {
        $(this).remove();
      });
      if (window.location.hash.substr(1) == parent.data("hash")) $(window).on(
        "beforeunload", runBeforeUnload);
    });
  }).on("click", ".saved-roads-edit-hash", function() {
    var newhash2 = prompt(
      "Enter a new hash for this saved road below " +
      "(max. 36 characters, letters, numbers, and hyphens only):",
      $(this).prev().text());
    if (newhash2 === false) return false;
    newhash2 = newhash2.substr(0, 36);
    var prev = $(this).prev();
    prev.addClass("newload");
    $.post("?", {
      changeroadhash: $(this).parents("tr").data("hash"),
      newhash: newhash2
    }, function(data) {
      console.log(data, window.location.hash, prev.parents("tr").data(
        "hash"), window.location.hash == prev.parents("tr").data("hash"));
      if (window.location.hash.substr(1) == prev.parents("tr").data("hash")) {
        userHashChange = false;
        window.location.hash = data;
        document.title = "CourseRoad: " + window.location.hash.substr(1);
      }
      prev.text(data.substr(data.indexOf("/") + 1))
          .removeClass("newload").parents("tr")
          .data("hash", data).attr("data-hash", data)
          .find(":radio").val(data).parents("tr")
          .find("a.hashlink").attr("href", "?hash=" + data);
    });
  }).on("click", ".saved-roads-edit-comment", function() {
    var comment = prompt(
      "Enter your comment for this saved road below (max. 100 characters):",
      $(this).prev().text());
    if (comment === false) return false;
    comment = comment.substr(0, 100);
    var prev = $(this).prev();
    prev.addClass("newload");
    $.post("?", {
      commentonroad: $(this).parents("tr").data("hash"),
      commentforroad: comment
    }, function(data) {
      prev.text(data).removeClass("newload");
    });
  }).on("click", ".dummylink", function(e) {
    e.preventDefault();
  });
  $("#overridercheck").change(function() {
    $(".classdivhigh").data("override", $(this).prop("checked"));
    $('.classdivhigh').toggleClass("classdivoverride");
    addAllWires();
  });
  $(".term, .year, #getnewclass, #getnewclass>ul *").click(unhighlightClasses);
  $(".term").sortable({
    // Allows the classes to be draggable and sortable.
    connectWith: '.term',
    containment: '#rightbar',
    cursor: 'default',
    distance: 20,
    items: '.classdiv',
    opacity: 0.8,
    placeholder: 'ui-sortable-placeholder',
    scroll: true,
    zIndex: 99,
    start: function(event, ui) {
      preventUpdateWires = true;
      $('.WireIt-Wire').hide();
      var terms = ["fall", "iap", "spring", "summer"];
      for (s in terms) $("." + terms[s]).addClass(ui.item.data("custom") ||
        ui.item.data(terms[s]) ? "OKterm" : "notOKterm");
    },
    stop: function(event, ui) {
      preventUpdateWires = false;
      $('.classdiv').removeAttr("style");
      $('.WireIt-Wire').show();
      $(".term").removeClass("OKterm notOKterm");
      addAllWires();
    }
  }).droppable({
    accept: ".checkbox1_text",
    over: function(event, ui) {
      $(".term").not(this).addClass("notOKterm");
      $(this).removeClass("notOKterm");
      ui.helper.attr(
        "data-term",
        $("#getnewclassterm option").eq($(this).index(".term")).text()
      );
    },
    out: function(event, ui) {
      $(this).addClass("notOKterm");
    },
    drop: function(event, ui) {
      $(".term").removeClass("notOKterm");
      classterm = $(this).index(".term");
      var data = {
        getclass: event.target.innerHTML,
        getyear: 0
      };
      data.getyear = properYear(classterm);
      $.post('?', data, function(json) {
        if ($.inArray(json, ["error", "noclass", ""]) != -1) return false;
        json.classterm = classterm;
        json.override = false;
        classFromJSON(json);
        addAllWires();
      }, "json");
      draggableChecklist();
    }
  });
  $("#rightbar").disableSelection();
  $("#trash").droppable({
    accept: '.classdiv',
    hoverClass: 'drophover',
    tolerance: 'touch',
    activate: function(event, ui) {
      $(this).addClass('trashon', 'slow');
    },
    deactivate: function(event, ui) {
      $(this).removeClass('trashon', 'fast');
    },
    over: function(event, ui) {
      $(".trash").addClass('trashhover', 'fast');
    },
    out: function(event, ui) {
      $(".trash").removeClass('trashhover', 'fast');
    },
    drop: function(event, ui) {
      preventUpdateWires = false;
      ui.draggable.remove();
      $(".trash").removeClass('trashhover', 'fast');
      addAllWires();
    }
  });
  $('#getnewclassid').blur(function() {
    $("#getnewclass .ui-autocomplete").hide();
  }).focus();
  $('#getnewclasssubmit').click(getClass);
  $("input[name='getnewclasstype']").change(function() {
    $(".getnewclasstypes").toggleClass("visible").filter(".visible").find(
      "input:first").focus();
  });
  $("#getnewclassid").autocomplete({
    source: function(request, response) {
      $.post("?", {
        autocomplete: request.term
      }, response, "json");
    },
    minLength: 2,
    appendTo: "#getnewclass",
    disabled: !user.autocomplete
  });
  $(".getnewclasstypes input").keydown(function(event) {
    if (event.which == 13) getClass();
  });
  $("button.changeclassterm").click(function() {
    $('.getnewclasstypes.visible input:first').focus();
    $("#getnewclassterm").val(Math.max(0, Math.min($(
      "#getnewclassterm option").length - 1, parseInt($(
      "#getnewclassterm").val()) + parseInt($(this).val()))));
  });
  $("#savemap").click(function() {
    $("#savemap").val("Saving...").prop("disabled", true);
    $.post("?", {
      classes: minclass(true),
      majors: minmajors(true),
      trycert: loggedin
    }, function(data) {
      $(window).off("beforeunload", runBeforeUnload);
      if (loggedin) {
        if (data == "**auth**") {
          // This redirects us to the secure cert check.
          window.location.href =
            "https://courseroad.mit.edu:444/secure.php";
        } else {
          userHashChange = false;
          window.location.hash = data;
          document.title = "CourseRoad: " + window.location.hash.substr(1);
        }
      } else {
        userHashChange = false;
        window.location.hash = data;
        document.title = "CourseRoad: " + window.location.hash.substr(1);
      }
      $("#savemap").val("Save Courses").prop("disabled", false);
    });
  });
  if (!loggedin && triedlogin) $("#mapcerts").hide();
  $("#mapcerts").click(function() {
    if (loggedin) {
      $("#viewroads").dialog("open");
    } else {
      $("#mapcerts").val("Saving...").prop("disabled", true);
      $.post("?", {
        classes: minclass(true),
        majors: minmajors(true),
        trycert: true
      }, function(data) {
        $(window).off("beforeunload", runBeforeUnload);
        if (data == "**auth**") {
          window.location.href =
            "https://courseroad.mit.edu:444/secure.php";
        } else {
          userHashChange = false;
          window.location.hash = data;
          document.title = "CourseRoad: " + window.location.hash.substr(1);
        }
        $("#mapcerts").val("Save with Login (requires certs)").prop(
          "disabled", false);
      });
    }
  });
  $("select.majorminor").on("change", function() {
    checkMajor(this);
  });
  $("#viewroads").dialog({
    autoOpen: false,
    width: 900,
    draggable: false,
    resizeable: false,
    modal: true,
    open: function(event, ui) {
      $("#savedroads").html("Loading...");
      $.post("?", {
        savedroads: 1
      }, function(data) {
        $("#savedroads").html(data);
      });
    }
  });
  // Runs the help dialog down below
  $("#help").dialog({
    autoOpen: false,
    width: 600,
    draggable: false,
    resizeable: false,
    modal: true
  });
  $("#accordion").accordion({
    autoHeight: false,
    collapsible: true,
    change: function(event, ui) {
      var temp = ui.newContent.length ? ui.newContent.position().top : 0;
    }
  });
  $("#openhelp").click(function() {
    $("#help").dialog('open').dialog('option', 'position', 'center');
    $("#accordion").accordion("resize");
  });
  setTimeout(function() {
    $("#help").dialog('option', 'position', 'center');
    $("#accordion").accordion("resize");
  }, 2500);
  $("select.majorminor option").each(function() {
    if (majors[$(this).val()] == undefined) $(this).remove();
  });
  $(window).resize(updateWires);
  $("#printroad").click(function() {
    $("body, #rightbar, .term, .year").toggleClass("printing");
    updateWires();
    window.print();
    $("body, #rightbar, .term, .year").toggleClass("printing");
    updateWires();
  });
  $(".flakyCSS").removeClass("flakyCSS");
  var doge = new Konami(function() { 
    $("#rightbar").addClass("doge");
  });
  $("#userlogin").click(function() {
    window.location.href = "https://courseroad.mit.edu:444/secure.php";
  });
  $("#usersettings").dialog({
    autoOpen: false,
    draggable: false,
    resizeable: false,
    modal: true
  });
  $("#showusersettings").click(function() {
    $("#usersettings").dialog('open');
  });
  $("#usersettings_save").click(function() {
    var data = {
      usersettings: 1,
      class_year: $("#usersettings_class_year").val(),
      toggle_view_req_lines: ($("#usersettings_view_req_lines").prop(
        "checked") ? 1 : 0),
      toggle_autocomplete: ($("#usersettings_autocomplete").prop("checked") ?
        1 : 0)
    };
    var old_class_year = user.classYear;
    $("#usersettings_div").load("?", data, function() {
      user.classYear = parseInt($("#usersettings_class_year").val());
      user.viewReqLines = ($("#usersettings_view_req_lines").prop("checked") ?
        1 : 0);
      user.autocomplete = ($("#usersettings_autocomplete").prop("checked") ?
        1 : 0);
      user.needPermission = ($("#usersettings_need_permission").prop(
        "checked") ? 1 : 0);

      $("#usersettings_saved").show().delay(1000).fadeOut("slow");
      $("body").toggleClass("no-wires", !user.viewReqLines);
      if (old_class_year != user.classYear && confirm(
        "You changed your saved class year. Would you like to edit the year " +
        "versions of your classes to match that change? " +
        "(Clicking Cancel will prevent this behavior)"
      )) {
        console.log("Let's go.");
        $(".classdiv:not(.custom)").each(function() {
          if ($(this).data("oyear") == properYear($(this).data(
            "classterm"))) return true;
          swapClassYear($(this), properYear($(this).data("classterm")));
        });
      }
      addAllWires();
      $("#getnewclassid").autocomplete("option", "disabled", !user.autocomplete);
      $(window).off("beforeunload", runBeforeUnload);
    });
  });
  $(".termname span").wrapInner(
    '<a href="http://picker.mit.edu/browse.html?courses=" ' +
    'class="spannamepicker" target="_blank" title="Click to head over to ' +
    'Picker to check your classes for this semester."></a>'
  );
};
