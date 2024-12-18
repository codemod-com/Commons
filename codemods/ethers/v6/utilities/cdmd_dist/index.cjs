/*! @license
The MIT License (MIT)

Copyright (c) 2024 yugal41735

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return transform;
  },
});
function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "formatBytes32String" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("encodeBytes32String"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "parseBytes32String" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("decodeBytes32String"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.MemberExpression, {
      object: { object: { name: "ethers" }, property: { name: "constants" } },
      property: { name: "AddressZero" },
    })
    .forEach((path) => {
      path.node.object = j.identifier("ethers");
      path.node.property = j.identifier("ZeroAddress");
      dirtyFlag = true;
    });
  root
    .find(j.MemberExpression, {
      object: { object: { name: "ethers" }, property: { name: "constants" } },
      property: { name: "HashZero" },
    })
    .forEach((path) => {
      path.node.object = j.identifier("ethers");
      path.node.property = j.identifier("ZeroHash");
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "hexDataSlice" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("dataSlice"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "hexZeroPad" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("zeroPadValue"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, { callee: { name: "hexlify" } })
    .forEach((path) => {
      path.node.callee = j.identifier("toBeHex");
      dirtyFlag = true;
    });
  root
    .find(j.MemberExpression, {
      object: { name: "AbiCoder" },
      property: { name: "defaultAbiCoder" },
    })
    .forEach((path) => {
      path.replace(
        j.callExpression(
          j.memberExpression(
            j.identifier("AbiCoder"),
            j.identifier("defaultAbiCoder"),
          ),
          [],
        ),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "hexValue" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("toQuantity"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "arrayify" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("getBytes"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "solidityPack" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("solidityPacked"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "solidityKeccak256" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("solidityPackedKeccak256"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "soliditySha256" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("solidityPackedSha256"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "utils" } },
        property: { name: "defineReadOnly" },
      },
    })
    .forEach((path) => {
      const args = path.node.arguments;
      if (args.length === 3) {
        const obj = args[0];
        const key = args[1];
        const value = args[2];
        path.replace(
          j.callExpression(
            j.memberExpression(
              j.identifier("ethers"),
              j.identifier("defineProperties"),
            ),
            [
              obj,
              j.objectExpression([
                j.property.from({
                  kind: "init",
                  key: j.identifier(key.value),
                  value,
                }),
              ]),
            ],
          ),
        );
        dirtyFlag = true;
      }
    });
  return dirtyFlag ? root.toSource() : undefined;
}
