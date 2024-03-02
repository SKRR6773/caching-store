// Disk.js

const crypto = require('crypto');
const Caching = require("./Caching");

module.exports = class Disk
{
    constructor()
    {
        this._stores = [];
        this._store_unique_ids = [];
    }

    appendChild(caching)
    {
        if  (!(caching instanceof Caching)) throw new TypeError("your params not caching obj!");
        
        let _id = this.__generate_unique_id();
        caching.__set_callback_timeout(this._handleDestroyer.bind(this), _id);

        this._store_unique_ids.push(_id);
        this._stores.push({
            id: _id,
            cache_obj: caching
        });
    }

    getWithKeys(keys)
    {
        const _store = this._stores.filter((row) => {
            return JSON.stringify(row.cache_obj.getKeys()) === JSON.stringify(keys);
        });

        console.log("Get With Keys => ");
        console.log(this._stores);
        console.log(_store);
        
        return _store.length > 0 ? _store[0].cache_obj.getValue() : false;
    }

    _handleDestroyer(id)
    {
        if (id)
        {

            console.log("handle Destroyer -> ");
            console.log(id);
            console.log(this._store_unique_ids);

            this._store_unique_ids = this._store_unique_ids.filter((row) => {
                return row !== id;
            });


            this._stores = this._stores.filter((row) => {
                return row.id !== id;
            });

            console.log("Handle Deleted!");
        }
        else
        {
            throw new Error("_handleDestroy id params not null or undefined!");
        }
    }

    __generate_unique_id(prefix="ca_")
    {
        let _id;


        do
        {
            _id = prefix + crypto.randomBytes(10).toString('hex');
        }
        while (this._store_unique_ids.includes(_id));
        
        return _id;
    }
}