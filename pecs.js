


function PostcardECS() {

    this.e = {};
    this.systems = [];
}



/**
 * Fresh ID generator
 * @param {string} prefix - The ID of the new entity (optional)
 * @returns {string} A currently unused ID
 */
PostcardECS.prototype.id = function () {

    let id = 0;

    return function (prefix = '') {

        while ((prefix + id) in this.e) ++id;
        return prefix + id;
    }
}();



/**
 * Creates a new entity
 * @param {object} value - The components of the new entity
 * @param {string} prefix - The prefix of the entity's ID (optional)
 * @returns {string} The ID of the created entity
 */
PostcardECS.prototype.create = function (value, prefix) {

    let id = this.id(prefix);
    this.e[id] = value;
    return id;
};



/**
 * Removes an existing entity
 * @param {string} id - The ID of the entity to be removed
 * @returns {boolean} Whether or not this entity existed
 */
PostcardECS.prototype.remove = function (id) {

    let exists = id in this.e;
    delete this.e[id];
    return exists;
};



/**
 * Registers a new system
 * @param {array} requiredComponents - The components the system needs to do its job
 * @param {function} update - The update function with signature (entityComponents, entityID)
 * @returns {number} The index of the system
 */
PostcardECS.prototype.system = function (requiredComponents, update) {

    this.systems.push({ requiredComponents, update });
    return this.systems.length - 1;
};



/**
 * Applies the update function of all systems on their target entities
 */
PostcardECS.prototype.step = function () {

    for (let sys of this.systems)

        iteratingEntities:
        for (let id in this.e) {

            for (let required of sys.requiredComponents)
                if ( !(required in this.e[id]) ) continue iteratingEntities;

            sys.update(this.e[id], id);
        }
};



if (module) module.exports = PostcardECS;


