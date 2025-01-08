<?php
namespace Vendor\MultiVendor\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

class Vendor extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('multivendor_vendors', 'vendor_id');
    }
}
