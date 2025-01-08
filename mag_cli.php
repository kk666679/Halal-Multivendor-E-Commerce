php bin/magento module:enable Vendor_MultiVendor
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento cache:clean
