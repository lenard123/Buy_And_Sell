<?php 

namespace App\Http\Controllers;

class Conf
{
	const ROLE_BUYER = 0;
	const ROLE_SELLER = 1;
	const ROLE_ADMIN = 2;

	const PRODUCT_PENDING = 0;
	const PRODUCT_APPROVE = 1;
	const PRODUCT_REJECT = 2;

	const ORDER_NEW = 0;
	const ORDER_COMPLETED = 1;
	const ORDER_CANCELLED = 2;

	const ADMIN_ROLE_MAIN = 0;
	const ADMIN_ROLE_SUB = 1;

	const IMAGE_USER = 1;
	const IMAGE_CATEGORY = 2;
	const IMAGE_PRODUCT = 3;
	const IMAGE_BUYER = 4;
	const IMAGE_SELLER = 5;
	const IMAGE_SLIDE_1 = 6;
	const IMAGE_SLIDE_2 = 7;
	const IMAGE_SLIDE_3 = 8;
}
