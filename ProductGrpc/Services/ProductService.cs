using System;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using ProductGrpc.Data;
using ProductGrpc.Protos;
using static ProductGrpc.Protos.ProductService;

namespace ProductGrpc.Services
{
    public class ProductService : ProductServiceBase
    {
        private readonly ProductContext _productContext;
        private readonly ILogger<ProductService> _logger;

        public ProductService(ProductContext productContext, ILogger<ProductService> logger)
        {
            _productContext = productContext ?? throw new ArgumentNullException(nameof(productContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public override async Task<GetProductResponse> GetProduct(GetProductRequest request, ServerCallContext context)
        {
            var product = await _productContext.Product.FindAsync(request.ProductId);

            if (product is null)
            {
                return new GetProductResponse() { ProductNull = true };
            }

            var productModel = new ProductModel
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price =  product.Price,
                Status = product.Status,
                CreatedTime = Timestamp.FromDateTime(product.CreatedTime)
            };

            return new GetProductResponse() {ProductValue = productModel};
        }
    }
}