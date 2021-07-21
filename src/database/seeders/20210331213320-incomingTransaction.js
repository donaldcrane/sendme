module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Credits", [
    {
      id: "c375c640-81ff-405a-89a8-460ea2f71755",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      amount: 10000,
      transactionType: "Deposit",
      senderName: "Francis Adeleke",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e85a",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",  
      amount: 6000,
      transactionType: "Deposit",
      senderName: "Taiwo Friday",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97a",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      amount: 40000,
      transactionType: "Deposit",
      senderName: "Taiwo Friday",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b9f",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      amount: 10000,
      transactionType: "Deposit",
      senderName: "Francis Adeleke",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "c375c640-81ff-405a-89a8-460ea2f71877",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      amount: 10000,
      transactionType: "Deposit",
      senderName: "Ishola Wizkid",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e855",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",  
      amount: 60000,
      transactionType: "Deposit",
      senderName: "Ishola Wizkid",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97e",
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      amount: 40000,
      transactionType: "Deposit",
      senderName: "Bolaji Emma",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b9e",
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      amount: 30000,
      transactionType: "Deposit",
      senderName: "Bolaji Emma",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ,], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
