const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');
const InformationController = require('../controllers/InformationController');
const ContactController = require('../controllers/ContactController');
const AuthController = require('../controllers/AuthController');
const CustomerController = require('../controllers/CustomerController');

// Hiển thị trang chủ
router.get('/', HomeController.index);
// Hiển thị danh sách sản phẩm
router.get('/san-pham.html', ProductController.index)


// Hiển thị danh sách sản phẩm
// slug và category_id do ta đặt
// godashop.com/danh-muc/kem-chong-nang/c3.html
router.get('/danh-muc/:slug/c:category_id.html', ProductController.index)

// Tìm kiếm
router.get('/search', ProductController.index)

// /chinh-sach-doi-tra.html
router.get('/chinh-sach-doi-tra.html', InformationController.returnPolicy)

// /chinh-sach-thanh-toan.html
router.get('/chinh-sach-thanh-toan.html', InformationController.paymentPolicy)

// /chinh-sach-giao-hang.html
router.get('/chinh-sach-giao-hang.html', InformationController.deliveryPolicy)

// /liên hệ
router.get('/lien-he.html', ContactController.form)

// /gửi mail
router.post('/contact/sendEmail', ContactController.sendEmail)

// chi tiết sản phẩm
router.get('/san-pham/:slug.html', ProductController.detail)

// lưu đánh giá (ajax)
router.post('/comments', ProductController.storeComment)

// lưu đánh giá (ajax)
router.post('/login', AuthController.login)

// thông tin tài khoản
router.get('/thong-tin-tai-khoan.html', CustomerController.show)

router.get('/dia-chi-giao-hang-mac-dinh.html', CustomerController.shippingDefault)
module.exports = router;