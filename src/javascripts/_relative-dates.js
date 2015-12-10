import $ from 'jquery';
import timeago from 'timeago';

function initialize() {
  $(function() {
    $('.timeago').timeago();
  });
}

export default { initialize };
