import * as ProductService from "../product/product.service";
import { IProduct } from "../types";

describe("ProductService", () => {
  describe("createProduct", () => {
    const spy = jest.spyOn(ProductService, "createProduct");
    const expected = {
      status: false,
      message: "Store not found",
      statusCode: 404,
      data: {} as IProduct,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Store not found' when userId and storeId are incompatible", async () => {
      const payload = {
        userId: "5dbff32e367a343830cd2f49",
        name: "Product 1",
        storeId: "6dbff32e367a343830cd2f43",
        description: "Product description 1",
        price: 35000,
        quantityAvailable: 35,
      };

      await expect(ProductService.createProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("createProduct", () => {
    const spy = jest.spyOn(ProductService, "createProduct");
    const expected = {
      status: false,
      message: "Product created successfully",
      statusCode: 200,
      data: {
        _id: "5dbff32e367a343830cd2f49",
        name: "Product 1",
        storeId: "6dbff32e367a343830cd2f43",
        description: "Product description 1",
        price: 35000,
        quantityAvailable: 35,
      } as IProduct,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should create product successfully and return data", async () => {
      const payload = {
        userId: "5dbff32e367a343830cd2f49",
        name: "Product 1",
        storeId: "6dbff32e367a343830cd2f43",
        description: "Product description 1",
        price: 35000,
        quantityAvailable: 35,
      };

      await expect(ProductService.createProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("getProducts", () => {
    const spy = jest.spyOn(ProductService, "getProducts");
    const expected = {
      status: true,
      message: "Stores fetched successfully",
      statusCode: 200,
      data: {
        page: 1,
        perPage: 10,
        totalPages: 10,
        totalDocuments: 100,
        products: [],
      },
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return all products that are not deleted", async () => {
      const payload = {
        page: 1,
        perPage: 10,
        userId: "5dbff32e367a343830cd2f49",
        storeId: "6dbff32e367a343830cd2f43",
      };

      await expect(ProductService.getProducts(payload)).resolves.toEqual(expected);
    });
  });

  describe("getProduct", () => {
    const spy = jest.spyOn(ProductService, "getProduct");
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
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.getProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("getProduct", () => {
    const spy = jest.spyOn(ProductService, "getProduct");
    const expected = {
      status: false,
      message: "Product not found",
      statusCode: 404,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Product not found' when wrong productId is provided", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.getProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("getProduct", () => {
    const spy = jest.spyOn(ProductService, "getProduct");
    const expected = {
      status: true,
      message: "Product retrieved successfully",
      statusCode: 200,
      data: { _id: "6dbff32e367a343830cd2f43" } as IProduct,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return retrieve an existing store name", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.getProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateProduct", () => {
    const spy = jest.spyOn(ProductService, "updateProduct");
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
        productId: "4dbff32e867a343830cd2f51",
        name: "Product 1",
        description: "Product description 1",
        price: 35000,
        quantityAvailable: 35,
      };

      await expect(ProductService.updateProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateProduct", () => {
    const spy = jest.spyOn(ProductService, "updateProduct");
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
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.updateProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateProduct", () => {
    const spy = jest.spyOn(ProductService, "updateProduct");
    const expected = {
      status: false,
      message: "Unable to update product",
      statusCode: 422,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'Unable to update product' when no data was modified", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.updateProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("updateProduct", () => {
    const spy = jest.spyOn(ProductService, "updateProduct");
    const expected = {
      status: true,
      message: "Product updated successfully",
      statusCode: 200,
      data: {
        _id: "6dbff32e367a343830cd2f43",
        storeId: "6dbff32e367a343830cd2f43",
        name: "Product update 2",
        description: "Product update description 2",
        price: 20000,
        quantityAvailable: 15,
      } as IProduct,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return update product and return updated product", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        productId: "4dbff32e867a343830cd2f51",
        name: "Product update 2",
        description: "Product update description 2",
        price: 20000,
        quantityAvailable: 15,
      };

      await expect(ProductService.updateProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("deleteProduct", () => {
    const spy = jest.spyOn(ProductService, "deleteProduct");
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
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.deleteProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("deleteProduct", () => {
    const spy = jest.spyOn(ProductService, "deleteProduct");
    const expected = {
      status: false,
      message: "Unable to delete product",
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
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.deleteProduct(payload)).resolves.toEqual(expected);
    });
  });

  describe("deleteProduct", () => {
    const spy = jest.spyOn(ProductService, "deleteProduct");
    const expected = {
      status: true,
      message: "Store deleted successfully",
      statusCode: 200,
      data: { _id: "6dbff32e367a343830cd2f43" } as IProduct,
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => expected);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return delete successfully and return deleted product", async () => {
      const payload = {
        storeId: "6dbff32e367a343830cd2f43",
        userId: "5dbff32e367a343830cd2f49",
        productId: "4dbff32e867a343830cd2f51",
      };

      await expect(ProductService.deleteProduct(payload)).resolves.toEqual(expected);
    });
  });
});
