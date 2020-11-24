module.exports = {
  getUserStars: async (req, res) => {
    const { userid } = req.session;
    const db = req.app.get("db");

    await db.stars
      .get_user_stars({ userid })
      .then((stars) => {
        return res.status(200).send(stars);
      })
      .catch((err) => res.status(500).send(err));
  },
  getStars: async (req, res) => {
    const db = req.app.get("db");

    await db.stars
      .get_stars()
      .then((stars) => res.status(200).send(stars))
      .catch((err) => res.status(500).send(err));
  },
  getStar: async (req, res) => {
    const { starid } = req.params;
    const db = req.app.get("db");
    await db.stars
      .get_star_info({ starid })
      .then((star) => res.status(200).send(star[0]))
      .catch((err) => res.status(500).send(err));
  },
  getStarPlanets: async (req, res) => {
    const { starid } = req.params;
    const db = req.app.get("db");
    await db.stars
      .get_star_planets({ starid })
      .then((planets) => res.status(200).send(planets))
      .catch((err) => res.status(500).send(err));
  },
};
