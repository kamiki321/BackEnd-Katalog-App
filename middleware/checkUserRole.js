// middleware/checkUserRole.js

module.exports = (role) => {
    return async (req, res, next) => {
      const user = req.user; // Ambil informasi pengguna, seperti dari sesi atau token JWT
      if (user && user.role === role) {
        // Lanjutkan jika peran sesuai
        next();
      } else {
        // Tidak ada izin, kembalikan status 403 (Forbidden)
        res.status(403).json({ message: 'Permission denied' });
      }
    };
  };
  