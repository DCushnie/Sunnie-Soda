const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/adminmiddleware');
const {GetUsers, CreateUser} = require('../controllers/usercontroller');

const router = express.Router();

router.get("/api/users", requireAuth, requireAdmin, GetUsers);
router.post("/api/users", requireAuth, requireAdmin, CreateUser)

router.post


module.exports = router;