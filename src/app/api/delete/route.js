import { wixApiServer } from "@/lib/wixApiServer";




export async function POST(req) {
    const wixClient = await wixApiServer();

    try {
        const body = await req.json(); // Parse JSON body correctly
   
       console.log("body frmaed",body)

        
        const response = await wixClient.products.deleteProduct(body.productId)  
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error deleting product:", JSON.stringify(error, null, 2));
        return new Response(JSON.stringify({ error: 'Error deleting product' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}