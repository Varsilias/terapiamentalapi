import { Types } from "mongoose";
import {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../jwt.service";
import { TokenExpiredError, JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

jest.setTimeout(30000);

describe("JwtService", () => {
  describe("signAccessToken", () => {
    it("should return a jwt token when given the require payload", () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signAccessToken(payload);

      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3);
    });
  });

  describe("verifyAccessToken", () => {
    it("should verify properly formed token and not throw an error", () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signAccessToken(payload);
      const decodedPayload = verifyAccessToken(token);

      expect(decodedPayload).toHaveProperty("_id", payload._id);
      expect(decodedPayload).toHaveProperty("email", payload.email);
    });

    it("should throw TokenExpiredError when verifying expired token", async () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signAccessToken(payload, "1s");

      await new Promise((r) => setTimeout(r, 5000));

      try {
        verifyAccessToken(token);
      } catch (error) {
        expect(error).toBeInstanceOf(TokenExpiredError);
      }
    });

    it("should throw JsonWebTokenError when verifying expired malfunctioned token", () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signAccessToken(payload);

      try {
        verifyAccessToken(token.split(".").slice(0, 1).join("."));
      } catch (error) {
        expect(error).toBeInstanceOf(JsonWebTokenError);
      }
    });
  });

  describe("signRefreshToken", () => {
    it("should return a jwt token when given the require payload", () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signRefreshToken(payload);

      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3);
    });
  });

  describe("verifyRefreshToken", () => {
    it("should verify properly formed token and not throw an error", () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signRefreshToken(payload);
      const decodedPayload = verifyRefreshToken(token) as JwtPayload;

      expect(decodedPayload).toHaveProperty("_id", payload._id);
      expect(decodedPayload).toHaveProperty("email", payload.email);
      const now = dayjs();
      const unixTimestamp = decodedPayload?.exp ?? 0 * 1000;

      expect(dayjs.unix(unixTimestamp as number).format("YYYY-MM-DD")).toBe(
        now.add(2, "weeks").format("YYYY-MM-DD"),
      );
    });

    it("should throw TokenExpiredError when verifying expired token", async () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signRefreshToken(payload, "1s");

      await new Promise((r) => setTimeout(r, 5000));

      try {
        verifyRefreshToken(token);
      } catch (error) {
        expect(error).toBeInstanceOf(TokenExpiredError);
      }
    });

    it("should throw JsonWebTokenError when verifying expired malfunctioned token", () => {
      const payload = { _id: new Types.ObjectId().toString(), email: "daniel@gmail.com" };
      const token = signRefreshToken(payload);

      try {
        verifyRefreshToken(token.split(".").slice(0, 1).join("."));
      } catch (error) {
        expect(error).toBeInstanceOf(JsonWebTokenError);
      }
    });
  });
});
