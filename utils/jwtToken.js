export const generateToken = (user, message, statusCode, res) => {
  try {
    const token = user.generateJsonWebToken();
    res
      .status(statusCode)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Token generation failed." });
  }
};
