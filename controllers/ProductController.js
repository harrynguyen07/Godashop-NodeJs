const productModel = require('../models/Product');
const categoryModel = require('../models/Category');
const commentModel = require('../models/Comment');
const { Numeral } = require('numeral');
class ProductController {

    // Hàm hiển thị danh sách sinh viên
    static index = async (req, res) => {
        try {
            const page = req.query.page || 1;
            // const page = req.query.page == undefined ? 1 : req.query.page;
            const item_per_page = process.env.PRODUCT_ITEM_PER_PAGE;
            let conds = []; //Không có điều kiện
            let sorts = [];

            // tìm kiếm theo danh mục
            //danh-muc/kem-chong-nang/c1.html
            const category_id = req.params.category_id;
            if (category_id) {
                conds = {
                    'category_id': { 'type': '=', 'val': category_id }
                };
            }

            // ?price-range=500000-1000000
            const priceRange = req.query['price-range'];
            if (priceRange) {
                const temp = priceRange.split("-");
                // console.log(temp);
                const start = temp[0];
                const end = temp[1];
                conds = {
                    ...conds,
                    'sale_price': { 'type': 'BETWEEN', 'val': `${start} AND ${end}` }
                };
                // SELECT * FROM view_product WHERE sale_price BETWEEN 500000 AND 1000000

                if (end == 'greater') {
                    conds = { ...conds, 'sale_price': { 'type': '>=', 'val': start } }
                    // SELECT * FROM view_product WHERE sale_price >= 300000
                };
            }

            // sort=price-asc
            const sort = req.query.sort;
            if (sort) {
                const temp = sort.split("-");
                const dummyColName = temp[0]; //price
                const order = temp[1].toUpperCase();//asc =>ASC
                const map = {
                    price: 'sale_price',
                    alpha: 'name',
                    created: 'created_date'
                }
                // truy xuất dữ liệu của thuộc tính cách 2
                const colName = map[dummyColName];
                // sort[colName] = order;
                // cần chuyển giá trị của biến thành thuộc tính thì dùng ngoặc vuông
                sorts = {
                    // sale_price: ASC
                    [colName]: order
                }
                // SELECT * FROM view_product ORDER BY sale_price ASC
            }

            const search = req.query.search;
            if (search) {
                conds = {
                    name: { type: 'LIKE', val: `'%${search}'` }
                }
                // SELECT * FROM view_product WHERE name LIKE '%kem%'
            }


            const products = await productModel.getBy(conds, sorts, page, item_per_page);

            // tìm totalPage để phân trang
            const allProducts = await productModel.getBy(conds, sorts)
            // Math.ceil là làm tròn lên
            const totalPage = Math.ceil(allProducts.length / item_per_page)


            // lấy tất cả các danh mục
            const categories = await categoryModel.all();

            res.render('product/index', {
                products: products,
                categories: categories,
                category_id: category_id,
                priceRange: priceRange,
                sort: sort,
                totalPage: totalPage,
                page: page,
                search: search,
            });

        } catch (error) {
            res.status(500).send(error.message);
        }

    }

    static detail = async (req, res) => {
        try {
            const slug = req.params.slug;
            const temp = slug.split('-');
            const id = temp[temp.length - 1];

            const product = await productModel.find(id);

            const imageItems = await product.getImageItems();


            const brand = await product.getBrand();
            // console.log(id)

            const comments = await product.getComments();

            const category_id = product.category_id;
            // lấy tất cả các danh mục
            const categories = await categoryModel.all();
            const conds = {
                'category_id': {
                    'type': '=',
                    'val': product.category_id
                },
                'id': {
                    'type': '!=',
                    'val': product.id
                }
                // SELECT * FROM view_product WHERE category_id = 3 AND id != 2
            }
            const relatedProducts = await product.getBy(conds)

            res.render('product/detail', {
                product: product,
                imageItems: imageItems,
                brand: brand,
                comments: comments,
                relatedProducts: relatedProducts,
                category_id: category_id,
                categories: categories,
            });

        } catch (error) {
            res.status(500).send(error.message);
        }

    }

    static storeComment = async (req, res) => {
        try {
            // console.log(req.body)
            // return;
            const data = {
                product_id: req.body.product_id,
                email: req.body.email,
                fullname: req.body.fullname,
                star: req.body.rating,
                created_date: req.app.locals.helpers.getCurrentDateTime(),
                description: req.body.description,
            }
            await commentModel.save(data);
            const product = await productModel.find(data.product_id);
            const comments = await product.getComments();
            res.render('product/comments', {
                comments: comments,
                layout: false

            });
            res.end('Đã gửi đánh giá của bạn')

        } catch (error) {
            res.status(500).send(error.message);
        }

    }

}
module.exports = ProductController;