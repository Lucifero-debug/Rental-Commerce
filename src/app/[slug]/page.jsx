
import Like from '../../components/Like';
import Recent from '../../components/Recent';
import SingleProduct from '@/components/SingleProduct';
import { wixClientServer } from "@/lib/wixClientServer"

// Sample Product Data


// Main Product Page Component
const Page = async({params}) => {
 
  const wixClient = await wixClientServer();


  const products = await wixClient.products
    .queryProducts()
    .eq("numericId", params.slug)
    .find();  
    

   

  return (
    <div className="container mx-auto p-6 h-full overflow-y-auto bg-gray-50 md:mt-32 mt-60">

      {/* Main Content */}
    <SingleProduct product={products.items[0]}/>


      {/* Suggestions Section */}
      <div className="mt-10">
        <Recent />
      </div>

      {/* Like Feature */}
      <Like liked={products.items[0].collectionIds[0]}/>
    </div>
  );
};

export default Page;

