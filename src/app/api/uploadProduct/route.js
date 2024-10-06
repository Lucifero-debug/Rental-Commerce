// pages/api/uploadProduct.js
import { wixApiServer } from "@/lib/wixApiServer";
import { files } from "@wix/media";



export async function POST(req) {
    const wixClient = await wixApiServer();

    try {
        const body = await req.json(); // Parse JSON body correctly

       
    
        
        const productData = {
            name: body.product.name || "hello",  // Fallback to "hello" if name is missing
            description: body.product.description,
            priceData: body.product.priceData,
            productType:body.product.productType,
            brand:body.product.brand
        };
        const productImage=[
            {url:body.product.image ||'https://res.cloudinary.com/prashnat-kumar/image/upload/v1728050856/WhatsApp_Image_2024-03-25_at_00.42.37_1a0ba40d_qghwck.jpg'},
        ]
        const collectionId=body.product.collection


        console.log("Received request:", body.product);

        // Directly pass productData to the Wix createProduct method
        const response = await wixClient.products.createProduct(productData);
        // console.log("Product created successfully:", response);
        const productId=[response.product._id]
        const cate=await wixClient.products.addProductsToCollection(collectionId,productId)
        // console.log("category wla",cate)




       try {
         const media= await wixClient.products.addProductMedia(response.product._id,productImage)
    //    console.log("media uploaded successfully",media)
       } catch (error) {
        console.error("error uploading media",error)
       }

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error creating product:", JSON.stringify(error, null, 2));
        return new Response(JSON.stringify({ error: 'Error creating product' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
