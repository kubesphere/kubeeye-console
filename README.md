# KubeEye Console

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/kubesphere/console)
![](https://github.com/kubesphere/console/workflows/Main/badge.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

KubeEye console is the web interface for [KubeEye](https://github.com/kubesphere/kubeeye).

## Getting Started

Console should be always used with KubeEye, To install kubeeye, please refer to this [README](https://github.com/kubesphere/kubeeye)
The following will show you how to build console from source code.


### Prerequisite
#### Node.js
Console is written using Javascript. If you don't have a Node.js development environment, please [set it up](https://nodejs.org/en/download/). The minimum version required is 12.18.

#### Yarn
We use [Yarn](https://yarnpkg.com/) to do package management. If you don't have yarn, use the following to install:
```
npm install -g yarn@1.22.4
```
The minimum version required is 1.22.4, but you can use a newer version.

#### Go
We use [Golang](https://go.dev/) as the forwarding layer, If you don't have go environment, please [set it up](https://go.dev/doc/install).

## How to build

Clone the repository, and run `yarn && yarn build`
```sh
git clone https://github.com/kubesphere/kubeeye-console.git
cd kubeeye-console/
yarn && yarn build
go build web.go
./web
```
> If you have trouble downloading the dependencies, try the following
>
> `yarn config set registry https://registry.npmmirror.com`


After `./web`, you should see the output like the following

```
> I0424 16:10:52.142951     332 web.go:122] Start listening on 9088
```
Now, console is up and running.

## How to debug
A KubeEye backend is required to start debugging. You can refer to [Installation](https://github.com/kubesphere/kubeeye) to create install KubeEye.

Once the kubeeye is up, you run `yarn dev` to start the development environment.

> If you deploy [KubeEye](https://github.com/kubesphere/kubeeye) and [KubeEye-console](https://github.com/kubesphere/kubeeye-console) on different clusters, you need to copy the `$HOME/.kube/config` file on the KubeEye cluster to the `$HOME/.kube/config` location of the KubeEye-console cluster
> 
> Start the `node` and `go` services at the same time
> 
>  `yarn dev & go run web.go`

## How to submit a PR

Follow [Development Workflow](/docs/development-workflow.md) to commit your codes.

## Contributing to the project

Welcome to contribute to KubeEye Console, see [Contributing Guide](CONTRIBUTING.md).
