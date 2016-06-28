/*  Description
    You are given a JSON object representing (a small part of) your record collection. Each album is identified by a unique id number (its key) and has several properties. Not all albums have complete information.
    Write a function which takes an id, a property (prop), and a value.
    For the given id in collection:
      If prop does not contain the key "tracks", then update or set the value for that incomplete prop.
      If prop does not contain the key "tracks" before you update it, create an empty array before pushing a track to it.
      If prop does contain the key "tracks" and its value is non-blank, then push the value onto the end of its existing tracks array.
      If value is blank, delete that prop.
    Always return the entire collection object.
 */

var collection = {
    2548: {
      album: "Slippery When Wet",
      artist: "Bon Jovi",
      tracks: [
        "Let It Rock",
        "You Give Love a Bad Name"
      ]
    },
    2468: {
      album: "1999",
      artist: "Prince",
      tracks: [
        "1999",
        "Little Red Corvette"
      ]
    },
    1245: {
      artist: "Robert Palmer",
      tracks: [ ]
    },
    5439: {
      album: "ABBA Gold"
    }
};
var collectionCopy = JSON.parse(JSON.stringify(collection));

function update(id, prop, value) {
  if (value !== '' && prop !== 'tracks') {
    collection[id][prop] = value;
  } else if (value !== '') {
    collection[id].tracks.push(value);
  } else if (value === '') {
    delete collection[id][prop];
  }

  return collection;
}

// Tests
update(5439, "artist", "ABBA");
collection[5439].should.have.property('artist')
  .and.eql('ABBA');
collection = collectionCopy; // reset collection

update(5439, "tracks", "Take a Chance on Me");
collection[5439].should.have.property('tracks')
  .and.have.property(collection[5439].tracks.length - 1, 'Take a Chance on Me');
collection = collectionCopy;

update(2548, "artist", "");
collection[2548].should.not.have.property('artist');
collection = collectionCopy;

update(1245, "tracks", "Addicted to Love");
collection[1245].should.have.property('tracks')
  .and.have.property(collection[1245].tracks.length - 1, 'Addicted to Love');
collection = collectionCopy;

update(2468, "tracks", "Free");
collection[2468].should.have.property('tracks')
  .and.have.property(0, '1999');
collection = collectionCopy;

update(2548, "tracks", "");
collection[2548].should.not.have.property('tracks');
