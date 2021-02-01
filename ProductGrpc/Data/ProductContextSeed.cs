using System;
using System.Collections.Generic;
using System.Linq;
using ProductGrpc.Models;
using ProductGrpc.Protos;

namespace ProductGrpc.Data
{
    public class ProductContextSeed
    {
        public static void SeedAsync(ProductContext productContext)
        {
            if (productContext.Product.Any()) return;
            
            var products = new List<Product>()
            {
                new Product
                {
                    ProductId = 1,
                    Name = "Mi10T",
                    Description = "New Xiaomi Phone Mi10T",
                    Price = 699,
                    Status = ProductStatus.Instock,
                    CreatedTime = DateTime.UtcNow
                },
                new Product
                {
                    ProductId = 2,
                    Name = "P40",
                    Description = "New Huawei Phone P40",
                    Price = 899,
                    Status = ProductStatus.Instock,
                    CreatedTime = DateTime.UtcNow
                },
                new Product
                {
                    ProductId = 3,
                    Name = "A50",
                    Description = "New Samsung Phone A50",
                    Price = 399,
                    Status = ProductStatus.Instock,
                    CreatedTime = DateTime.UtcNow
                },
            };
                
            productContext.Product.AddRange(products);
            productContext.SaveChanges();
        }
    }
}