class ContractController {
    // hiển thị form liên hệ
    static form = async (req, res) => {
        try {
            res.render('contact/form', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }

    // gửi mail đến chủ shop
    static sendEmail = async (req, res) => {
        try {
            // req.protocol vd: http
            // req.headers.host vd: godashop.com
            const web = `${req.protocol}://${req.headers.host}`;
            const to = process.env.SHOP_OWNER;
            const subject = 'Godashop - Liên hệ';
            const content = `
            Chào chủ cừa hàng, <br>
            Dưới đây là thông tin khách hàng liên hệ: <br>
            Tên: ${req.body.fullname} <br>
            Email: ${req.body.email} <br>
            Mobile: ${req.body.mobile} <br>
            Message: ${req.body.content} <br>
            Được gởi từ trang web: ${web}
            `;
            req.app.locals.helpers.sendEmail(to, subject, content);

            res.end('Đã gửi mail thành công');
        } catch (error) {
            res.status(500).send(error.message);
        }

    }


}
module.exports = ContractController;