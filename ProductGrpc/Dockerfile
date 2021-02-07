FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

COPY protos ./protos

# install protoc+plugin
RUN apt update && apt install protobuf-compiler-grpc -y

# tell dotnet to use the local protoc
ENV PROTOBUF_PROTOC=/usr/bin/protoc

WORKDIR /src

COPY ProductGrpc/ProductGrpc.csproj .

# trick dotnet to use the local grpc plugin as there are no environment variable to help
RUN dotnet restore . && ln -s /usr/bin ~/.nuget/packages/grpc.tools/2.35.0/tools/linux_

COPY ProductGrpc/. .

EXPOSE 80
EXPOSE 443
EXPOSE 5000
ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT [ "dotnet", "run" ]
