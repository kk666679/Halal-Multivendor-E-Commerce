<?php
namespace Vendor\MultiVendor\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;

class Dashboard extends Action
{
    public function execute()
    {
        $this->_view->loadLayout();
        $this->_view->getPage()->getConfig()->getTitle()->set(__('Vendor Dashboard'));
        $this->_view->renderLayout();
    }
}
