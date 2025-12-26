import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";

import Table from "./models/TableBooking.js";
import Catering from "./models/CateringRequest.js";
import Menu from "./models/MenuItem.js";
import Banner from "./models/Banner.js";
import Order from "./models/Order.js";
import Payment from "./models/Transaction.js";

import tableRoutes from "./routes/tableRoutes.js";
import cateringRoutes from "./routes/cateringRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ AdminJS setup
AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
  resources: [
    { resource: Table, options: { navigation: "Restaurant" } },
    { resource: Catering, options: { navigation: "Restaurant" } },
    { resource: Menu, options: { navigation: "Restaurant" } },
    { resource: Order, options: { navigation: "Restaurant" } },
    { resource: Banner, options: { navigation: "Marketing" } },
    { resource: Payment, options: { navigation: "Finance" } },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "My Restro Admin",
    logo: false,
    theme: { colors: { primary100: "#E65100" } },
  },
});

const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);

// ✅ API Routes
app.use("/api/tables", tableRoutes);
app.use("/api/catering", cateringRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🍽️ Restaurant Backend API is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
