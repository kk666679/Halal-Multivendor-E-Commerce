<?php
namespace Vendor\MultiVendor\Model\ResourceModel\Vendor;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected $_idFieldName = 'vendor_id';
    protected $_eventPrefix = 'multivendor_vendor_collection';
    protected function _construct()
    {
        $this->_init('Vendor\MultiVendor\Model\Vendor', 'Vendor\MultiVendor\Model\ResourceModel\Vendor');
    }
}
