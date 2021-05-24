#!/bin/sh
export AUTO_CONFIRM=true

# Add Curator Lead role account, and correct path below
sudoas=""
path="~/joystream/cli/deploy-content/categories/inputs"

yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category1.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category2.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category3.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category4.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category5.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category6.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category7.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category8.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category9.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category10.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category11.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category12.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category13.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category14.json --context=Lead
yarn joystream-cli content-as-sudo:createVideoCategoryAs $sudoas -i $path/category15.json --context=Lead