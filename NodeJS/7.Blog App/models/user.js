const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImageURL: {
      type: String,
      default: "/images/profile.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return;
  }

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.statics.matchPassword = async function (email, password) {
  const user = await this.findOne({ email }).select("+password +salt");
  if (!user) {
    throw new Error("User not found");
  }
  const salt = user.salt;
  const hashedPassword = user.password;
  const userPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userPassword !== hashedPassword) {
    throw new Error("Incorrect password");
  }
  return { ...user._doc, password: undefined, salt: undefined };
};

module.exports = model("User", userSchema);
