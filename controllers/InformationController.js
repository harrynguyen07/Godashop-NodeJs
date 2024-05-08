class InformationController {
    // chính sách trả hàng
    static returnPolicy = async (req, res) => {
        try {
            res.render('information/returnPolicy', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }

    // chính sách thanh toán
    static paymentPolicy = async (req, res) => {
        try {
            res.render('information/paymentPolicy', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }


    // chính sách giao hàng
    static deliveryPolicy = async (req, res) => {
        try {
            res.render('information/deliveryPolicy', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }


}
module.exports = InformationController;