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
  $.get('http://0.0.0.0:5001/api/v1/status/', function (content) {
    if (content.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
    $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        const placehtml = `<article>
                             <div class="title_box">
                               <h2>${place.name}</h2>
                               <div class="price_by_night">${place.price_by_night}</div>
                             </div>
                             <div class="information">
                               <div class="max_guest">${place.max_guest} Guests</div>
                               <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                               <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                             </div>
                             <div class="description">${place.description}</div>
                           </article>`;

        $('section.places').append(placehtml);
      }
    }
  });
});
