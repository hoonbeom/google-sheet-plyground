
class GoogleSheet {
    url;

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
        const r = await fetch(`${this.url}?method=GET&sheet=${sheet}`).then(r => r.json());
        return r;
    }

    /**
     * Insert
     */
    async POST<T extends Record<string, string>>({ sheet, ...body }: T & { sheet: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=POST&sheet=${sheet}&${queryString}`).then(r => r.json());
        return r;
    }

    /**
     * Update fully
     */
    async PUT<T extends Record<string, string>>({ sheet, id, ...body }: T & { sheet: string; id: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=PUT&sheet=${sheet}&id=${id}&${queryString}`).then(r => r.json());
        return r;
    }

    /**
     * Update partially
     */
    async PATCH<T extends Record<string, string>>({ sheet, id, ...body }: T & { sheet: string; id: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=PATCH&sheet=${sheet}&id=${id}&${queryString}`).then(r => r.json());
        return r;
    }



}

export default GoogleSheet;