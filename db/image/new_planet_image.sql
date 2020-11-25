insert into planet_image (planet_image_url, planet_id)
values (${url}, ${planetid})
returning *;