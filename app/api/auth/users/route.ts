import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

interface NewUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface NewUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;

  await connectToDatabase();

  // check if user exists
  const user = await User.findOne({ email: body.email });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // create user
  const newUser = await User.create(body);

  if (!newUser) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }

  return NextResponse.json({ user: newUser }, { status: 201 });
};
