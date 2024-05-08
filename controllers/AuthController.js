const customerModel = require('../models/Customer');
const bcrypt = require('bcrypt');
class AuthController {
    // chính sách trả hàng
    static login = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const customer = await customerModel.findEmail(email);
            if (!customer) {
                // req.app.locals.session.message_error cũng đc
                req.session.message_error = `Lỗi: không tồn tại ${email} trong hệ thống`;
                req.session.save(() => {
                    res.redirect('/')
                })
                return;
            }

            if (!bcrypt.compareSync(password, customer.password)) {
                req.session.message_error = `Lỗi: Mật khẩu không đúng`;
                req.session.save(() => {
                    res.redirect('/')
                })
                return;
            }
            if (!customer.is_active) {
                // req.app.locals.session.message_error cũng đc
                req.session.message_error = `Lỗi: Tài khoản chưa được kích hoạt, vui lòng kiểm tra email`;
                req.session.save(() => {
                    res.redirect('/')
                })
                return;
            }
            req.session.name = customer.name;
            req.session.email = customer.email;
            req.session.message_success = ' Đã đăng nhập thành công';
            req.session.save(() => {
                res.redirect('/')
            });


        } catch (error) {
            res.status(500).send(error.message);
        }

    }


}
module.exports = AuthController;