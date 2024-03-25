import * as AuthService from "../auth.service";
import { ISignUpDto, IUser } from "../types";
import { User } from "../user/user.model";
import * as JwtService from "../jwt.service";

describe("AuthService", () => {
  describe("findUserById", () => {
    beforeEach(() => {
      User.findById = jest.fn().mockResolvedValue({
        _id: "5dbff32e367a343830cd2f49",
        username: "Miamor",
        lastname: "Agboola",
        firstname: "Jawick",
        email: "aj@gmail.com",
        emailVerified: true,
        __v: 0,
      });
    });
    it("should return a user given a valid mongo ID", async () => {
      const expected = {
        _id: "5dbff32e367a343830cd2f49",
        username: "Miamor",
        lastname: "Agboola",
        firstname: "Jawick",
        email: "aj@gmail.com",
        emailVerified: true,
        __v: 0,
      };

      await expect(AuthService.findUserById("5dbff32e367a343830cd2f49")).resolves.toEqual(expected);
    });
  });
  describe("findUserById", () => {
    beforeEach(() => {
      User.findById = jest.fn().mockResolvedValue(null);
    });

    it("should return null given an invalid mongo ID", async () => {
      const expected = null;

      await expect(AuthService.findUserById("123454")).resolves.toEqual(expected);
    });
  });
  describe("signUp", () => {
    const spy = jest.spyOn(AuthService, "signUp");

    beforeEach(() => {
      spy.mockImplementationOnce(async () => ({
        status: false,
        message: "Email already in use.",
        statusCode: 400,
      }));
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'Email already in use' when non unique email is passed", async () => {
      const payload = { username: "user12be", email: "user12be@gmail.com" } as ISignUpDto;
      await expect(AuthService.signUp(payload)).resolves.toEqual({
        status: false,
        message: "Email already in use.",
        statusCode: 400,
      });
    });
  });

  describe("signUp", () => {
    const spy = jest.spyOn(AuthService, "signUp");

    beforeEach(() => {
      spy.mockImplementationOnce(async () => ({
        status: false,
        message: "The store name you provided already exist. Kindly use a new store name.",
        statusCode: 400,
      }));
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'store name you provided already exist' when non unique email is passed", async () => {
      const payload = {
        username: "user12be",
        email: "user12be@gmail.com",
        storename: "EO Wears",
      } as ISignUpDto;
      await expect(AuthService.signUp(payload)).resolves.toEqual({
        status: false,
        message: "The store name you provided already exist. Kindly use a new store name.",
        statusCode: 400,
      });
    });
  });

  describe("signUp", () => {
    const spy = jest.spyOn(AuthService, "signUp");
    const returnValue = {
      status: true,
      message: "Sign up successful",
      statusCode: 200,
      data: {
        user: {
          _id: "5dbff32e367a343830cd2f49",
          username: "user12be",
          email: "user12be@gmail.com",
          firstname: "Daniel",
          lastname: "Okoronkwo",
          password: "P@ssword1234",
          emailVerified: false,
          createdAt: "2024-03-24T22:23:12.348Z",
          updatedAt: "2024-03-24T22:23:12.348Z",
          deletedAt: null,
        },
        store: {
          _id: "5dbff32e367a343830cd2f49",
          name: "EO Wears",
          userId: "5dbff32e367a343830cd2f49",
          createdAt: "2024-03-24T22:23:12.348Z",
          updatedAt: "2024-03-24T22:23:12.348Z",
          deletedAt: "2024-03-24T22:23:12.348Z",
          logo: "https://www.madisonb2b.co.uk/netalogue/zoom/y8yza0483.jpg",
        },
      },
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return successfully create and return user and store object", async () => {
      const payload = {
        username: "user12be",
        email: "user12be@gmail.com",
        storename: "EO Wears",
        firstname: "Daniel",
        lastname: "Okoronkwo",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signUp(payload)).resolves.toEqual(returnValue);
    });
  });
  describe("signIn", () => {
    const spy = jest.spyOn(AuthService, "signIn");
    const returnValue = {
      status: false,
      message: "Invalid Credentials.",
      statusCode: 400,
    };

    beforeEach(() => {
      User.findOne = jest.fn().mockResolvedValue(null);
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'Invalid credentials' when user is not found", async () => {
      const payload = {
        email: "user12be@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signIn(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("signIn", () => {
    const spy = jest.spyOn(AuthService, "signIn");
    const returnValue = {
      status: false,
      message: "Invalid Credentials.",
      statusCode: 400,
    };

    beforeEach(() => {
      User.findOne = jest
        .fn()
        .mockResolvedValue({ email: "user12be@gmail.com", password: "P@ssword1234" });
      User.prototype.comparePassword = jest.fn().mockResolvedValue(false);
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'Invalid credentials' when password is not a match", async () => {
      const payload = {
        email: "user12be@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signIn(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("signIn", () => {
    const spy = jest.spyOn(AuthService, "signIn");
    const accessTokenSpy = jest.spyOn(JwtService, "signAccessToken");
    const refreshTokenSpy = jest.spyOn(JwtService, "signRefreshToken");
    const user = {
      email: "user12be@gmail.com",
      password: "P@ssword1234",
    } as IUser;
    const returnValue = {
      status: true,
      message: "Login Successful",
      statusCode: 200,
      data: { token: { accessToken: "12345", refreshToken: "678910" }, user },
    };

    beforeEach(() => {
      accessTokenSpy.mockImplementationOnce(() => "12345");
      refreshTokenSpy.mockImplementationOnce(() => "678910");
      spy.mockImplementation(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return token and user data on successful sign in", async () => {
      const payload = {
        email: "user12be@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signIn(payload)).resolves.toHaveProperty("statusCode", 200);
      await expect(AuthService.signIn(payload)).resolves.toHaveProperty("status", true);
      await expect(AuthService.signIn(payload)).resolves.toHaveProperty(
        "message",
        "Login Successful",
      );

      await expect(AuthService.signIn(payload)).resolves.toHaveProperty("data", {
        token: { accessToken: "12345", refreshToken: "678910" },
        user: {
          email: "user12be@gmail.com",
          password: "P@ssword1234",
        },
      });
    });
  });
});
