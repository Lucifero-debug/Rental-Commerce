import { wixClientServer } from "@/lib/wixClientServer";




export async function POST(req) {
    const wixClient = await wixClientServer();

    try {
        const body = await req.json(); // Parse JSON body correctly
   
       console.log("body frmaed",body)

        
        const response = await wixClient.products
        .queryProducts()
        .eq("brand",body.brand)
        .find();  
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching product:", JSON.stringify(error, null, 2));
        return new Response(JSON.stringify({ error: 'Error fetching product' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}