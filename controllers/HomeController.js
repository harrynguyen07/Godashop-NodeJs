const productModel = require('../models/Product');
const categoryModel = require('../models/Category');
class HomeController {

    // Hàm hiển thị danh sách sinh viên
    static index = async (req, res) => {
        try {
            const page = 1;
            const item_per_page = process.env.ITEM_PER_PAGE;
            const conds = []; //Không có điều kiện
            let sorts = { featured: 'DESC' };
            const featuredProducts = await productModel.getBy(conds, sorts, page, item_per_page);
            // SELECT * FROM view_product ORDER BY featured DESC LIMIT 0,4

            sorts = { created_date: 'DESC' };
            const latestProducts = await productModel.getBy(conds, sorts, page, item_per_page);
            // SELECT * FROM view_product ORDER BY created_date DESC LIMIT 0,4

            // lấy sản phẩm theo danh mục
            // dùng để chứa tất cả các danh mục
            // mỗi danh mục có 2 phần: tên danh mục và sản phẩm kèm theo
            const categoryProducts = []

            // lấy tất cả các danh mục
            const categories = await categoryModel.all();
            // forof
            // Duyệt từng category để lấy tên và sản phẩm tương ứng
            for (const category of categories) {
                const categoryName = category.name;
                // lấy sản phẩm theo cùng danh mục
                // cùng danh mục là cùng category_id
                const conds = {
                    'category_id': { 'type': '=', 'val': category.id }
                }
                // SELECT * FROM view_product WHERE category_id = 3
                const products = await productModel.getBy(conds, sorts, page, item_per_page);
                // Thêm tên danh mục và sản phảm tương ứng vào danh sách để truyển qua view
                categoryProducts.push({
                    categoryName: categoryName,
                    products: products
                })

            }


            res.render('home/index', {
                featuredProducts: featuredProducts,
                latestProducts: latestProducts,
                categoryProducts: categoryProducts,

            });

        } catch (error) {
            res.status(500).send(error.message);
        }
    }


}
module.exports = HomeController;