const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  deleteAccount
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation
} = require('../validations/authValidations');

// Public routes
router.route('/register').post(registerValidation, validate, register);
router.route('/login').post(loginValidation, validate, login);

// Protected routes
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfileValidation, validate, updateProfile)
  .delete(protect, deleteAccount);

router.route('/change-password').put(protect, changePasswordValidation, validate, changePassword);
router.route('/logout').post(protect, logout);

module.exports = router;
