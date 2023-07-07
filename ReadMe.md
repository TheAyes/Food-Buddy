## Commands

| Command                | Description                     |
|------------------------|---------------------------------|
| `npm run client:start` | Starts client dev-server        |
| `npm run api:start`    | Starts api dev-server           |
| `npm run client:build` | Starts the build for the client |
| `npm run start`        | Starts both the api and client  |
| `npm run inst`         | Installs dependencies           |

---

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

---

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

---

## ID's

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
| sweets     | 649dd7b9db935bfa65fc036e |

### Products

| Name                | Id                       |
|---------------------|--------------------------|
| Chicken             | 649d48e1926db279d409ea28 |
| Eggplant            | 649d82629011477c830b89c7 |
| Spinach             | 649d8cc8db935bfa65fc0133 |
| Zucchini            | 649d8d77db935bfa65fc013a |
| Carrots             | 649d8d9bdb935bfa65fc013e |
| Artichoke           | 649d8defdb935bfa65fc0142 |
| Asparagus           | 649d8e21db935bfa65fc0146 |
| Beetroot            | 649d8e46db935bfa65fc014a |
| Broccoli            | 649d8e79db935bfa65fc014e |
| Broccoflower        | 649d8ebddb935bfa65fc0152 |
| Cauliflower         | 649d904cdb935bfa65fc0156 |
| Brussels Sprouts    | 649d912adb935bfa65fc015a |
| Cabbage             | 649d922bdb935bfa65fc015e |
| Bell Pepper         | 649d926fdb935bfa65fc0162 |
| Bell Pepper         | 649d92a5db935bfa65fc0167 |
| Celeriac            | 649d9335db935bfa65fc016c |
| Celery              | 649d936cdb935bfa65fc0170 |
| Chinese Cabbage     | 649d93c2db935bfa65fc0174 |
| Bok Choy            | 649d943cdb935bfa65fc0178 |
| Chilly              | 649d9471db935bfa65fc017c |
| Choko               | 649d949fdb935bfa65fc0180 |
| Cucumber            | 649d94d2db935bfa65fc0184 |
| Endive              | 649d9526db935bfa65fc0188 |
| Fennel              | 649d954fdb935bfa65fc018c |
| Garlic              | 649d9576db935bfa65fc0190 |
| Ginger              | 649d9597db935bfa65fc0194 |
| Kale                | 649d95c5db935bfa65fc0198 |
| Leek                | 649d9617db935bfa65fc019c |
| Lettuce             | 649d9638db935bfa65fc01a0 |
| Champignon          | 649d9660db935bfa65fc01a4 |
| Yellow Onion        | 649d969ddb935bfa65fc01a8 |
| Red Onion           | 649d96badb935bfa65fc01ac |
| Daikon Radish       | 649d9714db935bfa65fc01b0 |
| Spring Onion        | 649d976bdb935bfa65fc01b4 |
| Parsnip             | 649d97bedb935bfa65fc01b8 |
| Peas                | 649d97eddb935bfa65fc01bc |
| Pumpkin             | 649d9840db935bfa65fc01c0 |
| Radish              | 649d9866db935bfa65fc01c4 |
| Rhubarb             | 649da0d2db935bfa65fc01c8 |
| Snow Peas           | 649da269db935bfa65fc01cc |
| Sprouts             | 649da2addb935bfa65fc01d0 |
| Sweet Corn          | 649da48edb935bfa65fc01d7 |
| Sweet Potato        | 649da54ddb935bfa65fc01db |
| Taro                | 649da58cdb935bfa65fc01df |
| Tomato              | 649da5dadb935bfa65fc01e3 |
| Turnip              | 649da616db935bfa65fc01e7 |
| Watercress          | 649da660db935bfa65fc01eb |
| Witlof              | 649da6b3db935bfa65fc01ef |
| Red Cabbage         | 649da792db935bfa65fc01f4 |
| Avocado             | 649da7ecdb935bfa65fc01f8 |
| Salsify             | 649da84cdb935bfa65fc01fc |
| Toast               | 649da91fdb935bfa65fc0200 |
| Baguette            | 649da952db935bfa65fc0204 |
| Ciabatta            | 649da98bdb935bfa65fc0208 |
| Ciabatta + Olives   | 649daa19db935bfa65fc020c |
| Focaccia            | 649daa80db935bfa65fc0210 |
| Focaccia + Olives   | 649daaa3db935bfa65fc0214 |
| Focaccia + Tomatoes | 649daae4db935bfa65fc0218 |
| Multigrain Bread    | 649dab2cdb935bfa65fc021c |
| Whole Wheat Bread   | 649dab7cdb935bfa65fc0220 |
| Rye bread           | 649dabbcdb935bfa65fc0224 |
| Sourdough Bread     | 649dabeedb935bfa65fc0228 |
| Pumpernickel Bread  | 649dac52db935bfa65fc022c |
| Flatbread           | 649dac9adb935bfa65fc0230 |
| Brioche             | 649dacbfdb935bfa65fc0234 |
| Challah             | 649daceedb935bfa65fc0238 |
| Cornbread           | 649dad59db935bfa65fc023c |
| Pide                | 649dae9bdb935bfa65fc0240 |
| Bread Rolls         | 649daee7db935bfa65fc0244 |
| Octopus             | 649dafa5db935bfa65fc0249 |
| Shrimps             | 649db053db935bfa65fc024d |
| Shark Steak         | 649db0bcdb935bfa65fc0251 |
| Tuna Steak          | 649db0f6db935bfa65fc0255 |
| Canned Tuna         | 649db138db935bfa65fc0259 |
| Calamari            | 649db190db935bfa65fc025d |
| Calamari Rings      | 649db1aadb935bfa65fc0261 |
| Salmon              | 649db1cedb935bfa65fc0265 |
| Alaska Pollock      | 649db225db935bfa65fc0269 |
| Lobster             | 649db291db935bfa65fc026d |
| Jumbo Prawns        | 649db323db935bfa65fc0271 |
| Clams               | 649db365db935bfa65fc0275 |
| Mussels             | 649db3dbdb935bfa65fc0279 |
| Eel                 | 649db406db935bfa65fc027d |
| Dolphin Meat        | 649db47fdb935bfa65fc0281 |
| Swordfish           | 649db4acdb935bfa65fc0285 |
| Oyster              | 649db51cdb935bfa65fc0289 |
| Plaice Fillet       | 649db57adb935bfa65fc028d |
| Kiwi                | 649db73adb935bfa65fc0291 |
| Sapodilla           | 649db782db935bfa65fc0295 |
| Tamarillo           | 649db7b4db935bfa65fc0299 |
| Pitanga             | 649dba74db935bfa65fc029d |
| Durian              | 649dbaa3db935bfa65fc02a1 |
| Mangosteen          | 649dbad5db935bfa65fc02a5 |
| Black Currant       | 649dbb12db935bfa65fc02a9 |
| Annana Muricata     | 649dbb81db935bfa65fc02ad |
| Lychees             | 649dbbb6db935bfa65fc02b1 |
| Persimon            | 649dbbfedb935bfa65fc02b5 |
| Mullberry           | 649dbc3ddb935bfa65fc02b9 |
| Jackfruit           | 649dbc6bdb935bfa65fc02bd |
| Apricot             | 649dbc9edb935bfa65fc02c1 |
| Passionfruit        | 649dbcd7db935bfa65fc02c5 |
| Watermelon          | 649dbdcadb935bfa65fc02c9 |
| Galia Melon         | 649dbe0adb935bfa65fc02cd |
| Charentais Melon    | 649dbe4bdb935bfa65fc02d1 |
| Sabras Fruit        | 649dbe96db935bfa65fc02d5 |
| Pineapple           | 649dbebcdb935bfa65fc02d9 |
| Jujube              | 649dbef1db935bfa65fc02dd |
| Feijoa              | 649dbf34db935bfa65fc02e1 |
| Rambutan            | 649dc7e3db935bfa65fc02e5 |
| Dragonfruit         | 649dc811db935bfa65fc02e9 |
| Plum                | 649dc83bdb935bfa65fc02ed |
| Mandarin            | 649dc872db935bfa65fc02f1 |
| Mandarin            | 649dc880db935bfa65fc02f5 |
| Tangelo             | 649dc8b5db935bfa65fc02f9 |
| Loquat              | 649dc8d8db935bfa65fc02fd |
| Papaya              | 649dc8fbdb935bfa65fc0301 |
| Starfruit           | 649dcc27db935bfa65fc0305 |
| Bananas             | 649dcc5bdb935bfa65fc0309 |
| Mango               | 649dccb5db935bfa65fc030d |
| Pomelo Rosa         | 649dcd11db935bfa65fc0311 |
| Kumquat             | 649dcd59db935bfa65fc0315 |
| Fig                 | 649dcd7ddb935bfa65fc0319 |
| Star Apple          | 649dcdbadb935bfa65fc031d |
| Coconut             | 649dce26db935bfa65fc0321 |
| Pomegranate         | 649dce60db935bfa65fc0325 |
| Elderberry          | 649dcea9db935bfa65fc0329 |
| Cranberries         | 649dcecfdb935bfa65fc032d |
| Blueberries         | 649dcefadb935bfa65fc0331 |
| Strawberries        | 649dcf1ddb935bfa65fc0335 |
| Blackberries        | 649dcf4bdb935bfa65fc0339 |
| Golden Berry        | 649dcf88db935bfa65fc033d |
| Raspberry           | 649dd3f6db935bfa65fc0341 |
| Lime                | 649dd434db935bfa65fc0345 |
| Lemon               | 649dd455db935bfa65fc0349 |
| Apple               | 649dd4b6db935bfa65fc034d |
| Orange              | 649dd4e3db935bfa65fc0351 |
| Blood Orange        | 649dd50fdb935bfa65fc0355 |
| Grapefruit          | 649dd548db935bfa65fc0359 |
| Pear                | 649dd5dfdb935bfa65fc035d |
| Asian Pear          | 649dd60cdb935bfa65fc0361 |
| Cherries            | 649dd66bdb935bfa65fc0365 |
| Peach               | 649dd6b4db935bfa65fc0369 |

<!-- ids:end -->














