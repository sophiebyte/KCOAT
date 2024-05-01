const {productCategory} = require('../model/category');

module.exports = {
     AddNewCategory (req, res) {
        const categoryDetails = {
             name: req.body.name,
             description: req.body.description
         }
         productCategory.create(categoryDetails)
         .then((post) => {
           res.status(200).json({ post, message: "category created successfully" });
           console.log('category created');
         })
         .catch((err) => {
            console.error('Error creating category:', err);
           // res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred' });
        
         })
        },
    
        updateCategory (req, res)  {
            const category = {
                id : req.body.id,
                name : req.body.name,
                description : req.body.description
            }
        
            try {
                // Update the category directly using the id
                const getcategory = productCategory.update({name:category.name,description:category.description},{ where: { id: category.id } });
        
                if (!getcategory) {
                    // If no rows were updated, return 404
                    return res.status(404).json({ message: "Category not found" });
                }
        
                // Category updated successfully
                res.status(200).json({ message: "Category updated successfully" });
            } catch (error) {
                // Handle any errors
                console.error("Error updating category:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        },
    }        
        

