<?php
namespace Vendor\MultiVendor\Controller\Adminhtml\Vendor;

use Magento\Backend\App\Action;

class Index extends Action
{
    public function execute()
    {
        echo "Vendor Management Dashboard";
        exit;
    }
}
