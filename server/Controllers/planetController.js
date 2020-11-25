module.exports = {
  getPlanetInfo: async (req, res) => {
    const { planetid } = req.params;
    const db = req.app.get("db");

    await db.planets
      .get_planet_info({ planetid })
      .then((planet) => res.status(200).send(planet[0]))
      .catch((err) => res.status(500).send(err));
  },
  createPlanet: async (req, res) => {
    const { userid } = req.session;
    const { ptName, ptType, ptHazard, ptSentinels, ptStar } = req.body;
    const db = req.app.get("db");
    
    await db.planets.create_planet({  ptName, ptType, ptHazard, ptSentinels, ptStar, userid })
    .then((_) => res.status(200).send("Planet Uploaded."))
    .catch((err) => res.status(500).send(err))
  }
};
