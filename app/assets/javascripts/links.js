$(document).ready(function() {
  listenForRead();
  listenForUnread();
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
