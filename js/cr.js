/**
 * Welcome to the cr.js file!
 */

var Defaults = {
  requisiteCount: {
    count: 0,
    type: '',
    desc: 'from',
    special: 0,
    globalMatchesSkip: 0, // Do not add classes to globalMatches
    globalMatchesIgnore: 0, // Ignore whether classes are in globalMatches
    runinfull: 0,
    pullmatches: 0 // Hold onto match information for subtrees
  },

  requisiteClass: {
    id: '',
    desc: '',
    skip: 0,
    coreq: 0,
    range: 0,
    dept: '',
    from: '',
    to: '',
    globalMatchesSkip: 0,
    globalMatchesIgnore: 0
  }
};

/**
 * The idea here is to make it possible to loop recursively through
 * a requisite tree and perform callback actions when a class matches.
 *
 * Arguments:
 * - arr: The array which stores the requisites. Usually recursively called. For
 *     more information on arr, see majors.js.
 * - callback: function to run on sucessfully matched classes, and can define
 *     further criteria for filtering. Defaults to returning true.
 * - callbackArgs: Holds the arguments for callback. "cls" (with quotes) will be
 *     replaced with the matched course number before being fed into callback.
 * - level: Used for recursive calls of checkRequisites. At the top level, it is
 *     length 0, []. In each level of recursion, that level gets an array of
 *     index values down through the recursion.
 *
 * Returns an array, as follows:
 * [
 *  boolean (were reqs met),
 *  string (information on what requisites are still needed),
 *  array of matched classes
 * ]
 */
var globalMatches = [];
function checkRequisites(arr, callback, callbackArgs, level) {
  callback = callback || function() { return true; };
  callbackArgs = callbackArgs || [];
  if (level === undefined) {
    level = [];
    globalMatches = [];
  }
  
  var matchParams = getMatchParams(arr);
  
  // Holds the unsatisfied requisites in a string for display to the user.
  var unsatisfiedRequisitesInfo = [];
  var requisiteBranch;
  var temp2;
  var newarr;
  var newMatch;
  for (var i = 1; i < arr.length; i++) {
    if ($.isArray(arr[i])) {
      // In case a sub-branch is inside this branch, we recursively solve that 
      // branch and use its result.
      requisiteBranch = checkRequisites(
        arr[i], callback, callbackArgs, level.concat([i])
      );
      // If the branch is satisfied, or if we need to count something like
      // [5, [2, 'foo', 'bar'], [4, 'baz', 'bam', bax', 'bay']] where the 4 from
      // will not necessarily be satisfied while the 5 from will be, then count.
      if (requisiteBranch[0] || matchParams.pullmatches) {
        if (matchParams.special) {
          $(requisiteBranch[2]).each(function() {
            matchParams.count -= $(this).data(matchParams.type);
          });
        } else {
          matchParams.count--;
        }
      }

      if (requisiteBranch[0]) {
        temp2 = applyCallbackFn(
          arr[i], callback, callbackArgs, level, i, newarr
        );
      } else {
        unsatisfiedRequisitesInfo.push(requisiteBranch[1]);
      }
      continue;
    }
    /**
     * Deal with the objects (for things like coreqs) now.
     * Converting both things to objects, but only the coreq ones
     * will have a "coreq":1 attribute.
     */
    newMatch = getMatchObject(arr[i]);
    
    if (newMatch.skip) {
      continue;
    }
    if (newMatch.id === 'Permission' && !user.needPermission) {
      if (matchParams.initialCount == arr.length - 1) {
        matchParams.count -= (
          matchParams.special ? $(this).data(matchParams.type) : 1
        );
      }
      continue;
    }
    newarr = newMatch;
    // Now check for ranges. These are strings of the form 'X.XXX-X.XXX'
    if (newarr.range) {
      var rangematches = $('.classdiv:not(.custom)').filter(function(index) {
        var rng = [newarr.dept, '.' + newarr.from, '.' + newarr.to];
        var data = $(this).data();
        var temp2 = [data.subject_id].concat(data.joint_subjects || []);
        for (j in temp2) {
          var temp3 = [temp2[j].split('.')[0], '.' + temp2[j].split('.')[1]];
          if ((temp3[0] == rng[0]) && (rng[1] <= temp3[1]) && (temp3[1] <=
            rng[2])) {
            return true;
          }
        }
        return false;
      }).each(function() {
        if (
            $.inArray(this, globalMatches) != -1 && 
            !matchParams.globalMatchesIgnore && 
            !newarr.globalMatchesIgnore) {
          return true;
        }
        // Calls callback with tempargs as its arguments.
        var temp2 = applyCallbackFn(
          $(this), callback, callbackArgs, level, i, newarr
        );
        if (temp2) {
          matchParams.count -= (
            matchParams.special ? $(this).data(matchParams.type) : 1
          );
          matchParams.matchesFound.push(this);
          !newarr.globalMatchesSkip 
            && !matchParams.globalMatchesSkip 
            && globalMatches.push(this);
          newarr.globalMatchesSkip 
            && console.log('newarrskip', newarr, matchParams);
          matchParams.globalMatchesSkip 
            && console.log('matchParamsskip', newarr, matchParams);
        }
        if (matchParams.count <= 0 && !matchParams.runinfull) {
          return [
            true, '', level.length ? matchParams.matchesFound : globalMatches
          ];
        }
      });
      if (matchParams.count <= 0) {
        return [
          true, '', level.length ? matchParams.matchesFound : globalMatches
        ];
      }
      unsatisfiedRequisitesInfo.push(
        (newarr.coreq === 1)
        ? ('[' + newarr.id + newarr.desc + ']')
        : (newarr.id + newarr.desc)
      );
      continue;
    }
    // Now only bona fide classes
    var classmatches = $('.classdiv.' + (
      newarr.id.toUpperCase().replace('.', '_').replace(':', '.')
    ));
    classmatches.each(function() {
      if (
          $.inArray(this, globalMatches) != -1 
          && !matchParams.globalMatchesIgnore 
          && !newarr.globalMatchesIgnore) {
        return true;
      }
      // Calls callback with tempargs as its arguments.
      var temp2 = applyCallbackFn(
        $(this), callback, callbackArgs, level, i, newarr
      );
      if (temp2) {
        matchParams.count -= (
          matchParams.special ? $(this).data(matchParams.type) : 1
        );
        matchParams.matchesFound.push(this);
        !newarr.globalMatchesSkip 
          && !matchParams.globalMatchesSkip 
          && globalMatches.push(this);
        return false;
      }
    });
    // If it's not a class, or callback failed, then we need to note that.
    if (!classmatches.length || !temp2) {
      unsatisfiedRequisitesInfo.push(
        (newarr.coreq == 1)
        ? ('[' + newarr.id + newarr.desc + ']')
        : (newarr.id + newarr.desc)
      );
    }
    if (matchParams.count <= 0 && !matchParams.runinfull) {
      return [
        true, '', level.length ? matchParams.matchesFound : globalMatches
      ];
    }
  }
  // return two pieces of info: state and string
  if (matchParams.count <= 0) {
    return [true, '', level.length ? matchParams.matchesFound : globalMatches];
  }
  var unsatisfiedRequisitesInfo = unsatisfiedRequisitesInfo.join(', ');
  unsatisfiedRequisitesInfo = deGIR(unsatisfiedRequisitesInfo);
  if (matchParams.special) {
    unsatisfiedRequisitesInfo = (
      '(' + matchParams.count + ' ' + matchParams.desc + ': ' +
      (JSON.stringify(arr.slice(1))) + ')'
    );
  } else if (level.length || (!level.length && (arr[0] != arr.length - 1))) {
    unsatisfiedRequisitesInfo = (
      '(' + matchParams.count + ' ' + matchParams.desc + ': ' + 
      unsatisfiedRequisitesInfo + ')'
    );
  }
  return [
    false, 
    unsatisfiedRequisitesInfo, 
    level.length ? matchParams.matchesFound : globalMatches
  ];
}

