pragma solidity ^0.4.4;

contract Bookmark {
    mapping (address => string) private bookmarks;
    address public owner;

    function Bookmark() {       
        owner = msg.sender;
    }

    function bookmark(string show) public returns (string) {
        bookmarks[msg.sender] = show;        
        return bookmarks[msg.sender];
    }

    function getBookmarks() constant returns (string) {
        return bookmarks[msg.sender];
    } 
}