export const generateToken = (user, message, statusCode, res) => {

  const token = user.generateJsonWebToken();

  // Convert COOKIE_EXPIRES to an integer, with error handling if it's invalid
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRES, 10);
  if (isNaN(cookieExpireDays)) {
    throw new Error("Invalid COOKIE_EXPIRES environment variable - must be a number");
  }

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    
    .json({
      success: true,
      message,
      user,
      token,
    });
};
