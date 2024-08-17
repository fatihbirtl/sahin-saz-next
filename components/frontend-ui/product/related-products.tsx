import { Post, Product } from "@/types"
import { ProductItem } from "@/components/frontend-ui/product/product-item"

interface RelatedProductProps {
  product: Product
}
export const RelatedProducts: React.FC<RelatedProductProps> = ({ product }) => {
  return product.relatedProducts?.length ? (
    <div className="my-4 space-y-4 pt-10">
      <div className="p-4  ">
        <h4 className="text-2xl font-semibold tracking-tight">
          Bu Ürüne Bakanlar Bunlara da Baktı
        </h4>
        <p>İlginizi çekebilecek diğer ürünlerimizi de keşfedin.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product.relatedProducts?.map((item) => (
          <ProductItem related key={item.id} productData={item} />
        ))}
      </div>
    </div>
  ) : (
    <div className="my-4 space-y-4 pt-10">
      <div className="p-4 space-y-2">
        <h4 className="text-3xl font-semibold tracking-tight">
          Bu Kategorideki Diğer Ürünleri de inceleyiniz.
        </h4>
        <p>İlginizi çekebilecek diğer ürünlerimizi de keşfedin.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product?.categories &&
          product?.categories[0]?.products?.map((item) => (
            <ProductItem related key={item.id} productData={item} />
          ))}
      </div>
    </div>
  )
}
