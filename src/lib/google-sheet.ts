
class GoogleSheet {
    url;

    private _cache = new Map<string, { data: unknown }>();

    /**
     * @param url Google App Script Url
     */
    constructor({ url }: { url: string }) {
        this.url = url;

    }
    /**
     * Select
     */
    async GET({ sheet }: { sheet: string }) {
        const key = `GET:${sheet}`;
        const cached = this._cache.get(key);
        if (cached?.data) return cached.data;
        const r = await fetch(`${this.url}?method=GET&sheet=${sheet}`).then(r => r.json());
        this._cache.set(key, { data: r });
        return r;
    }

    /**
     * Insert
     */
    async POST<T extends Record<string, string>>({ sheet, ...body }: T & { sheet: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=POST&sheet=${sheet}&${queryString}`).then(r => r.json());
        this._invalidCache(sheet);
        return r;
    }

    /**
     * Update fully
     */
    async PUT<T extends Record<string, string>>({ sheet, id, ...body }: T & { sheet: string; id: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=PUT&sheet=${sheet}&id=${id}&${queryString}`).then(r => r.json());
        this._invalidCache(sheet);
        return r;
    }

    /**
     * Update partially
     */
    async PATCH<T extends Record<string, string>>({ sheet, id, ...body }: T & { sheet: string; id: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=PATCH&sheet=${sheet}&id=${id}&${queryString}`).then(r => r.json());
        this._invalidCache(sheet);
        return r;
    }

    private _invalidCache(sheet: string) {
        this._cache.delete(`GET:${sheet}`);
    }

}

export default GoogleSheet;