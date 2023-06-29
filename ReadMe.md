## Commands

| Command                | Description                     |
|------------------------|---------------------------------|
| `npm run client:start` | Starts client dev-server        |
| `npm run api:start`    | Starts api dev-server           |
| `npm run client:build` | Starts the build for the client |
| `npm run start`        | Starts both the api and client  |
| `npm run inst`         | Installs dependencies           |

## How do I add stuff?

1. First of figure out what you want to add:
	- Product `/api/products`
	- Category `/api/categories`

2. Use the correct route to post your new item

3. Figure out the body you'll need to send:

Products:

```json
{
	"name": "Chicken",
	"price": {
		"value": 52.99,
		"unit": "Euro"
	},
	"image": "https://link.to/image",
	"category": [
		"ID FOR CATEGORIES"
	],
	"ratings": [
		{
			"user": "ID FOR USER",
			"rating": 4.0
		}
	]
}
```

<!-- endpoints:start -->

| Method | Path                       | Request Body              | Query Params | Path Params | Response | Summary              |
|--------|----------------------------|---------------------------|--------------|-------------|----------|----------------------|
| POST   | /api/user/register         | username, password, email |              |             | 200      | Register a new user  |
| POST   | /api/user/login            | username, password        |              |             | 200      | User login           |
| GET    | /api/user                  |                           |              |             | 200      | Get user data        |
| POST   | /api/user/refresh          |                           |              |             | 200      | Refresh token        |
| POST   | /api/products              | product                   |              |             | 200      | Add a new product    |
| GET    | /api/products              |                           |              |             | 200      | Get all products     |
| GET    | /api/products/:id          |                           |              | id          | 200      | Get a product by ID  |
| POST   | /api/categories            | category                  |              |             | 200      | Add a new category   |
| GET    | /api/categories            |                           |              |             | 200      | Get all categories   |
| GET    | /api/categories/:id        |                           |              | id          | 200      | Get a category by ID |
| POST   | /api/products/:id/rate     | rating                    |              | id          | 200      | Rate a product       |
| POST   | /api/products/:id/wishlist |                           | add          | id          | 200      | Update wishlist      |
| POST   | /api/products/:id/cart     |                           | add          | id          | 200      | Update shopping cart |
| GET    | *                          |                           |              |             | 200      | Serve client         |

<!-- endpoints:end -->













<!-- ids:start -->

### Categories

| Name       | Id                       |
|------------|--------------------------|
| Meat       | 649d50bd924b2f32645d0f24 |
| Vegetables | 649d85139011477c830b89c9 |
| Seafood    | 649d853e9011477c830b89cb |
| Fruits     | 649d85519011477c830b89cd |
| Bread      | 649d85909011477c830b89d1 |
| Sweets     | 649d85a19011477c830b89d3 |

### Products

| Name             | Id                       |
|------------------|--------------------------|
| Chicken          | 649d48e1926db279d409ea28 |
| Eggplant         | 649d82629011477c830b89c7 |
| Spinach          | 649d8cc8db935bfa65fc0133 |
| Zucchini         | 649d8d77db935bfa65fc013a |
| Carrots          | 649d8d9bdb935bfa65fc013e |
| Artichoke        | 649d8defdb935bfa65fc0142 |
| Asparagus        | 649d8e21db935bfa65fc0146 |
| Beetroot         | 649d8e46db935bfa65fc014a |
| Broccoli         | 649d8e79db935bfa65fc014e |
| Broccoflower     | 649d8ebddb935bfa65fc0152 |
| Cauliflower      | 649d904cdb935bfa65fc0156 |
| Brussels Sprouts | 649d912adb935bfa65fc015a |
| Cabbage          | 649d922bdb935bfa65fc015e |
| Bell Pepper      | 649d926fdb935bfa65fc0162 |
| Bell Pepper      | 649d92a5db935bfa65fc0167 |
| Celeriac         | 649d9335db935bfa65fc016c |
| Celery           | 649d936cdb935bfa65fc0170 |
| Chinese Cabbage  | 649d93c2db935bfa65fc0174 |
| Bok Choy         | 649d943cdb935bfa65fc0178 |
| Chilly           | 649d9471db935bfa65fc017c |
| Choko            | 649d949fdb935bfa65fc0180 |
| Cucumber         | 649d94d2db935bfa65fc0184 |
| Endive           | 649d9526db935bfa65fc0188 |
| Fennel           | 649d954fdb935bfa65fc018c |
| Garlic           | 649d9576db935bfa65fc0190 |
| Ginger           | 649d9597db935bfa65fc0194 |
| Kale             | 649d95c5db935bfa65fc0198 |
| Leek             | 649d9617db935bfa65fc019c |
| Lettuce          | 649d9638db935bfa65fc01a0 |
| Champignon       | 649d9660db935bfa65fc01a4 |
| Yellow Onion     | 649d969ddb935bfa65fc01a8 |
| Red Onion        | 649d96badb935bfa65fc01ac |
| Daikon Radish    | 649d9714db935bfa65fc01b0 |

<!-- ids:end -->












