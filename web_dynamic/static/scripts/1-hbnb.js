$(document).ready(function () {
  const my_amenities = {};
  $('input[type="checkbox"]').change(function () {
  const data_id = $(this).attr('data-id');
  const data_name = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    my_amenities[data_id] = data_name;
  } else {
    delete my_amenities[data_id];
  }
  const amt_list = [];
  for (const key in my_amenities) {
    amt_list.push(my_amenities[key]);
  }
  $('.amenities h4').text(amt_list.join(', '));
  });
});
