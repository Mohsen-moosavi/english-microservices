import { configs } from "@/configs/env.config";

const allowedOrigins = configs.url.corsOrigin
    ?.split(",")
    .map(origin=>origin.trim())

    // origin دامنه ی درخواست کننده را می دهد
    // در callback باید تعین کنیم که آیا دامنه مجاز به دسترسی هست یا نه
export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {  

    // برای SSR / Postman
    // آیا خطرناک نیست؟؟؟؟ بررسی شود
    if (!origin) return callback(null, true);

    if (allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("دستری از دامنه ی غیر مجاز!"));
    }
  },

  credentials: true, // برای refreshToken cookie
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};
