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

    await db.planets
      .create_planet({ ptName, ptType, ptHazard, ptSentinels, ptStar, userid })
      .then((_) => res.status(200).send("Planet Uploaded."))
      .catch((err) => res.status(500).send(err));
  },
  uploadImage: async (req, res) => {
    const { url, planetid } = req.body;
    const db = req.app.get("db");

    await db.image
      .new_planet_image({ url, planetid })
      .then((image) => {
        res.status(200).send(image[0]);
      })
      .catch((err) => res.status(500).send(err));
  },
  getPlanetImages: async (req, res) => {
    const { planetid } = req.params;
    const db = req.app.get("db");

    await db.image.get_planet_images({ planetid })
    .then(images => {
      res.status(200).send(images);
    }) 
    .catch(err => res.status(500).send(err));
  }
};
