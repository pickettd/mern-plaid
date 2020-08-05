export const AUTH_MOCK_DATA = {
  isAuthenticated: true,
  user: {
    id: "123456789012345678901234",
    name: "Test Person",
    iat: null,
    exp: null,
    budgets: {},
    categoryMap: {},
  },
  loading: false,
  budgets: {
    "Food and Drink": 200,
    Shops: 50,
    Travel: 20,
    Recreation: 10,
  },
  categoryMap: {
    "Food and Drink": "Groceries",
    Shops: "Shopping",
    Travel: "Travel",
    Recreation: "Entertainment",
  },
};
// NOTE THAT I'VE ADDED EXTRA MOCK DATA FOR
// categoriesThisSpendRange, spendingByCategory, incomeSum, and spendingSum
// (because it could be a different time period)
export const PLAID_MOCK_DATA = {
  accounts: [
    {
      _id: "5ef4fdbaca322600d6403f2e",
      userId: "123456789012345678901234",
      itemId: "Nk3qlg7vvPtA6mZbr4ZRuEE8GL67dWFW4Ejyq",
      institutionId: "ins_3",
      institutionName: "Chase",
      __v: 0,
    },
    {
      _id: "5ef4fddcca322600d6403f2f",
      userId: "123456789012345678901234",
      itemId: "m1vBo61a1RcbaJzwrojjiMMlqeV4NVSLZ1qxN",
      institutionId: "ins_110423",
      institutionName: "Citi",
      __v: 0,
    },
  ],
  transactions: [
    {
      accountName: "Citi",
      transactions: [
        {
          account_id: "opvk86pWpqcbmg37REZZikkPvApoX5SRbEDRV",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants"],
          category_id: "13005000",
          date: "2020-07-24",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Tectra Inc",
          name: "Tectra Inc",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "jQvK1RQkQyUbewqngy5etrLVL3ddo3c1mZKWr",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "opvk86pWpqcbmg37REZZikkPvApoX5SRbEDRV",
          account_owner: null,
          amount: -2078.5,
          authorized_date: null,
          category: ["Payment"],
          category_id: "16000000",
          date: "2020-07-23",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "AUTOMATIC PAYMENT - THANK",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "lM6zpRMJMvh9davVWEy1Hvlx5ql83DiZX85gg",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "opvk86pWpqcbmg37REZZikkPvApoX5SRbEDRV",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants", "Fast Food"],
          category_id: "13005032",
          date: "2020-07-23",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "KFC",
          name: "KFC",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "kZvrLRZpZ9uexPKoXERaIeQJGmQN51iWVK3D7",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "opvk86pWpqcbmg37REZZikkPvApoX5SRbEDRV",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Shops", "Sporting Goods"],
          category_id: "19046000",
          date: "2020-07-23",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Madison Bicycle Shop",
          name: "Madison Bicycle Shop",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "JgJKAygQgltMrKZA3PWJIDAVjXAP46cdrqGMe",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "LEJznAEQEKULBz16dnjjfyye3Jp4r1TPEwMPa",
          account_owner: null,
          amount: -25,
          authorized_date: null,
          category: ["Payment", "Credit Card"],
          category_id: "16001000",
          date: "2020-07-14",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "CREDIT CARD 3333 PAYMENT *//",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "opvk86pWpqcbmg37REoEcxKaj4NAENiR7Vpxl",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "1XQDKAXLXNtQLEDNaeWWFdd6lyeM3xi5rBR5e",
          account_owner: null,
          amount: -5.4,
          authorized_date: null,
          category: ["Travel", "Taxi"],
          category_id: "22016000",
          date: "2020-07-14",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Uber",
          name: "Uber 063015 SF**POOL**",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "povdE6oloKfRAXxmPVeVUaj1yQ5kW5hLVQJyx",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "gjoLQDjNjnFwA796Rn88u443jJdqAPig5WBgN",
          account_owner: null,
          amount: -5850,
          authorized_date: null,
          category: ["Transfer", "Debit"],
          category_id: "21006000",
          date: "2020-07-13",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "ACH Electronic CreditGUSTO PAY 123456",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: "ACH",
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "DZJ9pEZ4ZbuPezNMlWnguwm9r1jllXUvJQwdD",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "povdE6oloKfRAXxmPVLLSEEqvkdAp6TLzaGLz",
          account_owner: null,
          amount: -1000,
          authorized_date: null,
          category: ["Transfer", "Deposit"],
          category_id: "21007000",
          date: "2020-07-13",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "CD DEPOSIT .INITIAL.",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "XXxDq3XQX7tmZDBvLAk5tWm9aAqwwLidLE6Jg",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "opvk86pWpqcbmg37REZZikkPvApoX5SRbEDRV",
          account_owner: null,
          amount: -78.5,
          authorized_date: null,
          category: ["Recreation", "Gyms and Fitness Centers"],
          category_id: "17018000",
          date: "2020-07-12",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Touchstone",
          name: "Touchstone Climbing",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "QblavRb7bxcnvRW6jqdXUPAd1xQ6Xjfp7E7P3",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "1XQDKAXLXNtQLEDNaeWWFdd6lyeM3xi5rBR5e",
          account_owner: null,
          amount: 500,
          authorized_date: null,
          category: ["Travel", "Airlines and Aviation Services"],
          category_id: "22001000",
          date: "2020-07-12",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "United Airlines",
          name: "United Airlines",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "eNL87RNyNAioJZWD95yVIKnDP59VxXiL515va",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "1XQDKAXLXNtQLEDNaeWWFdd6lyeM3xi5rBR5e",
          account_owner: null,
          amount: -12,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants", "Fast Food"],
          category_id: "13005032",
          date: "2020-07-11",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: "3322",
            zip: null,
          },
          merchant_name: "McDonald's",
          name: "McDonald's",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "K8JrGL8y8qc1zgMoxjmDC6WwmM5QblfVa6bZL",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "1XQDKAXLXNtQLEDNaeWWFdd6lyeM3xi5rBR5e",
          account_owner: null,
          amount: -4.33,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants", "Coffee Shop"],
          category_id: "13005043",
          date: "2020-07-11",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Starbucks",
          name: "Starbucks",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "r8v4A68K8zc7jRa6KE1zuQqN6aJZ8WIlVygPV",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "1XQDKAXLXNtQLEDNaeWWFdd6lyeM3xi5rBR5e",
          account_owner: null,
          amount: -89.4,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants"],
          category_id: "13005000",
          date: "2020-07-10",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Sparkfun",
          name: "SparkFun",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "W63elB6p6jFdQVLm1xGmsqDEmKA9mGUl7w1qL",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "LEJznAEQEKULBz16dnjjfyye3Jp4r1TPEwMPa",
          account_owner: null,
          amount: 4.22,
          authorized_date: null,
          category: ["Transfer", "Credit"],
          category_id: "21005000",
          date: "2020-07-09",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "INTRST PYMNT",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "xbvZ96bRb4cmJ8e76VjBhl3DMRe9DjunBPZjR",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "opvk86pWpqcbmg37REZZikkPvApoX5SRbEDRV",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Travel", "Airlines and Aviation Services"],
          category_id: "22001000",
          date: "2020-06-29",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "United Airlines",
          name: "United Airlines",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "GLJE8VLRL9Cel47pr9WVi3zm8EgM9ACWEJo6X",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "1XQDKAXLXNtQLEDNaeWWFdd6lyeM3xi5rBR5e",
          account_owner: null,
          amount: -6.33,
          authorized_date: null,
          category: ["Travel", "Taxi"],
          category_id: "22016000",
          date: "2020-06-27",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Uber",
          name: "Uber 072515 SF**POOL**",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "axQL4RxPxgu5W6LgnAD9UNMMQbwEabi7gaZK1",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
      ],
    },
    {
      accountName: "Chase",
      transactions: [
        {
          account_id: "Nk3qlg7vvPtA6mZbr4ZRuEE5JKwdx3HWpzaAD",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants"],
          category_id: "13005000",
          date: "2020-07-24",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Tectra Inc",
          name: "Tectra Inc",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "bd9pLg6vvyIwb6gVp5pdIxk383pVZWuVqKVxN",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "Nk3qlg7vvPtA6mZbr4ZRuEE5JKwdx3HWpzaAD",
          account_owner: null,
          amount: -2078.5,
          authorized_date: null,
          category: ["Payment"],
          category_id: "16000000",
          date: "2020-07-23",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "AUTOMATIC PAYMENT - THANK",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "r84qr9gkkwHvmMeVnKnguagBbme9jLflgaWr6",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "Nk3qlg7vvPtA6mZbr4ZRuEE5JKwdx3HWpzaAD",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants", "Fast Food"],
          category_id: "13005032",
          date: "2020-07-23",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "KFC",
          name: "KFC",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "K8rRbZ4vvPHJWGEVlxlKsMxXyK8e1vFVbG7lb",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "Nk3qlg7vvPtA6mZbr4ZRuEE5JKwdx3HWpzaAD",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Shops", "Sporting Goods"],
          category_id: "19046000",
          date: "2020-07-23",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Madison Bicycle Shop",
          name: "Madison Bicycle Shop",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "qgalK9bPPAtk6zZvV9VmTNBLe4zGmyCdkNve1",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "axLk19Bvv7s94jmV8nmDt11Jqnm4EzI7JvnKB",
          account_owner: null,
          amount: -25,
          authorized_date: null,
          category: ["Payment", "Credit Card"],
          category_id: "16001000",
          date: "2020-07-14",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "CREDIT CARD 3333 PAYMENT *//",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "xbZxa5g11KH1yAwZR6RVirDZq1aMRXinvEWAz",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "d4Ago8DvvZH3eqjVJyjPfDDwRn1ZeLuZzq9n1",
          account_owner: null,
          amount: -5.4,
          authorized_date: null,
          category: ["Travel", "Taxi"],
          category_id: "22016000",
          date: "2020-07-14",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Uber",
          name: "Uber 063015 SF**POOL**",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "3lDP3dG44JsvjWB3eoedhNEkg8Z3vnfq3aN8A",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "PndrKoQvv7sqV8vyGPvQiRR5DqgJwZu75njyD",
          account_owner: null,
          amount: -5850,
          authorized_date: null,
          category: ["Transfer", "Debit"],
          category_id: "21006000",
          date: "2020-07-13",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "ACH Electronic CreditGUSTO PAY 123456",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: "ACH",
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "Begwp9DEEki3w5BDNGNXfN4nr41DeECw5GyRV",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "4qg6xGaNNZsw9qjXaLjAFBBWl1GJ3eidVKWRx",
          account_owner: null,
          amount: -1000,
          authorized_date: null,
          category: ["Transfer", "Deposit"],
          category_id: "21007000",
          date: "2020-07-13",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "CD DEPOSIT .INITIAL.",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "zyEJN9appzi3L4qQwEwGfA8wN8XabjtoBGaZj",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "Nk3qlg7vvPtA6mZbr4ZRuEE5JKwdx3HWpzaAD",
          account_owner: null,
          amount: -78.5,
          authorized_date: null,
          category: ["Recreation", "Gyms and Fitness Centers"],
          category_id: "17018000",
          date: "2020-07-12",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Touchstone",
          name: "Touchstone Climbing",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "JgKkn94vvVtXBQqyz3zysqD5gKaPV6Cdqm1zV",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "d4Ago8DvvZH3eqjVJyjPfDDwRn1ZeLuZzq9n1",
          account_owner: null,
          amount: 500,
          authorized_date: null,
          category: ["Travel", "Airlines and Aviation Services"],
          category_id: "22001000",
          date: "2020-07-12",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "United Airlines",
          name: "United Airlines",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "5K17d64PP5ixgKpd383duWoA7pg1aMuZM9bka",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "d4Ago8DvvZH3eqjVJyjPfDDwRn1ZeLuZzq9n1",
          account_owner: null,
          amount: -12,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants", "Fast Food"],
          category_id: "13005032",
          date: "2020-07-11",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: "3322",
            zip: null,
          },
          merchant_name: "McDonald's",
          name: "McDonald's",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "xbZxa5g11KH1yAwZR6R4trqve5z58DtnB4m1E",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "d4Ago8DvvZH3eqjVJyjPfDDwRn1ZeLuZzq9n1",
          account_owner: null,
          amount: -4.33,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants", "Coffee Shop"],
          category_id: "13005043",
          date: "2020-07-11",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Starbucks",
          name: "Starbucks",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "d4Ago8DvvZH3eqjVJyJzFJ17jkmkNPcZaEokW",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "d4Ago8DvvZH3eqjVJyjPfDDwRn1ZeLuZzq9n1",
          account_owner: null,
          amount: -89.4,
          authorized_date: null,
          category: ["Food and Drink", "Restaurants"],
          category_id: "13005000",
          date: "2020-07-10",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Sparkfun",
          name: "SparkFun",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "6r1XadejjvINrvDaxpxzTKAzqrqa6LCgyABQN",
          transaction_type: "place",
          unofficial_currency_code: null,
        },
        {
          account_id: "axLk19Bvv7s94jmV8nmDt11Jqnm4EzI7JvnKB",
          account_owner: null,
          amount: 4.22,
          authorized_date: null,
          category: ["Transfer", "Credit"],
          category_id: "21005000",
          date: "2020-07-09",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: null,
          name: "INTRST PYMNT",
          payment_channel: "other",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "jQKpGPJBB7tKPJBv8g8RSwbe17w8VwC1q9BBK",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "Nk3qlg7vvPtA6mZbr4ZRuEE5JKwdx3HWpzaAD",
          account_owner: null,
          amount: -500,
          authorized_date: null,
          category: ["Travel", "Airlines and Aviation Services"],
          category_id: "22001000",
          date: "2020-06-29",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "United Airlines",
          name: "United Airlines",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "axLk19Bvv7s94jmV8nm4uorGlJVLkbuRdn1rV",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
        {
          account_id: "d4Ago8DvvZH3eqjVJyjPfDDwRn1ZeLuZzq9n1",
          account_owner: null,
          amount: -6.33,
          authorized_date: null,
          category: ["Travel", "Taxi"],
          category_id: "22016000",
          date: "2020-06-27",
          iso_currency_code: "USD",
          location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null,
          },
          merchant_name: "Uber",
          name: "Uber 072515 SF**POOL**",
          payment_channel: "in store",
          payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null,
          },
          pending: false,
          pending_transaction_id: null,
          transaction_id: "VR7pdravvqUEx98qbM8EIVoaQADwmRfWPeNLl",
          transaction_type: "special",
          unofficial_currency_code: null,
        },
      ],
    },
  ],
  accountsLoading: false,
  transactionsLoading: false,
  incomeSum: 1000,
  spendingSum: 4391.92,
  spendRangeDaysSelected: 30,
  totalTransactionCount: 50,
  reviewedTransactionCount: 45,
  categoriesThisSpendRange: [
    { bankName: "Food and Drink", x: 1, name: "" },
    { bankName: "Shops", x: 2, name: "" },
    { bankName: "Travel", x: 3, name: "" },
    { bankName: "Recreation", x: 4, name: "" },
  ],
  spendingByCategory: {
    "Food and Drink": 2211.46,
    Shops: 1000,
    Travel: 10233.46,
    Recreation: 157,
  },
};
