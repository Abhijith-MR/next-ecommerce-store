import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import getProduct from "@/actions/get-product";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";

export const revalidate = 0;

const HomePage = async () => {

  const billboard = await getBillboard("f555a274-cf5c-4684-8e3a-f4d1e2cc81b0");
  const products = await getProducts({ isFeatured: true });

  
  
  return (
    <Container>
      <div className="space-y-10 pb-10 bg-green-50">
        <Billboard
          data={billboard}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
};

export default HomePage;