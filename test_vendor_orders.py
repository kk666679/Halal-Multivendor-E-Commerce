from django.test import TestCase
from .models import Vendor, Product, Order

class VendorOrdersTestCase(TestCase):
    def setUp(self):
        self.vendor1 = Vendor.objects.create(name="Vendor A")
        self.vendor2 = Vendor.objects.create(name="Vendor B")

        self.product1 = Product.objects.create(name="Product 1", vendor=self.vendor1)
        self.product2 = Product.objects.create(name="Product 2", vendor=self.vendor1)
        self.product3 = Product.objects.create(name="Product 3", vendor=self.vendor2)

        self.order1 = Order.objects.create()
        self.order1.products.add(self.product1, self.product2)

        self.order2 = Order.objects.create()
        self.order2.products.add(self.product3)

    def test_vendor_orders(self):
        # Check orders for Vendor A
        response = self.client.get(f"/vendor_orders/{self.vendor1.id}/")
        self.assertContains(response, "Order #1")
        self.assertNotContains(response, "Order #2")

        # Check orders for Vendor B
        response = self.client.get(f"/vendor_orders/{self.vendor2.id}/")
        self.assertContains(response, "Order #2")
        self.assertNotContains(response, "Order #1")
