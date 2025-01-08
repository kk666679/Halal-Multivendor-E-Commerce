<?php
namespace Vendor\MultiVendor\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Vendor\MultiVendor\Model\VendorFactory;

class Register extends Action
{
    protected $vendorFactory;

    public function __construct(Context $context, VendorFactory $vendorFactory)
    {
        parent::__construct($context);
        $this->vendorFactory = $vendorFactory;
    }

    public function execute()
    {
        $data = $this->getRequest()->getPostValue();
        if (!empty($data)) {
            $vendor = $this->vendorFactory->create();
            $vendor->setData($data);
            $vendor->save();

            $this->messageManager->addSuccessMessage(__('Vendor Registered Successfully!'));
        }
        $this->_redirect('multivendor/index/register');
    }
}
