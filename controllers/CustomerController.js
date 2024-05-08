class CustomerController {
    // Thông tin tài khảon
    static show = async (req, res) => {
        try {
            res.render('customer/show', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }

    // thông tin tài khoản
    static shippingDefault = async (req, res) => {
        try {

            res.render('customer/shippingDefault', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }


}
module.exports = CustomerController;