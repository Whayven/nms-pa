select p.planet_id, p.name, u.username  
from planet p
join users u on p.user_id = u.user_id 
where star_id = ${starid}