import productModel from '../models/product.js'

export const productController = {
    getAllProduct: async (req, res) => {
        const productFound = await productModel.find({})
        if (!productFound) return res.status(404).json({ success: fasle, message: 'Product not found' })
        try {
            res.status(200).json({ success: true, message: 'Product found', productFound })
        } catch (error) {
            console.log(error)
        }
    },
    createProduct: async (req, res) => {
        if (!req.body) return res.status(404).send({ message: "Product can't be empty", success: false });
        const product = new productModel({
            name: req.body.name,
            price: req.body.price
        })
        try {
            const productAdded = await product.save();
            res.status(200).send({ message: 'Product successfully added', success: true, productAdded });
        } catch (error) {
            console.log(error);
        }
    },
    getProductById: async (req, res) => {
        const productId = req.params.id;
        try {
            const productFound = await productModel.findOne({ id: productId });

            if (!productFound) return res.status(404).json({ success: false, message: `Product not found with id: ${req.params.id}` })

            return res.status(200).json({ success: true, message: 'Product found', productFound })
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct: async (req, res) => {
        const productId = req.params.id;
        const { name, price } = req.body;
        try {
            // if (!req.body.name || !req.body.price) return res.status(404).json({ success: false, message: "Product content can't be empty" })

            const productUpdate = await productModel.findByIdAndUpdate(productId,
                {
                    name: name,
                    price: price,
                }, { new: true })

            if (!productUpdate) return res.status(404).json({ success: false, message: `Product not found with id ${productId}` })

            return res.status(200).json({ success: true, message: 'Product updated', productUpdate })
        } catch (error) {
            console.log(error)
        }
    },
    deleteProduct: async (req, res) => {
        const productId = req.params.id;

        try {
            const productDelete = await productModel.findByIdAndDelete({ id: productId });
            if (!productDelete) return res.status(404).json({ success: false, message: `Can't delete Product with id ${productId}` });
            return res.status(200).json({ success: true, message: 'Delete Product successfully', productDelete })
        } catch (error) {
            console.log(error)
        }
    }

}