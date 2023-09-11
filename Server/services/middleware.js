function requireAuth(req, res, next) {
  console.log("req.session.userId:", req.session.userId);
  if (req.session && req.session.userId) {
    // User is authenticated, proceed to the next middleware or route
    next();
  } else {
    // User is not authenticated, redirect to the login page or display an error
    res.redirect("/"); // You can customize the redirection URL
  }
}

module.exports = requireAuth;
