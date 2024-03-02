// Caching.js

module.exports = class Caching
{
    constructor()
    {
        this._id = null;
        this._keys = {};
        this._value = null;
        this._timeout = 1000;
        this._disk_timeout_callback = null;
    }

    _setTimeout()
    {
        setTimeout(() => {
            this._value = null;
            this.__call_disk();
        }, this._timeout);
    }

    setTimeoutValue(timeout = 1000)
    {
        this._timeout = timeout;
    }

    setValue(value)
    {
        this._value = value;
    }

    getValue()
    {
        return this._value;
    }

    setKeys(keyname={})
    {
        this._keys = keyname;
    }

    getKeys()
    {
        return this._keys;
    }

    run()
    {
        this._setTimeout();
    }

    __call_disk()
    {
        if (typeof this._disk_timeout_callback === 'function') this._disk_timeout_callback(this._id);
    }

    __set_callback_timeout(handleCall, id)
    {
        this._id = id;
        this._disk_timeout_callback = handleCall;
    }
}