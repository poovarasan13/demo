const axios = require("axios");

const API_URL = "http://localhost:5000/api";
let token = "";
let createdProductId = "";

async function testBackend() {
  try {
    console.log("--- Starting API Tests ---");

    console.log("\n--- 1. Register User ---");
    // Use a random email to avoid duplication errors on re-runs
    const randomEmail = `testuser${Math.floor(Math.random() * 10000)}@example.com`;
    try {
      const registerRes = await axios.post(`${API_URL}/auth/register`, {
        name: "Test User",
        email: randomEmail,
        password: "password123",
      });
      console.log("Register Response:", registerRes.data);
    } catch (e) {
      console.error(
        "Register failed:",
        e.response ? e.response.data : e.message,
      );
      if (e.code) console.error("Error Code:", e.code);
      // Proceed if user might already exist (though random email should prevent this)
    }

    console.log("\n--- 2. Login User ---");
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: randomEmail,
      password: "password123",
    });
    console.log("Login Response:", loginRes.data);
    token = loginRes.data.data.token;

    if (!token) throw new Error("No token received");

    console.log("\n--- 3. Add Product ---");
    const addProductRes = await axios.post(
      `${API_URL}/products`,
      {
        productName: "Test Product",
        price: 99.99,
        rating: 4.5,
        discount: 10,
        availability: "In Stock",
        category: "Electronics",
        company: "Test Co",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log("Add Product Response:", addProductRes.data);
    createdProductId = addProductRes.data.data._id;

    console.log("\n--- 4. List My Products ---");
    const listProductsRes = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("List Products Response:", listProductsRes.data);
    if (listProductsRes.data.data.length === 0)
      console.warn("Warning: No products found");

    console.log("\n--- 5. Delete Product ---");
    if (createdProductId) {
      const deleteRes = await axios.delete(
        `${API_URL}/products/${createdProductId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Delete Response:", deleteRes.data);
    } else {
      console.warn("Skipping delete: No product created");
    }

    console.log("\n--- Tests Completed Successfully ---");
  } catch (error) {
    console.error("\n!!! Test Failed !!!");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
      if (error.code) console.error("Code:", error.code);
    }
  }
}

testBackend();
