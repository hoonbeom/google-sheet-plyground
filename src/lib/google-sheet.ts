class GoogleSheet {
    url;

    constructor({ url }: { url: string }) {
        this.url = url;
    }

    /**
     * Select
     */
    async GET({ sheet }: { sheet: string }) {
        const r = await fetch(`${this.url}?method=GET&sheet=${sheet}`);
        const json = await r.json();
        return json;
    }

    /**
     * Insert
     */
    async POST<T extends Record<string, string>>({ sheet, ...body }: T & { sheet: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=POST&sheet=${sheet}&${queryString}`);
        const json = await r.json();
        return json;
    }

    /**
     * Update fully
     */
    async PUT<T extends Record<string, string>>({ sheet, id, ...body }: T & { sheet: string; id: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=PUT&sheet=${sheet}&id=${id}&${queryString}`);
        const json = await r.json();
        return json;
    }

    /**
     * Update partially
     */
    async PATCH<T extends Record<string, string>>({ sheet, id, ...body }: T & { sheet: string; id: string }) {
        const queryString = new URLSearchParams(body).toString();
        const r = await fetch(`${this.url}?method=PATCH&sheet=${sheet}&id=${id}&${queryString}`);
        const json = await r.json();
        return json;
    }
}

export default GoogleSheet;