#!/bin/sh
export AUTO_CONFIRM=true

# Add correct path below
path="~/joystream/cli/deploy-content/categories/inputs"

yarn joystream-cli content:createVideoCategory -i $path/category1.json
yarn joystream-cli content:createVideoCategory -i $path/category2.json
yarn joystream-cli content:createVideoCategory -i $path/category3.json
yarn joystream-cli content:createVideoCategory -i $path/category4.json
yarn joystream-cli content:createVideoCategory -i $path/category5.json
yarn joystream-cli content:createVideoCategory -i $path/category6.json
yarn joystream-cli content:createVideoCategory -i $path/category7.json
yarn joystream-cli content:createVideoCategory -i $path/category8.json
yarn joystream-cli content:createVideoCategory -i $path/category9.json
yarn joystream-cli content:createVideoCategory -i $path/category10.json
yarn joystream-cli content:createVideoCategory -i $path/category11.json
yarn joystream-cli content:createVideoCategory -i $path/category12.json
yarn joystream-cli content:createVideoCategory -i $path/category13.json
yarn joystream-cli content:createVideoCategory -i $path/category14.json
yarn joystream-cli content:createVideoCategory -i $path/category15.json