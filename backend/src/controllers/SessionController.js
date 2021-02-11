const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    //const { id } = request.body;
    const { name, password } = request.body;

    //const creator = await connection('creators').where('id', id).select('name').first();
    const creator = await connection('creators').where('name', name).where('password', password).select('name').first();

    if (!creator) {
      return response.status(400).json({ error: 'No Creator found with this ID' });
    }
    return response.json(creator);
  }
}