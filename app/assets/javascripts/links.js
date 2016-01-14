$(document).ready(function() {
  listenForMark();
  listenForEdit();
  listenForFilter('all');
  listenForFilter('read');
  listenForFilter('unread');
  listenForSearch();
  listenForSort();
});

function listenForMark() {
  $('.mark-as').on('click', function(event) {
    event.preventDefault();
    var $link = $(event.target).closest('.link');
    if($link.hasClass('unread')) {
      updateLink($link, true);
      $link.find('#link-status').text('Read');
      $link.find('.mark-as').text('Mark as Unread');
      $link.removeClass('unread');
      $link.addClass('read');
      $link.find('#link-url').addClass('lined')
    } else {
      updateLink($link, false);
      $link.find('#link-status').text('Unread');
      $link.find('.mark-as').text('Mark as Read');
      $link.removeClass('read');
      $link.addClass('unread');
      $link.find('#link-url').removeClass('lined')
    }
  })
}

function updateLink(link, updated_status) {
  $.ajax({
    type: 'PUT',
    url: '/api/v1/links/' + link.attr('data-id') + '.json',
    data: { link: { read: updated_status }}
  })
}

function listenForEdit() {
  $('#create-edit').on('click', function() {
    var $link = $(this).closest('.link');
    var linkId = $link.attr('data-id');

    var linkParams = {
      link: {
        title: $link.find('#edit-title').val(),
        url: $link.find('#edit-url').val()
      }
    };

    $.ajax({
      type: 'PUT',
      dataType: "json",
      url: '/api/v1/links/' + linkId + '.json',
      data: linkParams,
      success: function() {
        $link.find('#link-title').text('Title: ' + linkParams.link.title);
        $link.find('#link-url').text(linkParams.link.url);
      }
    })
  })
}

function listenForFilter(filter) {
  $('#' + 'filter-by-' + filter).on('click', function() {
    $('.link').each(function(index, link) {
      var $link = $(link);
      if($link.hasClass(filter)) {
        $link.show();
      } else {
        $link.hide();
      }
    })
  })
}

function listenForSearch() {
  $('#search-links').keyup(function() {
    var letters = $('#search-links').val().toLowerCase();

    $('.link').each(function (_, link) {
      var title = $(link).find('#link-title').text().toLowerCase();
      var match = (title).indexOf(letters) >= 0;
      $(link).toggle(match)
    })
  })
}

function listenForSort() {
  var $links = $('div.link');

  $('#sort-links').on('click', function() {
    var orderedLinks = $links.sort(function(a, b) {
      return $(a).find('#link-title').text() > $(b).find('#link-title').text();
    });
    $('#inner-links').html(orderedLinks);
  })
}

//  $('#sort-links').on('click', function () {
//    var $link = $('.link');
//
//    var links = $link.map(function(_, link) {
//      return { t: $(link).text(), v: link.value };
//    }).get();
//    links.sort(function(a, b) {
//      var aCased = a.t.toLowerCase(), bCased = b.t.toLowerCase();
//      return aCased > bCased ? 1 : aCased < bCased ? -1 : 0;
//    });
//    $link.each(function(i, link) {
//      link.val = links[i].v;
//      $(link).text(links[i].t);
//    });
//  })
//}
