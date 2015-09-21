import $ from 'jquery';
import timeago from 'timeago';

function initialize() {
  $(function() {
    $('abbr.timeago').timeago();
  });
}

export default { initialize };
