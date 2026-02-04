const Product = require("../models/Product");
const axios = require("axios");

exports.syncProducts = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`
        }
      }
    );

    const printifyProducts = response.data.data;
    const ids = [];

    for (const p of printifyProducts) {
      ids.push(p.id);

      const variants = p.variants
        .filter(v => v.is_enabled)
        .map(v => {
          const image =
            p.images.find(img =>
              img.variant_ids?.includes(v.id)
            )?.src || p.images?.[0]?.src;

          return {
            printify_variant_id: v.id,
            title: v.title,
            model: v.options?.[0]?.value || v.title,
            price: v.price / 100,
            image_url: image
          };
        });

      await Product.findOneAndUpdate(
        { printify_product_id: p.id },
        {
          printify_product_id: p.id,
          title: p.title,
          description: p.description,
          image_url: p.images?.[0]?.src || null,
          is_active: true,
          variants
        },
        { upsert: true, new: true }
      );
    }

    await Product.updateMany(
      { printify_product_id: { $nin: ids } },
      { is_active: false }
    );

    res.json({ message: "Printify sync complete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Printify sync failed" });
  }
};
