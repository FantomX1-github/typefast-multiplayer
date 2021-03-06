Template.main.text = function () {
  return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
}

Template.main.usersCount = function() {
  Meteor.call('getOnlineUsersCount', function(err, count) {
    Session.set('usersCount', count);
  });
  return Session.get('usersCount');
}

Template.main.ready = function() {
  return Session.get('ready');
}

Template.main.events({
  'keyup textarea': function (e) {
    var $textarea = $(e.currentTarget);
    var textareaText = $textarea.val()
    var text = $('.text').text();
    var match = text.match('^' + textareaText);
    
    console.log(encodeURIComponent(window.location.href));
    
    textStream.emit('text', textareaText, Client.uuid);
    
    if(match !== null) {
      var matchText = match[0];
      $('.text-correct span').text(matchText);
      $('.text-incorrect span').text(textareaText);
      if(text.length == matchText.length) {
        var share = confirm('You won! Do you want to share it?');
        if(share) {
          window.location.href = 'http://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
        } else {
          window.location.reload();
        }
      }
    } else {
      $('.text-incorrect span').text(textareaText);
    }
  },
  'click .text': function(e){
    console.log('keydown e.which:', e.which);
    e.preventDefault();
  },
  "change .competitor-textarea": function(e) {
    var $textarea = $(e.currentTarget);
    var text = $('.text').text();
    if(text == $textarea.val()) {
      alert('You lost. Your competitor was first.');
    }
  }
});