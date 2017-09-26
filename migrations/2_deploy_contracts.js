var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Bookmark = artifacts.require("./Bookmark.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Bookmark);
};
