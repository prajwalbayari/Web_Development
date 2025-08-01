const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/signin", (req, res) => {
  const successMessage = req.query.success;
  return res.render("signin", { success: successMessage });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    await User.create({
      fullName,
      email,
      password,
    });
    // Redirect to signin after successful signup
    return res.redirect("/user/signin?success=Account created successfully! Please sign in.");
  } catch (error) {
    console.error("Error during signup:", error);
    return res.render("signup", {
      error: "Failed to create account. Please try again.",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.render("signin", {
      error: "Invalid email or password",
    });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
