import * as StoreService from "../store.service";
import { IStore } from "../types";

describe("StoreService", () => {
  describe("createStore", () => {
    const spy = jest.spyOn(StoreService, "createStore");
    const expected = {
      status: false,
      message: "The store name you provided already exist. Kindly use a new store name.",
      statusCode: 400,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'store name you provided already exist' given an an already existing store name", async () => {
      const payload = { name: "EO Stores", userId: "5dbff32e367a343830cd2f49" };

      await expect(StoreService.createStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("createStore", () => {
    const spy = jest.spyOn(StoreService, "createStore");
    const expected = {
      status: false,
      message: "Store created successfully",
      statusCode: 200,
      data: { _id: "5dbff32e367a343830cd2f49" } as IStore,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return create store successfully and return the data", async () => {
      const payload = { name: "EO Stores", userId: "5dbff32e367a343830cd2f49" };

      await expect(StoreService.createStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("getStores", () => {
    const spy = jest.spyOn(StoreService, "getStores");
    const expected = {
      status: true,
      message: "Stores fetched successfully",
      statusCode: 200,
      data: {
        page: 1,
        perPage: 10,
        totalPages: 10,
        totalDocuments: 100,
        stores: [],
      },
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return all store that are not deleted", async () => {
      const payload = { page: 1, perPage: 10, userId: "5dbff32e367a343830cd2f49" };

      await expect(StoreService.getStores(payload)).resolves.toEqual(expected);
    });
  });

  describe("getStore", () => {
    const spy = jest.spyOn(StoreService, "getStore");
    const expected = {
      status: false,
      message: "Store not found",
      statusCode: 404,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Store not found' when storeId and userId are not compatible", async () => {
      const payload = { storeId: "6dbff32e367a343830cd2f43", userId: "5dbff32e367a343830cd2f49" };

      await expect(StoreService.getStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("getStore", () => {
    const spy = jest.spyOn(StoreService, "getStore");
    const expected = {
      status: true,
      message: "Store retrieved successfully",
      statusCode: 200,
      data: { _id: "6dbff32e367a343830cd2f43" } as IStore,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return retrieve an existing store name", async () => {
      const payload = { storeId: "6dbff32e367a343830cd2f43", userId: "5dbff32e367a343830cd2f49" };

      await expect(StoreService.getStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateStore", () => {
    const spy = jest.spyOn(StoreService, "updateStore");
    const expected = {
      status: false,
      message: "Store not found",
      statusCode: 404,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Store not found' when storeId and userId are not compatible", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        name: "New Store name",
        logo: "https://www.madisonb2b.co.uk/netalogue/zoom/y8yza0483.jpg",
      };

      await expect(StoreService.updateStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateStore", () => {
    const spy = jest.spyOn(StoreService, "updateStore");
    const expected = {
      status: false,
      message: "Nothing to update",
      statusCode: 400,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Nothing to update' when there is not update payload", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
      };

      await expect(StoreService.updateStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateStore", () => {
    const spy = jest.spyOn(StoreService, "updateStore");
    const expected = {
      status: false,
      message: "Unable to update store",
      statusCode: 422,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Unable to update store' when no data was modified", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
      };

      await expect(StoreService.updateStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateStore", () => {
    const spy = jest.spyOn(StoreService, "updateStore");
    const expected = {
      status: true,
      message: "Store updated successfully",
      statusCode: 200,
      data: { _id: "6dbff32e367a343830cd2f43" } as IStore,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return update store successfully and return updated store", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        name: "New Store name",
        logo: "https://www.madisonb2b.co.uk/netalogue/zoom/y8yza0483.jpg",
      };

      await expect(StoreService.updateStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("deleteStore", () => {
    const spy = jest.spyOn(StoreService, "deleteStore");
    const expected = {
      status: false,
      message: "Store not found",
      statusCode: 404,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Store not found' when storeId and userId are not compatible", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
      };

      await expect(StoreService.deleteStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("deleteStore", () => {
    const spy = jest.spyOn(StoreService, "deleteStore");
    const expected = {
      status: false,
      message: "Unable to delete store",
      statusCode: 422,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Unable to delete store' when no data was deleted", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
      };

      await expect(StoreService.deleteStore(payload)).resolves.toEqual(expected);
    });
  });

  describe("deleteStore", () => {
    const spy = jest.spyOn(StoreService, "deleteStore");
    const expected = {
      status: true,
      message: "Store deleted successfully",
      statusCode: 200,
      data: { _id: "6dbff32e367a343830cd2f43" } as IStore,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return delete successfully and return deleted store", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        name: "New Store name",
        logo: "https://www.madisonb2b.co.uk/netalogue/zoom/y8yza0483.jpg",
      };

      await expect(StoreService.deleteStore(payload)).resolves.toEqual(expected);
    });
  });
});
