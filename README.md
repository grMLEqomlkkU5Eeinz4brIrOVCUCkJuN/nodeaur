# nodeaur

A lightweight TypeScript/Node.js client for the [AUR RPC API v5](https://aur.archlinux.org/rpc).

## Installation

```bash
npm install nodeaur
```

## Usage

```typescript
import {
  searchSinglePackageTerm,
  packageNameSingleStartsWith,
  packageNameMultipleStartsWith,
  singlePackageInfo,
  multiplePackageInfo,
  multiplePackageInfoPost,
} from "nodeaur";
```

### Search

**Search packages by keyword**

```typescript
const results = await searchSinglePackageTerm("neovim");
// results.results → PackageBasic[]
```

**Autocomplete: suggest package names starting with a prefix**

```typescript
const names = await packageNameSingleStartsWith("gtk");
// names → string[]  e.g. ["gtk3", "gtk4", "gtk-doc", ...]
```

**Autocomplete: suggest package-base names starting with a prefix**

```typescript
const bases = await packageNameMultipleStartsWith("gtk");
// bases → string[]
```

### Package info

**Fetch details for a single package**

```typescript
const info = await singlePackageInfo("yay");
// info.results[0] → PackageDetailed
```

**Fetch details for multiple packages (GET)**

```typescript
const info = await multiplePackageInfo({ arg: "yay", arg: "paru" });
// info → PackageDetailed[]
```

> For a large number of packages, prefer the POST variant to avoid URL-length limits.

**Fetch details for multiple packages (POST)**

```typescript
const info = await multiplePackageInfoPost({ arg: "yay", arg: "paru" });
// info → PackageDetailed[]
```

### Low-level client

All functions are built on `aurRequest`, which you can call directly if you need full control:

```typescript
import { aurRequest, AUR_BASE_URL } from "nodeaur";

const data = await aurRequest<MyType>("/search", "neovim");
```

`aurRequest` throws a `GenericRequestError` (which extends `Error`) on any API or network failure.

## API Reference

### Search functions

| Function | Parameters | Returns |
|---|---|---|
| `searchSinglePackageTerm` | `searchTerm: string` | `Promise<SearchResult>` |
| `packageNameSingleStartsWith` | `startsWith: string` | `Promise<PackageName[]>` |
| `packageNameMultipleStartsWith` | `startsWith: string` | `Promise<PackageName[]>` |

### Info functions

| Function | Parameters | Returns |
|---|---|---|
| `singlePackageInfo` | `packageName: string` | `Promise<InfoResult>` |
| `multiplePackageInfo` | `params: Record<string, string>` | `Promise<InfoResult[]>` |
| `multiplePackageInfoPost` | `params: Record<string, string>` | `Promise<InfoResult[]>` |

### Types

| Type | Description |
|---|---|
| `PackageBasic` | Core package fields returned by search |
| `PackageDetailed` | Extended fields returned by info (extends `PackageBasic`) |
| `SearchResult` | Wrapper with `results: PackageBasic[]` |
| `InfoResult` | Wrapper with `results: PackageDetailed[]` |
| `BaseResult` | Shared `resultCount`, `type`, `version` fields |
| `ErrorResult` | Error response shape |
| `GenericRequestError` | Error class thrown on API/network failures |
| `PackageName` | Alias for `string` |

## License

ISC