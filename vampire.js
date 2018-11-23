class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }
  /** Simple tree methods **/
  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let test = this;
    let count = 0;
    while (test.name != 'root') {
      test = test.creator;
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal <= vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  get root() {
    let test = this;
    while (test.name != 'root') {
      test = test.creator;
    }
    return test;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let t = this.root;

    function traversal(node) {
      if (node.name === name) {
        return node;
      } else if (node.offspring) {
        let res = null;
        for (let i = 0; res == null && i < node.offspring.length; i++) {
          res = traversal(node.offspring[i]);
        }
        return res;
      }
      return null;
    }
    return traversal(t);
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let res = [];
    let c = this;

    function traversal(node) {
      if (node == null) {
        return;
      }
      if (!res.includes(node) && node.name != c.name) {
        res.push(node);
      }
      node.offspring.forEach(element => {
        traversal(element);
      });
    }
    traversal(this);
    return res.length;

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let res = [];

    function traversal(node) {
      if (node == null) {
        return;
      }
      if (!res.includes(node) && node.yearConverted > 1980) {
        res.push(node);
      }
      node.offspring.forEach(element => {
        traversal(element);
      });
    }
    traversal(this);
    return res;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

//let rootVampire = new Vampire("root");
//let offspring1 = new Vampire("a", 1000);
//let offspring2 = new Vampire("b", 900);
//let offspring3 = new Vampire("c", 1400);
//let offspring4 = new Vampire("d", 1890);
//let offspring5 = new Vampire("e", 1990);
//rootVampire.addOffspring(offspring1);
//offspring1.addOffspring(offspring2);
//rootVampire.addOffspring(offspring3);
//offspring3.addOffspring(offspring4);
//offspring4.addOffspring(offspring5);
//
//console.log(rootVampire.allMillennialVampires);