function getMatchParams(arr) {
  var matchedElement = arr[0];
  
  if (typeof matchedElement === 'number') {
    // Shortcut "all of the following" lists with a 0 in front:
    // [0, "a", "b"] --> [2, "a", "b"];
    if (matchedElement === 0) {
      matchedElement = arr.length - 1;
    }
    matchedElement = { count: parseInt(0 + matchedElement) };
  }
  
  var matchedObject = $.extend({}, Defaults.requisiteCount, matchedElement);
  matchedObject.initialCount = matchedObject.count;
  matchedObject.matchesFound = [];
  
  return matchedObject;
}

function getMatchObject(match) {
  var newMatch;
  if (typeof match == 'object') {
    newMatch = $.extend({}, Defaults.requisiteClass, match);
  } else {
    newMatch = $.extend({}, Defaults.requisiteClass, {
      id: match
    });
  }
  if (newMatch.desc === undefined) {
    newMatch.desc = '';
  }
  return newMatch;
}

function applyCallbackFn(obj, callback, callbackArgs, level, i, newarr) {
  // Copye args
  var tempArgs = callbackArgs.slice();
  var clsPosition = $.inArray('cls', tempArgs);
  if (clsPosition != -1) {
    tempArgs[clsPosition] = $.extend({}, newarr, {
      div: obj
    });
  }
  var lvlPosition = $.inArray('lvl', tempArgs);
  if (lvlPosition != -1) {
    tempArgs[lvlPosition] = level.concat([i]);
  }
  // Calls callback with tempArgs as its arguments.
  return callback.apply(null, tempArgs);
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
  var fromid = from.attr('id');
  var toid = to.div.attr('id');
  var fromterm = from.data('classterm') + 0;
  var toterm = to.div.data('classterm') + 0;
  var dterm = Math.abs(fromterm - toterm);
  var options = {
    prereq: {
      color: '#888888',
      bordercolor: '#B8B8B8',
      borderwidth: 1,
      width: 2,
      OK: true
    },
    coreq: {
      color: '#000000',
      bordercolor: '#000000',
      borderwidth: 1,
      width: 1,
      OK: true
    },
    error: {
      color: '#ff0000',
      bordercolor: '#dd0000',
      borderwidth: 1,
      width: 1,
      OK: false
    }
  };
  var option = 'prereq';
  if (to.coreq) {
    option = 'coreq';
  } else {
    toterm += to.div.data('override') ? 0 : 1;
  }
  if ((fromterm < toterm) && (fromterm || dterm)) {
    option = 'error';
  }
  var wireType = (dterm == 1 || dterm == 2) ? 'Wire' : 'BezierWire';
  user.viewReqLines && from.data('terminals').wires.push(
    new WireIt[wireType](
      from.data('terminals').terminal,
      to.div.data('terminals').terminal,
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
    var reqcheck = checkRequisites(data.reqs, newWire, [div, 'cls']);
    data.reqstatus = reqcheck[0];
    var tempstr = reqcheck[1];
    if (data.reqstatus || data.override || !data.classterm) {
      div.find('.reqs').html('Reqs: [X]').removeAttr('title');
    } else {
      div.find('.reqs').html('Reqs: [ ]').attr('title', 'Need: ' + tempstr);
    }
    if (data.override) div.find('.reqs').attr('title',
      'OVERRIDE enabled');
  }
  data.checkterm = (data.classterm == 0) || (([data.fall,
    data.iap, data.spring, data.summer])[(data.classterm - 1) % 4]);
  data.checkrepeat = true;
  if ($.inArray(data.grade_rule, ['J', 'U', 'R']) == -1) {
    if ($('.classdiv').not(div).filter(function(j) {
      return (
        (
          $.inArray($(this).data('subject_id'), data.equiv_subjects) !== -1 ||
          $(this).hasClass(data.id)
        ) &&
        (j < $(div).index('.classdiv'))
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
  div.removeClass('classdivgood').removeAttr('title');
  if (data.status) div.addClass('classdivgood');
  if (!data.checkrepeat) div.attr('title', data.subject_id +
    ' is not counting for credit');
  if (!data.checkterm) div.attr('title', data.subject_id +
    ' is not available ' + (['in the Fall term', 'during IAP',
      'in the Spring term', 'in the Summer term'])[(data.classterm - 1) %
      4]);
  if (!data.offered_this_year) div.attr('title', data.subject_id +
    ' is not available in this year (' + div.data('year_range') + ')');
  if (data.override) div.find('.coreqs').attr('title',
    'OVERRIDE enabled');
  if ($('.classdivhigh').length == 1) {
    $('.WireIt-Wire').addClass('WireIt-Wire-low');
    $('.classdivhigh').data('terminals').terminal.wires.forEach(function(wire) {
      $(wire.element).removeClass('WireIt-Wire-low');
    });
  }
  return data.status;
}

function updateWires() {
  $('.term').each(function() {
    $(this).find('.termname, .termname span').css(
      'width', $(this).height() + 'px'
    );
  });
  $('.year').each(function() {
    $(this).find('.yearname, .yearname span').css(
      'width', $(this).height() + 'px'
    );
  });
  if (preventUpdateWires) {
    return false;
  }
  $('.classdiv').each(function() {
    $(this).data('terminals').terminal.redrawAllWires();
  });
}

// This does the work for the left-hand side checklist bar.
function checkClasses() {
  var totalUnits = 0;
  $('#COREchecker span.checkbox1').removeAttr('title');
  $('.corecheck').addClass('unused').removeClass('used');
  $('.classdiv').each(function(i) {
    var div = this;
    var $this = $(this);
    if (!$this.data('checkrepeat')) return true;
    var forUnits = true;
    if (!$this.data('special')) {
      totalUnits += $this.data('total_units');
      return true;
    }
    var GIR = $this.data('gir');
    if (GIR) {
      var $effect = $('.corecheck.unused.GIR.' + GIR + ':first');
      if ($effect.length) {
        $effect.removeClass('unused').addClass('used').attr('title', $this
          .data('subject_id'));
        if (GIR == 'LAB') {
          if (!$effect.length) {
            totalUnits += $this.data('total_units') - 6;
          }
          $effect.removeClass('unused').addClass('used').attr('title', 
            $this.data('subject_id')
          );
        }
        forUnits = false;
      }
    }
    var thisterm = $this.data('classterm');
    if ($this.data('ci') && !($('.classdiv.CI:not(.CIM)').not(div).filter(
      function() {
        return ($(this).data('classterm') == $(div).data('classterm')) &&
          ($(this).index('.classdiv') < i);
      }).length)) {
      var $effect = $('#COREchecker .corecheck.unused.CI.' + $this.data('ci') +
        ':first');
      if ($effect.length) {
        $effect.removeClass('unused').addClass('used').attr('title', $this
          .data('subject_id'));
        forUnits = false;
      }
    }
    if ($this.data('hass')) {
      var hass = [$this.data('hass')];
      if (hass[0].indexOf(',') != -1) {
        hass = hass[0].split(',');
      }
      for (i in hass) {
        var $effect = $('#COREchecker .corecheck.unused.HASS.' + hass[i] +
          ':first');
        if ($effect.length) {
          $effect.removeClass('unused').addClass('used').attr('title', $(
            div).data('subject_id'));
          forUnits = false;
        } else {
          if ((hass.length > 1) && (i != (hass.length - 1))) continue;
          var $effect = $('#COREchecker .corecheck.unused.HASS.HE:first');
          if ($effect.length) {
            $effect.removeClass('unused').addClass('used').attr('title', $(
              div).data('subject_id'));
            forUnits = false;
          }
        }
      }
    }
    forUnits && (totalUnits += $this.data('total_units'));
  });
  totalUnits = Math.round(100 * totalUnits) / 100;
  $('#totalunits').html(totalUnits);
}

function addAllWires(noreload) {
  var status = true;
  $('.classdiv').each(function() {
    var $this = $(this);
    $this.data('terminals').terminal.removeAllWires();
    $this.data('classterm', $this.parent().index('.term'));
    if ($this.data('substitute')) {
      $this.addClass($this.data('substitute')
        .replace(/\./g, '_').replace(/,/g, ' '));
    }
  }).each(function() {
    var $this = $(this);
    if ($this.data('custom')) return true;
    var temp = addWires($this);
    status = status && temp;
  });
  $('.term').each(function() {
    $(this).find('.termname span a').attr('href',
      'http://picker.mit.edu/browse.html?courses=' +
      $(this).find('.classdiv:not(.custom)').map(function() {
        return $(this).data('subject_code');
      }).get().join('%3B')
    );
  });
  updateWires();
  checkClasses();
  $('select.majorminor').each(function() {
    checkMajor(this);
  });
  // console.log('addAllWires');
  if (!noreload) {
    $(window).on('beforeunload', runBeforeUnload);
  }
  return status;
}

/*** Course-loading functions ***/

function classFromJSON(json, loadspeed, replacediv) {
  if (loadspeed === undefined) loadspeed = 'slow';
  json = $.extend({}, {
    override: false
  }, json);
  if (json.classterm > 16) {
    $('.supersenior.hidden').removeClass('hidden', loadspeed);
  }
  if (json.classterm && json.classterm % 4 == 0) {
    $('.term .termname').eq(json.classterm)
      .fadeIn(loadspeed).parent().slideDown(loadspeed, function() {
        updateWires();
      }).siblings('.yearname').addClass('showsummer', loadspeed);
  }
  json.info = deGIR(json.info);
  if (replacediv === undefined) {
    $('.term').eq(json.classterm).append(json.div);
  } else {
    replacediv.replaceWith(json.div);
  }
  var id = json.divid;
  var newdiv = $('#' + id);
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
  newdiv.data('terminals', {
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
  var classterm = $('#getnewclassterm').val();
  user.supersenior = (
    ($('.year.supersenior').is(':visible') || classterm > 16) ? 1 : 0
  );
  if ($('input[name="getnewclasstype"]:checked').val() == 'custom') {
    if (!$('#getnewclassname').val()) {
      return false;
    }
    var data = {
      getcustom: $('#getnewclassname').val(),
      getunits: $('#getnewclassunits').val() || 0
    };
  } else {
    if (!$('#getnewclassid').val()) {
      return false;
    }
    var data = {
      getclass: $('#getnewclassid').val(),
      getyear: 0
    };
    data.getyear = properYear(classterm);
  }
  $('#getnewclass .ui-autocomplete').hide();
  $('.getnewclasstypes input').val('');
  $.post('?', data, function(json) {
    if ($.inArray(json, ['error', 'noclass', '']) != -1) {
      return false;
    }
    json.classterm = classterm;
    json.override = false;
    classFromJSON(json);
    addAllWires();
    $('.getnewclasstypes.visible input:first').focus();
    $('#getnewclass .ui-autocomplete').hide();
    return true;
  }, 'json');
}

// Used for initial pageload when a hash is present:
// takes in an array containing objects describing the classes.
function getClasses(classarr, noreload) {
  for (var i = 0; i < classarr.length; i++) {
    classFromJSON(classarr[i], 0);
  }
  addAllWires(noreload);
}

/*** Major/minor functions ***/

function checkOff(majordiv, lvl, cls) {
  // $(majordiv+' .majorchk.majorchk_'+lvl.join('_')+':not(.chk):first')
  //   .addClass('chk').html('[X]')
  //   .attr('title',$.isArray(cls.div)?null:cls.div.data('subject_id'));
  var boxes = $(majordiv + ' .majorchk.majorchk_' + lvl.join('_') +
    ':not(.chk):first');
  boxes.addClass('chk').attr('title', $.isArray(cls.div) ? null : cls.div.data(
    'subject_id'));
  return boxes.length;
}

function checkMajor(selector) {
  var val = $(selector).val();
  var div = $(selector).data('div');
  var span = $(selector).prev('span.majorminor');
  span.attr('data-empty', 1).removeAttr('data-value');
  if (majors[val] == undefined) majors[val] = [0];
  if (val == 'm0') return $(div).html('') && false;
  span.attr('data-value', $(selector).find('option:selected').text())
    .removeAttr('data-empty');
  $(div).html(buildMajor(majors[val])).append(
    '<span class="letmeknow"><br>See an error? Let me know ' +
    '<a href="mailto:courseroad@mit.edu?subject=[CourseRoad]%20Error%20in%20' +
    val + '">here<\/a>.<\/span>');
  draggableChecklist();
  checkRequisites(majors[val], checkOff, [div, 'lvl', 'cls']);
}

function buildMajor(arr, level) {
  if (level == undefined) level = []; // Keep track of recursion.
  // allows 'and' arrays to be prefixed with a 0 (easier)
  // [0, 'a', 'b'] --> [2, 'a', 'b'];
  if (arr[0] == 0) arr[0] = arr.length - 1;
  if (typeof (arr[0]) == 'number') {
    var holdobj = $.extend({}, Defaults.requisiteCount, {
      count: (0 + arr[0])
    });
  } else {
    var holdobj = $.extend({}, Defaults.requisiteCount, arr[0]);
  }
  // Holds the unsatisfied requisites in a string for display to the user.
  var tempstr = '';
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
    // but only the coreq ones will have a 'coreq':1 thing.
    if (typeof (arr[i]) == 'object') {
      var newarr = $.extend({}, Defaults.requisiteClass, arr[i]);
    } else {
      var newarr = $.extend({}, Defaults.requisiteClass, {
        id: arr[i]
      });
    }
    // Now check for ranges. These are strings of the form 'X.XXX-X.XXX'
    if (newarr.range) {
      var innertempstr = '';
      for (var j = 0; j < holdobj.count; j++) {
        innertempstr += (
          '<span class="majorchk majorchk_' +
          level.concat([i]).join('_') +
          ' checkbox1">[<span>&#x2713;<\/span>]<\/span>'
        );
      }
      tempstr += (
        '<li>' + innertempstr + ' The range ' + newarr.id +
        newarr.desc + '<\/li>\n'
      );
      // return '<li>'+innertempstr + ' ' + holdobj.count +
      // 'from the range '+newarr.id+newarr.desc+'<\/li>\n';
      continue;
    }
    // Now only strings
    tempstr += (
      '<li>' + (
        newarr.skip
        ? '&#x2006;&#x2014; '
        : '<span class="majorchk majorchk_' + level.concat([i]).join('_') +
          ' checkbox1">[<span>&#x2713;<\/span>]<\/span> '
      ) +
      (
        newarr.skip
        ? ''
        : '<span class="checkbox1_text" data-id="' + newarr.id + '">'
      ) +
      newarr.id +
      (newarr.skip ? '' : '</span>') +
      newarr.desc + '<\/li>\n'
    );
  }
  tempstr = '<ul>\n' + tempstr + '<\/ul>\n';
  if (holdobj.special) {
    tempstr = holdobj.count + ' ' + holdobj.desc + ':\n' + tempstr;
  } else if (
      level.length || (!level.length && (holdobj.count != arr.length - 1))) {
    // the != part find the '2 from following' strings
    tempstr = holdobj.count + ' ' + holdobj.desc + ':\n' + tempstr;
  }
  if (!level.length) return '<strong>Requirements:<\/strong><br>\n' + tempstr;
  return '<li><span class="majorchk majorchk_' + level.join('_') +
    ' checkbox1">[<span>&#x2713;<\/span>]<\/span> ' + tempstr + '<\/li>\n';
}

function draggableChecklist() {
  $('.checkbox1_text').draggable({
    appendTo: '#rightbar',
    // containment: 'body',
    // distance: 30,
    helper: 'clone',
    start: function(event, ui) {
      ui.helper.attr('data-term', '(none)');
      $('.term').addClass('notOKterm');
      $('.WireIt-Wire').addClass('WireIt-Wire-low');
    },
    stop: function(event, ui) {
      $('.term').removeClass('notOKterm');
      unhighlightClasses();
      $('.WireIt-Wire').removeClass('WireIt-Wire-low');
    },
    revert: 'invalid',
    zIndex: 2700
  });
}

/*** Helper functions ***/

function unhighlightClasses() {
  $('#overridercheck').prop('disabled', true);
  $('#overrider span').css('opacity', 0);
  $('.classdiv').removeClass('classdivhigh classdivlow');
  $('.WireIt-Wire').removeClass('WireIt-Wire-low');
  $('#nowreading').html('Click on a class to see more info.');
}

function deGIR(str) {
  return str.replace(/GIR:PHY1/g, 'Physics I (GIR)')
            .replace(/GIR:PHY2/g, 'Physics II (GIR)')
            .replace(/GIR:CAL1/g, 'Calculus I (GIR)')
            .replace(/GIR:CAL2/g, 'Calculus II (GIR)')
            .replace(/GIR:BIOL/g, 'Biology (GIR)')
            .replace(/GIR:CHEM/g, 'Chemistry (GIR)')
            .replace(/GIR:REST/g, 'REST Requirement')
            .replace(/GIR:LAB/g, 'LAB Requirement')
            .replace(/GIR:LAB2/g, '1/2 LAB Requirement');
}

/**
 * Creates the storable string which holds our precious class data.
 * Used primarily in saved classes
 */
function minclass(stringify) {
  if (stringify == undefined) stringify = false;
  var temp = $('.classdiv').map(function() {
    var $this = $(this);
    arr = $this.data('custom') ? {
      name: $this.data('subject_title'),
      units: $this.data('total_units'),
      custom: true
    } : {
      id: $this.data('subject_id'),
      year: $this.data('year_desired')
    };
    arr.term = $this.data('classterm');
    if ($this.data('override')) {
      arr.override = $this.data('override');
    }
    if ($this.data('substitute')) {
      arr.substitute = $this.data('substitute');
    }
    return arr;
  }).get();
  return stringify ? JSON.stringify(temp) : temp;
}

function minmajors(stringify) {
  var temp = [
    $('#choosemajor').val(),
    $('#choosemajor2').val(),
    $('#chooseminor').val(),
    $('#chooseminor2').val()
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
    'Are you sure you want to close CourseRoad? ' +
    'You\'ll lose any unsaved changes you\'ve made.'
  );
}

var userHashChange = true;
window.onhashchange = function() {
  // userHashChange means that if the user types in a new hash in the URL,
  // the browser will reload, but if the hash changes due to saving a new 
  // version or something it won't.
  userHashChange = !userHashChange || window.location.reload();
  document.title = 'CourseRoad: ' + window.location.hash.substr(1);
}

function swapClassYear(oldclass, newyear) {
  oldclass.addClass('classdivlow');
  $.post('?', {
    getclass: oldclass.data('subject_id'),
    getyear: newyear
  }, function(json) {
    if ($.inArray(json, ['error', 'noclass', '']) != -1) return false;
    json.classterm = oldclass.data('classterm');
    json.override = oldclass.data('override');
    classFromJSON(json, 0, oldclass);
    addAllWires();
    unhighlightClasses();
  }, 'json');
}

var reasonToTrySave = preventUpdateWires = false;
var totalUnits = 0;
var crSetup = function() {
  crSetup = undefined;
  $('#getnewclass').tabs({
    collapsible: false,
    selected: (loggedin ? 1 : 0)
  });
  user.supersenior = $('.year.supersenior').is(':visible') ? 1 : 0;
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
  if (hash_to_use) {
    var jsonmajors = hash_to_use.pop();
    $('select.majorminor').each(function(i) {
      $(this).val(jsonmajors[i]).attr('selected', true);
    });
    getClasses(hash_to_use);
  } else if (window.location.hash) {
    // Load hash's classes on pageload
    $('#loading').show();
    userHashChange = false;
    window.location.hash = window.location.hash.replace(/\/+$/, '');
    document.title = 'CourseRoad: ' + window.location.hash.substr(1);
    $.post('?', {
      gethash: window.location.hash
    }, function(data) {
      $('#loading').hide();
      if (data == '') return false;
      var json = $.parseJSON(data);
      var jsonmajors = json.pop();
      $('select.majorminor').each(function(i) {
        $(this).val(jsonmajors[i]).attr('selected', true);
      });
      getClasses(json, true);
      $(window).off('beforeunload', runBeforeUnload);
    });
    userHashChange = true;
  }
  if (add_new_term) {
    getClasses(add_new_term);
    $(window).on('beforeunload', runBeforeUnload);
  }
  thisterm = add_new_term = 0;
  $('body').on('click', '.classdivyear span', function() {
    var par = $(this).parents('.classdiv');
    if (par.data('changing')) return false;
    par.data('changing', true);
    $(this).replaceWith(function() {
      return par.data('otheryears');
    });
    par.data('changing', false);
    par.find('.classdivyear select').focus();
  }).on('change blur', '.classdivyear select', function(event) {
    var val = $(this).val();
    var oldclass = $(this).parents('.classdiv');
    if (oldclass.data('changing')) return false;
    oldclass.data('changing', true);
    if (val == oldclass.data('year')) {
      $(this).replaceWith(function() {
        return oldclass.data('yearspan');
      });
      oldclass.data('changing', false);
      return false;
    }
    swapClassYear(oldclass, val);
  }).on('click', '.classdiv', function() {
    // Highlights the selected class, dims the others,
    // and displays info on that class in the lower right
    $('.classdiv').not($(this)).removeClass('classdivhigh');
    $('.classdiv').removeClass('classdivlow');
    $(this).toggleClass('classdivhigh');
    if ($('.classdivhigh').length == 1) {
      $('#overrider span').css('opacity', 1);
      $('.classdiv').not($(this)).addClass('classdivlow');
      $('.WireIt-Wire').addClass('WireIt-Wire-low');
      for (i in $('.classdivhigh').data('terminals').terminal.wires) {
        $($('.classdivhigh').data('terminals').terminal.wires[i].element)
          .removeClass('WireIt-Wire-low');
      }
      $('#nowreading').html($('.classdivhigh').data('info')).scrollTop(0);
      $('#overridercheck').prop('disabled', false).prop('checked', $(
        '.classdivhigh').data('override'));
    } else {
      unhighlightClasses();
    }
  }).on('click', 'canvas.WireIt-Wire', unhighlightClasses).keydown(function(
    event) {
    var cls = $('.classdiv.classdivhigh');
    if (event.which == 46 && cls.length && confirm(
      'Are you sure you want to delete ' + (cls.data('subject_id') || ('"' +
        cls.data('subject_title') + '"')) + '?')) {
      cls.remove();
      unhighlightClasses();
      addAllWires();
    }
  }).on('click', '.my-dialog-close, .ui-widget-overlay', function() {
    $('.my-dialog').dialog('close');
  }).on('click', '.choosesavedroad', function() {
    $.post('?', {
      choosesavedroad: $(this).val()
    });
  }).on('click', '.deleteroad', function() {
    if (!confirm(
      'Are you sure you want to delete this road? This action cannot be undone.'
    )) return false;
    var parent = $(this).parents('tr');
    $.post('?', {
      deleteroad: parent.data('hash')
    }, function(data) {
      if (data == 'ok') parent.fadeOut('slow').delay(2000).queue(function() {
        $(this).remove();
      });
      if (window.location.hash.substr(1) == parent.data('hash')) $(window).on(
        'beforeunload', runBeforeUnload);
    });
  }).on('click', '.saved-roads-edit-hash', function() {
    var newhash2 = prompt(
      'Enter a new hash for this saved road below ' +
      '(max. 36 characters, letters, numbers, and hyphens only):',
      $(this).prev().text());
    if (newhash2 === false) return false;
    newhash2 = newhash2.substr(0, 36);
    var prev = $(this).prev();
    prev.addClass('newload');
    $.post('?', {
      changeroadhash: $(this).parents('tr').data('hash'),
      newhash: newhash2
    }, function(data) {
      console.log(data, window.location.hash, prev.parents('tr').data(
        'hash'), window.location.hash == prev.parents('tr').data('hash'));
      if (window.location.hash.substr(1) == prev.parents('tr').data('hash')) {
        userHashChange = false;
        window.location.hash = data;
        document.title = 'CourseRoad: ' + window.location.hash.substr(1);
      }
      prev.text(data.substr(data.indexOf('/') + 1))
          .removeClass('newload').parents('tr')
          .data('hash', data).attr('data-hash', data)
          .find(':radio').val(data).parents('tr')
          .find('a.hashlink').attr('href', '?hash=' + data);
    });
  }).on('click', '.saved-roads-edit-comment', function() {
    var comment = prompt(
      'Enter your comment for this saved road below (max. 100 characters):',
      $(this).prev().text());
    if (comment === false) return false;
    comment = comment.substr(0, 100);
    var prev = $(this).prev();
    prev.addClass('newload');
    $.post('?', {
      commentonroad: $(this).parents('tr').data('hash'),
      commentforroad: comment
    }, function(data) {
      prev.text(data).removeClass('newload');
    });
  }).on('click', '.dummylink', function(e) {
    e.preventDefault();
  });
  $('#overridercheck').change(function() {
    $('.classdivhigh').data('override', $(this).prop('checked'));
    $('.classdivhigh').toggleClass('classdivoverride');
    addAllWires();
  });
  $('.term, .year, #getnewclass, #getnewclass>ul *').click(unhighlightClasses);
  $('.term').sortable({
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
      var terms = ['fall', 'iap', 'spring', 'summer'];
      for (s in terms) $('.' + terms[s]).addClass(ui.item.data('custom') ||
        ui.item.data(terms[s]) ? 'OKterm' : 'notOKterm');
    },
    stop: function(event, ui) {
      preventUpdateWires = false;
      $('.classdiv').removeAttr('style');
      $('.WireIt-Wire').show();
      $('.term').removeClass('OKterm notOKterm');
      addAllWires();
    }
  }).droppable({
    accept: '.checkbox1_text',
    over: function(event, ui) {
      $('.term').not(this).addClass('notOKterm');
      $(this).removeClass('notOKterm');
      ui.helper.attr(
        'data-term',
        $('#getnewclassterm option').eq($(this).index('.term')).text()
      );
    },
    out: function(event, ui) {
      $(this).addClass('notOKterm');
    },
    drop: function(event, ui) {
      $('.term').removeClass('notOKterm');
      classterm = $(this).index('.term');
      var data = {
        getclass: event.target.innerHTML,
        getyear: 0
      };
      data.getyear = properYear(classterm);
      $.post('?', data, function(json) {
        if ($.inArray(json, ['error', 'noclass', '']) != -1) return false;
        json.classterm = classterm;
        json.override = false;
        classFromJSON(json);
        addAllWires();
      }, 'json');
      draggableChecklist();
    }
  });
  $('#rightbar').disableSelection();
  $('#trash').droppable({
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
      $('.trash').addClass('trashhover', 'fast');
    },
    out: function(event, ui) {
      $('.trash').removeClass('trashhover', 'fast');
    },
    drop: function(event, ui) {
      preventUpdateWires = false;
      ui.draggable.remove();
      $('.trash').removeClass('trashhover', 'fast');
      addAllWires();
    }
  });
  $('#getnewclassid').blur(function() {
    $('#getnewclass .ui-autocomplete').hide();
  }).focus();
  $('#getnewclasssubmit').click(getClass);
  $('input[name="getnewclasstype"]').change(function() {
    $('.getnewclasstypes').toggleClass('visible').filter('.visible').find(
      'input:first').focus();
  });
  $('#getnewclassid').autocomplete({
    source: function(request, response) {
      $.post('?', {
        autocomplete: request.term
      }, response, 'json');
    },
    minLength: 2,
    appendTo: '#getnewclass',
    disabled: !user.autocomplete
  });
  $('.getnewclasstypes input').keydown(function(event) {
    if (event.which == 13) getClass();
  });
  $('button.changeclassterm').click(function() {
    $('.getnewclasstypes.visible input:first').focus();
    $('#getnewclassterm').val(Math.max(0, Math.min($(
      '#getnewclassterm option').length - 1, parseInt($(
      '#getnewclassterm').val()) + parseInt($(this).val()))));
  });
  $('#savemap').click(function() {
    $('#savemap').val('Saving...').prop('disabled', true);
    $.post('?', {
      classes: minclass(true),
      majors: minmajors(true),
      trycert: loggedin
    }, function(data) {
      $(window).off('beforeunload', runBeforeUnload);
      if (loggedin) {
        if (data == '**auth**') {
          // This redirects us to the secure cert check.
          window.location.href =
            'https://courseroad.mit.edu:444/secure.php';
        } else {
          userHashChange = false;
          window.location.hash = data;
          document.title = 'CourseRoad: ' + window.location.hash.substr(1);
        }
      } else {
        userHashChange = false;
        window.location.hash = data;
        document.title = 'CourseRoad: ' + window.location.hash.substr(1);
      }
      $('#savemap').val('Save Courses').prop('disabled', false);
    });
  });
  if (!loggedin && triedlogin) $('#mapcerts').hide();
  $('#mapcerts').click(function() {
    if (loggedin) {
      $('#viewroads').dialog('open');
    } else {
      $('#mapcerts').val('Saving...').prop('disabled', true);
      $.post('?', {
        classes: minclass(true),
        majors: minmajors(true),
        trycert: true
      }, function(data) {
        $(window).off('beforeunload', runBeforeUnload);
        if (data == '**auth**') {
          window.location.href =
            'https://courseroad.mit.edu:444/secure.php';
        } else {
          userHashChange = false;
          window.location.hash = data;
          document.title = 'CourseRoad: ' + window.location.hash.substr(1);
        }
        $('#mapcerts').val('Save with Login (requires certs)').prop(
          'disabled', false);
      });
    }
  });
  $('select.majorminor').on('change', function() {
    checkMajor(this);
  });
  $('#viewroads').dialog({
    autoOpen: false,
    width: 900,
    draggable: false,
    resizeable: false,
    modal: true,
    open: function(event, ui) {
      $('#savedroads').html('Loading...');
      $.post('?', {
        savedroads: 1
      }, function(data) {
        $('#savedroads').html(data);
      });
    }
  });
  // Runs the help dialog down below
  $('#help').dialog({
    autoOpen: false,
    width: 600,
    draggable: false,
    resizeable: false,
    modal: true
  });
  $('#accordion').accordion({
    autoHeight: false,
    collapsible: true,
    change: function(event, ui) {
      var temp = ui.newContent.length ? ui.newContent.position().top : 0;
    }
  });
  $('#openhelp').click(function() {
    $('#help').dialog('open').dialog('option', 'position', 'center');
    $('#accordion').accordion('resize');
  });
  setTimeout(function() {
    $('#help').dialog('option', 'position', 'center');
    $('#accordion').accordion('resize');
  }, 2500);
  $('select.majorminor option').each(function() {
    if (majors[$(this).val()] == undefined) $(this).remove();
  });
  $(window).resize(updateWires);
  $('#printroad').click(function() {
    $('body, #rightbar, .term, .year').toggleClass('printing');
    updateWires();
    window.print();
    $('body, #rightbar, .term, .year').toggleClass('printing');
    updateWires();
  });
  $('.flakyCSS').removeClass('flakyCSS');
  var doge = new Konami(function() { 
    $('#rightbar').addClass('doge');
  });
  $('#userlogin').click(function() {
    window.location.href = 'https://courseroad.mit.edu:444/secure.php';
  });
  $('#usersettings').dialog({
    autoOpen: false,
    draggable: false,
    resizeable: false,
    modal: true
  });
  $('#showusersettings').click(function() {
    $('#usersettings').dialog('open');
  });
  $('#usersettings_save').click(function() {
    var data = {
      usersettings: 1,
      class_year: $('#usersettings_class_year').val(),
      toggle_view_req_lines: ($('#usersettings_view_req_lines').prop(
        'checked') ? 1 : 0),
      toggle_autocomplete: ($('#usersettings_autocomplete').prop('checked') ?
        1 : 0)
    };
    var old_class_year = user.classYear;
    $('#usersettings_div').load('?', data, function() {
      user.classYear = parseInt($('#usersettings_class_year').val());
      user.viewReqLines = ($('#usersettings_view_req_lines').prop('checked') ?
        1 : 0);
      user.autocomplete = ($('#usersettings_autocomplete').prop('checked') ?
        1 : 0);
      user.needPermission = ($('#usersettings_need_permission').prop(
        'checked') ? 1 : 0);

      $('#usersettings_saved').show().delay(1000).fadeOut('slow');
      $('body').toggleClass('no-wires', !user.viewReqLines);
      if (old_class_year != user.classYear && confirm(
        'You changed your saved class year. Would you like to edit the year ' +
        'versions of your classes to match that change? ' +
        '(Clicking Cancel will prevent this behavior)'
      )) {
        console.log('Let\'s go.');
        $('.classdiv:not(.custom)').each(function() {
          if ($(this).data('year_desired') == properYear($(this).data(
            'classterm'))) return true;
          swapClassYear($(this), properYear($(this).data('classterm')));
        });
      }
      addAllWires();
      $('#getnewclassid').autocomplete(
        'option', 'disabled', !user.autocomplete
      );
      $(window).off('beforeunload', runBeforeUnload);
    });
  });
  $('.termname span').wrapInner(
    '<a href="http://picker.mit.edu/browse.html?courses=" ' +
    'class="spannamepicker" target="_blank" title="Click to head over to ' +
    'Picker to check your classes for this semester."></a>'
  );
};

/*
 * Konami-JS ~ 
 * :: Now with support for touch events and multiple instances for 
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var Konami = function (callback) {
	var konami = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj['e' + type + fn] = fn;
				obj[type + fn] = function () {
					obj['e' + type + fn](window.event, ref_obj);
				}
				obj.attachEvent('on' + type, obj[type + fn]);
			}
		},
		input: '',
		pattern: '38384040373937396665',
		load: function (link) {
			this.addEvent(document, 'keydown', function (e, ref_obj) {
				if (ref_obj) konami = ref_obj; // IE
				konami.input += e ? e.keyCode : event.keyCode;
				if (konami.input.length > konami.pattern.length)
					konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
				if (konami.input == konami.pattern) {
					konami.code(link);
					konami.input = '';
					e.preventDefault();
					return false;
				}
			}, this);
			this.iphone.load(link);
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: '',
			keys: ['UP', 'UP', 'DOWN', 'DOWN', 'LEFT', 'RIGHT', 'LEFT', 'RIGHT', 'TAP', 'TAP'],
			code: function (link) {
				konami.code(link);
			},
			load: function (link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, 'touchmove', function (e) {
					if (e.touches.length == 1 && konami.iphone.capture == true) {
						var touch = e.touches[0];
						konami.iphone.stop_x = touch.pageX;
						konami.iphone.stop_y = touch.pageY;
						konami.iphone.tap = false;
						konami.iphone.capture = false;
						konami.iphone.check_direction();
					}
				});
				konami.addEvent(document, 'touchend', function (evt) {
					if (konami.iphone.tap == true) konami.iphone.check_direction(link);
				}, false);
				konami.addEvent(document, 'touchstart', function (evt) {
					konami.iphone.start_x = evt.changedTouches[0].pageX;
					konami.iphone.start_y = evt.changedTouches[0].pageY;
					konami.iphone.tap = true;
					konami.iphone.capture = true;
				});
			},
			check_direction: function (link) {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? 'RIGHT' : 'LEFT';
				y = ((this.start_y - this.stop_y) < 0) ? 'DOWN' : 'UP';
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap == true) ? 'TAP' : result;

				if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
				if (this.keys.length == 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}

	typeof callback === 'string' && konami.load(callback);
	if (typeof callback === 'function') {
		konami.code = callback;
		konami.load();
	}

	return konami;
};
