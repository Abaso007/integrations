# @gitbook/integration-googleanalytics

## 0.7.0

### Minor Changes

- 8a714f4: Initialize GA after script load

## 0.6.2

### Patch Changes

- 126f152: Update images to 2x exports

## 0.6.1

### Patch Changes

- 8a8a07d: Update preview images and old logos
- 8a8a07d: Update images

## 0.6.0

### Minor Changes

- ee488d1: Bump integrations' target

## 0.5.0

### Minor Changes

- bce5dce: Bump version of integrations with inject script scope to work with latest API changes

## 0.4.0

### Minor Changes

- 50ad8ec: Update scopes of the GA and Intercom integrations

## 0.3.0

### Minor Changes

- f3999b7: Updates all packages to remove the spaces configuration, and rely on the now used site configuration instead. Also removes instances of the spaces variable where applicable

## 0.2.0

### Minor Changes

- 80e4d20: Add an extra check for variables that may be undefined in space integrations

### Patch Changes

- Updated dependencies [a04dfb8]
    - @gitbook/api@0.58.0

## 0.1.5

### Patch Changes

- 923b241: Disable gtag storage when cookies consent is no

## 0.1.4

### Patch Changes

- 6c303a0: Add site configuration object in manifest for integration that can be installed on sites

## 0.1.3

### Patch Changes

- cebbcb6: Updating inject scripts integration to support sites installations
- Updated dependencies [cebbcb6]
    - @gitbook/runtime@0.14.1

## 0.1.2

### Patch Changes

- 7d76dfb: Update integrations to use latest runtime and api client with `User-Agent`
- Updated dependencies [46c9686]
    - @gitbook/runtime@0.11.0
    - @gitbook/api@0.27.0

## 0.1.1

### Patch Changes

- d648cc2: Release to use the latest runtime package

## 0.1.0

### Minor Changes

- c15a2bf: Fix an issue where GA, Heap, and Hotjar integrations could pollute the global scope of the page.

### Patch Changes

- Updated dependencies [4e17700]
    - @gitbook/api@0.21.0

## 0.0.1

### Patch Changes

- 162cb4b: Added prototypes for the intercom and google analytics integrations
- bd17ba3: Fixed documentation links
- 704ae2b: Added the Plausible and Fathom integrations.

    Also added some logic to load script with the `.raw.js` extension as text in the integrations. This should make sure
    that script injection is as seamless to develop as the other parts of teh integration by allowing us to write code
    in script file, then loading it as a script during the build process.

- a8bb4db: Fixed the manifests to make sure they can be deployed without being blocked by other work
- Updated dependencies [f0c07cb]
- Updated dependencies [e36efa5]
- Updated dependencies [d762a7c]
- Updated dependencies [782d91b]
- Updated dependencies [782d91b]
- Updated dependencies [9fa2838]
- Updated dependencies [ce12efa]
- Updated dependencies [5df9eff]
    - @gitbook/api@null
    - @gitbook/runtime@null
