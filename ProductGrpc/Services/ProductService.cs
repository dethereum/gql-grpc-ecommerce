using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Grpc.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProductGrpc.Data;
using ProductGrpc.Models;
using ProductGrpc.Protos;
using static ProductGrpc.Protos.ProductService;

namespace ProductGrpc.Services
{
    public class ProductService : ProductServiceBase
    {
        private readonly ProductContext _productContext;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductService> _logger;

        public ProductService(ProductContext productContext, IMapper mapper, ILogger<ProductService> logger)
        {
            _productContext = productContext ?? throw new ArgumentNullException(nameof(productContext));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public override async Task<GetProductResponse> GetProduct(GetProductRequest request, ServerCallContext context)
        {
            var product = await _productContext.Product.FindAsync(request.ProductId);

            if (product is null)
            {
                return new GetProductResponse() { ProductNull = true };
            }

            var productModel = _mapper.Map<ProductModel>(product);
            
            return new GetProductResponse() {ProductValue = productModel};
        }

        public override async Task GetAllProducts(GetAllProductsRequest request, IServerStreamWriter<GetAllProductsResponse> responseStream, ServerCallContext context)
        {
            var productList = await _productContext.Product.ToListAsync();

            foreach (var productModel in productList.Select(product => _mapper.Map<ProductModel>(product)))
            {
                await responseStream.WriteAsync(new GetAllProductsResponse() {Product = productModel});
            }
        }

        public override async Task<AddProductResponse> AddProduct(AddProductRequest request, ServerCallContext context)
        {
            var product = _mapper.Map<Product>(request.Product);
            
            _productContext.Product.Add(product);
            await _productContext.SaveChangesAsync();
            
            var productModel = _mapper.Map<ProductModel>(product);
            
            return new AddProductResponse() {Product = productModel};
        }
    }
}