# Pictograph

Picture gallery that uses azure blob storage to upload and list images.
It uses:

- dotnet core
- react
- styled components
- storage accounts -> blob storage

## To deploy azure resources

Create a `<name>.parameters.json` file in the arm-template folder, it is not in this repo. And deploy them like so:

```
  az login
  az deployment create --resource-group <group-name> --template-file ./azure-deploy.json --parameters ./<name>.parameters.json
```
