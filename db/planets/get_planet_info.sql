select p.planet_id, p.name, p.type, p.hazard, p.sentinels, p.star_id, u.username from planet p
join users u on p.user_id = u.user_id
where planet_id = ${planetid}