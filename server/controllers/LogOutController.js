module.exports = {
  userLogOut: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        res.send({message: 'Logged Out'});
      }
    });
  }
}