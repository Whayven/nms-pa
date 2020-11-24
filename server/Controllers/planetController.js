module.exports = {
  getPlanetInfo: async (req, res) => {
    const { planetid } = req.params;
    const db = req.app.get("db");

    await db.planets
      .get_planet_info({ planetid })
      .then((planet) => res.status(200).send(planet[0]))
      .catch((err) => res.status(500).send(err));
  },
};
