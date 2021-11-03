const jwt = require('jsonwebtoken');

function getUserId(context) {
  //"Authorization": "Bearer <token_jwt>"
  const Authorization = context.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    return userId;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  getUserId,
};