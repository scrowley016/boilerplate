function requireUser(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401);
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    });
  }
}

module.exports = {
  requireUser,
};
