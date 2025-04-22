// app/api/login/route.ts
import { connectToMongoDB } from '@/admin/libs/dbConnect';
import User, { IUser } from '@/admin/user/User.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectToMongoDB(); // Ensure the database is connected
  const { email, password } = await req.json();

  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  }

  if (user.password === password) {
    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  }
  // If the password is incorrect, return an error response

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}
