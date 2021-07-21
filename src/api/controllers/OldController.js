class OldController {
  get(req, res) {
    res.json({ message: 'message from old controller' });
  }
}

module.exports = OldController;
