## 描述

Kubernetes 通常会在工作节点上缓存图像。默认情况下，仅当图像尚未缓存在尝试运行它的节点上时才会被拉取。

但是，利用 Docker 映像的缓存版本可能是一个可靠性问题。它可能导致不同的图像在不同的节点上运行，从而导致行为不一致。这也可能是一个安全问题，因为工作负载可以访问缓存的映像，即使它没有访问远程 Docker 存储库的权限（通过imagePullSecret）。

指定 pullPolicy=Always 将通过确保每次创建新 pod 时下载最新图像来防止这些问题。

## 参考

[查看文档 ->](https://kubernetes.io/docs/concepts/containers/images/)

## 如何解决

在您的 Pod 规范中，设置 [imagePullPolicy](https://kubernetes.io/docs/concepts/containers/images/) 为 [Always](#always)。
