FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

COPY protos ./protos

# install protoc+plugin
RUN apt update && apt install protobuf-compiler-grpc -y

# tell dotnet to use the local protoc
ARG PROTOBUF_PROTOC=/usr/bin/protoc

WORKDIR /src

COPY ProductGrpc/ProductGrpc.csproj .

# trick dotnet to use the local grpc plugin as there are no environment variable to help
RUN dotnet restore . && ln -s /usr/bin ~/.nuget/packages/grpc.tools/2.34.0/tools/linux_

COPY ProductGrpc/. .

RUN dotnet build . -c Release -o /app/build

FROM build AS publish

RUN dotnet publish "ProductGrpc.csproj" -p:PublishSingleFile=false -r linux-arm64 --self-contained true -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/runtime-deps:5.0

WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY --from=publish /app/publish .
