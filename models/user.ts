import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define the structure of your User document
interface UserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  library: LibraryItem[];
  watchHistory: WatchHistoryItem[];
}

// Define the structure of the LibraryItem
interface LibraryItem {
  id: string;
  title: string;
  type: "movie" | "tv";
}

// Define the structure of the WatchHistoryItem
export interface WatchHistoryItem {
  id: string;
  type: "movie" | "tv";
  season: number;
  episode: number;
  title: string;
  watchedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
    lowercase: true,
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  library: {
    type: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["movie", "tv"],
          required: true,
        },
      },
    ],
    default: [],
  },
  watchHistory: {
    type: [
      {
        id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["movie", "tv"],
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        season: {
          type: Number,
          required: true,
        },
        episode: {
          type: Number,
          required: true,
        },
        watchedAt: {
          type: Date,
          required: true,
        },
      },
    ],
    default: [],
  },
});

// Define the interface of the User model
interface UserModel extends Model<UserDocument> {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

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
    const user = this as UserDocument;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
  } catch (error) {
    return false;
  }
};

// Create a TypeScript model
let User: UserModel;

try {
  // Try to retrieve the model if it has already been registered
  User = model<UserDocument, UserModel>("User");
} catch {
  // If the model does not exist, create a new one
  User = model<UserDocument, UserModel>("User", UserSchema);
}
export default User;
