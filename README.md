# Create Flow Dapp
This guide will take you through the environmental setup of Flow.

We will be installing the [flow emulator](), installing and configuring the [dev-wallet](), and using [flow client library (fcl)]() to interact with the previous two.

### Prerequisites
- Mac OS or Linux
- NodeJS
- Node Package Manager (NPM)
- Git
- Curl

### Setup dapp
```sh
git clone git@github.com:dangerousfood/create-flow-dapp.git
cd create-flow-dapp
npm install
```

### Flow emulator setup

_This installation method only works on macOS/x86-64 and Linux/x86-64 architectures._

This script downloads and installs the appropriate binary for your system:

```sh
sh -ci "$(curl -fsSL https://storage.googleapis.com/flow-cli/install.sh)"
```
```sh
flow emulator start --init
```

### dev-wallet Setup

```
npm run dev:wallet
```