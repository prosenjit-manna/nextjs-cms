// app/api/login/route.ts
import { connectToMongoDB } from '@/admin/libs/dbConnect';
import User, { IUser } from '@/admin/user/User.model';
import { cookies } from 'next/headers';
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

    // For demo purposes, accept any login
    const token = 'fake-auth-token-' + Math.random().toString(36).substring(2);
  
    const cookieStore = await cookies();
    // Set a cookie that will be sent with requests
    cookieStore.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    });
    
  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}
