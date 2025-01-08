# views.py

from django.shortcuts import render
from .models import Vendor, Order

def vendor_orders(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)
    orders = Order.objects.filter(products__vendor=vendor).distinct()
    return render(request, 'vendor_orders.html', {'vendor': vendor, 'orders': orders})
