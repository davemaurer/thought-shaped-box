$(document).ready(function() {
  listenForRead();
  listenForUnread();
  listenForEdit();
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
