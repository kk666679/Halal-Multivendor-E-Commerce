<?php
namespace Vendor\MultiVendor\Model;

use Magento\Framework\Model\AbstractModel;

class Vendor extends AbstractModel
{
    protected function _construct()
    {
        $this->_init('Vendor\MultiVendor\Model\ResourceModel\Vendor');
    }
}
