import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./modules/auth/auth.routes";
import cardRoutes from "./modules/cards/card.routes";
import paymentRoutes from "./modules/payments/payment.routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use("/auth", authRoutes);

app.use("/cards", cardRoutes);

app.use("/payments", paymentRoutes);

export default app;