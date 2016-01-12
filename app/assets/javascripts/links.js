$(document).ready(function() {
  listenForRead();
  listenForUnread();
});

function listenForRead() {
  $('.mark-as-read').on('click', function(event) {
    event.preventDefault();
    var link = $(this).closest('.link');
    updateLink(link, true);
  })
}

function updateLink(link, updated_status) {
  $.ajax({
    type: 'PATCH',
    url: '/api/v1/links' + link.attr('data-id') + 'json',
    data: { link: { status: updated_status }},
    success: function() {
      link.addClass('read');
      link.removeClass('read');
    }
  })
}
