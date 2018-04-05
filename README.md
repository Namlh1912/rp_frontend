# back-rest-dash-button

# Usage

## Backend
- npm install
- npm start

## Frontend
- cd ./frontend
- npm install | yarn install
- npm start | yarn start

# Database (PostgresSQL)
- folder _sql/init.sql: copy query SQL
- open PostgresSQL -> paste query SQL -> run

# Asset
- serveraddress/images/upload/[thumbnail-]imgLink

## PRODUCTS 

### List All PRODUCTS [GET /products]
Load all products.

+ Response 200 (application/json)

		[
			{
				"id": 1,
				"name": "KhoiNK",
				"price": 10,
				"quantity": 10,
				"imgLink": "rkoTv50dG.png",
				"brandId": 1
			}
		]

+ Response 500 (application/json)

        {
            "message" : "Get products failed"
        }


### Get Product Detail By Id [GET /products/:id]

Get asset detail

+ Response 200 (application/json)

		{
			"id": 1,
			"name": "KhoiNK",
			"price": 10,
			"quantity": 10,
			"imgLink": "rkoTv50dG.png",
			"brandId": 1
		}
+ Response 500 (application/json)

		{
			"message":"Load product failed"
		}

### Get Product By Brand [GET /brand-products/:id]

+ Response 200 (application/json)

		[
			{
				"id": 1,
				"name": "KhoiNK",
				"price": 10,
				"quantity": 10,
				"imgLink": "rkoTv50dG.png",
				"brandId": 1
			}
		]
+ Response 500 (application/json)

		{
			"message":"Load product failed"
		}

### Create Asset [POST /products]

Get visitor detail

+ Response 200 (application/json)

		{
			"name": "KhoiNK",
			"price": 10,
			"quantity": 10,
			"file": File,
			"brandId": 1
		}

+ Response 500 (application/json)

		{
			"message":"Upload failed",
		}

### Delete [DELETE /products/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

## BUTTONS

### List All BUTTONS [GET /buttons]
Load all buttons.

+ Response 200 (application/json)

		[
			{
				"id": 9,
				"regTime": null,
				"brandId": 1,
				"userId": 1,
				"deviceCode": "2a",
				"productId": 10,
				"brandName": "coca-cola",
				"productName": "cherry",
				"imgLink": "SJxbP5PKz.jpg"
			},
			{
				"id": 8,
				"regTime": null,
				"brandId": 1,
				"userId": 1,
				"deviceCode": "2a",
				"productId": 2,
				"brandName": "coca-cola",
				"productName": "coca 350ml",
				"imgLink": "ry_T0dDYz.jpg"
			},
			{
				"id": 7,
				"regTime": null,
				"brandId": 1,
				"userId": 1,
				"deviceCode": "1a",
				"productId": 2,
				"brandName": "coca-cola",
				"productName": "coca 350ml",
				"imgLink": "ry_T0dDYz.jpg"
			}
		]

+ Reponse 500 (application/json) 

		{
			"message": "Get themes list failed"
		}

### Update Buttons [PATCH]

+ Request (application/json)

		{
			"id": 7,
			"status": true || false,
			"brandId": 1,
			"regTime": null,
			"userId": 1
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message":"Update button failed"
		}

### Create Buttons [POST /buttons]

+ Request (application/json)

		{
			"status": false,
			"brandId": 1,
			"productId": 1,
			"deviceCode": "code"
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Cannot create this button"
		}

### Delete [DELETE /buttons/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

### Detail [GET /buttons/:id]

+ Response 200 (application/json)

		{
			"id": 7,
			"regTime": null,
			"brandId": 1,
			"userId": 1,
			"deviceCode": "1a",
			"productId": 2,
			"apptoken": "fcbfETdQTCw:APA91bF28WU2ZX8rqK5ZuQf2YxtzZY9XDVogmcqRa5Qs5QXBcEsjwb_f56qLzeVvM6oFEPTS8IqT0u2uHPP_OFado7y0lKOmkvCGSeAKcWOe2Ev6i1Kh4aKgS1PHeCF02A0b_0l5WJ9H",
			"productid": 2,
			"productname": "coca 350ml"
		}

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

## Brands

### List All Brands [GET /brands]
Load all brands.

+ Response 200 (application/json)

		[
			{
				"id": 1,
				"name": "coca-cola",
				"products": [
					{
						"id": 1,
						"name": "KhoiNK",
						"price": 10,
						"quantity": 10,
						"imgLink": "rkoTv50dG.png",
						"brandId": 1
					}
				]
			},
			{
				"id": 2,
				"name": "pepsi",
				"products": []
			}
		]

+ Reponse 500 (application/json) 

		{
			"message": "Get brands list failed"
		}

### Update brand [PATCH /brands]

+ Request (application/json)

		{
			"id": 4,
			"name": "pepsi"
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Update brand failed"
		}

### Create Brand [POST /brands]

Get visitor detail

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Cannot create this brand"
		}

### Delete [DELETE /brand/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

### Get Brand Detail [GET /brands/:id]

+ Response 200 (application/json)

		{
			"id": 4,
			"name": "pepsi"
		}

## Orders

### List All Orders [GET /orders/:column/asc || desc]
- param column must match with database

