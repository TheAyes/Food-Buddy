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

# ID's

### Categories

| Name         | Id                         |
|--------------|----------------------------|
| `Meat`       | `649d50bd924b2f32645d0f24` |
| `Bread`      | `649d85909011477c830b89d1` |
| `Sweets`     | `649d85a19011477c830b89d3` |
| `Fruits`     | `649d85519011477c830b89cd` |
| `Seafood`    | `649d853e9011477c830b89cb` |
| `Vegetables` | `649d85139011477c830b89c9` |

### Products

| Name      | Id                         |
|-----------|----------------------------|
| `Chicken` | `649d48e1926db279d409ea28` |