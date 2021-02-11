const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { title, type, description, comments } = request.body;
    const creator_id = request.headers.authorization;

    const [id] = await connection('creations').insert({
      title,
      type,
      description,
      comments,
      creator_id
    });

    return response.json({ id, title })
  },

  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('creations').count();

    const creations = await connection('creations')
      .join('creators', 'creators.id', '=', 'creations.creator_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'creations.*',
        'creators.name',
        'creators.password',
        'creators.email',
        'creators.city',
        'creators.country',
      ]);

    response.header('X-Total-Count', count['count(*)']);
    return response.json(creations);
  },

  async delete(request, response) {
    const { id } = request.params;
    const creator_id = request.headers.authorization;

    const creation = await connection('creations')
      .where('id', id)
      .select('creator_id')
      .first();

    if (creation.creator_id != creator_id) {
      return response.status(401), json({ error: 'Operation not permitted.' });
    }

    await connection('creations').where('id', id).delete();

    return response.status(204).send();
  },
};