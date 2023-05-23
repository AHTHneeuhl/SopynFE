import express from "express";
import cors from "cors";
import http from "http";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes from "./routes/auth";

dotenv.config();

if (!process.env.PORT) {
  process.exit();
}
const PORT = parseInt(process.env.PORT as string);

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/auth", authRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
