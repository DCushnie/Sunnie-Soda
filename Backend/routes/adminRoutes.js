const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/adminmiddleware');
const {GetUsers, CreateUser} = require('../controllers/usercontroller');

const router = express.Router();

router.get("/users", requireAuth, requireAdmin, GetUsers);
router.post("/users", CreateUser)

router.post


module.exports = router;