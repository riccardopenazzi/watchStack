/**
 * Prototipi custom su Array.
 */

/**
 * Converte un array in un oggetto mappa usando una funzione chiave.
 * @param {Function} keyFn - Funzione che riceve l'elemento e ritorna la chiave.
 * @returns {Object} Mappa { [chiave]: elemento }
 * 
 * @example
 * const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }];
 * genres.toMap(x => x.id);
 * // => { 1: { id: 1, name: 'Action' }, 2: { id: 2, name: 'Comedy' } }
 */
Array.prototype.toMap = function(keyFn) {
    return this.reduce((map, item) => {
        map[keyFn(item)] = item;
        return map;
    }, {});
};
