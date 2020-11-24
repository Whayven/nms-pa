select s.star_id, s.name, s.star_type, s.galaxy, s.economy, s.conflict, u.username 
from star s
join users u on s.user_id = u.user_id
where s.star_id = ${starid}