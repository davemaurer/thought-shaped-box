$(document).ready(function() {
  listenForRead();
  listenForUnread();
  listenForEdit();
  listenForFilter('all');
  listenForFilter('read');
  listenForFilter('unread');
  listenForSearch();
  listenForSort();
});

function listenForRead() {
  $('#mark-as-read').on('click', function(event) {
    event.preventDefault();
    var $link = $(this).closest('.link');
    updateLink($link, true);
    $link.find('#link-status').text('Read')
  })
}

function listenForUnread() {
  $('#mark-as-unread').on('click', function(event) {
    event.preventDefault();
    var $link = $(this).closest('.link');
    updateLink($link, false);
    $link.find('#link-status').text('Unread')
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
        $link.find('#link-title').text(linkParams.link.title);
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
  $('#sort-links').on('click', function () {
    var $links = $('#links');
    var $link = $('.link', $links);

    var links = $link.map(function(_, link) {
      return { t: $(link).text(), v: link.value };
    }).get();
    links.sort(function(a, b) {
      var aCased = a.t.toLowerCase(), bCased = b.t.toLowerCase();
      return aCased > bCased ? 1 : aCased < bCased ? -1 : 0;
    });
    $link.each(function(i, link) {
      link.value = links[i].v;
      $(link).text(links[i].t);
    });
    $link.sort(function(a, b) {
      return a - b
    })
  })
}
