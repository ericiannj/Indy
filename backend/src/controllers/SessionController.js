const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name, password } = request.body;

    const creator = await connection('creators')
      .where('name', name)
      .where('password', password)
      .select('name')
      .first()
      .select('id')
      .first();

    if (!creator) {
      return response
        .status(400)
        .json({ error: 'No Creator found with this ID' });
    }
    return response.json(creator);
  },
};
