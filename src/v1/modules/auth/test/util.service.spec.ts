import { comparePassword, hashPassword } from "../utils.service";
import crypto from "crypto";

describe("UtilService", () => {
  describe("hashPassword", () => {
    it("should hash password and return a pbkdf2Sync encrypted string of length 64", () => {
      const salt = crypto.randomBytes(16).toString("hex");
      const password = "P@ssword1234";
      const result = hashPassword(password, salt);

      expect(typeof result).toBe("string");
      expect(Buffer.byteLength(result)).toBe(128);
    });
  });

  describe("comparePassword", () => {
    it("return true given the same password and salt", () => {
      const salt = crypto.randomBytes(16).toString("hex");
      const password = "P@ssword1234";

      const storedPassword = hashPassword(password, salt);

      const isValid = comparePassword(password, salt, storedPassword);

      expect(typeof storedPassword).toBe("string");
      expect(Buffer.byteLength(storedPassword)).toBe(128);
      expect(isValid).toBe(true);
    });
  });
});
