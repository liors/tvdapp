pragma solidity ^0.4.4;

contract Bookmark {
    struct Member {
        address name;
        string[] showIds;
    }

    Member[] members;

    function bookmark(string showId) returns (string _aShowId) {
        address name = msg.sender;

        members.push(Member(name, showId));
        return showId;        
    }

    function getBookmarks() returns (string[]) {
        string[] result;
        address name = msg.sender;
        for (uint i = 0; i <= members.length; i++) {
            if (members[i].name == name) {
                return members[i].showId;
            }
        }        
        return result;
    } 
}