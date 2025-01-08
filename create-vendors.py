# Create vendors
vendor1 = Vendor.objects.create(name="Vendor A")
vendor2 = Vendor.objects.create(name="Vendor B")

# Associate products with vendors
product1 = Product.objects.create(name="Product 1", vendor=vendor1)
product2 = Product.objects.create(name="Product 2", vendor=vendor1)
product3 = Product.objects.create(name="Product 3", vendor=vendor2)

# Place orders with these products
order1 = Order.objects.create()
order1.products.add(product1, product2)

order2 = Order.objects.create()
order2.products.add(product3)
