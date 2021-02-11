const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const creator_id = request.headers.authorization;

    const creations = await connection('creations')
      .where('creator_id', creator_id)
      .select('*');

    return response.json(creations);
  }
}