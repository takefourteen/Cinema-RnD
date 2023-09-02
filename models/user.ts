import { Model, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

// hash password before saving
UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();

    // Ensure user.password is defined
    if (typeof user.password !== "undefined") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    next();
  } catch (error) {
    next(error as Error); // Pass any error to the next middleware
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    return false;
  }
};

const User = models.User || model("User", UserSchema);

export default User;
