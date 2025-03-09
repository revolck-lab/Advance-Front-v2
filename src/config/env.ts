export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  JWT_SECRET: process.env.JWT_SECRET || "default-secret", // Optional, for client-side token validation if needed
  AWS_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "Advance-revolck",
};