+ Response 200 (application/json)

		[
			{
				"id": 48,
				"userId": 1,
				"createdAt": "2018-03-15T03:36:44.000Z",
				"status": "processing",
				"username": "admin",
				"address": "Ha Noi",
				"productOrders": [
					{
						"product": {
							"name": "coca 350ml",
							"price": 10000,
							"productId": 2,
							"imgLink": "ry_T0dDYz.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "coca 500ml",
							"price": 10000,
							"productId": 3,
							"imgLink": "rkldaCuPKf.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "cherry",
							"price": 10000,
							"productId": 10,
							"imgLink": "SJxbP5PKz.jpg"
						},
						"quantity": 3
					}
				]
			},
			{
				"id": 49,
				"userId": 71,
				"createdAt": "2018-03-16T06:35:08.000Z",
				"status": "processing",
				"username": "admin",
				"address": "Ha Noi",
				"productOrders": [
					{
						"product": {
							"name": "coca 350ml",
							"price": 10000,
							"productId": 2,
							"imgLink": "ry_T0dDYz.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "coca 500ml",
							"price": 10000,
							"productId": 3,
							"imgLink": "rkldaCuPKf.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "cherry",
							"price": 10000,
							"productId": 10,
							"imgLink": "SJxbP5PKz.jpg"
						},
						"quantity": 3
					}
				]
			},
		]

+ Reponse 500 (application/json) 

		{
			"message": "Get orders list failed"
		}

### Create Order [POST /orders]

+ Request (application/json)

		{
			products: [
				{
					"id": "1", //product Id
					"quantity": "3"
				},
				{
					"id": "2",
					"quantity": "3"
				}
			]
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Cannot create this order"
		}

### Delete [DELETE /orders/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

### Get Order Detail [GET /orders/:id]

+ Response 200 (application/json)

		{
			"id": 49,
			"userId": 71,
			"createdAt": "2018-03-16T06:35:08.000Z",
			"username": "admin",
			"address": "Ha Noi",
			"status": "processing",
			"orderProducts": [
				{
					"product": {
						"name": "coca 350ml",
						"price": 10000,
						"productId": 2,
						"imgLink": "ry_T0dDYz.jpg"
					},
					"quantity": 3
				},
				{
					"product": {
						"name": "coca 500ml",
						"price": 10000,
						"productId": 3,
						"imgLink": "rkldaCuPKf.jpg"
					},
					"quantity": 3
				},
				{
					"product": {
						"name": "cherry",
						"price": 10000,
						"productId": 10,
						"imgLink": "SJxbP5PKz.jpg"
					},
					"quantity": 3
				}
			]
		}

### Get By User [GET /user-orders]

+ Response 200 (application/json)

		[
			{
				"id": 8,
				"userId": 1,
				"createdAt": "2018-03-09T23:18:34.000Z"
			}
		]

## Users

### USER CONTRAINT
- status: only accepts 'available', 'unavailable', null.
- device: only accepts 'ios', 'android', null.

### List All Users [GET /users]
Load all users.

+ Response 200 (application/json)

		[
			{
				"id": 1,
				"email": "admin",
				"name": "admin",
				"phone": "0126358468",
				"device": "android",
				"status": "available",
				"roleId": null,
				"brandId": null,
				"googleId": null
			},
			{
				"id": 55,
				"email": "admin1",
				"name": "admin",
				"phone": null,
				"device": null,
				"status": null,
				"roleId": null,
				"brandId": null,
				"googleId": null
			}
    ]

+ Reponse 500 (application/json) 

		{
			"message": "Get users list failed"
		}

### Get Users Detail By Id [GET /users/:id]

Get user detail

+ Response 200 (application/json)

		{
			"id": 1,
			"email": "admin",
			"name": "admin",
			"phone": "0126358468",
			"device": "android",
			"status": "available",
			"roleId": null,
			"brandId": null,
			"googleId": null
		}

+ Response 500 (application/json)

		{
			"message": "get user id 1 failed"
		}

### Create Users [POST /users]

+ Request (application/json)

		{
			"email": "admin",
			"password": "password",
			"name": "admin",
			"phone": "0126358468",
			"device": "android",
			"status": "unavailable",
			"roleId": null,
			"brandId": null,
			"googleId": null
		}

+ Response 200 (application/json)

		{
			"email": "admin",
			"password": "password",
			"name": "admin",
			"phone": "0126358468",
			"device": "android",
			"status": "online",
			"roleId": null,
			"brandId": null,
			"googleId": null
		}

+ Response 500 (application/json)

		{
			"message": "Cannot create this device"
		}

### Delete [DELETE /users/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}


### Login [GET /login]

+ Request (application/json)

		{
			"email":"email",
			"password": "password",
			"appToken": "appToken"
		}

+ Response 200 (application/json)

		{
			"id": 1,
			"email": "admin",
			"name": "admin",
			"phone": "0126358468",
			"device": "android",
			"status": "available",
			"address": "Ha Noi",
			"appToken": "apptoken",
			"token": "token"
		}

+ Response 500 (application/json)

		{
			"message": "Load failed"
		}

### Enable Account [GET /users/enable/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Load failed"
		}

### Google Login [GET /users/google-login]

+ Request (application/json)

		{
			"gmailToken": "token"
		}

+ Response 200 (application/json)

		{
			"id": 1,
			"name": "admin",
			"email": "admin",
			"phone": "0126358468",
			"device": "android",
			"status": "available",
			"address": "Ha Noi",
			"appToken": "appToken"
		}

+ Response 500 (application/json)

		{
			"message": "Load failed"
		}

### Update User [PATCH /users]

+ Using for update any information of user includes update appToken

+ Request (application/json)

		{
			"fieldName": "value"
		}

+ Response 200 (application/json)

		{
			"id": "2"
			"email": "admin",
			"name": "admin",
			"phone": "null",
			"device": "android",
			"status": "available",
			"address": "Ha Noi",
			"appToken": "appToken"
		}

+ Response 500 (application/json)

		{
			"message": "Load failed"
		}