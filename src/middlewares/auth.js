import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
const secret = process.env.JWT_SECRET;
 
export default function authenticateToken(handler) {
  return async (req, res) => {
    const token = req.headers.get("x-access-token");
    if (!token) {
      return NextResponse.json({ success: false, message: 'Access token is missing' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        return NextResponse.json({ success: false, message:"Token Expired "});
      }
      req.user = decoded; // Attach user information to the request object
      return handler(req, res);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.json({ success: false, message:"Unauthorized: Token expired"});
      }
      return NextResponse.json({ success: false, message:error.message});
    }
  };
}