const { Op } = require("sequelize");
const { Product } = require('../model/products');
const { productCategory } = require('../model/category')

module.exports = {
   async AddProduct(req, res) {
        try {
            const details = {
                name: req.body.name,
                category: req.body.category,
                //categoryId: req.body.categoryId,
                tag: req.body.tag,
                brand: req.body.brand,
                description: req.body.description,
                imageurl: req.body.imageurl,
                price: req.body.price,
                size: req.body.size,
                colour: req.body.colour,
                quantity: req.body.quantity,
                SKU: req.body.SKU,
            };
            if (!details.category || !details.name) {
              const error = new Error('Name and Category ID are required');
              error.statusCode = 400;
              throw error;
          }
    //         const category = await productCategory.findByPk(details.categoryId);
    // if (!category) {
    //   return res.status(404).send({ message: "Category not found" });
    // }
            // Check if a product with the same name already exists
            Product.findOne({ where: { name: details.name } })
                .then(product => {
                    if (!product) {
                        // If the product does not exist, create it
                        return Product.create(details); // Remove the { } around details
                    }
                    throw new Error('Product already exists', 409);
                })
                .then(() => {
                    res.status(200).json({ success: true, msg: "Successfully inserted product" });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Internal Server Error" });
                });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    async productUpdateByName(req, res) {
        try {
            const details = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                tag: req.body.tag,
                brand: req.body.brand,
                description: req.body.description,
                imageurl: req.body.imageurl,
                price: req.body.price,
                size: req.body.size,
                colour: req.body.colour,
                quantity: req.body.quantity,
                SKU: req.body.SKU,
            };
            Product.findOne({ where: {name:details.name }})
                .then(product => {
                    if (product) {
                        return Product.update({
                                categoryId: req.body.categoryId,
                                tag: req.body.tag,
                                brand: req.body.brand,
                                description: req.body.description,
                                imageurl: req.body.imageurl,
                                price: req.body.price,
                                size: req.body.size,
                                colour: req.body.colour,
                                quantity: req.body.quantity,
                                SKU: req.body.SKU
                        }, {where:{name: details.name}})
                    }
                    throw new Error('Product Not Found', 409);
                })
                .then(() => {
                    res.status(200).json({ success: true, msg: 'Product Updated Successfully' });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Internal Server Error" });
                });
        }
        catch (err) {
            throw new Error('Error');
        }
    },
    async productDelete(req, res) {
        Product.findOne({ where: {name:(req.body.name) } })
            .then(product => {
                if (product) {
                    return Product.destroy({where:{name:(req.body.name)}})
                }
                throw new Error('Product not found')
            })
            .then(() => {
                return res.status(200).json({status: "deleted Product SUccessfully" });
            }).catch(err => {
               console.log(err ,'internal server error')
            })
    },
// Filter products
async filterProducts (req, res) {
  try {
    let whereClause = {};
 
    Object.keys(req.query).forEach((param) => {
      const value = req.query[param];
      switch (param) {
        case "name":
          whereClause["name"] = { [Op.like]: `%${value}%` };
          break;
          case "categoryId":
            whereClause["categoryId"] = { [Op.like]: `%${value}%` };
            break;
        case "colour":
          whereClause["colour"] = { [Op.like]: `%${value}%` };
          break;
          case "brand":
          whereClause["brand"] = { [Op.like]: `%${value}%` };
          break;
        case "size":
          whereClause["size"] = value;
          break;
        case "price":
          whereClause["price"] = parseFloat(value);
          break;
        default:
          break;
      }
    });
    const filteredProducts = await Product.findAll({
      where: whereClause,
    });
 
    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
    
};
  // async FilterProduct(req, res) {
    //     try {
    //         let search = '%%';
    //         if (req.query.search) {
    //             search = '%' + req.query.search + '%';
    //         }
    //         const products = await productCategory.findAll({
    //             attributes: ['id', 'name'],
    //             include: [{
    //                 model: Product,
    //                 order: [['createdAt', 'DESC']],
    //                 required: true,
    //                 where: {
    //                     name: { [Op.like]: search }
    //                 }
    //             }]
    //         });
    //         res.status(200).json({ success: true, data: products });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // },