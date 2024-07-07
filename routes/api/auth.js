const { Router } = require("express");
const router = Router();

const { validateBody, authenticate, passport } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,

  emailSchema,
  resetPasswordSchema,
} = require("../../models/user");

const userController = require("../../controllers/userController");

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  userController.authGoogle
);

router.post("/register", validateBody(registerSchema), userController.register);

router.post("/login", validateBody(loginSchema), userController.login);

router.get("/current", authenticate, userController.current);

router.get("/refresh", userController.refresh);

router.get("/logout", authenticate, userController.logout);

router.get("/verify/:verificationCode", userController.verifyEmail);

router.post("/verify", validateBody(emailSchema), userController.resendVerifyEmail);

router.post("/resetPassword", validateBody(emailSchema), userController.resetPassword);

router.post("/verifyResetToken", userController.verifyResetToken);

router.patch("/updatePassword", validateBody(resetPasswordSchema), userController.updatePassword);

module.exports = router;
