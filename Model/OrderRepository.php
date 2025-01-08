<?php
namespace Vendor\MultiVendor\Model;

use Magento\Sales\Model\ResourceModel\Order\CollectionFactory as OrderCollectionFactory;
use Magento\Catalog\Model\ResourceModel\Product as ProductResource;

class OrderRepository
{
    private $orderCollectionFactory;
    private $productResource;

    public function __construct(
        OrderCollectionFactory $orderCollectionFactory,
        ProductResource $productResource
    ) {
        $this->orderCollectionFactory = $orderCollectionFactory;
        $this->productResource = $productResource;
    }

    public function getOrdersByVendor($vendorId)
    {
        $orderCollection = $this->orderCollectionFactory->create();
        $orderCollection->getSelect()
            ->join(
                ['order_item' => 'sales_order_item'],
                'main_table.entity_id = order_item.order_id',
                []
            )
            ->join(
                ['catalog_product' => 'catalog_product_entity_int'],
                'order_item.product_id = catalog_product.entity_id AND catalog_product.attribute_id = :attribute_id',
                []
            )
            ->where('catalog_product.value = :vendor_id')
            ->group('main_table.entity_id');

        $orderCollection->getSelect()->bind([
            ':attribute_id' => $this->productResource->getAttribute('vendor_id')->getId(),
            ':vendor_id' => $vendorId,
        ]);

        return $orderCollection;
    }
}
