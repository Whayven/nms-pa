select s.star_id, s.name 
from star s join users u on s.user_id = u.user_id
where u.user_id = ${userid}