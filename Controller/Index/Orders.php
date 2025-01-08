<?php
namespace Vendor\MultiVendor\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Vendor\MultiVendor\Model\OrderRepository;
use Magento\Framework\View\Result\PageFactory;

class Orders extends Action
{
    private $orderRepository;
    private $resultPageFactory;

    public function __construct(
        Context $context,
        OrderRepository $orderRepository,
        PageFactory $resultPageFactory
    ) {
        parent::__construct($context);
        $this->orderRepository = $orderRepository;
        $this->resultPageFactory = $resultPageFactory;
    }

    public function execute()
    {
        $vendorId = 1; // Fetch vendor ID from session or authentication mechanism.
        $orders = $this->orderRepository->getOrdersByVendor($vendorId);

        // Share the orders with the block
        $this->_view->getLayout()->getBlock('vendor_orders')->setData('orders', $orders);
        return $this->resultPageFactory->create();
    }
}
