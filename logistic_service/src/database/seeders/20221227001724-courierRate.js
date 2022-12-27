"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CourierRates",
      [
        {
          logistic_name: "J&T",
          amount: 12000,
          destination_name: "BANDUNG",
          origin_name: "TASIKMALAYA",
          duration: "1-2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logistic_name: "SiCepat",
          amount: 18000,
          destination_name: "GARUT",
          origin_name: "JAKARTA",
          duration: "2-3",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logistic_name: "Anteraja",
          amount: 25000,
          destination_name: "SURABAYA",
          origin_name: "BANDUNG",
          duration: "2-4",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CourierRates", null, {});
  },
};
