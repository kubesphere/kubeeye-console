# Build the manager binary
FROM golang:1.17 as builder

WORKDIR /workspace
COPY web/ web/

# Copy the Go Modules manifests
# Use the proxy goproxy.cn in CN
ENV GOPROXY https://goproxy.cn,direct
COPY go.mod go.mod
COPY go.sum go.sum

ENV CGO_ENABLED=0

# Build
RUN go install -v ./web/...

FROM alpine:3.15
WORKDIR /
COPY --from=builder /go/bin/web .
RUN addgroup -S kubeeye -g 1000 && adduser -S kubeeye -G kubeeye -u 1000
USER 1000:1000

ENTRYPOINT ["/web"]